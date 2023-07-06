document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: form.get("username"),
      password: form.get("password"),
    }),
  };

  const response = await fetch("http://localhost:3000/users/login", options);
  const data = await response.json();

  if (response.status == 201) {
    localStorage.setItem("token", data.token);
    checkForProfileDetails();
  } else {
    alert(data.Error);
  }
});

async function checkForProfileDetails() {
  const option = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  try {
    const response = await fetch("http://localhost:3000/users/details", option);
    const data = await response.json();

    if (response.status == 200) {
      if (!(data.name && data.profile_summary)) {
        window.location.assign("/client/profile-setup/index.html");
      } else {
        window.location.assign("/client/skillsboost/skills.html");
      }
    } else {
      alert(data.Error);
    }
  } catch (error) {
    console.log(error);
  }
}
