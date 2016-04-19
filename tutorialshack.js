/*
This script is a hack for tutorials website where tutorials are divided into pages, readers needs to to click next for each page.
This script will load all the pages in the tutorial without refreshing a page.

Check config.json for currently supported tutorial websites

Usage steps 
1.  Open any tutorial from tutorialspoint.com, eg. http://www.tutorialspoint.com/go/index.htm
2.  Open console in Firefox or Chrome (Ctr+Shift+i)
3.  Paste below line to console where the curson is blikning
s=document.createElement('script');s.type='text/javascript';s.src='https://raw.githubusercontent.com/sushatgithub/jshacks/master/tutorialshack.js';document.body.appendChild(s);
*/
/* Source Code */
/**
 * @param {String } jsonConfigFile  contain comma seperated ids, classes, tags for jquery selector function
*/
(function (jsonConfigFile) {
  (function (cp) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://code.jquery.com/jquery-2.2.3.min.js';
    script.onload = cp;
    script.crossorigin="anonymous";
    document.body.appendChild(script);
  }) (function () {
    var profile,
    pageCount = 0,
    cachedPages = [
    ];
    (function () {
      jQuery.getJSON({
        url: jsonConfigFile,
        context: document.body
      }).done(function (data) {
        profile = $.grep(data, function (n, i) {
          return n.site == window.location.host;
        });
        profile = profile && profile.length > 0 ? profile[0] : null;
        $.event.trigger({
          type: 'CONFIG_LOADED'
        });
      });
    }) ();
    var fetchPage = function () {
      if (!profile) return;
      var page = jQuery(profile.nextBtn).last().attr('href');
      if (page && jQuery.inArray(page, cachedPages) < 0 && profile.maxPages >= pageCount) {
        cachedPages.push(page);
        jQuery.ajax({
          url: page,
          context: document.body
        }).done(function (data) {
          jQuery('body').append(jQuery.parseHTML(data));
          jQuery(profile.rmEl).remove();
          pageCount++;
          fetchPage();
        });
      } else {
        jQuery.each(profile.batchScripts, function (i, script) {
          (new Function(script)) ();
        });
        alert(pageCount + ' Pages Loaded\nHappy Reading')
      }
    };
    jQuery(document).on('CONFIG_LOADED', fetchPage);
  });
}) ('https://raw.githubusercontent.com/sushatgithub/jshacks/master/config.json');
