/* -- Dependencias --
Axios -> para realizar http requests
openAI -> para hacer peticiones a la API de OpenAI
AWS -> SDK de AWS
Twit -> para hacer peticiones a la API de Twitter */

const axios = require('axios');
const openAI = require('openai');
const AWS = require("aws-sdk");
const Twit = require('twit');

/* Importamos KEYs necesarias para comunicar con API de Twitter procedentes de las variables de entorno de LAMBDA */
const consumer_key = process.env.CONSUMER_KEY;
const consumer_secret = process.env.CONSUMER_SECRET;
const access_token = process.env.ACCESS_TOKEN;
const access_token_secret = process.env.ACCESS_SECRET;

/* Creamos nueva instancia de la librería Twit para hacer las peticiones a la API de Twitter */
const T = new Twit({
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret,
});

/* Configuramos y creamos una instancia de la librería openAI para hacer peticiones a la API de OpenAI */
const configuration = new openAI.Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openAI.OpenAIApi(configuration);

// Esta variable contendrá los 5 trending topics, incluyendo #
let topTrendingTopicsArray = [];

// Esta variable contendrá el slug
let slug = ""

// Esta variable será usada para almacenar el buffer de la imagen
let bufferData = null;

/* Función que devuelve array con 5 de los trending topics actuales */
async function getTrendingTopics() {
  try {
    // Realizar una solicitud HTTP a la URL especificada en la variable de entorno TRENDSURL
    const response = await axios.get(process.env.TRENDSURL, {
      headers: {
        // Enviar un encabezado de autorización con el token Bearer
        'Authorization': process.env.BEARER
      }
    });

    // Extraer los temas trending de la respuesta
    const trendingTopics = response.data[0].trends;

    // Filtrar los temas para quedarse solo con los nombres que no comienzan con "#"
    const words = trendingTopics.map(topic => topic.name);

    // Barajar los nombres de los temas y seleccionar los primeros 5
    const randomWords = words.sort(() => 0.5 - Math.random()).slice(0, 5);
    topTrendingTopicsArray = randomWords; // asignamos las palabras que luego mostraremos en el tweet, incluyendo los # para tener mayor alcance con nuestros tweets

    // Eliminamos los #
    const finalWords = randomWords.map(randomWord => randomWord.replace("#", ""));

    // Devolver los 5 temas trending aleatorios y sin #
    return finalWords;
  } catch (error) {
    // En caso de error, mostrar el error en la consola y devolver una matriz vacía
    console.error(error);
    return [];
  }
}

async function generateStory(words) {
  try {
    // Generamos la fecha de hoy en el formato adecuado
    const today = new Date().toISOString().slice(0,10);

    // Array de las posibles categorías del relato
    const themes = [
        "aventura",
        "comedia",
        "crimen",
        "drama",
        "fantasía",
        "una historia de amor",
        "horror",
        "intriga",
        "misterio",
        "ciencia ficción",
        "suspense",
        "una historia de supervivencia",
        "terror",
        "un thriller",
        "fantasmas"
      ];
    // Obtenemos, de forma aleatoria, la temática del relato
    var randomIndex = Math.floor(Math.random() * themes.length);
    
    // Hacemos petición a OpenAI para que genere el texto deseado
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Crea un relato en español, con una trama que incluya ${themes[randomIndex]}, que sea interesante para un lector de entre 15 y 60 años y que tenga un desenlace sorprendente al final. Tiene que incluir las siguientes palabras: ${words.join(', ')}. Además, el texto devuelto ha de comenzar con la siguiente estructura:\n \"---\nslug: \"xxxx\"\ndate: ${today}\ntitle: \"Mi primer post\"\ntags: ${words.join(', ')}\nimageURL: __IMAGEURL__\n---\"\n Title deberá ser un título para el relato (de máximo 10 palabras) y slug, en lugar de xxxx debe ser el título en minúsculas, sin acentos ni letras ñ, y separado por -`,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Nos quedamos con el texto
    const story = response.data.choices[0].text;
    return story;

  } 
  catch (error) {
    console.error(error);
    return '';
  }
}

// Función para crear el fichero .md en el repositorio correspondiente
async function createFileInRepository(repo, path, content, commitMessage) {
    const encodedContent = Buffer.from(content).toString('base64');
    const response = await axios.put(
    `https://api.github.com/repos/${repo}/contents/${path}`,
    {
        message: commitMessage,
        content: encodedContent
    },
    {
        headers: {
        Authorization: `Token ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
        }
    }
    );
    return response;
}

/* Función para corregir las faltas generadas por OpenAI en el MarkDown y generar la imagen a través de Dall-e*/
async function markDownFixer(text){
    // Eliminamos los 3 primeros saltos de página generados
    let textFixed = text.replace(/^.*\n.*\n.*\n/, '');
    // Creamos un prompt para Dall-e a partir del título
    const prompt = await getTextInBetween(textFixed,'title: ');

    // Listado de palabras a añadir al comienzo del prompt
    const prePrompts = [
        "Synthwave ",
        "Artwork ",
        "Painting of ",
        "A photo of ",
        "A dutch masters painting of ",
        "A three quarter view of ",
        "Highly detailed photo of ",
        "Medieval painting of ",
        "Egyptian painting of "
    ]

    // Array de las posibles estilos de Dall-e
    const styles = [
        "kodachrome film",
        "digital art",
        "realistic",
        "cyberpunk",
        "naturalism",
        "photorealism",
        "minimalism",
        "retro",
        "vintage",
        "geometric",
        "vector"
      ];

    // Obtenemos, de forma aleatoria, el prompt para Dall-e
    var randomIndexPre = Math.floor(Math.random() * prePrompts.length);
    var randomIndexStyles = Math.floor(Math.random() * styles.length);
    const imageURL = await createImageWithDallE(prePrompts[randomIndexPre] + prompt + ", " + styles[randomIndexStyles]);

    // Añadimos la URL de la imagen generada
    textFixed = textFixed.replace("__IMAGEURL__", imageURL);

    // Si el comienzo del texto no es ---, lo añadimos (alguna vez ha pasado)
    if (textFixed.substring(0, 3) !== '---') {
    textFixed = '---\n' + textFixed;
    }

    return textFixed;
}

// Función para postear a Twitter <-- si no queremos subir imágenes
async function postToTwitter(status) {
  await T.post('statuses/update', { status }, function(err, data, response) {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Post realizado con éxito");
    }
  });
}

// Función para postear a Twitter con imagen incluida

async function postMediaToTwitter(status) {

  const b64content = bufferData.toString('base64');
  await T.post('media/upload', { media_data: b64content }, async function (err, data, response) {
    // now we can assign alt text to the media, for use by screen readers and
    // other text-based presentations and interpreters
    var mediaIdStr = data.media_id_string
    var altText = "MicroTrendTales."
    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
   
    await T.post('media/metadata/create', meta_params, async function (err, data, response) {
      if (!err) {
        // now we can reference the media and post a tweet (media will attach to the tweet)
        var params = { status, media_ids: [mediaIdStr] }
   
        await T.post('statuses/update', params, function (err, data, response) {
          if (err) {
            console.log("Error: ", err);
          } else {
            console.log("Post realizado con éxito");
          }
        })
      }
    })
  })

}

// Función para descargar la imagen de OpenAI y subirla a S3
const downloadAndUploadImage = async (url, s3Bucket, s3Key) => { 

    // Se devuelve como Promise para obligar a esperar a que la petición finalice (tanto de descarga como de subida a S3)
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: url,
            responseType: 'arraybuffer'
        })
        .then(response => {
            // Una vez recibida la imagen, la subimos a S3
            const s3 = new AWS.S3();
            bufferData = Buffer.from(response.data, 'binary');
            const params = {
                Bucket: s3Bucket,
                Key: s3Key,
                Body: bufferData,
                ContentType: response.headers['content-type']
            };
            s3.upload(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
        .catch(error => {
            reject(error);
        });
});
};

// Crear imagen con Dall-e a partir de un prompt
async function createImageWithDallE(prompt){

    // Lanzamos la petición a Dall-e
    const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
    });

    // Recogemos la url
    let imageUrl = response.data.data[0].url;

    // Establecemos un nombre para la imagen, que será el prompt sin espacios ni comillas
    const imageName = prompt.replace(/[" ]/g, "_");

    // Pasamos los parámetros objeto y el bucket
    const params = {
        Bucket: process.env.S3BUCKET,
        Key: imageName,
        ContentType: "image/png"
    };

    // Almacenamos la imagen en S3 y devolvemos la URL
    await downloadAndUploadImage(imageUrl, params.Bucket,params.Key)
    imageUrl = process.env.S3URL+imageName;
    return imageUrl;
}

// Función para crear el tweet a partir de la historia
async function getTweetMessageFromStory(story, words){
    slug = await getTextInBetween(story,'slug: ');
    const title = await getTextInBetween(story,'title: ');

    // Array de hashtags adecuados para tener mayor visibilidad
    const hashtags = [
        "#IA",
        "#ML",
        "#CHATGPT",
        "#GPT3",
        "#storytelling",
        "#creatividad",
        "#AI",
        "#tecnología",
        "#trendingtopics",
        "#openAI"
    ];

    // De forma aleatoria, nos quedamos con 5 de ellos, que añadiremos al tweet final
    let randomHashtagsArray = hashtags.sort(function() {
        return 0.5 - Math.random();
      }).slice(0, 5);

    // Posibles títulos del tweet
    const tweetTitleArray = [
        "📢 No te pierdas: ",
        "📬 Descubre: ",
        "🆕 Nuevo contenido: "
    ];

    // Nos quedamos de forma aleatoria con uno de ellos
    const randomIndexTitle = Math.floor(Math.random() * tweetTitleArray.length);

    // Posibles textos intermedios del tweet
    const generatedByArray = [
      `, un relato creado automáticamente por 🤖GPT-3, que contiene ${topTrendingTopicsArray.join(', ')} y que puedes encontrar en: `,
      `, una historia autogenerada a través de 💡GPT-3, basada en algunos de los actuales TTs, como: ${topTrendingTopicsArray.join(', ')}. Ya disponible en: `,
      `, un micro-relato que ha sido creado con 🦾GPT-3, y que incluye ${topTrendingTopicsArray.join(', ')}. Puedes verlo en detalle en: `
  ];

  // Nos quedamos de forma aleatoria con uno de ellos
  const randomIndexMiddle = Math.floor(Math.random() * generatedByArray.length);
    
    // Construimos el tweet
    const tweet = tweetTitleArray[randomIndexTitle] + 
    title + 
    generatedByArray[randomIndexMiddle] + 
    process.env.WEB_URL + " "+
    randomHashtagsArray.join(" ")

    return tweet;
}

// Función para obtener el texto que hay entre un flag y un salto de línea, óptimo para sacar title y slug
async function getTextInBetween(text, startFlag){
    let start = text.indexOf(startFlag) + startFlag.length;
    let end = text.indexOf('\n', start);
    return text.substring(start, end);
}

// Función principal ejecutada por la Lambda
exports.handler = async (event) => {

    const timestamp = Math.floor(Date.now() / 1000);

    // Obtenemos las palabras clave del relato
    const words = await getTrendingTopics();

    // Construimos la historia
    let story = await generateStory(words);

    // Adaptamos/Corregimos el relato
    story = await markDownFixer(story);

    // Construimos el tweet
    const tweet = await getTweetMessageFromStory(story, words)

    // Creamos el fichero en el repositorio
    await createFileInRepository(process.env.GITHUB_REPO, "./src/content/" + timestamp + "-" + slug.replaceAll('"',"") + ".md", story, "Nuevo contenido añadido" + slug + " " + timestamp)

    // Posteamos el tweet
    await postMediaToTwitter(tweet)
    
    const finalBody = {
          tweet,
          bufferData
        }

    // Respuesta a devolver en Lambda
    const response = {
        statusCode: 200,
        body: JSON.stringify(finalBody),
    };
    return response;
};
