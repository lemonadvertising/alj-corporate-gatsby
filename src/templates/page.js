import React from 'react'
import { graphql } from "gatsby";
import Layout from '../components/layout';
import Slider from "react-slick";
// import { StaticImage } from "gatsby-plugin-image"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
const Page = (props) => {
  const currentPage = props.data.wpPage;
  const spotlight = props.data.allWpSpotlight;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
      <Layout
        lang={currentPage.locale.id}
        title={currentPage.seo.opengraphTitle ? currentPage.seo.opengraphTitle : null}
        description={currentPage.seo.opengraphDescription ? currentPage.seo.opengraphDescription : null}
        image={currentPage.featuredImage.node.sourceUrl ? currentPage.featuredImage.node.sourceUrl : null}
      >

        <div className='container'>
          <div className='row'>

            <div className='col-md-12'>
              <Slider {...settings}>
              {spotlight?.edges.map((el) => (
                  <div>
                    {el.node.spotlights.youtubeVideo == null ?
                      <img src={el.node.spotlights.spotlight.sourceUrl} alt={el.node.spotlights.spotlight.sourceUrl ? el.node.spotlights.spotlight.sourceUrl : "image"} />
                      :
                      <div>
                        <iframe
                          title="YouTube Video"
                          width="100%"
                          height="400"
                          src={el.node.spotlights.youtubeVideo}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    }
                  </div>
                ))
              }
              </Slider>
            </div>

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
    </>
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

    allWpSpotlight {
      edges {
        node {
          id
          slug
          link
          title
          spotlights {
            subTitle
            spotlight {
              sourceUrl
            }
            youtubeVideo
          }
        }
      }
    }
  }
`;

