import * as React from "react"
import { graphql } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"
import SEO from "../components/seo"
import { RModalImages } from "react-modal-images";

export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {

  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  const createHTMLTags = (tags)=>{
    let tagsArray = tags.split(",");
    const tagsComponent = tagsArray.map(el=><div className="bg-midnight my-1 text-metal px-3 py-1 ml-2 rounded-full transition justify-center ease-in-out hover:-translate-y-1 hover:scale-90 duration-300">
                                              <a rel="noreferrer" target={"_blank"} href={"https://twitter.com/search?q="+el} >{el}</a>
                                            </div>)
    return tagsComponent;
  }

return <main className=" min-h-screen place-content-center place-items-center overflow-hidden text-center">
          <SEO title={frontmatter.title} />
          <img className="blur opacity-10" id="img_background" src={`${frontmatter.imageURL}`} onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="https://digitalia-test-2.s3.eu-west-3.amazonaws.com/background-microtrend.png";
            }} alt="MTT"/>
          <div id="main_container" className="bg-fixed h-auto relative place-content-center place-items-center gap-2 before:bg-gradient-to-t before:from-teal-500/70 before:to-transparent before:blur-xl before:filter">
            <Header home={true} how={true}/>
            <div className="max-w-4xl grid grid-cols-1 gap-1 mt-10 ml-10 mr-10 place-content-center place-items-center justify-center" style={{"margin-bottom" : "5%", margin: "0 auto", textAlign: "center"}}>
              <h3 className="ml-2 mb-2 text-4xl font-bold tracking-tight text-midnight dark:text-white">{frontmatter.title}</h3>
              <div className="ml-2 text-2xl grid gap-x-4 gap-y-10 mt-2 text-midnight">{frontmatter.date}</div>
              <div className="ml-2 text-xl mt-8  text-white" dangerouslySetInnerHTML={{ __html: html }} />
              <RModalImages
                  className="rounded-t-lg h-50 ml-2 grid md:grid-cols-3 grid-cols-2 gap-x-4 gap-y-10 mt-2 shadow-2xl"
                  small={`${frontmatter.imageURL}`}
                  medium={`${frontmatter.imageURL}`}
                  hideDownloadButton = {true}
                  hideZoomButton = {true}
                  hideRotateButton = {true}
                  alt={`${frontmatter.title}`}
                />
              <div className="sm:ml-2 sm:mt-2 mb-2 sm:flex sm:justify-start grid grid-cols-2">{frontmatter.tags ? createHTMLTags(frontmatter.tags) : null}</div>
            </div>
            <Footer/>
          </div>
        </main>       
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        tags
        imageURL
      }
    }
  }
`