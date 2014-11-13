/*global Phaser*/
/*jslint sloppy:true, browser: true, devel: true, eqeq: true, vars: true, white: true*/
var game;

var mainMenu = {
    preload: function() {
        game.load.image('ferrisWheel', 'imgs/ferrisWheel.png');
        game.load.image('sky', 'imgs/skyBackground.png');
        game.load.image('cloud', 'imgs/cloud.png');
        game.load.image('start', 'imgs/start.jpg');
    },
    create: function() {
        //backgrounds
        this.bgSky = game.add.sprite(0,0, 'sky');
        this.bgSky.scale.x = 0.8; this.bgSky.scale.y = 0.8;
        this.bgWheel = game.add.sprite(0,0 , 'ferrisWheel');
        this.bgWheel.scale.x = 1.2; this.bgWheel.scale.y = 1.2;
        this.bgWheel.position.y = game.stage.height - this.bgWheel.height;
        
        //animating clouds
        this.clouds = game.add.group(game, 'cloud', 'clouds');
        this.clouds.scale.x = 0.1; this.clouds.scale.y = 0.1;
        this.clouds.enableBody = true;
        this.clouds.createMultiple(30, 'cloud');
        game.time.events.loop(1000, this.addCloud, this);
        
        //start button
        this.start = game.add.button(0,0, 'start', this.start);
        this.start.x = game.world.width/2 - this.start.width/2;
        this.start.y = game.world.height - this.start.height;
        
        //fonts or text
        var title = "Llama Empire";
        var style = {font: "28px Arial", fill: "#ff0044", align: "center"};

    },
    update: function() {
        
    },
    
    addCloud: function(){
        //animating clouds
        var cloud = this.clouds.getFirstDead();
        cloud.reset(game.stage.width * 9 , Math.random() * 1000);
        cloud.body.velocity.x = Math.floor(Math.random() * -500 - 300);
        cloud.checkWorldBounds = true;
        cloud.outOfBoundsKill = true;
    },
    
    start: function(){
        game.state.start('main'); 
    }
};

var mainState = {
    preload: function () {
        game.load.image('sky', 'imgs/skyBackground.png');
        game.load.image('fence', 'imgs/horizontalFence.svg');
        game.load.image('llama' , 'imgs/placeholder.png');
        game.load.image('bar', 'imgs/bar.png');
        game.load.image('buy', 'imgs/buyButton.png');
        game.load.image('sell', 'imgs/sellButton.png');
    },
    create: function () {
        //backgrounds
        this.bgSky = game.add.sprite(0,0, 'sky');
        
        //fence
        this.hFence = game.add.sprite(0,200, 'fence');
        this.hFence.scale.x = 0.3; this.hFence.scale.y = 0.1;
        this.vFence = game.add.sprite(this.hFence.width + this.hFence.height, 200, 'fence');
        this.vFence.scale.x = 0.3; this.vFence.scale.y = 0.1;
        this.vFence.angle = 90;
        
        //llama stuff
        this.llamas = game.add.group(game, 'llamas','llama');
        this.llamas.enableBody = true;
        this.llamas.createMultiple(this.llamaCount, 'llamas');
        this.llama = game.add.button(0, this.hFence.position.y -10, 'llama', this.llamaOnClick,             this);
        this.llamaCount = 0;

        //currency
        this.money = 0;
        
        //text
        this.llamaText = game.add.text(0,0,'Llamas: '+ this.llamaCount, { fontSize: '22px', fill: '#fff'});
        this.moneyText = game.add.text(game.world.width/2 , 0, 'Money: $' + this.money,  { fontSize: '22px', fill: '#fff'});
                
    },
    
    update: function () {
        //update texts
        this.llamaText.setText('Llamas: '+ this.llamaCount);
        this.moneyText.setText('Money: $' + this.money);
    }, 
    
    llamaOnClick: function() {
        this.bar = game.add.sprite(this.llama.position.x, this.llama.position.y + 20, 'bar');
        this.bar.scale.x = 0.3; this.bar.scale.y = 0.1;
        //buy button
        this.buyButton = game.add.button(this.bar.position.x + 10, this.bar.position.y +0.1, 'buy',         this.buyOnClick, this);
        this.buyButton.scale.x = 0.17; this.buyButton.scale.y = 0.17;
        //sell button
        this.sellButton = game.add.button(this.bar.position.x + this.bar.width /2, this.bar.position.y +0.1,               'sell', this.sellOnClick, this);
        this.sellButton.scale.x = 0.17; this.sellButton.scale.y = 0.17;
        
    },
    
    buyOnClick: function () {
        this.llamaCount ++;
        this.money -= 100;
    },
    
    sellOnClick: function() {
        this.llamaCount --;
        this.money += 50;
    }
};

// Initialize Phaser
game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.add('mainMenu', mainMenu);
game.state.start('main');
