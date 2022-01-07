$(() => {
    $('.slick-carousel').each(function (index) {
          const noOfCards = $(this).hasClass('banner-carousel');
      const autoplay = eval($(this).find('.rotating-carousel').attr('data-transition'));
      const autoplaySpeed = eval($(this).find('.rotating-carousel').attr('data-carousel-speed'));
  
      const milliseconds = autoplaySpeed !== undefined ? autoplaySpeed : 6000;
      const transition = autoplay !== undefined ? autoplay : false;
  
      if (noOfCards) {
        const bannerCarousel = $(this).find('.slick-slider');
        const _this = $(this);
        $(this).imagesLoaded().done((instance) => {
          initializeSlick(bannerCarousel, _this, 1, 1, [], true, transition, true, milliseconds);
          bannerCarousel.removeClass('opacity-0');
        });
      } else {
        const offerCarousel = $(this).find('.slick-slider');
        const _this = $(this);
        $(this).imagesLoaded().done((instance) => {
          initializeSlick(offerCarousel, _this, 1, 1, carouselResponsiveBrkPnts(3, 4), false, transition, false, milliseconds);
          offerCarousel.removeClass('opacity-0');
          _this.find('.offer-carousel').removeClass('opacity-0');
        });
      }
    });
  
    // // Tabs nav links
    //   $(document).on('keydown', '.axSlickDot', function(e) {
    //       const currentBtn = $(this);
    //       const currentCardWrapper = currentBtn.parents();
  
    //       function next() {
    //           $(currentCardWrapper.next().children().focus());
    //       }
  
    //       function prev() {
    //           $(currentCardWrapper.prev().children().focus());
    //       }
  
    //       switch (e.which) {
    //           case keyCode.LEFT:
    //               prev();
    //               break;
    //           case keyCode.RIGHT:
    //               next();
    //               break;
    //       }
    //   });
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
        accessibility: true,
        prevArrow: $(carouButtons).find('.prev-button'),
        nextArrow: $(carouButtons).find('.next-button'),
        responsive: responsiveArray,
    };

    $(_this).on('afterChange', function(event, slick, currentSlide) {
        const slider = this;
        var sliderParent = $(this).parent().find('.offer-carousel');
        var currentArrowPrevWrapper = sliderParent.children(".prev-button");
        var currentArrowNextWrapper = sliderParent.children(".next-button");

        if(slick.shouldClick) {
          if (currentArrowNextWrapper.hasClass('slick-disabled')) {
              $(currentArrowPrevWrapper.focus());
          } else if (currentArrowPrevWrapper.hasClass('slick-disabled')) {
              $(currentArrowNextWrapper.focus());
          }
        }
    });

    $(_this).on('init reInit', function(event, slick, currentSlide) {
        const slider = this;
        let dots = $('.slick-dots > LI > BUTTON', slider);
            $.each(dots, function(i, e) {
                let attr = "Selected" + (i + 1) + "of" + slick.slideCount;
                $(this).attr('aria-label', attr);
                $(this).addClass('axSlickDot');
            });
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