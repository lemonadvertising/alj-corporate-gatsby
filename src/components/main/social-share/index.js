// import React from 'react';
import React, { useState, useEffect } from 'react'
import "./style.css"
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    // PinterestShareButton
} from "react-share";



import SharePrint from '../../../common/images/socialshare/share-print.png';
import ShareMail from '../../../common/images/socialshare/share-mail.png';
import ShareTwitter from '../../../common/images/socialshare/share-twitter.png';
import ShareWhatsapp from '../../../common/images/socialshare/share-whatsapp.png';
import ShareLinkedin from '../../../common/images/socialshare/share-linkedin.png';
import ShareFb from '../../../common/images/socialshare/share-fb.png';
import ShareCopy from '../../../common/images/socialshare/share-copy.png';
import ShareIcon from '../../../common/images/socialshare/share.png';




import {CopyToClipboard} from 'react-copy-to-clipboard';
export default function SocialShare({title, shareUrl }) {
    const _copyUrl = () => {
        document.getElementById("linkcopiedStories").classList.add("on");
        setTimeout(function () {
            document.getElementById("linkcopiedStories").classList.remove("on");
        }, 3000);
    }

const [showSocial, setShowSocial ] = useState(false)

  return (
    <>
    <div>
        <button type="button" onClick={() => setShowSocial(!showSocial)} class="btn btn-primary">Share</button>
    </div>
    {showSocial?
    <div className="col-md-auto share-options">
                                        <a rel="noreferrer" href="#/" onClick={() => window.print()} className="printbtn"><img src={SharePrint} alt="img" /></a>
                                        <EmailShareButton openShareDialogOnClick={true} onClick={e => e.preventDefault()} subject={title} url={shareUrl}>
                                            <img style={{ margin: 10 }} src={ShareMail} alt="img" />
                                        </EmailShareButton>

                                        <CopyToClipboard className="copybtn" text={shareUrl}>
                                            <img onClick={() => _copyUrl()} onKeyDown={() => _copyUrl()} role="presentation" style={{ margin: 10 }} src={ShareCopy} alt="img" />
                                        </CopyToClipboard>

                                        <WhatsappShareButton title={title} url={shareUrl}>
                                            <img style={{ margin: 10 }} src={ShareWhatsapp} alt="img" />
                                        </WhatsappShareButton>
                                        <LinkedinShareButton title={title} url={shareUrl}>
                                            <img style={{ margin: 10 }} src={ShareLinkedin} alt="img" />
                                        </LinkedinShareButton>
                                        <FacebookShareButton quote={title} url={shareUrl}>
                                            <img style={{ margin: 10 }} src={ShareFb} alt="img" />
                                        </FacebookShareButton>
                                        <TwitterShareButton title={title} url={shareUrl}>
                                            <img style={{ margin: 10 }} src={ShareTwitter} alt="img" />
                                        </TwitterShareButton>
                                        <div id="linkcopiedStories">Link Copied!</div>
    </div>
    :null}
    
    </>
  );
}
