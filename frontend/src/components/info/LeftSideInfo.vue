<script setup>
import { useGameStore } from "@/stores/game.js";

import InfoBox from "./InfoBox.vue";
import HoldTetrominoCanvas from "@/components/canvas/HoldTetrominoCanvas.vue";

const game = useGameStore();
</script>

<template>
  <div class="flex flex-col justify-between h-full">
    <InfoBox title="HOLD">
      <HoldTetrominoCanvas />
    </InfoBox>

    <div class="flex flex-col gap-6">
      <InfoBox title="LINES">
        <p>{{ game.lines }}</p>
      </InfoBox>

      <InfoBox title="LEVEL">
        <p>{{ game.level }}</p>
      </InfoBox>
    </div>
  </div>
</template>
