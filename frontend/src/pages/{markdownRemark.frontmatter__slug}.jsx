import * as React from "react"
import { graphql } from "gatsby"

export default function BlogPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {

  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  const createHTMLTags = (tags)=>{
    let tagsArray = tags.split(",");
    const tagsComponent = tagsArray.map(el=><div >
                                              <a rel="noreferrer" target={"_blank"} href={"https://twitter.com/search?q="+el} >{el}</a>
                                            </div>)
    return tagsComponent;
  }

return  <div style={{"margin-bottom" : "5%", margin: "0 auto", textAlign: "center"}}>
          <h3>{frontmatter.title}</h3>
          <div>{frontmatter.date}</div>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <img src={`${frontmatter.imageURL}`} onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src=`${frontmatter.imageURL}`;
        }} alt="MTT"/>
          <div >{frontmatter.tags ? createHTMLTags(frontmatter.tags) : null}</div>
        </div>      
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