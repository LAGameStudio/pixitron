let KeyboardInput = require('./interface.js');
require('./drawing.js');

// Customize this file to set up your "game engine"

class Engine {

 constructor() {
  this.Init();
  this.frametime = 30.0/1000.0;
  this.time = 0.0;
 }

 InitEvents() {
  window.addEventListener("resize",resizeEvent);
 }

 Init() {
  this.body = document.body;
//  this.canvas = g("canvas");
//  this.context = canvas.getContext("2d");
//  c3d = canvas.getContext("3d");
  this.elements=new Array;
  this.editing=true;
  this.tileSelect=null;
  this.tileset=null;
  this.GetWindowSize();
  this.InitEvents();
  this.InitControls();
  this.InitRenderer();
  this.OnResize();
  this.EngineSetup();
 }


 InitControls() {
  this.input=new KeyboardInput();
  this.input.engine = this;
  // numpad
  this.input.n0.release = function() {  };
  this.input.n1.release = function() {  };
  this.input.n2.release = function() {  };
  this.input.n3.release = function() {  };
  this.input.n4.release = function() {  };
  this.input.n5.release = function() {  };
  this.input.n6.release = function() {  };
  this.input.n7.release = function() {  };
  this.input.n8.release = function() {  };
  this.input.n9.release = function() {  };
  // keys
  this.input.lbracket.release = function() {  };
  this.input.rbracket.release = function() {  };
  this.input.slash.release    = function() {  };
  // arrows
  this.input.left.release  = function() {  };
  this.input.up.release    = function() {  };
  this.input.down.release  = function() {  };
  this.input.right.release = function() {  };
  // ESC (quit)
  this.input.esc.release = function() { window.close() };
  console.log("Keyboard Controls Initialized");
 }

//  this.ImportTileset();
 InitRenderer() {
//  this.app = new PIXI.Application();
  this.app = new PIXI.Application({
   backgroundColor:0x900000
  });
  this.renderer = this.app.renderer;
  document.body.appendChild(this.app.view); // Add the view to the DOM
  this.stage = new PIXI.Container();
  this.zlayer=new PIXI.DisplayGroup(0,function(tile){
   tile.zOrder = -tile.position.y;
  });
  this.uilayer=new PIXI.DisplayGroup(1,false);
  this.renderer.view.style.position = "absolute";
  this.renderer.view.style.display = "block";
  this.renderer.autoResize = false;
  this.renderer.resize(window.innerWidth, window.innerHeight);
  console.log(window.innerWidth+"x"+window.innerHeight);
  this.scrolled = { x:0, y:0 };
  this.tilepicker={ };
 }

 GetWindowSize() {
  this.width = this.body.offsetWidth-3;
  this.height = this.body.offsetHeight-3;
 }

 OnResize() {
  this.GetWindowSize();
  this.renderer.resize(this.width,this.height);
  console.log(this.width+"x"+this.height);
  if ( !this.renderer ) return;
  this.isWebGL = this.renderer instanceof PIXI.WebGLRenderer
  if (!this.isWebGL) {
    alert("No GL Support: this app requires OpenGL.");
  }
  console.log(this);
 }

 DeferredInit() {
  console.log("Deferred Init");
 }


 DelayedInit() {
  console.log("Delayed Init");
 }

EngineSetup() {
 console.log("Engine Setup");
 // Replace this with whatever...
 this.sprites = new PIXI.particles.ParticleContainer(10000, {     scale: true,     position: true,     rotation: true,     uvs: true,     alpha: true });
 this.entities = [];  // create an array to store all the sprites
 this.totalSprites = this.renderer instanceof PIXI.WebGLRenderer ? 100 : 10;  // size of graphic effects performance...
 for (var i = 0; i < this.totalSprites; i++) {
     // create a new Sprite
     var dude = PIXI.Sprite.fromImage('./bunny.png');
     dude.tint = Math.random() * 0xE8D4CD;
     dude.anchor.set(0.5);
     dude.scale.set(0.8 + Math.random() * 0.3);
     dude.x = Math.random() * this.width;
     dude.y = Math.random() * this.height;
     dude.tint = Math.random() * 0x808080;
     dude.direction = Math.random() * Math.PI * 2;
     dude.turningSpeed = Math.random() - 0.8;
     dude.speed = (2 + Math.random() * 2) * 0.2;
     dude.offset = Math.random() * 100;
     this.entities.push(dude);
     this.sprites.addChild(dude);
 }
 this.stage.addChild(this.sprites);

 this.app.ticker.add(function(delta) {
//   if ( engine ) console.log("Tick: "+engine.time+" delta: "+delta);
   var boundsPadding = 100;
   var boundbox = new PIXI.Rectangle( -boundsPadding,  -boundsPadding,  engine.width + boundsPadding * 2, engine.height + boundsPadding * 2 );
     //// Replace this with whatever you'd like
       for (var i = 0; i < engine.entities.length; i++) { // iterate through the sprites and update their position
           var dude = engine.entities[i];
           dude.scale.y = 0.95 + Math.sin(engine.time + dude.offset) * 0.05;
           dude.direction += dude.turningSpeed * 0.01;
           dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
           dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
           dude.rotation = -dude.direction + Math.PI;
           // wrap xy world
           if (dude.x < boundbox.x) dude.x += boundbox.width;
           else if (dude.x > boundbox.x + boundbox.width) dude.x -= boundbox.width;
           if (dude.y < boundbox.y) dude.y += boundbox.height;
           else if (dude.y > boundbox.y + boundbox.height) dude.y -= boundbox.height;
       }
       engine.time += engine.frametime;  // 30ms tick-time
      ////
});

 ///

}

 EngineUpdate() {
 }

 EngineRender() {
  this.renderer.render(this.stage);
 }

};

function Loop() {
 engine.EngineUpdate();
 engine.EngineRender();
 requestAnimationFrame(Loop);
}

addEventListener( 'load', Go );
function Go() {
 console.log("Go");
 engine=new Engine;
// engine.MapEditMode();
 console.log(engine);
 setTimeout(function(){engine.DeferredInit();requestAnimationFrame(Loop);},30);
 setTimeout(function(){engine.DelayedInit();},1500);
 console.log(engine);
}


var engine = new Engine;

function resizeEvent() { if ( engine != null ) engine.OnResize(); }
