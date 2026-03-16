if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(() => {
    // Une fois le SW prêt, pré-cacher les sons utilisés dans les préréglages enregistrés
    navigator.serviceWorker.ready.then(reg => {
      if (!reg.active) return;

      const presets = JSON.parse(localStorage.getItem('mixerPresets') || '[]');
      const soundNames = new Set();

      presets.forEach(preset => {
        Object.entries(preset.volumes || {}).forEach(([name, vol]) => {
          if (vol > 0) soundNames.add(name);
        });
      });

      if (soundNames.size > 0) {
        const urls = [...soundNames].map(name => `./assets/audio/${name}.mp3`);
        reg.active.postMessage({ type: 'CACHE_AUDIO', urls });
      }
    });
  }).catch(() => {});
}
