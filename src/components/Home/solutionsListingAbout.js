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
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    };
    return (
        <>
            {/* <Slider {...settings}>
                {solutionslistingdata.map(item => (
                    <div>
                        <a href={item.node.localizedWpmlUrl}>
                            <div className="about-solution-inner">
                                {console.log(item.node.press_release_acf)}

<div className="about-solution-inner-img">
{item.node.press_release_acf.icon && item.node.press_release_acf.icon.sourceUrl ?
                                    <img src={item.node.press_release_acf.icon.sourceUrl} alt={"img"} />      
                                    :null}                                                                              
</div>

                                <h6 className="about-solution-title">{item.node.title}</h6>
                            </div>
                        </a>
                    </div>
                ))}
            </Slider> */}
        </>
    )
}

export default SolutionsListingAbout
