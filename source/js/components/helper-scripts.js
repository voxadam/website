// This file contains most commonly used javascipt code
// USAGE: Copy the code and modify if necessary, do not use this script in production!

$(document).ready(function() {

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
  // Placeholder attribute support for browsers that don't support it natively.

  jQuery(function() {
    jQuery.support.placeholder = false;
    test = document.createElement('input');
    if('placeholder' in test) {
      jQuery.support.placeholder = true;
    }
  });

  $(function() {
    if(!$.support.placeholder) {
      var active = document.activeElement;
      $(':text').focus(function () {
        if ($(this).attr('placeholder') !== '' && $(this).val() === $(this).attr('placeholder')) {
          $(this).val('').removeClass('hasPlaceholder');
        }
      }).blur(function () {
        if ($(this).attr('placeholder') !== '' && ($(this).val() === '' || $(this).val() === $(this).attr('placeholder'))) {
          $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
        }
      });
      $(':text').blur();
      $(active).focus();
      $('form').submit(function () {
        $(this).find('.hasPlaceholder').each(function() { $(this).val(''); });
      });
    }
  });
  

  // ===========================================================================
  //
  // Defer images 
  // 
  // Example markup:
  // 
  // Images with data-src attribute needs to hold the path to the image, while
  // src attribute holds placeholder image – base64 version. Script for image 
  // deffering should be placed inside each HTML page.
  // 
  // img(src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="images/image-name.jpg")

  // Defer images
  // script(type='text/javascript').
  //   function init() {
  //     var imgDefer = document.getElementsByTagName('img');
  //     for (var i=0; i<imgDefer.length; i++) {
  //       if(imgDefer[i].getAttribute('data-src')) {
  //         imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
  //         $('img').css('opacity', '1');
  //       }
  //     }
  //   }
  //   window.onload = init;


  // ===========================================================================
  //
	// Show menu navigation on smaller screen resolutions

	var menu = $('.page-nav__list');

	$('#page-nav-button').click(function() {
		menu.slideToggle(500);
	});

	$(window).on('resize', function(){     
		if(!jQuery('#page-nav-button').is(':visible') && !menu.is(':visible')) {
			
			menu.css({'display':''}); 

		}
	});


  // ===========================================================================
  //
  // Show alternate menu navigation on smaller screen resolutions -- Drawer effect

  var viewport = $(window),
      page = $('body');

  $('#page-nav-button').click(function() {
    page.toggleClass('js-push-page');
  });

  $(window).on('resize', function() {     
    if (viewport.width() > 990) {
      page.removeClass('js-push-page');   
    }
  });


  // ===========================================================================
  //
  // Make table row link
  // 
  //  Example markup:
  // 
  //   tr.is-link data-href='url://'>

  $(".is-link").click(function() {
    window.document.location = $(this).data("href");
  });


  // ===========================================================================
  //
	// Background Image Panning

	function screenSize(){
		if ($(window).width() >= 990) {
			panning();
		}
	}

	function panning(){
		$('.image-panning').mousemove(function (e) {
			var mousePosX = (e.pageX / $(window).width()) * 100;
			$('.image-panning').css('backgroundPosition', (mousePosX / 5) + '%' + '100%');
		});
	}
	screenSize();

	$(window).resize(function() {
		screenSize();
	});


  // ===========================================================================
  //
	// Center content vertically
	//
	// Example markup:
	//
	// .container-class
	// 	.center-content
	// 		Content which is going to be centered.

	$(window).resize(function() {
	  $('.center-content').css({
	  'padding-top' : ($('.container-class').height()/2)-($('.center-content').height()/2)
	  });
	});
	$(window).resize();


  // ===========================================================================
  //
	// Display only certain ammount of elements from the list

	var displayPartially = 4;
	$('.piece-list .piece').slice(displayPartially).toggle();
	  $('.show-summary-count').click(function(e){
	  e.preventDefault();
	  // show whole list
	  $('.piece-list .piece').not($('.piece').slice(0,4)).fadeToggle(); 
	});
		

  // ===========================================================================
  //
  // Controls for a tabbed interface
  // Source: http://inspirationalpixels.com/tutorials/creating-tabs-with-html-css-and-jquery
  //
  // Example markup: 
  // 
	// .tab-environment
  //   nav.tab-nav
	//     ul.tab-nav__list
	//       li.tab-nav__item
  //          a(href="#tab1" class="tab-nav__link").is-active Tab #1
  //       li.tab-nav__item
  //          a(href="#tab2" class="tab-nav__link") Tab #2
  //       li.tab-nav__item
  //          a(href="#tab3" class="tab-nav__link") Tab #3
  //       li.tab-nav__item
  //          a(href="#tab4" class="tab-nav__link") Tab #4
  //     
	//   .tab-group
	//     #tab1.tab-item.is-active
	//       p Tab #1 content goes here!
  //      
  //     #tab2.tab-item
  //       p Tab #2 content goes here!
  //       
  //     #tab3.tab-item
  //       p Tab #3 content goes here!
  //       
  //     #tab4.tab-item
  //       p Tab #4 content goes here! 

	$('.tab-nav__link').on('click', function(e)  {
	  var currentAttrValue = $(this).attr('href');

	  // Show/Hide Tabs
	  $('.tab-environment ' + currentAttrValue).fadeIn(400).siblings().hide();

    // Change/remove current tab to active
    $(this).closest('.tab-nav__list').find('.tab-nav__link').removeClass('is-active');
    $(this).addClass('is-active');

	  e.preventDefault();
	});


  // ===========================================================================
  //
  // Controls for a tabbed interface which remembers #id in address bar.
  // Source: https://24ways.org/2015/how-tabs-should-work/
  //
  // Example markup: 
  // 
  //  .tab-environment
  //    nav.tab-nav
  //      ul(role="tablist").tab-nav__list
  //        li.tab-nav__item: a(href="#tab-1" role="tab" aria-controls="tab-1" class="tab-nav__link") Tab 1
  //        li.tab-nav__item: a(href="#tab-2" role="tab" aria-controls="tab-2" class="tab-nav__link") Tab 2
  //        li.tab-nav__item: a(href="#tab-3" role="tab" aria-controls="tab-3" class="tab-nav__link") Tab 3
  //        
  //    .tab-group
  //      div(role="tabpanel" class="tab-item" id="tab-1")
  //        p Tab #1 content goes here!
  //      div(role="tabpanel" class="tab-item" id="tab-2")
  //        p Tab #2 content goes here!
  //      div(role="tabpanel" class="tab-item" id="tab-3")
  //        p Tab #3 content goes here!
  
  // A temp value to cache *what* we're about to show
  var target = null;

  // collect all the tabs
  var tabs = $('.tab-nav__link').on('click', function () {
    console.log('click');
    target = $(this.hash).removeAttr('id');
    if (location.hash === this.hash) {
      setTimeout(update);
    }
  }).attr('tabindex', '0');

  // get an array of the panel ids (from the anchor hash)
  var targets = tabs.map(function () {
    return this.hash;
  }).get();

  // use those ids to get a jQuery collection of panels
  var panels = $(targets.join(',')).each(function () {
    // keep a copy of what the original el.id was
    $(this).data('old-id', this.id);
  });

  function update() {
    console.log('update');
    if (target) {
      target.attr('id', target.data('old-id'));
      target = null;
    }
    
    var hash = window.location.hash;
    if (targets.indexOf(hash) !== -1) {
      return show(hash);
    }
    
    // fix going "back" on the browser nav to an empty state
    if (!hash) {
      show();
    }
  }

  function show(id) {
    // if no value was given, let's take the first panel
    if (!id) {
      id = targets[0];
    }
    // remove the selected class from the tabs,
    // and add it back to the one the user selected
    tabs.removeClass('is-active').attr('aria-selected', 'false').filter(function () {
      return (this.hash === id);
    }).addClass('is-active').attr('aria-selected', 'true');

    // now hide all the panels, then filter to
    // the one we're interested in, and show it
    panels.hide().attr('aria-hidden', 'true').filter(id).fadeIn().attr('aria-hidden', 'false');
  }

  window.addEventListener('hashchange', update);

  // initialise
  if (targets.indexOf(window.location.hash) !== -1) {
    update();
  } else {
    show();
  }


  // ===========================================================================
  //
  // Controls for accordion
  // Source: http://inspirationalpixels.com/tutorials/creating-an-accordion-with-html-css-jquery
  //
  // Example markup:
  //
  // .accordion
  //   a(href="#accordion-1").accordion__title Accordion Section #1
  //   a(href="#accordion-2").accordion__title Accordion Section #2
  //   a(href="#accordion-3").accordion__title Accordion Section #3
  //
  //  #accordion-1.accordion__content
  //    p Section Content 1.
  //    
  //  #accordion-2.accordion__content
  //    p Section Content 2.
  //    
  //  #accordion-3.accordion__content
  //    p Section Content 3.

  function closeAccordionSection() {
    $('.accordion__title').removeClass('is-active');
    $('.accordion__content').slideUp(400).removeClass('is-open');
  }

  $('.accordion__title').click(function(e) {
    // Grab current anchor value
    var currentAttrValue = $(this).attr('href');

    if($(e.target).is('.is-active')) {
      closeAccordionSection();
    }else {
      closeAccordionSection();

      // Add is-active class to section title
      $(this).addClass('is-active');
      // Open up the hidden content panel
      $('.accordion ' + currentAttrValue).slideDown(400).addClass('is-open'); 
    }

    e.preventDefault();
  });


  // ===========================================================================
  //
  // Smooth scroll-to links
  // Originally from http://stackoverflow.com/a/7717572/764886
  //
  // Example markup:
  // 
  // a(href="#anchor" class="js-scroll-to") I will scroll

  $('.js-scroll-to').click(function(e){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    e.preventDefault();
  });


  // ===========================================================================
  //
  //  Add mobile browser class to html tag

  var ua = navigator.userAgent.toLowerCase();
  function removeSpaces(ua) {
    return ua.split(' ').join('');
  }

  ua = removeSpaces(ua);
  var iOS = ua.match(/(iphone|ipod|ipad)/);
  if(iOS) {
    $('html').addClass('ios');
  }

  var iPad = ua.match(/(ipad)/);
  if(iPad) {
    $('html').addClass('ipad');
  }

  var iPhone = ua.match(/(iphone|ipod)/);
  if(iPhone) {
    $('html').addClass('iphone');
  }

  var android = ua.indexOf("android") > -1; 
  if(android) {
    $('html').addClass('android');
  }

  var android4 = ua.indexOf("android4") > -1; 
  if(android4) {
    $('html').addClass('android4');
  }
  
  var android2 = ua.indexOf("android2") > -1; 
  if(android2) {
    $('html').addClass('android2');
  }


  // ===========================================================================
  //
  // Modal
  // 
  // Example markup:
  // 
  // div(id="modal-id" class="modal" role="alert")
  //   .modal__container
  //     .modal__header
  //       h1 Modal header content
  //     .modal__content
  //       p Modal content
  //     .modal__footer
  //       p Modal footer content

  //     a(href="#modal-id" class="modal__close js-modal-close")
  //       svg.icon.modal__close-icon
  //         use(xlink:href="#icon-close" xmlns:xlink="http://www.w3.org/1999/xlink")
  //  
  // a(href="#modal-id" class="js-modal__trigger") Trigger Modal 1

  // Open modal
  $('.js-modal-trigger').on('click', function(event){
    event.preventDefault();
    $('.modal').filter(this.hash).addClass('is-visible');
    $('body').css({ overflow: 'hidden' });
  });

  // Close modal
  $('.modal').on('click', function(event){
    if( $(event.target).is('.js-modal-close') || $(event.target).is('.modal') ) {
      event.preventDefault();
      $(this).removeClass('is-visible');
      $('body').css({ overflow: 'inherit' });
    }
  });

  // Close modal when clicking the esc keyboard button
  $(document).keyup(function(event){
    if(event.which==='27'){
      $('.modal').removeClass('is-visible');
      $('body').css({ overflow: 'inherit' });
    }
  });


  // ===========================================================================
  //
  // Dropdown
  // 
  // Example markup:
  // 
  // .dropdown-environment
  //   a(href="#dropdown-id" class="js-dropdown-trigger dropdown-trigger") Click Me
  //
  //   #dropdown-id.dropdown
  //     .dropdown-arrow
  //     Dropdown Content

  $('.js-dropdown-trigger').on('click', function(e)  {
   // Show/Hide dropdown
   $('.dropdown').filter(this.hash).toggleClass('is-open');
   // Change/Remove dropdown trigger active state
   $(this).toggleClass('is-active');
   e.preventDefault();
  });


  // ===========================================================================
  //
  // Equal height containers (for e.g. equal height columns, or rows)
  // 
  // Example markup:
  // 
  // .js-element-equal-height
  //   // Element content 1
  //
  // .js-element-equal-height
  //   // Element content 2
  //
  // .js-element-equal-height
  //   // Element content 3

  var $equalHeight = $('.js-element-equal-height');
  var height = 0;
  $equalHeight.each(function () {
    if ($(this).height() > height) {
      height = $(this).height();
    }
  });
  $equalHeight.height(height);
  
  // ===========================================================================
  //
  // Localstorage for input elements (store entered form data to localstorage memory)
  // 
  // Example markup:
  // 
  // form(action="").form
  //   .holder
  //     label(for="name").form__label Your name
  //     input(type="text" id="name" name="name" placeholder="Your first name").form__input
  //   .holder
  //     label(for="email").form__label Your email
  //     input(type="text" id="email"  name="email" placeholder="Your last name").form__input 
  //   .holder
  //     label(for="option").form__label Your option
  //     select(name="select-option" id="select-option").select
  //       option(value="select-option-01") Option 1
  //       option(value="select-option-02") Option 2
  //       option(value="select-option-03") Option 3
  //   .holder
  //     label
  //       input(type="radio" id="radio-option-01" name="radio-option" value="radio-option-01")
  //       | Yes
  //     label
  //       input(type="radio" id="radio-option-02" name="radio-option" value="radio-option-02")
  //       | No
  //     label
  //       input(type="radio" id="radio-option-03" name="radio-option" value="radio-option-03")
  //       | Maybe
  //   .holder
  //     label(for="textarea").form__label Your message
  //     textarea(name="textarea" id="textarea")
  //    .holder
  //      input(type="submit")
 
  // Check if browser support localstorage
  if(typeof(Storage) !== "undefined") {

    // Prevent autocomplete 
    // (localstorage doesn't function well with autocomplete enabled)
    $( document ).on( 'focus', ':input', function(){
      $( this ).attr( 'autocomplete', 'off' );
    });

    // Localstorage for input[type="text"] and textarea elements
    $('.form input[type="text"], .form textarea').each(function(){
      if ( localStorage[$(this).attr('name')] ) {
        $(this).val( localStorage[$(this).attr('name')] );
      }
    });

    $('.form input[type="text"], .form textarea').keyup(function(){
      localStorage[$(this).attr('name')] = $(this).val();
    });

    // Localstorage for input[type="radio"] element
    $('.form input[type="radio"]').each(function(){
      var radioName = $(this).attr('name');
      var content = localStorage.getItem(radioName);

      if(content !== null) {
        $('input[name="'+radioName+'"]').each(function(){
        //...check each button...
          if($(this).val() === content) {
          //...and if the value of "content" (referenced above) matches...
            $(this).attr('checked','checked');
            //...check this radio button.
          }
        });
      }

      $(this).bind('click',function(){
        localStorage[radioName] = $(this).val();
        //store the value of the button whenever one is clicked
      });

    });

    // Localstorage for select element
    $('.form select').each(function(){
      if ( localStorage[$(this).attr('name')] ) {
        $(this).val( localStorage[$(this).attr('name')] );
      }
    });

    $('.form select').change(function(){
      localStorage[$(this).attr('name')] = $(this).val();
    });
  
    // Clear localstorage on form submit
    $('.form').submit(function() {
        localStorage.clear();
    });

  }
  


}); // end document ready