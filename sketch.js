let players=['X', 'O'];
let human='O';
let ai='X';
let positionOccupied=0;

let board=[
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

let available=[];
let currentPlayer, count=0;

function setup() {
    createCanvas(500, 400);
    frameRate(4);
    currentPlayer=human;
    // nextTurn();
}

function nextTurn(){
    available=[];
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[i].length;j++){
            if(board[i][j] == ''){
                available.push( { i,j } );
            }
        }
    }
    let move=random(available);
    board[move.i][move.j]=ai;
    currentPlayer=human;
    // mousePressed();
    
}

function mousePressed(){
    if(currentPlayer == human){
        let i=floor(mouseX/w);
        let j=floor(mouseY/h);
        if(board[i][j]==''){
            board[i][j]=human;
            currentPlayer=ai;
            // nextTurn();
        }
    }
    else if(currentPlayer == ai){
        let i=floor(mouseX/w);
        let j=floor(mouseY/h);
        if(board[i][j]==''){
            board[i][j]=ai;
            currentPlayer=human;
            // nextTurn();
        }
    }
    positionOccupied++;
}

function equals3(a, b, c){
    return (a==b && b==c && (a=='X' || a=='O'));
}

function coord(i,j){
    coordinate={ a:(i*w+w/2), b : (j*h+h/2) };
    return coordinate;
}

function checkWinner(){
    for(let i=0;i<3;i++){
        if(equals3(board[i][0], board[i][1], board[i][2]) ){
            line( coord(i,0).a, coord(i,0).b, coord(i,1).a, coord(i,2).b );
            line( coord(i,1).a, coord(i,1).b, coord(i,2).a, coord(i,2).b );
            return board[i][0];
        }
    }

    for(let i=0;i<3;i++){
        if(equals3(board[0][i], board[1][i], board[2][i]) ){
            console.log("jklh");
            line( coord(0,i).a, coord(0,i).b, coord(1,i).a, coord(1,i).b );
            line( coord(1,i).a, coord(1,i).b, coord(2,i).a, coord(2,i).b );
            return board[0][i];
        }
    }
    if(equals3(board[0][0], board[1][1], board[2][2]) ){
        line( coord(0,0).a, coord(0,0).b, coord(1,1).a, coord(1,1).b );
        line( coord(1,1).a, coord(1,1).b, coord(2,2).a, coord(2,2).b );
        return board[0][0];
    }
    if( equals3(board[2][0], board[1][1], board[0][2]) ){
        line( coord(2,0).a, coord(2,0).b, coord(1,1).a, coord(1,1).b );
        line( coord(1,1).a, coord(1,1).b, coord(0,2).a, coord(0,2).b );
        return board[2][0];
    }
    if(positionOccupied==9){
        console.log(9+"tie");
        return "tie";
    }
    return null;
}

function draw() {
   
    w=width/3;
    h=height/3;
    background(89);
    line(w,0,w,height);
    line(w*2,0,w*2,height);
    line(0,h,width,h);
    line(0,2*h,width,2*h);

    strokeWeight(6);

    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[i].length;j++){
            let x=i*w+w/2;
            let y=j*h+h/2;
            let xr=w/4;
            let spot=board[i][j];
            if (spot == 'X'){
                
                line(x-xr,y-xr,x+xr,y+xr);
                line(x-xr,y+xr,x+xr,y-xr);
            }
            else if (spot == 'O'){
                ellipse(x,y, xr*2);
            }
        }
    }
    // console.log(count++);
    console.log(second());
    let winner=null;
    winner=checkWinner();
    if(winner!=null){

        console.log("winner is"+winner);
        noLoop();
    }
    // else{
    //     nextTurn();
    // }
    
}