
var snakes =  (function (gameConfig) {

    var directions = [
        { dx: 0,    dy: -1  },
        { dx: +1,   dy: 0   },
        { dx: 0,    dy: +1  },
        { dx: -1,   dy: 0   }
    ];



    function GameObject( x , y , size ) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    GameObject.prototype = {
        getPosition : function () {
            return {
                x: this.x,
                y: this.y
            }
        },
        getSize : function () {
            return this.size
        }

    };
    //SNAKE PART
    function SnakePart( x , y , size , directionPart ) {

        GameObject.call( this , x , y , size ,directionPart)

    }

    SnakePart.prototype = new GameObject();
    SnakePart.prototype.constructor = SnakePart;
    SnakePart.prototype.changePosition = function ( x , y ){
        this.x = x;
        this.y = y;
    };

    //SNAKE
    function Snake( x , y , size ) {  // <-- this size is  (parts count)
        var part = null,
            partX,
            partY,
            directionPart;

        this.parts = [];

        for ( var i = 0; i < size; i++) {
            partX = x - i * gameConfig.snake.snakeStartPartsSize;
            partY = y;
            directionPart = gameConfig.direction;
            part = new SnakePart( partX , partY , gameConfig.snake.snakeStartPartsSize,directionPart );
            this.parts.push(part);
        }
    }

    Snake.prototype = new GameObject();
    Snake.prototype.constructor = Snake;
    Snake.prototype.head = function(){
        return this.parts[0];
    };
    Snake.prototype.move = function (gameConfig , theFood) {

        for (var i = this.parts.length -1;  i >= 1; i--) {
            var position = this.parts[i - 1].getPosition();
            this.parts[i].changePosition( position.x , position.y );
        }
        var head = this.head();

        var dx = directions[gameConfig.direction].dx;
        var dy = directions[gameConfig.direction].dy;
        var headPosition = head.getPosition();
        var newHeadPosition = {
            x: headPosition.x + head.size * dx,
            y: headPosition.y + head.size * dy
        };

        head.changePosition(newHeadPosition.x,newHeadPosition.y);

        this.eat(gameConfig, headPosition, theFood);

    };

    Snake.prototype.eat =  function(gameConfig,headPosition,theFood) {

      if(headPosition.y  == theFood.y  && headPosition.x  == theFood.x ) {
          var scoreElement = document.getElementById('score');
          var speedElement = document.getElementById('speed');
          var eatPart = new SnakePart(headPosition.x,headPosition.y,gameConfig.snake.snakeStartPartsSize);

          this.parts.push(eatPart);

          theFood.changePosition(Math.floor(Math.random()*10)*64  , Math.floor(Math.random()*10)*64);

          gameConfig.FPS += 0.5;
          scoreElement.innerText = 'Score :' + gameConfig.score;
          speedElement.innerText = 'Speed :' +gameConfig.FPS.toString()
          gameConfig.score += gameConfig.foods.snakeFoodType.apple.score
          return
      }
    };

    Snake.prototype.determineBoundaryCollision = function(){

        var head = this.head();


        if (head.x  >= 640 + gameConfig.snake.snakeStartPartsSize || head.x +  gameConfig.snake.snakeStartPartsSize  <= 0) {
            return false;
        }

        if (head.y  >= 640 + gameConfig.snake.snakeStartPartsSize || head.y + gameConfig.snake.snakeStartPartsSize  <= 0) {
            return false;
        }

        var snakeBodyWithoutHead = this.parts.slice(1, this.parts.length - 1);

        for (var i in snakeBodyWithoutHead) {
            var currentElement = snakeBodyWithoutHead[i];
            if (currentElement.x === head.x &&
                currentElement.y === head.y) {
                return false;
            }
        }

        return true;
    };

    Snake.prototype.snakeControl = function (gameConfig) {

        var Key = {
            LEFT:   37,
            UP:     38,
            RIGHT:  39,
            DOWN:   40
        };

        document.addEventListener('keydown' , function (event) {

            var key = event.key;

                switch (key) {
                    case 'ArrowUp' :
                        gameConfig.direction = 0;
                        break;
                    case 'ArrowRight' :
                        gameConfig.direction = 1;
                        break;
                    case 'ArrowDown' :
                        gameConfig.direction = 2;
                        break;
                    case 'ArrowLeft' :
                        gameConfig.direction = 3;
                        break;

                }
        });

    };

    //WALL
    function Wall( x , y , size ) {

        GameObject.call( this , x , y , size )

    }

    Wall.prototype = new GameObject();
    Wall.prototype.constructor = Wall;

    //FOOD
    function Food( x , y , size ) {

        GameObject.call( this , x , y , size )

    }

    Food.prototype = new GameObject();
    Food.prototype.constructor = Food;
    Food.prototype.changePosition = function ( x , y ){
        this.x = x;
        this.y = y;
    };


    return {
        get : function ( x , y , size ) {
            return new Snake( x , y , size );
        },
        getFood : function(x , y , size){
            return new Food( x , y , size );
        },

        SnakeType: Snake,
        SnakePartType: SnakePart,
        FoodType: Food,
        WallType: Wall,

    }

})(gameConfig);

