
import React from 'react'
// import Link from 'gatsby-link'
import { Link } from 'gatsby'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsList from './NewsList'
import NewsCards from "../News/NewsCards"
export default function RelatedArticles({relatedNews, getCatetory}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    drag:true
  };
    return (  
        <section className="content morenews news-section">
        <div className="container">
          <h4>Related Articles</h4>
          
          
          {relatedNews ?


          
            <div className="row no-gutters related-articles">
              <div className="col-lg-12">
                <div className="inrightbx">
                <div className='row'>
                <Slider {...settings}>
                      {relatedNews.edges.map((data, key) => (                                           
                        <NewsCards
                        url={data.node.localizedWpmlUrl}
                        imageUrl={data.node.featuredImage.node}
                        imageAlt={data.node.featuredImage.node?data.node.featuredImage.node:"image"}
                        date={data.node.date}
                        location={data.node.press_release_acf.location}
                        shortTitle={data.node.press_release_acf.shortTitle}
                        shortSummary={data.node.press_release_acf.summary}
                        // shareUrl={props.location.href}                        
                        category={
                          getCatetory === "newscategories" ?
                          data.node.newscategories.nodes[0].name :
                          getCatetory === "inthenewscategories" ?
                          data.node.inthenewscategories.nodes[0].name :
                          getCatetory === "insightscategories" ?
                          data.node.insightscategories.nodes[0].name : null
                        }    
                        shocialShare={"hide"}
                      /> 
                        
                      ))}
                      </Slider> 
                  </div>
                  {/* <div className="insightswrap">
                  </div> */}
                  

                </div>
              </div>

            </div>
            : null}


        </div>
       
      </section>

    )
}
