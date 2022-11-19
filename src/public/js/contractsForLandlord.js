window.onload = function () {
  
  //Mostrar search-box
  const searchBtn = document.querySelector("#search-btn");
  const searchBox = document.querySelector('#search-box');

  searchBtn.addEventListener("click", (e) => {
    searchBox.classList.toggle("display-none");
    searchBox.focus();
  });

  //Filtrar resultado
  const li = document.querySelectorAll('#property-cards-list li');

  searchBox.addEventListener('keyup', e => {
    const valueSearched = e.target.value.toLowerCase();

    li.forEach(card => {
      let q = card.querySelector('#cd-text p');

      let p = q.textContent
        .toLowerCase()
        .normalize("NFD") //Esta función normaliza los carácteres con acento
        .replace(/\p{Diacritic}/gu, "");

      if(p.indexOf(valueSearched) == -1) {
        card.classList.add('display-none');
      } else {
        card.classList.remove('display-none');
      }

    })
  })

};
