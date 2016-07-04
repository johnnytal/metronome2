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

        game.load.image('metronome', 'images/metronome.jpg');
        game.load.image('stick', 'images/stick.png');
        game.load.image('weight', 'images/weight.png');
        game.load.image('meter', 'images/meter.png');
        game.load.image('slider', 'images/slider.png');
        game.load.image('shuffleBtn', 'images/shuffle.png');

        game.load.audio('sound1', ['audio/metronome1.mp3', 'audio/metronome1.ogg']);
        game.load.audio('sound2', ['audio/metronome2.mp3', 'audio/metronome2.ogg']);

        game.load.audio('sound3', ['audio/can.mp3','audio/can.ogg']);
        game.load.audio('sound4', ['audio/can2.mp3', 'audio/can2.ogg']);
        game.load.audio('sound5', ['audio/celery.mp3', 'audio/celery.ogg']);
        game.load.audio('sound6', ['audio/cork.mp3', 'audio/cork.ogg']);
        game.load.audio('sound7', ['audio/cork2.mp3', 'audio/cork2.ogg']);
        game.load.audio('sound8', ['audio/glass.mp3', 'audio/glass.ogg']);
        game.load.audio('sound9', ['audio/amp.mp3', 'audio/amp.ogg']);
        game.load.audio('sound10', ['audio/bing.mp3', 'audio/bing.ogg']);
        game.load.audio('sound11', ['audio/scratch.mp3', 'audio/scratch.ogg']);
        game.load.audio('sound12', ['audio/tape.mp3', 'audio/tape.ogg']);
        game.load.audio('sound13', ['audio/puncher.mp3', 'audio/puncher.ogg']);
        game.load.audio('sound14', ['audio/stapler.mp3', 'audio/stapler.ogg']);
        game.load.audio('sound15', ['audio/pong.mp3', 'audio/pong.ogg']);
        game.load.audio('sound16', ['audio/cookoo.mp3', 'audio/cookoo.ogg']);
        game.load.audio('sound17', ['audio/timpani.mp3', 'audio/timpani.ogg']);
        game.load.audio('sound18', ['audio/jaw2.mp3', 'audio/jaw2.ogg']);
        game.load.audio('sound19', ['audio/jaw1.mp3', 'audio/jaw1.ogg']);
    },
    
    create: function(){
        game.state.start('Game');
    }, 
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text ="";
   // console.log(progress, cacheKey, success);
};
