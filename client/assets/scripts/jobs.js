const showJobs = async () => {
  const resp = await fetch(`https://florinate-api.onrender.com/jobs`);
  if (!resp.ok) {
    console.log(Error.detail);
  }
  const jobs = await resp.json();

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
  const resp2 = await fetch(
    `https://florinate-api.onrender.com/jobs/my`,
    options
  );
  const myJobs = resp2.ok ? await resp2.json() : false;

  jobs.forEach((job) => {
    const { job_subject, job_description, job_location, job_requirements } =
      job;

    const row = document.createElement("tr");
    const jobButtonColumn = document.createElement("td");
    const jobSubject = document.createElement("td");
    const jobDesc = document.createElement("td");
    const jobLocation = document.createElement("td");
    const jobRequirements = document.createElement("td");
    const applyButton = document.createElement("button");

    const checkIfApplied = () => {
      if (myJobs) {
        const applied = myJobs.find((myJob) => myJob.job_id == job.job_id);
        return applied;
      } else {
        return false;
      }
    };

    if (checkIfApplied()) {
      row.style.backgroundColor = "lightgrey";
      applyButton.textContent = "Delete";
      applyButton.addEventListener("click", () => {
        deleteJob(job);
      });
    } else {
      applyButton.textContent = "Apply";
      applyButton.addEventListener("click", () => {
        applyToJob(job);
      });
    }

    jobSubject.textContent = job_subject;
    jobDesc.textContent = job_description;
    jobLocation.textContent = job_location;
    jobRequirements.textContent = job_requirements;

    jobsTable.appendChild(row);
    row.appendChild(jobSubject);
    row.appendChild(jobDesc);
    row.appendChild(jobRequirements);
    row.appendChild(jobLocation);
    jobButtonColumn.appendChild(applyButton);
    row.appendChild(jobButtonColumn);
  });
};

const deleteJob = async (job) => {
  if (
    window.confirm(
      `Are you sure you want to delete the '${job.job_subject}' listing?`
    )
  ) {
    try {
      const options = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      };
      const resp = await fetch(
        `https://florinate-api.onrender.com/jobs/my/${job.job_id}`,
        options
      );
      if (!resp.ok) {
        console.log(Error.detail);
      }
      if (resp.status == 204) {
        const popupText = document.createElement("p");
        popup.appendChild(popupText);
        popupText.classList.add("popupText");
        popupText.innerHTML = `You have deleted the $'{job.job_subject}' job listing.`;
        popupText.classList.toggle("show");

        setTimeout(() => window.location.reload(), 5000);
      }
    } catch (err) {
      console.log(err);
    }
  }
};

const applyToJob = (job) => {
  //add job to user in dtb
  const { job_subject } = job;

  popup.firstChild.remove();
  const popupText = document.createElement("p");
  popup.appendChild(popupText);
  popupText.classList.add("popupText");

  popupText.innerHTML = `You have applied to the $'{job_subject}' job!`;
  popupText.classList.toggle("show");
};

const createJob = () => {
  //take to createJobs.html
  window.open("createJobs.html", "_self");
};

const jobsTable = document.querySelector("#job-listings");

const createButton = document.querySelector("#create");
createButton.addEventListener("click", () => {
  createJob();
});

const popup = document.querySelector(".popup");

showJobs();
