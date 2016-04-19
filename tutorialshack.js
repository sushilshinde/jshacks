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
    script.crossorigin = 'anonymous';
    document.body.appendChild(script);
  }) (function () {
    var profile,
    pageCount = 0,
    cachedPages = [
    ];
    var statusDiv = '<div style="position: absolute; top: 0;center:0; left: 0; width: 100%; " align="center"><pstyle="color: #cc6699; font-size: 8px; " id="loadingStatus">loading....</p></div>'
    jQuery('body').prepend(statusDiv);
    (function () {
      jQuery.getJSON({
        url: jsonConfigFile,
        context: document.body
      }).done(function (data) {
        profile = jQuery.grep(data, function (n, i) {
          return n.site == window.location.host;
        });
        profile = profile && profile.length > 0 ? profile[0] : null;
        jQuery.event.trigger({
          type: 'CONFIG_LOADED'
        });
      });
    }) ();
    var displayFinal = function () {
      jQuery('#loadingStatus').html('Total ' + (pageCount + 1) + ' pages loaded');
    }
    var fetchPage = function () {
      if (!profile) return;
      //profile.maxPages = 10;
      var page = jQuery(profile.nextBtn).last().attr('href');
      if (page && jQuery.inArray(page, cachedPages) < 0 && profile.maxPages >= pageCount) {
        cachedPages.push(page);
        jQuery('#loadingStatus').html('Loading : ' + (pageCount + 1) + '. ' + page);
        jQuery.ajax({
          url: page,
          context: document.body
        }).done(function (data, status) {
          jQuery('body').append(jQuery.parseHTML(data));
          jQuery(profile.rmEl).remove();
          jQuery.each(profile.batchScripts, function (i, script) {
            (new Function(script)) ();
          })
          pageCount++;
          fetchPage();
        }).fail(function () {
          displayFinal();
        });
      } else {
        displayFinal();
      }
    };
    jQuery(document).on('CONFIG_LOADED', fetchPage);
  });
}) ('https://cdn.rawgit.com/sushatgithub/jshacks/master/config.json');
