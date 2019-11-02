const heart = [];
let button;
let a = 0;
var done = false;
let myFont;

function preload() {
    myFont = loadFont('assets/Cheri.TTF')
}

function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    translate(width / 2, height / 2);

    stroke(255);
    strokeWeight(2);
    fill(241, 82, 255);
    beginShape();
    for (let v of heart) {
        vertex(v.x, v.y);
    }
    endShape();
    const r = height / 40;
    const x = r * 16 * pow(sin(a), 3);
    const y = -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));
    heart.push(createVector(x, y));

    // So that it stops
    if (a > TWO_PI) {
        noLoop();
        done = true;
    }

    a += 0.01; //to change the time-span

    if(done == true) {
        fill(255);
        textSize(90)
        fill(96, 255, 82)
        textFont(myFont);
        text('I Love You', -215, 40);
    }
}