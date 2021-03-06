$(document).ready(function() {


    // ===========================================================================
    //
    // Notification banner for IE lt 9
    var ieNotification = $('.browsehappy');
    $('.browsehappy__dismiss').click(function() {
        ieNotification.remove();
    });


    // ===========================================================================
    //
    // SVG Fallback for older browsers

    if (!Modernizr.svg) {
        $('img[src$=".svg"]').each(function() {
            //Replace 'image.svg' with 'image.png'.
            $(this).attr('src', $(this).attr('src').replace('.svg', '.png'));
        });
    }


    // ===========================================================================
    //
    // Show menu navigation on smaller screen resolutions

    var menu = $('.page-nav__list');

    $('#page-nav-button').click(function() {
        menu.slideToggle(200);
    });

    $(window).on('resize', function() {
        if (!jQuery('#page-nav-button').is(':visible') && !menu.is(':visible')) {
            menu.css({ 'display': '' });
        }
    });



    // ===========================================================================
    //
    // Image panning
    // Homepage intro section

    function screenSize() {
        if ($(window).width() >= 990) {
            panning();
        }
    }

    function panning() {
        $('body').mousemove(function(e) {
            var mousePosX = (e.pageX / $(window).width()) * 100;

            $('.bolt-image--top-front').css('left', (mousePosX / 30) + '%');
            $('.bolt-image--top-back').css('right', (mousePosX / 60) + '%');
            $('.bolt-image--bottom-front').css('left', (mousePosX / 30) + '%');
            $('.bolt-image--bottom-back').css('left', (mousePosX / 60) + '%');

        });
    }

    screenSize();

    $(window).resize(function() {
        screenSize();
    });


    // ===========================================================================
    //
    // Usage carousel
    // 
    // TODO:
    // ✔ 1. Last <li> is active.  
    // ✔ 2. On click down script needs to prevent position change
    // ✔ 3. On click up script needs to append position change,
    //      and add active state to previous child

    var $searchTerm = $('.usage-carousel__item'),
        $activeSearchTerm = $searchTerm.filter('.is-active'),
        $searchTermList = $('.usage-carousel__list'),
        $result = $('.result__item'),
        $activeResult = $('.result__item').filter('.is-active');

    // When user click on chevron up icon
    $('#previous-slide').on('click', function() {

        var $previousSearchTerm = $activeSearchTerm.prev();
        var $previousResult = $activeResult.prev();

        // If first item is active item, don't translate search terms list, just tilt it
        if ($searchTerm.first().hasClass('is-active')) {

            // Add subtle tilt effect to seach term list
            $searchTermList.addClass('js-tilt js-tilt--up');
            setTimeout(function() {
                $searchTermList.removeClass('js-tilt js-tilt--up');
            }, 300);

            // Prevent search term list from moving up
            return false;

        }

        // If first result item is active item, don't do anything
        if ($result.first().hasClass('is-active')) {
            return false;
        }

        // Remove active state from search term
        $activeSearchTerm.removeClass('is-active');
        // Remove active state from result item
        $activeResult.removeClass('is-active');
        // Position the list to the previous search term.
        $searchTermList.css({ position: 'absolute' }).animate({ top: '+=90' });
        // Add active state on previous search term
        if ($previousSearchTerm.length) {
            $activeSearchTerm = $previousSearchTerm.addClass('is-active');
        }
        // Add active state on previous result item
        if ($previousResult.length) {
            $activeResult = $previousResult.addClass('is-active');
        }

    });


    // When user click on chevron down icon
    $('#next-slide').on('click', function() {

        var $nextSearchTerm = $activeSearchTerm.next();
        var $nextResult = $activeResult.next();

        // If last item is active item, don't translate search terms list, just tilt it
        if ($searchTerm.last().hasClass('is-active')) {

            // Add subtle tilt effect to seach term list
            $searchTermList.addClass('js-tilt js-tilt--down');
            setTimeout(function() {
                $searchTermList.removeClass('js-tilt js-tilt--down');
            }, 300);

            // Prevent search term list from moving down
            return false;
        }

        // If last result item is active item, don't do anything
        if ($result.last().hasClass('is-active')) {
            return false;
        }

        // Remove active state from search term
        $activeSearchTerm.removeClass('is-active');
        // Remove active state from result item
        $activeResult.removeClass('is-active');
        // Position the list to the next search term.
        $searchTermList.css({ position: 'absolute' }).animate({ top: '-=90' });
        // Add active state on next search term
        if ($nextSearchTerm.length) {
            $activeSearchTerm = $nextSearchTerm.addClass('is-active');
        }
        // Add active state on next result item
        if ($nextResult.length) {
            $activeResult = $nextResult.addClass('is-active');
        }
    });


    // ===========================================================================
    //
    // Blog

    function closeGranular() {
        $('.js-granular-trigger').removeClass('is-active');
        $('.blog-nav-granular__item').slideUp(400).removeClass('is-open');
    }

    $('.js-granular-trigger').click(function(e) {
        // Grab current anchor value
        var currentAttrValue = $(this).attr('href');

        if ($(e.target).is('.is-active')) {
            closeGranular();
        } else {
            closeGranular();

            // Add is-active class to dropdown
            $(this).addClass('is-active');
            // Open up the hidden content panel
            $('.blog-nav-granular ' + currentAttrValue).slideDown(300).addClass('is-open');
        }

        e.preventDefault();
    });


    // ===========================================================================
    //
    // Disqus comments section

    $('.js-reveal-comments').on('click', function() {
        var disqus_shortname = 'skgamingtest'; // Replace this value with *your* username.

        // ajax request to load the disqus javascript
        $.ajax({
            type: "GET",
            url: "http://" + disqus_shortname + ".disqus.com/embed.js",
            dataType: "script",
            cache: true
        });

        // hide the button once comments load
        $('.article-comment__button').fadeOut();
    });

    // For opening and closing HN news section

    $('.hn').on('click', function(e) {
        var list = $(".hn-list ul");
        if (list.css("display") === "none") {
            list.css("display", "inline-block");
        } else {
            list.css("display", "none");
        }
        e.preventDefault();
    })

}); // end document ready
