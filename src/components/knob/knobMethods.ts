/*
 * For creating arc segment of ellipse.
 * svg_ellipse_arc
   * [cx,cy]: center of ellipse
   * [rx,ry]: horizontal and vertical radius
   * startingAngle: start angle in radian.
   * sweepAmount: positive angle in radians
   * phi: global rotation in radians
 * svg_circle_arc, reduced args for circle
 * volume_arc, reduced args for volume knob 
 */

 const cos = Math.cos;
 const sin = Math.sin;
 const asin = Math.asin;
 const sqrt = Math.sqrt;
 const PI = Math.PI;
 const TWO_PI = PI*2;

const ORIGIN: Point = {
  x: 0.0,
  y: 0.0
}
 
 const mult_matrix = (([[a,b], [c,d]]: number[][], [x,y]: number[]) => [ a * x + b * y, c * x + d * y]);
 const rotate_matrix = ((x: number) => [[cos(x),-sin(x)], [sin(x), cos(x)]]);
 const add_vec = (([a1, a2]: number[], [b1, b2]: number[]) => [a1 + b1, a2 + b2]);
 
 export const svgEllipseArc = ([cx,cy]: number[],[rx,ry]: number[], [startingAngle, sweepAmount]: number[], phi: number ) => {
     let arcString = "";

     // wrap sweep amount if already completed rotation
     sweepAmount = sweepAmount % (TWO_PI);

     // rotate the whole circle, probably staying the same between drawings
     const globalRotation = phi / (TWO_PI) * 360; 
     const rotMatrix = rotate_matrix (phi);

     
     const [startX, startY] = ( add_vec ( mult_matrix ( rotMatrix, [rx * cos(startingAngle), ry * sin(startingAngle)] ), [cx,cy] ) );
     const [eX, eY] = ( add_vec ( mult_matrix ( rotMatrix, [rx * cos(startingAngle+sweepAmount), ry * sin(startingAngle+sweepAmount)] ), [cx,cy] ) );
     const largSmallArcFlag = ( (  sweepAmount > PI ) ? 1 : 0 );
     const sweepDirectionFlag = ( (  sweepAmount > 0 ) ? 1 : 0 );
 
     // move component
     arcString = "M " + startX + " " + startY + "\n";
     // arc component
     arcString += "A " + [ rx , ry , globalRotation, largSmallArcFlag, sweepDirectionFlag, eX, eY ].join(" ");
     return arcString;
 };

 export const svgCircleArc = (c: number, r: number, [startingAngle, sweepRadians]: number[], globalRotationPercent: number) => {
    return svgEllipseArc([c,c],[r,r],[startingAngle,TWO_PI*sweepRadians], globalRotationPercent);
 }

 const VOLUME_INIT_ROT = (3*PI)/4;
 const TOTAL_CIRCLE_PERCENT = 0.24;
 export const volumeArc = (c: number, r: number, sweepPercentage: number) => {
    const sweepRad = PI*sweepPercentage*TOTAL_CIRCLE_PERCENT;
    return svgCircleArc(c, r, [0, sweepRad], VOLUME_INIT_ROT);
 }

 export interface Point {
   x: number;
   y: number;
 }

 export const getAngle = (p1: Point, p2: Point) => {
   const distY = Math.abs(p1.y - p2.y); //opposite
   const distX = Math.abs(p1.x - p2.x); //adjacent
   const dist = sqrt((distY*distY)+(distX*distX)); //hypotenuse,

   // up left
   if(p1.y <= p2.y && p1.x >= p2.x) 
    return asin(distY/dist);

   // up right
   else if (p1.y <= p2.y && p1.x < p2.x) 
    return (PI/2)+asin(distX/dist);

   // bottom right
   else if(p1.y > p2.y && p1.x < p2.x) 
    return (PI)+asin(distY/dist);

   // bottom left
   return (3*PI/2)+asin(distX/dist);
}

export const getOriginAngle = (p: Point) => {
  return getAngle(ORIGIN, p);
}