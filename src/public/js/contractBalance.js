window.onload = function () {
  const rentButton = document.querySelector("#rentButton");
  const createRentForm = document.querySelector("#createRentForm");
  const expenseButton = document.querySelector("#expenseButton");
  const createExpenseForm = document.querySelector("#createExpenseForm");
  const bluredBack = document.querySelector("#blured-back");
  const mesInput = document.querySelector('#mes');

  //Rentas: abrir formulario modal
  rentButton.addEventListener("click", (e) => {
    e.preventDefault();

    createRentForm.classList.add("modal-form");
    createRentForm.classList.remove("display-none");
    bluredBack.classList.remove("display-none");
    mesInput.focus();
  });

  bluredBack.addEventListener("click", (e) => {
    createRentForm.classList.remove("modal-form");
    createRentForm.classList.add("display-none");
    bluredBack.classList.add("display-none");
  });

  //Drop-down arrow
  const rentCard = document.querySelectorAll('#rent-card');
  
  rentCard.forEach(tarjeta => {
    const dropDownArrow = tarjeta.querySelector("#drop-down-arrow");
    const rentCardDetail = tarjeta.querySelector("#rent-card-detail");
    const mainInfoTotal = tarjeta.querySelector('#rc-mi-total');
    const mainInfoCount = tarjeta.querySelector('#rc-mi-count');
    const mainInfoDate = tarjeta.querySelector('#rc-mi-date');

    dropDownArrow.addEventListener("click", (e) => {
      rentCardDetail.classList.toggle('rcd-show');
      dropDownArrow.classList.toggle('rca-rotate');
      mainInfoTotal.classList.toggle('display-none');
      mainInfoCount.classList.toggle('display-none');
      mainInfoDate.classList.toggle('slide-right');
    });

  })
};
