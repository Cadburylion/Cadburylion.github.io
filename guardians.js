'user strict';

var guardians = [];

try {
  guardians = JSON.parse(localStorage.guardians);
} catch(error){
  console.log('problem getting info', error);
}


function Guardian(guardianName, guardianLocation, guardianContact, serviceOffered, src){
  this.guardianName = guardianName;
  this.guardianLocation = guardianLocation;
  this.guardianContact = guardianContact;
  this.serviceOffered = serviceOffered;
  this.guardianImage = src;
}


function postDefaultGuardians(){
  var defaultGuardians = [
    new Guardian('Izzy', 'Seattle, WA', 'izzy@lovesdemgoats.com', 'I can adopt a goat.', 'img/Izzy.jpg'),
    new Guardian('Evette', 'Seattle, WA', 'evette@hascoolshoes.com', 'I can sponsor a goat.', 'img/Evette.png'),
    new Guardian('Dustin', 'Seattle, WA', 'dustin@mycountertops.com', 'I can donate sweaters.', 'img/Dustin.jpg'),
    new Guardian('Matthew', 'Seattle, WA', 'lions@areawesome.com', 'I can adopt a goat.', 'img/Matthew.jpg'),
    new Guardian('Ben', 'Lynnwood, WA', 'DnD5e@rules.com', 'I can transport to appointments.', 'Clipboard02.jpg'),
    new Guardian('Brian', 'Seattle, WA', 'Brian@sillypants.com', 'I can sponsor a goat.', 'Clipboard08.jpg'),
  ];

  for (var i = 0; i < defaultGuardians.length; i++){
    guardians.push(defaultGuardians[i]);
  }

  try {
    // localStorage.guardians = JSON.stringify(guardians);
    guardians = JSON.parse(localStorage.guardians);
  } catch (error){
    console.log('something went wrong!', error);
  }
}

postDefaultGuardians();






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
      guardianDisplay.src = 'img/goat-shadow.png';
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
