<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useGameStore } from "@/stores/game.js";
import { palette } from "@/assets/js/palette.js";

// get canvas info
const canvas = ref(null);
const width = computed(() => canvas.value.width);
const height = computed(() => canvas.value.height);
const ctx = computed(() => canvas.value.getContext("2d"));

const game = useGameStore();

const props = defineProps({
  block: Number,
});

watch(
  () => game.holdTetromino,
  () => {
    clearCanvas();
    drawHoldTetromino();
  },
  { deep: true },
);

onMounted(() => {
  canvas.value.width = props.block * 4;
  canvas.value.height = props.block * 4;
});

function clearCanvas() {
  ctx.value.clearRect(0, 0, width.value, height.value);
}

function drawHoldTetromino() {
  const tetromino = game.holdTetromino;
  const name = tetromino.name;
  const color = tetromino.color;
  const piece = tetromino.pieces[0];

  if (tetromino.holdLock) {
    ctx.value.fillStyle = palette.previewColor;
  } else {
    ctx.value.fillStyle = color;
  }

  for (let i = 0; i < piece.length; i++) {
    const x = piece[i][0] + setXOffset(name);
    const y = piece[i][1] + setYOffset(name);

    ctx.value.fillRect(
      x * props.block,
      y * props.block,
      props.block,
      props.block,
    );
  }
}

function setXOffset(name) {
  const arr = ["T", "S", "Z", "J", "L"];

  if (arr.includes(name)) {
    return 1.5;
  }

  return 1;
}

function setYOffset(name) {
  if (name === "I") {
    return 1.5;
  }

  return 2;
}
</script>

<template>
  <canvas class="border-4 border-black bg-black" ref="canvas"></canvas>
</template>
