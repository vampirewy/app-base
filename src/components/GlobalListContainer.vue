<template>
  <div class="list-container">
    <article v-for="(item, index) in list" :key="index" class="list-container__item" @click="toDetail(item)">
      <h2 class="list-container__item--title">{{ item.title }}</h2>
      <p class="list-container__item--subtitle">{{ item.subTitle }}</p>
      <footer class="list-container__item--footer">
        <span>{{ item.releaseTime }}</span>
        <span>{{ item.author }}</span>
      </footer>
    </article>
  </div>
</template>

<script>
export default {
  name: 'GlobalListContainer',
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    toDetail(currentItem) {
      this.$emit('toDetail', currentItem)
    },
  },
}
</script>

<style lang="scss" scoped>
.list-container {
  &__item {
    cursor: pointer;
    margin-bottom: 20px;
    &:not(:last-child) {
      border-bottom: 1px dotted #ccc;
    }
    &--title {
      font-size: 20px;
      margin-bottom: 20px;
      color: #707070;
    }
    &--subtitle {
      margin-bottom: 20px;
      color: #9c9c9c;
    }
    &--footer {
      color: #9c9c9c;
      margin-bottom: 20px;
      span {
        margin-right: 20px;
      }
    }
  }
}
</style>
