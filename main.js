// Create the Three.js scene and add it to the page
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container").appendChild(renderer.domElement);

// Add camera controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 10;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;

// Add lights to the scene
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

var pointLight = new THREE.PointLight(0xffffff, 0.5);
camera.add(pointLight);
scene.add(camera);

// Load data from the JSON file
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    var data = JSON.parse(this.responseText);

    // Process the data and create 3D geometries
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        var geometry = new THREE.BoxGeometry(1, 1, row.thickness);
        var material = new THREE.MeshLambertMaterial({
        color: "#0099ff"
        });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.x = row.x;
        cube.position.y = row.y;
        cube.position.z = row.z;
        scene.add(cube);
    }
}
};
xhr.open("GET", "walls.json", true);
xhr.send();

// Animate the scene
function animate() {
requestAnimationFrame(animate);
controls.update();
renderer.render(scene, camera);
}
animate();
