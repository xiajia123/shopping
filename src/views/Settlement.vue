<template>
  <div>
    <div class="set">
      <van-icon
        name="arrow-left"
        size="25px"
        color="pink"
        class="arrow-left"
        @click="left"
      ></van-icon>
      <div class="set1">订单结算</div>
    </div>
    <div class="se3">
      <div class="se">
        <div>收货人:{{ obj.name }}</div>
        <div>{{ obj.tel }}</div>
      </div>
      <div class="se1">
        <div>收货地址:{{ obj.address }}</div>
        <van-icon
          name="arrow"
          size="20px"
          class="right"
          @click="right"
        ></van-icon>
      </div>
      <div class="se2">（收货不便时,可选择免费待收货服务）</div>
      <van-icon name="location-o" size="30px" class="location"></van-icon>
    </div>
    <div>
      <img src="../assets/caitiao.jpg" alt="" class="im1" />
    </div>
    <div>
      <div class="d" v-for="(item, index) in arr" :key="index">
        <div>
          <img :src="item.image_path" alt="" class="im" />
        </div>
        <div>
          <div class="s">{{ item.name }}</div>
          <div class="d1">
            <span class="s1"
              ><b>￥{{ item.present_price }}</b></span
            >
            <div class="s2">×{{ item.count }}</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <van-submit-bar
        :price="Number(num)"
        button-text="提交订单"
        @submit="onSubmit"
      ></van-submit-bar>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Settlement",
  components: {},
  props: {},
  data() {
    return {
      obj: {},
      arr: [],
      id: [],
      count: null,
      idDirect: ""
    };
  },
  methods: {
    left() {
      this.$router.go(-1);
    },
    right() {
      this.$router.push({ name: "edit", query: { item: this.obj } });
    },
    onSubmit() {
      axios
        .post("api/order", {
          address: this.obj.address,
          tel: this.obj.tel,
          orderId: this.id,
          totalPrice: this.num,
          count: this.count,
          idDirect: this.idDirect
        })
        .then(res => {
          this.$toast(res.data.msg);
          this.$router.go(-1);
          // console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.$axios
      .req(`api/getDefaultAddress`)
      .then(res => {
        this.obj = res.data.defaultAdd;
        // console.log(this.obj);
      })
      .catch(e => {
        console.log(e);
      });
    this.arr = this.$route.query.item;
    this.arr.map(item => {
      this.id.push(item.id);
      this.count += item.count;
    });
  },
  created() {},
  filters: {},
  computed: {
    num() {
      let sun = 0;
      this.arr.map(item => {
        sun += item.present_price * item.count * 100;
      });
      return sun;
    }
  },
  watch: {},
  directives: {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.path === "/Shopping") {
        vm.idDirect = false;
      }
      if (from.path === "/details") {
        vm.idDirect = true;
      }
    });
  }
};
</script>

<style scoped>
.set {
  display: flex;
  font-size: 40px;
  text-align: center;
  line-height: 100px;
  border-bottom: #eeeeee solid 2px;
  margin-left: 20px;
}
.set1 {
  width: 85%;
  text-align: center;
}
.arrow-left {
  margin: 26px 0;
}
.se {
  display: flex;
  justify-content: space-around;
  font-size: 32px;
  margin: 30px 0;
}
.se1 {
  display: flex;
  font-size: 26px;
  margin-bottom: 20px;
  margin-left: 90px;
}
.se2 {
  color: orange;
  margin-left: 80px;
}
.se3 {
  position: relative;
}
.right {
  position: absolute;
  right: 20px;
}
.location {
  position: absolute;
  left: 20px;
  top: 40px;
}
.im1 {
  width: 100%;
  margin: 20px 0;
}
.im {
  width: 200px;
  border: pink solid 1px;
}
.s {
  margin: 5px 30px;
  font-size: 30px;
  width: 400px;
  color: red;
}
.d {
  border-bottom: pink solid 1px;
  padding: 20px 10px;
  display: flex;
  position: relative;
}
.s1 {
  color: red;
  margin-right: 30px;
  font-size: 30px;
}
.d1 {
  margin-top: 80px;
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
}
.s2 {
  font-size: 30px;
}
/*.danger {*/
/*  width: 30%;*/
/*  height: 100px;*/
/*  position: absolute;*/
/*  bottom: 0;*/
/*  right: 0;*/
/*}*/
</style>
