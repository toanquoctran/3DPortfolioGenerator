import React, { useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import moon from '../img/moon.jpg';
import normal from '../img/normal.jpg';
import space from '../img/space.jpg';
import Toan from '../img/Toan.JPG'
const Resume = () => {
  const [resumeHidden, setResumeHidden] = useState(true);
  const [userInput, setUserInput] = useState({  
    name: 'N/A',
    quote: 'I gonna put some dirt in your eyes',
    address: '',
    facebook: 'https://www.pornhub.com',
    instagram: null,
    linkedin: null,
    objective: null,
    workexperience: [

    ],
    academic: [

    ]
  })



  

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

    const spaceTexture = new THREE.TextureLoader().load("space.jpg");
    scene.background = spaceTexture;

    // Avatar

    const toanTexture = new THREE.TextureLoader().load("Toan.JPG");

    const toan = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 3),
      new THREE.MeshBasicMaterial({ map: toanTexture })
    );

    scene.add(toan);

    // Moon

    const moonTexture = new THREE.TextureLoader().load('./moon.jpg');
    const normalTexture = new THREE.TextureLoader().load("normal.jpg");

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

  const handleSubmit = () => {//fake submit button, onclick will make threejs rendered
    setResumeHidden(!resumeHidden);
    ThreeJSWrapper();
    console.log(userInput)
    
 
 
  }





  //Form handle functions


  const handleNameChange = (newname) => {
    setUserInput({
      ...userInput,
      name: newname
    })
  }

  const handleQuoteChange = (newname) => {
    setUserInput({
      ...userInput,
      quote: newname
    })
  }
  const handleAddressChange = (newname) => {
    setUserInput({
      ...userInput,
    address: newname
    })
  }
  const handleInstagramChange = (newname) => {
    setUserInput({
      ...userInput,
      instagram: newname
    })
  }
  const handleLinkedInChange = (newname) => {
    setUserInput({
      ...userInput,
      linkedin: newname
    })
  }
  const handleFacebookChange = (newname) => {
    setUserInput({
      ...userInput,
      facebook: newname
    })
  }
  const handleObjectivesChange = (input) =>{
    setUserInput({
      ...userInput,
      objective: input
    })
  }

  const handleWorkChange = (input) =>{
    const newWork = userInput.workexperience;
    newWork.push(input);
    setUserInput({
      ...userInput,
      workexperience: newWork
    })
  }

  const handleAcademicChange = (input) =>{
    const newArr = userInput.academic;
    newArr.push(input);
    setUserInput({
      ...userInput,
      academic: newArr
    })
  }
  


  function addNewWEField() {
    let newNode = document.createElement("textarea");
    newNode.classList.add("form-control");
    newNode.classList.add("weField");
    newNode.classList.add("mt-2");
    newNode.setAttribute("rows", 3);
    newNode.setAttribute("placeholder", "Enter here");
    newNode.onchange = event => handleWorkChange(event.target.value);
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
    newNode.onchange=event => handleAcademicChange(event.target.value)
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
    document.getElementById("quoteT").innerHTML =
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

   setResumeHidden(false);
   handleSubmit();
   console.log('developCv called')
  }
  // print CV
  function printCV() {
    window.print();
  }











  return (
    <div className="bg">

          <div class="container" id="cv-form" style={{display: resumeHidden?'block':'none'}}>
            <h1 class="text-center my-2">Resume Creator</h1>
            <p class="text-center">By Toan Tran</p>

            <div class="row">
                <div class="col-md-6">
                 
                    <h3>Personal Information</h3>

                    <div class="form-group">
                        <label for="nameField">Your Name</label>
                        <input type="text" id="nameField" placeholder="Enter here" class="form-control" onChange={e=> handleNameChange(e.target.value)}/>
                    </div>

                    <div class="form-group mt-2">
                        <label for="quoteField">Quote</label>
                        <input type="text" id="quoteField" placeholder="Enter here" class="form-control" onChange={e=>handleQuoteChange(e.target.value)}/>
                    </div>

                    <div class="form-group mt-2">
                        <label for="addressField">Your Address</label>
                        <textarea id="addressField" placeholder="Enter here" class="form-control" rows="5️" onChange={e=>handleAddressChange(e.target.value)}></textarea>
                    </div>

                    <p class="text-secondary my-3">Important Links</p>

                    <div class="form-group mt-2">
                        <label for="facebookField">Facebook Link</label>
                        <input type="text" id="facebookField" placeholder="Enter here" class="form-control" onChange={e=>handleFacebookChange(e.target.value)}/>
                    </div>

                    <div class="form-group mt-2">
                        <label for="instagramField">Instagram</label>
                        <input type="text" id="instagramField" placeholder="Enter here" class="form-control" onChange={e=>handleInstagramChange(e.target.value)}/>
                    </div>

                    <div class="form-group mt-2">
                        <label for="linkedinField">LinkedIn</label>
                        <input type="text" id="linkedinField" placeholder="Enter here" class="form-control" onChange={e=>handleLinkedInChange(e.target.value)}/>
                    </div>
                </div>
                <div class="col-md-6">

                    <h3>Professional Information</h3>
                    <div class="form-group mt-2">
                        <label for="">Objectives</label>
                        <textarea id="objectivesField" placeholder="Enter here" class="form-control weField" onChange={e=>handleObjectivesChange(e.target.value)}
                            rows="5"></textarea>
                    </div>

                    <div class="form-group mt-2" id="we">
                        <label for="">Work Experience</label>
                        <textarea placeholder="Enter here" class="form-control weField" rows="3" onChange={e=>handleWorkChange(e.target.value)}></textarea>


                        <div class="container text-center mt-2" id="weAddButton">
                            <button onClick={addNewWEField} class="btn btn-primary btn-sm" >
                                Add 
                            </button>
                        </div>
                    </div>

                    <div class="form-group mt-2" id="aq">
                        <label for="">Academic Qualifications</label>
                        <textarea placeholder="Enter here" class="form-control aqField" rows="3" onChange={e=>handleAcademicChange(e.target.value)}></textarea>

                        <div class="container text-center mt-2" id="aqAddButton">
                            <button onClick={addNewAQField} class="btn btn-primary btn-sm">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container text-center mt-3">
                <button onClick={handleSubmit} class="btn btn-primary btn-lg">
                    Develop CV
                </button>
            </div>
          </div>




          <div style={{ display: resumeHidden ? 'none':'block'}}>
        <canvas id="bg"></canvas>
        <main>

          <header>
            <h1>{userInput.name}</h1>
            <p>🚀 Welcome to my website!</p>
          </header>


          <blockquote>
            <p>{userInput.quote}</p>
          </blockquote>

          <section>
            <h2>📜 Manifesto</h2>
            <p>I am a UMass Amherst computer science sophomore. Studying front-end techniques and designing beautiful websites are all my passions.
              <br />
              Some shite about you
              <p>Check out my work <a href="https://github.com/nguyenvothuan">Here</a></p>
            </p>

          </section>

          <section class="light">
            <h2>👩🏽‍🚀 Projects</h2>

            <p>
              Projects are the always option I use to hone my coding skills.
              <br />
              If you are interested in what I have done, check out my porfolio:
              <br />
              Or github: <a>https://github.com/nguyenvothuan</a>
              <br />
              Or you would like a summary? Well, in the portfolio, I include:
              <ul>
                <li><a href="https://trinhstartup.netlify.app/">My start up project's website:</a> a front-end outlay I built under instruction from Brian Design's video. I use this outlay for me and my sister's start-up: A platform to connect people with advanced English skill and potential clients seeking English support like translator, English tutor, writing and editting. Tag: #styled-components, #reactjs,   </li>
                <li><a href="https://nguyenvothuan.github.io/Tetris/">Tetris game!</a> I use React Hook as state management to build this simple game with the CSS referenced from Weiben Falk. Thanks a lot my favorite teacher :). </li>
                <li><a href="https://nguyenvothuan.github.io/Sudoku/">Sudoku</a> with pure HTML, CSS, and JS. I am currently working on this project with my friends. Much of the front-end work is done. We are waiting for a method using Backtracking algorithm to solve and generate more games. We are also working on a function to accept image input from users and produce a complete solution.</li>
                <li><a href="https://github.com/nguyenvothuan/Con-Fusion-Website/tree/master">Con Fusion Ristorance </a>. I built this restaurant's website when I was studying Coursera React course. There was no React Hook back then, so I used Redux. For styling I use ReactStrap.</li>
                <li><a href="https://redstorereact.netlify.app">RedStore E-commerce website</a></li>
              </ul>


            </p>

            <h2>🏆 Accomplishments</h2>

            <p>
              Your hiring me will be a proud accomplishment in this list! :D
            </p>

          </section>

          <blockquote>
            <p>The best way out is always through <br />-Robert Frost</p>
          </blockquote>

          <section class="left">
            <h2>🌮 Academic</h2>

            <h3>2017 - 2020: Physics major,  Highschool for the Gifted - Vietnam National University</h3>
            <p>
              GPA: 3.5 <br />
              Honors and Awards: Excelent performance - 5/6 semesters
            </p>

            <h3>2020 - Present: CS and Math major, UMass Amherst</h3>
            <p>
              GPA: 3.92 <br />
              Honors and Awards: Dean Lists - All semesters, Chancellor Scholarship.
            </p>

            <h2>&#x270D;Technical Skills</h2>

            <h3>Languages: </h3><p>Java, JavaScript, C#, Python</p>
            <h3>Statistic and Database: </h3><p>SQL</p>
            <h3>Front-end skills: </h3><p>HTML, CSS, and React JS</p>
          </section>

          <blockquote>
            <p>Thanks for watching!</p>
          </blockquote>


        </main>
      </div>

    </div>
  )
}

export default Resume
