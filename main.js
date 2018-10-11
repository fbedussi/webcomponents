const toggleBtn = document.querySelector('#toggle');
const infoBox = document.querySelector('info-box');

toggleBtn.addEventListener('click', function() {
    infoBox.attributes.show.value = infoBox.attributes.show.value === 'true' ? 'false' : 'true';
})