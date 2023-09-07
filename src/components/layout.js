import React, {useState, useEffect} from "react"
import {useStaticQuery, graphql, Script } from "gatsby"
import {Helmet} from "react-helmet";
import Seo from "./main/Seo";
import Header from "./main/Header"
import Footer from "./main/Footer"
import './../../static/common/css/default.css';

// import $ from 'jquery';

var load = require('load-script');
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
useEffect(() => handleComponentMounted(), []);



   // https://maps.googleapis.com/maps/api/js?key=AIzaSyDycGYmqlx_zaN1kO0uRN13S6uLEFzk4Ik&callback=initMap
   const handleComponentMounted = () => {
    load('/default.js', function (err, script) {
      console.log(script)
      console.log('from scroty')
        if (err) {
            console.log('error loading default script');
        } else {
            // console.log(script.src);// Prints 'foo'.js' 
        }
    })
    document.querySelectorAll("title").forEach(element => {
        if (element.textContent === "") element.remove() // remove title if its empty
    });
    // if (typeof window !== 'undefined') {
    //     window.initMap = function () {
    //         // Basic options for a simple Google Map
    //         // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    //         var mapOptions = {
    //             // How zoomed in you want the map to start at (always required)
    //             zoom: 11,
    //             // The latitude and longitude to center the map (always required)
    //             center: new window.google.maps.LatLng(43.7384, 7.4246), // New York
    //             // How you would like to style the map. 
    //             // This is where you would paste any style found on Snazzy Maps.
    //             styles: [{ "featureType": "all", "elementType": "all", "stylers": [{ "invert_lightness": true }, { "saturation": 10 }, { "lightness": 30 }, { "gamma": 0.5 }, { "hue": "#435158" }] }]
    //         };
    //         // Get the HTML DOM element that will contain your map 
    //         // We are using a div with id="map" seen below in the <body>
    //         var mapElement = document.getElementById('map');
    //         //if(mapElement)   {
    //         // Create the Google Map using our element and options defined above
    //         var map = new window.google.maps.Map(mapElement, mapOptions);
    //         // Let's also add a marker while we're at itç
    //         var marker = new window.google.maps.Marker({
    //             position: new window.google.maps.LatLng(43.7384, 7.4246),
    //             map: map,
    //             title: 'Snazzy!'
    //         });
    //     }
    // }

    // Sentry.init({
    //   dsn: "https://050d9b0859974084a0158e4b1fd089a0@o4504338663079936.ingest.sentry.io/4504338669371392",
    //   integrations: [new BrowserTracing()],

    //   // Set tracesSampleRate to 1.0 to capture 100%
    //   // of transactions for performance monitoring.
    //   // We recommend adjusting this value in production
    //   tracesSampleRate: 1.0,
    // });
}

  return (
    <div>
      {/* <Script src="/js/main.js" onLoad={() => setLoaded(true)} /> */}
      {/* <Script src="/js/jquery.min.js" onLoad={() => setLoaded(true)} />
      <Script src="/js/slick.min.js" onLoad={() => setLoaded(true)} />
      <Script src="/js/owl.carousel.min.js" onLoad={() => setLoaded(true)} /> */}
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
    <Footer lang={lang}/>        
    </div>
  )
}

export default Layout



