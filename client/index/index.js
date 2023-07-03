async function loadPosts() {
  const response = await fetch("http://localhost:3000/plays");

  if (response.status == 200) {
    const plays = await response.json();

    const container = document.getElementById("play-listings");
    plays.forEach((p) => {
      const html = `
        <h3>${p.name}</h3>
        <p>${p.summary}</p>
        <p>Duration: ${p.length} Minutes</p>
        <p>Time: ${(new Date(p.time* 1000)).toUTCString()}</p>
      `;
        const playData = document.createElement("div");
        playData.class = "play";
      playData.innerHTML = html;
      container.appendChild(playData);
    });
  }
}

loadPosts();
