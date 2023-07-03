const showEvents = async () => {
    //fetch events from dtb
    // const resp = await fetch('api')
    // if (!resp.ok) {
    //     console.log('something went wrong')
    // }
    // const events = await resp.json()
    // events.forEach(event => {
    //     const { name, summary, main_image_url, start_date, end_date} = event
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
    
    const event_name = 'event name 1'
    const event_info = 'event info'
    const event_image_url = 'https://www.rd.com/wp-content/uploads/2017/01/07_Immune_Surprising_Health_benefits_Gardening_459405181_monkeybusinessimages.jpg'
    const start_date = 'July 2'
    const end_date = 'August 2'
    
    eventImage.src = event_image_url
    eventInfo.innerHTML = `${event_name}<br>${event_info}`
    eventDate.textContent = `${start_date} to ${end_date}`

    eventsTable.appendChild(row)
    row.appendChild(eventImageColumn)
    eventImageColumn.appendChild(eventImage)
    row.appendChild(eventInfo)
    row.appendChild(eventDate)
    row.appendChild(eventButtonColumn)
    eventButtonColumn.appendChild(joinButton)

    joinButton.addEventListener('click',() => {
        joinEvent(event_name)
    }) 

}

const joinEvent = (event_name) => {
    //add event to user in dtb
    alert(`You have joined the ${event_name} event!`)
}

const createEvent = () => {
    //take to createevents.html
    alert(`Create a community event`)
}

const eventsTable = document.querySelector('#community-events')

const row = document.createElement('tr')
const eventImageColumn = document.createElement('td')
const eventButtonColumn = document.createElement('td')
const eventName = document.createElement('td')
const eventInfo = document.createElement('td')
const eventImage = document.createElement('img')
const eventDate = document.createElement('td')
const joinButton = document.createElement('button')
joinButton.textContent='Join'

const createButton = document.querySelector('#create')
createButton.addEventListener('click', () => {
    createEvent()
})

showEvents()
