const commonFunctions = {
    LoadingAllSliderScript : () => {    
        const script = document.createElement("script");
      script.src = `/js/default.js`;
      script.async = true;
      document.body.appendChild(script);
     
   },

   LoadingBootstrapScript : () => {    
    const script = document.createElement("script");
    script.src = `/js/bootstrap.min.js`;
    script.async = true;
    document.body.appendChild(script);
  
  },


   LoadingMediaSliderScript : () => {    
    const script = document.createElement("script");
  script.src = `/js/sliderDefault.js`;
  script.async = true;
  document.body.appendChild(script);
 
}

  
  }
  
  export default commonFunctions