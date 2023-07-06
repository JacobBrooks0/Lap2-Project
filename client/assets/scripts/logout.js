const logout = document.getElementById("log-out");

logout.addEventListener("click", async (e) => {
  e.preventDefault();
  const options = {
    method: "DELETE",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  try {
    const response = await fetch(
      `https://florinate-api.onrender.com/users/logout`,
      options
    );
    const data = await response.json();
    localStorage.removeItem("token");
    window.location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
});
