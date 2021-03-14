<template>
  <div>
    <div class="circle-1 circle p-1">
      <div class="circle-2 circle p-1">
        <div class="circle-3 circle p-4 text-center">{{ percentage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percentage: {
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.circle {
  border-radius: 50%;
}
.circle-1 {
  background: white;
  display: inline-block;
}
.circle-2 {
  background: linear-gradient(to right, #fff5, #555);
    animation: rotate 0.750s linear infinite;
}
.circle-3 {
  background: white;
  height: 3rem;
  width: 3rem;
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
