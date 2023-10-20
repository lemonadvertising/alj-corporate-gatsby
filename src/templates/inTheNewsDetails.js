// import React from 'react'
// import { graphql } from "gatsby";
// import Layout from '../components/layout';
// // import { StaticImage } from "gatsby-plugin-image"
// import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
// import RelatedArticles from '../components/MediaCenter/RelatedArticles'
// import SocialShare from "../components/main/social-share"
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// const Page = (props) => {
//   const currentPage = props.data.wpInthenews;
//   const relatedNews = props.data.allWpInthenews
//   const urlLang = props.pageContext.lang == "en_US" ? "en" : "ar"
 
//   return (
    
//     <Layout
//     lang={currentPage.locale.id}
//     title={currentPage.seo.opengraphTitle?currentPage.seo.opengraphTitle:null}
//     description={currentPage.seo.opengraphDescription?currentPage.seo.opengraphDescription:null}
//     image={currentPage.featuredImage.node.sourceUrl?currentPage.featuredImage.node.sourceUrl:null}
//     >

//        <div className='container'>
//         <div className='row'>      
//         <div className='col-md-12'>
          
//         <div className='heroSection'>
//         <GatsbyImage image={getImage(currentPage.featuredImage.node)} alt={currentPage.featuredImage.node?currentPage.featuredImage.node:"image"} />
//         </div>
        
//         <SocialShare
//           title = {currentPage.seo.opengraphTitle?currentPage.seo.opengraphTitle:null}
//           ShareMail = {props.location.href}
//           shareUrl = {props.location.href}
//           ShareCopy ={currentPage.seo.opengraphDescription?currentPage.seo.opengraphDescription:null}
//           />
        
//           <div dangerouslySetInnerHTML={{__html:currentPage.content}} />

//           {console.log("currentPage",currentPage)}

     
//         </div>  
//         </div>
//       </div>    
//       <RelatedArticles 
//         relatedNews = {props.data.allWpInthenews}
//         getCatetory="inthenewscategories"
//       />

//       </Layout>
//   )
// }

// export default Page
// export const wpNewsPage = graphql`
//   query wpInthenewsPage($id: String!) {
//     wpInthenews(id: { eq: $id }) {
//       title
//       content      
//       id 
//       featuredImage {
//         node {
//           gatsbyImage(width: 730, placeholder: BLURRED)
//           altText
//           sourceUrl
//         }
//       }
//       locale {
//         id
//       }
//       seo {
//         opengraphTitle
//         opengraphDescription
//       }

//     }
//     allWpInthenews(filter: {id: {ne: $id}, locale: {id: {eq: "en_US"}}}, limit: 6,sort: {fields: date, order: DESC}) {
//       edges {
//           node {
//               title
//               id
//               localizedWpmlUrl
//               slug
//               date(formatString: "MMMM D, Y")
//               featuredImage {
//                   node {
//                     gatsbyImage(width: 730, placeholder: BLURRED)
//                     altText
//                     sourceUrl
//                     locale {
//                       id
//                     }
//                   }
//               }
//               locale {
//                   id
//                   locale
//               }
//               translated {
//                   id
//                   localizedWpmlUrl
//                   locale {
//                       id
//                       locale
//                   }
//                   slug
//                   title
//               }
//               inthenewscategories {
//                 nodes {
//                   name
//                   slug
//                 }
//               }
//               press_release_acf {
//                   summary
//                   shortTitle
//                   featured
//                   location
//               }
//           }
//       }
//   }
//   }
// `;

