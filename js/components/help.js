// $(document).ready(() => {
//     $('.help-toggel').on('click', function(e) {
//         var button = $(this);
//         button.text(button.text() == "Open All" ? "Close All" : "Open All")

//         var _this = $('.accordian-section').children().children('.accordian-title');
//         toggleAria(_this);
//         var _thisAccordian = $('.accordian-section').children().children('.collapse');
//         toggelAccordian(_thisAccordian);
//     });
// });


// function toggelAccordian(_this) {
//     let classCheck = _this.hasClass('show');
//     if (classCheck) {
//         _this.removeClass('show');
//     } else {
//         _this.addClass('show');
//     }
// }

function initializeSlick(_this, carouButtons, slidesToShow, slidesToScroll, responsiveArray, dots = false, autoplay = false, infinite = false, autoplaySpeed = 6000) {
    const slickConfig = {
        mobileFirst: true,
        dots,
        infinite,
        slidesToShow,
        slidesToScroll,
        autoplay,
        autoplaySpeed,
        accessibility: true,
        prevArrow: $(carouButtons).find('.prev-button'),
        nextArrow: $(carouButtons).find('.next-button'),
        responsive: responsiveArray,
    };

    $(_this).on('init reInit afterChange', function(event, slick, currentSlide) {
        const slider = this;
        var sliderParent = $(this).parent().find('.offer-carousel');
        var currentArrowWrapper = sliderParent.children('.prev-button');
        console.log('slider', sliderParent);
        setTimeout(function() {
            let dots = $('.slick-dots > LI > BUTTON', slider);
            $.each(dots, function(i, e) {
                let attr = "Selected" + (i + 1) + "of" + slick.slideCount;
                $(this).attr('aria-label', attr);
                $(this).addClass('axSlickDot');
            });
        }, 100);

        if (slick.$slides.length == currentSlide + slick.options.slidesToScroll) {
            console.log("Last slide");
            $(currentArrowWrapper.focus());
        }
    }).slick(slickConfig);
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