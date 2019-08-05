<template>
  <div>
    <div class="shop">购物车</div>
    <div v-if="arr.length === 0" class="shop6">
      <van-icon name="cart-o" size="120px"></van-icon>
      <div class="shop7">空</div>
    </div>
    <div v-else>
      <div class="shop1">
        <div>
          <input type="checkbox" class="shop2" @change="whole" v-model="flag" />
          <span class="span">取消按钮</span>
        </div>
        <div class="shop4">
          <div class="shop3">合计:{{ num.toFixed(2) }}</div>
          <div>请确认订单</div>
        </div>
      </div>
      <div class="shop5">
        <van-button type="danger" class="btn1" @click="del">删除</van-button>
        <van-button type="primary" class="btn2" @click="Settlement"
          >去结算</van-button
        >
      </div>
      <div v-for="item in arr" :key="item.cid" class="d">
        <div class="btn3">
          <input type="checkbox" v-model="item.check" @change="back" />
        </div>
        <div>
          <img :src="item.image_path" alt="" class="im" />
        </div>
        <div>
          <div class="s">{{ item.name }}</div>
          <div class="d1">
            <span class="s1"
              >￥{{ (item.present_price * item.count).toFixed(2) }}</span
            >
            <van-stepper
              :min="1"
              :max="50"
              button-size="34px"
              class="step"
              v-model="item.count"
              @change="amount(item)"
            ></van-stepper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Shopping",
  components: {},
  props: {},
  data() {
    return {
      arr: [],
      flag: false,
      id: [],
      list: []
    };
  },
  methods: {
    Settlement() {
      this.arr.map(item => {
        if (item.check === true) {
          this.list.push(item);
          item.id = item.cid;
          this.$router.push({
            name: "settlement",
            query: { item: this.list }
          });
        }
      });
    },
    amount(item) {
      this.$axios
        .req("api/editCart", {
          count: item.count,
          id: item.cid,
          mallPrice: item.present_price
        })
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    shopping() {
      this.$axios
        .req(`api/getCard`, {})
        .then(res => {
          this.arr = res.data.shopList;
        })
        .catch(e => {
          console.log(e);
        });
    },
    whole() {
      this.arr.forEach(item => {
        item.check = this.flag;
      });
    },
    back() {
      this.flag = this.arr.every(item => {
        return item.check === true;
      });
    },
    del() {
      this.$toast("请选中要删除的");
      this.arr.map(item => {
        if (item.check === true) {
          this.id.push(item.cid);
          this.$dialog
            .confirm({
              title: "删除",
              message: "确认是否删除"
            })
            .then(() => {
              axios
                .post("api/deleteShop", this.id)
                .then(res => {
                  this.shopping();
                  this.$toast(res.data.msg);
                })
                .catch(e => {
                  console.log(e);
                });
            })
            .catch(() => {});
        }
      });
    }
  },
  mounted() {
    this.shopping();
  },
  created() {},
  filters: {},
  computed: {
    num() {
      let sun = 0;
      this.arr.map(item => {
        if (item.check === true) {
          sun += item.present_price * item.count;
        }
      });
      return sun;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped>
.shop {
  line-height: 100px;
  width: 100%;
  text-align: center;
  font-size: 32px;
  border-bottom: #eeeeee solid 2px;
}
.shop1 {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
  font-size: 28px;
  border-bottom: #eeeeee solid 2px;
  position: relative;
}
.shop2 {
  zoom: 200%;
  vertical-align: middle;
  margin-top: 10px;
}
.shop3 {
  margin-bottom: 20px;
}
.shop4 {
  margin-right: 80px;
  vertical-align: middle;
}
.btn1 {
  width: 100px;
  height: 60px;
  margin-right: 20px;
}
.btn2 {
  width: 140px;
  height: 60px;
  margin-right: 40px;
}
.shop5 {
  text-align: right;
  margin: 20px 0;
}
.im {
  width: 180px;
  border: pink solid 1px;
}
.s {
  margin: 5px 10px;
  font-size: 28px;
  color: red;
  width: 420px;
}
.s1 {
  color: red;
  font-size: 32px;
  margin-top: 10px;
}
.d {
  border-bottom: #eeeeee solid 2px;
  padding: 20px 10px;
  display: flex;
}
.d1 {
  margin-top: 80px;
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
}
.btn3 {
  line-height: 100px;
  margin-right: 10px;
  zoom: 200%;
}
.span {
  display: inline-block;
  vertical-align: middle;
  margin-top: 10px;
}
.step {
  margin-right: 60px;
}
.shop6 {
  width: 250px;
  margin: 200px auto;
  position: relative;
}
.shop7 {
  font-size: 60px;
  position: absolute;
  bottom: 100px;
  left: 100px;
}
</style>
