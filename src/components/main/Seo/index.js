import React from 'react';
import {Helmet} from "react-helmet";
import ogShare from "../../../common/images/og-share.jpg"
import { GatsbySeo } from 'gatsby-plugin-next-seo';
export default function Seo({title, description, image, url}) {
  return (
    <>

<GatsbySeo
            title = {title?title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. "}
            description = {description?description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a mattis orci. Phasellus euismod at lectus nec scelerisque. Maecenas sed massa a turpis eleifend dignissim. Integer lobortis eros in dui blandit"}
  openGraph = {{
       url: url?url:"https://jcstaging.gatsbyjs.io/",
      title: title?title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        description: description?description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a mattis orci. Phasellus euismod at lectus nec scelerisque. Maecenas sed massa a turpis eleifend dignissim. Integer lobortis eros in dui blandit",
          images: [
            {
              url: image?image:ogShare,
            }

          ],
            site_name: "website",
            }
}
/>
    {/* {console.log(image,'***********************************************')}
          <Helmet>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="../../common/images/meta/favicon.ico" type="image/x-icon"/>
                <title>{title?title:"website"}</title>
                <meta name="Keywords" content="" />
                <meta name="Description" content={description?description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a mattis orci. Phasellus euismod at lectus nec scelerisque. Maecenas sed massa a turpis eleifend dignissim. Integer lobortis eros in dui blandit, "} />
                <meta property="og:image" content={ogShare} />
                <meta property="og:image:type" content="image/x-icon" />
                <meta property="og:image:width" content="436" />
                <meta property="og:image:height" content="228" />
                <meta property="og:title" content={title?title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. "} />
                <meta property="og:description" content={description?description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a mattis orci. Phasellus euismod at lectus nec scelerisque. Maecenas sed massa a turpis eleifend dignissim. Integer lobortis eros in dui blandit, "} />
          </Helmet> */}
    </>
  );
}

