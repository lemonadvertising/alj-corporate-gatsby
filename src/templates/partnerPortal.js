import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from '../components/layout';


const PartnerPortal = (props) => {
    const currentPage = props.data.wpPage;
    const filterpost = (e) => {

    }

    return (
        <React.Fragment>
            <Layout
                lang={currentPage.locale.id}
                title={currentPage.seo.opengraphTitle ? currentPage.seo.opengraphTitle : null}
                description={currentPage.seo.opengraphDescription ? currentPage.seo.opengraphDescription : null}
                image={currentPage.featuredImage.node.sourceUrl ? currentPage.featuredImage.node.sourceUrl : null}>
                <div className="container">
                    <div className='col-md-12'>
                        <div className='heroSection'>
                            <GatsbyImage image={getImage(currentPage.featuredImage.node)} alt={currentPage.featuredImage.node ? currentPage.featuredImage.node : "image"} />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h4>Select Partner</h4>
                            <div className="partner-checkbox">
                                <input type="radio" id='radio-call' class='radio-custom' defaultChecked value='all' onChange={e => { filterpost('All') }} />
                                <lable for='radio-call' class='radio-custom-label'>All</lable>
                            </div>
                            <div className="partner-checkbox">
                                <input type="radio" id="radio-call" class='radio-custom' value='medicalImagingSolutions' onChange={e => { filterpost('medicalImagingSolutions') }} />
                                <label for="radio-call" class='radio-custom-label'>Oncology Solutions</label>
                            </div>
                            <div className="partner-checkbox">
                                <input type="radio" id="radio-call" class='radio-custom' value='medicalImagingSolutions' onChange={e => { filterpost('medicalImagingSolutions') }} />
                                <label for="radio-call" class='radio-custom-label'>Immunology Solutions</label>
                            </div>
                            <div className="partner-checkbox">
                                <input type="radio" id="radio-call" class='radio-custom' value='medicalImagingSolutions' onChange={e => { filterpost('medicalImagingSolutions') }} />
                                <label for="radio-call" class='radio-custom-label'>Diagnostics Solutions</label>
                            </div>
                            <div className="partner-checkbox">
                                <input type="radio" id="radio-call" class='radio-custom' value='medicalImagingSolutions' onChange={e => { filterpost('medicalImagingSolutions') }} />
                                <label for="radio-call" class='radio-custom-label'>Point of Care Solutions</label>
                            </div>


                        </div>

                    </div>
                </div>

            </Layout>
        </React.Fragment>

    )

};
export default PartnerPortal;
export const PartnerPortalQuery = graphql`
    query PartnerPortalQuery($id: String!, $langCode: ID!) {
        wpPage(id: { eq: $id }) {
            title
            content
            slug
            id
            featuredImage {
                node {
                  gatsbyImage(width: 1320, placeholder: BLURRED)
                  altText
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
        allWpInquiryemail(filter: { locale: { id: { eq: $langCode } } }) {
            edges {
                node {
                    title
                    databaseId
                }
            }
        }
        site {
            id
            siteMetadata {
                title
            }
        }
    }
`;
