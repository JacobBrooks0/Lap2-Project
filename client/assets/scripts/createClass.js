const popup = document.querySelector(".popup");

document.querySelector("#class-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
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
        info: form.get("info"),
        start_date: Date.parse(form.get("start-date")) / 1000,
        end_date: Date.parse(form.get("end-date")) / 1000,
        capacity: form.get("capacity"),
      }),
    };
    const result = await fetch(
      `https://florinate-api.onrender.com/classes`,
      options
    );
    const data = await result.json();
    if (result.status == 201) {
      const popupText = document.createElement("p");
      popup.appendChild(popupText);
      popupText.classList.add("popupText");
      popupText.innerHTML = `You have created a skills class!`;
      popupText.classList.toggle("show");

      setTimeout(() => window.location.reload(), 5000);
    } else {
      alert(data.Error);
    }
  } catch (error) {
    console.log(error);
  }
});
