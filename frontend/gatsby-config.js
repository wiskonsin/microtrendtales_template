/**
 * @type {import('gatsby').GatsbyConfig}
 */

module.exports = {
  siteMetadata: {
    title: `MicroTrendTales`,
    description: `Una colección de microhistorias e imágenes basadas en los TTs de cada momento y generadas automáticamente a través de OpenAI`,
    twitterUsername: `@microtrending`,
    image: 'https://digitalia-test-2.s3.eu-west-3.amazonaws.com/background-microtrend.png',
    siteUrl: `https://www.microtrendtales.com`,
    keywords: `microrrelatos, ai, ia, openai, chatgpt, dall-e, integración, serverless, pln, blog, autocontenido, automático`
  },
  plugins: ['gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: `ca-pub-0852379507006503`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-QL5L0P3MWV", // Google Analytics / GA
        ],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.microtrendtales.com',
        sitemap: 'https://www.microtrendtales.com/sitemap-0.xml',
        policy: [{userAgent: '*', allow: '/'}]
      }
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
        }
      `,
        resolveSiteUrl: ({site}) => {
          // Alternatively, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
          return site.siteMetadata.siteUrl
        },
        serialize: ({path}) =>
            {
              if(path.includes("404") || path.includes("404.html") || path.includes("offline-plugin-app-shell-fallback" || path.includes("sitemap") || path.includes("robots"))){
                return null
              }
              else if(path.includes("index") || path.includes("index.html")){
                return {
                  url: path,
                  changefreq: `daily`,
                  priority: 0.7,
                }
              }
              else
                {
                  return {
                    url: path,
                    changefreq: `never`,
                    priority: 0.7,
                  }
                }
            },
      },
    },
  ],
};