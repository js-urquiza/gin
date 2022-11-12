window.onload = function() {
    const rentButton = document.querySelector("#rentButton");
    const createRentForm = document.querySelector('#createRentForm');
    const bluredBack = document.querySelector('#blured-back');

    rentButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        createRentForm.classList.add('modal-form');
        createRentForm.classList.remove('display-none');
        bluredBack.classList.remove('display-none');
    });

    bluredBack.addEventListener('click', (e) => {
        createRentForm.classList.remove('modal-form');
        createRentForm.classList.add('display-none');
        bluredBack.classList.add('display-none');
    })
}