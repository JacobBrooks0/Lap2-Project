const showSkills = async () => {
    //fetch classes from dtb
    const resp = await fetch('http://localhost:3000/classes')
    if (!resp.ok ) {
        console.log(Error.detail)
    }
    const allSkillClasses = await resp.json()

    const options = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
        }
    }

    const resp2 = await fetch('http://localhost:3000/classes/enrolled',options)
    const enrolledClasses = (resp2.ok ? await resp2.json():false)

    allSkillClasses.forEach(async skillClass => {

        const {class_id, name, info, main_image_url, start_date, end_date } = skillClass

        const row = document.createElement('tr')
        const skillImageColumn = document.createElement('td')
        const skillButtonColumn = document.createElement('td')
        const skillInfo = document.createElement('td')
        const skillImage = document.createElement('img')
        const classDate = document.createElement('td')
        const applyButton = document.createElement('button')

        const resp3 = await fetch(`http://localhost:3000/classes/${class_id}/is-at-capacity`)
        const data = await resp3.json()

        const fullCapacity = () => {
            if(data.classIsFull==true){
                return true
            } else {
                return false
            }
        }

        const checkIfEnrolled = () => {
            if (enrolledClasses) {
                const enrolled = enrolledClasses.find(enrolledClass => enrolledClass.class_id==skillClass.class_id)
                return enrolled
            }
        }

        if (fullCapacity() && !checkIfEnrolled()){
            row.style.backgroundColor = 'lightgrey'
            applyButton.textContent = 'Full'
            applyButton.style.backgroundColor = 'lightgrey'
            applyButton.style.borderColor = 'lightgrey'
            applyButton.disabled = true
        }

        if (checkIfEnrolled()) {
            row.style.backgroundColor = 'lightgrey'
            applyButton.textContent = 'Leave'
            applyButton.addEventListener('click',() => {
            leaveClass(skillClass)
            }) 
        } else {
            applyButton.textContent='Enrol'
            applyButton.addEventListener('click',() => {
                applyToClass(skillClass)
            })
        }

        skillImage.src = main_image_url ? main_image_url : null
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
        row.appendChild(skillButtonColumn)

    })

}

const applyToClass = async (skillClass) => {
    //add skill class to user in dtb
    try{
        const { class_id, name } = skillClass

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

        if (resp.status==201){
            const popupText = document.createElement('p')
            popup.appendChild(popupText)
            popupText.classList.add('popupText')
            popupText.innerHTML=`You have joined the ${name} class!`
            popupText.classList.toggle("show")

            setTimeout(() => window.location.reload(),5000)
        } else {
            alert('Something went wrong :(')
        }
    } catch (err) {
        alert(err)
    }
}

const leaveClass = async(skillClass) => {
    try {
        const options = {
            method: 'DELETE',
            headers: {
                authorization: localStorage.getItem("token"),
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }
        const resp = await fetch(`http://localhost:3000/classes/${skillClass.class_id}/delist`,options)
        if (!resp.ok){
            console.log(Error.detail)
        }
        if (resp.status==204){
            const popupText = document.createElement('p')
            popup.appendChild(popupText)
            popupText.classList.add('popupText')
            popupText.innerHTML=`You have left the ${skillClass.name} class.`
            popupText.classList.toggle("show")

            setTimeout(() => window.location.reload(),5000)
        }
    } catch (err) {
        console.log(err)
    }
}

const createClass = () => {
    window.open('./createClass.html','_self')
}
const token = localStorage.getItem('token')

const skillsTable = document.querySelector('#skill-classes')

const createButton = document.querySelector('#create')
createButton.addEventListener('click', () => {
    createClass()
})

const popup = document.querySelector('.popup')

showSkills()

