const showSkills = async () => {
    //fetch skills from dtb
    // const resp = await fetch('api')
    // if (!resp.ok) {
    //     console.log('something went wrong')
    // }
    // const skills = await resp.json()
    // const { skill_name,skill_info, skill_image_url } = skills
    
    const skill_name = 'skill name'
    const skill_info = 'skill info'
    const skill_image_url = 'https://www.rd.com/wp-content/uploads/2017/01/07_Immune_Surprising_Health_benefits_Gardening_459405181_monkeybusinessimages.jpg'
    
    skillImage.src = skill_image_url
    skillInfo.textContent = `${skill_name} \n ${skill_info}`

    skillsTable.appendChild(row)
    row.appendChild(skillImageColumn)
    skillImageColumn.appendChild(skillImage)
    row.appendChild(skillInfo)
    row.appendChild(skillButtonColumn)
    skillButtonColumn.appendChild(applyButton)

    applyButton.addEventListener('click',() => {
        apply(skill_name)
    }) 

}

const apply = (skill_name) => {
    //add skill to user in dtb
    alert(`You have joined the ${skill_name} class!`)
}

const skillsTable = document.querySelector('#skill-classes')

const row = document.createElement('tr')
const skillImageColumn = document.createElement('td')
const skillButtonColumn = document.createElement('td')
const skillName = document.createElement('td')
const skillInfo = document.createElement('td')
const skillImage = document.createElement('img')
const applyButton = document.createElement('button')
applyButton.textContent='Apply'

showSkills()
