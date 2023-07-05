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
        const eventInfo = document.createElement('td')
        const eventImage = document.createElement('img')
        const eventDate = document.createElement('td')
        const joinButton = document.createElement('button')
        joinButton.textContent='Join'

        eventImage.src = main_image_url
        eventInfo.innerHTML = `${name ? name : ''}<br>${info ? info : ''}`
        eventDate.textContent = `${(new Date(start_date* 1000)).toUTCString()} to ${(new Date(end_date* 1000)).toUTCString()}`

        eventsTable.appendChild(row)
        eventImageColumn.appendChild(eventImage)
        row.appendChild(eventImageColumn)
        row.appendChild(eventInfo)
        row.appendChild(eventDate)
        eventButtonColumn.appendChild(joinButton)
    
        joinButton.addEventListener('click',() => {
            joinEvent(name)
        }) 

        row.appendChild(eventButtonColumn)
    })
}

const joinEvent = (event_name) => {
    //add event to user in dtb
    //alert(`You have joined the ${event_name} event!`)
    popup.firstChild.remove()
    const popupText = document.createElement('p')
    popup.appendChild(popupText)
    popupText.classList.add('popupText')

    popupText.innerHTML=`You have joined the ${event_name} event!`
    popupText.classList.toggle("show")
}

const createEvent = () => {
    //take to createEvents.html
    // alert(`Create a community event`)
    // popup.firstChild.remove()
    // const popupText = document.createElement('p')
    // popup.appendChild(popupText)
    // popupText.classList.add('popupText')

    // popupText.innerHTML=`You have created a community event!`
    // popupText.classList.toggle("show")
    // localStorage.setItem('user_id',1)
    // localStorage.setItem('token','f921ce3d-5dcc-48c2-8cbe-09693a62c488')
    window.open('./createEvent.html','_self')
}

const eventsTable = document.querySelector('#community-events')


const createButton = document.querySelector('#create')
createButton.addEventListener('click', () => {
    createEvent()
})

const popup = document.querySelector('.popup')

showEvents()
