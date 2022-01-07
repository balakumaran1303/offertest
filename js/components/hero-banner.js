$('.timer').each(function() {
    if ($(this).parents('.banner-content').length > 0) {
        bannerTimer(this,
            new Date($(this).attr('data-startDate')),
            new Date($(this).attr('data-endDate')));
    } else if ($(this).parents('.title-content').length > 0) {
        titleTimer(this, new Date($(this).attr('data-endDate')));
    }
});

function bannerTimer(_this, startdatetime, enddatetime) {
    // only invoked for banner component
    if (startdatetime == 'Invalid Date' ||
        (!isNaN(startdatetime.getTime()) &&
            countDown(startdatetime) < 0)) {
        const countDownTime = countDown(enddatetime);

        if (isNaN(enddatetime.getTime()) || countDownTime < 0) {
            // invalid or negative end date
            $(_this).remove();
        } else {
            // valid scenario
            const days = Math.floor(countDownTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((countDownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((countDownTime % (1000 * 60 * 60)) / (1000 * 60));

            $(_this).find('#days').text(days);
            $(_this).find('#hours').text(hours);
            $(_this).find('#minutes').text(minutes);

            if (days > 1) {
                $(_this).find('#dayordays').text($(_this).attr('data-days'));
            } else {
                $(_this).find('#dayordays').text($(_this).attr('data-day'));
            }

            if (hours > 1) {
                $(_this).find('#hourorhours').text($(_this).attr('data-hours'));
            } else {
                $(_this).find('#hourorhours').text($(_this).attr('data-hour'));
            }

            if (minutes > 1) {
                $(_this).find('#minormins').text($(_this).attr('data-minutes'));
            } else {
                $(_this).find('#minormins').text($(_this).attr('data-minute'));
            }
        }
    } else {
        $(_this).remove();
    }
}

function titleTimer(_this, enddatetime) {
    // only invoked for title component
    var currentDate = new Date(); // today date
    if (enddatetime) {
        // end date exists
        if (enddatetime < currentDate) {
            $(_this).find('#expired').removeClass('d-none');
        } else {
            $(_this).find('#expired').addClass('d-none');
            $(_this).find('#expiredIn').removeClass('d-none');
        }
    } else {
        // end date not provided
        $(_this).find('#expired').addClass('d-none');
        $(_this).find('#expiredIn').addClass('d-none');
    }
}


function countDown(endDate) {
    // returns diff between current date and given date
    const timeleft = new Date(endDate).getTime() - new Date().getTime();
    return timeleft;
}

function openLink(_this) {
    //open card link
    let link = $(_this).find(".card-link").children("a");
    let target = $(link).attr("target");
    let href = $(link).attr("href");
    if (href) {
        //only valid href
        window.open(href, target);
        _this.addClass('with-link');
    }
}