// JavaScript Document
//var vid = $("#video");
//add





// var maplocationfile = 'https://jameelhealthcms.aljhealth.com/mapLocations.json';
// if (window.location.href.indexOf("/ar/") > -1) {
//     maplocationfile = 'https://jameelhealthcms.aljhealth.com/mapLocationsAR.json';
// }else if (window.location.href.indexOf("/tr/") > -1) {
//     maplocationfile = 'https://jameelhealthcms.aljhealth.com/mapLocationsTR.json';
// }

// $('#mapplic').mapplic({
//     source: maplocationfile,
//     sidebar: false,
//     thumbholder: true,
//     minimap: true,
//     zoombuttons: false,
//     fullscreen: false,
//     lightbox: true,
//     maxscale: 1,
//     developer:false,
//     hovertip: false,
//     zoomoutclose:true,
//     height: 450,
//     mousewheel:false,
//     zoom:false,
 
// });


$(document).ready(function() {
    var maplocationfile = 'https://jameelhealthcms.aljhealth.com/worldMapLocations.json';
    if (window.location.href.indexOf("/ar/") > -1) {
        maplocationfile = 'https://jameelhealthcms.aljhealth.com/worldMapLocationsAR.json';
    }else if (window.location.href.indexOf("/tr/") > -1) {
        maplocationfile = 'https://jameelhealthcms.aljhealth.com/worldMapLocationsTR.json';
    }
    var css = '.mapplic-filtered svg [id^=landmark] > * {opacity: 1 !important; }';
    $('#mapplic')?.mapplic({
        source: maplocationfile,
        height: 600,
        sidebar: false,
        marker: 'hidden',
        fullscreen: false,
        maxscale: 1,
        zoombuttons: false,
        minimap: false,
        legends:false,
		zoom:false,
		mousewheel:false,
		zoomoutclose:false,
		thumbholder: false,
		hovertip: true
    });
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


}); 


function newssliderOne() {
    $('.latest-news-slider-1').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: $('.latest-news-partner-next-1'),
        prevArrow: $('.latest-news-partner-prev-1'),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }]
    });
}

function newssliderTwo() {
    $('.latest-insights-slider-1').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: $('.latest-insights-partner-next-1'),
        prevArrow: $('.latest-insights-partner-prev-1'),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }]
    });
}

newssliderOne();
newssliderTwo();

$(document).ready(function () {
    $('.insights_block').hide();
    $('.news_btn').click(function () {
        $('.insights_block').hide();
        $('.news_block').show();
        $('.news_btn').removeClass('tabs-inactive');
        $('.insights_btn').addClass('tabs-inactive');
        newssliderOne();

    });
    $('.insights_btn').click(function () {
        $('.insights_block').show();
        $('.news_block').hide();
        $('.insights_btn').removeClass('tabs-inactive');
        $('.news_btn').addClass('tabs-inactive');
    });
    newssliderTwo();
});
