export default class Tile{
    constructor(t){
        // console.log("construct:")
        // console.log(t)
        this.height = t.length;
        this.width = t[0].length;
        this.data = new Array(this.height);
        this.flipData = new Array(this.height);
        this.spinDataArrays = new Array();
        this.flipDataArrays = new Array();
        this.allDataArrays = new Array();
        this.area = 0;

        for(let i = 0; i < this.height; i ++){
            this.data[i] = new Array(this.width);
            this.flipData[i] = new Array(this.width);
            for(let j = 0; j < this.width; j ++){
                this.data[i][j] = t[i][j];
                this.flipData[i][this.width-1-j] = t[i][j];
                if(t[i][j] != ' ')this.area ++;
            }
        }
        this.spinDataArrays.push(this.data.slice(0));
        this.spinDataArrays.push(this.generateRotate90(this.data));
        this.spinDataArrays.push(this.generateRotate180(this.data));
        this.spinDataArrays.push(this.generateRotate270(this.data));
        this.flipDataArrays.push(this.flipData.slice(0));
        this.flipDataArrays.push(this.generateRotate90(this.flipData));
        this.spinDataArrays.push(this.generateRotate180(this.flipData));
        this.spinDataArrays.push(this.generateRotate270(this.flipData));

        //remove duplicate
        for(let i = 0; i < this.spinDataArrays.length; i ++){
            for(let j = i+1; j < this.spinDataArrays.length; j ++){
                if(this.equalData(this.spinDataArrays[i], this.spinDataArrays[j])){
                    this.spinDataArrays.splice(j, 1);
                    j--;
                }
            }
        }
        // console.log("spin:")
        // console.log(this.spinDataArrays);

        for(let i = 0; i < this.flipDataArrays.length; i ++){
            for(let j = i+1; j < this.flipDataArrays.length; j ++){
                if(this.equalData(this.flipDataArrays[i], this.flipDataArrays[j])){
                    this.flipDataArrays.splice(j, 1);
                    j--;
                }
            }
        }

        for(let i = 0; i < this.flipDataArrays.length; i ++){
            this.allDataArrays.push(this.flipDataArrays[i]);
        }

        for(let i = 0; i < this.spinDataArrays.length; i ++){
            this.allDataArrays.push(this.spinDataArrays[i]);
        }

        for(let i = 0; i < this.allDataArrays.length; i ++){
            for(let j = i+1; j < this.allDataArrays.length; j ++){
                if(this.equalData(this.allDataArrays[i], this.allDataArrays[j])){
                    this.allDataArrays.splice(j, 1);
                    j--;
                }
            }
        }
    }

    getArea(){
        return this.area;
    }

    equal(t){
        if(t.area != this.area) return false;
        if(t.dat.length != this.data.length)return false;
        for(let i = 0; i < this.data.length; i ++){
            if(!this.arraysEqual(data[i], t.data[i]))return false;
        }
        return true;
    }

    equalData(a, b){
        if(a.length != b.length || a[0].length != b[0].length)return false;
        for(let i = 0; i < a.length; i ++){
            if(!this.arraysEqual(a[i], b[i]))return false;
        }
        return true;
    }

    equalSpin(t){
        if(t.area != this.area) return false;
        for(let i = 0; i < this.spinDataArrays.length; i ++){
            if(this.equalData(spinDataArrays[i], t.spinDataArrays[0]))return true;
        }
        return false;
    }

    equalFlip(t){
        if(t.area != this.area) return false;
        for(let i = 0; i < this.flipDataArrays.length; i ++){
            if(this.equalData(flipDataArrays[i], t.flipDataArrays[0]))return true;
        }
        return false;
    }

    arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;
        for (let i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
    }

    generateRotate90(data){
        let res = []
        for(let i = 0; i < this.width; i ++){
            res.push(new Array(this.height));
        }
        for(let i = 0; i < this.height; i ++){
            for(let j = 0; j < this.width; j ++){
                res[j][this.height-i-1] = data[i][j];
            }
        }
        // console.log(data)
        // console.log("rotate90")
        // console.log(res)
        return res;
    }

    generateRotate180(data){
        let res = []
        for(let i = 0; i < this.height; i ++){
            res.push(new Array(this.width));
            for(let j = 0; j < this.width; j ++){
                res[i][j] = data[this.height-i-1][this.width-j-1];
            }
        }
        return res;
    }

    generateRotate270(data){
        let res = []
        for(let i = 0; i < this.width; i ++){
            res.push(new Array(this.height));
        }
        for(let i = 0; i < this.height; i ++){
            for(let j = 0; j < this.width; j ++){
                res[this.width-j-1][i] = data[i][j];
            }
        }
        return res;        
    }
}