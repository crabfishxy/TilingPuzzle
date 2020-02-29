import Tile from '../Domains/Tile.js';
export default class TilingPuzzle{
    constructor(readFile, coverArray, linkArray){
        this.board = readFile.board;
        this.tiles = readFile.tiles;
        this.coverArray = coverArray;
        this.linkArray = linkArray;
        this.stack = []
        this.solution = [];
        this.result = [];
        this.level = 0;
        this.endTime = 0;
        this.firstTime = true;
        //this.solve(this.linkArray, true);
    }

    generateSolution(solution){
        let arr = new Array(this.solution.length);
        let copySolution = this.solution.slice(0);
        let res = [];
        for(let i = 0; i < this.board.data.length; i ++){
            res.push(new Array(this.board.data[0].length));
        }
        for(let i = 0; i < res.length; i ++){
            for(let j = 0; j < res[0].length; j ++){
                res[i][j] = ' ';
            }
        }
        for(let i = arr.length-1; i >= 0; i --){
            arr[i] = copySolution.pop(); 
        }
        for(const node of arr){
            let row = this.coverArray.coverArray[node.row];
            let index = 0;
            for(let i = 0; i < this.tiles.length; i ++){
                if(row[i] == 1){
                    index = i;
                    break;
                }
            }
            for(let i = this.tiles.length; i < row.length; i ++){
                if(row[i] == 1){
                    let position = i-this.tiles.length;
                    for(let x = 0; x < this.coverArray.boardidx.length; x++){
                        for(let y = 0; y < this.coverArray.boardidx[0].length; y ++){
                            if(this.coverArray.boardidx[x][y] == position){
                                res[x][y] = index;
                            }
                        }
                    }
                }
            }
        }
        return res;
    }

    putSolution(solution, eliminateDuplicate){
        if(eliminateDuplicate){
            let transformMatrix = new Tile(solution);
            let allData = transformMatrix.allDataArrays;
            for(let i = 0; i < this.result.length; i ++){
                for(let j = 0; j < allData.length; j ++){
                    if(transformMatrix.equalData(this.result[i], allData[j])){
                        return
                    }
                }
            }
        }
        this.result.push(solution);
    }

    solve(linkArray, eliminateDuplicate){
        this.level ++;
        if(linkArray.h.right == linkArray.h || linkArray.h.left.col < linkArray.tileNum){

            let generatedSolution = this.generateSolution(this.solution);
//            printMatrix(generatedSolution);
            this.putSolution(generatedSolution,eliminateDuplicate);
            return;
        }
        let nextColumn = this.findStartColumn(linkArray);
        this.cover(nextColumn);
        for(let nextNode = nextColumn.down; nextNode != nextColumn; nextNode = nextNode.down){
            this.solution.push(nextNode);
            for(let rightNode = nextNode.right; rightNode != nextNode; rightNode = rightNode.right){
                this.cover(rightNode.head);
            }
            this.solve(linkArray,eliminateDuplicate);
            nextNode = this.solution.pop();
            nextColumn = nextNode.head;
            for(let leftNode = nextNode.left; leftNode != nextNode; leftNode = leftNode.left){
                this.uncover(leftNode.head);
            }
        }
        this.uncover(nextColumn);
        this.level --;
    }

    cover(columnNode){
        columnNode.left.right = columnNode.right;
        columnNode.right.left = columnNode.left;
        for(let row = columnNode.down; row != columnNode; row = row.down)
        {
            for(let rightNode = row.right; rightNode != row; rightNode = rightNode.right)
            {
                rightNode.up.down = rightNode.down;
                rightNode.down.up = rightNode.up;
                rightNode.head.size--;
            }
        }        
    }

    uncover(colNode){
        for(let rowNode = colNode.up; rowNode != colNode; rowNode = rowNode.up)
        {
            for(let leftNode = rowNode.left; leftNode != rowNode; leftNode = leftNode.left)
            {
                leftNode.up.down = leftNode;
                leftNode.down.up = leftNode;
                leftNode.head.size ++;
            }
        }
        colNode.right.left = colNode;
        colNode.left.right = colNode;
    }

    findStartColumn(linkArray){
        let head = linkArray.h;
        let minSize = Number.MAX_SAFE_INTEGER;
        let minNode = head;
        let cur = head.right;
        // check area to see if there are extra tiles
        let boardArea = this.board.getArea();
        let total = 0;
        for(let i = 0; i < this.tiles.length; i ++){
            total += this.tiles[i].getArea();
        }
        while(cur != head){
            if(total > boardArea && cur.col < this.tiles.length){
                cur = cur.right;
                continue;
            }
            if(cur.size < minSize){
                minSize = cur.size;
                minNode = cur;
            }
            cur = cur.right;
        }
        return minNode;
    }

    nextNChar(c, n) {
        return String.fromCharCode(c.charCodeAt(0) + n);
    }

}