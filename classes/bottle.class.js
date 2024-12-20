class Bottle extends DrawableObject {
   
   height = 100;
   width = 100;
   y = 330;

   constructor(path) {
      super().loadImage(path);
      this.x = 400 + Math.random() * 2000;
   }
}