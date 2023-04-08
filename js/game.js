const button = document.querySelector('.gamesearchButton');
button.addEventListener('click', function () {
    const inputSearch = document.querySelector('.gamesearchTerm');
    const valueSearch = inputSearch.value;

    fetch(`/search?query=${valueSearch}`)
        .then(response => console.log(response))
        .catch(err => console.log(err));
});
