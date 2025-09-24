(function(){
  var cur = location.pathname.replace(/\/index\.html?$/,'/').toLowerCase();
  document.querySelectorAll('.tool-tabs a').forEach(function(a){
    var p = new URL(a.getAttribute('href'), location.href).pathname
              .replace(/\/index\.html?$/,'/').toLowerCase();
    // also handle case with/without .html
    if (p === cur || p + '.html' === cur || p === cur + '.html') {
      a.classList.add('active');
    }
  });
})();
