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
        const canvas = document.getElementById('board');
        const context = canvas.getContext('2d');
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        console.log(context, board.data)
        drawBoard(context, board)
        result = tilingPuzzle.result;
        console.log(result);
    }
    fileReader.onerror = error => reject(error)
    fileReader.readAsText(file)
    
    
}

function drawBoard(context, board){
    context.strokeStyle = "#000000"
    context.fillStyle = '#FF0000';
    for(let i = 0; i < board.data.length; i ++){
        for(let j = 0; j < board.data[0].length; j ++){
            context.strokeRect(70 + 60*j, 180+60*i, 60, 60);
            if(board.data[i][j] != ' '){
                
                context.fillRect(70 + 60*j, 180+60*i, 60, 60);
            }
        }
    }
}
