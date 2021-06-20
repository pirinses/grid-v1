import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Texture loader
const loader = new THREE.TextureLoader()
const cross = loader.load('./GridProfile.png')

// Debug
const gui = new dat.GUI()
dat.GUI.toggleHide();

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 20, 80 );

const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 5000;

const posArray = new Float32Array(particlesCnt * 3);

for(let i = 0; i < particlesCnt * 3; i++){
    //posArray[i] = Math.random() - 0.5

    posArray[i] = (Math.random() - 0.5) * (Math.random() * 5)
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

// Profile Geometry
const profileGeometry = new THREE.BufferGeometry;
const profileCnt = 100;

const profArray = new Float32Array(profileCnt * 3);

for(let i = 0; i < profileCnt * 3; i++){
    //posArray[i] = Math.random() - 0.5

    profArray[i] = (Math.random() - 0.5) * (Math.random() * 4)
}

profileGeometry.setAttribute('position', new THREE.BufferAttribute(profArray, 3))



// Sphere Geometry
const sphereParticles = new THREE.BufferGeometry();
const vertices = [];

const vertex = new THREE.Vector3();

for ( let i = 0; i < 1500; i ++ ) {

    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    vertex.normalize();

    vertices.push( vertex.x, vertex.y, vertex.z );

    vertex.multiplyScalar( Math.random() * 0.0005 + 1 );

}

//dot particles
const spparticlesCnt = 10000;
const sposArray = new Float32Array(spparticlesCnt * 3);

for(let i = 0; i < spparticlesCnt * 2; i++){
  sposArray[i] = Math.random() - 1

}

sphereParticles.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );


// profile sphere particles geometry 

const sphereProfileParticles = new THREE.BufferGeometry();
const sprofilevertices = [];

const sprofilevertex = new THREE.Vector3();

for ( let i = 0; i < 150; i ++ ) {

  sprofilevertex.x = Math.random() * 2 - 0;
  sprofilevertex.y = Math.random() * 2 - 1;
  sprofilevertex.z = Math.random() * 2 - 1;
  sprofilevertex.normalize();

  sprofilevertices.push( sprofilevertex.x, sprofilevertex.y, sprofilevertex.z );

  sprofilevertex.multiplyScalar( Math.random() * 0.005 + 2 );


}

sphereProfileParticles.setAttribute( 'position', new THREE.Float32BufferAttribute( sprofilevertices, 3 ) );

// Materials

const material = new THREE.PointsMaterial({
    size: 0.05,
    map: cross,
    color: 'cyan',
    transparent: true,
})

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.0005,
    // map: cross,
    // transparent: true,
    color: 'cyan'
})

const particlesProfile = new THREE.PointsMaterial({
    size: 0.05,
    map: cross,
    transparent: true,
    color: 'cyan'
})

const spherematerial = new THREE.PointsMaterial()
spherematerial.color = new THREE.Color(0x00E8F9)
spherematerial.size = 1.3
spherematerial.sizeAttenuation = false
spherematerial.alphaTest = 0.5
spherematerial.morphTargets = true

const sphereParticlesProfile = new THREE.PointsMaterial({
  size: 0.05,
  map: cross,
  transparent: true,
  color: 'cyan'
})


// Mesh
const sphere = new THREE.Points(geometry,material)
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
const particlesProfileFloat = new THREE.Points(profileGeometry, particlesProfile)
const sphereParticleMesh = new THREE.Points(sphereParticles,spherematerial)
const spProfileGeometryMesh = new THREE.Points(sphereProfileParticles,sphereParticlesProfile)

//scene.add(particlesMesh, particlesProfileFloat)       //for spreadout particles backgrount
scene.add(sphereParticleMesh,spProfileGeometryMesh)    //for sphere background
//scene.add(sphere, particlesMesh, particlesProfileFloat)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#001112'), 1)

/* Mouse */

document.addEventListener('mousemove', animateParticles)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

function animateParticles(event){
    mouseY = event.clientY
    mouseX = event.clientX
}

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    particlesMesh.rotation.y = -.1 * elapsedTime
    particlesProfileFloat.rotation.y = -.1 * elapsedTime

    //active objects
    sphereParticleMesh.rotation.y = .3 * elapsedTime    
    spProfileGeometryMesh.rotation.y = .5 * elapsedTime

    if(mouseX > 0){
    particlesMesh.rotation.y = mouseX * (elapsedTime * 0.00008)
    particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.00008)

    particlesProfileFloat.rotation.y = mouseX * (elapsedTime * 0.00008)
    particlesProfileFloat.rotation.x = -mouseY * (elapsedTime * 0.00008)
    }

    if(mouseX > 0){
      // sphereParticleMesh.rotation.y = mouseX * (elapsedTime * 0.00008)
      // sphereParticleMesh.rotation.x = -mouseY * (elapsedTime * 0.00008)
  
      spProfileGeometryMesh.rotation.y = mouseX * (elapsedTime * 0.0001)
      spProfileGeometryMesh.rotation.x = -mouseY * (elapsedTime * 0.0001)
      }


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


/* Form interactions */
const scriptURL = 'https://script.google.com/macros/s/AKfycbw5nTR8_GsRq4qz1vXtGkAtS9FZK5RFstfjbA4-topAVV8ZA31xMX7CdXv9a-A-IP9B/exec';
const form = document.forms['gridsheet'];
const joinWaitlist = document.getElementById('btn-join');
const closeButton = document.querySelector('.btn-close');
const modal = document.querySelector('.modal');
const textHome = document.querySelector('.container-three');
const inputs = document.querySelectorAll('input');
const textarea = document.querySelector('textarea');

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
            alert("Thanks for joining! Expect to hear from us soon."); 
            clearFields();
      })
      .catch(error => console.error('Error!', error.message))
  });

  
  form.addEventListener;

  const joinSelected = () => {
    joinWaitlist.addEventListener('click', () => {
      modal.classList.toggle('join-active-selected');
      textHome.classList.toggle('hide');
    });
  }

  const onClose = () => {
    closeButton.addEventListener('click', () => {
      textHome.classList.remove('hide');
    });
  }

  const clearFields = () => {
    inputs.forEach(input => input.value = '');
    textarea.value = '';
  }
 

  const app = () => {
    joinSelected();
    onClose();
    
  }


  app();