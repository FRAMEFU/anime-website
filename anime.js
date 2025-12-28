const params = new URLSearchParams(window.location.search);
const animeId = params.get("id");

// Anime Details
fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
  .then(res => res.json())
  .then(data => {
    const anime = data.data;

    document.getElementById("title").innerText = anime.title;
    document.getElementById("poster").src = anime.images.jpg.image_url;
    document.getElementById("desc").innerText = anime.synopsis || "No description available";
    document.getElementById("episodes").innerText = anime.episodes ?? "N/A";
    document.getElementById("rating").innerText = anime.score ?? "N/A";
    document.getElementById("malLink").href = anime.url;

    // Trailer
    if (anime.trailer && anime.trailer.embed_url) {
      document.getElementById("trailer").innerHTML = `
        <iframe width="100%" height="315"
        src="${anime.trailer.embed_url}"
        frameborder="0" allowfullscreen></iframe>
      `;
    } else {
      document.getElementById("trailer").innerText = "Trailer not available";
    }
  });

// Episode List
fetch(`https://api.jikan.moe/v4/anime/${animeId}/episodes`)
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("episodeList");

    if (!data.data || data.data.length === 0) {
      list.innerHTML = "<li>No episodes found</li>";
      return;
    }

    data.data.slice(0, 20).forEach(ep => {
      let li = document.createElement("li");
      li.innerText = `Episode ${ep.mal_id} - ${ep.title}`;
      list.appendChild(li);
    });
  });
