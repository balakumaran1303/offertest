$(document).ready(() => {
    footerAria();
    $('.footer-title').on('click', function(e) {
        if ($(window).width() < 1024) {
            accordian($(this).parent());
        }
    });
});

$(window).on('resize', function() {
    footerAria();
});

function footerAria() {
    $('.footer-title').attr("aria-expanded", "true");
    $(".footer-listing").removeClass('d-none');
    if ($(window).width() < 1024) {
        toggleAria($('.footer-list-group'), 'all');
    }
}


function accordian(_this) {
    if ($(_this).parent().hasClass('open')) {
        $(_this).parent().children().children('.footer-title').attr("aria-expanded", "false");
        $(_this).parent().children(".footer-listing").removeClass('d-none');
    } else {
        toggleAria($('.footer-list-group'), 'all');
        $('.links-sec').children('.footer-list-group').removeClass('open');
        toggleAria($(_this).parent().children().children('.footer-title'));
        $(_this).parent().children(".footer-listing").removeClass('d-none');
    }
    $(_this).parent().toggleClass('open');
}

// Tabs nav links
$(document).on('keydown', '.links-sec [tabindex="0"]', function(e) {
    if ($(window).width() < 1024) {
        var currentBtn = $(this),
            currentCardWrapper = currentBtn.parents('.footer-list-group');

        function next() {
            $(currentCardWrapper.next().find('[tabindex="0"]').focus().attr('data-target'));
        }

        function prev() {
            $(currentCardWrapper.prev().find('[tabindex="0"]').focus().attr('data-target'));
        }

        switch (e.which) {
            case keyCode.UP:
                prev();
                break;
            case keyCode.DOWN:
                next();
                break;
            case keyCode.TAB:
                if (currentCardWrapper.hasClass('open')) {
                    $('.footer-list-group').children(".footer-listing").addClass('d-none');
                    currentCardWrapper.children(".footer-listing").removeClass('d-none');
                } else {
                    currentCardWrapper.children(".footer-listing").addClass('d-none');
                }
                break;
        }
    }
});

let keyCode = Object({
    'TAB': 9,
    'RETURN': 13,
    'ESC': 27,
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40
});

function toggleAria(_this, type) {
    if (_this) {
        if (type == 'all') {
            _this.find('[aria-expanded="true"]').attr('aria-expanded', false);
        } else {
            let attr = _this.attr('aria-expanded');
            if (typeof attr !== 'undefined' && attr !== false) {
                if (attr == 'true') {
                    _this.attr('aria-expanded', false);
                } else {
                    _this.attr('aria-expanded', true);
                }
            }
        }
    }
}

function updateTabIndex(_this, val) {
    _this.attr('tabindex', val);
}