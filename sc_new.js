var bal = 0.0;
var inc = 0.0;
var exp = 0.0;
var hist = [];

function onCross(event) {
  console.log(event.target);
  var index = -1;
  var listElems = document.querySelectorAll("#list li");
  listElems.forEach((elem, ind) => {
    if (elem == event.target) {
      index = ind;
    }
  });
  hist.splice(index, 1);
  bal = 0.0;
  inc = 0.0;
  exp = 0.0;

  if (hist.length != 0) {
    hist.forEach((elem) => {
      if (elem.select == "income") {
        inc += elem.amount;
        bal += elem.amount;
      }
      if (elem.selec == "expense" || elem.selec == "tax") {
        exp += elem.amount;
        bal -= elem.amount;
      }
    });
    var toUpdateList = "";
    hist.forEach((elem, index) => {
      toUpdateList += `<li class="${
        elem.select == "income" ? "green" : "red"
      } _${index}"><span>${elem.description}</span><span>${elem.amount}</span>
      <button class="_${index}" onclick="onCross(event)" >X</button></li>`;
    });
    document.querySelector("#list").innerHTML = toUpdateList;
  } else {
    document.querySelector("#list").innerHTML = "";
  }
  var balContainer = document.querySelector("#balance");
  balContainer.textContent = `₹${bal}`;
  var balContainer = document.querySelector("#money-plus");
  balContainer.textContent = `₹${inc}`;
  var balContainer = document.querySelector("#money-minus");
  balContainer.textContent = `₹${exp}`;

  //update local storage
}

function onSub(event) {
  event.preventDefault();
  if (document.querySelector(".rad:checked") != undefined) {
    var desc = document.querySelector("#text").value;
    var amt = parseInt(document.querySelector("#amount").value);
    var select = document.querySelector(".rad:checked").value;
    console.log(desc, amt, select);
    hist.push({
      description: desc,
      amount: amt,
      select: select,
    });
    if (select == "income") {
      inc += amt;
      bal += amt;
    }
    if (select == "expense" || select == "tax") {
      exp += amt;
      bal -= amt;
    }
    var balContainer = document.querySelector("#balance");
    balContainer.textContent = `₹${bal}`;
    var balContainer = document.querySelector("#money-plus");
    balContainer.textContent = `₹${inc}`;
    var balContainer = document.querySelector("#money-minus");
    balContainer.textContent = `₹${exp}`;

    var toUpdateList = "";
    hist.forEach((elem, index) => {
      toUpdateList += `<li class="${
        elem.select == "income" ? "green" : "red"
      } _${index}"><span>${elem.description}</span><span>${elem.amount}</span>
    <button class="_${index}" onclick="onCross(event)" >X</button></li>`;
    });
    document.querySelector("#list").innerHTML = toUpdateList;

    document.querySelector("#text").value = "";
    document.querySelector("#amount").value = "";
    document.querySelector(".rad:checked").checked = false;
  } else {
    alert("Please select Income or expense.");
  }

  //update local storage
}
