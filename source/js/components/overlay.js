// ========================================================================
// Overlay Effect
// ========================================================================

// Usage Example:
// 
// Jade:
// #overlay-id.js-overlay.overlay
//   a(href="#overlay-id" class="overlay-close js-overlay-close")
//       svg.icon.overlay-close-icon
//         use(xlink:href="#icon-close" xmlns:xlink="http://www.w3.org/1999/xlink")
//   .overlay-content
//     h1 Overlay content.
//     
// a(href="#overlay-id").js-overlay-toggle
//  
// ========================================================================

$(document).ready(function() {

  var overlayToggle = $('.js-overlay-toggle');
  var overlayClose = $('.js-overlay-close');
  var overlays = $('.overlay');
  var body = $('body');
  var overlayContent = $('.overlay-content');

    // ===========================================================================
    //
    // Handle showing and hiding the modal
    overlayToggle.click(function(e) {

    // ===========================================================================
    //
    // Disable scrolling on body
    body.addClass('js-overlay-active');

    // ===========================================================================
    //
    // Show targeted overlay
    overlays.filter(this.hash).addClass('js-overlay-in');

    // ===========================================================================
    //
    // Handle opening animations
    overlays.filter(this.hash).find(overlayContent).addClass('overlay-content--animated');
    overlays.filter(this.hash).find(overlayClose).addClass('overlay-close--animated');

    e.preventDefault();

  });

  // ===========================================================================
  //
  // Close the overlay
  overlayClose.click(function(e) {

    // ===========================================================================
    //
    // Re-enable scrolling on body
    body.removeClass('js-overlay-active');

    // ===========================================================================
    //
    // Hide targeted overlay
    overlays.filter(this.hash).removeClass('js-overlay-in');

    // ===========================================================================
    //
    // Clean up
    overlays.filter(this.hash).find(overlayContent).removeClass('overlay-content--animated');
    overlays.filter(this.hash).find(overlayClose).removeClass('overlay-close--animated');

    e.preventDefault();

  });

});