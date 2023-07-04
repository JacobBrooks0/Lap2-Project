function setLoggedInUserId(userId) {
  localStorage.setItem('loggedInUserId', userId);
}

function getLoggedInUserId() {
  return localStorage.getItem('loggedInUserId');
}

async function displayUserData(endpoint, containerId) {
  const userId = getLoggedInUserId();
  const response = await fetch(`http://localhost:3000/users/${userId}/${endpoint}`);
  const data = await response.json();

  let container = document.getElementById(containerId);

  data.forEach(item => {
    let div = document.createElement('div');
    
    let title = document.createElement('h3');
    title.innerText = item.name;
    
    let description = document.createElement('p');
    description.innerText = item.info;
    
    div.appendChild(title);
    div.appendChild(description);
    
    container.appendChild(div);
  });
}

function handleLogin(userId) {
  setLoggedInUserId(userId);

  displayUserData('skills', 'skills-container');
  displayUserData('classes', 'classes-container');
  displayUserData('events', 'events-container');
}

handleLogin(2);





  