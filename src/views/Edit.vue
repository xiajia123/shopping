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
      <div class="set1">编辑地址</div>
    </div>
    <van-address-edit
      class="van_address_edit"
      :area-list="areaList"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :addressInfo="addressInfo"
      @save="onSave"
      @delete="onDelete"
    ></van-address-edit>
  </div>
</template>

<script>
import axios from "axios";
import areaList from "./area.js";
export default {
  name: "Edit",
  components: {},
  props: {},
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo: {},
      address: ""
    };
  },
  methods: {
    left() {
      this.$router.go(-1);
    },
    onSave(val) {
      // console.log(val);
      this.address = val.province + val.city + val.county;
      axios
        .post(`api/address`, {
          name: val.name,
          tel: val.tel,
          addressDetail: val.addressDetail,
          isDefault: val.isDefault,
          address: this.address,
          areaCode: val.areaCode,
          id: val._id
        })
        .then(res => {
          if (res.data.code === 200) {
            this.$toast(res.data.msg);
            this.$router.go(-1);
          }
          // console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    onDelete(val) {
      this.$axios
        .req("api/deleteAddress", { id: val._id })
        .then(res => {
          if (res.data.code === 200) {
            this.$router.go(-1);
            this.$toast(res.data.msg);
          }
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.addressInfo = this.$route.query.item;
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
  width: 80%;
  text-align: center;
}
.arrow-left {
  margin: 26px 10px;
}
</style>
