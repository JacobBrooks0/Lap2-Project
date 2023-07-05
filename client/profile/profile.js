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
   
  document.getElementById('user-name').innerText = data.name;
  document.getElementById('user-email').innerText = data.email;

  let container = document.getElementById(containerId);

  data.forEach(item => {
    let itemContainer = document.createElement('div');
    itemContainer.className = 'item-container'; 

    let title = document.createElement('h3');
    title.innerText = item.name;

    let description = document.createElement('p');
    description.innerText = item.info;

    itemContainer.appendChild(title);
    itemContainer.appendChild(description);

    container.appendChild(itemContainer);
  });
}


function handleLogin(userId) {
  setLoggedInUserId(userId);

  displayUserData('skills', 'skills-container');
  displayUserData('classes', 'classes-container');
  displayUserData('events', 'events-container');
}

handleLogin(2);





  