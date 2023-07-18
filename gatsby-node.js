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

const wpNews = `
 {
  allWpNews {
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
                    console.log(slug, '==========')
                    if (edge.node.slug === "news") {                                       
                        pageTemplate = path.resolve("./src/templates/newsListing.js");                                      
                    }
                    else if (edge.node.slug === "in-the-news") {                                  
                        pageTemplate = path.resolve("./src/templates/inTheNewsListing.js");                                      
                    }
                    else if (edge.node.slug === "insights") {
                        pageTemplate = path.resolve("./src/templates/insightsListing.js");
                    } else if (edge.node.slug === "contact-us") {
                        pageTemplate = path.resolve("./src/templates/contactUs.js");
                    } else if (edge.node.slug === "become-a-partner") {
                        pageTemplate = path.resolve("./src/templates/becomePartner.js");
                    }
                    else {
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
            
          

    });

};
