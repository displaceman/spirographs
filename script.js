'use strict'
let sW = window.innerWidth
let sH = window.innerHeight
let pg
let углы = []
let сдвиг_углов = []
let длины_сегментов = []
let количество_сегментов = 12 
let диапазон_сдвига_углов = 0.005
let диапазон_длины_сегментов = 80
let ширина_ленточки = 80
let влияние_времени = 0.01
let скорость_воспроизведения = 500
for (let i = 0; i < количество_сегментов; i++) {
  углы.push(Math.random()*Math.PI*2)
  длины_сегментов.push(Math.random()*диапазон_длины_сегментов)
  сдвиг_углов.push((Math.random()-0.5)*диапазон_сдвига_углов)
}
function col(n){
  return int((sin(n)*0.5+0.5)*255)
}
function setup() {
  let n = Math.max(windowWidth, windowHeight)
  createCanvas(n, n)
  frameRate(60) 
  pixelDensity(1) 
  noStroke() 
  n = Math.max(screen.width, screen.height)
  pg = createGraphics(n, n, P2D) 

  pg.background(255)
  pg.strokeWeight(1)
}

function draw() {
  for (let i = 0; i < скорость_воспроизведения; i++) {
    let a = [pg.width/2, pg.height/2]
    for (let i = 0; i < количество_сегментов; i++) {
      a = [a[0]+Math.sin(углы[i])*длины_сегментов[i], a[1]+Math.cos(углы[i])*длины_сегментов[i]]
      углы[i] += сдвиг_углов[i]
    }
    let old_a = [a[0]+Math.sin(углы[углы.length-1])*ширина_ленточки, a[1]+Math.cos(углы[углы.length-1])*ширина_ленточки]
    let f = frameCount * влияние_времени
    let r = col(углы[углы.length-1]+f)
    let g = col(углы[углы.length-2]+f)
    let b = col(углы[углы.length-3]+f)
    pg.stroke(r,g,b);
    pg.line(a[0], a[1], old_a[0], old_a[1]);
  }

  image(pg, 0, 0, width, height);
}


function windowResized() {
  let n = Math.max(windowWidth, windowHeight)
  resizeCanvas(n, n)

}

window.onclick = function onclick() {
  углы = []
  сдвиг_углов = []
  длины_сегментов = []
  for (let i = 0; i < количество_сегментов; i++) {
    углы.push(Math.random()*Math.PI*2)
    длины_сегментов.push(Math.random()*диапазон_длины_сегментов)
    сдвиг_углов.push((Math.random()-0.5)*диапазон_сдвига_углов)
  }
  pg.background(255)
}