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
    <div>
      <img src="../assets/evaluate.jpg" alt="" class="im3" />
      <div>
        <van-tabs v-model="active" class="van__tab">
          <van-tab title="待评价" v-if="list">
            <div v-for="(item, index) in list" :key="index" class="eva">
              <div>
                <img :src="item.image_path" alt="" class="im4" />
              </div>
              <div class="eva1">{{ item.name }}</div>
              <div class="eva2" @click="comment(item)">
                <van-icon name="chat" size="18px" class="chat"></van-icon>
                <span class="chat">评论晒单</span>
              </div>
            </div>
          </van-tab>
          <van-tab title="已评价">
            <div v-for="(item, index) in list1" :key="index" class="eva">
              <div>
                <img :src="item.goods[0].image_path" alt="" class="im4" />
              </div>
              <div class="eva1">{{ item.goods[0].name }}</div>
              <div class="eva2" @click="pjdetails(item)">
                <van-icon name="search" size="18px" class="chat"></van-icon>
                <span class="chat">查看评价</span>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Evaluate",
  components: {},
  props: {},
  data() {
    return {
      active: 0,
      list: [],
      list1: []
    };
  },
  methods: {
    left() {
      this.$router.go(-1);
    },
    comment(item) {
      this.$router.push({ name: "comment", query: { item: item } });
    },
    pjdetails(item) {
      this.$router.push({ name: "pjdetails", query: { item: item } });
    }
  },
  mounted() {
    this.$axios
      .req("api/tobeEvaluated")
      .then(res => {
        this.list = res.data.data.list;
        localStorage.setItem("evaluate", res.data.data.list.length);
      })
      .catch(e => {
        console.log(e);
      });
    this.$axios
      .req("api/alreadyEvaluated")
      .then(res => {
        this.list1 = res.data.data.list;
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
.im3 {
  width: 100%;
}
.im4 {
  width: 200px;
}
.eva {
  display: flex;
  justify-content: space-around;
  border-bottom: pink solid 2px;
  margin: 20px 0;
  position: relative;
}
.eva1 {
  font-size: 32px;
  margin-top: 20px;
  width: 400px;
}
.eva2 {
  position: absolute;
  color: red;
  right: 20px;
  bottom: 10px;
  width: 200px;
  text-align: center;
  border: red solid 4px;
  border-radius: 50px;
  line-height: 60px;
}
.chat {
  vertical-align: middle;
}
</style>
