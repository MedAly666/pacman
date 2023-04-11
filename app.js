'use strict'

//import { Player } from "./classes/Player";

var canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
var ctx = canvas.getContext('2d');

const STEP = 64;
//
var me = new Player(11,5);
var enemies = [];
//
var map;
var score = 0 ;
var gameover = false ;


(function(){
    map = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
        [0,1,2,1,1,2,1,2,1,1,1,1,1,1,1,2,1,2,1,1,2,1,0],
        [0,1,2,1,2,2,1,2,2,1,2,2,2,1,2,2,1,2,2,1,2,1,0],
        [0,1,2,2,2,1,1,1,2,2,2,1,2,2,2,1,1,1,2,2,2,1,0],
        [0,1,2,1,2,2,1,2,2,1,2,2,2,1,2,2,1,2,2,1,2,1,0],
        [0,1,2,1,1,2,1,2,1,1,1,1,1,1,1,2,1,2,1,1,2,1,0],
        [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    ]
    
    drawMap(map);


    me.draw()

    window.onkeydown = (e)=>{
        activateKeys(e.code);
    }

    enemies.push(new Enemy(2,2,"./img/red-ghost.png"));
    enemies.push(new Enemy(2,8,"./img/purple-ghost.png"));
    enemies.push(new Enemy(20,2,"./img/nily-ghost.png"));
    enemies.push(new Enemy(20,8,"./img/orange-ghost.png"));

    setInterval(()=>{
        for(let enemy of enemies){
            enemy.move(moveable(enemy));
        }
    },700);
    
    animate();
})()

function animate(){

    if(!gameover){
        requestAnimationFrame(animate)
    }else{
        dialog("Game Over")
        return;
    }

    drawMap(map)

    ctx.fillStyle = '#ffffff'
    ctx.font = "bold 35px serif"
    ctx.fillText("SCORE: "+score,10,35)

    me.draw()


    for(let enemy of enemies){
        enemy.draw();
    }

    if(score == 880){
        dialog("You win");
        return;
    }


}

function drawMap(map){
    ctx.fillStyle = "#008000";
    ctx.fillRect(0,0,WIDTH,HEIGHT)
    for(let i = 0; i < map.length; i++ ){
        for(let j = 0; j < map[i].length; j++ ){
            switch(map[i][j]){
                case 1 :
                    ctx.beginPath()
                    ctx.fillStyle = "#cccccc"
                    ctx.fillRect(j*STEP, i*STEP, STEP, STEP);
                break;
                case 2 :
                    ctx.beginPath()
                    ctx.fillStyle = "#fff"
                    ctx.arc(j*STEP+STEP/2, i*STEP+STEP/2,10,0,2*Math.PI,false)
                    ctx.fill()
                break;
                default :
                    
                break;
            }
        }

        //
    }
}



function activateKeys(code){
    console.log(me.x,me.y,map[me.y][me.x])
    switch(code){
        case 'ArrowLeft' :
            
            if(map[me.y][me.x-1]!=1){
                me.goLeft()
            }
            
        break;
        case 'ArrowUp' :
            if(map[me.y-1][me.x]!=1){
                me.goUp()
            }
        break;
        case 'ArrowRight' :
            if(map[me.y][me.x+1]!=1){
                me.goRight()
            }
        break;
        case 'ArrowDown' :
            if(map[me.y+1][me.x]!=1){
                me.goDown()
            }
        break;
        default:

        break;
    }

    if(map[me.y][me.x] == 2){
        map[me.y][me.x] = 0 ;
        score += 10 ;
    }

    for(let enemy of enemies){
        if(enemy.x == me.x && enemy.y == me.y ){
            gameover = true ;
        }
    }
}

function calculDist(a,b){
    return Math.sqrt((a.x - b.x)**2+(a.y - b.y)**2 );
}

function moveable(p){
    let res = "";

    if(map[p.y-1][p.x] == 1 ){
        res += "0"
    }else{
        res += "1"
    }

    if(map[p.y][p.x+1] == 1 ){
        res += "0"
    }else{
        res += "1"
    }

    if(map[p.y+1][p.x] == 1 ){
        res += "0"
    }else{
        res += "1"
    }

    if(map[p.y][p.x-1] == 1 ){
        res += "0"
    }else{
        res += "1"
    }

    return res ;
}

function dialog(text){

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(WIDTH/4,HEIGHT/4,WIDTH/2,HEIGHT/2)

    ctx.fillStyle = "#008000"
    ctx.fillRect(WIDTH/4+5,HEIGHT/4+5,WIDTH/2-10,HEIGHT/2-10)
    
    ctx.fillStyle = '#ffffff'
    ctx.font = "bold 64px serif"
    ctx.fillText(text,WIDTH/3,HEIGHT/2)
}