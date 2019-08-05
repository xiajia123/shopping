<template>
  <div id="app">
    <router-view />
    <van-tabbar
      v-model="active"
      active-color="red"
      v-if="$route.meta.showFooter === true"
    >
      <van-tabbar-item icon="wap-home" @click="one">商城</van-tabbar-item>
      <van-tabbar-item icon="wap-nav" @click="two">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart" @click="three" :info="num"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="contact" @click="four">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "ReserveInfo",
  data() {
    return {
      active: 0,
      num: 0
    };
  },
  components: {},
  methods: {
    one() {
      this.$router.push("/");
    },
    two() {
      this.$router.push("/Class");
    },
    three() {
      this.$router.push("/Shopping");
    },
    four() {
      this.$router.push("/My");
    }
  },
  mounted() {
    this.$axios
      .req(`api/getCard`, {})
      .then(res => {
        this.num = res.data.shopList.length;
      })
      .catch(e => {
        console.log(e);
      });
  },
  watch: {
    $route(to) {
      if (to.path === "/") {
        this.active = 0;
      }
      if (to.path === "/class") {
        this.active = 1;
      }
      if (to.path === "/shopping") {
        this.active = 2;
      }
      if (to.path === "/my") {
        this.active = 3;
      }
    }
  }
};
</script>
<style lang="scss">
@import "style/common";
.search {
  color: red;
}
</style>
