/*
 * footsies
 * https://github.com/marcmartino/footsiesjs
 *
 * Copyright (c) 2013 marcmartino
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.footsies = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.footsies = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.footsies.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.footsies.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].footsies = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
