<template>
  <div class="home">
    <header class="home-header">
      <img @click="jump()" src="../assets/icon-headPortrait.png" alt="" />
    </header>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      canvas: "",
      ctx: "",
      W: "",
      H: "",
      snowCount: 100,
      snow: [],
      angle: 0,
      timer: null
    };
  },
  methods: {
    initCanvas() {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.W = window.innerWidth;
      this.H = window.innerHeight;
      this.canvas.width = this.W;
      this.canvas.height = this.H;
      // this.ctx.fillStyle = "#102a54";
      this.ctx.fillRect(0, 0, this.W, this.H);
      this.initSnow();
      this.timer = setInterval(this.draw, 50);
    },
    initSnow() {
      for (let i = 0; i < this.snowCount; i++) {
        this.snow.push({
          x: Math.random() * this.W,
          y: Math.random() * this.H,
          r: Math.random() * 5 + 2,
          d: Math.random() + 1
        });
      }
    },
    draw() {
      this.ctx.clearRect(0, 0, this.W, this.H);
      this.ctx.fillStyle = "#fff";
      this.ctx.beginPath();
      for (let i = 0; i < this.snow.length; i++) {
        let snow = this.snow[i];
        this.ctx.moveTo(snow.x, snow.y);
        this.ctx.arc(snow.x, snow.y, snow.r, 0, Math.PI * 2, true);
      }
      this.ctx.fill();
      this.moveSnow();
    },
    moveSnow() {
      this.angle += 0.01;
      for (let i = 0; i < this.snow.length; i++) {
        let snow = this.snow[i];
        snow.y += Math.pow(snow.d, 2) + 1;
        snow.x += Math.sin(this.angle) * 2;
        if (snow.y > this.H) {
          this.snow[i] = {
            x: Math.random() * this.W,
            y: 0,
            r: snow.r,
            d: snow.d
          };
        }
      }
    },
    jump() {
      this.$router.push("/layout").catch(() => {});
    }
  },
  mounted() {
    this.initCanvas();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  &-header {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    > img {
      position: inherit;
      border-radius: 50%;
    }
  }
  #canvas {
    background: #00bfff;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
