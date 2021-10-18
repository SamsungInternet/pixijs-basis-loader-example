console.log("index.js");

import css from './style.css';
import { Application, Loader, Sprite } from 'pixi.js'

//import * as PIXI from 'pixi.js'
// - ref: https://www.npmjs.com/package/@pixi/basis

import { BasisLoader } from '@pixi/basis';
//import { Loader } from '@pixi/loaders';

Loader.registerPlugin(BasisLoader);
// Use this if you to use the default CDN url for @pixi/basis
//BasisLoader.loadTranscoder();
// Use this if you want to serve the transcoder on your own


/* Research


	// ref: https://pixijs.download/dev/docs/PIXI.BasisLoader.TranscoderWorker.html
	// + ref: https://github.com/pixijs/pixijs/blob/dev/packages/basis/src/BasisLoader.ts#L234
	// * ref - https://github.com/pixijs/pixijs/issues/7496


	*/

BasisLoader.loadTranscoder('./assets/basis_transcoder.js', './assets/basis_transcoder.wasm');
// App

let app;
//const loader = PIXI.Loader.shared; // PixiJS exposes a premade instance for you to use.
//or
//const loader = new PIXI.Loader(); // you can also create your own if you want

const sprites = [];

// Colors
const cols_blue1 = 0x132CAD


function loadAssets() {
    // Chainable `add` to enqueue a resource


    Loader.shared
        .add('shape01', 'assets/textures/300/opt/01.basis')
    // Chainable `pre` to add a middleware that runs for each resource, *before* loading that resource.
    // This is useful to implement custom caching modules (using filesystem, indexeddb, memory, etc).
    //loader.pre(cachingMiddleware);
    // Chainable `use` to add a middleware that runs for each resource, *after* loading that resource.
    // This is useful to implement custom parsing modules (like spritesheet parsers, spine parser, etc).
    //loader.use(parsingMiddleware);
    // The `load` method loads the queue of resources, and calls the passed in callback called once all
    // resources have loaded.

    Loader.shared.load((loader, resources) => {
        // resources is an object where the key is the name of the resource loaded and the value is the resource object.
        // They have a couple default properties:
        // - `url`: The URL that the resource was loaded from
        // - `error`: The error that happened when trying to load (if any)
        // - `data`: The raw data that was loaded
        // also may contain other properties based on the middleware that runs.
        // sprites.bunny = new PIXI.TilingSprite(resources.bunny.texture);
        // sprites.spaceship = new PIXI.TilingSprite(resources.spaceship.texture);
        // sprites.scoreFont = new PIXI.TilingSprite(resources.scoreFont.texture);
        console.log("loader load");
    });

    // throughout the process multiple signals can be dispatched.
    Loader.shared.onProgress.add(() => {}); // called once per loaded/errored file
    Loader.shared.onError.add(() => {}); // called once per errored file
    Loader.shared.onLoad.add(() => {}); // called once per loaded file
    Loader.shared.onComplete.once(() => {

        const resources = Loader.shared.resources;
        addSprites(resources);
    }); // called once when the queued resources all load.
}



function addSprites(resources) {

    console.log("addSprites");
    // create a new Sprite from an image path
    // resources["original"].texture


        // for testing switch between shape01 and shape02


    const bunny = Sprite.from(resources["shape01"].texture);

    // center the sprite's anchor point
    bunny.anchor.set(0.5);

    // move the sprite to the center of the screen
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;
    bunny.scale.set(1)
    console.log("bunny: ",bunny.position, bunny.width, bunny.height)
    app.stage.addChild(bunny);


    sprites.push(bunny)

    // Listen for animate update
    app.ticker.add((delta) => {
        // just for fun, let's rotate mr rabbit a little
        // delta is 1 if running at 100% performance
        // creates frame-independent transformation
        bunny.rotation += 0.01 * delta;
    });
}


function initPixi() {
    let view = document.getElementById("screen")
    app = new Application({
        /*        width: wapp.W, 
                height: wapp.H, */
        backgroundColor: cols_blue1,
        resolution: window.devicePixelRatio || 1,
        resizeTo: window
    });
    view.appendChild(app.view);
    window.app = app;
    loadAssets();
}



function resizeGame() {
    console.log($(window).width(), $(window).height());
}



initPixi();
window.addEventListener('resize', resizeGame, false);