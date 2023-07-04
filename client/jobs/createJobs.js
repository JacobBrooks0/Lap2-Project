let user_id = localStorage.getItem('user_id')



document.querySelector('#create').addEventListener('submit', async (e) => {
    // e.preventDefault()
    alert('hello')
    const form = new FormData(e.target)
    console.log(form.get('subject'))
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
    }
    try {
        const result = await fetch(`http://localhost:3000/jobs`, options)
        const data = await result.json()
        if (result.status==201) {
            // window.location.reload()
            alert('job created')
        } else {
            alert(data.Error.detail)
        }
    } catch (error) {
        console.log(error)
    }
})

// popupText.innerHTML=`You have created a job listing!`
// popupText.classList.toggle("show")
