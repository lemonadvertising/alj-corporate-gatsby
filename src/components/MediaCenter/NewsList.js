
import React from 'react'
// import Link from 'gatsby-link'
import { Link } from 'gatsby'
import Slider from "react-slick";
export default function NewsList({key, url, imageUrl, imageAlt, shortTitle,  shortSummary, date}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
    return (  
      // <Slider {...settings}> 
        <div key={key} className="box-center-wrapper">
        <div className="text box-center">
                {console.log("image url",imageUrl)}
                
              <div className="description">
                <Link to={url}>
                 <img src={imageUrl} />
                 <h5>{shortTitle}</h5>
                 <p>{shortSummary}</p>
                 </Link>
              </div>
  
        </div>  
     </div>  
    //  </Slider> 
    )
}
