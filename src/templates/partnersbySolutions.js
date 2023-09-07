
import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import Layout from '../components/layout';
import Slider from "react-slick";
// import { StaticImage } from "gatsby-plugin-image"
import active_icon from '../common/images/active_icon.png'
import agreed_icon from '../common/images/agreed_icon.png'
import oem_icon from '../common/images/oem_icon.png';

import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
const PartnersbySolutions = (props) => {
    const currentPage = props.data.wpPage;
    const allWpSolution = props.data.allWpSolution.edges
    const allWpPartner = props.data.allWpPartner.edges
    console.log(currentPage, '===================================')
    const [partners,
        setPartners] = useState(allWpPartner)

    useEffect(() => { }, [])

    const filterPosts = (value) => {
        let getpartners
        // let partners = allWpPartner
        getpartners = value !== "All" ? allWpPartner.filter(partner => partner.node.our_people_fields.parentSolution.find(solution => solution.title === value)) : allWpPartner;
        setPartners(getpartners)

        console.log("getpartners", getpartners)
    }
    return (
        <>
            <Layout
                lang={currentPage.locale.id}
                title={currentPage.seo.opengraphTitle ? currentPage.seo.opengraphTitle : null}
                description={currentPage.seo.opengraphDescription ? currentPage.seo.opengraphDescription : null}
                image={currentPage.featuredImage.node.sourceUrl ? currentPage.featuredImage.node.sourceUrl : null}
            >

<section className="main-slider-wrapper innnerslider our-solution-banner">
                    <div className="main-slider">
                        <div className="item" style={{ backgroundImage: `url(${currentPage.featuredImage ? currentPage.featuredImage.node.sourceUrl : null})` }}>
                            {/* {currentPage.AdditionalFields.heroImageGradent === true ? <div className="feature-image-overlay"></div> : null} */}
                            <img src="https://media.aljhealth.com/wp-content/uploads/2020/12/28082150/hero-transparent.png" className="slider-transparent img-fluid slider-transparent-img" alt="hero-transparent" />
                            <div className="container">
                                <div className="text">
                                    {/* <p className="heading wow fadeIn animated">{SiteTrans.our_partners_label[currentPage.locale.id]}</p> */}
                                    {/* <h1 className="wow fadeIn" data-wow-delay="0.4s" dangerouslySetInnerHTML={{ __html: currentPage.AdditionalFields.heading }} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container-fluid partner-listing-container section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                {console.log('posts after', partners)}
                                <h4>Select partner</h4>
                                <div className="partner-checkbox">
                                    <input id="radio-all" class="radio-custom" name="radio-group" defaultChecked type="radio" value="all" onChange={e => { filterPosts("All") }} />
                                    <label for="radio-all" class="radio-custom-label">All</label>
                                </div>
                                {allWpSolution.map(item => (
                                    <div className="partner-checkbox">
                                        <input id={`radio-${item.node.title}`} class="radio-custom" name="radio-group" type="radio" onChange={e => { filterPosts(item.node.title) }} />
                                        <label for={`radio-${item.node.title}`} class="radio-custom-label">{item.node.title}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    {partners.map(data => (
                                        <div className="col-md-6 mb-4">
                                            <a href={data.node.localizedWpmlUrl}>
                                                <div className="partner-listing-box">
                                                    <div className="row d-flex align-items-center no-gutters">
                                                        <div className="col-6">
                                                            {data.node.our_people_fields.partnerThumbnail.sourceUrl ?
                                                                <img className="img-fluid" src={data.node.our_people_fields.partnerThumbnail !== null ? data.node.our_people_fields.partnerThumbnail.sourceUrl : ''} alt="img" />
                                                                : null}


                                                            <GatsbyImage  image={getImage(data.node.our_people_fields.partnerThumbnail)} alt={"img"} />                                                                                    
                                                        </div>
                                                        <div className="col-6">
                                                            {data.node.our_people_fields.partnerIcon.sourceUrl ?
                                                                <img className="img-fluid" src={data.node.our_people_fields.partnerIcon !== null ? data.node.our_people_fields.partnerIcon.sourceUrl : ''} alt="img" />
                                                                : null}

                                                            <GatsbyImage  image={getImage(data.node.our_people_fields.partnerIcon)} alt={"img"} />   
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}

export default PartnersbySolutions
export const PartnerPortalQuery = graphql`
    query PartnerPortalQuery($id: String!) {
        wpPage(id: { eq: $id }) {
            title
            content
            slug
            id
            featuredImage {
                node {
                gatsbyImage(width: 1320, placeholder: BLURRED)
                altText
                sourceUrl
                }
            }
            template {
                templateName
            }
            locale {
                id
                locale
            }
            seo {
                opengraphTitle
                opengraphDescription
            }
            translated {
                id
                localizedWpmlUrl
                locale {
                id
                locale
                }
                slug
                title
            }
        }
        allWpSolution {
            edges {
                node {
                    id
                    content
                    title
                    link
                    localizedWpmlUrl
                    
                }
            }
        }
        allWpPartner {
            edges {
                node {
                    id
                    title
                    content
                    localizedWpmlUrl
                    featuredImage{
                        node{ 
                            sourceUrl
                        }
                    }
                    our_people_fields {
                        logoBackgroundStyle       
                        partnerThumbnail {
                        sourceUrl
                        }
                        partnerIcon {
                            sourceUrl              
                        }
                        parentSolution {
                        ... on WpSolution {
                            id
                            title              
                        }
                        }
                    }
                }
            }
        }
    }
`;
