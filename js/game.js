const button = document.querySelector(".gamesearchButton");
button.addEventListener("click", async () => {
  const inputSearch = document.querySelector(".gamesearchTerm");
  const valueSearch = inputSearch.value;
  try {
    const response = await fetch(`/search?query=${valueSearch}`, {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);
    const word = data.word;
    if (data.status === true) {
      for (let i = 0; i < data.positions.length; i++) {
        document.querySelectorAll("h5 > .gamewordfalse")[
          data.positions[i]
        ].textContent = word;
        document
          .querySelectorAll("h5 > .gamewordfalse")
          [data.positions[i]].classList.add("gamewordtrue");
        document
          .querySelectorAll("h5 > .gamewordfalse")
          [data.positions[i]].classList.remove("gamewordfalse");
      }
    }
  } catch (error) {
    console.log(error);
  }
});
