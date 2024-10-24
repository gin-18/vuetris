<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game.js'
import { palette } from '@/assets/js/palette.js'

const canvas = ref(null)
const width = computed(() => canvas.value.width)
const height = computed(() => canvas.value.height)
const ctx = computed(() => canvas.value.getContext('2d'))

const { block, tetris, isDrawGhostPiece } = storeToRefs(useGameStore())

watch(
  [
    () => tetris.value.matrix,
    () => tetris.value.activeTetromino,
    () => isDrawGhostPiece.value,
  ],
  () => {
    clearCanvas()
    drawPlayfield()
  },
  { deep: true },
)

onMounted(() => {
  canvas.value.width = block.value * 10
  canvas.value.height = block.value * 20
})

function drawPlayfield() {
  if (!tetris.value.activeTetromino) return
  drawMatrix()
  drawGhostPiece()
  drawActiveTetromino()
}

function clearCanvas() {
  ctx.value.clearRect(0, 0, width.value, height.value)
}

function drawMatrix() {
  const w = tetris.value.matrix[0].length
  const h = tetris.value.matrix.length

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!tetris.value.matrix[y][x]) continue

      ctx.value.fillStyle =
        palette.tetrominoColor[tetris.value.matrix[y][x] - 1]
      ctx.value.fillRect(
        x * block.value,
        (y - 2) * block.value,
        // y * block.value,
        block.value,
        block.value,
      )
    }
  }
}

function drawGhostPiece() {
  if (!JSON.parse(isDrawGhostPiece.value)) return

  const tetromino = tetris.value.activeTetromino
  const color = palette.previewColor
  const ghostPieceYOffset = tetris.value.getLandTetrominoYOffset(tetromino.y)
  const piece = tetromino.pieces[tetromino.rotation]

  ctx.value.fillStyle = color
  for (let i = 0; i < piece.length; i++) {
    const x = piece[i][0] + tetromino.x
    const y = piece[i][1] + ghostPieceYOffset

    ctx.value.fillRect(
      x * block.value,
      (y - 2) * block.value,
      // y * block.value,
      block.value,
      block.value,
    )
  }
}

function drawActiveTetromino() {
  const tetromino = tetris.value.activeTetromino
  const color = tetromino.color
  const piece = tetromino.pieces[tetromino.rotation]

  ctx.value.fillStyle = color
  for (let i = 0; i < piece.length; i++) {
    const x = piece[i][0] + tetromino.x
    const y = piece[i][1] + tetromino.y
    ctx.value.fillRect(
      x * block.value,
      (y - 2) * block.value,
      // y * block.value,
      block.value,
      block.value,
    )
  }
}
</script>

<template>
  <canvas class="border-4 border-black bg-nes-black" ref="canvas"></canvas>
</template>
