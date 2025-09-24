// site.js — active highlight + arrow scrolling + small UX touches
(function () {
  // Active tab highlight (supports with/without .html)
  var cur = location.pathname.replace(/\/index\.html?$/,'/').toLowerCase();
  var links = document.querySelectorAll('.tool-tabs a');
  links.forEach(function (a) {
    var p = new URL(a.getAttribute('href'), location.href).pathname
              .replace(/\/index\.html?$/,'/').toLowerCase();
    if (p === cur || p + '.html' === cur || p === cur + '.html') {
      a.classList.add('active');
      // Auto-center active tab
      var wrap = document.querySelector('.tool-tabs');
      if (wrap) {
        var dx = a.offsetLeft - (wrap.clientWidth/2 - a.clientWidth/2);
        wrap.scrollTo({ left: dx, behavior: 'smooth' });
      }
    }
  });

  // Scroll arrows
  var scroller = document.querySelector('.tool-tabs');
  var btnL = document.querySelector('.tool-left');
  var btnR = document.querySelector('.tool-right');
  if (!scroller || !btnL || !btnR) return;

  function updateArrows() {
    var max = scroller.scrollWidth - scroller.clientWidth;
    btnL.disabled = scroller.scrollLeft <= 2;
    btnR.disabled = scroller.scrollLeft >= max - 2;
  }

  function step(dir) {
    var amount = Math.max(280, Math.round(scroller.clientWidth * 0.6));
    scroller.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }

  btnL.addEventListener('click', function(){ step(-1); });
  btnR.addEventListener('click', function(){ step(1);  });
  scroller.addEventListener('scroll', updateArrows, { passive: true });

  // Keyboard support
  scroller.addEventListener('keydown', function(e){
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    if (e.key === 'ArrowRight'){ e.preventDefault(); step(1);  }
  });

  // Convert vertical wheel to horizontal scroll (desktop mice)
  scroller.addEventListener('wheel', function(e){
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scroller.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });

  updateArrows();
  if ('ResizeObserver' in window) {
    new ResizeObserver(updateArrows).observe(scroller);
  } else {
    window.addEventListener('resize', updateArrows);
  }
})();
