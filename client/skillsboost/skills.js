const showSkills = async () => {
    //fetch skills from dtb
    // const resp = await fetch('api')
    // if (!resp.ok) {
    //     console.log('something went wrong')
    // }
    // const skillClasses = await resp.json()
    // skillClasses.forEach(skillClass => {
    //     const { name, summary, main_image_url, start_date, end_date} = skillClass
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

    
    const skill_name = 'skill name 1'
    const skill_info = 'skill info'
    const skill_image_url = 'https://www.rd.com/wp-content/uploads/2017/01/07_Immune_Surprising_Health_benefits_Gardening_459405181_monkeybusinessimages.jpg'
    const start_date = 'July 2'
    const end_date = 'August 2'
    
    skillImage.src = skill_image_url
    skillInfo.innerHTML = `${skill_name}<br>${skill_info}`
    classDate.textContent = `${start_date} to ${end_date}`
    skillsTable.appendChild(row)
    row.appendChild(skillImageColumn)
    skillImageColumn.appendChild(skillImage)
    row.appendChild(skillInfo)
    row.appendChild(classDate)
    row.appendChild(skillButtonColumn)
    skillButtonColumn.appendChild(applyButton)

    applyButton.addEventListener('click',() => {
        applyToClass(skill_name)
    }) 

}

const applyToClass = (skill_name) => {
    //add skill to user in dtb
    alert(`You have joined the ${skill_name} class!`)
}

const createClass = () => {
    //take to createskills.html
    alert(`Create a skills class`)
}

const skillsTable = document.querySelector('#skill-classes')

const row = document.createElement('tr')
const skillImageColumn = document.createElement('td')
const skillButtonColumn = document.createElement('td')
const skillName = document.createElement('td')
const skillInfo = document.createElement('td')
const skillImage = document.createElement('img')
const classDate = document.createElement('td')
const applyButton = document.createElement('button')
applyButton.textContent='Apply'

const createButton = document.querySelector('#create')
createButton.addEventListener('click', () => {
    createClass()
})

showSkills()

