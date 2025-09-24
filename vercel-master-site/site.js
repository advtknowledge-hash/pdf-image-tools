(function(){
  var cur = location.pathname.replace(/\/index\.html?$/,'/').toLowerCase();
  document.querySelectorAll('.tool-tabs a').forEach(function(a){
    var p = new URL(a.getAttribute('href'), location.href).pathname
              .replace(/\/index\.html?$/,'/').toLowerCase();
    if (p === cur) a.classList.add('active');
  });
})();
