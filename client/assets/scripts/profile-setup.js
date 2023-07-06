document
  .getElementById("profile-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    console.log([...form.entries()]);
    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: form.get("name"),
        dp_url: form.get("dp_url"),
        profile_summary: form.get("profile_summary"),
      }),
    };
    try {
      const result = await fetch(
        `https://florinate-api.onrender.com/users/update`,
        options
      );
      const data = await result.json();

      if (result.status == 202) {
        window.location.href = "skills.html";
      } else {
        alert(data.Error);
      }
    } catch (error) {
      console.log(error);
    }
  });
