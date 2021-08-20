function addNewWEField() {
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control");
    newNode.classList.add("weField");
    newNode.classList.add("mt-2");
    newNode.setAttribute("rows", 3);
    newNode.setAttribute("placeholder", "Enter here");

    let weOb = document.getElementById("we");
    let weAddButtonOb = document.getElementById("weAddButton");

    weOb.insertBefore(newNode, weAddButtonOb);
}

function addNewAQField() {
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control");
    newNode.classList.add("weField");
    newNode.classList.add("mt-2");
    newNode.setAttribute("rows", 3);
    newNode.setAttribute("placeholder", "Enter here");

    let aqOb = document.getElementById("aq");
    let aqAddButtonOb = document.getElementById("aqAddButton");

    aqOb.insertBefore(newNode, aqAddButtonOb);
}

// developing cv
function developCV() {
    let nameField = document.getElementById("nameField").value;

    let nameT1 = document.getElementById("nameT1");

    nameT1.innerHTML = nameField;

    // direct
    document.getElementById("nameT2").innerHTML = nameField;

    // contact
    document.getElementById("contactT").innerHTML =
        document.getElementById("contactField").value;
    document.getElementById("facebookT").innerHTML =
        document.getElementById("facebookField").value;
    document.getElementById("instagramT").innerHTML =
        document.getElementById("instagramField").value;
    document.getElementById("linkedinT").innerHTML =
        document.getElementById("linkedinField").value;

    // address
    document.getElementById("addressT").innerHTML =
        document.getElementById("addressField").value;

    // objectives
    document.getElementById("objectivesT").innerHTML =
        document.getElementById("objectivesField").value;

    // work experience
    let wes = document.getElementsByClassName("weField");

    let str = "";

    for (let e of wes) {
        str += `<li>${e.value}</li>`;
    }

    document.getElementById("weT").innerHTML = str;

    // academic qualifications
    let aqs = document.getElementsByClassName("aqField");

    let str1 = "";

    for (let q of aqs) {
        str1 += `<li>${q.value}</li>`;
    }

    document.getElementById("aqT").innerHTML = str1;

    document.getElementById("cv-form").style.display = "none";
    document.getElementById("cv-template").style.display = "block";
}

// print CV
function printCV() {
    window.print();
}