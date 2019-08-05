<template>
  <div class="home" ref="person">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div>
        <!--       搜索-->
        <div>
          <div class="box">
            <div class="box1" @click="Location">{{ city }}▼</div>
            <van-search
              placeholder="请输入搜索关键词"
              class="va"
              background="#eeeeee"
              @focus="v"
              @input="inp"
              v-model="val"
            >
            </van-search>
            <div class="box2" v-if="show === true" @click="c">取消</div>
            <div class="box2" v-else @click="v">搜索</div>
          </div>
          <div v-if="show === true">
            <div
              v-for="(item, index) in results"
              :key="index"
              class="d"
              @click="six(item)"
            >
              <div>
                <img :src="item.image" alt="" class="im" />
              </div>
              <div>
                <div class="s">
                  <span v-html="item.name"></span>
                </div>
                <div class="d1">
                  <span class="s1">￥{{ item.present_price }}</span>
                  <s>{{ item.orl_price }}</s>
                </div>
              </div>
            </div>
            <div v-if="val === '' && list.length > 0">
              <div class="box12">
                搜索历史
                <van-icon name="delete" size="25px" @click="del"></van-icon>
              </div>
              <div class="box13">
                <div
                  v-for="(item, index) in list"
                  :key="index"
                  @click="but(item)"
                >
                  <van-button type="default" round class="but3">{{
                    item
                  }}</van-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="show === false">
          <!--        轮播图-->
          <van-swipe
            :autoplay="3000"
            position="right"
            :style="{ height: '100%', width: '100%' }"
          >
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img alt="" :src="image.image" style="width: 100%" />
            </van-swipe-item>
          </van-swipe>
          <!--        分类-->
          <div class="box3">
            <ul class="ul">
              <li
                v-for="(item, index1) in category"
                :key="item.mallCategoryId"
                @click="one(item, index1)"
              >
                <img :src="item.image" alt="" class="img" />
                <div class="box4">{{ item.mallCategoryName }}</div>
              </li>
            </ul>
          </div>
          <img :src="images1.PICTURE_ADDRESS" alt="" class="img1" />
          <!--        商品推荐-->
          <div class="box6">
            <div style="height: 1px"></div>
            <p class="p1">商品推荐</p>
            <div class="di" ref="personWrap">
              <ul class="ul1" ref="personTab">
                <li v-for="(item, index) in recommend" :key="index" class="li1">
                  <img
                    :src="item.image"
                    alt=""
                    class="img2"
                    @click="two(item)"
                  />
                  <div class="box5">{{ item.goodsName }}</div>
                  <div class="box7">
                    <span class="sp5">￥{{ item.mallPrice }}</span>
                    <s>￥{{ item.price }}</s>
                  </div>
                  <div class="box8">
                    <van-button
                      icon="shopping-cart"
                      type="primary"
                      size="small"
                      @click="shopping(item)"
                    ></van-button>
                    <van-button type="danger" size="small" @click="two(item)"
                      >查看详情</van-button
                    >
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--        美食分类-->
          <div class="box9">
            <span class="sp2">1F</span>
            <span class="sp3">休闲食品</span>
          </div>
          <div class="box6" v-if="obj.floor1">
            <div class="ul1">
              <div>
                <div>
                  <img
                    :src="obj.floor1[0].image"
                    alt=""
                    class="img3"
                    @click="three(obj.floor1[0].goodsId)"
                  />
                </div>
              </div>
              <div>
                <div>
                  <img
                    :src="obj.floor1[1].image"
                    alt=""
                    class="img3"
                    @click="three(obj.floor1[1].goodsId)"
                  />
                </div>
                <div>
                  <img
                    :src="obj.floor1[2].image"
                    alt=""
                    class="img3"
                    @click="three(obj.floor1[2].goodsId)"
                  />
                </div>
              </div>
            </div>
            <div class="ul1">
              <img
                :src="obj.floor1[3].image"
                alt=""
                class="img4"
                @click="three(obj.floor1[3].goodsId)"
              />
              <img
                :src="obj.floor1[4].image"
                alt=""
                class="img4"
                @click="three(obj.floor1[4].goodsId)"
              />
            </div>
          </div>
          <div class="box9">
            <span class="sp2">2F</span>
            <span class="sp3">新鲜水果</span>
          </div>
          <div class="box6" v-if="obj.floor2">
            <div class="ul1">
              <div>
                <div>
                  <img
                    :src="obj.floor2[0].image"
                    alt=""
                    class="img3"
                    @click="three(obj.floor2[0].goodsId)"
                  />
                </div>
              </div>
              <div>
                <div>
                  <img
                    :src="obj.floor2[1].image"
                    alt=""
                    class="img3"
                    @click="three(obj.floor2[1].goodsId)"
                  />
                </div>
                <div>
                  <img
                    :src="obj.floor2[2].image"
                    alt=""
                    class="img3"
                    @click="three(obj.floor2[2].goodsId)"
                  />
                </div>
              </div>
            </div>
            <div class="ul1">
              <img
                :src="obj.floor2[3].image"
                alt=""
                class="img4"
                @click="three(obj.floor2[3].goodsId)"
              />
              <img
                :src="obj.floor2[4].image"
                alt=""
                class="img4"
                @click="three(obj.floor2[4].goodsId)"
              />
            </div>
          </div>
          <div class="box9">
            <span class="sp2">3F</span>
            <span class="sp3">营养奶品</span>
          </div>
          <div class="box6" v-if="obj.floor3">
            <div class="ul1">
              <div>
                <div>
                  <img
                    :src="obj.floor3[0].image"
                    alt=""
                    class="img3"
                    @click="three(obj.floor3[0].goodsId)"
                  />
                </div>
              </div>
              <div>
                <div>
                  <img
                    :src="obj.floor3[1].image"
                    alt=""
                    class="img3"
                    @click="three(obj.floor3[1].goodsId)"
                  />
                </div>
                <div>
                  <img
                    :src="obj.floor3[2].image"
                    alt=""
                    class="img3"
                    @click="three(obj.floor3[2].goodsId)"
                  />
                </div>
              </div>
            </div>
            <div class="ul1">
              <img
                :src="obj.floor3[3].image"
                alt=""
                class="img4"
                @click="three(obj.floor3[3].goodsId)"
              />
              <img
                :src="obj.floor3[4].image"
                alt=""
                class="img4"
                @click="three(obj.floor3[4].goodsId)"
              />
            </div>
          </div>
          <!--        热销产品-->
          <div class="box9">
            <span class="sp3">热销产品</span>
          </div>
          <div class="box6">
            <div class="u1">
              <div
                v-for="item in images5"
                :key="item.goodsId"
                class="img4"
                @click="four(item)"
              >
                <img :src="item.image" alt="" class="img3" />
                <div class="box10">{{ item.name }}</div>
                <div class="box11">
                  <span class="sp4">{{ item.mallPrice }}</span>
                  <s>{{ item.price }}</s>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Home",
  components: {},
  props: {},
  data() {
    return {
      val: "",
      images: [],
      category: [],
      images1: {},
      recommend: [],
      images5: [],
      obj: {},
      results: [],
      show: false,
      list: [],
      city: "",
      isLoading: false
    };
  },
  methods: {
    onRefresh() {
      this.$axios
        .req("api/recommend")
        .then(res => {
          this.images = res.data.data.slides;
          this.category = res.data.data.category;
          this.$store.state.category = this.category;
          this.images1 = res.data.data.advertesPicture;
          this.recommend = res.data.data.recommend;
          this.images5 = res.data.data.hotGoods;
          this.obj = res.data.data;
          // console.log(res.data.data);
        })
        .catch(e => {
          console.log(e);
        });
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    shopping(item) {
      this.$axios
        .req(`api/addShop`, {
          id: item.goodsId
        })
        .then(res => {
          this.$router.push("/shopping");
          this.$toast(res.data.msg);
          // console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    Location() {
      this.$router.push("/city");
    },
    //详情
    six(item) {
      this.$router.push({ name: "details", query: { id: item.id } });
      localStorage.setItem("record", JSON.stringify(this.list));
    },
    one(item, index1) {
      this.$router.push({
        name: "class",
        query: { cat: this.category, catItem: item, catIndex: index1 }
      });
    },
    two(item) {
      this.$router.push({
        name: "details",
        query: { id: item.goodsId }
      });
      localStorage.setItem("record", JSON.stringify(this.list));
    },
    four(item) {
      this.$router.push({
        name: "details",
        query: { id: item.goodsId }
      });
      localStorage.setItem("record", JSON.stringify(this.list));
    },
    three(item) {
      this.$router.push({
        name: "details",
        query: { id: item }
      });
      localStorage.setItem("record", JSON.stringify(this.list));
    },
    //-----------------------------------------------

    //首页数据
    getData() {
      this.$axios
        .req("api/recommend")
        .then(res => {
          this.images = res.data.data.slides;
          this.category = res.data.data.category;
          this.$store.state.category = this.category;
          this.images1 = res.data.data.advertesPicture;
          this.recommend = res.data.data.recommend;
          this.images5 = res.data.data.hotGoods;
          this.obj = res.data.data;
          // console.log(res.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    //-------------------------------------------------

    //横向滚动
    personScroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.personWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    //-------------------------------------------------

    //纵向滚动
    personScro() {
      this.$nextTick(() => {
        if (!this.scroll1) {
          this.scroll1 = new BScroll(this.$refs.person, {
            click: true
          });
        } else {
          this.scroll1.refresh();
        }
      });
    },
    //-------------------------------------------------

    //搜索
    but(item) {
      this.$axios
        .req("api/search ", {
          value: item
        })
        .then(res => {
          this.results = res.data.data.list;
        })
        .catch(e => {
          console.log(e);
        });
      this.val = item;
    },
    del() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认删除搜索历史?"
        })
        .then(() => {
          localStorage.clear("record");
          this.list = null;
        })
        .catch(() => {});
    },
    v() {
      this.show = true;
    },
    c() {
      this.show = false;
      this.results = "";
      this.val = "";
    },
    inp(val) {
      if (this.val === "") {
        this.results = "";
      } else {
        this.list.push(val);
      }
      this.list = this.list.filter((item, index) => {
        return this.list.indexOf(item) === index;
      });
      // console.log(this.list);
      this.$axios
        .req("api/search ", {
          value: val
        })
        .then(res => {
          this.results = res.data.data.list;
          // console.log(res.data.data.list);
          this.changeColor(res.data.data.list);
        })
        .catch(e => {
          console.log(e);
        });
    },
    changeColor(resultsList) {
      resultsList.map((item, index) => {
        // console.log('item', item)
        if (this.val && this.val.length > 0) {
          // 匹配关键字正则
          let replaceReg = new RegExp(this.val, "g");
          // 高亮替换v-html值
          let replaceString = '<span class="search">' + this.val + "</span>";
          resultsList[index].name = item.name.replace(
            replaceReg,
            replaceString
          );
        }
      });
      this.results = [];
      this.results = resultsList;
    }
    //-------------------------------------------------
  },
  mounted() {
    if (this.$store.state.city === undefined) {
      this.$store.state.city = "加载中...";
    }
    if (localStorage.getItem("record") !== null) {
      this.list = JSON.parse(localStorage.getItem("record"));
    }
    this.getData();
    this.$nextTick(() => {
      this.personScroll();
    });
    this.$nextTick(() => {
      this.personScro();
    });
    let _this = this;
    AMap.plugin("AMap.Geolocation", function() {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: "RB"
      });

      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "error", onError);

      function onComplete(data) {
        // data是具体的定位信息
        if (_this.$store.state.city === "加载中...") {
          _this.city = data.addressComponent.city;
          _this.$store.state.city = data.addressComponent.city;
        }
        // _this.$store.state.city = data.addressComponent.city;

        // console.log(data);
      }

      function onError(data) {
        // 定位出错
      }
    });
    this.city = this.$store.state.city;
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped>
.box {
  display: flex;
  justify-content: space-around;
}
.va {
  width: 60%;
}
.box1 {
  margin-top: 20px;
  font-size: 30px;
  margin-left: 20px;
}
.box2 {
  margin-top: 20px;
  font-size: 30px;
  margin-right: 20px;
  color: #7d7e80;
}
.home {
  height: 100vh;
  overflow: hidden;
}
.ul {
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 32px;
}
.box3 {
  margin: 30px auto;
  width: 95%;
  background: white;
  box-shadow: 0 0 10px pink;
  border-radius: 20px;
}
.img {
  width: 120px;
  margin-top: 20px;
}
.box4 {
  font-size: 32px;
  margin-top: 10px;
}
.home {
  background: #eeeeee;
}
.img1 {
  width: 100%;
  margin-bottom: 40px;
}

.img2 {
  width: 250px;
}
.li1 {
  width: 250px;
}
.di {
  width: 100%;
  overflow: hidden;
  display: flex;
}
.ul1 {
  display: flex;
}
.box5 {
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 10px;
  font-size: 32px;
}
.sp5 {
  font-size: 32px;
}
.p1 {
  font-size: 32px;
  margin: 20px 30px;
}
.box6 {
  background: white;
}
s {
  font-size: 28px;
  color: pink;
  margin-left: 20px;
}
.box7 {
  margin: 10px 10px;
}
.box8 {
  margin: 10px 10px;
  display: flex;
}
.sp2 {
  color: white;
  background: red;
  border-radius: 50%;
  font-size: 32px;
}
.sp3 {
  color: red;
  font-size: 32px;
}
.box9 {
  margin: 20px 0;
  text-align: center;
}
.img3 {
  width: 100%;
}
.img4 {
  width: 50%;
}
.u1 {
  display: flex;
  flex-wrap: wrap;
}
.box10 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 20px;
  font-size: 32px;
  color: red;
}
.box11 {
  text-align: center;
  margin-top: 10px;
}
.sp4 {
  font-size: 32px;
  color: red;
}
.im {
  width: 200px;
  border: pink solid 1px;
}
.s {
  margin: 5px 20px;
  font-size: 30px;
  width: 600px;
}
.s1 {
  color: red;
  margin-right: 10px;
  font-size: 30px;
}
.d {
  border-bottom: pink solid 1px;
  padding: 20px 10px;
  display: flex;
}
.d1 {
  margin-top: 80px;
  margin-left: 20px;
}
.box12 {
  display: flex;
  justify-content: space-between;
  margin: 20px 20px;
  font-size: 32px;
}
.box13 {
  display: flex;
  font-size: 32px;
  margin: 20px 20px;
  width: 100%;
  flex-wrap: wrap;
}
.but3 {
  font-size: 32px;
  margin: 0 20px;
}
</style>
