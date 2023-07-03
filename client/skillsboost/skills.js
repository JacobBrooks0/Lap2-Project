const showSkills = async () => {
    //fetch skills from dtb
    // const resp = await fetch('api')
    // if (!resp.ok) {
    //     console.log('something went wrong')
    // }
    // const skills = await resp.json()
    // const { skill_info, skill_image_url } = skills
    const skill_info = 'skill name'
    const skill_image_url = 'https://www.rd.com/wp-content/uploads/2017/01/07_Immune_Surprising_Health_benefits_Gardening_459405181_monkeybusinessimages.jpg'
    
    skillImage.src = skill_image_url
    skillInfo.textContent = skill_info
    skillsTable.appendChild(skillRow)
    skillRow.appendChild(skillColumn)
    skillColumn.appendChild(skillImage)
    skillRow.appendChild(skillInfo)
    skillRow.appendChild(skillColumn)
    skillColumn.appendChild(applyButton)

    applyButton.addEventListener('click',() => {
        apply(skills)
    })
}

const apply = (skills) => {

}

const skillsTable = document.querySelector('#skill-classes')

const skillRow = document.createElement('tr')
const skillColumn = document.createElement('td')
const skillInfo = document.createElement('td')
const skillImage = document.createElement('img')
const applyButton = document.createElement('button')
applyButton.textContent='Apply'

showSkills()
