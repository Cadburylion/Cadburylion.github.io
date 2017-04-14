'use strict';

// Cookie Shop Object Constructor
function CookieShop(title, minCustomer, maxCustomer, avgCookie){
  this.title = title;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.avgCookie = avgCookie;
  this.totalCookies = 0;
  this.cookiesPerHour = [];
}

// CookieShop.prototype.getCookies = function(){
//   var customerPerHour = this.maxCustomer - this.minCustomer;
//   var customers, cookies;
//   for (var i = 0; i < storeHours.length; i++){
//     customers = Math.random() * customerPerHour + this.minCustomer;
//     cookies = Math.floor(customers * this.avgCookie);
//     this.cookiesPerHour.push(cookies);
//     this.totalCookies += cookies;
//   }
// };

// populates array of random number
CookieShop.prototype.getCookiesPerHour = function(){
  for (var i = 0; i < storeHours.length; i++){
    this.cookiesPerHour.push(this.getCookies(this.maxCustomer, this.minCustomer, this.avgCookie));
  }
};

CookieShop.prototype.getCookies = function(maxCust, minCust, avgCookie){
  var cookies = Math.round(Math.floor(Math.random()*(maxCust-minCust + 1) + minCust) * avgCookie) + 1;
  this.totalCookies += cookies;
  return cookies;
};

CookieShop.prototype.getTable = function(){
  var titleRow = document.createElement('tr'); // creates row
  app.appendChild(titleRow); // adds title row to table element with id of app

  var storeName = document.createElement('th'); // creates th cell
  storeName.textContent = this.title; // sets content of of th element
  titleRow.appendChild(storeName); // adds th element to title row

  for(var i = 0; i < this.cookiesPerHour.length; i++){
    var cookieHour = document.createElement('td'); // create td cell for each hour

    titleRow.appendChild(cookieHour); // adds cookieHour cells to title row
    cookieHour.textContent = this.cookiesPerHour[i]; // sets content of each cookieHour cell
  }

  var totalCell = document.createElement('td'); // creates td cell
  titleRow.appendChild(totalCell);
  totalCell.textContent = this.totalCookies;
};

var getStoreHours = function() { // creates a row of store hours

  var hoursRow = document.createElement('tr'); // creates a row to add to
  var locationCell = document.createElement('th'); // creates an empty cell
  locationCell.textContent = 'Locations';
  hoursRow.appendChild(locationCell); // adds empty cell to the hoursRow
  for (var i = 0; i < storeHours.length; i++){ // creates amount of new cells = to store hours
    var hoursCell = document.createElement('th');
    hoursCell.textContent = storeHours[i]; // populating cells with data
    hoursRow.appendChild(hoursCell); // adds cells into the row
  }

  app.appendChild(hoursRow); // adding the hours row to the page

  var totalCell = document.createElement('th'); // creates empty cell
  hoursRow.appendChild(totalCell); // appends cell to hoursRow row
  totalCell.textContent = 'Totals'; // writes 'Totals' into cell
};

var app = document.getElementById('app');

var storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

getStoreHours(); // generates row of store hours at top of table

var firstAndPike = new CookieShop('1st and Pike', 23, 65, 6.3);
firstAndPike.getCookiesPerHour();
firstAndPike.getTable();

var seaTacAirport = new CookieShop('SeaTac Airport', 3, 24, 1.2);
seaTacAirport.getCookiesPerHour();
seaTacAirport.getTable();

var seattleCenter = new CookieShop('Seattle Center', 11, 38, 3.7);
seattleCenter.getCookiesPerHour();
seattleCenter.getTable();

var capitolHill = new CookieShop('Capitol Hill', 20, 38, 2.3);
capitolHill.getCookiesPerHour();
capitolHill.getTable();

var alki = new CookieShop('Alki', 2, 16, 4.6);
alki.getCookiesPerHour();
alki.getTable();


// event listens to submit
// take user input on submit
// input user input into object Constructor
// append results to table


function handleStoreCreateSubmit(event){
  // stop the browser from reloading
  event.preventDefault();

  var form = event.target; // event target is always the object you added the event listener to

  // grab the values
  var name = form.storeName.value;
  // console.log('store name', name);
  var maximumCustomers = form.storeMaximumCustomers.value;
  // console.log('maximum customers', maximumCustomers);
  var minimumCustomers = form.storeMinimumCustomers.value;
  // console.log('minimum customers', minimumCustomers);
  var averageCookies = form.storeAverageCookies.value;
  // console.log('average cookies', averageCookies);

  var store = new CookieShop(name, minimumCustomers, maximumCustomers, averageCookies);
  store.getCookiesPerHour();
  store.getTable();

  // then clear the values
  form.reset();

  // form.storeName.value = '';
  // form.storeMaximumCustomers.value = '';
  // form.storeMinimumCustomers.value = '';
  // form.storeAverageCookies.value = '';
}

var storeCreateForm = document.getElementById('create-new-store');
storeCreateForm.addEventListener('submit', handleStoreCreateSubmit);
