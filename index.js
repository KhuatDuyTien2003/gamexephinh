
for(let r = 0; r < col; r++){
    board[r] = [];
    for(let c =  0; c < row; c++){
        board[r][c] = COLOR;
    }
}
// document.getElementById("startGame").play();
function setBackgroud() {
    
    document.getElementById("canvas").style.backgroundImage = "url(" + backgroud[index].src + ")";
    index++;
    if (index == 4) {
        index = 0;
    }
    setTimeout(setBackgroud, 2000)
}
setBackgroud();
function drawSquare(x,y,color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x*sq, y*sq, sq, sq)
    ctx.strokeStyle = "#ccc"
    ctx.strokeRect(x*sq, y*sq, sq, sq)
}

function drawBoard(){
    for(let r = 0; r < col; r++){
        for(let c =  0; c < row; c++){
            drawSquare(r,c,board[r][c]);
        }
    }
}

class Shape{
    square 
    color
    constructor(square, color){
        this.square = square
        this.color = color
        this.gocquay = Math.floor(Math.random()*4)
        this.squareN = this.square[this.gocquay]
        this.x = 3
        this.y = -2
    }
    fill(color){
        for(let r = 0; r < this.squareN.length; r++){
            for(let c =  0; c < this.squareN.length; c++){
                if(this.squareN[r][c]){
                    drawSquare(this.x + c, this.y + r, color);
                }
                 
            }
        }
    }
    draw(){
        document.getElementById("score").innerHTML = score
        drawBoard()
        this.fill(this.color)
    } 
    unDraw(){
        this.fill(COLOR)
    }
    moveDown(){
        if(!this.checkCollide(0,1,this.squareN)){
            this.unDraw();
            this.y++;
            this.draw();
        }
        else{
            this.lockShape();
            shape1 = randomSquare()
        }
        
    }
    moveLeft(){
        if(!this.checkCollide(-1,0,this.squareN)){
            this.unDraw();
            this.x--;
            this.draw();
        }
        
    }
    moveRight(){
        if(!this.checkCollide(1,0,this.squareN)){
            this.unDraw();
            this.x++;
            this.draw();
        }
        
     }
    changeShape(){
        
        let check = 0;
        let a = this.square[(this.gocquay + 1)% this.square.length];
        if(this.checkCollide(0,0,a) ){
            if(this.x > 10){
                check = 0
            }
            else
            {
                check = 1
            }
        }
        if(!this.checkCollide(1,0,a)){
            this.unDraw();
            this.x+=check;
            this.gocquay = (this.gocquay +1 ) % this.square.length;
            this.squareN = this.square[this.gocquay]
            this.draw();
        }
         
        
    }
    checkCollide(x,y, shape){
        for(let r = 0; r < shape.length; r++){
            for(let c = 0; c < shape.length; c++){
                if(!shape[r][c]){
                    continue
                }
                   let newX = this.x + c + x;
                    let newY = this.y + r + y;
                if(newX < 0 || newX > col-1 || newY >= row){
                    return true
                }
                if(newY < 0){
                    continue
                }
                if(board[newX][newY] != COLOR){
                    return true
                }
            }
             
        }  
        return false
    }
    lockShape(){
        for(let r = 0; r < this.squareN.length; r++){
            
            for(let c = 0; c < this.squareN.length; c++){
                if(!this.squareN[r][c]){
                    continue
                }
                if(this.y + r < 0){
                    document.getElementById("loseGame").play(1);
                    gameOver = true
                    clearInterval(interval)
                    let a = document.getElementById("an")
                    document.getElementById("an").innerHTML = "<h1>Game Over</h1>"+
                    "<h3>Điểm bạn đạt được: <span id='score'>"+score+"</span></h3>"+
                    "<button onclick = 'Reset()'>Chơi lại</button>"+
                    "<button onclick = 'Out()'>Thoát</button>"
                    a.setAttribute("class", "report")
                    break;
                }  
               board[this.x+c][this.y+r] = this.color
               
                
            }
        }
         for(let r = 0; r < row; r++){
            let  isFull = true
           for(let c = 0; c < col; c++){
                isFull = isFull && (board[c][r] != COLOR) 
            }
            if(isFull){
                for(let i = r; i > 1; i--)
                   for(let c = 0; c < col; c++){
                        board[c][i] = board[c][i-1];
                        document.getElementById("winGame").play();
                        
                        
                    }
                
                for(let c = 0; c < col; c++){
                 board[0][c] = COLOR
                 
                }   

                score += 10;
                document.getElementById("score").innerHTML = score
            }
            
        }
        drawBoard();
        
    }
    
}
const Square = [T,L,I,O,Z,J]

function randomSquare(){
    let radom = Math.floor(Math.random()*6);
    let radomColor1 = Math.floor(Math.random()*224);
    let radomColor2 = Math.floor(Math.random()*224);
    let radomColor3 = Math.floor(Math.random()*224);
    return new Shape(Square[radom], "rgb("+radomColor1+","+radomColor2+","+radomColor3+")")
}
let shape1 = randomSquare();
let gameOver = false;
let interval
function moveDown(){
    shape1.moveDown()
}
function Start(){
    drawBoard();
    shape1 = randomSquare();
    document.getElementById("startGame").pause();
    interval = setInterval(moveDown,1000);
}
function moveSelection(evt){
    switch(evt.keyCode){
        case 37:{
            shape1.moveLeft();
            document.getElementById("moveG").play();
            break;
        }
        case 38:{
            shape1.changeShape();
            document.getElementById("moveG").play();
            break;
        }
        case 39:{
            shape1.moveRight();
            document.getElementById("moveG").play();
            break;
        }
        case 40:{
            shape1.moveDown();
            document.getElementById("moveG").play();
            break;
        }
    }
}
function Reset(){
    for(let r = 0; r < col; r++){
        board[r] = [];
        for(let c =  0; c < row; c++){
            board[r][c] = COLOR;
        }
    }
    drawBoard();
    document.getElementById("an").setAttribute("class", "");
    score = 0;
    shape1 = randomSquare();
    document.getElementById("an").innerHTML = ""
    document.getElementById("score").innerHTML = score
}
function Stop() {
    clearInterval(interval)
    let a = document.getElementById("an")
    document.getElementById("an").innerHTML = "<h1>Tạm Dừng</h1>" +
        "<h3>Điểm bạn đạt được: <span id='score'>" + score + "</span></h3>" +
        "<button onclick = 'Reset()'>Chơi lại</button>" +
        "<button onclick = 'Out()'>Thoát</button>"+
        "<button id = 'continue' onclick = 'Continue()'>Chơi Tiếp</button>"
    a.setAttribute("class", "report")
}
function Continue(){
    interval = setInterval(moveDown,1000);
    document.getElementById("an").setAttribute("class", "")
    document.getElementById("an").innerHTML = ""
}
function Out(){
    let a = document.getElementById("an")
    document.getElementById("an").innerHTML = "<h1>Bạn chắc chắn muốn thoát trò chơi???</h1>" +
        "<button onclick = 'Out1()'>Thoát</button>" +
        "<button onclick = 'Stop()'>Ở lại</button>"
    a.setAttribute("class", "report")
}
function Out1(){
    location.assign("https://www.google.com.vn/?hl=vi")
}



window.addEventListener("keydown",moveSelection);


