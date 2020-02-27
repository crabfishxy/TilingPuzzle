import Node from "./Node";
import ColumnNode from "./ColumnNode";

export default class LinkArray{
    constructor(ca){
        this.coverArray = ca.coverArray;
        this.tileNum = ca.tileNum;
        this.columnNodes = [];
        this.nodes = [];
        for(let i = 0; i < ca.rowNum; i ++){
            this.nodes.push(new Array(ca.columnNum));
        }

        this.h = new ColumnNode();
        for(let i = 0; i < ca.columnNum; i ++){
            let columnNode = new ColumnNode();
            columnNode.down = columnNode;
            columnNode.up = columnNode;
            columnNode.row = -1;
            columnNode.col = i;
            if(i == 0){
                columnNode.left = this.h;
                this.h.right = columnNode;
            }else if(i != ca.columnNum - 1){
                columnNode.left = this.columnNodes[i-1];
                this.columnNodes[i-1].right = columnNode;
            }else{
                this.columnNodes[i-1].right = columnNode;
                columnNode.left = this.columnNodes[i-1];
                columnNode.right = this.h;
                this.h.left = columnNode;
            }
            this.columnNodes.push(columnNode);
        }
        for(let i = 0; i < ca.columnNum; i ++){
            let size = 0;
            for(let j = 0; j < ca.rowNum; j ++){
                if(ca.coverArray[j][i] == 1){
                    let n = new Node();
                    this.nodes[j][i] = n;
                    n.row = j;
                    n.col = i;
                    size ++;
                }else{
                    this.nodes[j][i] = null;
                }
            }
            this.columnNodes[i].size = size;
        }
        for(let i = 0; i < ca.rowNum; i ++){
            let prev = null;
            let head = null;
            for(let j = 0; j < ca.columnNum; j ++){
                if(this.nodes[i][j] == null)continue;
                let cur = this.nodes[i][j];
                if(head == null){
                    head = cur;
                    prev = cur;
                }else{
                    cur.left = prev;
                    prev.right = cur;
                    prev = cur;
                }
            }
            prev.right = head;
            head.left = prev;
        }

        for(let i = 0; i < ca.columnNum; i ++){
            let prev = null;
            let head = this.columnNodes[i];
            let cur = head;
            for(let j = 0; j < ca.rowNum; j ++){
                if(this.nodes[j][i] == null)continue;
                cur = this.nodes[j][i];
                cur.head = head;
                if(prev == null){
                    cur.up = head;
                    head.down = cur;
                }else{
                    cur.up = prev;
                    prev.down = cur;
                }
                prev = cur;
            }
            cur.down = head;
            head.up = cur;
        }
    }
}