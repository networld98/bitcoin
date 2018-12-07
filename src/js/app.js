;$(document).foundation();

(function ($) {
    "use strict";
    $(function () {

        /**
         * Разные карусели
         */
        $(".x-carousel-main").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: true,
            swipeToSlide: true,
            prevArrow: '<span><i class="slick-prev fas fa-angle-left fa-4x"> </i></span>',
            nextArrow: '<span><i class="slick-next fas fa-angle-right fa-4x"> </i></span>'
        });

        $(".x-carousel-services").slick({
            infinite: true,
            dots: true,
            arrows: false,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true
        });

        $(".x-carousel-news").slick({
            infinite: true,
            arrows: false,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 7000,
            autoplayHoverPause: true
        });
        $('.x-carousel-news-link').on('click', function(e){

            e.preventDefault();
            var $this = $(this),
                index = $this.closest('.x-carousel-news-links').find('.x-carousel-news-link').index($this);
            $('.x-carousel-news').slick('slickGoTo', index);
        });

        /**
         * Показ любого блока по наведению на другой
         */
        var toggleLeaveTimer;
        $('[data-toggle-hover-dd]').on('mouseenter mouseleave', function(e) {
            var selector = '#' + $(this).data('toggle-hover-dd');
            if ($(selector).length > 0)
            {
                var $toggler = $(selector);
                var className = $toggler.data('toggler-hover-dd');
                if (e.type == 'mouseenter' && !$toggler.hasClass(className))
                {
                    $toggler.addClass(className)
                }
                if (e.type == 'mouseleave' && $toggler.hasClass(className))
                {
                    toggleLeaveTimer = setTimeout(function () {$toggler.removeClass(className)}, 300);
                }
            }
        });
        $('[data-toggler-hover-dd]').on('mouseenter', function () {
            clearTimeout(toggleLeaveTimer);
        }).on('mouseleave', function () {
            var $toggler = $(this);
            var className = $toggler.data('toggler-hover-dd');
            if ($toggler.hasClass(className))
            {
                toggleLeaveTimer = setTimeout(function () {$toggler.removeClass(className)}, 300);
            }
        });
        $('select').styler({
            selectSearch: true,
        });

        function dataCoin($crypt , $currency , $sign) {
            $.getJSON('https://apiv2.bitcoinaverage.com/indices/global/ticker/' + $crypt + $currency, function(data) {
                $("#price"+ $crypt).html($sign + data.ask);
                $("#hour" + $crypt + "-price").html(data.changes.price.hour + $sign);
                $("#day" + $crypt + "-price").html(data.changes.price.day + $sign);
                $("#week" + $crypt + "-price").html(data.changes.price.week + $sign);
                $("#month" + $crypt + "-price").html(data.changes.price.month + $sign);
                if (data.changes.price.hour < 0){ $("#hour" + $crypt + "-price").css("color","#c80e24")}
                if (data.changes.price.day < 0){ $("#day" + $crypt + "-price").css("color","#c80e24")}
                if (data.changes.price.week < 0){ $("#week" + $crypt + "-price").css("color","#c80e24")}
                if (data.changes.price.month < 0){ $("#month" + $crypt + "-price").css("color","#c80e24")}
                $("#hour" + $crypt + "-percent").html(data.changes.percent.hour + "%");
                $("#day" + $crypt + "-percent").html(data.changes.percent.day + "%");
                $("#week" + $crypt + "-percent").html(data.changes.percent.week + "%");
                $("#month" + $crypt + "-percent").html(data.changes.percent.month + "%");
                if (data.changes.price.hour < 0){ $("#hour" + $crypt + "-percent").css("color","#c80e24")}
                if (data.changes.price.day < 0){ $("#day" + $crypt + "-percent").css("color","#c80e24")}
                if (data.changes.price.week < 0){ $("#week" + $crypt + "-percent").css("color","#c80e24")}
                if (data.changes.price.month < 0){ $("#month" + $crypt + "-percent").css("color","#c80e24")}
            });
        }
        dataCoin('BTC', 'USD', '$');
        dataCoin('LTC', 'USD', '$');
        dataCoin('ETH', 'USD', '$');

        $(".jq-selectbox li").click(function () {
            var $i = $(this).text();
            if($i == 'USD') {var $s = "$"}
            if($i == 'EUR') {var $s = "€"}
            if($i == 'RUB') {var $s = "₽"}
            if($i == 'GBP') {var $s = "£"}
            dataCoin('BTC', $i, $s);
            dataCoin('LTC', $i, $s);
            dataCoin('ETH', $i, $s);
        });
        $(".point").click(function () {
            if(this.classList.contains('on')) {
                $(this).parent(".switch").css("background","#3eb5f1");
                $(this).css("right","auto");
                $(this).css("left","-.07143rem");
                $(this).removeClass("on");
                $(this).parents(".price-text").find(".percent").css("display","none");
                $(this).parents(".price-text").find(".price").css("display","block");
            }else{
                $(this).parent(".switch").css("background","#b9b9ba");
                $(this).css("left","auto");
                $(this).css("right","-.07143rem");
                $(this).addClass("on");
                $(this).parents(".price-text").find(".price").css("display","none");
                $(this).parents(".price-text").find(".percent").css("display","block");
            }
        });
    });
})(jQuery);
