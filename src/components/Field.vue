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
import { mapActions, mapGetters } from 'vuex'

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
            allowedKeys: [87, 65, 83, 68],
            direction: null,
            pointsLimit: 3,

            gameTimer: null,
            fps: 2
        }
    },
    computed: {
        ...mapGetters(['isStarted'])
    },
    created() {
        window.addEventListener('keyup', this.initLogic)
    },
    watch: {
        isStarted(newVal) {
            if (newVal) this.startGame()
        }
    },
    methods: {
        ...mapActions(['addScore', 'resetScore', 'reset']),
        getRandomInt(min, max) {
            const rand = min + Math.random() * (max + 1 - min)
            return Math.floor(rand)
        },
        startGame() {
            this.snakeHead = this.getRandomPoint();
            this.field[this.snakeHead.y][this.snakeHead.x] = 1

            this.gameTimer = requestAnimationFrame(this.gameTick)
        },
        resetGame() {
            this.field = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]

            this.snakeHead = {
                x: 0,
                y: 0
            }

            this.snakeBody = []
            this.points = []

            this.direction = null

            cancelAnimationFrame(this.gameTimer)
            this.gameTimer = null

            this.reset()
        },
        initLogic(e) {
            if (!this.isStarted) return

            if (!this.allowedKeys.includes(e.keyCode)) return
            this.direction = e.keyCode
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
            if (!this.isStarted) return
            
            const oldHeadPosition = { ...this.snakeHead }
            const oldTailPosition = this.snakeBody.length ? { ...this.snakeBody[this.snakeBody.length - 1] } : null

            if (this.direction === 87) {
                this.snakeHead.y--
            }
            if (this.direction === 65) {
                this.snakeHead.x--
            }
            if (this.direction === 83) {
                this.snakeHead.y++
            }
            if (this.direction === 68) {
                this.snakeHead.x++
            }

            const outOfMap = this.snakeHead.x > 3 || this.snakeHead.x < 0 || this.snakeHead.y > 3 || this.snakeHead.y < 0
            const selfEaten = this.snakeBody.some(point => point.x === this.snakeHead.x && point.y === this.snakeHead.y)

            if(outOfMap || selfEaten) {
                this.resetScore()
                setTimeout(this.resetGame, 500)
                return
            }

            if (this.snakeBody.length) {
                for (let i = this.snakeBody.length - 1; i > 0; i--) {
                    this.snakeBody[i] = { ...this.snakeBody[i - 1] }
                }
                this.snakeBody[0] = oldHeadPosition
            }

            const pointSpawner = this.getRandomInt(0, 100)
            if (pointSpawner > 75 && this.points.length < this.pointsLimit) {
                let newPoint = this.getRandomPoint()
                if(!this.collidePoints(newPoint, this.snakeHead) &&
                    this.snakeBody.every(point => !this.collidePoints(newPoint, point)) && 
                    this.points.every(point => !this.collidePoints(newPoint, point))) {
                        this.points.push(newPoint)
                    }
            }

            for (const index in this.points) {
                if (this.collidePoints(this.points[index], this.snakeHead)) {
                    this.addScore()
                    this.points.splice(index, 1)
                    this.snakeBody.push(oldTailPosition ? oldTailPosition : oldHeadPosition)
                }
            }

            this.render()

            setTimeout(() => {
                this.gameTimer = requestAnimationFrame(this.gameTick)
            }, 1000 / this.fps)
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