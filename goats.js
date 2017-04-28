'user strict';

var goats = [new Goat('Dustin', 9, 'Seattle', 'foster', 'dustin@goatmail.com', 'img/goat-in-glasses.jpg'),
  new Goat('Ben', 2, 'Redmond', 'transportation', 'J3234@goatmail.com', 'img/Goat_1.jpg'),
  new Goat('Heraldo', 5, 'Sammamish', 'adoption', 'Guiar_Boy@goatmail.com', 'img/Goat_2.jpg'),
  new Goat('Shyanne', 12, 'Spokane', 'foster', 'Jakes@goatmail.com', 'img/Goat_3.jpg'),
  new Goat('Biatreaux', 3, 'Black Diamond', 'adpotion', 'Yoyoyo@goatmail.com', 'img/Goat_4.jpg'),
  new Goat('Horatio', 12, 'Snohomish', 'donation', 'crackler@goatmail.com', 'img/Goat_5.jpg'),
  new Goat('Anette', 8, 'Walla Walla', 'adoption', 'goatlover@goatmail.com', 'img/Goat_6.jpg'),
  new Goat('Madeline', 7, 'Bellingham', 'foster', 'Meghan@goatmail.com', 'img/Goat_7.jpg'),
  new Goat('Charles', 6, 'Covington', 'adoption', 'xavier@goatmail.com', 'img/Goat_8.jpg'),];

try {
  goats = JSON.parse(localStorage.goats);
} catch(error){
  console.log('problem getting info', error);
}

function Goat(goatName, goatAge, goatLocation, serviceNeeded, contact, src) {
  this.goatName = goatName;
  this.goatAge = goatAge;
  this.goatLocation = goatLocation;
  this.serviceNeeded = serviceNeeded;
  this.contact = contact;
  this.goatImage = src;
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
    if (goats[i].goatImage == '') {
      goatDisplay.src = 'adorableGoat.jpg';
      mouseOverImages.appendChild(div);
      div.appendChild(goatDisplay);

    } else {
      goatDisplay.src = goats[i].goatImage;
      mouseOverImages.appendChild(div);
      div.appendChild(goatDisplay);
    }

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
