var m = { x:0, y:0 };
var moffset = { x: 0, y: 0 }
var clicking=false;


function updateMousePos (event) {
 m.x = event.clientX - moffset.x;
 m.y = event.clientY - moffset.y;
}

function onTouchStart (event)   { clicking = true;  updateMousePos(event); }
function onTouchMove (event)    { updateMousePos(event); }
function onTouchEnd (event)     { clicking = false; }
function onMouseDown (event)    { clicking = true; updateMousePos(event); }
function onMouseMove (event)    { updateMousePos(event); }
function onMouseUp (event)      { clicking = false; }

document.addEventListener('touchstart', onTouchStart, true);
document.addEventListener('touchstart', onTouchMove, true);
document.addEventListener('touchend', onTouchEnd, true);
document.addEventListener('mousedown', onMouseDown, true);
document.addEventListener('mousemove', onMouseMove, true);
document.addEventListener('mouseup', onMouseUp, true);

// Instantiated in engine.js
class KeyboardInput {
 constructor() {
  this.bksp=this.keyboard(8);
  this.enter=this.keyboard(10);
  this.esc=this.keyboard(27);
  this.space=this.keyboard(32);
  this.left=this.keyboard(37);
  this.up=this.keyboard(38);
  this.down=this.keyboard(40);
  this.right=this.keyboard(39);
  this.multiply=this.keyboard(42);
  this.add=this.keyboard(43);
  this.comma=this.keyboard(44);
  this.minus=this.keyboard(45);
  this.period=this.keyboard(46);
  this.slash=this.keyboard(47);
  this.n0=this.keyboard(48);
  this.n1=this.keyboard(49);
  this.n2=this.keyboard(50);
  this.n3=this.keyboard(51);
  this.n4=this.keyboard(52);
this.n5=this.keyboard(53);
this.n6=this.keyboard(54);
this.n7=this.keyboard(55);
this.n8=this.keyboard(56);
this.n9=this.keyboard(57);
this.colon=this.keyboard(59);
this.equals=this.keyboard(61);
/*
this.A=this.keyboard(65);
this.B=this.keyboard(66);
this.C=this.keyboard(67);
this.D=this.keyboard(68);
this.E=this.keyboard(69);
this.F=this.keyboard(70);
this.G=this.keyboard(71);
this.H=this.keyboard(72);
this.I=this.keyboard(73);
this.J=this.keyboard(74);
this.K=this.keyboard(75);
this.L=this.keyboard(76);
this.M=this.keyboard(77);
this.N=this.keyboard(78);
this.O=this.keyboard(79);
this.P=this.keyboard(80);
this.Q=this.keyboard(81);
this.R=this.keyboard(82);
this.S=this.keyboard(83);
this.T=this.keyboard(84);
this.U=this.keyboard(85);
this.V=this.keyboard(86);
this.W=this.keyboard(87);
this.X=this.keyboard(88);
this.Y=this.keyboard(89);
this.Z=this.keyboard(90);
*/
this.lbracket=this.keyboard(91);
this.backslash=this.keyboard(92);
this.rbracket=this.keyboard(93);
this.apostrophe=this.keyboard(94);
this.backtick=this.keyboard(96);
/*
this.a=this.keyboard(97);
this.b=this.keyboard(98);
this.c=this.keyboard(99);
this.d=this.keyboard(100);
this.e=this.keyboard(101);
this.f=this.keyboard(102);
this.g=this.keyboard(103);
this.h=this.keyboard(104);
this.i=this.keyboard(105);
this.j=this.keyboard(106);
this.k=this.keyboard(107);
this.l=this.keyboard(108);
this.m=this.keyboard(109);
this.n=this.keyboard(110);
this.o=this.keyboard(111);
this.p=this.keyboard(112);
this.q=this.keyboard(113);
this.r=this.keyboard(114);
this.s=this.keyboard(115);
this.t=this.keyboard(116);
this.u=this.keyboard(117);
this.v=this.keyboard(118);
this.w=this.keyboard(119);
this.x=this.keyboard(120);
this.y=this.keyboard(121);
this.z=this.keyboard(122);
*/
this.del=this.keyboard(127);
}
keyboard(keyCode) {
var key = {};
key.code = keyCode;
key.isDown = false;
key.isUp = true;
key.press = undefined;
key.release = undefined;
//The `downHandler`
key.downHandler = function(event) {
  if (event.keyCode === key.code) {
    if (key.isUp && key.press) key.press();
    key.isDown = true;
    key.isUp = false;
    console.log(key);
  }
  event.preventDefault();
};
//The `upHandler`
key.upHandler = function(event) {
  if (event.keyCode === key.code) {
    if (key.isDown && key.release) key.release();
    key.isDown = false;
    key.isUp = true;
    console.log(key);
  }
  event.preventDefault();
};
//Attach event listeners
window.addEventListener(    "keydown", key.downHandler.bind(key), false  );
window.addEventListener(    "keyup", key.upHandler.bind(key), false  );
return key;
}
};

module.exports = KeyboardInput;
