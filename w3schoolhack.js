(function (removeClasses, maxPages, nextButton, callback) {
  (function (cp) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://code.jquery.com/jquery-2.2.3.min.js';
    script.onload = cp;
    document.body.appendChild(script);
  }) (function () {
    var pageCount = 0,
    cachedPages = [
    ];
    var fetchPage = function () {
      var page = jQuery(nextButton).last().attr('href');
      if (page && jQuery.inArray(page, cachedPages) < 0 && maxPages >= pageCount) {
        cachedPages.push(page);
        jQuery.ajax({
          url: page,
          context: document.body
        }).done(function (data) {
          jQuery('body').append(jQuery.parseHTML(data));
          jQuery(removeClasses).remove();
          callback ? callback.call()  : null;
          pageCount++;
          fetchPage();
        });
      } else {
        alert(pageCount + ' Pages Loaded\nHappy Reading')
      }
    };
    fetchPage();
  });
})
/**
 * Converts tutorial into one page for tutorials like tutorialpoint.com, w3school.com
 * @param {String } removeElements  contain comma seperated ids, classes, tags for jquery selector function 
 * @param {Number} maxPages maximum number of pages to be fetched
 * @return {String} nextPageLinkElement id or class of the next page link element
 * @return {Function} callback process extra logic for each page fetch
*/
('.w3-container,#topnav,#leftmenuinner,#card,#bg-exit,div#google_image_div,div[id*="google"],#leftmenu,iframe,#mainLeaderboard,#right,.footer', 100, '.next a', function () {
  jQuery('#main').css('width', '100%');
  jQuery('#main').css('padding-left', '100px');
  //jQuery('.middle-col, pre, content,body').css('background-color', '#151515');
  //jQuery('p,h,h1,h2,h3,li,pre').css('color', '#F4F6F6');
}
);
