'use strict'


class Player {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    setPosition(x,y){
        this.x = x;
        this.y = y; 
    }

    goLeft(){
        this.x -- ;
    }

    goRight(){
        this.x ++ ;
    }

    goUp(){
        this.y -- ;
    }

    goDown(){
        this.y ++ ;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = '#000000'
        ctx.arc((this.x+0.5)*STEP,(this.y+0.5)*STEP,STEP/3,0,2*Math.PI,false)
        ctx.fill()
    }
}