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

// $(document).ready(function () {
//     $('.inner-wrapper>ul>li>a').each(function () {
//         var oldUrl = $(this).attr("href"); // Get current url
//         var newUrl = oldUrl.replace("/en/#", "#/"); // Create new url
//         $(this).attr("href", newUrl);
//     });
// });



// $('#exampleModalCenter').on('show.bs.modal', function (e) {
//   console.log('dddddddd');
//     var url = $('#hiddeniframeurl').val();
//     $('#videoframe').attr('src', url);
// });
// $('#exampleModalCenter').on('hide.bs.modal', function (e) {
//     $('#videoframe').attr('src', "");
// });

