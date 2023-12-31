const popup = document.querySelector(".popup");

document.querySelector("#job-form").addEventListener("submit", async (e) => {
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
        job_subject: form.get("subject"),
        job_description: form.get("description"),
        job_location: form.get("location"),
        job_requirements: form.get("requirements"),
      }),
    };
    const result = await fetch(
      `https://florinate-api.onrender.com/jobs`,
      options
    );
    const data = await result.json();
    if (result.status == 201) {
      const popupText = document.createElement("p");
      popup.appendChild(popupText);
      popupText.classList.add("popupText");

      popupText.innerHTML = `You have created a job listing!`;
      popupText.classList.toggle("show");

      setTimeout(() => window.location.reload(), 5000);
    } else {
      alert(data.Error);
    }
  } catch (error) {
    console.log(error);
  }
});
