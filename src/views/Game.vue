<script setup>
import { watch, onMounted, onUnmounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game.js'
import { emitter } from '@/assets/js/emitter.js'
import { notify } from '@/assets/js/notify.js'

import Header from '@/components/Header.vue'
import Menu from '@/components/menu/Menu.vue'
import PlayfieldCanvas from '@/components/canvas/PlayfieldCanvas.vue'
import LeftSideInfo from '@/components/info/LeftSideInfo.vue'
import RightSideInfo from '@/components/info/RightSideInfo.vue'
import GameOverInfo from '@/components/info/GameOverInfo.vue'
import ButtonOperation from '@/components/operation/ButtonOperation.vue'
import KeyOperation from '@/components/operation/KeyOperation.vue'

const { tetris } = storeToRefs(useGameStore())

watch(
  () => tetris.value.tetrisCount,
  (newValue) => {
    if (newValue > 0) {
      notify('warning', `TETRIS`)
    }
  },
)

watch(
  () => tetris.value.comboCount,
  (newValue) => {
    if (newValue > 1) {
      notify('warning', `${tetris.value.comboCount - 1} Combo`)
    }
  },
)

watch(
  () => tetris.value.backToBackCount,
  (newValue) => {
    if (newValue > 1) {
      notify('warning', `${tetris.value.backToBackCount - 1} BackToBack`)
    }
  },
)

onMounted(() => {
  // playGame()

  emitter.on('play', playGame) // for test
  emitter.on('reset', resetGame)
  emitter.on('replay', replayGame)
  emitter.on('left', moveLeft)
  emitter.on('right', moveRight)
  emitter.on('hardDrop', hardDrop)
  emitter.on('softDrop', softDrop)
  emitter.on('rotateRight', rotateRight)
  emitter.on('rotateLeft', rotateLeft)
  emitter.on('rotateReverse', rotateFlip)
  emitter.on('hold', holdTetromino)
})

onUnmounted(() => {
  emitter.off('play', playGame) // for test
  emitter.off('reset', resetGame)
  emitter.off('replay', replayGame)
  emitter.off('left', moveLeft)
  emitter.off('right', moveRight)
  emitter.off('hardDrop', hardDrop)
  emitter.off('softDrop', softDrop)
  emitter.off('rotateRight', rotateRight)
  emitter.off('rotateLeft', rotateLeft)
  emitter.off('rotateReverse', rotateFlip)
  emitter.off('hold', holdTetromino)
})

onBeforeRouteLeave((to, from, next) => {
  resetGame()
  next()
})

function replayGame() {
  resetGame()
  playGame()
}

function playGame() {
  tetris.value.gameLoop()
  // tetris.value.addTetromino()
}

function resetGame() {
  tetris.value.resetGame()
}

function moveLeft() {
  tetris.value.moveLeft()
}

function moveRight() {
  tetris.value.moveRight()
}

function hardDrop() {
  tetris.value.hardDrop()
}

function softDrop(enable) {
  tetris.value.softDrop(enable)
}

function rotateRight() {
  tetris.value.rotateRight()
}

function rotateLeft() {
  tetris.value.rotateLeft()
}

function rotateFlip() {
  tetris.value.rotateFlip()
}

function holdTetromino() {
  tetris.value.updateHoldTetromino()
}
</script>

<template>
  <Header>
    <Menu />
  </Header>

  <main class="flex justify-between items-center w-full">
    <LeftSideInfo />
    <PlayfieldCanvas />
    <RightSideInfo />
  </main>

  <ButtonOperation />
  <KeyOperation />

  <GameOverInfo />
</template>
