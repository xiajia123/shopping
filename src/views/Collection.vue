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
      <div class="set1">我的收藏</div>
    </div>
    <div v-for="(item, index) in list" :key="index" class="d">
      <div>
        <img :src="item.image_path" alt="" class="im" @click="deta(item)" />
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
        @click="close(item)"
        class="close"
      ></van-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collection",
  components: {},
  props: {},
  data() {
    return {
      list: []
    };
  },
  methods: {
    left() {
      this.$router.go(-1);
    },
    close(item) {
      this.$axios
        .req("api/cancelCollection", { id: item.cid })
        .then(res => {
          this.$axios
            .req(`api/collection/list`)
            .then(res => {
              this.list = res.data.data.list;
              console.log(res);
            })
            .catch(e => {
              console.log(e);
            });
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deta(item) {
      this.$router.push({ name: "details", query: { id: item.cid } });
    }
  },
  mounted() {
    this.$axios
      .req(`api/collection/list`)
      .then(res => {
        this.list = res.data.data.list;
        // console.log(this.list);
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
