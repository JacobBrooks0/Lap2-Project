const showSkills = async () => {
    // //fetch skills from dtb
    // const resp = await fetch('api')
    // if (!resp.ok) {
    //     console.log('something went wrong')
    // }
    // const skillClasses = await resp.json()
    // skillClasses.forEach(skillClass => {
    //     const { name, summary, main_image_url, start_date, end_date} = skillClass
        
    //     const row = document.createElement('tr')
    //     const skillImageColumn = document.createElement('td')
    //     const skillButtonColumn = document.createElement('td')
    //     const skillInfo = document.createElement('td')
    //     const skillImage = document.createElement('img')
    //     const classDate = document.createElement('td')
    //     const applyButton = document.createElement('button')
    //     applyButton.textContent='Apply'

    //     skillImage.src = main_image_url
    //     skillInfo.innerHTML = `${name}<br>${summary}`
    //     classDate.textContent = `${start_date} to ${end_date}`

    //     skillsTable.appendChild(row)
    //     skillImageColumn.appendChild(skillImage)
    //     row.appendChild(skillImageColumn)
    //     row.appendChild(skillInfo)
    //     row.appendChild(classDate)
    //     skillButtonColumn.appendChild(applyButton)
    
    //     applyButton.addEventListener('click',() => {
    //         applyToClass(name)
    //     }) 

    //     row.appendChild(skillButtonColumn)
    // })

}

const applyToClass = (skill_name) => {
    //add skill to user in dtb
    //alert(`You have joined the ${skill_name} class!`)
    popupText.innerHTML=`You have joined the ${skill_name} class!`
    popupText.classList.toggle("show")
}

const createClass = () => {
    //take to createSkills.html
    // alert(`Create a skills class`)
    popupText.innerHTML=`You have created a skills class!`
    popupText.classList.toggle("show")
}

const skillsTable = document.querySelector('#skill-classes')


const createButton = document.querySelector('#create')
createButton.addEventListener('click', () => {
    createClass()
})

const popup = document.querySelector('.popup')
const popupText = document.querySelector('.popupText')

showSkills()

