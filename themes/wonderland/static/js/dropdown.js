var dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function (event) {
    event.stopPropagation();
    dropdown.classList.toggle('is-active');
});

document.body.addEventListener('click', function (event) {
    event.stopPropagation();
    activeDropdown = document.querySelector('.dropdown.is-active');
    if (activeDropdown) {
        activeDropdown.classList.toggle('is-active');
    }
})