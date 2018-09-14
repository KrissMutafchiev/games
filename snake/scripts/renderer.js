var renderers = (function (gameConfig) {

    var drawSnake = function ( canvas , snake ) {

        drawSnakeParts( canvas , snake.parts ,gameConfig  )


    };
    var drawSnakeParts = function ( canvas , parts ,gameConfig ) {

        var ctx = canvas.getContext("2d");
        var snakeSprite = new Image();
        snakeSprite.src = gameConfig.snake.snakeFullSprite;


        // Loop over every snake segment
        for (var i=0; i< parts.length; i++) {
            var part = parts[i];
            var segX = part.x;
            var segY = part.y;
            var tileX = segX ;
            var tileY = segY ;

            // Sprite column and row that gets calculated
            var tx = 0;
            var ty = 0;

            if (i == 0) {
                // Head; Determine the correct image
                var nseg = parts[i+1]; // Next segment
                if (segY < nseg.y) {
                    // Up
                    tx = 3; ty = 0;
                } else if (segX > nseg.x) {
                    // Right
                    tx = 4; ty = 0;
                } else if (segY > nseg.y) {
                    // Down
                    tx = 4; ty = 1;
                } else if (segX < nseg.x) {
                    // Left
                    tx = 3; ty = 1;
                }
            } else if (i == parts.length-1) {
                // Tail; Determine the correct image
                var pseg = parts[i-1]; // Prev segment
                if (pseg.y < segY) {
                    // Up
                    tx = 3; ty = 2;
                } else if (pseg.x > segX) {
                    // Right
                    tx = 4; ty = 2;
                } else if (pseg.y > segY) {
                    // Down
                    tx = 4; ty = 3;
                } else if (pseg.x < segX) {
                    // Left
                    tx = 3; ty = 3;
                }
            } else {
                // Body; Determine the correct image
                var pseg = parts[i-1]; // Previous segment
                var nseg = parts[i+1]; // Next segment
                if (pseg.x < segX && nseg.x > segX || nseg.x < segX && pseg.x > segX) {
                    // Horizontal Left-Right
                    tx = 1; ty = 0;
                } else if (pseg.x < segX && nseg.y > segY || nseg.x < segX && pseg.y > segY) {
                    // Angle Left-Down
                    tx = 2; ty = 0;
                } else if (pseg.y < segY && nseg.y > segY || nseg.y < segY && pseg.y > segY) {
                    // Vertical Up-Down
                    tx = 2; ty = 1;
                } else if (pseg.y < segY && nseg.x < segX || nseg.y < segY && pseg.x < segX) {
                    // Angle Top-Left
                    tx = 2; ty = 2;
                } else if (pseg.x > segX && nseg.y < segY || nseg.x > segX && pseg.y < segY) {
                    // Angle Right-Up
                    tx = 0; ty = 1;
                } else if (pseg.y > segY && nseg.x > segX || nseg.y > segY && pseg.x > segX) {
                    // Angle Down-Right
                    tx = 0; ty = 0;
                }
            }

            // Draw the image of the snake part
            ctx.drawImage(snakeSprite, tx*gameConfig.snake.snakeStartPartsSize, ty*gameConfig.snake.snakeStartPartsSize, gameConfig.snake.snakeStartPartsSize, gameConfig.snake.snakeStartPartsSize, tileX, tileY, gameConfig.snake.snakeStartPartsSize, gameConfig.snake.snakeStartPartsSize);
        }

    };

    var drawFood = function ( canvas , food ) {
        var ctx = canvas.getContext("2d");
        var foodImg = new Image();
        var position = food.getPosition();
        foodImg.src = gameConfig.foods.snakeFoodType.apple.imageBg;
        ctx.drawImage(foodImg,position.x,position.y,food.size,food.size);
    };
    var drawWall = function ( canvas , wall ) {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        var position = wall.getPosition();
        ctx.fillRect( position.x , position.y , wall.size, wall.size );
        ctx.strokeStyle = "black";
        ctx.strokeRect( position.x , position.y , wall.size, wall.size );
    };


    function CanvasRenderer( selector ) {

        if( selector instanceof HTMLCanvasElement ) {
            this.canvas = selector;
        }else if ( typeof selector === "String" || typeof selector === 'string' ) {
            this.canvas = document.querySelector(selector);
        }

    }

    CanvasRenderer.prototype = {
        draw: function (obj) {
            if ( obj instanceof snakes.SnakeType ) {
                drawSnake( this.canvas , obj )
            }
            else if ( obj instanceof snakes.SnakePartType ) {
                drawSnakeParts( this.canvas , obj )
            }
            else if ( obj instanceof snakes.FoodType ) {
                drawFood( this.canvas , obj )
            }
            else if ( obj instanceof snakes.WallType ) {
                drawWall( this.canvas, obj )
            }

        },
        clear: function () {
            var ctx = this.canvas.getContext("2d");
            var w = this.canvas.width;
            var h = this.canvas.height;
            ctx.clearRect(0,0,w,h);
        }
    }

    return {
        getCanvas: function (selector) {
            return new CanvasRenderer(selector);
        }
    }

})(gameConfig);