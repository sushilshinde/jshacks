This script is hack for tutorials sites where these are divided into pages, reader need to click next button for every page. Also, ad banners are distracting while reading even if you zoom. This script will load all the pages in the tutorial without refreshing a page and will remove all the banners, header, menus and footer.

Usage steps

1.  Open any tutorial from (Currently these are supported)

    a.  tutorialspoint.com, eg. http://www.tutorialspoint.com/go/index.htm
    
    b.  w3schools.com, eg. http://www.w3schools.com/html/html_intro.asp
    
    c.  tutorialrepublic.com, eg. http://www.tutorialrepublic.com/twitter-bootstrap-tutorial
    
2.  Open console in Firefox or Chrome (Ctr+Shift+i)
3.  Paste below lines to console where the curson is blikning and close console

    Recommended
    <pre>
    var s=document.createElement('script');s.type='text/javascript';
    s.src='https://cdn.rawgit.com/sushatgithub/jshacks/master/tutorialshack.min.js';
    document.body.appendChild(s);
    </pre>

    OR 

    <pre>
    var s=document.createElement('script');s.type='text/javascript';
    s.src='https://cdn.rawgit.com/sushatgithub/jshacks/master/tutorialshack.js';
    document.body.appendChild(s);
    </pre>

Fork config.json for adding more sites 
