<template>
  <div>
    <div class="dv5">会员中心</div>
    <div class="dv6">
      <div>
        <img src="../assets/logo.jpg" alt="" class="i" />
        <div class="a" v-if="username === '' || username === null" @click="cl">
          请登录
        </div>
        <div v-else>
          <h2 class="h2">欢迎您 : {{ username }}</h2>
          <div class="a" @click="cli">退出登录</div>
        </div>
        <van-icon
          name="setting"
          color="white"
          class="set"
          @click="set"
        ></van-icon>
      </div>
    </div>
    <van-tabbar
      v-model="active"
      :fixed="false"
      :border="false"
      :route="true"
      class="dv7"
    >
      <van-tabbar-item icon="bill-o">待付款</van-tabbar-item>
      <van-tabbar-item icon="free-postage">待发货</van-tabbar-item>
      <van-tabbar-item icon="points">待收货</van-tabbar-item>
      <van-tabbar-item icon="thumb-circle-o" :info="num" to="/evaluate"
        >评价</van-tabbar-item
      >
      <van-tabbar-item icon="like-o">已完成</van-tabbar-item>
    </van-tabbar>
    <div class="dv8" @click="Order">
      <van-icon name="records"></van-icon>
      <div>全部订单</div>
      <van-icon name="arrow" class="arr"></van-icon>
    </div>
    <div class="dv8" @click="Collection">
      <van-icon name="star-o"></van-icon>
      <div>收藏商品</div>
      <van-icon name="arrow" class="arr"></van-icon>
    </div>
    <div class="dv8" @click="address">
      <van-icon name="location-o"></van-icon>
      <div>地址管理</div>
      <van-icon name="arrow" class="arr"></van-icon>
    </div>
    <div class="dv8" @click="browse">
      <van-icon name="eye-o"></van-icon>
      <div>最近浏览</div>
      <van-icon name="arrow" class="arr"></van-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "My",
  components: {},
  props: {},
  data() {
    return {
      active: 0,
      username: "",
      num: 0
    };
  },
  methods: {
    cli() {
      localStorage.clear("name");
      this.username = "";
    },
    cl() {
      this.$router.push("/logon");
    },
    set() {
      this.$router.push("/set");
    },
    Collection() {
      this.$router.push("/collection");
    },
    address() {
      this.$router.push("/address");
    },
    Order() {
      this.$router.push("/order");
    },
    browse() {
      this.$router.push("/browse");
    }
  },
  mounted() {
    this.username = localStorage.getItem("name");
    this.num = localStorage.getItem("evaluate");
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped>
.dv5 {
  text-align: center;
  font-size: 32px;
  padding: 20px 0;
}
.dv6 {
  width: 100%;
  height: 500px;
  background: pink;
  text-align: center;
  position: relative;
}
.i {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-top: 100px;
}
.a {
  color: white;
  margin-top: 20px;
  font-size: 32px;
}
.h2 {
  color: white;
}
.set {
  font-size: 40px;
  position: absolute;
  right: 20px;
  top: 20px;
}
.dv7 {
  margin: 40px 0;
  font-size: 32px;
}
.dv8 {
  display: flex;
  padding: 30px 20px;
  border-bottom: pink solid 2px;
  position: relative;
  margin-bottom: 10px;
}
.arr {
  position: absolute;
  right: 30px;
}
</style>
