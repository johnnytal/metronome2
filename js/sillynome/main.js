var game_main = function(game){
    bpm = 120;
    timeA = 0;
    count = 0;
    meterWasNone = false;
    
    //allow_accel = true;
   // accelX = 0;
    //last_accelX = 0;
    
    left = true;
    dragged = false;
    weightHeight = 200;
    weightX = 392;
    
    sliderHeight = 280;
    sliderWHeight = 280;
    
    TEXTS = [
        'The metronome was invented\nby Dietrich Nikolaus Winkel\nin Amsterdam in 1812',
        "M.M. or MM means\nMaelzel's Metronome,\nnot metronome mark",
        'Galileo Galilei first discovered\nconcepts involving the pendulum\nin the 16th century',
        'Tempo is measured\nin beats per minute (BPM)',
        'Most modern metronomes\nare electronic and use a\nquartz crystal to maintain accuracy',
        'Gyorgy Ligeti wrote a piece\ntitled Poeme symphonique\nfor 100 metronomes.',
        'The Metronome was patented\nby Johann Maelzel in 1815',
        'Paul McCartney used a metronome\nas percussion instrument on\n"Distractions"',
        'The word metronome comes\nfrom Greek - metron (measure)\nand nomos (regulating)',
        'Beethoven was one of\nthe first composers to use\nmetronome markings',
        'Beethoven was one of\nthe first composers to use\nmetronome markings'
    ];
};

game_main.prototype = {
    create: function(){
        
        metronome = this.add.sprite(0, 0, 'metronome');
        eyes = this.add.sprite(225, 120, 'eyes');
        
        /* silliness meter */    
        meter = this.add.sprite(740, 280, 'meter');
        meter.anchor.set(0.5, 0.5);
        meter.alpha = 0.9;
        meter.inputEnabled = true;
        meter.events.onInputDown.add(function(){
           slider.y = game.input.activePointer.y;
           sliderDragStop();
        }, this);
        
        slider = this.add.sprite(730, 280, 'slider');
        slider.anchor.set(0.5, 0.5);
        slider.alpha = 0.9;
        
        slider.inputEnabled = true;
        slider.input.enableDrag(true);
        slider.input.allowHorizontalDrag = false;
        
        slider.events.onDragStop.add(function(){
            sliderDragStop();
        }, this);
        
        /* weight meter */
        meterW = this.add.sprite(120, 280, 'meter');
        meterW.anchor.set(0.5, 0.5);
        meterW.alpha = 0.9;
        meterW.inputEnabled = true;
        meterW.events.onInputDown.add(function(){
           sliderW.y = game.input.activePointer.y;
           sliderWDragStop();
        }, this);
        
        sliderW = this.add.sprite(110, 280, 'slider');
        sliderW.anchor.set(0.5, 0.5);
        
        sliderW.inputEnabled = true;
        sliderW.input.enableDrag(true);
        sliderW.input.allowHorizontalDrag = false;
        sliderW.tint = 0xffaaff;
        sliderW.alpha = 0.9;

        sliderW.events.onDragStop.add(function(){
            sliderWDragStop();
        }, this);
        
        /* stick and weight */
        stick = this.add.sprite(415, 680, 'stick');
        stick.anchor.set(0.1, 1);
        stick.inputEnabled = true;
        
        stick.events.onInputDown.add(function(){
           dragged = true;
           weight.y = game.input.activePointer.y;
           
           metronomeDrag();
           
           setTimeout(function(){
               dragged = false;
           },20);
           
        }, this);

        bpmLabel = this.add.text(40, 20, '', {
            font: '65px ' + font, fill: 'orange', fontWeight: 'bold', align: 'center',
            stroke:'darkblue', strokeThickness: 3
        });
        
        meterLabel = this.add.text(meterW.x - 12, meterW.y, '', {
            font: '50px ' + font, fill: 'yellow', fontWeight: 'bold', align: 'center',
            stroke:'black', strokeThickness: 4
        });
        meterLabel.anchor.set(0.5, 0.5);
        meterLabel.angle = -12;
        
        soundsLabel = this.add.text(slider.x, slider.y , '', {
            font: '50px ' + font, fill: 'lightgreen', fontWeight: 'bold', align: 'center',
            stroke:'red', strokeThickness: 4
        });
        soundsLabel.anchor.set(0.5, 0.5);
        
        didYouKnowLabel = this.add.text(230, 745 ,TEXTS[game.rnd.integerInRange(0, TEXTS.length-1)], {
            font: '64px ' + font, fill: 'orange', fontWeight: 'bold', align: 'center',
            stroke:'black', strokeThickness: 12
        });
        didYouKnowLabel.x = game.world.centerX - didYouKnowLabel.width / 2;
        didYouKnowLabel.alpha = 0.8;
        
        bpmLabel.alpha = 0.8;
        meterLabel.alpha = 0.8;
        soundsLabel.alpha = 0.9;
   
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
            metronomeDrag();
        }, this);

        loadSounds();
        
        newMetroSfx = Phaser.ArrayUtils.shuffle(metroSfx); 
       
        shuffleBtn = this.add.button (700, 500, 'shuffleBtn');
        shuffleBtn.inputEnabled = true;
        shuffleBtn.onInputDown.add(function(){
           newMetroSfx = Phaser.ArrayUtils.shuffle(metroSfx);  
           shuffleBtn.tint = 0xdd2266;
           
           eyes.x = 235;
           eyes.y = 124; 
           
        },this);
        shuffleBtn.onInputUp.add(function(){
           newMetroSfx = Phaser.ArrayUtils.shuffle(metroSfx);  
           shuffleBtn.tint = 0xffffff;
        },this);
        
        /*accelBtn = this.add.button (700, 650, 'accelBtn');
        accelBtn.inputEnabled = true;
        accelBtn.onInputDown.add(function(){
           if (accelBtn.tint = 0xffffff){
               accelBtn.tint = 0x22bb44;
           }
           else{
               accelBtn.tint = 0xffffff;
           }

           eyes.x = 230;
           eyes.y = 126; 
        },this);*/
       /* accelBtn.onInputUp.add(function(){
            if (allow_accel){
                allow_accel = false;
            }
            else{
                allow_accel = true;
            }
        },this);*/
        
        try{
            window.plugins.insomnia.keepAwake();
        } catch(e){}
        
        setTimeout(function(){
            try{
                StatusBar.hide;
            } catch(e){}    
        }, 1000);

        creatSounds();
        initAd();
        //watchReading();
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

           /* if (allow_accel){
                if (Math.abs(accelX - last_accelX) > 0.3){
                    stick.angle = accelX * 5; 
                    weight.angle = (accelX * 5) * 1.2; 
    
                    weight.x = weightX;
                    weight.y =  Math.abs(weight.angle) * 1.5 + weightHeight;
                }
            } 
            
            else{*/
                factor = 1.4;
            
                if (left){
                    stick.angle -= factor; 
                    weight.angle -= factor * 1.2; 
                    
                    weight.x -= 15 - (weightHeight / 47);
                }
                
                else{
                    stick.angle += factor; 
                    weight.angle += factor * 1.2; 
                    
                    weight.x += 15 - (weightHeight / 47);    
                }
    
                weight.y =  Math.abs(weight.angle) * 1.5 + weightHeight;
            //}
        }
        
        else{
            stick.angle = 0;
            weight.angle = 0;
            weight.x = weightX;
        }
        
        slider.x = 730;
        sliderW.x = 110;
        
        //last_accelX = accelX;
    }    
};

function creatSounds(){
    weight.tint = (weightHeight / 50) * 0xffffff;

    count++;
    
    var sillyLevel = ((405 - 180) / (newMetroSfx.length - 1));
    var sillyness = Math.floor((sliderHeight - 180) / sillyLevel);
    
    soundsLabel.text = (sillyness + 1);
    
    var meterLevel = ((405 - 180) / 4);
    var meter = (Math.floor((sliderWHeight - 180) / meterLevel)) + 2;
    
    if (meter == 6){ 
        meterLabel.text = 'None';
        meterWasNone = true;
    }
    else{
        meterLabel.text = meter + '/4'; 
    }
    
    var soundToPlay;
    
    if ((count == meter || meterWasNone) && meter != 6){
        soundToPlay = metroSfx1;
        meterWasNone = false;
        count = 0;
    }
    
    else if (sillyness == 0 && count != meter){
        soundToPlay = metroSfx2;
    }

    else{
        soundToPlay = newMetroSfx[game.rnd.integerInRange(1, sillyness)];
    }
    
    soundToPlay.play();
    
    if (timeA == 0) timeA = new Date().getTime();
 
    else if (timeA != 0){
        timeB = new Date().getTime();
        timeC = timeB - timeA;
        
        bpm = 60000 / timeC;
        bpmLabel.text = "\u2669 = " + Math.round(bpm);
        timeA = 0;
    }    
}

function metronomeDrag(){
    if (weight.y < 180) weight.y = 180;
    else if (weight.y > 630) weight.y = 630;
    
    weightHeight = weight.y;
    eyes.x = 220;
    eyes.y = 127; 
    
       
   didYouKnowLabel.text = TEXTS[game.rnd.integerInRange(0, TEXTS.length-1)];
   didYouKnowLabel.x = game.world.centerX - didYouKnowLabel.width / 2;
}

function sliderWDragStop(){
   if (sliderW.y < 180) sliderW.y = 180;
   else if (sliderW.y > 405) sliderW.y = 405;
   
   sliderWHeight = sliderW.y;
   meterLabel.y = sliderW.y;

   eyes.x = 210;
   eyes.y = 120;  
}

function sliderDragStop(){
   if (slider.y < 180) slider.y = 180;
   else if (slider.y > 405) slider.y = 405;
   
   sliderHeight = slider.y;
   soundsLabel.y = slider.y;
   
   eyes.x = 230;
   eyes.y = 120;  
}

/*function watchReading(){
    watchID = navigator.accelerometer.watchAcceleration(readAccel, onError, { frequency: 20 });
}

function readAccel(acceleration){    
    accelX = acceleration.x;
}

function onError() {
    alert('No acceleration reading detected!');
};*/

function loadSounds(){           
    metroSfx1 = game.add.audio('sound1', 1, false),
    metroSfx2 = game.add.audio('sound2', 1, false),
    
    metroSfx = [
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
        metroSfx13 = game.add.audio('sound13', 1, false),
        metroSfx14 = game.add.audio('sound14', 1, false),
        metroSfx15 = game.add.audio('sound15', 1, false),
        metroSfx16 = game.add.audio('sound16', 1, false),
        metroSfx17 = game.add.audio('sound17', 1, false),
        metroSfx18 = game.add.audio('sound18', 1, false),
        metroSfx19 = game.add.audio('sound19', 1, false)
    ];
}

function initAd(){
    var admobid = {};

    admobid = {
        banner: 'ca-app-pub-9795366520625065/5267550776'
    };

    if(AdMob) AdMob.createBanner({
        adId: admobid.banner,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true
    });
}
