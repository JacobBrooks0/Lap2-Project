const showSkills = async () => {
    //fetch classes from dtb
    const resp = await fetch('http://localhost:3000/classes')
    if (!resp.ok) {
        console.log('something went wrong')
    }
    const skillClasses = await resp.json()
    skillClasses.forEach(skillClass => {
        const { name, info, main_image_url, start_date, end_date} = skillClass

        const row = document.createElement('tr')
        const skillImageColumn = document.createElement('td')
        const skillButtonColumn = document.createElement('td')
        const skillInfo = document.createElement('td')
        const skillImage = document.createElement('img')
        const classDate = document.createElement('td')
        const applyButton = document.createElement('button')
        applyButton.textContent='Enrol'

        skillImage.src = main_image_url
        skillInfo.innerHTML = `${name ? name : ''}<br>${info ? info : ''}`
        classDate.textContent = `${(new Date(start_date* 1000)).toUTCString()} to ${(new Date(end_date* 1000)).toUTCString()}`

        skillsTable.appendChild(row)
        skillImageColumn.appendChild(skillImage)
        row.appendChild(skillImageColumn)
        row.appendChild(skillInfo)
        row.appendChild(classDate)
        skillButtonColumn.appendChild(applyButton)
    
        applyButton.addEventListener('click',() => {
            applyToClass(name)
        }) 

        row.appendChild(skillButtonColumn)
    })

}

const applyToClass = (skill_name) => {
    //add skill to user in dtb
    popup.firstChild.remove()
    const popupText = document.createElement('p')
    popup.appendChild(popupText)
    popupText.classList.add('popupText')

    popupText.innerHTML=`You have joined the ${skill_name} class!`
    popupText.classList.toggle("show")
}

const createClass = () => {
    //take to createSkills.html

    localStorage.setItem('user_id',1)
    localStorage.setItem('token','123')
    window.open('./createClass.html','_self')
}

const skillsTable = document.querySelector('#skill-classes')


const createButton = document.querySelector('#create')
createButton.addEventListener('click', () => {
    createClass()
})

const popup = document.querySelector('.popup')

showSkills()

