function resize() {
    if ($(window).width() < 1152) {
      if (!$('.header-navbar-links').hasClass('slide-menu-container')) {
        $('.header-navbar-links').addClass('nav-position slide-menu-container slide-out').removeClass('position-relative');
        $('.navbar-dropdown').addClass('nav-position slide-menu-container slide-out').removeClass('sub-menu-container');
      }
      updateTabIndex($('.mobile-signin a'), '0');
      updateTabIndex($('.navbar-dropdown a, .navbar-dropdown button'), '-1');
      $('.navbar-dropdown').removeClass('d-none d-xl-block').addClass('d-block d-xl-none');
    } else if (!$('.navbar-dropdown').hasClass('sub-menu-container')) {
      $('.header-navbar-links').removeClass('slide-menu-container slide-out nav-position');
      $('.navbar-dropdown').removeClass('nav-position slide-menu-container slide-out').addClass('sub-menu-container');
      $('header').find('.nav-backdrop').removeClass('in').addClass('d-none');
      $('.navbar-dropdown').removeClass('d-xl-none d-block').addClass('d-xl-block d-none');
      updateTabIndex($('.mobile-signin a'), '-1');
    }
  }
  // watch window resize
  $(window).on('resize', () => {
    resize();
  });
  $(() => {
    const mobNavClose = $('header').find('.nav-close-icon');
    const navBar = $('header .nav-bar');
    const navArrow = '.nav-menu-arrow svg';
    const navLink = '.nav-menu-link';
    const navbarDropdown = '.navbar-dropdown';
    resize();
    scrollClassUpdate('transparent');
    if (!$('.components-wrap').children().children('div:first-child').hasClass('herobanner')) {
      $('.components-wrap').addClass('aem-component-top');
    }
    $('.components-wrap').attr({ id: 'maincontent', role: 'main' });
    $('header').removeClass('d-none');
    $('.header-navbar-links').removeClass('d-none');
  
    /** * Open/Close nav menu - mobile ** */
    function openMenu(_this, type, submenu) {
      if ($(window).width() < 1151) {
        if (type == 'toggle') {
          _this.toggleClass('slide-out');
          $('header').find('.nav-backdrop').addClass('in').removeClass('d-none');
        } else if (type == 'add') {
          $('header .slide-menu-container').addClass('slide-out');
          $('header').find('.nav-backdrop').removeClass('in').addClass('d-none');
          toggleAria($('header'), 'all');
        } else if (type == 'addSubMenu') {
          $('header .navbar-dropdown').addClass('slide-out');
        }
        if (submenu) {
          mobNavClose.addClass('d-md-flex');
        } else {
          mobNavClose.addClass('d-none').removeClass('d-md-flex');
        }
      } else {
        if (type == 'toggle') {
          const cureleSiblings = _this.parents('.nav-menu').siblings();
          if (cureleSiblings.not(_this.parent('.nav-menu')).find(navbarDropdown).hasClass('open')) {
            cureleSiblings.find(navbarDropdown).removeClass('open');
            cureleSiblings.find(navArrow).removeClass('rotate-180');
            cureleSiblings.find('.nav-menu-link').removeClass('active');
          }
          _this.toggleClass('open');
          _this.siblings(navLink).toggleClass('active');
          _this.siblings(navLink).find(navArrow).toggleClass('rotate-180');
        } else if (type == 'add') {
          $('header .sub-menu-container').removeClass('open');
          $(`header ${navLink}`).removeClass('active');
          $(`header ${navLink}`).find(navArrow).removeClass('rotate-180');
        }
  
        if ($('header .navbar-dropdown').hasClass('open')) {
          scrollClassUpdate('');
        } else if ($(window).scrollTop() < 50) {
          scrollClassUpdate('transparent');
        }
      }
    }
  
    /** * Close header menus ** */
    function closeHeaderMenus(_this) {
      /** close sign-in popup * */
      if (!$(_this).closest('.notification-container').length
              && !$(_this).hasClass('prelogin-signin-btn')) {
        signinPopup('hide', '');
        toggleAria($('header .notification-container').parent(), 'all');
      }
      /** close main menu * */
      if (!$(_this).closest('.sub-menu-container').length
              && !$(_this).closest('.slide-menu-container').length
              && !$(_this).hasClass('nav-menu-link')
              && !$(_this).parents().hasClass('nav-menu-link')
              && !$(_this).closest('.navbar-dropdown').length) {
        console.log('close main menu',_this, _thisParent);
        openMenu($('header'), 'add', false);
        toggleAria($(`header ${navLink}`).parent(), 'all');
  
        openMenu(_this.closest('.navbar-dropdown'), 'add', false);
        updateTabIndex($('.navbar-dropdown a, .navbar-dropdown button'), '-1');
        if ($(window).width() < 1151) {
          updateTabIndex($('header nav a, header nav button'), '-1', '');
          updateTabIndex($('.header-navbar-links > .nav-close-menu button'), '-1');
        }
      }
      if ($(window).width() < 1151) {
        if (!$(_this).closest('.navbar-dropdown').length
                  && $('.navbar-dropdown.slide-menu-container.slide-out').length === $('.navbar-dropdown.slide-menu-container').length - 1) {
          openMenu($('header .navbar-dropdown'), 'addSubMenu', false);
          updateTabIndex($('.navbar-dropdown a, .navbar-dropdown button'), '-1');
          toggleAria($(_this).parents('.navbar-dropdown').siblings('.nav-menu-link'), '');
        }
      }
      if ($(_this).hasClass('nav-menu-link')) {
        const cureleSiblings = $(_this).parents('.nav-menu').siblings();
        if (cureleSiblings.not($(_this).parent('.nav-menu')).find(navbarDropdown).hasClass('open')) {
          cureleSiblings.find(navbarDropdown).removeClass('open');
          cureleSiblings.find(navArrow).removeClass('rotate-180');
          cureleSiblings.find('.nav-menu-link').removeClass('active');
        } else if ($(_this).parent('.nav-menu').find(navbarDropdown).hasClass('slide-out')) {
          cureleSiblings.find(navbarDropdown).addClass('slide-out');
        }
      }


      /** close language selector menu * */
      if (!$(_this).closest('.locale-menu').length
              && !$(_this).hasClass('flag-toggle') && !$(_this).parents().hasClass('flag-toggle')) {
        localeMenuShowHide('hide', '');
        toggleAria($('header .flag-toggle').parent(), 'all');
      }

      console.log($(_this).hasClass('flag-toggle'), _this);


    }
  
    function getClickRef(currele, evt) {
      if (currele.hasClass('hamburgerIcon')) {
        openMenu(currele.parent().siblings('.slide-menu-container'), 'toggle', false);
        toggleAria(currele, '');
        updateTabIndex($('header nav a, header nav button'), '0', '');
        updateTabIndex($('.header-navbar-links > .nav-close-menu button'), '0');
        updateTabIndex($('.navbar-dropdown a, .navbar-dropdown button'), '-1');
      } else if (currele.hasClass('nav-menu-link')) {
        evt.preventDefault();
        signinPopup('hide', '');
        localeMenuShowHide('hide', '');
        openMenu(currele.siblings('.navbar-dropdown'), 'toggle', true);
        updateTabIndex($('.navbar-dropdown a, .navbar-dropdown button'), '0');
        toggleAria(currele, '');
      } else if (currele.hasClass('mainmenu__button')) {
        openMenu(currele.closest('.slide-menu-container'), 'toggle', false);
        updateTabIndex($('.navbar-dropdown a, .navbar-dropdown button'), '-1');
        toggleAria(currele.parents('.navbar-dropdown').siblings('.nav-menu-link'), '');
      } else if (currele.hasClass('nav-close-menu') || currele.hasClass('nav-backdrop')) {
        openMenu($('header'), 'add', false);
        toggleAria($('header nav'), 'all');
        updateTabIndex($('header nav a, header nav button'), '-1');
        updateTabIndex($('.header-navbar-links > .nav-close-menu button'), '-1');
      } else if (currele.hasClass('prelogin-signin-btn')) {
        signinPopup('toggle', currele);
        toggleAria(currele, '');
      } else if (currele.hasClass('flag-toggle')) {
        evt.preventDefault();
        localeMenuShowHide('toggle', currele);
        toggleAria(currele, '');
      }
    }
  
    $('header').on('click', (e) => {
      const currele = $(e.target);
      getClickRef(currele, e);
    });
  
    /** * Flag menu toggle ** */
    function localeMenuShowHide(type, _this) {
      if (type == 'hide') {
        $('header').find('.locale-menu').removeClass('d-block');
        $('.flag-toggle').find(navArrow).removeClass('rotate-180');
        toggleAria($('header .flag-toggle'), 'all');
      } else {
        if ($(window).width() > 1152) {
          openMenu($('header'), 'add', false);
          signinPopup('hide', '');
        }
        toggleAria($(this));
        _this.siblings('.locale-menu').toggleClass('d-block');
        _this.find(navArrow).toggleClass('rotate-180');
      }
    }
  
    /** * Sign-in popup toggle */
    function signinPopup(type, _this) {
      if (type == 'hide') {
        $('header').find('.notification-container').removeClass('d-block');
        toggleAria($('header .notification-container'), 'all');
      } else {
        openMenu($('header'), 'add', false);
        localeMenuShowHide('hide', '');
        _this.siblings('.notification-container').toggleClass('d-block');
      }
    }
  
    /** * Sign-in button click - desktop ** */
    $('.prelogin-signin-btn').on('mouseover', function () {
      signinPopup('toggle', $(this));
    });
  
    /** * Gradient bg on scroll */
    function scrollClassUpdate(type) {
      if (type == 'transparent'
              && $('.components-wrap').children().children('div:first-child').hasClass('herobanner')
              && (!$('.header-desktop .navbar-dropdown').hasClass('open'))) {
        navBar.addClass('bg-header-transparent');
      } else {
        navBar.removeClass('bg-header-transparent');
      }
    }
  
    /** * Gradient bg if hero banner is the first component ** */
    $(window).on('scroll', () => {
      if ($(window).scrollTop() >= 50) {
        scrollClassUpdate('');
      } else {
        scrollClassUpdate('transparent');
      }
    });
  
    /** * Close header menu on clicking outside ** */
    $(document).click((event) => {
      if ($(window).width() > 1152) {
        closeHeaderMenus(event.target);
      }
    });
  
    /** * Accessibility ** */
    $(document).keyup((e) => {
      const focusEle = $(e.target);
      switch (e.keyCode) {
        case keyCode.DOWN:
          if ($(window).width() > 1152) {
            getClickRef(focusEle, e);
          }
          break;
  
        case keyCode.UP:
          if ($(window).width() > 1152) {
            openMenu($('header'), 'add', false);
            signinPopup('hide', '');
            localeMenuShowHide('hide', '');
            toggleAria($('header nav'), 'all');
          }
          break;
  
        case keyCode.TAB:
          closeHeaderMenus(e.target);
          break;
  
        default:
          break;
      }
    });
  });
  