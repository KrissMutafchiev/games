var games = (function (gameConfig) {

    function Game(renderer) {
        this.renderer = renderer;
        this.snake = new snakes.get(128 ,128,gameConfig.snake.snakePartSize);
        this.food  = new snakes.getFood(64 ,64 ,gameConfig.foods.foodPartSize);
    }

    function animationFrame () {

        if(continueLoop){
            setTimeout(function () {
                theSnake.move(gameConfig , theFood);
                theRenderer.clear();
                theRenderer.draw(theSnake);
                theRenderer.draw(theFood);
                continueLoop = theSnake.determineBoundaryCollision();
                requestAnimationFrame(animationFrame);
            },1000 / gameConfig.FPS)
        }
    };

    var theSnake;
    var theRenderer;
    var theFood;
    var continueLoop;

    Game.prototype = {
        start: function (gameConfig) {
            continueLoop = true;
            theSnake = this.snake;
            theRenderer = this.renderer;
            theFood = this.food;
            theSnake.snakeControl(gameConfig);
            requestAnimationFrame(animationFrame);
        },
        stop: function () {

        },
    }
    
    return {
        get:function (renderer) {
            return new Game(renderer);
        }
    }

})(gameConfig);
