'use strict';

import polyfills from './libraries/polyfills';

$(() => {
    polyfills.init();

    $('.social-links__share').on('click', function () {
        let $self = $(this);
        $('.social-links__list').removeClass('is-open');
        $self.next().toggleClass('is-open');
    });
    // ================ Здесь инициализируем модули =====================
});


$(document).ready(function () {

    let submitIcon = $('.search__ico');
    let inputBox = $('.search__input-text');
    let searchBox = $('.search__form');
    let isOpen = false;

    submitIcon.on('click', function () {
        if ( isOpen === false ) {
            searchBox.addClass('search-open');
            inputBox.trigger('focus');
            isOpen = true;
        } else {
            searchBox.removeClass('search-open');
            inputBox.trigger('focusout');
            isOpen = false;
        }
    });

    inputBox.on('click', function () {
        if ( isOpen === false ) {
            searchBox.addClass('search-open');
            inputBox.trigger('focus');
            isOpen = true;
        } else {
            searchBox.removeClass('search-open');
            inputBox.trigger('focusout');
            isOpen = false;
        }
    });

    submitIcon.mouseup(function () {
        return false;
    });

    searchBox.mouseup(function () {
        return false;
    });

    $(document).mouseup(function () {
        if ( isOpen === true ) {
            submitIcon.css('display', 'block');
            submitIcon.trigger('click');
        }
    });

});

$('.search__input-text').on('keyup', function () {

    let $self = $(this);
    let inputVal = $self.val();
    inputVal = $.trim(inputVal).length;

    if ( inputVal !== 0) {
        $('.search__ico').css('display', 'none');
    } else {
        $self.val('');
        $('.search__ico').css('display', 'block');
    }

});

var SimpleCollapse = function () {
    var self = this,
        collapse = $('.js-collap-wrap');

    collapse.each(function () {
        var $index = $(this).find('.js-collap-ln.is-active');
        $index.next().addClass('is-open').slideDown(400);
    });

    collapse.on('click', '.js-collap-ln', function (event) {
        self.open($(this), event);
        // return false;
    });

    self.open = function (elem, event) {

        event.preventDefault();
        var parentCollapse = elem.closest(collapse);

        if (!elem.hasClass('is-active')) {
            parentCollapse.find('.is-open').removeClass('is-open').slideUp(400);
            parentCollapse.find('.is-active').removeClass('is-active');
        }

        elem.next().addClass('is-open').slideDown(400);
        elem.addClass('is-active');

    };

};

var simpleCollapse = new SimpleCollapse();
