import React from 'react';
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, Link } from "gatsby";
import SocialShare from "../main/social-share"
export default function Cards({url, imageUrl, imageAlt, date, location, shortTitle, shortSummary, shareUrl, category, featured, shocialShare}) {    
  return (
    <div className='col-md-4'>
      <div className="card" style={{marginBottom:30}}>
              <GatsbyImage className="card-img-top"  image={getImage(imageUrl)} alt={imageAlt} />           
              <div className="card-body">
                <h5 className="card-title">{shortTitle}</h5>
                <p className="card-text">{shortSummary}</p>
                <p className="card-text">Location: {location}</p>
                <p className="card-text">Date: {date}</p>
                <p className="card-text">Category: {category}</p>                    
                <div className='row'>
                  <div className='col-4'><Link  className="btn btn-primary" to={url}>Read More</Link></div>
                  <div className='col-8'>
                    {shocialShare !== "hide"?                    
                    <SocialShare
                    title = {shortTitle}
                    shareUrl = {shareUrl}
                    />:null}</div>
                </div>                
              </div>
      </div>
    </div>   
  );
}


