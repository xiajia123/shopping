<template>
  <div class="home1">
    <div class="set">
      <van-icon
        name="arrow-left"
        size="25px"
        color="pink"
        class="arrow-left"
        @click="left"
      ></van-icon>
      <div class="set1">全部订单</div>
    </div>
    <van-tabs v-model="active" :swipe-threshold="5">
      <van-tab title="全部"></van-tab>
      <van-tab title="待支付"></van-tab>
      <van-tab title="待发货"></van-tab>
      <van-tab title="待收货"></van-tab>
      <van-tab title="已完成">
        <div v-for="(item, index) in list" :key="index" class="order">
          <div class="order3">订单编号:{{ item.order_id }}</div>
          <div
            v-for="(item1, index1) in item.order_list"
            :key="index1"
            class="d"
          >
            <div>
              <img :src="item1.image_path" alt="" class="im" />
            </div>
            <div class="order1">
              <div>{{ item1.name }}</div>
              <span>￥{{ item1.present_price }}</span>
            </div>
            <div class="order4">×{{ item1.count }}</div>
          </div>
          <div class="order2">
            <div>创建时间:{{ item.add_time }}</div>
            <div>收货地址:{{ item.address }}</div>
            <div>
              共{{ item.order_list.length }}件商品 合计:{{ item.mallPrice }}
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "Order",
  components: {},
  props: {},
  data() {
    return {
      active: 4,
      list: []
    };
  },
  methods: {
    left() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.$axios
      .req(`api/myOrder`)
      .then(res => {
        this.list = res.data.list;
        // this.list.map(item => {
        //   item.order_list.map(item => {
        //     console.log(item.count);
        //   });
        // });
      })
      .catch(e => {
        console.log(e);
      });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped>
.home1 {
  background: #eeeeee;
}
.set {
  display: flex;
  font-size: 32px;
  text-align: center;
  line-height: 100px;
  background: white;
}
.set1 {
  width: 80%;
  text-align: center;
}
.arrow-left {
  margin: 26px 20px;
}
.van-tab span {
  font-size: 28px;
}
.order {
  width: 90%;
  margin: 40px auto;
  border-radius: 20px;
  position: relative;
  background: white;
}
.order1 {
  margin: 5px 30px;
  font-size: 30px;
  width: 500px;
  display: flex;
  justify-content: space-between;
}
.order2 {
  margin: 20px 20px;
  text-align: right;
  font-size: 30px;
  line-height: 50px;
}
.order3 {
  padding: 20px 20px;
  font-size: 30px;
  border-bottom: #eeeeee solid 2px;
}
.order4 {
  font-size: 30px;
  color: #7d7e80;
  position: absolute;
  right: 40px;
  top: 60px;
}
.im {
  width: 200px;
  border: #eeeeee solid 2px;
  border-radius: 20px;
}
.d {
  border-bottom: #eeeeee solid 2px;
  padding: 20px 10px;
  display: flex;
  position: relative;
}
</style>
