// Settings for slick
$(document).ready(function(){
  $('.carousel').slick({
    // adaptiveHeight: true,
    centerPadding: '0px',
    arrows: false,
    dots: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    mobileFirst: true
  });

  $('.review-slides').slick({
    arrows: true,
    adaptiveHeight: true,
    dots: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    mobileFirst:  true
  });
});