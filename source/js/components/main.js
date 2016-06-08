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
			$('.bolt-image--top-front').css('left', (mousePosX / 30) + '%').delay(1800);
			$('.bolt-image--top-back').css('right', (mousePosX / 60) + '%').delay(1800);
			$('.bolt-image--bottom-front').css('left', (mousePosX / 30) + '%').delay(1800);
			$('.bolt-image--bottom-back').css('left', (mousePosX / 60) + '%').delay(1800);
		});
	}

	screenSize();

	$(window).resize(function() {
		screenSize();
	});
	
}); // end document ready