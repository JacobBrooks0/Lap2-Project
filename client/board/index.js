// function createPlayElement(data) {
//   const post = document.createElement("div");
//   post.className = "post";

//   const header = document.createElement("h2");
//   header.textContent = data["title"];
//   post.appendChild(header);

//   const content = document.createElement("p");
//   content.textContent = data["content"];
//   post.appendChild(content);

//   const remove = document.createElement("button");
//   remove.id = data["id"];
//   remove.textContent = "x";
//   remove.addEventListener("click", deletePost);
//   post.appendChild(remove);

//   return post;
// }

// async function deletePost(e) {
//   const postId = e.target.id;
//   const options = {
//     method: "DELETE",
//     headers: {
//       Authorization: localStorage.getItem("token"),
//     },
//   };

//   const response = await fetch(
//     `http://localhost:3000/posts/${postId}`,
//     options
//   );
//   //   const data = await response.json();
//   console.log(response);
//   if (response.status == 200) {
//     window.location.reload();
//   } else {
//     alert(data);
//   }
// }

document.getElementById("play-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      name: form.get("name"),
      summary: form.get("summary"),
      length: form.get("length"),
      time: (Date.parse(form.get("time")) / 1000),
    }),
  };
  try {
    const result = await fetch("http://localhost:3000/plays", options);
    const data = await result.json();
    if (result.status == 201) {
      window.location.reload();
    } else {
      alert(data.Error.detail);
    }
  } catch (error) {
    console.log(error);
  }
});

async function loadMyPlays() {
  const options = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  const response = await fetch("http://localhost:3000/plays/my", options);

  if (response.status == 200) {
    const plays = await response.json();

    const container = document.getElementById("my-plays");

    plays.forEach((p) => {
      const html = `
          <h3>${p.name}</h3>
          <p>${p.summary}</p>
          <p>Duration: ${p.length}</p>
          <p>Time: ${(new Date(p.time* 1000)).toUTCString()}</p>
        `;
      const playData = document.createElement("div");
      playData.class = "play";
      playData.innerHTML = html;
      container.appendChild(playData);
    });
  } else {
    console.log(response.error);
  }
}

loadMyPlays();
