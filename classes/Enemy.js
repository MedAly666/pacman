class Enemy {
    constructor(x,y,src){
        this.x = x;
        this.y = y;
        this.img = new Image() ;
        this.img.src = src ;
    }

    setPosition(x,y){
        this.x = x;
        this.y = y; 
    }

    move(pos){
        pos = pos || "0000";

        if(pos == "0000"){
            return;
        }

        let r = Math.round(Math.round(Math.random()*10%4));
        switch(r){
            case 0 :
                if(pos[r]=="1"){
                    this.y--;
                    return ;
                }
                
            break;
            case 1 :
                if(pos[r]=="1"){
                    this.x++;
                    return;
                }
            break;
            case 2 :
                if(pos[r]=="1"){
                    this.y++;
                    return;
                }
            break;
            case 3 :
                if(pos[r]=="1"){
                    this.x--;
                    return;
                }
            break;
        }
    }

    

    draw(){
        ctx.beginPath();
        ctx.fillStyle = '#ff0000'
        //ctx.arc((this.x+0.5)*STEP,(this.y+0.5)*STEP,STEP/3,0,2*Math.PI,false)
        
        
        //ctx.fill()
        ctx.drawImage(this.img,(this.x)*STEP,(this.y)*STEP,STEP,STEP)
    }
}