async function getUserData() {
    const response = await fetch('')
    const data = await response.json()
  
    // Processing Skills
    let skillsContainer = document.querySelector('.skills-container')
    data.skills.forEach(skill => {
      let skillDiv = document.createElement('div')
      skillDiv.classList.add('skill-item')
      
      let skillTitle = document.createElement('h3')
      skillTitle.innerText = skill.name
      
      let skillDescription = document.createElement('p')
      skillDescription.innerText = skill.description
      
      skillDiv.appendChild(skillTitle)
      skillDiv.appendChild(skillDescription)
      
      skillsContainer.appendChild(skillDiv)
    });
  
    // Processing Classes
    let classesContainer = document.querySelector('.classes-container')
    data.classes.forEach(classItem => {
      let classDiv = document.createElement('div')
      classDiv.classList.add('class-item')
      
      let classTitle = document.createElement('h3')
      classTitle.innerText = classItem.name
      
      let classDescription = document.createElement('p')
      classDescription.innerText = classItem.description
      
      classDiv.appendChild(classTitle)
      classDiv.appendChild(classDescription)
      
      classesContainer.appendChild(classDiv)
    })
  }
  
  getUserData();
  