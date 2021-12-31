function setup(){
    createCanvas(windowWidth, windowHeight);
    noLoop();
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    draw();
}

function draw(){
    background(0);
}
