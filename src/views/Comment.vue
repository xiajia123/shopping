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
      <div class="set1">评价中心</div>
    </div>
    <div class="com">
      <img :src="obj.image_path" alt="" class="im5" />
      <div>
        <div>商品评论</div>
        <van-rate
          v-model="value"
          :size="25"
          color="#f44"
          void-icon="star"
          void-color="#eee"
        ></van-rate>
      </div>
    </div>
    <van-cell-group :border="false">
      <van-field
        v-model="value1"
        placeholder="说说你的购买感受吧~~"
        class="com1"
      ></van-field>
    </van-cell-group>
    <div class="com2">
      <van-radio-group v-model="radio">
        <van-radio
          name="1"
          checked-color="#07c160"
          class="radio"
          icon-size="20px"
          @click="rad"
          >匿名评价</van-radio
        >
      </van-radio-group>
    </div>
    <div class="com3">
      <van-button type="primary" size="large" class="primary" @click="Selection"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Comment",
  components: {},
  props: {},
  data() {
    return {
      obj: {},
      value: 5,
      value1: "",
      radio: "0",
      flag: null
    };
  },
  methods: {
    left() {
      this.$router.go(-1);
    },
    rad() {
      this.radio = "1";
    },
    Selection() {
      if (this.radio === "1") {
        this.flag = true;
      } else {
        this.flag = false;
      }
      axios
        .post(`api/goodsOne/comment`, {
          anonymous: this.flag,
          content: this.value1,
          id: this.obj.cid,
          image: [],
          order_id: this.obj.order_id,
          rate: this.value,
          _id: this.obj._id
        })
        .then(res => {
          this.$router.go(-1);
          this.$toast(res.data.msg);
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.obj = this.$route.query.item;
    console.log(this.obj);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped>
.set {
  display: flex;
  font-size: 32px;
  text-align: center;
  line-height: 100px;
  margin-left: 20px;
  border-bottom: pink solid 2px;
}
.set1 {
  width: 85%;
  text-align: center;
}
.arrow-left {
  margin: 26px 0;
}
.im5 {
  width: 200px;
}
.com {
  display: flex;
  font-size: 32px;
  line-height: 100px;
  margin: 20px 0;
}
.com1 {
  width: 100%;
  background: #eeeeee;
  height: 400px;
}
.com2 {
  margin: 20px 40px;
  font-size: 32px;
  line-height: 60px;
}
.com3 {
  width: 90%;
  margin: 60px auto;
}
.primary {
  height: 100px;
}
.radio {
  height: 60px;
}
</style>
