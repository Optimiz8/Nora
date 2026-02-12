(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = '<span>\u25BC</span>';

    var hasFooter = document.querySelector('.footer');
    if (hasFooter) {
      indicator.classList.add('above-footer');
    }

    document.body.appendChild(indicator);

    // Rendre cliquable : scroll vers le bas
    indicator.style.pointerEvents = 'auto';
    indicator.style.cursor = 'pointer';
    indicator.addEventListener('click', function() {
      window.scrollBy({ top: window.innerHeight * 0.6, behavior: 'smooth' });
    });

    function check() {
      // Seuil plus élevé : au moins 80px de contenu caché pour afficher l'indicateur
      var footerHeight = hasFooter ? parseInt(getComputedStyle(document.documentElement).getPropertyValue('--footer-height')) || 64 : 0;
      var visibleHeight = window.innerHeight - footerHeight;
      var scrollable = document.documentElement.scrollHeight > visibleHeight + 80;
      var atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 30);

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
