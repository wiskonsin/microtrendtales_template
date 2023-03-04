import React from "react"
import { graphql } from "gatsby"
import PostLink from "../components/post-link"
import Header from "../components/header"
import Footer from "../components/footer"
import SEO from "../components/seo"
import CookieConsent from "react-cookie-consent";

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {

  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return <main className="grid place-content-center place-items-center overflow-y-hidden">
          <SEO/>
          <div id="main_container" className="w-screen bg-fixed h-auto relative place-content-center place-items-center gap-2 before:bg-gradient-to-t before:from-teal-500/70 before:to-transparent before:blur-xl before:filter ">
            <Header how={true} />
            <div className="min-[601px]:grid grid-cols-4 gap-4 mt-10 ml-10 mr-10 max-[600px]:grid-flow-row" style={{"marginBottom" : "5%"}}>
              {Posts}
            </div>
            <Footer/>
            <CookieConsent
              location="bottom"
              buttonText="ACEPTO"
              cookieName="microTrendTalesCookie2"
              style={{ background: "#34C5C5", color: "#573B5F", fontSize: "13px" }}
              buttonStyle={{ color: "#34C5C5", fontSize: "13px", background: "#573B5F" }}
              expires={150}
            >
              Este sitio web utiliza cookies para mejorar su experiencia.{" "}
            </CookieConsent>
          </div>
        </main>
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC }}) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            tags
            imageURL
          }
        }
      }
    }
  }
`