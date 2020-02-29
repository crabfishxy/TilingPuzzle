import ReadFile from './Utils/ReadFile.js';
import CoverArray from './Domains/CoverArray.js';
import LinkArray from './Domains/LinkArray.js'
import TilingPuzzle from './Domains/TilingPuzzle.js';
const inputFile = document.getElementById("tileFile");
inputFile.addEventListener("change", handleFile, false);
var fileString = "";
var fileContent = [];
var tiles = [];
var result = null;
var color = ["#FFE082", "#FF8A65", "#AED581", "#81D4FA", "#A1887F"];

function handleFile(){
    const file = this.files[0];
    const fileReader = new FileReader();
    fileReader.onload = event => {
        //console.log(event.target.result);
        fileString = event.target.result;
        let readFile = new ReadFile(fileString);
        let tiles = readFile.getTiles();
        let board = readFile.getBoard();
        let coverArray = new CoverArray(tiles, board, true, true);
        let linkArray = new LinkArray(coverArray);
        let tilingPuzzle = new TilingPuzzle(readFile, coverArray, linkArray);
        drawBoard(board)
        result = tilingPuzzle.result;
        console.log(result);
    }
    fileReader.onerror = error => reject(error)
    fileReader.readAsText(file)
    
    
}

function drawBoard(board){
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
    
}
