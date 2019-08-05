<template>
  <div class="dv">
    <div class="dv1">
      <div class="dv2">
        <div style="height: 10px"></div>
        <p class="p"><b>登录 / 注册</b></p>
        <van-cell-group>
          <van-field
            :border="false"
            v-model="value"
            placeholder="请输入用户名"
            class="fie"
          ></van-field>
          <van-field
            type="password"
            v-model="value1"
            placeholder="请输入密码"
            class="fie"
          ></van-field>
          <van-field
            type="password"
            v-model="value2"
            placeholder="仅注册需要"
            class="fie"
            label="手机号码"
            label-width="100px"
          ></van-field>
          <van-field
            class="fie"
            v-model="value3"
            label="短信验证码"
            placeholder="仅注册需要"
            label-width="100px"
          >
            <van-button slot="button" size="small" type="primary"
              >发送验证码</van-button
            >
          </van-field>
          <div class="dv3">
            <van-field
              class="fie1"
              v-model="value4"
              label="验证码"
              placeholder="请输入验证码"
              label-width="100px"
            >
            </van-field>
            <span v-html="num" class="sp" @click="cl"></span>
          </div>
        </van-cell-group>
        <div class="dv4">
          <van-button type="primary" class="btn" style="" @click="clickItem"
            >登录</van-button
          >
          <van-button
            type="danger"
            class="btn"
            style="margin-left: 10px"
            @click="cli"
            >注册</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  components: {},
  props: {},
  data() {
    return {
      value: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      num: ""
    };
  },
  methods: {
    getData() {
      this.$axios
        .req("api/verify")
        .then(res => {
          this.num = res.data;
          // console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    cli() {
      this.$axios
        .req("api/register", {
          nickname: this.value,
          password: this.value1,
          verify: this.value4
        })
        .then(res => {
          if (res.data.code === -1 || res.data.code === -2) {
            this.$notify(res.data.msg);
          } else if (res.data.code === 200) {
            this.$notify(res.data.msg);
            this.$router.push("/");
          }
          // console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    clickItem() {
      this.$axios
        .req("api/login", {
          nickname: this.value,
          password: this.value1,
          verify: this.value4
        })
        .then(res => {
          if (res.data.code === -1 || res.data.code === -2) {
            this.getData();
            this.$notify(res.data.msg);
          } else if (res.data.code === 200) {
            localStorage.setItem("name", this.value);
            this.$notify(res.data.msg);
            this.$router.push("/");
          }
          // console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    cl() {
      this.getData();
    }
  },
  mounted() {
    this.getData();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped>
.dv {
  background-image: url("../assets/login.jpg");
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.dv1 {
  width: 90%;
  height: 1040px;
  margin-top: 200px;
  margin-left: 40px;
  background: white;
  box-shadow: 0 0 5px pink;
}
.dv2 {
  width: 80%;
  height: 1000px;
  margin: 20px 0;
}
.dv3 {
  display: flex;
}
.dv4 {
  margin-left: 30px;
  margin-top: 60px;
}
.p {
  font-size: 35px;
  margin-left: 30px;
}
.fie {
  margin: 40px 30px;
  padding: 30px 0;
}
.fie1 {
  margin: 0 16px;
}
.btn {
  width: 200px;
}
.sp {
  width: 120px;
}
</style>
