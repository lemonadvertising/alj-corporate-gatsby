import React from 'react';
import {Helmet} from "react-helmet";
export default function Seo({title, description, image}) {
  return (
    <>
          <Helmet>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="../../common/images/meta/favicon.ico" type="image/x-icon"/>
                <title>{title?title:"website"}</title>
                <meta name="Keywords" content="" />
                <meta name="Description" content={description?description:""} />
                <meta property="og:image" content={image?image:"../../common/images/meta/favicon.ico"} />
                <meta property="og:image:type" content="image/*" />
                <meta property="og:image:width" content="436" />
                <meta property="og:image:height" content="228" />
                <meta property="og:title" content={title?title:""} />
                <meta property="og:description" content={description?description:""} />
          </Helmet>
    </>
  );
}

