//canvas
const canvas = document.querySelector("#myCanvas");

//create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbda820);

//set camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight, 0.1,
    100);
camera.position.z = 15;

//renderer
const renderer = new THREE.WebGLRenderer(canvas);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(
    renderer.domElement); 

//Light
const a_Light = new THREE.AmbientLight(0x35e8e8, 1);
a_Light.position.set(0, 0, 10);
const d_Light = new THREE.DirectionalLight(0x35e8e8, 1);
d_Light.position.set(2, 2, 2);
const h_Light = new THREE.HemisphereLight(0x35e8e8, 0xffffff, 1);
h_Light.position.set(2, 7, 0);
const p_Light = new THREE.PointLight(0x35e8e8, 1, 80);
p_Light.position.set(2, 2, 2);
const s_Light = new THREE.SpotLight(0x35e8e8, 1, 50);
s_Light.position.set(0, 8, 10);

const lights = [a_Light, d_Light, h_Light, p_Light, s_Light];

//memasukkan loght ke scene
lights.forEach((light) => {
    scene.add(light);
});

//light awal
lights.forEach((light) => {
    light.visible = false;
});
lights[0].visible = true;

//mengatur light yang diinginkan
const selectedLight = document.getElementById('light');
selectedLight.addEventListener('change', (e) => {
    const selected = e.target.value;
    lights.forEach((light) => {
        light.visible = false;
    });
    lights[selected].visible = true;
});


// Create Object
//1. cube
    
let  createCube  =   function()  {        
    let  geometry  =  new  THREE.BoxGeometry(3,  3,  3);        
    let  material  =  new  THREE.MeshBasicMaterial({ color:  0x00a1cb, wireframe: true });        
    cube  =  new  THREE.Mesh( geometry,  material );        
    scene.add(cube);   
    cube.position.set(-15, 5); 
};
createCube();

//2. Sphere
let createSphere = function() {

    const geometry = new THREE.SphereGeometry(2, 32, 16);
    const material = new THREE.MeshDepthMaterial({ color: 0xffff00, wireframe: true });
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
};
createSphere();

//3. torus
let createTorus = function() {
    const geometry = new THREE.TorusGeometry(2, 0.75, 15, 25);
    const material = new THREE.MeshPhongMaterial({ color: 0x9400d3 });
    torus = new THREE.Mesh(geometry, material);
    scene.add(torus);
    torus.position.set(-15, -5);
};
createTorus();

//4. Dodecahedron
let createDodecahdron = function() {
    const geometry = new THREE.DodecahedronGeometry(2.3, 0);
    const material = new THREE.MeshStandardMaterial({ color: 0xffff33 });
    dodecahedron = new THREE.Mesh(geometry, material);
    scene.add(dodecahedron);
    dodecahedron.position.set(15, -5);
};
createDodecahdron();

//5. Cone
let createCone = function() {
    const geometry = new THREE.ConeGeometry(1.5, 4, 80);
    const material = new THREE.MeshNormalMaterial({ color: 0xf5a84, shininess: 100, wireframe: true });
    cone = new THREE.Mesh(geometry, material);
    scene.add(cone);
    cone.position.set(15, 5);
};
createCone();

const animate =
    function() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.001;
        cube.rotation.y += 0.001;
        renderer.render(scene, camera);
    };
const animate2 =
    function() {
        requestAnimationFrame(animate2);
        cone.rotation.x += 0.001;
        cone.rotation.y += 0.001;
        renderer.render(scene, camera);
    };
const animate3 =
    function() {
        requestAnimationFrame(animate3);
        sphere.rotation.y += 0.005;
        renderer.render(scene, camera);
    };
animate();
animate2();
animate3();