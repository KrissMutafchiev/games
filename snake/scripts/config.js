var gameConfig = {

  FPS : 5,
  direction:2,
  score : 10,

    snake: {
        snakeStartPartsSize : 64,
        snakePartSize :5,
        snakeHeadBg: 'resource/snake-part-head.png',
        snakeTailBg: 'resource/snake-part-tail.png',
        snakeFullSprite: 'resource/snake-parts.png'

    },

    foods: {
        foodPartSize:64,
        snakeFoodType:{
            apple: {
                id:1,
                score:10,
                imageBg:'resource/apple.png'
            }
        }
    },

    player: {
        playerScore : null,

    },


}