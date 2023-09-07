
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
  const currentPage = props.data.wpPage;
  const spotlight = props.data.allWpSpotlight;
  const sliderRef = useRef(null);


  useEffect(() => onPreRouteUpdate(),[]);
  // useEffect(() => onPreRouteUpdate());
  
  const onPreRouteUpdate = () => {
      Function.LoadingAllSliderScript()
            
    }



  const playVideo = (videoId) => {
    const video = document.getElementById(videoId);
    video.play();
  };

  const pauseVideo = (videoId) => {
    const video = document.getElementById(videoId);
    video.pause();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:false,
    preload:'no',
    // Your Slick Slider settings here
    beforeChange: (oldIndex, newIndex) => {
      // Pause the video when sliding away from a slide
      console.log(spotlight?.edges[oldIndex].node.spotlights.spotlight.mimeType, '======')
      if(spotlight?.edges[oldIndex].node.spotlights.spotlight.mimeType == "video/mp4"){
        pauseVideo(`video${oldIndex}`);
      }
    },
    afterChange: (currentIndex) => {
      // Play the video when sliding to a slide
      console.log(spotlight?.edges[currentIndex].node.spotlights.spotlight.mimeType, '----', currentIndex)
      if(spotlight?.edges[currentIndex].node.spotlights.spotlight.mimeType == "video/mp4"){
        playVideo(`video${currentIndex}`);
      }
    },
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
              <Slider ref={sliderRef} {...settings}>
                {spotlight?.edges.map((el, newIndex) => (
                  <div>{
                  }
                    {el.node.spotlights.youtubeVideo == null ?
                      el.node.spotlights.spotlight.mediaType == "file" ?
                        <video id={`video${newIndex}`} autoPlay muted src={el.node.spotlights.spotlight.publicUrl} type="video/mp4">
                          {/* <source  /> */}
                        </video>
                        :
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

            <div className='col-md-12 mt-5'>

              <div class="mapMainWrapper">
                <div class="map-container">
                  <div id="mapplic"></div>

                  <ul>
                    <li><span><img src={active_icon} /></span> <p>Active distribution partnerships</p></li>
                    <li><span><img src={agreed_icon} /></span>  <p>Agreed distribution territories</p></li>
                    <li> <span><img src={oem_icon} /></span> <p>OEM solution sources</p></li>
                  </ul>
                </div>
              </div>
              <div className="map-wrapper">
                <div className="map-container">
                  <div id="mapplic" className="mapplic-dark"></div>
                </div>
              </div>

              <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {/* <div className="mapbx">
                                <div id="vmap"></div>
                            </div> */}



                        </div>
                    </div>
                </div>

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
          sourceUrl
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
              mediaType
              mimeType
              publicUrl
            }
            youtubeVideo
          }
        }
      }
    }
  }
`;

// apps-fileview.texmex_20230817.01_p1
// page.js
// Displaying page.js.
