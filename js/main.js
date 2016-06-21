var game_main = function(game){
    left = true;
    bpm = 120;
    dragged = false;
    
    weightHeight = 200;
    weightX = 542;
};

game_main.prototype = {
    create: function(){
        
        metronome = this.add.sprite(150, 0, 'metronome');
        
        stick = this.add.sprite(555, 680, 'stick');
        stick.anchor.set(0.1, 1);
        
        weight = this.add.sprite(weightX, weightHeight, 'weight');
        weight.anchor.set(0.1, 1);
        
        weight.inputEnabled = true;
        weight.input.enableDrag(true);
        weight.input.allowHorizontalDrag = false;
        
        weight.events.onDragStart.add(function(){
            dragged = true;
        }, this);
        
        weight.events.onDragStop.add(function(){
            dragged = false;

            if (weight.y < 180) weight.y = 180;
            else if (weight.y > 630) weight.y = 630;
            weightHeight = weight.y;
            
        }, this);
        
        bpm = 120;
        
        metroSfx = [
            metroSfx1 = game.add.audio('sound1', 1, false),
            metroSfx2 = game.add.audio('sound2', 1, false),
            metroSfx3 = game.add.audio('sound3', 1, false),
            metroSfx4 = game.add.audio('sound4', 1, false),
            metroSfx5 = game.add.audio('sound5', 1, false),
            metroSfx6 = game.add.audio('sound6', 1, false),
            metroSfx7 = game.add.audio('sound7', 1, false),
            metroSfx8 = game.add.audio('sound8', 1, false),
            metroSfx9 = game.add.audio('sound9', 1, false),
            metroSfx10 = game.add.audio('sound10', 1, false),
            metroSfx11 = game.add.audio('sound11', 1, false),
            metroSfx12 = game.add.audio('sound12', 1, false),
            metroSfx12 = game.add.audio('sound13', 1, false),
            metroSfx12 = game.add.audio('sound14', 1, false),
            metroSfx12 = game.add.audio('sound15', 1, false),
            metroSfx12 = game.add.audio('sound16', 1, false),
            metroSfx12 = game.add.audio('sound17', 1, false),
            metroSfx12 = game.add.audio('sound18', 1, false),
            metroSfx12 = game.add.audio('sound19', 1, false)
        ];
        
        creatSounds();
    },
    
    update: function(){
        
        angle = Math.round( (1 / weightHeight) * 7500 );

        if (stick.angle <= -angle){
             left = false;
             creatSounds();
  
             console.log(weight.y)
        } 
        
        else if (stick.angle >= angle){
            left = true;
            creatSounds();
            
        }
       
        if (!dragged){
            
            factor = 1.5;
            
            if (left){
                stick.angle -= factor; 
                weight.angle -= factor*1.2; 
                
                weight.x -= 15 - (weightHeight / 47);
            }
            
            else{
                stick.angle += factor; 
                weight.angle += factor*1.2; 
                
                weight.x += 15 - (weightHeight / 47);
                
            }

            weight.y =  Math.abs(weight.angle)* 1.5 + weightHeight;
            
        }
        
        else{
            stick.angle = 0;
            weight.angle = 0;
            weight.x = weightX;
        }

    }
};

function creatSounds(){
    var soundToPlay = metroSfx[game.rnd.integerInRange(0, metroSfx.length - 1)];
    soundToPlay.play();
}
