const showJobs = async () => {
    const resp = await fetch('http://localhost:3000/jobs')
    if (!resp.ok) {
        console.log('something went wrong')
    }
    const jobs = await resp.json()
    console.log(jobs)
    jobs.forEach(job => {
        const { job_subject, job_description, job_location, job_requirements} = job

        const row = document.createElement('tr')
        const jobButtonColumn = document.createElement('td')
        const jobSubject = document.createElement('td')
        const jobDesc = document.createElement('td')
        const jobLocation = document.createElement('td')
        const jobRequirements = document.createElement('td')
        const applyButton = document.createElement('button')
        applyButton.textContent='Apply'

        jobSubject.textContent = job_subject
        jobDesc.textContent = job_description
        jobLocation.textContent = job_location
        jobRequirements.textContent = job_requirements

        jobsTable.appendChild(row)
        row.appendChild(jobSubject)
        row.appendChild(jobDesc)
        row.appendChild(jobRequirements)
        row.appendChild(jobLocation)
        jobButtonColumn.appendChild(applyButton)
        applyButton.addEventListener('click',() => {
            applyToJob(job)
        }) 
        row.appendChild(jobButtonColumn)
    })
}

const applyToJob = (job) => {
    //add job to user in dtb
    // alert(`You have applied to the ${job_name} job!`)
    const { job_name } = job
    popupText.innerHTML=`You have applied to the ${job_name} job!`
    popupText.classList.toggle("show")
}

const createJob = () => {
    //take to createJobs.html
    //alert(`Create a job listing`)
    popupText.innerHTML=`You have created a job listing!`
    popupText.classList.toggle("show")
}

const jobsTable = document.querySelector('#job-listings')

const createButton = document.querySelector('#create')
createButton.addEventListener('click', () => {
    createJob()
})

const popup = document.querySelector('.popup')
const popupText = document.querySelector('.popupText')

showJobs()