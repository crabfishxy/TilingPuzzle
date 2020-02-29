import ReadFile from './Utils/ReadFile.js';
import CoverArray from './Domains/CoverArray.js';
import LinkArray from './Domains/LinkArray.js'
import TilingPuzzle from './Domains/TilingPuzzle.js';
const inputFile = document.getElementById("tileFile");
inputFile.addEventListener("change", handleFile, false);
const solveBtn = document.getElementById("solve");
solveBtn.addEventListener("click", function(){
    tilingPuzzle.solve(tilingPuzzle.linkArray, true);
    let total = document.getElementById("total");
    let cur = document.getElementById("cur");
    total.innerHTML = tilingPuzzle.result.length;
    cur.innerHTML = 0;
    drawSolution(tilingPuzzle.result[0]);
});
const nextBtn = document.getElementById("next");
nextBtn.addEventListener("click", function(){
    let cur = document.getElementById("cur");
    cur.innerHTML = Number(cur.innerHTML)+1;
    drawSolution(tilingPuzzle.result[Number(cur.innerHTML)]);
});
const prevBtn = document.getElementById("prev");
prevBtn.addEventListener("click", function(){
    let cur = document.getElementById("cur");
    cur.innerHTML = Number(cur.innerHTML)-1;
    drawSolution(tilingPuzzle.result[Number(cur.innerHTML)]);
});

var fileString = "";
var fileContent = [];
var tiles = [];
var result = null;
let tilingPuzzle = null;
var color = ["#FFE082", "#FF8A65", "#AED581", "#81D4FA", "#A1887F"];

function handleFile(){
    const file = this.files[0];
    const fileReader = new FileReader();
    fileReader.onload = event => {
        //console.log(event.target.result);
        fileString = event.target.result;
        let readFile = new ReadFile(fileString);
        tiles = readFile.getTiles();
        let board = readFile.getBoard();
        let coverArray = new CoverArray(tiles, board, true, true);
        let linkArray = new LinkArray(coverArray);
        tilingPuzzle = new TilingPuzzle(readFile, coverArray, linkArray);
        drawBoard(board)
        result = tilingPuzzle.result;
        console.log(result);
    }
    fileReader.onerror = error => reject(error)
    fileReader.readAsText(file)
    
    
}

function drawBoard(board){
    if(board.data[0].length < 5){
        document.getElementById("page").setAttribute("data-size", "5");
    }else if(board.data[0].length > 10){
        document.getElementById("page").setAttribute("data-size", "10");
    }else{
        document.getElementById("page").setAttribute("data-size", ''+board.data[0].length);
    }
    let boardTable = document.getElementById("game");
    boardTable.innerHTML = '';
    let table = document.createElement("table");
    let tbody = document.createElement("tbody");
    for(let i = 0; i < board.data.length; i ++){
        let row = document.createElement("tr");
        for(let j = 0; j < board.data[0].length; j ++){
            if(board.data[i][j] == ' '){
                let block = document.createElement("td");
                block.setAttribute("style", "border:0px");
                block.append(document.createElement("div"));
                row.append(block);
            }else{
                let block = document.createElement("td");
                block.append(document.createElement("div"));
                block.setAttribute("bgcolor", "#C0C0C0")
                block.setAttribute("data-combo", "10");
                block.setAttribute("data-status", "1");
                row.append(block);
            }
        }
        tbody.append(row);
    }
    table.append(tbody);
    boardTable.append(table);
}

function drawSolution(solution){
    console.log("Solution:");
    console.log(solution);
    var randomColor = require('randomcolor'); // import the script
    var colorNum = tiles.length;
    var oldLength = color.length
    if(oldLength < tiles.length){
        for(let i = 0; i < oldLength; i ++){
            var count = Math.ceil(colorNum*1.0 / oldLength);
            var colorArray = randomColor({
                count: count,
                hue: color[i]
             });
             color.push.apply(color, colorArray);
        }
        shuffle(color);            
    }
    let boardTable = document.getElementById("game");
    boardTable.innerHTML = '';
    let table = document.createElement("table");
    let tbody = document.createElement("tbody");
    for(let i = 0; i < solution.length; i ++){
        let row = document.createElement("tr");
        for(let j = 0; j < solution[0].length; j ++){
            if(solution[i][j] === ' '){
                console.log(solution[i][j])
                let block = document.createElement("td");
                block.setAttribute("style", "border:0px");
                block.append(document.createElement("div"));
                row.append(block);
            }else{
                console.log(solution[i][j]);
                let block = document.createElement("td");
                block.append(document.createElement("div"));
                block.setAttribute("bgcolor", color[solution[i][j]])
                block.setAttribute("data-combo", "10");
                block.setAttribute("data-status", "1");
                row.append(block);
            }
        }
        tbody.append(row);
    }
    table.append(tbody);
    boardTable.append(table);
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
