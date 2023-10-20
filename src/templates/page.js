
import React, {useEffect, useRef } from 'react'
import { graphql } from "gatsby";
import Layout from '../components/layout';
import Slider from "react-slick";
import Function from "../lib/functions";
// import { StaticImage } from "gatsby-plugin-image"
import active_icon from '../common/images/active_icon.png'
import agreed_icon from '../common/images/agreed_icon.png'
import oem_icon from '../common/images/oem_icon.png';

import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
const Page = (props) => {
  console.log("props",props)
  const currentPage = props.data.wpPage;

 
  return (
    <>
      <Layout>

        <div className='container'>
          <div className='row'>

            <div className='col-md-12'>
             
            </div>


            <div className='col-md-12'>
              <div className='heroSection'>
                {console.log("currentPage",currentPage)}
                <GatsbyImage image={getImage(currentPage.featuredImage.node.gatsbyImage)} alt={currentPage.featuredImage.node ? currentPage.featuredImage.node : "image"} />
              </div>
            </div>
            <div className='col-md-12'>
              <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
            </div>

            







          </div>
        </div>
      </Layout>
    </>
  )
}

export default Page
export const painPage = graphql`
  query wpPage($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      content      
      id 
      featuredImage {
        node {
          gatsbyImage(width: 300)
        }
      }  
    }
  }
`;

// apps-fileview.texmex_20230817.01_p1
// page.js
// Displaying page.js.
