import Tile from './Tile'
export default class CoverArray {
    constructor(tiles, board, enableSpin, enableSpinFlip){
        let arrays = new Array();
        this.tileNum = tiles.length;
        this.columnNum = board.area + tiles.length;
        this.boardidx = new Array();
        this.buildBoardIdxArray(board);
        for(let i = 0; i < tiles.length; i ++){
            let t = tiles[i];
            if(enableSpinFlip){
                for(let j = 0; j < t.allDataArrays.length; j ++){
                    this.check(t.allDataArrays[j], board.data, arrays, i, tiles.length);
                }
            }else if(enableSpin){
                for(let j = 0; j < t.spinDataArrays.length; j ++){
                    this.check(t.spinDataArrays[j], board.data, arrays, tiles.length);
                }
            }else{
                this.check(t.data, board.data, arrays, i, tiles.length);
            }
        }
        this.coverArray = [];
        for(let i = 0; i < arrays.length; i ++){
            let row = arrays[i];
            this.coverArray.push(new Array(arrays[0].length));
            this.coverArray[i].fill(0);
            for(let j = 0; j < row.length; j ++){
                if(row[j] == 1)this.coverArray[i][j] = 1;
            }
        }
        console.log(this.coverArray);
        this.rowNum = this.coverArray.length;
    }

    buildBoardIdxArray(board){
        let count = 0;
        for(let i = 0; i < board.data.length; i ++){
            this.boardidx.push(new Array(board.data[0].length))
        }
        for(let i = 0; i < board.data.length; i ++){
            for(let j = 0; j < board.data[0].length; j ++){
                if(board.data[i][j] != ' '){
                    this.boardidx[i][j] = count++;
                }else{
                    this.boardidx[i][j] = -1;
                }
            }
        }
    }

    check(data, boardData, arrays, index, tileCount){
        let tileHeight = data.length;
        let boardHeight = boardData.length;
        let tileWidth = data[0].length;
        let boardWidth = boardData[0].length;
        for(let i = 0; i < boardHeight-tileHeight+1; i ++){
            for(let j = 0; j < boardWidth-tileWidth+1; j ++){
                if(this.isValid(data, boardData, i, j)){
                    let curRow = new Array(this.columnNum);
                    curRow.fill(0);
                    curRow[index] = 1;
                    for(let k = 0; k < tileHeight; k ++){
                        for(let l = 0; l < tileWidth; l ++){
                            if(data[k][l] != ' '){
                                curRow[tileCount + this.boardidx[i+k][j+l]] = 1;
                            }
                        }
                    }
                    arrays.push(curRow);
                }
            }
        }
    }

    isValid(data, boardData, x, y){
        let height = data.length;
        let width = data[0].length;
        for(let i = 0; i < height; i ++){
            for(let j = 0; j < width; j ++){
                if(data[i][j] != ' ' && boardData[x+i][y+j] != data[i][j])return false;
            }
        }
        return true; 
    }
}