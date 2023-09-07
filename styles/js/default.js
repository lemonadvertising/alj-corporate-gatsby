// JavaScript Document
     $(window).scroll(function(){
         if ($(document).scrollTop() > 50) { 
          $(".alj-nav").css("background-color", "#0d233b"); 
        } else {
          $(".alj-nav").css("background-color", "transparent"); 
        }
        });
                      
          
 
                      
$(document).ready(function () {
                  new WOW().init();
   
// $("body").scrollspy({target: ".navbar", offset:300});
      $('.sc').smoothScroll();
    

    
    
    $("a[href='#top']").click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});
    

    $(".main-slider").on("init", function(event, slick){
    $(".count").text(parseInt(slick.currentSlide + 1) + ' / ' + slick.slideCount);

});

$(".main-slider").on("afterChange", function(event, slick, currentSlide){
    $(".count").text(parseInt(slick.currentSlide + 1) + ' / ' + slick.slideCount);
});
$(".main-slider").slick({
     nextArrow: $('.next'),
    prevArrow: $('.prev'),
     fade: true,
  cssEase: 'linear'
});
    
    
    
    
    
    
    
$('.partners-slider').slick({
 dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 3,
       nextArrow: $('.partner-next'),
    prevArrow: $('.partner-prev'),
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    }]
});
    
    
    
//var $mainSlider = $('.main-slider');
//    
//$mainSlider.slick({
//    nextArrow: $('#next'),
//    prevArrow: $('#prev'),
//    autoplay: false,
//    onInit: function(e){
//$mainSlider.append('<div class="slick-counter">'+ parseInt(e.currentSlide + 1, 10) +' / '+ e.slideCount +'</div>');
//  },
//  onAfterChange: function(e){
//  $mainSlider.find('.slick-counter').html(e.currentSlide + 1 +' / '+e.slideCount);
//  }
//});
    
    var vid = document.getElementById("video");
vid.ontimeupdate = function(){
  var percentage = ( vid.currentTime / vid.duration ) * 100;
  $("#custom-seekbar span").css("width", percentage+"%");
};

$("#custom-seekbar").on("click", function(e){
    var offset = $(this).offset();
    var left = (e.pageX - offset.left);
    var totalWidth = $("#custom-seekbar").width();
    var percentage = ( left / totalWidth );
    var vidTime = vid.duration * percentage;
    vid.currentTime = vidTime;
});
    


}); 




