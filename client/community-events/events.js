const showEvents = async () => {
    // //fetch events from dtb
    // const resp = await fetch('api')
    // if (!resp.ok) {
    //     console.log('something went wrong')
    // }
    // const events = await resp.json()
    // events.forEach(event => {
    //     const { name, summary, main_image_url, start_date, end_date} = event
    
    //     const row = document.createElement('tr')
    //     const eventImageColumn = document.createElement('td')
    //     const eventButtonColumn = document.createElement('td')
    //     const eventInfo = document.createElement('td')
    //     const eventImage = document.createElement('img')
    //     const eventDate = document.createElement('td')
    //     const joinButton = document.createElement('button')
    //     joinButton.textContent='Join'

    //     eventImage.src = main_image_url
    //     eventInfo.innerHTML = `${name}<br>${summary}`
    //     classDate.textContent = `${start_date} to ${end_date}`

    //     eventsTable.appendChild(row)
    //     eventImageColumn.appendChild(eventImage)
    //     row.appendChild(eventImageColumn)
    //     row.appendChild(eventInfo)
    //     row.appendChild(eventDate)
    //     eventButtonColumn.appendChild(joinButton)
    
    //     joinButton.addEventListener('click',() => {
    //         joinEvent(name)
    //     }) 

    //     row.appendChild(eventButtonColumn)
    // })
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
    popup.firstChild.remove()
    const popupText = document.createElement('p')
    popup.appendChild(popupText)
    popupText.classList.add('popupText')

    popupText.innerHTML=`You have created a community event!`
    popupText.classList.toggle("show")
}

const eventsTable = document.querySelector('#community-events')


const createButton = document.querySelector('#create')
createButton.addEventListener('click', () => {
    createEvent()
})

const popup = document.querySelector('.popup')

showEvents()
