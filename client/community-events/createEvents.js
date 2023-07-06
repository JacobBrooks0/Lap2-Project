const popup = document.querySelector('.popup')
console.log('test')

document.querySelector('#event-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log('test 2')
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
                main_image_url: form.get("image"),
                start_date: (Date.parse(form.get("start-date")) / 1000),
                end_date: (Date.parse(form.get("end-date")) / 1000)
              }),
        }
        const result = await fetch(`http://localhost:3000/events`, options)
        const data = await result.json()
        if (result.status==201) {
            const popupText = document.createElement('p')
            popup.appendChild(popupText)
            popupText.classList.add('popupText')
            popupText.innerHTML=`You have created a job listing!`
            popupText.classList.toggle("show")

            setTimeout(() => window.location.reload(),5000)
        } else if (result.status==500){
            alert('Something went wrong. There may be an event with this name already.')
        } else {
            console.log(Error.detail)
        }
    } catch (error) {
        console.log(error)
    }
})
