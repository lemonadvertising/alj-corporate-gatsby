const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);
const fs = require("fs");

var langMapping = [];
langMapping["en_US"] = "en";
langMapping["ar"] = "ar";
langMapping["tr_TR"] = "tr";

var langSlugMapping = [];
langSlugMapping["en_US"] = "en/";
langSlugMapping["ar"] = "ar/";
langSlugMapping["tr_TR"] = "tr/";

const pageQuery = `
{
  allWpPage {
    edges {
      node {
        id
        slug
        uri
        locale {
          id
          locale
        }
        localizedWpmlUrl
      }
    }
  }
}
`

const wpPressrelease = `
 {
  allWpPressrelease {
    edges {
      node {
        id
        title
        slug
        uri
        locale {
          id
          locale
        }
        localizedWpmlUrl
      }
    }
  } 
} `

const inthenewsQuery = `
 {
  allWpInthenews {
    edges {
      node {
        id
        title
        slug
        uri
        locale {
          id
          locale
        }
        localizedWpmlUrl
      }
    }
  } 
} `
const insightsQuery = `
 {
  allWpPerspective {
    edges {
      node {
        id
        title
        slug
        uri
        locale {
          id
          locale
        }
        localizedWpmlUrl
      }
    }
  } 
} `

const wpStyle = `
 {
  wp {
    themeStylesheet
  }
} `

exports.createPages = ({ actions, graphql, reporter }) => { 
    return new Promise((resolve, reject) => {
        // Pages
        graphql(pageQuery)
            .then(result => {
                if (result.errors) {
                    console.log(result.errors);
                    reject(result.errors);
                }

                let pageTemplate;
                _.each(result.data.allWpPage.edges, edge => {             
                    var slug = "/"+langSlugMapping[edge.node.locale.id]+edge.node.slug+"/";
                    pageTemplate = path.resolve("./src/templates/page.js");
                    if (edge.node.slug === "news") {                                       
                      pageTemplate = path.resolve("./src/templates/newsListing.js");                                      
                    } else if (edge.node.slug === "in-the-news") {                                  
                      pageTemplate = path.resolve("./src/templates/inTheNewsListing.js");                                      
                    } else if (edge.node.slug === "perspectives") {
                      pageTemplate = path.resolve("./src/templates/insightsListing.js");
                    } else if (edge.node.slug === "become-a-partner") {
                      pageTemplate = path.resolve("./src/templates/becomePartner.js");
                    } else if (edge.node.slug === "contact-us") {
                      pageTemplate = path.resolve("./src/templates/contactUs.js");
                    } else {
                      pageTemplate = path.resolve("./src/templates/page.js");  
                    }
                   
                    actions.createPage({
                        path: `${slug}`,
                        component: slash(pageTemplate),
                        //  context: node
                        ownerNodeId: edge.node.id,
                        context: {
                            id: edge.node.id,
                            lang: langMapping[edge.node.locale.id],
                            langCode: edge.node.locale.id

                        },
                    });

                });
                resolve();     

            })
            .then(() => {
              graphql(wpPressrelease)
                  .then(result => {
                      if (result.errors) {
                          console.log(result.errors);
                          reject(result.errors);
                      }
                      const postTemplate = path.resolve("./src/templates/newsDetails.js");
                      _.each(result.data.allWpPressrelease.edges, edge => {
                          if (edge.node.locale.id === "en_US") {
                              actions.createRedirect({ fromPath: '/news/' + edge.node.slug, toPath: edge.node.localizedWpmlUrl, redirectInBrowser: true, isPermanent: true })
                              actions.createRedirect({ fromPath: '/news/' + edge.node.slug + "/", toPath: edge.node.localizedWpmlUrl, redirectInBrowser: true, isPermanent: true })
                          }
                          actions.createPage({
                              path: `/${langSlugMapping[edge.node.locale.id]}news/${edge.node.slug}/`,
                              component: slash(postTemplate),
                              ownerNodeId: edge.node.id,
                              context: {
                                  id: edge.node.id,
                                  lang: edge.node.locale.id

                              },
                          });
                      });
                      resolve();
                  });
          })
          .then(() => {
            graphql(inthenewsQuery)
                .then(result => {
                    if (result.errors) {
                        console.log(result.errors);
                        reject(result.errors);
                    }
                    const postTemplate = path.resolve("./src/templates/inTheNewsDetails.js");
                    _.each(result.data.allWpInthenews.edges, edge => {
                        if (edge.node.locale.id === "en_US") {
                            actions.createRedirect({ fromPath: '/in-the-news/' + edge.node.slug, toPath: edge.node.localizedWpmlUrl, redirectInBrowser: true, isPermanent: true })
                            actions.createRedirect({ fromPath: '/in-the-news/' + edge.node.slug + "/", toPath: edge.node.localizedWpmlUrl, redirectInBrowser: true, isPermanent: true })
                        }
                        actions.createPage({
                            path: `/${langSlugMapping[edge.node.locale.id]}in-the-news/${edge.node.slug}/`,
                            component: slash(postTemplate),
                            ownerNodeId: edge.node.id,
                            context: {
                                id: edge.node.id,
                                lang: edge.node.locale.id
                            },
                        });
                    });
                    resolve();
                });
        })   .then(() => {
          graphql(insightsQuery)
              .then(result => {
                  if (result.errors) {
                      console.log(result.errors);
                      reject(result.errors);
                  }
                  const postTemplate = path.resolve("./src/templates/insightsDetails.js");
                  _.each(result.data.allWpPerspective.edges, edge => {
                      if (edge.node.locale.id === "en_US") {
                          actions.createRedirect({ fromPath: '/insights/' + edge.node.slug, toPath: edge.node.localizedWpmlUrl, redirectInBrowser: true, isPermanent: true })
                          actions.createRedirect({ fromPath: '/insights/' + edge.node.slug + "/", toPath: edge.node.localizedWpmlUrl, redirectInBrowser: true, isPermanent: true })
                      }
                      actions.createPage({
                          path: `/${langSlugMapping[edge.node.locale.id]}insights/${edge.node.slug}/`,
                          component: slash(postTemplate),
                          ownerNodeId: edge.node.id,
                          context: {
                              id: edge.node.id,
                              lang: edge.node.locale.id
                          },
                      });
                  });
                  resolve();
              });
        })
          .then(() => {
            graphql(wpStyle)
                .then(result => {
                    // console.log("result",result)

                    if (result.errors) {
                        console.log("result",result.errors);
                        reject(result.errors);
                    }      
                      try{
                      // fs.writeFileSync("./public/themeStylesheet.css",result.data.wp.themeStylesheet)        
                      }catch(e){}
                    resolve();
                });
          })
          

    });

};
