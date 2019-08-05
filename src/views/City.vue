<template>
  <div class="city">
    <div class="city2">
      <div class="city1">
        <van-icon
          name="arrow-left"
          size="25px"
          class="arrow"
          @click="left"
        ></van-icon>
        城市列表
      </div>
    </div>
    <van-search
      placeholder="请输入搜索关键词"
      v-model="value"
      class="sea"
      @input="input"
    ></van-search>
    <div>
      <div v-if="flag === true">
        <div class="city3">当前城市</div>
        <div class="city1">
          <van-button type="default" class="city4">{{ current }}</van-button>
        </div>
        <div class="city3">热门城市</div>
        <div class="city5">
          <div v-for="item in hotCities" :key="item.id">
            <van-button type="default" class="city4" @click="hotcity(item)">{{
              item.name
            }}</van-button>
          </div>
        </div>
        <div>
          <van-index-bar class="va_index_bar">
            <div v-for="(item, index) in cities" :key="index">
              <van-index-anchor :index="index" class="ind"></van-index-anchor>
              <div v-for="key in item" :key="key.id">
                <van-cell
                  :title="key.name"
                  class="city6"
                  @click="city(key)"
                ></van-cell>
              </div>
            </div>
          </van-index-bar>
        </div>
      </div>
      <div v-if="flag === false">
        <div v-for="(item, index) in list" :key="index" class="city7">
          <div @click="click(item)">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import city from "./city.js";
export default {
  name: "City",
  components: {},
  props: {},
  data() {
    return {
      hotCities: city.data.hotCities,
      cities: city.data.cities,
      value: "",
      current: "",
      list: [],
      flag: true
    };
  },
  methods: {
    left() {
      this.$router.push("/");
    },
    city(key) {
      this.$store.state.city = key.name;
      this.$router.push("/");
    },
    hotcity(item) {
      this.$store.state.city = item.name;
      this.$router.push("/");
    },
    input(val) {
      if (val !== "") {
        this.flag = false;
      }
      if (val === "") {
        this.flag = true;
      }
      for (let i in this.cities) {
        for (let j in this.cities[i]) {
          this.list.push(this.cities[i][j]);
        }
      }
      if (this.list) {
        this.list = this.list.filter(item => {
          return JSON.stringify(item).indexOf(val) > -1;
        });
      }
    },
    click(item) {
      this.$store.state.city = item.name;
      this.$router.push("/");
    }
  },
  mounted() {
    this.current = this.$store.state.city;
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped>
.city {
  background: #eeeeee;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.city2 {
  position: relative;
}
.city1 {
  line-height: 100px;
  text-align: center;
  font-size: 34px;
  background: white;
  margin-bottom: 20px;
}
.arrow {
  position: absolute;
  left: 20px;
  top: 20px;
}
.sea {
  width: 90%;
  background: white;
  margin-left: 40px;
}
.city3 {
  margin: 20px 40px;
  font-size: 32px;
}
.city4 {
  width: 200px;
  height: 60px;
  margin: 20px 20px;
}
.city5 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background: white;
}
.ind {
  margin: 20px 10px;
}
.city6 {
  padding: 30px 20px;
  border-bottom: #eeeeee solid 2px;
}
.city7 {
  line-height: 100px;
  border-bottom: white solid 2px;
  font-size: 32px;
  padding-left: 40px;
}
</style>
