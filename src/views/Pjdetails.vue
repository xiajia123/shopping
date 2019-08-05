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
      <div class="set1">评价详情</div>
    </div>
    <div class="pj1" v-if="obj1.user">
      <div class="pj">
        <div>
          <img :src="obj1.user[0].avatar" alt="" class="mg" />
        </div>
        <div>
          <div class="pj2">
            <div v-if="obj1.anonymous === true">匿名用户</div>
            <div v-if="obj1.anonymous === false">
              {{ obj1.user[0].nickname }}
            </div>
          </div>
          <div class="pj3">
            <van-rate v-model="obj1.rate"></van-rate>
          </div>
        </div>
      </div>
      <div>
        <div class="pj4">
          {{ obj1.comment_time }}
        </div>
      </div>
    </div>
    <div class="pj2">评价内容:{{ obj1.content }}</div>
    <div class="pj5">
      <div>
        <img :src="obj1.goods[0].image" alt="" class="mg3" />
      </div>
      <div>
        <div class="pj6">{{ obj1.goods[0].name }}</div>
      </div>
      <div class="pj7">
        <van-icon
          name="shopping-cart-o"
          size="25px"
          color="pink"
          class="sho"
          @click="shopping"
        ></van-icon>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Pjdetails",
  components: {},
  props: {},
  data() {
    return {
      obj1: {},
      obj: {}
    };
  },
  methods: {
    left() {
      this.$router.go(-1);
    },
    shopping() {
      this.$axios
        .req(`api/addShop`, {
          id: this.obj1.goods[0].id
        })
        .then(res => {
          this.$router.push("/shopping");
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
    axios
      .post("api/evaluateOne", {
        _id: this.obj._id
      })
      .then(res => {
        this.obj1 = res.data.evaluateOne;
        console.log(res);
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
.set {
  display: flex;
  font-size: 32px;
  text-align: center;
  line-height: 100px;
  margin-left: 20px;
}
.set1 {
  width: 85%;
  text-align: center;
}
.arrow-left {
  margin: 26px 0;
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
.mg3 {
  width: 100px;
}
.pj5 {
  display: flex;
  margin: 20px 20px;
  padding: 20px 0;
  border-top: pink solid 2px;
  position: relative;
}
.pj6 {
  margin-left: 30px;
}
.pj7 {
  width: 70px;
  height: 70px;
  background: rosybrown;
  border-radius: 50%;
  position: absolute;
  right: 20px;
  top: 40px;
  text-align: center;
}
.sho {
  margin-top: 10px;
}
</style>
