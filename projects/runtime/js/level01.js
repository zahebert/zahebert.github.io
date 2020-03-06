var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 600, "y": groundY -110 },
                { "type": "sawblade", "x": 700, "y": groundY- 110 },
                { "type": "sawblade", "x": 800, "y": groundY - 110 },
                { "type": "sawblade", "x": 450, "y": groundY },
                { "type": "sawblade", "x": 475, "y": groundY},
                { "type": "spikes", "x": 1200, "y": groundY - 15},
                { "type": "spikes", "x": 1500, "y": groundY - 15},
                { "type": "spikes", "x": 1800, "y": groundY - 15},
                { "type": "enemy", "x": 800, "y": groundY - 50},
                { "type": "treasure", "x": 1800, "y": groundY - 100}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
       
        
        function createSawBlade (x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            
            game.addGameItem(sawBladeHitZone);
                
            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }

        
        for (var i = 0; i < levelData.gameItems.length; i++) {
            var gameItemObject = levelData.gameItems[i];
                if (gameItemObject.type === 'sawblade') {
                    createSawBlade(gameItemObject.x, gameItemObject.y);
                    
                }
                
                if (gameItemObject.type === 'spikes') {
                    createSpikes(gameItemObject.x, gameItemObject.y);
                }
                
                if (gameItemObject.type === 'enemy') {
                    createEnemy(gameItemObject.x, gameItemObject.y);
                }
                if (gameItemObject.type === 'treasure') {
                    createAward(gameItemObject.x, gameItemObject.y);
                }
        }        
                
                
                
            function createSpikes(x,y) {
                var hitZoneSize = 30;
                var damageFromObstacle = 10;
                var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
                sawBladeHitZone.x = x;
                sawBladeHitZone.y = y;
                    
                game.addGameItem(sawBladeHitZone);
                        
                var obstacleImage = draw.bitmap('img/spikes.png');
                sawBladeHitZone.addChild(obstacleImage);
                obstacleImage.x = -50;
                obstacleImage.y = -25;
                obstacleImage.scaleX = .2
                obstacleImage.scaleY = .2
            };
            
            
            function createEnemy (x,y) {
                var enemy =  game.createGameItem('enemy',25);
                    var bowser = draw.bitmap('img/bowser.png');
                    bowser.x = -25;
                    bowser.y = -25;
                    enemy.addChild(bowser);
                    
                    enemy.x = x;
                    enemy.y = y;
                    
                    game.addGameItem(enemy);
                    
                    enemy.velocityX = -0.7;
                    
                enemy.onPlayerCollision = function() {
                    game.changeIntegrity(-15);
                    enemy.fadeOut();
                    
                };
                
                enemy.onProjectileCollision = function() {
                    game.increaseScore(50);
                    enemy.fadeOut();
                        
                };
            }   
            
            function createAward (x,y) {
                var treasure = game.createGameItem('treasure', 50);
                    treasure.x = x;
                    treasure.y = y;
                    treasure.velocityX = -2;
                
                var diamond = draw.bitmap('img/diamond.png');
                    diamond.x = -25;
                    diamond.y = -27;
                    
                    treasure.addChild(diamond);
                    
                    game.addGameItem(treasure);
                    
                    treasure.onPlayerCollision = function (){
                        game.increaseScore(50);
                        treasure.fadeOut();
                    }
            }
            
            // code to do something with each element
        

        
        
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
