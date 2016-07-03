//document.addEventListener("deviceready", start, false);
window.onload = start;

function start(){
    WIDTH = 850; 
    HEIGHT = 1100;
    
    w = window.innerWidth * window.devicePixelRatio;
    h = window.innerHeight * window.devicePixelRatio;

    game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, 'game');

    game.state.add("Boot", boot);
    game.state.add("Preloader", preloader);
    game.state.add("Game", game_main);
    
    game.state.start("Boot");  
};

var boot = function(game){};

boot.prototype = {
    preload: function(){},
    
    create: function(){  
        font = 'Luckiest Guy';   
        bannerNotCraeted = true;
        var interstitial;
        
        game.stage.backgroundColor = '#3aa589';

        if (this.game.device.desktop){

        } 
        
        else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.scale.maxWidth = w;
            this.scale.maxHeight = h;
            
            this.scale.forceOrientation(true, false );
        }
        
        game.state.start('Preloader');
    }
};


