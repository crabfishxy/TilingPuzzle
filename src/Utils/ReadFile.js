import Tile from '../Domains/Tile.js';
export default class ReadFile{

    constructor(fileString){
        this.fileContent = [];
        this.leftMost = Number.MAX_SAFE_INTEGER;
        this.upMost = Number.MAX_SAFE_INTEGER;
        this.rightMost = Number.MIN_SAFE_INTEGER;
        this.downMost = Number.MIN_SAFE_INTEGER;
        this.tiles = [];
        this.board = null;
        console.log(fileString);
        var arrayOfLines = fileString.split(/\r?\n/);
        var maxLength = 0;
        for(let i = 0; i < arrayOfLines.length; i ++){
            if(arrayOfLines[i].length > maxLength)maxLength = arrayOfLines[i].length;
        }
        for(let i = 0; i < arrayOfLines.length; i ++){
            arrayOfLines[i] = arrayOfLines[i] + " ".repeat(maxLength-arrayOfLines[i].length);
        }
        console.log(arrayOfLines);
        for(let i = 0; i < arrayOfLines.length; i ++){
            this.fileContent.push(new Array(maxLength));
            for(let j = 0; j < maxLength; j ++){
                this.fileContent[i][j] = arrayOfLines[i].charAt(j);
            }
        }
        let row = arrayOfLines.length;
        let col = maxLength;
        let visited = [];
        for(var i=0; i<9; i++) {
            visited[i] = [];
            for(var j=0; j<9; j++) {
                visited[i][j] = false;
            }
        }
        for(let i = 0; i < row; i ++)visited.push(new Array(col));
        console.log(this.fileContent);
        for(let i = 0; i < row; i ++){
            for(let j = 0; j < col; j ++){
                if(this.fileContent[i][j] == ' '){
                    visited[i][j] = true;
                    continue;                    
                }else{
                    if(!visited[i][j]){
                        this.find(this.fileContent, visited, i, j);
                        let width = this.rightMost - this.leftMost+1;
                        let height = this.downMost - this.upMost +1;
                        let data = [];
                        for(let ii = 0; ii < height; ii ++){
                            data.push(new Array(width));
                            for(let jj = 0; jj < width; jj ++){
                                data[ii][jj] = this.fileContent[this.upMost+ii][this.leftMost+jj];
                            }
                        }
                        console.log(data);
                        var t = new Tile(data);
                        this.tiles.push(t);
                        this.leftMost = Number.MAX_SAFE_INTEGER;
                        this.upMost = Number.MAX_SAFE_INTEGER;
                        this.rightMost = Number.MIN_SAFE_INTEGER;
                        this.downMost = Number.MIN_SAFE_INTEGER;
                    }
                }
            }
        }
        let index = 0;
        let maxArea = 0;
        for(let i = 0; i < this.tiles.length; i ++){
            if(this.tiles[i].getArea() > maxArea){
                maxArea = this.tiles[i].getArea();
                index = i;
            }
        }
        this.board = this.tiles[index];
        this.tiles.splice(index, 1);
        console.log("tiles:")
        for(let i = 0; i < this.tiles.length; i ++){
            console.log(this.tiles[i].allDataArrays);
        }
    }

    find(a, visited, i, j){
        if(i < 0 || j < 0 || i >= a.length || j >= a[0].length || visited[i][j])return;
        if(a[i][j] == ' ')return;
        if(j > this.rightMost)this.rightMost = j;
        if(j < this.leftMost)this.leftMost = j;
        if(i > this.downMost)this.downMost = i;
        if(i < this.upMost)this.upMost = i;
        visited[i][j] = true;
        this.find(a, visited, i-1, j);
        this.find(a, visited, i+1, j);
        this.find(a, visited, i, j-1);
        this.find(a, visited, i, j+1);
    }

    getTiles(){
        return this.tiles;
    }

    getBoard(){
        return this.board;
    }
}
