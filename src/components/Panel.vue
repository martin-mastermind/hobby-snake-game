<template>
    <nav>
        <section class="score">
            <div class="current">Current: 0</div>
            <div class="best">Best: 10</div>
        </section>
        <section class="controls">
            <div class="controls-btn play">
                <img src="@/assets/play.png" alt="">
            </div>
            <div class="controls-btn pause">
                <img src="@/assets/pause.png" alt="">
            </div>
            <div class="controls-btn reset">
                <img src="@/assets/reset.png" alt="">
            </div>
        </section>
    </nav>
</template>

<script>
export default {
  name: 'Panel'
}
</script>

<style>
nav {
    display: flex;
    background: var(--panel-background);
    color: #fff;

    justify-content: space-around;
    align-items: center;

    padding: 0.5rem 0;
}

.score {
    font-size: 2rem;
}

.best {
    font-size: 1.5rem;
}

.controls {
    display: flex;
}

.controls-btn {
    width: 3rem;
    height: 3rem;

    cursor: pointer;
    margin: 0 0.5rem;

    border: 1px solid var(--panel-btn-hover);
    border-radius: 10px;
    background-color: var(--panel-btn-main);

    transition: .3s background-color;
}

.controls-btn:hover {
    background-color: var(--panel-btn-hover);
}

.controls-btn:active {
    background-color: var(--panel-btn-active);
}

.controls-btn img {
    width: 100%;
    height: 100%;
}
</style>