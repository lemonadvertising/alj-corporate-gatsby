/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `alj-corporate-gatsby`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
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
  }, "gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp"]
};