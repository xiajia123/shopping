<template>
  <div v-if="obj" class="div8">
    <div>
      <van-swipe
        :autoplay="3000"
        position="right"
        :style="{ height: '100%', width: '100%' }"
      >
        <van-swipe-item>
          <img alt="" :src="obj.image" style="width: 100%" />
        </van-swipe-item>
        <van-swipe-item>
          <img alt="" :src="obj.image_path" style="width: 100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="div2">
      <div class="x">{{ obj.name }}</div>
      <div class="x1">￥{{ obj.present_price }}</div>
    </div>
    <div class="div3">
      <div>运费:0</div>
      <div>剩余:10000</div>
      <div>
        取消收藏:
        <van-icon
          name="like-o"
          size="25px"
          class="like"
          @click="Collection"
          v-if="flag === false"
        ></van-icon>
        <van-icon
          v-if="flag === true"
          name="like"
          color="red"
          size="25px"
          class="like"
          @click="Collection"
        ></van-icon>
      </div>
    </div>
    <div class="div4">
      <van-icon name="shop-collect-o" size="20px" class="but"></van-icon>
      <div class="x">有赞的店</div>
      <van-button type="danger" class="but">官方</van-button>
      <div class="div5">进入店铺<van-icon name="arrow"></van-icon></div>
    </div>
    <div class="div9" @click="retreat">
      <van-icon name="arrow-left" size="25px"></van-icon>
    </div>
    <van-tabs v-model="active" class="va_ellipsis_bar" line-width="150px">
      <van-tab title="商品详情">
        <div v-html="obj.detail"></div>
      </van-tab>
      <van-tab title="商品评价">
        <div v-if="arr.length > 0">
          <div class="pj1" v-for="(item, index) in arr" :key="index">
            <div class="pj">
              <div v-if="item.anonymous === true">
                <img :src="item.comment_avatar" alt="" class="mg" />
              </div>
              <div v-if="item.anonymous === false">
                <img src="../assets/logo.jpg" alt="" class="mg" />
              </div>
              <div>
                <div class="pj2">
                  <div v-if="item.anonymous === true">
                    {{ item.comment_nickname }}
                  </div>
                  <div v-if="item.anonymous === false">
                    {{ name }}
                  </div>
                </div>
                <div class="pj3">
                  <van-rate v-model="item.rate"></van-rate>
                </div>
              </div>
            </div>
            <div>
              <div class="pj4">
                {{ item.comment_time }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no">
          这件商品还没有评论
        </div>
      </van-tab>
      <br /><br /><br /><br /><br />
    </van-tabs>
    <van-goods-action>
      <van-goods-action-icon
        icon-class="icon"
        icon="chat-o"
        text="客服"
        class="div7"
      ></van-goods-action-icon>
      <van-goods-action-icon
        icon-class="icon"
        icon="cart-o"
        text="购物车"
        class="div7"
        :info="num"
      ></van-goods-action-icon>
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        class="div7"
        @click="join"
      ></van-goods-action-button>
      <van-goods-action-button
        type="danger"
        text="立即购买"
        class="div7"
        @click="showPopup"
      ></van-goods-action-button>
    </van-goods-action>
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <div class="d">
        <div>
          <img :src="obj.image" alt="" class="im" />
        </div>
        <div>
          <div class="s">{{ obj.name }}</div>
          <div class="d1">
            <span class="s1"
              ><b>￥{{ (obj.present_price * value).toFixed(2) }}</b></span
            >
          </div>
        </div>
        <van-icon
          name="close"
          size="25px"
          @click="close"
          class="close"
        ></van-icon>
      </div>
      <div class="div10">
        <div>
          <div>购买数量:</div>
          <div class="div11">
            <span class="span2">剩余10000件</span>
            <span class="span3">每人限购五十件</span>
          </div>
        </div>
        <div>
          <van-stepper
            v-model="value"
            :min="1"
            :max="50"
            button-size="35px"
            input-width="35px"
          ></van-stepper>
        </div>
      </div>
      <van-button type="danger" size="large" class="btn" @click="purchase(obj)"
        >立即购买</van-button
      >
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Details",
  components: {},
  props: {},
  data() {
    return {
      id: "",
      obj: {},
      active: 0,
      flag: false,
      show: false,
      list: [],
      value: 1,
      arr: [],
      name: "",
      num: 0,
      ID: [],
      arr1: []
    };
  },
  methods: {
    purchase(obj) {
      this.obj.count = this.value;
      this.list.push(obj);
      this.$router.push({ name: "settlement", query: { item: this.list } });
      // console.log(this.list);
    },
    close() {
      this.show = false;
    },
    showPopup() {
      this.show = true;
    },
    Collection() {
      this.flag = !this.flag;
      if (this.flag === true) {
        axios
          .post("api/collection", this.obj)
          .then(res => {
            this.$toast(res.data.msg);
            // console.log(res);
          })
          .catch(e => {
            console.log(e);
          });
      }
      if (this.flag === false) {
        this.$axios
          .req("api/cancelCollection", { id: this.id })
          .then(res => {
            this.$toast(res.data.msg);
            // console.log(res);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    retreat() {
      this.$router.go(-1);
    },
    join() {
      this.id = this.$route.query.id;
      this.$axios
        .req(`api/addShop`, { id: this.id })
        .then(res => {
          this.$toast(res.data.msg);
          // console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
      this.$axios
        .req(`api/getCard`, {})
        .then(res => {
          this.num = res.data.shopList.length;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.$axios
      .req(`api/goods/one?id=${this.id}&page=${1}`)
      .then(res => {
        this.obj = res.data.goods.goodsOne;
        this.arr = res.data.goods.comment;
        this.arr1.push(this.obj);
        this.arr1 = this.arr1.filter((item, index) => {
          return this.arr1.indexOf(item) === index;
        });
        localStorage.setItem("browse", JSON.stringify(this.arr1));
      })
      .catch(e => {
        console.log(e);
      });
    this.$axios
      .req(`api/isCollection`, { id: this.id })
      .then(res => {
        if (res.data.isCollection === 1) {
          this.flag = true;
        }
        if (res.data.isCollection === 0) {
          this.flag = false;
        }
        // console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
    this.$axios
      .req(`api/getCard`, {})
      .then(res => {
        this.num = res.data.shopList.length;
      })
      .catch(e => {
        console.log(e);
      });
    this.name = localStorage.getItem("name");
    if (localStorage.getItem("browse") !== null) {
      this.arr1 = JSON.parse(localStorage.getItem("browse"));
    }
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped>
.div2 {
  padding: 30px 50px;
  border-bottom: pink solid 2px;
  border-top: pink solid 2px;
}
.x {
  font-size: 32px;
}
.x1 {
  font-size: 32px;
  color: red;
  margin-top: 20px;
}
.div3 {
  display: flex;
  justify-content: space-around;
  font-size: 32px;
  color: #7d7e80;
  padding: 20px 0;
  border-bottom: pink solid 2px;
  position: relative;
}
.like {
  position: absolute;
  right: 10px;
  top: 10px;
}
.div4 {
  display: flex;
  position: relative;
  padding: 20px 20px;
  margin: 20px 20px;
  border-bottom: pink solid 2px;
  border-top: pink solid 2px;
  line-height: 60px;
}
.but {
  margin: 10px 20px;
}
.div5 {
  font-size: 32px;
  position: absolute;
  right: 20px;
  top: 20px;
}
.div7 {
  height: 100px;
  font-size: 32px;
  width: 100px;
}
.div8 {
  position: relative;
}
.div9 {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  background: pink;
  border-radius: 50%;
}
.icon {
  font-size: 40px;
}
.im {
  width: 200px;
  border: pink solid 1px;
}
.s {
  margin: 5px 30px;
  font-size: 30px;
  width: 400px;
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
}
.close {
  position: absolute;
  top: 20px;
  right: 20px;
}
.div10 {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}
.div11 {
  margin: 20px 0;
}
.span2 {
  color: #7d7e80;
  margin-right: 20px;
}
.span3 {
  color: red;
}
.btn {
  height: 100px;
  margin-top: 55px;
}
.mg {
  width: 80px;
  border: pink solid 2px;
  border-radius: 50%;
}
.pj {
  display: flex;
}
.pj1 {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
}
.pj2 {
  font-size: 28px;
  margin: 10px 20px;
}
.pj3 {
  margin: 20px 20px;
}
.pj4 {
  font-size: 28px;
  line-height: 80px;
}
.no {
  line-height: 200px;
  width: 100%;
  text-align: center;
  font-size: 40px;
}
</style>
