const showJobs = async () => {
    const resp = await fetch('http://localhost:3000/jobs')
    if (!resp.ok) {
        console.log(Error.detail)
    }
    const jobs = await resp.json()
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
    const { job_subject } = job
    
    popup.firstChild.remove()
    const popupText = document.createElement('p')
    popup.appendChild(popupText)
    popupText.classList.add('popupText')

    popupText.innerHTML=`You have applied to the ${job_subject} job!`
    popupText.classList.toggle("show")
}

const createJob = () => {
    //take to createJobs.html
    window.open('./createJobs.html','_self')
}

const jobsTable = document.querySelector('#job-listings')

const createButton = document.querySelector('#create')
createButton.addEventListener('click', () => {
    createJob()
})

const popup = document.querySelector('.popup')

showJobs()
