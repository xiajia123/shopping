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
      <div class="set1">最近浏览</div>
    </div>
    <div v-if="arr1">
      <div v-for="(item, index) in arr1" :key="index" class="d">
        <div>
          <img :src="item.image" alt="" class="im" @click="deta(item)" />
        </div>
        <div>
          <div class="s" @click="deta(item)">{{ item.name }}</div>
          <div class="d1">
            <span class="s1"
              ><b>￥{{ item.present_price }}</b></span
            >
          </div>
        </div>
        <van-icon
          name="close"
          size="20px"
          class="close"
          @click="close(item, index)"
        ></van-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Browse",
  components: {},
  props: {},
  data() {
    return {
      arr1: []
    };
  },
  methods: {
    left() {
      this.$router.go(-1);
    },
    deta(item) {
      this.$router.push({ name: "details", query: { id: item.id } });
    },
    close(item, index) {
      this.arr1.splice(index, 1);
      localStorage.setItem("browse", JSON.stringify(this.arr1));
      this.arr1 = JSON.parse(localStorage.getItem("browse"));
    }
  },
  mounted() {
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
.im {
  width: 200px;
  border: pink solid 1px;
}
.s {
  margin: 5px 30px;
  font-size: 30px;
  width: 400px;
}
.s1 {
  color: red;
  margin-right: 30px;
  font-size: 30px;
}
.d {
  border-bottom: pink solid 1px;
  padding: 20px 10px;
  display: flex;
  position: relative;
}
.d1 {
  margin-top: 80px;
  margin-left: 20px;
}
.close {
  position: absolute;
  bottom: 20px;
  right: 40px;
}
</style>
