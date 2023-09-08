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
    </>
  );
}

