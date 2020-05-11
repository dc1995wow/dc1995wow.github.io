// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB2gVnAS8b1Y0ZpQkQav8tRl7ImGYCM0CE",
  authDomain: "piggybank-a15cf.firebaseapp.com",
  databaseURL: "https://piggybank-a15cf.firebaseio.com",
  projectId: "piggybank-a15cf",
  storageBucket: "piggybank-a15cf.appspot.com",
  messagingSenderId: "293745441709",
  appId: "1:293745441709:web:895488862374819ebdff24",
  measurementId: "G-3XC084PLJK"
};
var clothesTotal = 0.00;
var foodTotal = 0.00;
var transTotal = 0.00;
var makeupTotal = 0.00;
var entertainTotal = 0.00;
var travelTotal = 0.00;
var funMoney = 0.00;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var allSpendingRef = database.ref('allSpending');
// console.log("hey");
//here is the code to listen to the Form Submit
document.getElementById('moneyForm').addEventListener('submit', submitForm);
//a function called submitForm
function submitForm(e) {
  e.preventDefault(); //prevent from submit to HTML page
  var type = getRadioInputVal('moneyType');
  var amount = getInputVal('moneyAmount');
  //console.log(type);
  if (type == "clothes" || type == "makeup" || type == "entertainment") {
    console.log("hey you chose clothes, makeup or entertainment");
    addFunValue();
  }
  if (type == "clothes") {
    addClothValue();
  }
  if (type == "foodDrinks") {
    addFoodValue();
  }
  if (type == "transportation") {
    addTranValue();
  }
  if (type == "makeup") {
    addMakeupValue();
  }
  if (type == "entertainment") {
    addEntertainValue();
  }
  if (type == "traveling") {
    addTravelValue();
  }
  //save messages
  saveMessage(type, amount);
  document.getElementById('moneyForm').reset();
  // window.location.href = "main.html";
}

function getInputVal(id) {
  return document.getElementById(id).value;
}

function getRadioInputVal() {
  var radios = document.getElementsByName('choice');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
      break;
    }
  }
}

function addFunValue() {
  var thisAmount = parseFloat(getInputVal('moneyAmount'));
  funMoney = funMoney + thisAmount;
  //funMoney.toFixed(2);
  humanize(funMoney);
  console.log("this fun Amount=" + thisAmount);
  console.log("funMoney=" + funMoney);
  //write into database
  var newMessageRef = firebase.database().ref('funMoney/').push();
  newMessageRef.set({
    funMoney: funMoney
  });
}

function addClothValue() {
  console.log("add clothes value");
  var thisAmount = parseFloat(getInputVal('moneyAmount'));
  clothesTotal = clothesTotal + thisAmount;
  humanize(clothesTotal);
  // clothesTotal.toFixed(2);
  console.log("this cloth Amount=" + thisAmount);
  console.log("clothesTotal=" + clothesTotal);
  //write into database
  var newMessageRef = firebase.database().ref('clothesMoney/').push();
  newMessageRef.set({
    clothesTotal: clothesTotal
  });

}

function addFoodValue() {
  console.log("add food value");
  var thisAmount = parseFloat(getInputVal('moneyAmount'));
  foodTotal = foodTotal + thisAmount;
  humanize(foodTotal);
  // foodTotal.toFixed(2);
  console.log("thisAmount=" + thisAmount);
  console.log("foodTotal=" + foodTotal);
  //write into database
  var newMessageRef = firebase.database().ref('foodMoney/').push();
  newMessageRef.set({
    foodTotal: foodTotal
  });
}

function addTranValue() {
  console.log("add trans value");
  var thisAmount = parseFloat(getInputVal('moneyAmount'));
  transTotal = transTotal + thisAmount;
  humanize(transTotal);
  // transTotal.toFixed(2);
  console.log("thisAmount=" + thisAmount);
  console.log("this trans Total=" + transTotal);
  //write into database
  var newMessageRef = firebase.database().ref('transMoney/').push();
  newMessageRef.set({
    transMoney: transTotal
  });
}

function addMakeupValue() {
  console.log("add makeup value");
  var thisAmount = parseFloat(getInputVal('moneyAmount'));
  makeupTotal = makeupTotal + thisAmount;
  humanize(makeupTotal);
  // clothesTotal.toFixed(2);
  console.log("this makeup Amount=" + thisAmount);
  console.log("makeupTotal=" + makeupTotal);
  //write into database
  var newMessageRef = firebase.database().ref('makeupMoney/').push();
  newMessageRef.set({
    makeupTotal: makeupTotal
  });
}

function addEntertainValue() {
  console.log("add entertain value");
  var thisAmount = parseFloat(getInputVal('moneyAmount'));
  entertainTotal = entertainTotal + thisAmount;
  humanize(entertainTotal);
  // clothesTotal.toFixed(2);
  console.log("this entertain Amount=" + thisAmount);
  console.log("entertainTotal=" + makeupTotal);
  //write into database
  var newMessageRef = firebase.database().ref('entertainMoney/').push();
  newMessageRef.set({
    entertainTotal: entertainTotal
  });
}

function addTravelValue() {
  console.log("add travel value");
  var thisAmount = parseFloat(getInputVal('moneyAmount'));
  travelTotal = travelTotal + thisAmount;
  humanize(entertainTotal);
  // clothesTotal.toFixed(2);
  console.log("this travel Amount=" + thisAmount);
  console.log("travelTotal=" + makeupTotal);
  //write into database
  var newMessageRef = firebase.database().ref('travelMoney/').push();
  newMessageRef.set({
    travelTotal: travelTotal
  });
}


//save the messages to the database
function saveMessage(type, amount) {
  var newMessageRef = firebase.database().ref('allSpending/').push();
  newMessageRef.set({
    type: type,
    amout: amount
  });
}

function humanize(x) {
  return x.toFixed(2).replace(/\.?0*$/, '');
}
