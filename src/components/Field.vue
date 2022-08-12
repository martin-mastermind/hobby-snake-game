<template>
    <main>
        <div class="row" v-for="(row, i) in field" :key="`r-${i}`">
            <div class="block" v-for="(block, j) in row" :class="{
                'snake-head': block === 1,
                'snake-body': block === 2,
                'point': block === 3
            }" :key="`r-c-${j}`" :ref="`block-${j}-${i}`">
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
            field: [],
            snakeHead: {
                x: 0,
                y: 0
            },
            snakeBody: [],
            points: [],

            direction: null,
            gameTimer: null,
        }
    },
    computed: {
        ...mapGetters(['isStarted']),
        fieldSize() {
            return 24
        },
        pointsLimit() {
            return 4
        },
        fps() {
            return 6
        },
        keys() {
            return {
                UP: 87,
                LEFT: 65,
                DOWN: 83,
                RIGHT: 68
            }
        },
        movement() {
            return {
                [this.keys.UP]: () => this.snakeHead.y--,
                [this.keys.LEFT]: () => this.snakeHead.x--,
                [this.keys.DOWN]: () => this.snakeHead.y++,
                [this.keys.RIGHT]: () => this.snakeHead.x++
            }
        },
        headColliders() {
            return {
                [this.keys.UP]: point => ({
                    x: Math.abs(this.snakeHead.x - point.x) <= 1,
                    y: this.snakeHead.y === point.y || this.snakeHead.y === point.y + 1
                }),
                [this.keys.LEFT]: point => ({
                    x: this.snakeHead.x === point.x || this.snakeHead.x === point.x + 1,
                    y: Math.abs(this.snakeHead.y - point.y) <= 1
                }),
                [this.keys.DOWN]: point => ({
                    x: Math.abs(this.snakeHead.x - point.x) <= 1,
                    y: this.snakeHead.y + 1 === point.y || this.snakeHead.y + 1 === point.y + 1
                }),
                [this.keys.RIGHT]: point => ({
                    x: this.snakeHead.x + 1 === point.x || this.snakeHead.x + 1 === point.x + 1,
                    y: Math.abs(this.snakeHead.y - point.y) <= 1
                })
            }
        }
    },
    created() {
        this.field = Array.from(Array(this.fieldSize), () => new Array(this.fieldSize).fill(0))
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
            this.drawResolutedBlock(this.snakeHead, 1)

            this.gameTimer = requestAnimationFrame(this.gameTick)
        },
        resetGame() {
            this.field = Array.from(Array(this.fieldSize), () => new Array(this.fieldSize).fill(0))

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

            if (!Object.values(this.keys).includes(e.keyCode)) return

            if (this.direction === this.keys.UP && e.keyCode === this.keys.DOWN) return
            if (this.direction === this.keys.LEFT && e.keyCode === this.keys.RIGHT) return
            if (this.direction === this.keys.DOWN && e.keyCode === this.keys.UP) return
            if (this.direction === this.keys.RIGHT && e.keyCode === this.keys.LEFT) return
            
            this.direction = e.keyCode
        },
        getRandomPoint() {
            return {
                x: this.getRandomInt(0, this.fieldSize - 2),
                y: this.getRandomInt(0, this.fieldSize - 2)
            }
        },
        collidePoints(pointA, pointB) {
            const xCollider = pointA.x === pointB.x || pointA.x === pointB.x + 1 || pointA.x + 1 === pointB.x || pointA.x + 1 === pointB.x + 1
            const yCollider = pointA.y === pointB.y || pointA.y === pointB.y + 1 || pointA.y + 1 === pointB.y || pointA.y + 1 === pointB.y + 1

            return xCollider && yCollider
        },
        headCollide(point) {
            if (!this.direction) return false

            const { x, y } = this.headColliders[this.direction](point)

            return x && y
        },
        gameTick() {
            if (!this.isStarted) return

            const oldHeadPosition = { ...this.snakeHead }
            const oldTailPosition = this.snakeBody.length ? { ...this.snakeBody[this.snakeBody.length - 1] } : null

            if (this.direction) this.movement[this.direction]()

            const outOfMap = this.snakeHead.x > this.fieldSize - 2 || this.snakeHead.x < 0 || this.snakeHead.y > this.fieldSize - 2 || this.snakeHead.y < 0
            const selfEaten = this.snakeBody.some(point => this.headCollide(point))

            if (outOfMap || selfEaten) {
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
            if (pointSpawner > 80 && this.points.length < this.pointsLimit) {
                let newPoint = this.getRandomPoint()
                if (!this.collidePoints(newPoint, this.snakeHead) &&
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
            this.field = Array.from(Array(this.fieldSize), () => new Array(this.fieldSize).fill(0))

            this.drawResolutedBlock(this.snakeHead, 1)

            for (const bodyPart of this.snakeBody) {
                this.drawResolutedBlock(bodyPart, 2)
            }

            for (const point of this.points) {
                this.drawResolutedBlock(point, 3)
            }
        },
        drawResolutedBlock(point, colorCode) {
            this.field[point.y][point.x] = this.field[point.y][point.x] === 1 ? 1 : colorCode
            this.field[point.y + 1][point.x] = this.field[point.y + 1][point.x] === 1 ? 1 : colorCode
            this.field[point.y][point.x + 1] = this.field[point.y][point.x + 1] === 1 ? 1 : colorCode
            this.field[point.y + 1][point.x + 1] = this.field[point.y + 1][point.x + 1] === 1 ? 1 : colorCode
        }
    }
}
</script>

<style>
main {
    display: flex;
    flex-wrap: wrap;

    width: 36rem;
    margin: 8rem auto 0;
}

.row {
    display: flex;
}

.block {
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid var(--panel-btn-hover);

    box-sizing: border-box;
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