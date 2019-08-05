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
      <div class="set1">地址列表</div>
    </div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
      @select="select"
    ></van-address-list>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Address",
  components: {},
  props: {},
  data() {
    return {
      chosenAddressId: 1,
      list: []
    };
  },
  methods: {
    left() {
      this.$router.push("/my");
    },
    onAdd() {
      this.$router.push("/edit");
    },
    onEdit(item) {
      console.log(item);
      axios
        .post(`api/address`, {
          name: item.name,
          tel: item.tel,
          addressDetail: item.addressDetail,
          isDefault: item.isDefault,
          address: item.address,
          areaCode: item.areaCode,
          id: item._id
        })
        .then(res => {
          this.$router.push({ name: "edit", query: { item: item } });
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    select(item) {
      this.$axios
        .req(`api/setDefaultAddress`, { id: item._id })
        .then(res => {
          this.$axios
            .req(`api/getAddress`)
            .then(res => {
              this.list = res.data.address;
              this.list.map((item, index) => {
                item.id = index;
                if (item.isDefault === true) {
                  this.chosenAddressId = index;
                }
              });
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.$axios
      .req(`api/getAddress`)
      .then(res => {
        this.list = res.data.address;
        this.list.map((item, index) => {
          item.id = index;
          if (item.isDefault === true) {
            this.chosenAddressId = index;
          }
        });
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
.van-radio {
  height: 100px;
}
.van-address-item__name {
  margin-bottom: 20px;
}
</style>
