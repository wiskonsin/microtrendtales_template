/**
 * @type {import('gatsby').GatsbyConfig}
 */

module.exports = {
  siteMetadata: {
    title: `Blog GPT`,
    description: `Blog autocontenido generado con GPT-3 y DALL-E`,
    twitterUsername: `@luigi_soplete`,
    image: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    siteUrl: `https://www.microtrendtales.com`,
    keywords: `microrrelatos, ai, ia, openai, chatgpt, dall-e, integración, serverless, pln, blog, autocontenido, automático`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-transformer-remark`,
  ],
};