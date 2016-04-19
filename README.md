This script is hack for  sites tutorials where are divided into pages, readers needs to to click next for each page. That's little annoying. This script will load all the pages in the tutorial without refreshing a page.

Usage steps for tutorialspoint hack

1.  Open any tutorial from (Currently these are supported)

    a.  tutorialspoint.com, eg. http://www.tutorialspoint.com/go/index.htm
    
    b.  w3schools.com, eg. http://www.w3schools.com/html/html_intro.asp
    
    c.  tutorialrepublic.com, eg. http://www.tutorialrepublic.com/twitter-bootstrap-tutorial
    
2.  Open console in Firefox or Chrome (Ctr+Shift+i)
3.  Paste below lines to console where the curson is blikning
<pre>
    _s=document.createElement('script');_s.type='text/javascript';_s.src='https://raw.githubusercontent.com/sushatgithub/jshacks/master/tutorialshack.js';document.body.appendChild(_s);
</pre>

Fork config.json for adding more sites 
