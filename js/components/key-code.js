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