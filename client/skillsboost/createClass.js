let user_id = localStorage.getItem('user_id')

document.querySelector('#class-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        const form = new FormData(e.target)
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
                start_date: form.get("start-date"),
                end_date: form.get("end-date"),
              }),
        }
        const result = await fetch(`http://localhost:3000/classes`, options)
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

    // popup.firstChild.remove()
    // const popupText = document.createElement('p')
    // popup.appendChild(popupText)
    // popupText.classList.add('popupText')

    // popupText.innerHTML=`You have created a skills class!`
    // popupText.classList.toggle("show")
