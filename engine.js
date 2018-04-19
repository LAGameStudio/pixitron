let KeyboardInput = require('./interface.js');
require('./drawing.js');

// Customize this file to set up your "game engine"

var engine = null;

function resizeEvent() { if ( engine != null ) engine.OnResize(); }

class Engine {

 constructor() {
  this.Init();
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
  this.renderer = new PIXI.autoDetectRenderer(this.width,this.height,{
   backgroundColor:0x000000
  });
  document.body.appendChild(this.renderer.view);
  this.stage = new PIXI.Container();
//  this.zlayer=new PIXI.DisplayGroup(0,function(tile){
//   tile.zOrder = -tile.position.y;
//  });
//  this.uilayer=new PIXI.DisplayGroup(1,false);
  this.renderer.view.style.position = "absolute";
  this.renderer.view.style.display = "block";
  this.renderer.autoResize = false;
  this.renderer.resize(window.innerWidth, window.innerHeight);
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

 EngineUpdate() {
 }

 EngineBetween() {
 }

 EngineRender() {
  this.renderer.render(this.stage);
 }

};

function Loop() {
 engine.EngineUpdate();
 engine.EngineBetween();
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
