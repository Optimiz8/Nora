document.getElementById('clickMe').addEventListener('click', function() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'Bravo ! Le JavaScript fonctionne parfaitement.';
    console.log('Bouton cliqué !');
});