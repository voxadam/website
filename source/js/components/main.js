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

	$(window).on('resize', function(){     
		if(!jQuery('#page-nav-button').is(':visible') && !menu.is(':visible')) {
			menu.css({'display':''});   
		}
	});


  

  // ===========================================================================
  //
	// Image panning

	function screenSize(){
		if ($(window).width() >= 990) {
			panning();
		}
	}

	function panning(){
		$('body').mousemove(function (e) {
			var mousePosX = (e.pageX / $(window).width()) * 100;
			// var mousePosY = (e.pageY / $(window).width()) * 100;

			// setTimeout( function() {

				$('.bolt-image--top-front').css('left', (mousePosX / 30) + '%');
				$('.bolt-image--top-back').css('right', (mousePosX / 60) + '%');
				$('.bolt-image--bottom-front').css('left', (mousePosX / 30) + '%');
				$('.bolt-image--bottom-back').css('left', (mousePosX / 60) + '%');

			// },300);
			
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
	// 1. Last <li> is active.
	// 2. On click down script needs to prevent position change
	// 3. On click up script needs to append position change,
	//    and add active state to previous chile
	// 4. Result contains needs to reaveal + lazy line painter

// var $activeCarouselItem = $('.usage-carousel__item.is-active');



// 	$('.js-usage-carousel-up').click(function () {
// 		$('.usage-carousel__list').css({position:'absolute'});
// 		$('.usage-carousel__list').animate({top: '+=90'});
// 		$activeCarouselItem.prev().addClass( 'is-active' );
// 		$activeCarouselItem.removeClass('is-active');
// 	});

// 	$('.js-usage-carousel-down').click(function () {
// 		$('.usage-carousel__list').css({position:'absolute'});
// 		$('.usage-carousel__list').animate({top: '-=90'});
// 	});





/////
///



var items = $('.usage-carousel__item');
var currentItem = items.filter('.is-active');
var carouselPosition = $('.usage-carousel__list');


$('#previous-slide').on('click', function() {
		// $carouselPosition.
    var previousItem = currentItem.prev();
		
		console.log(previousItem); //for debugging
    
    console.log(items.last().hasClass('is-active')); //for debugging
    if ( items.first().hasClass('is-active') ) {
    	return false;
    }


    currentItem.removeClass('is-active');
    carouselPosition.css({position:'absolute'}).animate({top: '+=90'});

    if ( previousItem.length ) {
      currentItem = previousItem.addClass('is-active');
    }


});

$('#next-slide').on('click', function() {

    var nextItem = currentItem.next();

		console.log(items.last().hasClass('is-active')); //for debugging
    if ( items.last().hasClass('is-active') ) {
    	return false;
    }

    currentItem.removeClass('is-active');
    carouselPosition.css({position:'absolute'}).animate({top: '-=90'});
    if ( nextItem.length ) {
      currentItem = nextItem.addClass('is-active');
    }
});

	
}); // end document ready