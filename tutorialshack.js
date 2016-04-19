(function (configUrl) {
  (function (cp) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://code.jquery.com/jquery-2.2.3.min.js';
    script.onload = cp;
    document.body.appendChild(script);
  }) (function () {
    var profile,
    pageCount = 0,
    cachedPages = [
    ];
    (function () {
      jQuery.getJSON({
        url: configUrl,
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
      profile.maxPages = 5;
      var page = jQuery(profile.nextBtn).last().attr('href');
      console.log(profile, page && jQuery.inArray(page, cachedPages) < 0 && profile.maxPages >= pageCount)
      if (page && jQuery.inArray(page, cachedPages) < 0 && profile.maxPages >= pageCount) {
        cachedPages.push(page);
        jQuery.ajax({
          url: page,
          context: document.body
        }).done(function (data) {
          jQuery('body').append(jQuery.parseHTML(data));
          jQuery(profile.rmEl).remove();
          //new Function(o[0].batchScripts[0])
          //callback ? callback.call()  : null;
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
