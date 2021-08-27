function validatePhoneNumber(inputPhone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return re.test(inputPhone);
}

function validateEmail(inputText) {
    var re2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return re2.test(inputText);
}

function validateForm(event) {
    var phone = document.getElementById("contactField").value;
    if (!validatePhoneNumber(phone)) {
        document.getElementById("phoneError").classList.remove("hidden");
    } else {
        document.getElementById("phoneError").classList.add("hidden");
        alert("validation success");
    }
    event.preventDefault();
}

function validateForm2(event) {
    var email = document.getElementById("addressField").value;
    if (!validateEmail(email)) {
        document.getElementById("emailError").classList.remove("hidden");
    } else {
        document.getElementById("emailError").classList.add("hidden");
        alert("validation success");
    }
    event.preventDefault();
}

const fileSelector = document.getElementById("fileSelector");
fileSelector.addEventListener("change", (event) => {
    const fileList = event.target.files;
    console.log(fileList);
});

var patt = /[a-z0-9._%+-]+@[a-z0-9.]+\.[a-z]{2,3}$/;

$("body").on("keyup change paste cut", "#myEmail", function() {
    var res =
        patt.test($(this).val()) === true ?
        "Correct Email" :
        "Please enter a valid facebook address: Example@facebook.com ";
    $(".result").text(res);
});

document.getElementById("myform").addEventListener("submit", validateForm);
document.getElementById("myform2").addEventListener("submit", validateForm2);

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
    newNode.classList.add("aqField");
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
    let wes = Array.from(document.getElementsByClassName("weField"));
    let weT = document.getElementById("weT");
    wes.map((we) => {
        let li = document.createElement("li");
        li.innerHTML = we.value;
        weT.appendChild(li);
    });

    // academic qualification

    let aqs = Array.from(document.getElementsByClassName("aqField"));
    let aqT = document.getElementById("aqT");
    aqs.map((aq) => {
        let li = document.createElement("li");
        li.innerHTML = aq.value;
        aqT.appendChild(li);
    });

    document.getElementById("cv-form").style.display = "none";
    document.getElementById("cv-template").style.display = "block";
}

// print CV
function printCV() {
    window.print();
}