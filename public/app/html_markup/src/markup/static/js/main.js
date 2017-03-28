'use strict';

import polyfills from './libraries/polyfills';

$(() => {
    polyfills.init();
    // ================ Здесь инициализируем модули =====================

    // autoresize textarea on load
    $('.textarea').each(function () {
        this.style.height = (this.scrollHeight + 10) + 'px';
    });

    // show/hide select dropdown with photo
    $('.select').each(function () {


        let $self = $(this),
            $input = $self.find('.input');

        $input.on('click', function (e) {
            e.stopPropagation();
            $self.find('.select-dropdown').fadeIn(400);
        });

    });

    $(document).on('click', function () {
        $('.select-dropdown').fadeOut(400);
    });

    // $('textarea').height( $('textarea')[0].scrollHeight );
});
