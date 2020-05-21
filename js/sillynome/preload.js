var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
         
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '',{
             font: '25px ' + font, fill: 'white', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);

        this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "", {
            font: '18px ' + font, fill: 'lightgrey', fontWeight: 'normal', align: 'center'
        });

        game.load.image('metronome', 'assets/sillynome/images/metronome.jpg');
        game.load.image('eyes', 'assets/sillynome/images/eyes.png');
        game.load.image('stick', 'assets/sillynome/images/stick.png');
        game.load.image('weight', 'assets/sillynome/images/weight.png');
        game.load.image('meter', 'assets/sillynome/images/meter.png');
        game.load.image('slider', 'assets/sillynome/images/slider.png');
        game.load.image('shuffleBtn', 'assets/sillynome/images/shuffle.png');
        game.load.image('accelBtn', 'assets/sillynome/images/accel.png');

        game.load.audio('sound1', 'assets/sillynome/audio/metronome1.ogg');
        game.load.audio('sound2', 'assets/sillynome/audio/metronome2.ogg');

        game.load.audio('sound3', 'assets/sillynome/audio/can.ogg');
        game.load.audio('sound4', 'assets/sillynome/audio/can2.ogg');
        game.load.audio('sound5', 'assets/sillynome/audio/celery.ogg');
        game.load.audio('sound6', 'assets/sillynome/audio/cork.ogg');
        game.load.audio('sound7', 'assets/sillynome/audio/cork2.ogg');
        game.load.audio('sound8', 'assets/sillynome/audio/glass.ogg');
        game.load.audio('sound9', 'assets/sillynome/audio/amp.ogg');
        game.load.audio('sound10', 'assets/sillynome/audio/bing.ogg');
        game.load.audio('sound11', 'assets/sillynome/audio/scratch.ogg');
        game.load.audio('sound12', 'assets/sillynome/audio/tape.ogg');
        game.load.audio('sound13', 'assets/sillynome/audio/puncher.ogg');
        game.load.audio('sound14', 'assets/sillynome/audio/stapler.ogg');
        game.load.audio('sound15', 'assets/sillynome/audio/pong.ogg');
        game.load.audio('sound16', 'assets/sillynome/audio/cookoo.ogg');
        game.load.audio('sound17', 'assets/sillynome/audio/timpani.ogg');
        game.load.audio('sound18', 'assets/sillynome/audio/jaw2.ogg');
        game.load.audio('sound19', 'assets/sillynome/audio/jaw1.ogg');
    },
    
    create: function(){
        game.state.start('Game');
    }, 
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text ="";
};
