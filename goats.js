'user strict';

var goats = [];

try {
  goats = JSON.parse(localStorage.goats);
} catch(error){
  console.log('problem getting info', error);
}

// displayGoatInformation creates necessary elements, populates them with information, and appends to html document
function displayGoatInformation() {
  var mouseOverImages = document.getElementById('mouseover_images');
  var div;
  var goatDisplay;
  var info;
  var infoField;
  var emailIcon = document.createElement('img');
  emailIcon.src = 'img/mail.png';

  for(var i=0; i <goats.length; i++) {
    div = document.createElement('div');
    div.setAttribute('class', 'goat-wrap');
    goatDisplay = document.createElement('img');
    goatDisplay.src = goats[i].goatImage;
    mouseOverImages.appendChild(div);
    div.appendChild(goatDisplay);

    info = document.createElement('p');
    info.setAttribute('class', 'name');
    info.textContent = goats[i].goatName;
    div.appendChild(info);

    infoField = document.createElement('div');
    infoField.setAttribute('class', 'infoDiv');
    div.appendChild(infoField);

    info = document.createElement('p');
    info.setAttribute('class', 'age');
    info.textContent = 'Age: ' + goats[i].goatAge;
    infoField.appendChild(info);

    info = document.createElement('p');
    info.setAttribute('class', 'location');
    info.textContent = 'Location: ' + goats[i].goatLocation;
    infoField.appendChild(info);

    info = document.createElement('p');
    info.setAttribute('class', 'service-needed');
    info.textContent = 'Need: ' + goats[i].serviceNeeded;
    infoField.appendChild(info);

    info = document.createElement('p');
    info.setAttribute('class', 'contact');
    info.textContent = goats[i].contact;
    infoField.appendChild(info);

  }
}

displayGoatInformation();
