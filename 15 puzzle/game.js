var w = 125;
var grid = [[],[],[],[],[],[]];
var testGrid = [[],[],[],[],[],[]];
var width = 500;
var sprites = [];


var game = {
    cntx: undefined,
    image: undefined,

    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    },    

    init(){
        var canvas = document.getElementById("mycanv");
        this.cntx = canvas.getContext("2d");
        
        canvas.addEventListener("click", (evt) => {
            var pos = this.getMousePos(canvas, evt);

            var x = Math.floor(pos.x/w)+1;
            var y = Math.floor(pos.y/w)+1;

            //console.log(x,y);

            var dx = 0; var dy = 0;

            if (grid[y+1][x]==15) {dy=1; dx=0;}
            if (grid[y][x+1]==15) {dy=0; dx=1;}
            if (grid[y-1][x]==15) {dy=-1; dx=0;}
            if (grid[y][x-1]==15) {dy=0; dx=-1;}

            var n = grid[y][x];
            grid[y][x] = grid[y+dy][x+dx];
            grid[y+dy][x+dx] = n;
        });
    },

    load(){
        this.image = new Image();
        this.image.src = "images/image.png";
    },

    getSumm(){
        var summ = 0;
        var input = 0;
        var checkList = [];
        var row = 0;
        
        for (var i=1;i<=4;i++)
        for (var j=1;j<=4;j++){
            input = grid[i][j];
            if (input != 15) {
                var count = 0;
                checkList.forEach((key) => {
                    if (input>key) count++;
                });
                
                summ += input - count;

                //console.log("input = "+input+" count = "+count+" summ = "+summ);
                checkList.push(input);
            }
            else {
                row = i;
            }
        }

        summ += row;

        //console.log(summ);
        
        return summ;
    },

    randomInt(high) {
        return Math.floor(Math.random() * Date.now()) % high;
    },

    create(){
        do{
        var testarr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        var n = 0;
        var r = 16;
        for (var i=1;i<=4;i++)
        for (var j=1;j<=4;j++){
            testGrid[i][j]=n;
            
            var rand = this.randomInt(r);
            grid[i][j]=testarr[rand];
            testarr.splice(rand, 1);
            //console.log(rand);

            sprites.push({
                x: w*(j-1),
                y: w*(i-1),
            });
            r--;
            n++;
            }
        }while(this.getSumm()%2);
        
        
    
    },
    

    render(){
        //d++;
        this.cntx.clearRect(0,0,width,width);
        for (var i=1;i<=4;i++){
            for (var j=1;j<=4;j++){
                var n = grid[i][j];
                this.cntx.drawImage(this.image, sprites[n].x, sprites[n].y, w, w,
                    (j-1)*w, (i-1)*w, w-1, w-1);
                //if (n == 15) this.cntx.clearRect((j-1)*w, (i-1)*w, w-1, w-1);
            }
        }

        if (this.equal()) {
            this.cntx.drawImage(this.image, 0, 0);
            alert("You won!!!");
            this.create();
        }

    },

    equal(){
        var k = 0;
        for (var i=1;i<=4;i++)
        for (var j=1;j<=4;j++){
            if (grid[i][j]==testGrid[i][j]) k++;
        }
        return k == 16;
    },

    run(){
        this.render();

        window.requestAnimationFrame(function(){
            game.run();
        })
    },

    start(){
        this.create();
        this.init();
        this.load();
        this.run();
    },
}

window.addEventListener("load", function(){
    game.start();
})