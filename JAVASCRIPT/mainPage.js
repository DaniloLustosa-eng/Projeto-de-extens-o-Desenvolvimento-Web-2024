window.addEventListener('scroll', function() {
  const mapContainer = document.getElementById('mapContainer');
  const locationTitle = document.getElementById('location_Title');
  const sobreSection = document.getElementById('sobre');
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;

//Animação para a localização
  if (scrollPosition >= pageHeight - 100) {
      mapContainer.classList.add('show');
  } else {
      mapContainer.classList.remove('show');
  }

  if (scrollPosition >= pageHeight - 300) {
      locationTitle.classList.add('show');
  } else {
      locationTitle.classList.remove('show');
  }

  const sobrePosition = sobreSection.offsetTop;
  if (scrollPosition >= sobrePosition + sobreSection.clientHeight / 2) {
      sobreSection.classList.add('show');
  } else {
      sobreSection.classList.remove('show');
  }
  
});