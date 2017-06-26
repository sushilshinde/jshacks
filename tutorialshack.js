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
    var statusDiv = '<div onclick="this.remove()" alt="Click to hide" title="Click to hide" style="background-color: black; color: white;position: fixed; top: 0;center:0; left:40%; width: 400px; height:50px;" align="center"><p  id="loadingStatus" style="background-color: black; color: white;">loading....</p></div>'
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
    //  profile.maxPages = 10;
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
