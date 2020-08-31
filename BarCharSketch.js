windowWidth = 400;
windowHeight = 500;
var months;
var dict={};
var rightMargin;
var leftMargin;
var date = {1 : "January", 2 : "Febuary", 3 : "March", 4 : "April", 5 : "May", 6 : "June", 7 : "July", 8 : "August", 9 : "September", 10 : "October", 11 : "November", 12 : "December"}
function preload() {
  table = loadTable("airlines.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  numberOfRows = table.getRowCount();
  numberOfColumns = table.getColumnCount();
  months = table.getColumn("Time.Month Name");
  for(var i = 0; i < numberOfRows;i++)
  {
    if(!(months[i] in dict))
      dict[months[i]] = table.getNum(i,"Statistics.Flights.Total");
    else
      dict[months[i]] += table.getNum(i,"Statistics.Flights.Total");
  }
  print(dict);
  maxValue=max(Object.values(dict))/10000;
  console.log(maxValue);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  background(220);
  for (var i = 1; i < 13 ; i++) {
    fill(0);h
    textSize(14);
    textAlign(CENTER);
    text(date[i], i * 70 + 120, maxValue+120);
    fill(255,0,0,127);
    rect(i * 70 +100, maxValue +100 - dict[date[i]]/10000, 50, dict[date[i]]/10000);
  }
  leftMargin = 130;
  rightMargin = 1050;
  fill(0);
  for (var k=0;k<maxValue+100;k=k+50){
    textSize(12);
    text(k*1000,90,maxValue + 100 -k);
    if(k!=0)
      Sline(leftMargin - 5, maxValue+100 - k, leftMargin+5, maxValue+100 -k);
  }
  line(leftMargin,maxValue+100, rightMargin, maxValue+100);
  triangle(rightMargin, maxValue+90, rightMargin, maxValue+110, rightMargin+10, maxValue+100);
  line(leftMargin,20, leftMargin, maxValue+100);
  triangle(leftMargin-10, 20, leftMargin+10, 20, leftMargin, 10);
  text("Months", 510, maxValue + 150);
  text("Flights", 20, maxValue/2);
  text("In", 30, maxValue/2 + 20);
  text("Total", 25, maxValue/2 + 40);
  line(40, maxValue/2 - 70, 40, maxValue/2 - 20);
  triangle(30, maxValue/2 - 70, 50, maxValue/2 - 70, 40, maxValue/2 - 80);
  line(560, maxValue+150, 630, maxValue+150);
  triangle(630, maxValue+140, 630, maxValue+160, 640, maxValue+150);
  textSize(20);
  text("Total Number of Flight per month", 950/2 + 150,40);

}