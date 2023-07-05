const showSkills = async () => {
    //fetch classes from dtb
    const resp = await fetch('http://localhost:3000/classes')
    if (!resp.ok) {
        console.log(Error.detail)
    }
    const skillClasses = await resp.json()
    skillClasses.forEach(skillClass => {
        const { class_id, name, info, main_image_url, start_date, end_date } = skillClass

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
        classDate.textContent = `${(new Date(start_date* 1000)).toLocaleString('en-GB', {
            day: "numeric",
            month: "long",
            year: "numeric",
          })} to ${(new Date(end_date* 1000)).toLocaleString('en-GB', {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}`

        skillsTable.appendChild(row)
        skillImageColumn.appendChild(skillImage)
        row.appendChild(skillImageColumn)
        row.appendChild(skillInfo)
        row.appendChild(classDate)
        skillButtonColumn.appendChild(applyButton)
    
        applyButton.addEventListener('click',() => {
            applyToClass(skillClass)
        }) 

        row.appendChild(skillButtonColumn)
    })

}

const applyToClass = async (skillClass) => {
    //add skill class to user in dtb
    try{
        //check capacity by comparing num of students in class_student
        //const resp1 = await fetch(`http://localhost:3000/${class_id}classes`) -> isAtCapacity()

        console.log(token)
        console.log(skillClass)
        const { class_id, name, capacity } = skillClass

        const options = {
            method: 'POST',
            headers: {
                authorization: localStorage.getItem("token"),
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }

        const resp = await fetch(`http://localhost:3000/classes/${class_id}/enroll`,options)
        const data = await resp.json()
        console.log(data)

        if (resp.status==201){
            popup.firstChild.remove()
            const popupText = document.createElement('p')
            popup.appendChild(popupText)
            popupText.classList.add('popupText')
        
            popupText.innerHTML=`You have joined the ${name} class!`
            popupText.classList.toggle("show")
        } else {
            alert('Something went wrong :(')
        }
    } catch (err) {
        console.log(err)
        alert(err)
    }
}

const createClass = () => {
    window.open('./createClass.html','_self')
}

// localStorage.setItem('user_id',1)
// localStorage.setItem('token','b13dc503-22f5-4ed9-9c87-b4f3a16610ac')

// const user_id = localStorage.getItem('user_id')
const token = localStorage.getItem('token')

const skillsTable = document.querySelector('#skill-classes')


const createButton = document.querySelector('#create')
createButton.addEventListener('click', () => {
    createClass()
})

const popup = document.querySelector('.popup')

showSkills()

