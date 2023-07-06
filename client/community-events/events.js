const showEvents = async () => {
    //fetch events from dtb
    const resp = await fetch('http://localhost:3000/events')
    if (!resp.ok) {
        console.log('something went wrong')
    }
    const events = await resp.json()
    events.forEach(event => {
        const { name, main_image_url, info, start_date, end_date} = event
    
        const row = document.createElement('tr')
        const eventImageColumn = document.createElement('td')
        const eventButtonColumn = document.createElement('td')
        const eventName = document.createElement('td')
        const eventInfo = document.createElement('td')
        const eventImage = document.createElement('img')
        const eventDate = document.createElement('td')
        const bookmarkButton = document.createElement('button')
        bookmarkButton.textContent='Bookmark'

        eventImage.src = main_image_url
        eventName.textContent = name
        eventInfo.innerHTML = `${info ? info : ''}`
        eventDate.innerHTML = `${(new Date(start_date* 1000)).toUTCString()}<br>to ${(new Date(end_date* 1000)).toUTCString()}`

        eventsTable.appendChild(row)
        eventImageColumn.appendChild(eventImage)
        row.appendChild(eventImageColumn)
        row.appendChild(eventName)
        row.appendChild(eventInfo)
        row.appendChild(eventDate)
        eventButtonColumn.appendChild(bookmarkButton)
    
        bookmarkButton.addEventListener('click',() => {
            bookmarkEvent(event)
        }) 

        row.appendChild(eventButtonColumn)
    })
}

const bookmarkEvent = async(event) => {
    //grey out bookmarked events - delete bookmark
    try {
        const options = {
            method: 'POST',
            headers: {
                authorization: localStorage.getItem("token"),
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }
        const resp = await fetch(`http://localhost:3000/events/${event.event_id}/bookmark`, options)
        const data = await resp.json()

        if (resp.status==201) {
            popup.firstChild.remove()
            const popupText = document.createElement('p')
            popup.appendChild(popupText)
            popupText.classList.add('popupText')
        
            popupText.innerHTML=`You have bookmarked the ${event.name} event!`
            popupText.classList.toggle("show")
        } else {
            alert('something went wrong')
        }

    } catch (err) {
        console.log(err)
    }
}

const createEvent = () => {
    //take to createEvents.html
    window.open('./createEvent.html','_self')
}

const eventsTable = document.querySelector('#community-events')


const createButton = document.querySelector('#create')
createButton.addEventListener('click', () => {
    createEvent()
})

const popup = document.querySelector('.popup')

localStorage.setItem('user_id',1)
localStorage.setItem('token','d01b2d1f-0dad-4e1c-8e7c-41ef2c7d1077')

showEvents()
