console.log("index.js");

import css from './style.css';
import { Application, Loader, Sprite } from 'pixi.js'
import { BasisLoader } from '@pixi/basis';
Loader.registerPlugin(BasisLoader);

BasisLoader.loadTranscoder('./assets/basis_transcoder.js', './assets/basis_transcoder.wasm');

let app;
const sprites = [];


function loadAssets() {

    Loader.shared
        .add('shape01', 'assets/textures/300/opt/01.basis')

    Loader.shared.load((loader, resources) => {
        console.log("loader load");
    });

    Loader.shared.onProgress.add(() => {
        console.log("onProgress")
    });
    Loader.shared.onError.add(() => {
        console.log("onError")        
    });
    Loader.shared.onLoad.add(() => {
        console.log("onLoad")
    });

    Loader.shared.onComplete.once(() => {
        const resources = Loader.shared.resources;
        addSprites(resources);
    });
}


function addSprites(resources) {

    const planet = Sprite.from(resources["shape01"].texture);

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
    console.log($(window).width(), $(window).height());
}


initPixi();

window.addEventListener('resize', resizeApp, false);