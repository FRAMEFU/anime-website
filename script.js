function showLoading() {
  list.innerHTML = "<h2>Loading...</h2>";
}

const list = document.getElementById("anime-list");
const search = document.getElementById("search");

// Default Top Anime
loadTopAnime();

// Search anime
search.addEventListener("keyup", () => {
  if (search.value === "") {
    loadTopAnime();
  } else {
    searchAnime(search.value);
  }
});

function loadTopAnime() {
    showLoading();

  list.innerHTML = "";
  fetch("https://api.jikan.moe/v4/top/anime")
    .then(res => res.json())
    .then(data => showAnime(data.data.slice(0, 8)));
}

function searchAnime(query) {
    showLoading();

  list.innerHTML = "";
  fetch(`https://api.jikan.moe/v4/anime?q=${query}`)
    .then(res => res.json())
    .then(data => showAnime(data.data.slice(0, 8)));
}

function showAnime(animes) {
  list.innerHTML = "";
  animes.forEach(anime => {
    let card = document.createElement("div");
    card.className = "anime-card";
    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}">
      <h3>${anime.title}</h3>
      <a href="anime.html?id=${anime.mal_id}" class="watch-btn">
        View Details
      </a>
    `;
    list.appendChild(card);
  });
}


