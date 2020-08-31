windowWidth = 400;
windowHeight = 500;
var years;
var dict={};
var delayedMin;
var maxValue;
var minValue;
var xmargin = 130;
var ymargin = 20;
function preload() {
    table = loadTable("airlines.csv", "csv", "header");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    numberOfRows = table.getRowCount();
    numberOfColumns = table.getColumnCount();
    years = table.getColumn("Time.Year");
    delayedMin = table.getColumn("Statistics.# of Delays.Weather");
    for(var i = 0; i < numberOfRows;i++)
    {
        if(!(years[i] in dict))
            dict[years[i]] = Number(delayedMin[i]);
        else
            dict[years[i]] += Number(delayedMin[i]);
    }
    print(dict);
    maxValue = max(Object.values(dict))/100;
    minValue = min(Object.values(dict))/100;
    console.log(maxValue);
    console.log(minValue);

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(220);
    var keys = Object.keys(dict);
    keys.sort();
    fill(0);

    for (var i = 0; i < keys.length; i++) {
        fill(0);
        textSize(14);
        textAlign(CENTER);
        stroke(0);
        strokeWeight(0.7);
        line((i+1) *70 + 120, maxValue+95, (i+1)*70 + 120, maxValue+105);
        text(keys[i], (i+1) * 70 + 120, maxValue+120);
        stroke(0,30,182);
        strokeWeight(10);
        point((i+1)*70 + 120, maxValue + 100 - dict[keys[i]]/100,0);
        stroke(0);
    }
    fill(0);
    stroke(0);
    strokeWeight(0.7);
    for (var k=0;k<maxValue+100;k=k+50){
        textSize(14);
        text(k,100,maxValue + 100 -k);
        if(k!=0)
            line(125, maxValue +100 -k, 135, maxValue + 100 -k);
    }
    strokeWeight(0.7);
    line(xmargin,maxValue+100, (keys.length+1)*70+120, maxValue+100);
    triangle((keys.length+1)*70+120, maxValue+90, (keys.length+1)*70+120, maxValue+110, (keys.length+1)*70+130, maxValue+100);
    line(xmargin,ymargin, xmargin, maxValue+100);
    triangle(xmargin - 10, ymargin, xmargin+10, ymargin, xmargin, ymargin-10);
    text("Months", ((keys.length)*70+120)/2, maxValue + 150);
    text("Flights", ymargin+10, maxValue/2);
    text("delayed", ymargin+10, maxValue/2 + 20);
    text("due", ymargin+10, maxValue/2 + 40);
    text("to whether", ymargin+15, maxValue/2 + 60);
    line(ymargin+20, maxValue/2 - 70, ymargin+20, maxValue/2 - 20);
    triangle(ymargin+10, maxValue/2 - 70, ymargin+30, maxValue/2 - 70, ymargin+20, maxValue/2 - 80);
    line(((keys.length+1)*70+120)/2, maxValue+150, ((keys.length+1)*70+120)/2 + 70, maxValue+150);
    triangle(((keys.length+1)*70+120)/2+70, maxValue+140,((keys.length+1)*70+120)/2+70, maxValue+160,((keys.length+1)*70+120)/2+80, maxValue+150);
    textSize(20);
    text("Total Number of Flight delayed to weather over the years", 950/2 + 150,40);

}