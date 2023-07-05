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

async function getJobs() {
  const token = localStorage.getItem("token");
  const options = {
    method: "GET",
    headers: {
      authorization: token,
    },
  };

  const response = await fetch("http://localhost:3000/jobs/my", options);
  const data = await response.json();

  if (response.status === 200) {
    const jobsContainer = document.getElementById("jobs-container");
    jobsContainer.innerHTML = ""; 

    data.forEach((job) => {
      const jobDiv = document.createElement("div");
      jobDiv.className = "job item-container";

      const jobName = document.createElement("h3");
      jobName.textContent = job.job_subject; 
      jobDiv.appendChild(jobName);

      const jobDescription = document.createElement("p");
      jobDescription.textContent = job.job_description; 
      jobDiv.appendChild(jobDescription);

      jobsContainer.appendChild(jobDiv);
    });
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

async function fetchBookmarkedEvents() {
  const token = localStorage.getItem("token");
  const options = {
    method: "GET",
    headers: {
      authorization: token,
    },
  };

  const response = await fetch("http://localhost:3000/events/bookmarked", options);
  const data = await response.json();

  if (response.status === 200) {
    const eventsContainer = document.getElementById("events-container");
    eventsContainer.innerHTML = ""; 

    data.forEach((event) => {
      const eventDiv = document.createElement("div");
      eventDiv.className = "event item-container";

      const eventName = document.createElement("h3");
      eventName.textContent = event.name;
      eventDiv.appendChild(eventName);

      const eventDescription = document.createElement("p");
      eventDescription.textContent = event.description;
      eventDiv.appendChild(eventDescription);

      eventsContainer.appendChild(eventDiv);
    });
  } else {
    console.log(data);
  }
}

getProfileDetails();
getJobs();
getEnrolledClasses();
fetchBookmarkedEvents();







  