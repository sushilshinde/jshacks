(function () {   
  //if(window.ran){return};  
  conf = {    
    removElements:"#top,.noprint,#mw-head,#mw-panel,#mw-page-base,#mw-head-base,#footer",    
    //change margin values for tags, ids and classes
    //changeTopPadding : [["h1",100],["div",25]],
    //changeRightPadding : [["h1",5],["div",25]],
    //changeBottomPadding : [["h1",5],["div",25]],
    //changeLeftPadding : [["h1",5],["div",25]],    
    
    //change margin values for tags, ids and classes
    //changeTopMargin : [["h1",5],["div",25]],
    //changeRightMargin : [["h1",5],["div",25]],
    //changeBottomMargin : [["h1",5],["div",25]],
    changeLeftMargin : [["#content",0]]
  }
   
  executeScript = function () {
    $(conf.removElements).remove();
    var applyProperty = function (arr, property) {
      console.log(arr,property)
      $(arr).each(function (i, item) {
        console.log(item[0],item[1])
        $(item[0]).css(property, item[1]);
      });      
      window.ran = true;
    }
    applyProperty(conf.changeTopPadding, 'padding-top');
    applyProperty(conf.changeRightPadding, 'padding-right');
    applyProperty(conf.changeBottomPadding, 'padding-bottom');
    applyProperty(conf.changeLeftPadding, 'padding-left');    
    applyProperty(conf.changeLeftMargin, 'margin-left');
  }
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js'
  script.onload = executeScript;
  script.crossorigin = 'anonymous';
  document.head.appendChild(script);
  console.log('end')
}) ();
