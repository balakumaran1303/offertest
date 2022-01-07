$(function() {
    $(".alert-container").each(function(index) {
        var autoplay = eval($(this).find('.alert-section').attr('data-transition'));
        var autoplaySpeed = eval($(this).find('.alert-section').attr('data-carousel-speed'));
        var milliseconds = autoplaySpeed !== undefined ? autoplaySpeed : 6000;
        var transition = autoplay !== undefined ? autoplay : false;
        let alertCarousel = $(this).find(".alert-section");
        initializeSlick(alertCarousel, $(this), 1, 1, [], true, transition, false, milliseconds);
    });
});

function initializeSlick(_this, carouButtons, slidesToShow, slidesToScroll, responsiveArray, dots = false, autoplay = false, infinite = false, autoplaySpeed = 6000) {
    const slickConfig = {
        mobileFirst: true,
        dots,
        infinite,
        slidesToShow,
        slidesToScroll,
        autoplay,
        autoplaySpeed,
        prevArrow: $(carouButtons).find('.prev-button'),
        nextArrow: $(carouButtons).find('.next-button'),
        responsive: responsiveArray,
    };
    $(_this).slick(slickConfig);
    }

    function carouselResponsiveBrkPnts(tabletSlides, desktopSlides, tabletScroll = 1, desktopScroll = 1) {
    const responsive = [{
            breakpoint: 1024,
            settings: {
                slidesToShow: desktopSlides,
                slidesToScroll: desktopScroll,
                centerMode: false,
            },
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: tabletSlides,
                slidesToScroll: tabletScroll,
                centerMode: false,
            },
        }
    ];
    return responsive;
}