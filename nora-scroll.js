(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = '<span>\u25BC</span>';

    if (document.querySelector('.footer')) {
      indicator.classList.add('above-footer');
    }

    document.body.appendChild(indicator);

    function check() {
      var scrollable = document.documentElement.scrollHeight > window.innerHeight + 10;
      var atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 20);

      if (!scrollable || atBottom) {
        indicator.classList.add('hidden');
      } else {
        indicator.classList.remove('hidden');
      }
    }

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    setTimeout(check, 300);
    setTimeout(check, 1000);
  });
})();
