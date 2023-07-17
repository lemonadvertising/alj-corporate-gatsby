import React from 'react';
import { BlockRendererProvider,  BlockRenderer, getStyles, getClasses} from '@webdeveducation/wp-block-tools'
const youtubeEmbed = require('youtube-embed')

const BlockRendererComponents = ({data}) => {
  {console.log("data",data)}
  return (<BlockRendererProvider 
       allBlocks={data.blocks}
       key={data.id}
       renderComponent={(block) => {        
        switch(block.name){
          case "core/image":{            
            return (<div key={block.id} style={getStyles(block)} className={getClasses(block)}>    
                <div  style={{maxWidth:block.attributes.width}}  dangerouslySetInnerHTML={{__html:block.originalContent}} />                      
            </div>)
          }
          case "core/embed":{    
            return (       
            <div class="customYoutubeVideoWrapper">              
            {block.attributes.providerNameSlug === "youtube" ? <div className='customYoutubeVideo'>
              <iframe width="560" height="315" src={youtubeEmbed(block.attributes.url)}  frameborder="0"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div> : block.attributes.providerNameSlug === "vimeo" ? <div className='customVimeoVideo'><iframe src={`https://player.vimeo.com/video/${block.attributes.url.slice(18)}`} width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>:null}
                <div   dangerouslySetInnerHTML={{__html:block.originalContent}} />                       
            </div>
            )
          }
          default:
            return null
        }
       }       
       }       
       /> )
       }
export default BlockRendererComponents;
