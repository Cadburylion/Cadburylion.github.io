'user strict';

var guardians = [];

try {
  guardians = JSON.parse(localStorage.guardians);
} catch(error){
  console.log('problem getting info', error);
}


function guardianField() {
  var guardiansList = document.getElementById('guardians-list');
  var guardianWrap;
  var infoWrap;
  var guardianDisplay;
  var infoField;
  for(var i=0; i <guardians.length; i++) {
    guardianWrap = document.createElement('div');
    guardianWrap.setAttribute('class', 'guardian-wrap');

    infoWrap = document.createElement('div');
    infoWrap.setAttribute('class', 'info-wrap');

    guardianDisplay = document.createElement('img');
    if (guardians[i].guardianImage == ''){
      guardianDisplay.src = 'img/goat-in-glasses.jpg';
      guardiansList.appendChild(guardianWrap);
      guardianWrap.appendChild(guardianDisplay);
    } else {
      guardianDisplay.src = guardians[i].guardianImage;
      guardiansList.appendChild(guardianWrap);
      guardianWrap.appendChild(guardianDisplay);
    }



    infoField = document.createElement('p');
    infoField.setAttribute('class', 'name');
    infoField.textContent = guardians[i].guardianName;
    infoWrap.appendChild(infoField);

    infoField = document.createElement('p');
    infoField.setAttribute('class', 'guardian-location');
    infoField.textContent = guardians[i].guardianLocation;
    infoWrap.appendChild(infoField);

    infoField = document.createElement('p');
    infoField.setAttribute('class', 'guardian-contact');
    infoField.textContent = guardians[i].guardianContact;
    infoWrap.appendChild(infoField);

    infoField = document.createElement('p');
    infoField.setAttribute('class', 'guardian-service');
    infoField.textContent = guardians[i].serviceOffered;
    infoWrap.appendChild(infoField);

    guardianWrap.appendChild(infoWrap);
  }
}

guardianField();
