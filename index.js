let fractal_index = -1; // start before first fractal
let fractal;

function setup(){
    createCanvas(windowWidth, windowHeight);
    stroke(255);
    noFill();
    rectMode(CORNER);
    get_next_fractal();
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    draw();
}

function keyPressed(){
    switch(keyCode){
        case 32: // space
            get_next_fractal();
            draw();
            break;
    }
}

function draw(){
    translate(windowWidth / 2, windowHeight / 2);
    background(0);
    fractal.draw();
}

function get_next_fractal(){
    fractal_index += 1;
    if(fractal_index >= fractals.length)
        fractal_index = 0;
    fractal = new fractals[fractal_index]();
}
