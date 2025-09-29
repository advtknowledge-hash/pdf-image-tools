// site.js — active highlight + arrow scrolling + auto-hide arrows
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
      var wrapEl = document.querySelector('.tool-tabs');
      if (wrapEl) {
        var dx = a.offsetLeft - (wrapEl.clientWidth/2 - a.clientWidth/2);
        wrapEl.scrollTo({ left: dx, behavior: 'smooth' });
      }
    }
  });

  // Elements
  var wrap    = document.querySelector('.tool-tabs-wrap');
  var scroller= document.querySelector('.tool-tabs');
  var btnL    = document.querySelector('.tool-left');
  var btnR    = document.querySelector('.tool-right');
  if (!wrap || !scroller || !btnL || !btnR) return;

  function updateArrows() {
    // How much content exceeds the visible width?
    var max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    var hasOverflow = max > 1;

    // Toggle "no-overflow" class on wrapper (CSS hides arrows & fades)
    wrap.classList.toggle('no-overflow', !hasOverflow);

    if (!hasOverflow) return; // nothing else to do

    // Enable/disable buttons when overflow exists
    btnL.disabled = scroller.scrollLeft <= 2;
    btnR.disabled = scroller.scrollLeft >= max - 2;
  }

  function step(dir) {
    var amount = Math.max(280, Math.round(scroller.clientWidth * 0.6));
    scroller.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }

  // Click handlers
  btnL.addEventListener('click', function(){ step(-1); });
  btnR.addEventListener('click', function(){ step(1);  });

  // Keep arrow state fresh while scrolling
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

  // Initial + on resize (fonts/layout changes)
  updateArrows();
  if ('ResizeObserver' in window) {
    new ResizeObserver(updateArrows).observe(scroller);
  } else {
    window.addEventListener('resize', updateArrows);
  }
})();

(function(){
  const path = location.pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll('nav a, .tool-tabs a').forEach(a=>{
    const href = (a.getAttribute('href')||"").replace(/\/$/, "") || "/";
    if(href === path) a.classList.add('active');
  });
})();

