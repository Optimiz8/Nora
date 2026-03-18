// ---------- QUOTA GUARD ----------
(function() {
  var _orig = Storage.prototype.setItem;
  var _toastShown = false;

  Storage.prototype.setItem = function(key, value) {
    try {
      _orig.call(this, key, value);
    } catch(e) {
      if (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014) {
        if (_toastShown) return;
        _toastShown = true;
        var t = document.createElement('div');
        t.setAttribute('role', 'alert');
        t.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(255,70,70,0.92);color:#F5E4CC;padding:14px 20px;border-radius:14px;font-size:15px;font-family:inherit;z-index:9999;text-align:center;max-width:320px;width:calc(100% - 40px);line-height:1.5;box-shadow:0 4px 16px rgba(0,0,0,0.3)';
        t.textContent = '⚠️ Stockage plein — Cette donnée n\'a pas pu être sauvegardée. Libère de l\'espace dans Paramètres → Réinitialiser.';
        document.body.appendChild(t);
        setTimeout(function() { t.remove(); _toastShown = false; }, 7000);
      }
    }
  };
})();

// ---------- SCROLL INDICATOR ----------
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
