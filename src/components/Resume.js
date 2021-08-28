import React, { useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import moonImg from "../img/moon.jpg";
import normal from "../img/normal.jpg";
import space from "../img/space.jpg";
import Toan from "../img/Toan.JPG";
import shit from "../img/shit.mp4";
import random from "../img/random.jpg";
const Resume = () => {
    const [resumeHidden, setResumeHidden] = useState(true);
    const [userInput, setUserInput] = useState({
        name: null,
        quote: null,
        address: null,
        facebook: null,
        instagram: null,
        linkedin: null,
        objective: null,
        workexperience: [],
        academic: [],
        email: null,
        phone: null,
        intro: null,
        files: null,
    });

    //ThreeJS Wrapper. Called upon developCV is Click
    function ThreeJSWrapper() {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector("#bg"),
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.setZ(30);
        camera.position.setX(-3);

        renderer.render(scene, camera);

        // Torus

        const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
        const material = new THREE.MeshStandardMaterial({
            color: 0xff6347,
            wireframe: true,
        });
        const torus = new THREE.Mesh(geometry, material);

        scene.add(torus);

        // Lights

        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(5, 5, 5);

        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(pointLight, ambientLight);

        // Helpers

        // const lightHelper = new THREE.PointLightHelper(pointLight)
        // const gridHelper = new THREE.GridHelper(200, 50);
        // scene.add(lightHelper, gridHelper)

        // const controls = new OrbitControls(camera, renderer.domElement);

        function addStar() {
            const geometry = new THREE.SphereGeometry(0.25, 24, 24);
            const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const star = new THREE.Mesh(geometry, material);

            const [x, y, z] = Array(3)
                .fill()
                .map(() => THREE.MathUtils.randFloatSpread(100));

            star.position.set(x, y, z);
            scene.add(star);
        }

        Array(200).fill().forEach(addStar);

        // Background

        const spaceTexture = new THREE.TextureLoader().load(space);
        scene.background = spaceTexture;

        // Avatar

        const toanTexture = new THREE.TextureLoader().load(!userInput.files ? random : userInput.files);

        const toan = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshBasicMaterial({ map: toanTexture })
        );

        scene.add(toan);

        // Moon

        const moonTexture = new THREE.TextureLoader().load(moonImg);
        const normalTexture = new THREE.TextureLoader().load(normal);

        const moon = new THREE.Mesh(
            new THREE.SphereGeometry(3, 32, 32),
            new THREE.MeshStandardMaterial({
                map: moonTexture,
                normalMap: normalTexture,
            })
        );

        scene.add(moon);

        moon.position.z = 30;
        moon.position.setX(-10);

        toan.position.z = -5;
        toan.position.x = 2;

        // Scroll Animation

        function moveCamera() {
            const t = document.body.getBoundingClientRect().top;
            moon.rotation.x += 0.05;
            moon.rotation.y += 0.075;
            moon.rotation.z += 0.05;

            toan.rotation.y += 0.01;
            toan.rotation.z += 0.01;

            camera.position.z = t * -0.01;
            camera.position.x = t * -0.0002;
            camera.rotation.y = t * -0.0002;
        }

        document.body.onscroll = moveCamera;
        moveCamera();

        // Animation Loop

        function animate() {
            requestAnimationFrame(animate);

            torus.rotation.x += 0.01;
            torus.rotation.y += 0.005;
            torus.rotation.z += 0.01;

            moon.rotation.x += 0.005;

            // controls.update();

            renderer.render(scene, camera);
        }

        animate();
    }

    const handleSubmit = () => {
        //fake submit button, onclick will make threejs rendered
        setResumeHidden(!resumeHidden);
        ThreeJSWrapper();
        console.log(userInput);
    };

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

    function validateFile(file) {
        return true;
    }

    //Form handle functions

    const handleNameChange = (newname) => {
        setUserInput({
            ...userInput,
            name: newname,
        });
    };

    const handleQuoteChange = (newname) => {
        setUserInput({
            ...userInput,
            quote: newname,
        });
    };
    const handleAddressChange = (newname) => {
        setUserInput({
            ...userInput,
            address: newname,
        });
    };
    const handleInstagramChange = (newname) => {
        setUserInput({
            ...userInput,
            instagram: newname,
        });
    };
    const handleLinkedInChange = (newname) => {
        setUserInput({
            ...userInput,
            linkedin: newname,
        });
    };
    const handleFacebookChange = (newname) => {
        setUserInput({
            ...userInput,
            facebook: newname,
        });
    };
    const handleObjectivesChange = (input) => {
        setUserInput({
            ...userInput,
            objective: input,
        });
    };

    const handleWorkChange = (input) => {
        const newWork = userInput.workexperience;
        newWork.push(input.toString());
        setUserInput({
            ...userInput,
            workexperience: newWork,
        });
    };

    const handleIntroChange = (input) => {
        setUserInput({
            ...userInput,
            intro: input,
        });
    };

    const handleAcademicChange = (input) => {
        const newArr = userInput.academic;
        newArr.push(input.toString());
        setUserInput({
            ...userInput,
            academic: newArr,
        });
    };

    const handleFileChange = (e) => {
        //return true if file is of type jpg, png, svg, ... false otherwise
        setUserInput({
            ...userInput,
            files: URL.createObjectURL(e.target.files[0]),
        });
    };

    const handleEmail = (e) => {
        const val = e.target.value;
        if (!validateEmail(val)) {
            document.getElementById("emailError").classList.remove("hidden");
        } else {
            document.getElementById("emailError").classList.add("hidden");

            setUserInput({
                ...userInput,
                email: val,
            });
        }
    };

    const handlePhone = (e) => {
        const val = e.target.value;
        if (!validatePhoneNumber(val)) {
            document.getElementById("phoneError").classList.remove("hidden");
        } else {
            document.getElementById("phoneError").classList.add("hidden");

            setUserInput({
                ...userInput,
                phone: val,
            });
        }
    };

    function addNewWEField() {
        let newNode = document.createElement("textarea");
        newNode.classList.add("form-control");
        newNode.classList.add("weField");
        newNode.classList.add("mt-2");
        newNode.setAttribute("rows", 3);
        newNode.setAttribute("placeholder", "Enter here");
        newNode.onchange = (event) => handleWorkChange(event.target.value);
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
        newNode.onchange = (event) => handleAcademicChange(event.target.value);
        let aqOb = document.getElementById("aq");
        let aqAddButtonOb = document.getElementById("aqAddButton");

        aqOb.insertBefore(newNode, aqAddButtonOb);
    }

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

    return ( <
        div className = "bg" >
        <
        div class = "container"
        id = "cv-form"
        style = {
            { display: resumeHidden ? "block" : "none" } } >
        <
        video playsinline autoPlay muted loop id = "bgvid" >
        <
        source src = { Toan }
        type = "video/mp4" / >
        <
        /video>{" "} <
        h1 class = "text-center my-2" > Resume Creator < /h1>{" "} <
        p class = "text-center" > By Toan Tran < /p>{" "} <
        div class = "row" >
        <
        div class = "col-md-6" >
        <
        h3 > Personal Information < /h3>{" "} <
        div class = "form-group" >
        <
        label
        for = "nameField" > Full Name < /label>{" "} <
        input type = "text"
        id = "nameField"
        placeholder = "Enter here"
        class = "form-control"
        onChange = {
            (e) => handleNameChange(e.target.value) }
        />{" "} <
        /div>{" "} <
        div className = "row" >
        <
        div class = "col col-5 form-group mt-2" >
        <
        form id = "myform" >
        <
        div >
        <
        label
        for = "contactField" > Phone Number < /label>{" "} <
        input type = "tel"
        id = "contactField"
        placeholder = "Enter here"
        class = "form-control"
        name = "phone"
        onChange = {
            (e) => handlePhone(e) }
        />{" "} <
        div id = "phoneError"
        class = "error hidden" >
        Please enter a valid phone number { " " } <
        /div>{" "} <
        /div>{" "} <
        /form>{" "} <
        /div>{" "} <
        div class = "col col-6 offset-1 form-group mt-2" >
        <
        form id = "myform2" >
        <
        div >
        <
        label
        for = "addressField" > Email Address < /label>{" "} <
        input type = "email"
        id = "addressField"
        placeholder = "Enter here"
        class = "form-control"
        name = "email"
        onChange = {
            (e) => handleEmail(e) }
        />{" "} <
        div id = "emailError"
        class = "error hidden" >
        Please enter a valid email address { " " } <
        /div>{" "} <
        /div>{" "} <
        /form>{" "} <
        /div>{" "} <
        /div>{" "} <
        div class = "form-group mt-2" >
        <
        label
        for = "avaField" > Profile Picture < /label>{" "} <
        input type = "file"
        id = "fileSelector"
        accept = "image/png, image/jpeg, image/jpg"
        onChange = {
            (e) => handleFileChange(e) }
        />{" "} <
        div id = "fileError"
        class = "error hidden" >
        Only.png, .svg, and.jpg files are accepted. { " " } <
        /div>{" "} <
        /div>{" "} <
        div class = "form-group mt-2" >
        <
        label
        for = "quoteField" > Quote < /label>{" "} <
        input type = "text"
        id = "quoteField"
        placeholder = "Enter here"
        class = "form-control"
        onChange = {
            (e) => handleQuoteChange(e.target.value) }
        />{" "} <
        /div>{" "} <
        div class = "form-group mt-2" >
        <
        label
        for = "addressField" > Your Address < /label>{" "} <
        textarea id = "addressField"
        placeholder = "Enter here"
        class = "form-control"
        rows = "5️"
        onChange = {
            (e) => handleAddressChange(e.target.value) } >
        < /textarea>{" "} <
        /div>{" "} <
        h3 > Important Links < /h3>{" "} <
        div class = "form-group mt-2" >
        <
        label
        for = "facebookField" > Facebook < /label>{" "} <
        input type = "text"
        id = "facebookField"
        placeholder = "Enter here"
        class = "form-control"
        onChange = {
            (e) => handleFacebookChange(e.target.value) }
        />{" "} <
        /div>{" "} <
        div class = "form-group mt-2" >
        <
        label
        for = "instagramField" > Instagram < /label>{" "} <
        input type = "text"
        id = "instagramField"
        placeholder = "Enter here"
        class = "form-control"
        onChange = {
            (e) => handleInstagramChange(e.target.value) }
        />{" "} <
        /div>{" "} <
        div class = "form-group mt-2" >
        <
        label
        for = "linkedinField" > LinkedIn < /label>{" "} <
        input type = "text"
        id = "linkedinField"
        placeholder = "Enter here"
        class = "form-control"
        onChange = {
            (e) => handleLinkedInChange(e.target.value) }
        />{" "} <
        /div>{" "} <
        /div>{" "} <
        div class = "col-md-6" >
        <
        h3 > Professional Information < /h3>{" "} <
        div class = "form-group mt-2" >
        <
        label
        for = "" > Objectives < /label>{" "} <
        textarea id = "objectivesField"
        placeholder = "Enter here"
        class = "form-control weField"
        onChange = {
            (e) => handleObjectivesChange(e.target.value) }
        rows = "5" >
        < /textarea>{" "} <
        /div>{" "} <
        div class = "form-group mt-2"
        id = "we" >
        <
        label
        for = "" > Work Experience < /label>{" "} <
        textarea placeholder = "Enter here"
        class = "form-control weField"
        rows = "3"
        onChange = {
            (e) => handleWorkChange(e.target.value) } >
        < /textarea>{" "} <
        div class = "container text-center mt-2"
        id = "weAddButton" >
        <
        button onClick = { addNewWEField }
        class = "btn btn-primary btn-sm" >
        Add { " " } <
        /button>{" "} <
        /div>{" "} <
        /div>{" "} <
        div class = "form-group mt-2"
        id = "aq" >
        <
        label
        for = "" > Academic Qualifications < /label>{" "} <
        textarea placeholder = "Enter here"
        class = "form-control aqField"
        rows = "3"
        onChange = {
            (e) => handleAcademicChange(e.target.value) } >
        < /textarea>{" "} <
        div class = "container text-center mt-2"
        id = "aqAddButton" >
        <
        button onClick = { addNewAQField }
        class = "btn btn-primary btn-sm" >
        Add { " " } <
        /button>{" "} <
        /div>{" "} <
        /div>{" "} <
        /div>{" "} <
        /div>{" "} <
        div class = "container text-center mt-3" >
        <
        button onClick = { handleSubmit }
        class = "btn btn-primary btn-lg" >
        Develop CV { " " } <
        /button>{" "} <
        /div>{" "} <
        /div>{" "} <
        div style = {
            { display: resumeHidden ? "none" : "block" } } >
        <
        canvas id = "bg" > < /canvas>{" "} <
        main >
        <
        header >
        <
        h1 > { userInput.name } < /h1> {userInput.intro}{" "} <
        p > 🚀Welcome to my website! < /p>{" "} <
        /header>{" "} <
        blockquote >
        <
        p > { userInput.objective } < /p>{" "} <
        /blockquote>{" "} <
        section >
        <
        h2 > 📜Personal Information < /h2>{" "} <
        p > Phone Number: { userInput.phone } < /p>{" "} <
        p > Email: { userInput.email } < /p>{" "} <
        p > Address: { userInput.email } < /p>{" "} <
        /section>{" "} <
        section class = "light" >
        <
        h2 > 👩🏽‍🚀Academic Qualifications < /h2>{" "} {
            userInput.academic.map((aq) => {
                return ( <
                    >
                    <
                    h2 > 🏆Accomplishments < /h2> <p> {aq} </p > { " " } <
                    />
                );
            })
        } { " " } <
        /section>{" "} <
        blockquote >
        <
        p >
        The biggest risk is not taking any risks < br / > -Mark Zuckerberg { " " } <
        /p>{" "} <
        /blockquote>{" "} <
        section class = "left" >
        <
        h2 > 🌮Work History < /h2>{" "} {
            userInput.workexperience.map((we) => {
                return ( <
                    >
                    <
                    h3 > Work < /h3> <p> 🚀{we} </p > { " " } <
                    />
                );
            })
        } { " " } <
        /section>{" "} <
        blockquote >
        <
        p > Thanks
        for watching! < /p>{" "} <
        /blockquote>{" "} <
        /main>{" "} <
        /div>{" "} <
        /div>
    );
};

export default Resume;