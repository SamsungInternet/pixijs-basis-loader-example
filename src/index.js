console.log("%c Hi, all! - PixiJS BasisLoader Example", 'background: #ff0000; color: #ffff; padding: 0.3rem');


import css from './style.css';
import { Application, Loader, Sprite } from 'pixi.js'
import { BasisLoader } from '@pixi/basis';
Loader.registerPlugin(BasisLoader);


let app;
const sprites = [];
let time = {};
time.start = new Date().getTime()

function timeLeft() {
    return "| time >> "+(new Date().getTime() - time.start)+"ms";
}


function basisInit() {
    console.log("basisInit", timeLeft())
    const check = BasisLoader.loadTranscoder('./assets/basis_transcoder.js', './assets/basis_transcoder.wasm')
    check.then(function() {
        console.log("%c BasisLoader, promise solved "+timeLeft(), 'background: #222; color: #bada55; padding: 0.3rem');
        initPixi();
    })
}

function loadAssets() {
    console.log("loadAssets", timeLeft())
    Loader.shared
        .add('shape01', 'assets/textures/300/opt/01.basis')
    Loader.shared.load((loader, resources) => {
        console.log("loader load");
    });
    Loader.shared.onProgress.add((e) => {
        console.log("onProgress", e);
    });
    Loader.shared.onError.add(() => {
        console.log("onError");
    });
    Loader.shared.onLoad.add(() => {
        console.log("onLoad");
    });
    Loader.shared.onComplete.once(() => {
        const resources = Loader.shared.resources;
        addSprites(resources);
    });
}

function addSprites(resources) {
    console.log("addSprites, resources", resources, timeLeft());
    let texture = resources["shape01"].texture;
    console.log(texture.orig.width, texture.orig.height, texture)
    const planet = Sprite.from(texture);
    planet.anchor.set(0.5);
    planet.x = app.screen.width / 2;
    planet.y = app.screen.height / 2;
    planet.scale.set(1)
    app.stage.addChild(planet);
    sprites.push(planet)
    app.ticker.add((delta) => {
        planet.rotation += 0.01 * delta;
    });
}

function initPixi() {
    console.log("initPixi", timeLeft())
    let view = document.getElementById("screen")
    app = new Application({
        backgroundColor: 0x132CAD,
        resolution: window.devicePixelRatio || 1,
        resizeTo: window
    });
    view.appendChild(app.view);
    window.app = app;
    loadAssets();
}

function resizeApp() {
    console.log("resizeApp", timeLeft())
    console.log($(window).width(), $(window).height());
}

basisInit()


// setTimeout(initPixi,500);
window.addEventListener('resize', resizeApp, false);