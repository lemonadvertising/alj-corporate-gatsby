import React, {useState} from "react"
import {useStaticQuery, graphql, Script } from "gatsby"
import {Helmet} from "react-helmet";
import Seo from "./main/Seo";
import Header from "./main/Header"
// import Footer from "./main/Footer"
// import metaImage from "../common/images/meta/metaImage.jpeg"


const Layout = ({ title,  description, image, isHomePage, children, lang }) => {

  const layoutData =  useStaticQuery(graphql`
    query LayoutQuery {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)
const [loaded, setLoaded] = useState(false)  
  return (
    <div>
      <Script src="/js/main.js" onLoad={() => setLoaded(true)} />
      {loaded && <Script src="/js/default.js" />}                            
      <Helmet>
      {lang === "ar" ? <body className="arabic" /> : <body className="english" />}          
       </Helmet>
      <Seo
      title={title?title:layoutData.wp.generalSettings.title}
      description={description?description:layoutData.wp.generalSettings.description}
      image={image?image:""}
      />
      <Header />
      <div className="mainWrapper">
      <main style={{minHeight:500, paddingBottom:100}}>{children}</main>
      </div>
    {/* <Footer lang={lang}/>         */}
    </div>
  )
}

export default Layout



