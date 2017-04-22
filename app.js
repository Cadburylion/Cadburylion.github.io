'use strict';

var totalClicks = 0;
// image object constructor
function SurveyImage(name, filename) {
  this.name = name;
  this.filename = './img/' + filename;
  this.shownAmount = 0;
  this.clickAmount = 0;
  this.chosenPercent = 0;
}

// return random images array index
function selectRandomImagesIndex(array) {
  return Math.floor(Math.random() * array.length);
}
// calculates percentage of times an item was picked when shown
function getPercentage(click, shown){
  return click / shown * 100;
}

var imagesOnSecondPreviousScreen = [];
var imagesOnPreviousScreen = [];
var imagesOnScreen = [];

var images = [
  new SurveyImage('bag', 'bag.jpg'),
  new SurveyImage('banana', 'banana.jpg'),
  new SurveyImage('bathroom-media-stand', 'bathroom.jpg'),
  new SurveyImage('boots', 'boots.jpg'),
  new SurveyImage('breakfast', 'breakfast.jpg'),
  new SurveyImage('bubblegum', 'bubblegum.jpg'),
  new SurveyImage('chair', 'chair.jpg'),
  new SurveyImage('cthulhu', 'cthulhu.jpg'),
  new SurveyImage('dog-duck', 'dog-duck.jpg'),
  new SurveyImage('dragon', 'dragon.jpg'),
  new SurveyImage('pen', 'pen.jpg'),
  new SurveyImage('pet-sweep', 'pet-sweep.jpg'),
  new SurveyImage('scissors', 'scissors.jpg'),
  new SurveyImage('shark', 'shark.jpg'),
  new SurveyImage('sweep', 'sweep.png'),
  new SurveyImage('tauntaun', 'tauntaun.jpg'),
  new SurveyImage('unicorn', 'unicorn.jpg'),
  new SurveyImage('usb-tentacle', 'usb.gif'),
  new SurveyImage('water-can', 'water-can.jpg'),
  new SurveyImage('wine-glass', 'wine-glass.jpg'),
];

try {
  images = JSON.parse(localStorage.images);
} catch(error){
  console.log('something went wrong getting local storage', error);
}

function selectThreeRandomImages(){
  // objects in imagesOnSecondPreviousScreen added to images array
  // console.log('select images', imagesOnSecondPreviousScreen);
  images = images.concat(imagesOnSecondPreviousScreen);
  // imagesOnSecondPreviousScreen assigned value of objects in imagesOnPreviousScreen
  imagesOnSecondPreviousScreen = imagesOnPreviousScreen;
  // imagesOnPreviousScreen assigned value of objects in imagesOnScreen
  imagesOnPreviousScreen = imagesOnScreen;
  // clears out imagesOnScreen
  imagesOnScreen = [];
  // create a var nextPhoto to keep track of the next Photo we take out of images
  // splice out a photo object (which removes it from images)
  var nextImage = images.splice(selectRandomImagesIndex(images), 1);
  // concat the array returned by splice onto imagesOnScreen
  imagesOnScreen = imagesOnScreen.concat(nextImage);
  // repeat two more times to get three images
  nextImage = images.splice(selectRandomImagesIndex(images), 1);
  imagesOnScreen = imagesOnScreen.concat(nextImage);
  nextImage = images.splice(selectRandomImagesIndex(images), 1);
  imagesOnScreen = imagesOnScreen.concat(nextImage);


  // imagesOnPreviousScreen.concat(imagesOnScreen);
  return imagesOnScreen;
}

// assign variables to DOM id's
var firstImage = document.getElementById('image1');
var secondImage = document.getElementById('image2');
var thirdImage = document.getElementById('image3');

// add event listeners to DOM id's that invoke handleEventClick when user clicks any image

firstImage.addEventListener('click', handleEventClick);
secondImage.addEventListener('click', handleEventClick);
thirdImage.addEventListener('click', handleEventClick);

// Displays three randomly selected images on the index page

function handleEventClick(event){
  console.log('images', images);
  totalClicks++;
  //if the event fired on the firstImage element, increment clickAmount on imagesOnScreen[0]
  if (firstImage === event.target){
    imagesOnScreen[0].clickAmount++;
    //if the event fired on the secondImage element, increment clickAmount on imagesOnScreen[1]
  } else if (secondImage === event.target){
    imagesOnScreen[1].clickAmount++;
    //if the event fired on the thirdImage element, increment clickAmount on imagesOnScreen[2]
  } else {
    imagesOnScreen[2].clickAmount++;
  }

  if (totalClicks === 25){
    // set the content of the surveyImageContainer element to nothing, erasing it
    var surveyImageContainer = document.getElementById('surveyImageContainer');
    surveyImageContainer.textContent = '';
    images = images.concat(imagesOnSecondPreviousScreen, imagesOnPreviousScreen, imagesOnScreen);

    var heading = document.getElementById('heading');
    heading.textContent = 'Your results!';

    displayMetrics();

    try {
      localStorage.images = JSON.stringify(images);
    } catch(error){
      console.log('something went wrong', error);
    }
  }

  //invoke selectThreeRandomImages to get 3 random objects into imagesOnScreen array
  selectThreeRandomImages();
  //populate img elements on HTML with 3 random images
  firstImage.src = imagesOnScreen[0].filename;
  imagesOnScreen[0].shownAmount++;
  secondImage.src = imagesOnScreen[1].filename;
  imagesOnScreen[1].shownAmount++;
  thirdImage.src = imagesOnScreen[2].filename;
  imagesOnScreen[2].shownAmount++;
}

//populate page with three random images on page load
selectThreeRandomImages();
firstImage.src = imagesOnScreen[0].filename;
imagesOnScreen[0].shownAmount++;
secondImage.src = imagesOnScreen[1].filename;
imagesOnScreen[1].shownAmount++;
thirdImage.src = imagesOnScreen[2].filename;
imagesOnScreen[2].shownAmount++;

// populate Chartjs with data
function displayMetrics(){

  //invokes percentage calculator with object parameter arguments and updates chosenPercent parameter
  for (var i = 0; i < images.length; i++){
    images[i].chosenPercent = getPercentage(images[i].clickAmount, images[i].shownAmount);
  }

  var data = {
    labels: [],
    datasets: [
      {
        label: 'click count',
        data: [],
        backgroundColor: [],
      },
      {
        label: 'display count',
        data: [],
        backgroundColor: [],
      },
    ],

  };
  // generates incremented hsl colors dynamically applied to chart data bars
  var dataColorStart = 'hsl(';
  var dataColorEnd = ',100%,40%)';
  var dataColorEndOpacity = ',100%, 75%)';

  var dataColor = -18;
  for (var c = 0; c < images.length; c++) {
    dataColor += 18;
    data.datasets[0].backgroundColor.push(dataColorStart + dataColor + dataColorEnd);
    data.datasets[1].backgroundColor.push(dataColorStart + dataColor + dataColorEndOpacity);

  }
  // dynamically populates chart data arrays
  var currentImage;
  for (var j = 0; j < images.length; j++){
    currentImage = images[j];
    data.labels.push(currentImage.name);
    data.datasets[0].data.push(currentImage.clickAmount);
    data.datasets[1].data.push(currentImage.shownAmount);
  }

  var ctx = document.getElementById('survey-metrics').getContext('2d');

  new Chart(ctx, {
    type: 'horizontalBar',
    data: data,
    options: {
      legend: {
        labels: {
          boxWidth: 0
        }
      },
    }
  });
}

// adds a hamburger menu that has two buttons in it
var hamburgerMenu = document.getElementById('hamburgerMenu');
var hamburgerIcon = document.getElementById('hamburgerIcon');


hamburgerIcon.addEventListener('click', function(){
  if(hamburgerMenu.className == 'hamburger-menu hidden') {
    hamburgerMenu.className = 'hamburger-menu';
  } else {
    hamburgerMenu.className = 'hamburger-menu hidden';
  }
}
);

// sets functionality of clear data button to clear local storage
var clearLocalStorage = document.getElementById('clear-data');
clearLocalStorage.addEventListener('click', function(){
  localStorage.clear();
  alert('Survey data has been cleared!');
});
