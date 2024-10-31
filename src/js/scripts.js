import * as THREE from 'three';
import janchaMachine from '../img/jancha_machine.png';
import fruit from '../img/7_fruit.png';
import door from '../img/door.png';
import gitHubToy from '../img/github_toy.png';
import linkedInToy from '../img/linkedin_toy.png';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import gitLogo from '../img/git_logo.png';
import linkedInLogo from '../img/linkedin_logo.png';
import na from '../img/n-a.png';
const leverUrl = new URL('../assets/lever.glb', import.meta.url);
const ballUrl = new URL('../assets/ball.glb', import.meta.url);

const renderer = new THREE.WebGLRenderer();

const rendererWidth = 500;
const rendererHeight = 500;

renderer.setSize(rendererWidth, rendererHeight);

let mainContentDiv = document.getElementById('main-content');

renderer.domElement.id = 'machine';
mainContentDiv.insertBefore(renderer.domElement, document.getElementById('parlay'));

const scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera(
    -1, 1, 1, -1, 0.1, 2000
);

renderer.setClearColor(0xFFFFFF);

scene.scale.set(0.67, 0.67, 1.0);
scene.position.set(0.1, 0, 0);

const cameraPosition = {x: 0, y: 0, z: 3};
camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

// jancha setup 
const textureLoader = new THREE.TextureLoader();

const janchaPlane = new THREE.PlaneGeometry();

const janchaTexture = textureLoader.load(janchaMachine);
janchaTexture.magFilter = THREE.NearestFilter;
janchaTexture.minFilter = THREE.NearestFilter;

const janchaMaterial = new THREE.MeshBasicMaterial({ map: janchaTexture, transparent: true});

const janchaMesh = new THREE.Mesh(janchaPlane, janchaMaterial);

const fruitPlane = new THREE.PlaneGeometry();

const fruitTexture = textureLoader.load(fruit);

const fruitMaterial = new THREE.MeshBasicMaterial( {map: fruitTexture, transparent: true} );

const fruitMesh1 = new THREE.Mesh(fruitPlane, fruitMaterial);
const fruitMesh2 = new THREE.Mesh(fruitPlane, fruitMaterial);
const fruitMesh3 = new THREE.Mesh(fruitPlane, fruitMaterial);

const gitHubToyPlane = new THREE.PlaneGeometry();

const gitHubToyTexture = textureLoader.load(gitHubToy);

const gitHubToyMaterial = new THREE.MeshBasicMaterial( {map: gitHubToyTexture, transparent: true, side: THREE.DoubleSide} );

const gitHubToyMesh = new THREE.Mesh(gitHubToyPlane, gitHubToyMaterial);

const linkedInToyPlane = new THREE.PlaneGeometry();

const linkedInToyTexture = textureLoader.load(linkedInToy);

const linkedInToyMaterial = new THREE.MeshBasicMaterial( {map: linkedInToyTexture, transparent: true, side: THREE.DoubleSide} );

const linkedInToyMesh = new THREE.Mesh(linkedInToyPlane, linkedInToyMaterial);

const doorPlane = new THREE.PlaneGeometry();

const doorTexture = textureLoader.load(door);
doorTexture.magFilter = THREE.NearestFilter;
doorTexture.minFilter = THREE.NearestFilter;

const doorMaterial = new THREE.MeshBasicMaterial( {map: doorTexture, transparent: true, side: THREE.DoubleSide} );

const doorMesh = new THREE.Mesh(doorPlane, doorMaterial);

scene.add(janchaMesh);
scene.add(fruitMesh1);
scene.add(fruitMesh2);
scene.add(fruitMesh3);
scene.add(gitHubToyMesh);
scene.add(linkedInToyMesh);

gitHubToyMesh.position.set(0, -0.83, 0);
gitHubToyMesh.scale.set(0.3, 0.3, 0.3);

linkedInToyMesh.position.set(0, -0.83, 0);
linkedInToyMesh.scale.set(0.3, 0.3, 0.3);

const toys = [gitHubToyMesh, linkedInToyMesh];
let toyIndex = 0;

let gitImage = new Image();
gitImage.src = gitLogo;
gitImage.classList.add('item');
gitImage.width = 45;
gitImage.height = 45;
gitImage.align = 'center';
gitImage.alt = 'git logo';

let linkedInImage = new Image();
linkedInImage.src = linkedInLogo;
linkedInImage.classList.add('item');
linkedInImage.width = 45;
linkedInImage.height = 45;
linkedInImage.align = 'center';
linkedInImage.alt = 'linkedin logo';

gitText = `A black-and-white... dollop. There's some kind of cartoon beast on its face. <br><br> 

What is this? A horrific misprint of the U.S. Mint? A souvenir of a coastal Cthulhu township? The GitHub.com logo? <br><br>

Ah, yes. Click <a href="https://github.com/jon-mears">here</a> to visit Jon's illustrious GitHub page.`;

linkedInText = `A little blue frisbee. She says "in." <br/> <br/>
In... what? The air entrapped by field & friends? Your coffers? A global network of professionals? <br/> <br/>
Ah, YES. Click <a href="https://www.linkedin.com/in/jonathan-mears-050709242/">here</a> to visit Jon's illustrious LinkedIn page.`

let itemImageSrcs = {
    'github': gitLogo,
    'linkedin': linkedInLogo,
    'none': na
};

let itemImages = {
    'github': gitImage,
    'linkedin': linkedInImage
};

let noneText = 'Nothing. <br/><br/> Pull the lever to begin.';

let itemTexts = {
    'github': gitText,
    'linkedin': linkedInText,
    'none': noneText
};

let items = ['github', 'linkedin'];
let itemIndex = 0;

for (let i = 1; i < toys.length; ++i) {
    toys[i].visible = false;
}

function itemClick(event) {
    let itemSlot = event.target;

    while (itemSlot != null && !itemSlot.classList.contains('item-slot')) {
        itemSlot = itemSlot.parentElement;
    }

    if (itemSlot != null) {
        let prevSelectedItem = document.querySelectorAll('.selected-item-slot')[0];
        prevSelectedItem.classList.remove('selected-item-slot');
    
        itemSlot.classList.add('selected-item-slot');

        let itemName = itemSlot.getAttribute('data-item');

        let examineElement = document.getElementById('examine');
        examineElement.src = itemImageSrcs[itemName];

        let descriptionElement = document.getElementById('description');
        descriptionElement.innerHTML = itemTexts[itemName];
    }
}

let itemSlots = document.querySelectorAll('.item-slot');

for (let itemSlot of itemSlots) {
    itemSlot.addEventListener('click', itemClick);
}

const cube = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000});
const cubeMesh = new THREE.Mesh(cube, cubeMaterial);

const originDoor = new THREE.BoxGeometry();
const originDoorMesh = new THREE.Mesh(originDoor, cubeMaterial);

scene.add(originDoorMesh);

originDoorMesh.scale.set(0.1, 0.1, 0.1);

originDoorMesh.visible = true;

scene.add(cubeMesh);

const light = new THREE.SpotLight();
let leverMesh;

let leverLoaded = false;

const leverMaterial = new THREE.MeshPhongMaterial({
    color: 0x000000,
    specular: 0xFFFFFF,
});

const assetLoader = new GLTFLoader();
assetLoader.load(leverUrl.href, (gltf) => {
    leverMesh = gltf.scene.getObjectByName('lever');
    cubeMesh.add(leverMesh);

    leverMesh.geometry.translate(-2.7, -4.55, -0.63);
    leverMesh.material = leverMaterial;

    leverMesh.position.set(-0.7, -0.39, -0.5);
    leverMesh.rotation.set(-0.3, Math.PI, 0);
    leverMesh.scale.set(0.4, 0.4, 0.4);

    leverLoaded = true;

}, undefined, (error) => {
    console.error(error);
});

let ballMesh;

let ballLoaded = false;

const ballMaterial = new THREE.MeshPhongMaterial({
    color: 0xFF0000,
    shininess: 1000,
    specular: 0xFFFFFF
});

assetLoader.load(ballUrl.href, (gltf) => {
    ballMesh = gltf.scene.getObjectByName('ball');
    leverMesh.add(ballMesh);

    ballMesh.material = ballMaterial;

    ballMesh.position.set(1.3, 1.8, -1.2);
    scene.add(light);
    light.target = ballMesh;
    light.position.set(-1, 0.5, 0.5);

    ballLoaded = true;
}, undefined, (error) => {
    console.error(error);
});

janchaMesh.scale.x = 2;
janchaMesh.scale.y = 2;

originDoorMesh.position.set(-0.18, -0.79, 0);

doorMesh.scale.x = 0.34;
doorMesh.scale.y = 0.405;

doorMesh.position.set(0.177, 0, 0);

fruitMesh1.scale.set(0.35, 0.35, 0.35);
fruitMesh1.position.set(-0.6, 0.17, 1);

fruitMesh2.scale.set(0.35, 0.35, 0.35);
fruitMesh2.position.set(0, 0.19, 1);

fruitMesh3.scale.set(0.35, 0.35, 0.35);
fruitMesh3.position.set(0.6, 0.17, 1);

originDoorMesh.scale.set(1, 1, 1);

originDoorMesh.add(doorMesh);

originDoorMesh.material.visible = false;

const canvas = renderer.domElement;

const clock = new THREE.Clock();

const cursorPosition = new THREE.Vector2();

const clickStartPosition = new THREE.Vector2();
const clickEndPosition = new THREE.Vector2();

const rect = canvas.getBoundingClientRect();

function mouseMove(e) {
    cursorPosition.x = e.clientX - rect.left;
    cursorPosition.y = e.clientY - rect.top;
}

function mouseDown(e) {
    clickStartPosition.set(cursorPosition.x, cursorPosition.y);
}

function mouseUp(e) {
    clickEndPosition.set(cursorPosition.x, cursorPosition.y);
}

canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mouseup', mouseUp);

const States = Object.freeze({
    rest: 0,
    leverDown: 1,
    leverUp: 2,
    openDoor: 3,
    toyCollect: 4,
    closeDoor: 5
});

fruitMaterial.visible = true;

const leverClickArea = new DOMRect(0.0375*rendererWidth, 0.25*rendererHeight, 0.1625*rendererWidth, 0.2*rendererHeight);
const toyClickArea = new DOMRect(0.4375*rendererWidth, 0.725*rendererHeight, 0.125*rendererWidth, 0.1125*rendererHeight);

function inDOMRect(position, rect) {
    return (rect.left < position.x && position.x < rect.right) &&
           (rect.top < position.y && position.y < rect.bottom);
}

let state = States.rest;

let lastToggleTime;

function leverDownLoop(deltaTime) {
    leverMesh.rotation.x += 2 * deltaTime;

    if (leverMesh.rotation.x >= Math.PI / 2) {
        leverMesh.rotation.x = Math.PI / 2;

        lastToggleTime = clock.getElapsedTime();
        state = States.leverUp;
    }
}

let leverUp = false;
let fruitVisible = false;

function doorCloseLoop(deltaTime) {
    originDoorMesh.rotation.y += 1 * deltaTime;

    if (originDoorMesh.rotation.y >= 0) {
        originDoorMesh.rotation.y = 0;

        toyIndex++;

        if (toyIndex < toys.length) {
            toys[toyIndex].visible = true;
        }

        state = States.rest;
    }
}

function toyCollectLoop(deltaTime) {
    if (inDOMRect(cursorPosition, toyClickArea)) {
        document.body.style.cursor = 'pointer';
    }

    else {
        document.body.style.cursor = 'default';
    }

    if (inDOMRect(clickStartPosition, toyClickArea) && inDOMRect(clickEndPosition, toyClickArea)) {
        document.body.style.cursor = 'default';
        
        clickStartPosition.set(0, 0);
        clickEndPosition.set(0, 0);

        if (toyIndex < toys.length) {
            toys[toyIndex].visible = false;

            let itemSlots = document.querySelectorAll('.item-slot');

            let curItemSlot = itemSlots[itemIndex];
            curItemSlot.appendChild(itemImages[items[itemIndex]]);
            curItemSlot.setAttribute('data-item', items[itemIndex]);

            if (curItemSlot.classList.contains('selected-item-slot')) {
                let itemName = curItemSlot.getAttribute('data-item');

                let examineElement = document.getElementById('examine');
                examineElement.src = itemImageSrcs[itemName];
        
                let descriptionElement = document.getElementById('description');
                descriptionElement.innerHTML = itemTexts[itemName];
            }

            itemIndex++;
        }

        fruitMaterial.visible = false;

        state = States.closeDoor;
    }
}

function openDoorLoop(deltaTime) {
    originDoorMesh.rotation.y -= 1 * deltaTime;

    if (originDoorMesh.rotation.y <= -Math.PI) {
        originDoorMesh.rotation.y = -Math.PI;

        state = States.toyCollect;
    }
}

function leverUpLoop(deltaTime) {
    const time = clock.getElapsedTime();
    leverMesh.rotation.x -= 0.7 * deltaTime;

    if (time - lastToggleTime >= 0.4) {
        fruitMaterial.visible = !fruitMaterial.visible;
        lastToggleTime = time;

        fruitVisible = fruitMaterial.visible;
    }

    if (leverMesh.rotation.x <= -0.3) {
        leverMesh.rotation.x = -0.3;
        leverUp = true;
    }

    if (leverUp && fruitVisible) {
        leverUp = false;
        fruitVisible = false;
        state = States.openDoor;
    }
}

function restLoop(deltaTime) {
    if (inDOMRect(cursorPosition, leverClickArea)) {
        document.body.style.cursor = 'pointer';
    }

    else {
        document.body.style.cursor = 'default';
    }

    if (inDOMRect(clickStartPosition, leverClickArea) && inDOMRect(clickEndPosition, leverClickArea)) {
        document.body.style.cursor = 'default';
        
        clickStartPosition.set(0, 0);
        clickEndPosition.set(0, 0);

        state = States.leverDown;
    }
}

function mainLoop() {
    const deltaTime = clock.getDelta();
    if (state == States.rest) {
        restLoop(deltaTime);
    }

    else if (state == States.leverDown) {
        leverDownLoop(deltaTime);
    }

    else if (state == States.leverUp) {
        leverUpLoop(deltaTime);
    }

    else if (state == States.openDoor) {
        openDoorLoop(deltaTime);
    }

    else if (state == States.toyCollect) {
        toyCollectLoop(deltaTime);
    }

    else if (state == States.closeDoor) {
        doorCloseLoop(deltaTime);
    }

    renderer.render(scene, camera);
}

fruitMaterial.visible = false;

renderer.setAnimationLoop(mainLoop);