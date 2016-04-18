/*
This script is a hack for w3schools.com, as these tutorials are divided into pages, readers needs to to click next for each page.
This script will load all the pages in the tutorial without refreshing a page.
Usage steps 
1.  Open any tutorial from w3schools.com, eg. http://www.w3schools.com/jsref/default.asp
2.  Open console in Firefox or Chrome (Ctr+Shift+i)
3.  Paste below line to console where the curson is blikning
    s=document.createElement('script');s.type='text/javascript';s.src='https://raw.githubusercontent.com/sushatgithub/jshacks/master/w3schoolhack.js'; document.body.appendChild(s);
*/
/* Source Code */
/**
 * @param {String } removeElements  contain comma seperated ids, classes, tags for jquery selector function 
 * @param {Number} maxPages maximum number of pages to be fetched
 * @param {String} nextPageLinkElement id or class of the next page link element
 * @param {Function} callback process extra logic for each page fetch
*/
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
('.w3-container,#topnav,#leftmenuinner,#card,#bg-exit,div#google_image_div,div[id*="google"],#leftmenu,iframe,#mainLeaderboard,#right,.footer', 100, '.next a', function () {
  jQuery('#main').css('width', '100%');
  jQuery('#main').css('padding-left', '100px');
  //jQuery('.middle-col, pre, content,body').css('background-color', '#151515');
  //jQuery('p,h,h1,h2,h3,li,pre').css('color', '#F4F6F6');
}
);
