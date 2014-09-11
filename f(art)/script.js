var ctx;
var t;
var dt;
var x;
var y;
var WIDTH;
var HEIGHT;
var q;
var w;
var e;
var r;
var d;
var f;
var g;
var a;
var equation;
var xmouse;
var ymouse;
var dxmouse;
var dymouse;
var ystartmouse;
var adjusting;
var varHover;
var dragging;
var drawInterval;
var liveVariable;
var widthStretch;
var heightStretch;
var size;
var drawInstantlySwitch;

function init() {
  ctx = document.getElementById('canvas').getContext('2d');
  t = 0;
  dt = 0.0015;
  x = 0;
  y = 0;
  WIDTH = parseInt($('canvas').attr('width'));
  HEIGHT = parseInt($('canvas').attr('height'));
  q = 1;
  w = 1;
  e = 40;
  r = 1;
  f = 1;
  g = 2;
  a = 80;
  equation = 3;
  xmouse = 0;
  ymouse = 0;
  ystartmouse = 0;
  adjusting = false;
  varHover = false;
  dragging = false;
  widthStretch = 5;
  heightStretch = 8;
  size = 2;
  drawInstantlySwitch = false;
  updateVars();
  resetEquation(equation);
  drawx100();
  drawEquation();
  drawInterval = setInterval(draw, 15);
}

function draw() {
  //ctx.clearRect(0,0,WIDTH,HEIGHT);
  ctx.save();
  ctx.translate(WIDTH/2, HEIGHT/2);
  ctx.fillStyle = randomColor() + '1)';
  move(equation);
  ctx.beginPath();
  ctx.arc(x,y,size,0,Math.PI*2);
  ctx.fill();

  ctx.clearRect(-(WIDTH/2)+10,HEIGHT/2-50,WIDTH/4, 37);
  drawTime();

  t += dt;

  ctx.restore();
}

function drawInstantly() {
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  ctx.save();
  ctx.translate(WIDTH/2, HEIGHT/2);
  ctx.fillStyle = 'rgb(255,255,255)';
  t = -5;
  for (t; t < 5; t += dt) {
    move(equation);
    ctx.beginPath();
    ctx.arc(x,y,size,0,Math.PI*2);
    ctx.fill();
  }
  ctx.restore();
}

function drawx100() {
  ctx.save();
  ctx.fillStyle = 'white';
  ctx.font = '30px Abadi MT Condensed Light';
  ctx.fillText('t = 0', 10, HEIGHT - 15);
  ctx.font = '10px Abadi MT Condensed Light';
  ctx.fillText('x100', 12, HEIGHT-5);
  ctx.restore();
}

function drawTime() {
  ctx.save();
  ctx.fillStyle = 'white';
  ctx.font = '30px Abadi MT Condensed Light'
  ctx.fillText('t = ' + Math.floor(t * 100), -(WIDTH/2) + 10, HEIGHT/2 - 15);
  ctx.restore();
}

function drawEquation() {
  switch(equation) {
    case 1:
      $('#body-current-equation').html("x = q * cos<sup>f</sup>(w * t)<p>y = e * sin<sup>g</sup>(r * t)</p>");
      $('.a').addClass('hide');
      break;
    case 2:
      $('#body-current-equation').html("x = cos(q * t) - cos<sup>f</sup>(w * t)<p>y = sin(e * t) - sin<sup>g</sup>(r * t)</p>");
      $('.a').addClass('hide');
      break;
    case 3:
      $('#body-current-equation').html("x = f * cos(q * t) - cos(w * t) * sin(e * t)</p><p>y = g * sin(r * t) - sin(a * t)");
      $('.a').removeClass('hide');
      break;
  }
}

// pick a parametric equation
function move(fox) {
  switch(fox) {
    case 1:
      x = Math.floor((q * Math.pow(Math.cos(w * t), f)) * WIDTH/widthStretch);
      y = Math.floor((e * Math.pow(Math.sin(r * t), g)) * HEIGHT/heightStretch);
      break;
    case 2:
      x = Math.floor((Math.cos(q * t) - Math.pow(Math.cos(w * t), f)) * WIDTH/widthStretch);
      y = Math.floor((Math.sin(e * t) - Math.pow(Math.sin(r * t), g)) * HEIGHT/heightStretch);
      break;
    case 3:
      x = Math.floor((f * Math.cos(q * t) - Math.cos(w * t) * Math.sin(e * t)) * WIDTH/widthStretch);
      y = Math.floor((g * Math.sin(r * t) - Math.sin(a * t)) * HEIGHT/heightStretch);
  }
}

// updates variable values in DOM
function updateVars() {
  $('#q').html(Math.round(q * 10) / 10);
  $('#w').html(Math.round(w * 10) / 10);
  $('#e').html(Math.round(e * 10) / 10);
  $('#r').html(Math.round(r * 10) / 10);
  $('#f').html(Math.round(f * 10) / 10);
  $('#g').html(Math.round(g * 10) / 10);
  $('#a').html(Math.round(a * 10) / 10);
  $('#dt').html(Math.round(dt * 10000) / 10000);
  $('#size').html(Math.round(size * 10) / 10);
  if (drawInstantlySwitch) drawInstantly();
}

// key events
document.addEventListener('keydown', function(evt) {
  adjusting = true;
  if(evt.keyCode == 81) q += checkMouse();
  if(evt.keyCode == 87) w += checkMouse();
  if(evt.keyCode == 69) e += checkMouse();
  if(evt.keyCode == 82) r += checkMouse();
  if(evt.keyCode == 70 && equation == 3) f += checkMouse();
  if(evt.keyCode == 71 && equation == 3) g += checkMouse();
  if(evt.keyCode == 84) dt += checkMouse() / 1000;
  if(evt.keyCode == 65) a += checkMouse();
  if(evt.keyCode == 83) size += checkMouse();
  if(evt.keyCode == 68) d += checkMouse();
  if(evt.keyCode == 32 && !drawInstantlySwitch) {
    if (!drawInterval) {
      drawInterval = setInterval(draw, 15);
      $('#refresh').attr('data-state', 'clicked');
    } else {
      clearInterval(drawInterval);
      drawInterval = false;
    }
  }
  if (evt.keyCode == 49) equation = 1; resetEquation(equation);
  if (evt.keyCode == 50) equation = 2; resetEquation(equation);
  if (evt.keyCode == 51) equation = 3; resetEquation(equation);
  if (size < 0) size = 0;
  updateVars();
});

function resetEquation(num) {
  $('.toggle').removeClass('active');
  $('#toggle' + num).addClass('active');
}

// controls how fast hotkey scrolling works
function checkMouse() {
  return (ystartmouse - ymouse) / 3000;
}

document.addEventListener('keyup', function(evt) {
  adjusting = false;
  ystartmouse = ymouse;
});

// mouse events
$(window).mousemove(function(e) {
  dxmouse = (xmouse - e.clientX != 0) ? xmouse - e.clientX : dxmouse;
  dymouse = (ymouse - e.clientY != 0) ? ymouse - e.clientY : dymouse;
  xmouse = e.clientX;
  ymouse = e.clientY;
  if (!adjusting && !dragging) {
    ystartmouse = ymouse;
  } else if (dragging && Math.abs(ystartmouse - ymouse) > 1) {
      if (liveVariable != 'dt') {
        window[liveVariable] += Math.floor((ystartmouse - ymouse) / 2);
        if (size < 0) size = 0;
      } else {
        window[liveVariable] += (ystartmouse - ymouse) / 30000;
        if (dt < 0.00005 && dt > -0.00005) dt = 0;
      }
      ystartmouse = ymouse;
      updateVars();
  }
});

function randomColor() {
  var color = "rgba(";
  for (var i = 0; i < 3; i++) {
    var colorValue = Math.floor(Math.random()*256);
    color += colorValue + ',';
  }
  return color;
}

function resetCanvas() {
  clearInterval(drawInterval);
  drawInterval = false;
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  t = 0;
  drawTime();
  drawx100();
}

$(document).ready(function() {
  var window_height = $(window).height();
  var window_width = $(window).width();
  if (typeof(window_height) == 'number' && (window_height + 400) < window_width) {
    $('#canvas-container').css('width', window_height - 20);
    $('#canvas-container').css('height', window_height - 20);
    $('#canvas').attr('width', window_height - 20);
    $('#canvas').attr('height', window_height - 20);
    $('#cc').css('left', window_height - 5);
    $('#help').css('left', window_height + 110);
  } else {
    $('#canvas-container').css('width', window_width - 500);
    $('#canvas-container').css('height', window_width - 500);
    $('#canvas').attr('width', window_width - 500);
    $('#canvas').attr('height', window_width - 500);
    $('#cc').css('left', 5);
    $('#help').css('left', 120);
  }

  $('.variableValue').mouseenter(function() {
    varHover = true;
    $('body').css('cursor', 'row-resize');
  });

  $('.variableValue').mouseleave(function() {
    varHover = false;
    if (!adjusting) $('body').css('cursor', 'default');
  });

  $('.variableValue').mousedown(function() {
    ystartmouse = ymouse;
    liveVariable = ($(this).attr('id'));
    dragging = true;
  });

  $(window).mouseup(function() {
    dragging = false;
  })

  $("#refresh").click(function() {
    if ($(this).attr('data-state')=='clicked') {
      resetCanvas();
      $(this).attr('data-state','notclicked');
    } else {
      drawInterval = setInterval(draw, 15);
      $(this).attr('data-state','clicked');
    }
  });

  $('.toggle').click(function() {
    $('.toggle').removeClass('active');
    $(this).toggleClass('active');
    equation = parseInt($(this).text());
    drawEquation(equation);
    if (drawInstantlySwitch) drawInstantly();
  });

  $('.wstretch').click(function() {
    if ($(this).text() == '-') {
      widthStretch += 1;
    } else {
      widthStretch -= 1;
    }
    updateVars();
    if (!drawInstantlySwitch) {
      resetCanvas();
      drawInterval = setInterval(draw, 15);
    }
  });

  $('.hstretch').click(function() {
    if ($(this).text() == '-') {
      heightStretch += 1;
    } else {
      heightStretch -= 1;
    }
    updateVars();
    if (!drawInstantlySwitch) {
      resetCanvas();
      drawInterval = setInterval(draw, 15);
    }
  });

  $("#di").prop("checked", false);

  $('#di').click(function() {
    clearInterval(drawInterval);
    drawInstantlySwitch = !drawInstantlySwitch;
    $('#refresh').toggleClass('hide');
    if (drawInstantlySwitch) {
      drawInstantly();
    } else {
      resetCanvas();
      drawInterval = setInterval(draw, 15);
      $(this).attr('data-state','clicked');
    }
  });

  $('#reset').click(function() {
    q = 1;
    w = 1;
    e = 1;
    r = 1;
    f = 1;
    g = 1;
    a = 1;
    dt = 0.0015;
    size = 1;
    updateVars();
    widthStretch = 5;
    heightStretch = 8;
  })

  $('#info').click(function() {
    $('#cc').fadeToggle();
    $('#help').fadeToggle();
  })
});
