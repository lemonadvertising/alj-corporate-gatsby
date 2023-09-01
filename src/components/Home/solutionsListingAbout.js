import React from "react";
// import {useStaticQuery, graphql} from 'gatsby';
// import LangConfig from "../LangConfig/LangConfig.json";
// import SiteTrans from "../LangConfig/siteTrans.json";
import Slider from "react-slick";

// Import css files
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
const SolutionsListingAbout = (props) => {
    const solutionslistingdata = props.allWpSolution;
    console.log(solutionslistingdata, '=====================')
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth:true
    };
    return (
        <>
            <Slider {...settings}>
                {solutionslistingdata.map(item => (
                    <div>
                            <div className="about-solution-inner">
                                {console.log(item.node.press_release_acf)}

<div className="about-solution-inner-img">
{item.node.press_release_acf.icon20x20 && item.node.press_release_acf.icon20x20.sourceUrl ?
                                    <img src={item.node.press_release_acf.icon20x20.sourceUrl} alt={"img"} />      
                                    :null}                                                                              
</div>

                                <h6 className="about-solution-title">{item.node.title}</h6>
                            </div>
                    </div>
                ))}
            </Slider>
        </>
    )
}

export default SolutionsListingAbout
