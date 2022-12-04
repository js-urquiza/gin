window.onload = function () {
  const rentButton = document.querySelector("#rentButton");
  const createRentForm = document.querySelector("#createRentForm");
  const expenseButton = document.querySelector("#expenseButton");
  const createExpenseForm = document.querySelector("#createExpenseForm");
  const bluredBack = document.querySelector("#blured-back");

  //Rentas: abrir formulario modal
  rentButton.addEventListener("click", (e) => {
    e.preventDefault();

    createRentForm.classList.add("modal-form");
    createRentForm.classList.remove("display-none");
    bluredBack.classList.remove("display-none");
  });

  bluredBack.addEventListener("click", (e) => {
    createRentForm.classList.remove("modal-form");
    createRentForm.classList.add("display-none");
    bluredBack.classList.add("display-none");
  });

  //Cargas: abrir formulario modal
  expenseButton.addEventListener("click", (e) => {
    e.preventDefault();

    createExpenseForm.classList.add("modal-form");
    createExpenseForm.classList.remove("display-none");
    bluredBack.classList.remove("display-none");
  });

  bluredBack.addEventListener("click", (e) => {
    createExpenseForm.classList.remove("modal-form");
    createExpenseForm.classList.add("display-none");
    bluredBack.classList.add("display-none");
  });

  //Transacciones: abrir formulario modal para editar transacción
  const transactions = document.querySelectorAll('#transaction');

  transactions.forEach(transaction => {
    let editBtn = transaction.querySelector("#editButton");
    let transEditForm = transaction.querySelector("#transEditForm");

    editBtn.addEventListener('click', e => {
      transEditForm.classList.add('modal-form');
      transEditForm.classList.remove('display-none');
      bluredBack.classList.remove('display-none');
    });

    bluredBack.addEventListener("click", (e) => {
      transEditForm.classList.remove("modal-form");
      transEditForm.classList.add("display-none");
      bluredBack.classList.add("display-none");
    });
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