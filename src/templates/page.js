import React from 'react'
import { graphql } from "gatsby";
// import { StaticImage } from "gatsby-plugin-image"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
const Page = (props) => {
  const currentPage = props.data.wpPage;
  return (<div>{
    console.log("current page", props)
    }</div>
  )
}

export default Page
export const painPage = graphql`
  query painPage($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      content      
      id 
    }
  }
`;

