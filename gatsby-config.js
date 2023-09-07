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
      url: `https://aljcms.lemonhq.io/graphql`,
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
      html: {
          useGatsbyImage: true,
          generateWebpImages: true,
          placeholderType:'none',
          createStaticFiles: true,

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
  {
    resolve: 'gatsby-plugin-next-seo',
    options: {
      openGraph: {
        title: "jc",
        type: 'website',
        locale: 'en_US',
        description: "",
        images: [
          {
            url: 'https://media.aljhealth.com/wp-content/uploads/2021/03/31085452/meta-image-2.png',
            //secure_url:'https://media.aljhealth.com/wp-content/uploads/2021/03/31085452/meta-image-2.png',
            // type:'image/jpeg',
            // itemprop:'image',
            alt: 'jc'
          }
        ],
        site_name: 'jc',
      },

    },
  },
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
]
};