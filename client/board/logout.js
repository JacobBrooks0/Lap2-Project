const logout = document.getElementById("log-out");

logout.addEventListener("click", async (e) => {
  e.preventDefault();
  const options = {
    method: "DELETE",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  const response = await fetch("http://localhost:3000/users/logout", options);
  const data = await response.json();

  if (response.status == 202) {
    localStorage.removeItem("token");
    window.location.assign("/client/index/index.html");
  } else {
    console.log(data);
  }
});
