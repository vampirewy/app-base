<template>
  <div class="layout">
    <nav class="layout-nav">
      <ul>
        <li
          :class="activeIndex === index ? 'active-item' : ''"
          class="layout-nav__item"
          v-for="(item, index) in navList"
          :key="index"
          @click="onMenuClick(item, index)"
        >
          {{ item.title }}
        </li>
      </ul>
    </nav>
    <main class="layout-main">
      <header class="layout-main__header">
        <p class="layout-main__header--title">Blog</p>
      </header>
      <section class="layout-main__content">
        <router-view></router-view>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      activeIndex: 0,
      navList: [
        { title: "HTML", name: "module-html/list" },
        { title: "CSS", name: "module-css/list" },
        // { title: "JavaScript", name: "module-js/list" },
        // { title: "TypeScript", name: "module-ts/list" },
        // { title: "Linux", name: "module-linux/list" },
        // { title: "Nginx", name: "module-nginx/list" }
      ]
    };
  },
  methods: {
    onMenuClick(current, idx) {
      this.activeIndex = idx;
      this.$router
        .push({
          path: `/layout/${current.name}`
        })
        .catch(() => {});
    },
    refresh() {
      const linkUrl = window.location.href;
      this.navList.forEach((item, index) => {
        if (linkUrl.includes(item.name)) {
          this.activeIndex = index;
        }
      });
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>

<style lang="scss" scoped>
.layout {
  &-nav {
    > ul {
      height: 70px;
      background: rgba(0, 0, 0, 0.8);
      // background: linear-gradient(
      //   to right,
      //   #171717 35%,
      //   #545454 50%,
      //   #171717 65%
      // );
      display: flex;
      color: #fff;
      justify-content: center;
      align-items: center;
    }
    &__item {
      cursor: pointer;
      margin-right: 20px;
      font-weight: 900;
      // font-size: 18px;
      &:nth-child(4) {
        font-size: 20px;
      }
    }
    margin-bottom: 30px;
  }
  &-main {
    border-radius: 5px;
    background: #fff;
    margin-left: 200px;
    margin-right: 200px;
    padding-bottom: 30px;
    // clip-path: polygon(50% 30%, 100% 0, 100% 100%, 0 100%, 0 0);
    &__header {
      // margin-bottom: 20px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      position: relative;
      height: 60px;
      background: #fd4f27;
      color: #fff;
      font-size: 30px;
      line-height: 60px;
      padding: 0 30px;
      &::after {
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        top: 60px;
        left: 35px;
        border: 10px solid transparent;
        border-top: 10px solid #fd4f27;
      }
    }
    &__content {
      padding: 30px 30px 0 30px;
    }
  }
}
.active-item {
  color: #fd4f27;
}
// .clip-path {
//   -webkit-clip-path: polygon(50% 100%, 100% 60%, 100% 0, 0 1%, 0 60%);
//   clip-path: polygon(50% 100%, 100% 60%, 100% 0, 0 1%, 0 60%);
// }
</style>
