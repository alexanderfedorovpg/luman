'use strict';

import polyfills from './libraries/polyfills';

$(() => {
    polyfills.init();
    // ================ Здесь инициализируем модули =====================

    // autoresize textarea on load
    // $('.textarea').each(function () {
    //     this.style.height = (this.scrollHeight + 10) + 'px';
    // });

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
        // $('body').removeClass('is-open-nav');
        $('.nav-side').removeClass('is-active');
        $('.content').removeClass('is-moved-content');
        $('.header').removeClass('is-moved-header');
    });

    // side nav toggle
    $('.header-info__hamburger').on('click', function (e) {
        e.stopPropagation();
        // $('body').toggleClass('is-open-nav');
        $('.nav-side').toggleClass('is-active');
        $('.content').toggleClass('is-moved-content');
        $('.header').toggleClass('is-moved-header');
    });

    $('.nav-side').on('click', function (e) {
        e.stopPropagation();
    });

    // для визуального показа переключение между добавлением и редактированием пользователя
    $('.user-edit-form').find('.icon-delete').on('click', function () {
        $(this).closest('.user-edit-form').hide();
        $('.user-edit-form__add').show();
        $('.user-edit__table').find('tbody tr').removeClass('is-active');
    });

    $('.user-edit__table').find('tbody tr').on('click', function () {
        $(this).addClass('is-active').siblings().removeClass('is-active');
        $('.user-edit-form__add').hide();
        $('.user-edit-form__add').next().show();
    });

    $('.group-edit-form').find('.icon-delete').on('click', function () {
        $(this).closest('.group-edit-form').hide();
        $('.group-edit-form__add').show();
        $('.group-edit__table').find('tbody tr').removeClass('is-active');
    });

    $('.group-edit__table').find('tbody tr').on('click', function () {
        $(this).addClass('is-active').siblings().removeClass('is-active');
        $('.group-edit-form__add').hide();
        $('.group-edit-form__add').next().show();
    });


});
