<template>
  <div class="div">
    <div class="di1">
      商品分类
    </div>
    <hr />
    <div class="b">
      <ul v-if="category" class="u">
        <li
          @click="one(item, index)"
          v-for="(item, index) in category"
          :key="item.mallCategoryId"
          :class="{ c: num === index }"
        >
          {{ item.mallCategoryName }}
        </li>
      </ul>
      <div v-if="list.list1" class="di2">
        <van-tabs
          v-model="active"
          @change="two"
          line-width="80px"
          title-active-color="red"
        >
          <van-tab
            v-for="(item, index) in list.list1.bxMallSubDto"
            :title="item.mallSubName"
            :key="index"
          >
            <div
              v-for="(item, index) in arr"
              :key="index"
              class="d"
              @click="three(item)"
            >
              <div>
                <img :src="item.image" alt="" class="im" />
              </div>
              <div>
                <div class="s">{{ item.name }}</div>
                <div class="d1">
                  <span class="s1">￥{{ item.present_price }}</span>
                  <s>{{ item.orl_price }}</s>
                </div>
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
  name: "class",
  data() {
    return {
      active: 0,
      num: 0,
      id: "",
      arr: [],
      list: {
        list1: {}
      }
    };
  },
  components: {},
  methods: {
    two(name) {
      this.id = this.list.list1.bxMallSubDto[name].mallSubId;
      this.$axios
        .req(`api/classification?mallSubId=${this.id}`)
        .then(res => {
          this.arr = res.data.dataList;
          // console.log(this.arr);
        })
        .catch(e => {
          console.log(e);
        });
    },
    one(item, index) {
      this.num = index;
      this.list.list1 = item;
      if (item) {
        this.id = item.bxMallSubDto[0].mallSubId;
        this.$axios
          .req(`api/classification?mallSubId=${this.id}`)
          .then(res => {
            this.arr = res.data.dataList;
            console.log(res);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    three(item) {
      this.$router.push({
        name: "details",
        query: { id: item.id }
      });
    }
  },
  mounted() {
    if (this.category) {
      this.list.list1 = this.category[0];
      this.id = this.category[0].bxMallSubDto[0].mallSubId;
      this.$axios
        .req(`api/classification?mallSubId=${this.id}`)
        .then(res => {
          this.arr = res.data.dataList;
          // console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
    if (this.$route.query.catItem) {
      this.num = this.$route.query.catIndex;
      this.list.list1 = this.$route.query.catItem;
      this.id = this.$route.query.catItem.bxMallSubDto[0].mallSubId;
      this.$axios
        .req(`api/classification?mallSubId=${this.id}`)
        .then(res => {
          this.arr = res.data.dataList;
          // console.log(this.arr);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {},
  filters: {},
  computed: {
    category() {
      return this.$store.state.category;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped>
.div {
  position: relative;
}
.di1 {
  width: 140px;
  margin: 30px auto;
  font-size: 32px;
}
.di2 {
  width: 80%;
}
.b {
  display: flex;
}
.u li {
  font-size: 24px;
  width: 150px;
  line-height: 80px;
  text-align: center;
  background: #eeeeee;
  border-bottom: #7d7e80 solid 1px;
}
.u {
  width: 20%;
}
.c {
  background: white !important;
}
.im {
  width: 200px;
  border: pink solid 1px;
}
.s {
  margin: 5px 20px;
  font-size: 28px;
  color: red;
  width: 300px;
}
.s1 {
  color: red;
  margin-right: 20px;
}
.d {
  border-bottom: #7d7e80 solid 1px;
  padding: 20px 10px;
  display: flex;
}
.d1 {
  margin-top: 80px;
  margin-left: 20px;
}
</style>
