
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
                check = -1
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
                    document.getElementById("loseGame").play();
                    alert('Game Over')
                    for(let r = 0; r < col; r++){
                        board[r] = [];
                        for(let c =  0; c < row; c++){
                            board[r][c] = COLOR;
                        }
                    }
                    drawBoard();
                    
                    gameOver = true
                    score = 0
                   
                    
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
window.addEventListener("keydown",moveSelection);


