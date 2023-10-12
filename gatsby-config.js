/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `alj-corporate-gatsby`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    {
    resolve: 'gatsby-source-wordpress',
    options: {
      url: `https://impexpcms.lemonhq.io/wp/graphql`,       
      headers:{
          Authorization:"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc29sdXRpb25jbXMuYWxqaGVhbHRoLmNvbVwvZW5cLyIsImlhdCI6MTY3NDU1MjU2NywibmJmIjoxNjc0NTUyNTY3LCJleHAiOjE2NzQ1NTI4NjcsImRhdGEiOnsidXNlciI6eyJpZCI6IjgifX19.GCNNHjfaYd-rXohKpYiY1N46ES1GRsmd-NMAI06Oh1Q"
      },
      auth: {
          htaccess: {
              username: "aljadmin",
              password: "aljadmin",
          }
      },
      production: {
          allow404Images: true,
          allow401Images: true,
      },
      // html: {
      //     useGatsbyImage: true,
      //     generateWebpImages: true,
      //     placeholderType:'none',
      //     createStaticFiles: true,

      // },
      develop: {
        //caches media files outside of Gatsby's default cache an thus allows them to persist through a cache reset.
        hardCacheMediaFiles: true,
      },   
      schema: {
        previewRequestConcurrency: 150,
        timeout: 600000,
        // perPage: 20, // currently set to 100 600000
        // requestConcurrency: 5, // currently set to 15
        // previewRequestConcurrency: 2, // currently set to 150
        // typePrefix: `Wp`,
      },
      type: {
        News: {
          limit: process.env.NODE_ENV === `development`? 5 : 5000,
        },     
        Page: {
          limit: process.env.NODE_ENV === `development`? 5 : 5000,
        },    
        Inthenews: {
          limit: process.env.NODE_ENV === `development`? 5 : 5000,
        },
        Videogallery: {
          limit: process.env.NODE_ENV === `development`? 5 : 5000,
        },
        Ourpeople: {
          limit: process.env.NODE_ENV === `development`? 5 : 5000,
        },
        Spotlightfadyjameel: {
          limit: process.env.NODE_ENV === `development`? 5 : 5000,
        },
        Perspective: {
          limit: process.env.NODE_ENV === `development`? 5 : 5000,
        },
        // MediaItem: {
        //   exclude: true,
        // },
      },  
    
        
  },
  },
  {
    resolve: `gatsby-plugin-gdpr-cookies`,
    options: {
      googleAnalytics: {
        trackingId: '', // leave empty if you want to disable the tracker
        cookieName: 'gatsby-gdpr-google-analytics', // default
        anonymize: true, // default
        allowAdFeatures: false // default
      },
      hotjar: {
        hjid: '',
        cookieName: 'gatsby-gdpr-hotjar', // default
      },
      // defines the environments where the tracking should be available  - default is ["production"]
      environments: ['production', 'development']
    },
  },
  "gatsby-plugin-next-seo",
  "gatsby-plugin-image",
   "gatsby-plugin-sharp", 
   "gatsby-transformer-sharp",
   "gatsby-plugin-sass",
   {
    resolve: 'gatsby-plugin-load-script',
    options: {
        src: '/main.js',
        crossorigin: 'anonymous',
    },
},
],
};