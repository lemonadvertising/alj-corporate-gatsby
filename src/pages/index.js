// export default function () { return null };

import React,{useEffect} from 'react'

// import { Script } from "gatsby"

export default function Index() {

  useEffect(() => {
    window.location.href = "/en/home";
  })
  
  return (
    <div></div>
  )
}
