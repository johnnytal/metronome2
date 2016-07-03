var game_main = function(game){
    bpm = 120;
    timeA = 0;
    count = 0;
    
    left = true;
    dragged = false;
    weightHeight = 200;
    weightX = 392;
    
    sliderHeight = 280;
    sliderWHeight = 280;
};

game_main.prototype = {
    create: function(){
        
        metronome = this.add.sprite(0, 0, 'metronome');
        
        /* silliness meter */    
        meter = this.add.sprite(740, 280, 'meter');
        meter.anchor.set(0.5, 0.5);
        
        slider = this.add.sprite(730, 280, 'slider');
        slider.anchor.set(0.5, 0.5);
        slider.scale.set(0.7, 0.7);
        
        slider.inputEnabled = true;
        slider.input.enableDrag(true);
        slider.input.allowHorizontalDrag = false;
        
        slider.events.onDragStop.add(function(){
            if (slider.y < 180) slider.y = 180;
            else if (slider.y > 405) slider.y = 405;
            sliderHeight = slider.y;
            
        }, this);
        
        /* weight meter */
        meterW = this.add.sprite(120, 280, 'meter');
        meterW.anchor.set(0.5, 0.5);
        
        sliderW = this.add.sprite(110, 280, 'slider');
        sliderW.anchor.set(0.5, 0.5);
        sliderW.scale.set(0.7, 0.7);
        
        sliderW.inputEnabled = true;
        sliderW.input.enableDrag(true);
        sliderW.input.allowHorizontalDrag = false;
        sliderW.tint = 0xffaaff;

        sliderW.events.onDragStop.add(function(){
            if (sliderW.y < 180) sliderW.y = 180;
            else if (sliderW.y > 405) sliderW.y = 405;
            sliderWHeight = sliderW.y;
            
        }, this);
        
        /* stick and weight */
        stick = this.add.sprite(415, 680, 'stick');
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

        bpmLabel = this.add.text(45, 20, '', {
            font: '45px ' + font, fill: 'orange', fontWeight: 'normal', align: 'center'
        });
        
        meterLabel = this.add.text(45, 70, '', {
            font: '45px ' + font, fill: 'yellow', fontWeight: 'normal', align: 'center'
        });
        
        soundsLabel = this.add.text(630, 35, '', {
            font: '38px ' + font, fill: 'lightblue', fontWeight: 'normal', align: 'center'
        });
        
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
        
        slider.x = 730;
        sliderW.x = 110;
    }
};

function creatSounds(){
    count++;
    
    var sillyLevel = ((405 - 180) / 18);
    var sillyness = Math.floor((sliderHeight - 180) / sillyLevel);
    soundsLabel.text = 'Sounds: ' + (sillyness + 1);
    
    var meterLevel = ((405 - 180) / 3);
    var meter = (Math.floor((sliderWHeight - 180) / meterLevel)) + 2;
    meterLabel.text = meter + '/4';
    
    var soundToPlay;
    
    if (count == meter){
        soundToPlay = metroSfx[0];
        count = 0;
    }

    else{
        soundToPlay = metroSfx[game.rnd.integerInRange(1, sillyness)];
    }
    
    soundToPlay.play();
    
    if (timeA == 0) timeA = new Date().getTime();
 
    else if (timeA != 0){
        timeB = new Date().getTime();
        timeC = timeB - timeA;
        
        bpm = 60000 / timeC;
        bpmLabel.text = Math.round(bpm) + ' bpm';
        timeA = 0;
    }    

}

