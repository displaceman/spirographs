'use strict'

const sW = 800
const sH = 800
const sD = 800
const size = sH/8
let pg

function setup() {
  createCanvas(windowHeight, windowHeight)
  pg = createGraphics(sW, sH, WEBGL) // Используйте этот класс, если вам нужно рисовать в внеэкранном графическом буфере.

  pixelDensity(1) // масштабирование пикселей для дисплеев с высокой плотностью пикселей
  noCursor() // Скрывает курсор
  frameRate(60) // количество кадров в секунду

  noStroke() // Отключает рисование обводки (контура)
  fill(0, 15) // задает цвет
  background(100) // цвет фона

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      pg.fill(float(int((x%2==0)+(y%2==1)==1))*150+50);
      pg.rect(x*size-sW*.5, y*size-sH*.5, size, size);
    }
  }
  
}

function draw() {
  image(pg, 0, 0, width, height)
}

function windowResized() {
  resizeCanvas(windowHeight, windowHeight)
}
