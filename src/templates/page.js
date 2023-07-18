import React from 'react'
import { graphql } from "gatsby";
import Layout from '../components/layout';
// import { StaticImage } from "gatsby-plugin-image"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
const Page = (props) => {
  const currentPage = props.data.wpPage;
  return (
    <Layout
      lang={currentPage.locale.id}
      title={currentPage.seo.opengraphTitle ? currentPage.seo.opengraphTitle : null}
      description={currentPage.seo.opengraphDescription ? currentPage.seo.opengraphDescription : null}
      image={currentPage.featuredImage.node.sourceUrl ? currentPage.featuredImage.node.sourceUrl : null}
    >
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='heroSection'>
              <GatsbyImage image={getImage(currentPage.featuredImage.node)} alt={currentPage.featuredImage.node ? currentPage.featuredImage.node : "image"} />
            </div>
          </div>
          <div className='col-md-12'>
            <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Page
export const painPage = graphql`
  query painPage($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      content      
      id 
      featuredImage {
        node {
          gatsbyImage(width: 1320, placeholder: BLURRED)
          altText
        }
      }
      locale {
        id
      }
      seo {
        opengraphTitle
        opengraphDescription
      }

    }
  }
`;

