import React from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import SEO from "../components/seo"
import { RModalImages } from "react-modal-images";

const HowItWorks = () => {

  return <main className="grid place-content-center place-items-center overflow-y-hidden">
          <SEO/>
          <div id="main_container" className="bg-fixed h-auto relative place-content-center place-items-center gap-2 before:bg-gradient-to-t before:from-teal-500/70 before:to-transparent before:blur-xl before:filter">
            <Header home={true} />
            <div className="max-w-4xl grid grid-cols-1 gap-1 mt-10 ml-10 mr-10 place-content-center place-items-center justify-center" style={{"margin-bottom" : "5%", margin: "0 auto", textAlign: "center"}}>
              <p className="text-white p-2">
                Micro Trend Tales es una aplicación web que es capaz de generar contenido de forma completamente autónoma, gracias al uso de Inteligencia Artificial, Integración con diferentes servicios y técnicas de Automatización.
              </p>
              <p className="text-white p-2">
                Tanto los relatos como las imágenes, son generadas a través del uso de la API de OpenAI, a la cuál se envía, cada 2 horas (en una franja horaria determinada) 5 de los Trending Topics de Twitter de cada momento, los cuáles, también son obtenidos a través de la API oficial de Twitter.
              </p>
              <p className="text-white p-2">
                La web está desarrollada utilizando GatsbyJS y está alojada en la infraestructura de Amazon Web Services, en la cuál se despliega automáticamente cada vez que se genera un nuevo artículo.
              </p>
              <p className="text-white p-2">
                El modelo elegido es completamente Serverless (SAM), lo que permite a la aplicación escalar y estar disponible en todo momento, independientemente del tráfico.
              </p>
              <p className="text-white p-2">
                ¿Te gustaría saber más? Contacta con nosotros a través de <a target={"_blank"} rel="noreferrer" href="https://twitter.com/luigi_soplete" className="hover:underline text-midnight">Twitter</a> o <a target={"_blank"} rel="noreferrer" href="https://www.linkedin.com/in/luis-alberto-riancho-280ba046" className="hover:underline text-midnight">LinkedIn</a> y estaremos encantados de ayudarte.
              </p>
              <RModalImages
                  className="rounded-t-lg h-50 ml-2 grid md:grid-cols-3 grid-cols-2 gap-x-4 gap-y-10 mt-2 shadow-2xl"
                  small={"https://digitalia-test-2.s3.eu-west-3.amazonaws.com/background-microtrend.png"}
                  medium={"https://digitalia-test-2.s3.eu-west-3.amazonaws.com/background-microtrend.png"}
                  hideDownloadButton = {true}
                  hideZoomButton = {true}
                  hideRotateButton = {true}
                  alt={`MTT`}
                />            
            </div>
            <Footer/>
          </div>
        </main>
}

export default HowItWorks