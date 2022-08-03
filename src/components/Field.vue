<template>
    <main>
        <div class="row" v-for="(row, i) in field" :key="`r-${i}`">
            <div class="block" v-for="(block, i) in row" :class="{
                'snake-head': block === 1,
                'snake-body': block === 2,
                'point': block === 3
            }" :key="`r-c-${i}`">
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name: 'Field',
    data() {
        return {
            field: [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            snakeHead: {
                x: 0,
                y: 0
            },
            snakeBody: [],
            points: [],
            allowedKeys: ['w', 'a', 's', 'd'],
            direction: null,
            score: 0,

            gameTimer: null
        }
    },
    created() {
        this.snakeHead = this.getRandomPoint();
        this.field[this.snakeHead.y][this.snakeHead.x] = 1

        window.addEventListener('keyup', this.initLogic)
        this.gameTimer = setInterval(() => {
            this.gameTick();
        }, 750);
    },
    methods: {
        getRandomInt(min, max) {
            const rand = min + Math.random() * (max + 1 - min)
            return Math.floor(rand)
        },
        initLogic(e) {
            if (!this.allowedKeys.includes(e.key)) return
            this.direction = e.key
        },
        getRandomPoint() {
            return {
                x: this.getRandomInt(0, 3),
                y: this.getRandomInt(0, 3)
            }
        },
        collidePoints(pointA, pointB) {
            return pointA.x === pointB.x && pointA.y === pointB.y
        },
        gameTick() {
            const oldSnakePosition = { ...this.snakeHead }

            if (this.direction === 'w') {
                this.snakeHead.y--
            }
            if (this.direction === 'a') {
                this.snakeHead.x--
            }
            if (this.direction === 's') {
                this.snakeHead.y++
            }
            if (this.direction === 'd') {
                this.snakeHead.x++
            }

            if(this.snakeHead.x > 3 || this.snakeHead.x < 0 || this.snakeHead.y > 3 || this.snakeHead.y < 0) {
                clearInterval(this.gameTimer)
                return
            }

            if (this.snakeBody.length) {
                for (let i = this.snakeBody.length - 1; i > 0; i--) {
                    this.snakeBody[i] = { ...this.snakeBody[i - 1] }
                }
                this.snakeBody[0] = oldSnakePosition
            }

            const pointSpawner = this.getRandomInt(0, 100)
            if (pointSpawner > 80) {
                let newPoint = this.getRandomPoint()
                if(!this.collidePoints(newPoint, this.snakeHead) &&
                    this.snakeBody.every(point => !this.collidePoints(newPoint, point)) && 
                    this.points.every(point => !this.collidePoints(newPoint, point))) {
                        this.points.push(newPoint)
                    }
            }

            for (const index in this.points) {
                if (this.collidePoints(this.points[index], this.snakeHead)) {
                    this.score++
                    this.points.splice(index, 1)
                    this.snakeBody.push(oldSnakePosition)
                }
            }

            this.render()
        },
        render() {
            this.field = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]

            this.field[this.snakeHead.y][this.snakeHead.x] = 1
            for (const bodyPart of this.snakeBody) {
                this.field[bodyPart.y][bodyPart.x] = 2
            }

            for (const point of this.points) {
                this.field[point.y][point.x] = 3
            }
        }
    }
}
</script>

<style>
main {
    display: flex;
    flex-wrap: wrap;

    width: 24.8rem;
    margin: 8rem auto 0;
}

.row {
    display: flex;
}

.block {
    width: 6rem;
    height: 6rem;
    border: 1px solid var(--panel-btn-hover);

    box-sizing: border-box;
    margin: 0.1rem;
}

.block.snake-head {
    background-color: var(--game-snake-head);
}

.block.snake-body {
    background-color: var(--game-snake-body);
}

.block.point {
    background-color: var(--game-point);
}
</style>