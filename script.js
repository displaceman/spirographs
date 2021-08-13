'use strict'

const sW = window.screen.width
const sH = window.screen.height
const sD = 800

let pg

let углы = []
let сдвиг_углов = []
let длины_сегментов = []

let количество_сегментов = 12 
let диапазон_сдвига_углов = 0.005
let диапазон_длины_сегментов = 100
let ширина_ленточки = 100
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

  createCanvas(, windowHeight)

  // noCursor() // Скрывает курсор
  frameRate(60) // количество кадров в секунду
  pixelDensity(1) // масштабирование пикселей для дисплеев с высокой плотностью пикселей
  noStroke() // Отключает рисование обводки (контура)

  pg = createGraphics(sW, sH, P2D) // Используйте этот класс, если вам нужно рисовать в внеэкранном графическом буфере.
  pg.background(255) // цвет фона
  pg.strokeWeight(1);

}

// function* range(from, to) {
//   while (from < to) yield from++
// } 

function draw() {
  for (let i = 0; i < скорость_воспроизведения; i++) {
    let a = [sW*0.5, sH*0.5]
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
    pg.line(a[0], a[1], old_a[0], old_a[1]); // для P2D
    // pg.line(a[0]-sW*0.5, a[1]-sH*0.5, old_a[0]-sW*0.5, old_a[1]-sH*0.5); // для WEBGL
  }
  image(pg, 0, 0, width, height)
}

function windowResized() {
  resizeCanvas(windowHeight, windowHeight)
}