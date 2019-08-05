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
      <div class="set1">个人资料</div>
    </div>
    <div class="set">github</div>
    <div class="set">
      <div>头像</div>
      <div class="set2">
        <img src="../assets/logo.jpg" alt="" class="i" />
        <van-icon name="arrow"></van-icon>
      </div>
    </div>
    <div class="set4">
      <div class="set5">用户名</div>
      <div class="set3">{{ obj.username }}</div>
    </div>
    <div class="set4">
      <div class="set5">昵称</div>
      <div class="set3">
        <input type="text" class="input-box" v-model="obj.nickname" />
      </div>
    </div>
    <div class="set4">
      <div class="set5">性别</div>
      <div class="set3" @click="onSelect">{{ obj.gender }}</div>
    </div>
    <div class="set4">
      <div class="set5">邮箱</div>
      <div class="set6">
        <van-cell-group :border="false" class="group">
          <van-field placeholder="请输入邮箱"></van-field>
        </van-cell-group>
      </div>
    </div>
    <div class="set4">
      <div class="set5">出生年月日</div>
      <div class="set3" @click="time">
        {{ time2 }}
      </div>
    </div>
    <div class="set7">
      <van-button type="primary" size="large" class="pri" @click="Deposit"
        >保存</van-button
      >
      <van-button type="default" size="large" class="pri" @click="no"
        >取消</van-button
      >
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-picker :columns="columns" @change="onChange"></van-picker>
    </van-popup>
    <van-popup v-model="show1" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="time1"
        @cancel="cancel"
      ></van-datetime-picker>
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Set",
  components: {},
  props: {},
  data() {
    return {
      obj: {},
      show: false,
      show1: false,
      columns: ["男", "女", "保密"],
      currentDate: new Date(),
      time2: "",
      obj1: {}
    };
  },
  methods: {
    left() {
      this.$router.go(-1);
    },
    onSelect() {
      this.show = true;
    },
    onChange(picker, value) {
      this.obj.gender = value;
    },
    time() {
      this.show1 = true;
    },
    time1() {
      this.time2 = this.$moment(this.currentDate).format("YYYY年MM月DD日");
      this.show1 = false;
    },
    cancel() {
      this.show1 = false;
    },
    Deposit() {
      this.obj1.gender = this.obj.gender;
      this.obj1.day = this.obj.day;
      this.obj1.month = this.obj.month;
      this.obj1.year = this.obj.year;
      this.obj1.id = this.obj._id;
      this.obj1.nickname = this.obj.nickname;
      axios
        .post(`api/saveUser`, this.obj1)
        .then(res => {
          this.obj = res.data.user;
          if (res.data.code === 200) {
            this.$toast(res.data.msg);
            this.$router.push("/my");
            localStorage.setItem("name", this.obj.nickname);
          }
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    no() {
      this.$router.push("/my");
    }
  },
  mounted() {
    this.$axios
      .req(`api/queryUser`, {})
      .then(res => {
        this.obj = res.data.userInfo;
        this.time2 =
          this.obj.year + "年" + this.obj.month + "月" + this.obj.day + "日";
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
.i {
  width: 120px;
  height: 120px;
  vertical-align: middle;
  border-radius: 50%;
}
.set2 {
  width: 85%;
  text-align: right;
}
.set3 {
  width: 50%;
  margin: 0 auto;
}
.set4 {
  display: flex;
  font-size: 32px;
  line-height: 100px;
  border-bottom: #eeeeee solid 2px;
  margin-left: 20px;
}
.set5 {
  width: 30%;
}
.set6 {
  width: 55%;
  margin: 0 auto;
}
.group {
  margin-top: 20px;
  margin-right: 40px;
}
.set7 {
  width: 80%;
  margin: 100px auto;
}
.pri {
  height: 100px;
  margin-bottom: 20px;
}
.input-box {
  border: none;
}
</style>
