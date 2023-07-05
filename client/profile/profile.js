const classesContainer = document.getElementById("classes-container");
const userName = document.getElementById("user-name");
const userDescription = document.getElementById("user-description");
const profileImage = document.querySelector(".profile-image");

async function getProfileDetails() {
  const options = {
    method: "GET",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  const response = await fetch("http://localhost:3000/users/details", options);
  const data = await response.json();

  if (response.status === 200) {
    userName.textContent = data.name;
    userDescription.textContent = data.profile_summary;
    profileImage.src = data.dp_url;
  } else {
    console.log(data);
  }
}

async function getEnrolledClasses() {
  const options = {
    method: "GET",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  const response = await fetch("http://localhost:3000/classes/enrolled", options);
  const data = await response.json();

  if (response.status === 200) {
    data.forEach((classItem) => {
      const classDiv = document.createElement("div");
      classDiv.classList.add("item-container");

      const className = document.createElement("h3");
      className.textContent = classItem.name;
      classDiv.appendChild(className);

      const classInfo = document.createElement("p");
      classInfo.textContent = classItem.info;
      classDiv.appendChild(classInfo);

      classesContainer.appendChild(classDiv);
    });
  } else {
    console.log(data);
  }
}

getProfileDetails();
getEnrolledClasses();







  