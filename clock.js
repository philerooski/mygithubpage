function init(){
  clock();
  setInterval(clock,100);
}

function clock(){
  var now = new Date();
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.save();
  ctx.clearRect(0,0,400,400);
  ctx.translate(200,200);
  ctx.scale(0.5,0.5);
  ctx.rotate(-Math.PI/2);
  ctx.strokeStyle = "black";
  ctx.fillStyle = "black";
  ctx.lineWidth = 8;
  //ctx.lineCap = "round";
  
  ctx.save();
  ctx.beginPath();
  ctx.arc(0,0,400,0,Math.PI*2);
  ctx.fill();
  ctx.restore();
  
  var ms = now.getMilliseconds();
  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hr = now.getHours();
  hr = hr>=12 ? hr-12 : hr;
  
  // hour circle
  ctx.save();
  ctx.rotate( hr*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec); // hour
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(204,0,200,0,Math.PI*2);
  ctx.fill();
  
  // minute circle
  ctx.save();
  ctx.translate(200,0);
  ctx.rotate( -hr*(Math.PI/6) - (Math.PI/360)*min - (Math.PI/21600)*sec + min*(Math.PI/30) + sec*(Math.PI/1800)); //minute
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(100,0,100,0,Math.PI*2);
  ctx.fill();
  
  // seconds circle
  ctx.save();
  ctx.translate(100,0);
  ctx.rotate(-min*(Math.PI/30) - sec*(Math.PI/1800) + sec*(Math.PI/30) + ms*(Math.PI/30000)); // seconds
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(88,0,15,0,Math.PI*2);
  ctx.fill();
  
  ctx.restore(); // second restore
  ctx.restore(); // minute restore
  ctx.restore(); // hour restore
  ctx.restore();
}