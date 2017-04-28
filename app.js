'use strict';

var guardians = [];

var goats = [
  new Goat('Dustin', 9, 'Seattle', 'foster', 'dustin@goatmail.com', 'img/goat-in-glasses.jpg'),
  new Goat('Ben', 2, 'Redmond', 'transportation', 'J3234@goatmail.com', 'img/Goat_1.jpg'),
  new Goat('Heraldo', 5, 'Sammamish', 'adoption', 'Guiar_Boy@goatmail.com', 'img/Goat_2.jpg'),
  new Goat('Shyanne', 12, 'Spokane', 'foster', 'Jakes@goatmail.com', 'img/Goat_3.jpg'),
  new Goat('Biatreaux', 3, 'Black Diamond', 'adpotion', 'Yoyoyo@goatmail.com', 'img/Goat_4.jpg'),
  new Goat('Horatio', 12, 'Snohomish', 'donation', 'crackler@goatmail.com', 'img/Goat_5.jpg'),
  new Goat('Anette', 8, 'Walla Walla', 'adoption', 'goatlover@goatmail.com', 'img/Goat_6.jpg'),
  new Goat('Madeline', 7, 'Bellingham', 'foster', 'Meghan@goatmail.com', 'img/Goat_7.jpg'),
  new Goat('Charles', 6, 'Covington', 'adoption', 'xavier@goatmail.com', 'img/Goat_8.jpg'),
];

try {
  goats=JSON.parse(localStorage.goats);
} catch (error) {
  console.log('Summits brrrreeeeken.');
}

// grab goat form from html and assignin it to var goatForm
// add event listener
var goatForm = document.getElementById('goat-form');
goatForm.addEventListener('submit', handleGoatFormSubmit);

//grab guardian form from html and assign its reference to guardianForm
//add submit event listener
var guardianForm = document.getElementById('goat-guardian-form');
guardianForm.addEventListener('submit', handleGuardianFormSubmit);

// constructor for Goat in need
function Goat(goatName, goatAge, goatLocation, serviceNeeded, contact, src) {
  this.goatName = goatName;
  this.goatAge = goatAge;
  this.goatLocation = goatLocation;
  this.serviceNeeded = serviceNeeded;
  this.contact = contact;
  this.goatImage = src;
}

// contructor for Goat Guardian
function Guardian(guardianName, guardianLocation, guardianContact, serviceOffered, src){
  this.guardianName = guardianName;
  this.guardianLocation = guardianLocation;
  this.guardianContact = guardianContact;
  this.serviceOffered = serviceOffered;
  this.guardianImage = src;
}

//postDefaultGuardians() instantiates new Guardians and pushes them to goats array and saves to local storage
function postDefaultGuardians(){
  var defaultGuardians = [
    new Guardian('Izzy', 'Seattle, WA', 'izzy@lovesdemgoats.com', 'I can adopt a goat.', 'Clipboard06.jpg'),
    new Guardian('Evette', 'Seattle, WA', 'evette@hascoolshoes.com', 'I can sponsor a goat.', 'Clipboard02.jpg'),
    new Guardian('Dustin', 'Seattle, WA', 'dustin@mycountertops.com', 'I can donate sweaters.', 'Clipboard03.jpg'),
    new Guardian('Matthew', 'Seattle, WA', 'lions@areawesome.com', 'I can adopt a goat.', 'Clipboard04.jpg'),
    new Guardian('Ben', 'Lynnwood, WA', 'DnD5e@rules.com', 'I can transport to appointments.', 'Clipboard05.jpg'),
    new Guardian('Duncan', 'Seattle, WA', 'Duncan@donuts.lamejoke.com', 'I can sponsor a goat.', 'Clipboard01.jpg'),
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


function handleGoatFormSubmit(event) {
  event.preventDefault();
  var goatForm = event.target;

  // grab input data and assign to variables
  var nameOfGoat = goatForm.nameOfGoat.value;
  var ageOfGoat = goatForm.ageOfGoat.value;
  var locationOfGoat = goatForm.locationOfGoat.value;
  var contactOfGoat = goatForm.contactOfGoat.value;
  var serviceNeeded = goatForm.serviceNeeded.value;
  var goatImage = goatForm.goatImage.value;
  // storing the value of the input in an empty array of the constructor
  var addGoat = new Goat(nameOfGoat, ageOfGoat, locationOfGoat, contactOfGoat, serviceNeeded, goatImage);
  goats.push(addGoat);

  try {
    localStorage.goats = JSON.stringify(goats);
    // console.log('adding goats', goats);
  } catch (error){
    console.log('something went wrong!', error);
  }

  goatForm.reset();
}

// handleGuardianFormSubmit invokes on form submit event
function handleGuardianFormSubmit(event) {
  event.preventDefault();
  var guardianForm = event.target;

  //grab input data and assign to variables
  var nameOfGuardian = guardianForm.nameOfGuardian.value;
  var locationOfGuardian = guardianForm.locationOfGuardian.value;
  var contactOfGuardian = guardianForm.contactOfGuardian.value;
  var serviceOffered = guardianForm.serviceOffered.value;
  var guardianImage = guardianForm.guardianImage.value;

  // instantiate new Guardian using form values with Guardian constructor and push to guardians array
  var addGuardian = new Guardian(nameOfGuardian, locationOfGuardian, contactOfGuardian, serviceOffered, guardianImage);
  guardians.push(addGuardian);


  try {
    localStorage.guardians = JSON.stringify(guardians);
    console.log('adding guardian', guardians);
  } catch (error){
    console.log('something went wrong!', error);
  }
  guardianForm.reset();
}


var goatInNeedButton = document.getElementById('goat-in-need');
var goatGuardianButton = document.getElementById('goat-guardian');

goatInNeedButton.addEventListener('click', showForm);
goatGuardianButton.addEventListener('click', showForm);

function showForm(event) {
  if (goatGuardianButton === event.target) {
    selectform.style.display = 'block';
    if (guardianForm.style.display === 'block') {
      guardianForm.style.display = 'none';

    }
    guardianForm.style.display = 'block';
    goatForm.style.display = 'none';
    //gray out this button through css
    //ungray the other button
    goatGuardianButton.style.border='';
  } else if (goatInNeedButton === event.target) {
    selectform.style.display = 'block';
    goatForm.style.display = 'block';
    guardianForm.style.display = 'none';
    //gray out this button through css
    //ungray the other button
  }
}
