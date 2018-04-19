
// Add drawing routines to this file to reproduce specific drawing methods for pixijs.

class RoundBox {
 constructor(fill,border,thickness,x,y,w,h,rad,alpha ) {
  this.CreateFrom(fill,border,thickness,x,y,w,h,rad,alpha);
 }
 CreateFrom(fill,border,thickness,x,y,w,h,rad,alpha) {
  this.roundBox = new PIXI.Graphics();
  this.roundBox.displayGroup=engine.uilayer;
  this.roundBox.lineStyle(thickness, border, 1);
  this.roundBox.beginFill(fill,alpha);
  this.roundBox.drawRoundedRect(0,0,w,h,rad);
  this.roundBox.endFill();
  this.roundBox.x = x;
  this.roundBox.y = y;
  engine.stage.addChild(this.roundBox);
 }
};
