windowWidth = 400;
windowHeight = 500;
var years;
var dict={};
var dates = {1 : "January", 2 : "Febuary", 3 : "March", 4 : "April", 5 : "May", 6 : "June", 7 : "July", 8 : "August", 9 : "September", 10 : "October", 11 : "November", 12 : "December"}
var datesShort = {1 : "Jan", 2 : "Feb", 3 : "Mar", 4 : "Apr", 5 : "May", 6 : "Jun", 7 : "Jul", 8 : "Aug", 9 : "Sept", 10 : "Oct", 11 : "Nov", 12 : "Dec"}
var maxValue;
var minValue;
var delayedmins;
var airportCodes;
var bottomMargin;
var year;
var airportCode = ["ATL","DFW","IAH","JFK", "LAX", "MIA"];

function preload() {
    table = loadTable("airlines.csv", "csv", "header");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    numberOfRows = table.getRowCount();
    numberOfColumns = table.getColumnCount();
    months = table.getColumn("Time.Month Name");
    airportCodes = table.getColumn("Airport.Code");
    delayedmins = table.getColumn("Statistics.Minutes Delayed.Weather");
    year = table.getColumn("Time.Year");
    for(var i = 0; i < numberOfRows;i++)
    {
        if(airportCode.includes(airportCodes[i]) && year[i] == 2009) {
            if(!(airportCodes[i] in dict))
                dict[airportCodes[i]] = {};
            if(!(months[i] in dict[airportCodes[i]]))
                dict[airportCodes[i]][months[i]] = Number(delayedmins[i]);
            else
                dict[airportCodes[i]][months[i]] += Number(delayedmins[i]);
        }

    }
    maxValue = 0;
    minValue = 1000000000;
    Object.values(dict).forEach( (i,v) => {
        maxValue = max(max(Object.values(i)), maxValue);
        minValue = min(min(Object.values(i)), minValue);
    });

}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(220);
    fill(0);
    bottomMargin  = 0;
    airportCode.forEach((i,idx)=> {
        textSize(12);
        text(i,150,idx*50 + 135);
        bottomMargin = max(bottomMargin, idx*50+50);
    });

    Object.values(datesShort).forEach((i,idx)=>{
        textSize(12);
        text(i, idx*50 + 190, bottomMargin+125);
    });
    var to =  color(255,153,51) ;
    var from = color(51,0,102);

    for(var i = airportCode.length - 1;i >= 0 ; i--)
    {
        for(var j = 1; j < 13; j++)
        {
            let airports = dict[airportCode[i]][dates[j]];
            stroke(255, 255, 255);
            let interA = lerpColor(from, to, airports/(maxValue - minValue));
            fill(interA);
            square(j*50 + 130, bottomMargin - i*50 + 50, 50);
        }
    }
    setGradient(15*50 + 190, 130, 30, 200 , from , to);
    fill(0);
    text(maxValue,15*50 + 150, 140);
    text(minValue,15*50 + 160, 330);
    text("Delay", 15*50 + 170, 120);
    stroke(0);
    strokeWeight(0.7);
    textSize(18);
    text("Total Minutes Delayed due to weather in the year 2009 across 6 cities", 190, 70);
    text("Months",9*50, bottomMargin+150);

}

function setGradient(x1, y1, x2, y2,c1, c2) {
    noFill();
    for (var y = y1; y <= y1+y2 ; y++) {
        var inter = map(y, y1, y2+y1, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x1, y, x1+x2, y);
    }
    stroke(0);
    strokeWeight(0.7);
}
