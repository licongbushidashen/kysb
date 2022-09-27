<template>
  <view class="scrolls">
    <view class="item">
      <view class="item1">
        <text>选择设备</text>
      </view>
      <text class="text0">选择您本次使用的设备，支持多选</text>
    </view>
    <u-list>
      <u-list-item v-for="(item, index) in list" :key="index">
        <view
          class="list"
          :class="item.active ? 'active' : '111'"
          @click="actives(index)"
        >
          <view>
            <u-album
              :urls="[item.url]"
              style="width: 64px; height: 65px"
            ></u-album>
            <!-- <image :src="" mode="" style="width: 64px; height: 65px"></image> -->
          </view>
          <view class="tips">
            <div>
              <text style="margin-right: 40rpx;">{{ item.registerName }}</text>
              <!-- <text>
                {{ item.brand }}</text> -->
            </div>
            <div style="margin: 10rpx 0px;display:flex">
              <label for="">型号:</label>
              <text>{{ item.model }}</text>
            </div>
            <div style="margin: 10rpx 0px;display:flex">
              <label for="">规格:</label>
              <text>{{ item.size }}</text>
            </div>
          </view>
        </view>
      </u-list-item>
    </u-list>
    <view class="button1">
      <u-button
        type="primary"
        text="确认"
        class="primarys"
        @click="ok"
        :disabled="flag"
      ></u-button>
    </view>
  </view>
</template>
<script>
        import i1 from "../../../static/icon/1.png"
document.getElementsByTagName("title")[0].innerText = "选择设备";
export default {
  components: {},
  data() {
    return {
      list: [],
      flag: false,
    };
  },
  onLoad() {},
  mounted() {
    document.getElementsByTagName("title")[0].innerText = "选择设备";
    this.dto();
  },
  methods: {
    dto() {
      let arr = uni.getStorageSync("sb");
      this.$res
        .post(this.https + "/api/Facility/Register/GetRegisterInfos", arr, {
          "content-type": "application/json",
        })
        .then((r) => {
          r.data.forEach((e) => {
       
              e.url = i1;
            
            e.active = true;
          });
          this.list = r.data;
        });
    },
    actives(index) {
      this.flag = true;
      this.list[index].active = !this.list[index].active;
      this.list.forEach((e) => {
        if (e.active) {
          this.flag = false;
        }
      });
    },
    sexSelect(e) {},
    ok() {
      let list = [];
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].active) {
          list.push(this.list[i]);
        }
      }
      uni.setStorageSync("list", list);
      uni
        .navigateTo({
          url: `/pages/tabBar/shepun/register`,
        })
        .catch((errors) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.tips{
label{
  color: #000 !important;
  width: 60rpx !important;
}
text{
  color: #000 !important;
  flex:1 !important
}
}

::v-deep .u-album__row__wrapper > uni-image {
  width: 64px !important;
  height: 65px !important;
    >div{
      background-size: 100% 129% !important;
    }
}
.list.active {
  border: 1px solid #3c9cff;
  position: relative;
}
.list.active::before {
  content: "";
  width: 22px;
  height: 22px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  background: #3c9cff;
  background: linear-gradient(
    135deg,
    transparent,
    transparent 50%,
    #3c9cff 50%,
    #3c9cff 100%
  );
}

.list.active::after {
     content: "";
    width: 18px;
    height: 17px;
    position: absolute;
    right: 0px;
    bottom: -2px;
  background-image: url(../../../static/img/dui.png);
  background-size: 100% 100%;
}

.list {
  display: flex;
  border: 1px solid #d6d7d9;
  padding: 20rpx;
  margin-bottom: 20px;
  .tips {
    margin-left: 20rpx;
    color: #8f9ca2;
    font-size: 12px;
    label {
      margin-right: 20rpx;
    }
  }
}
::v-deep .u-form-item__body__left__content__label {
  color: #8f9ca2;
}
.button1 {
  position: fixed;
  bottom: 20rpx;
  left: 60rpx;
  right: 0;
  width: calc(100% - 120rpx);
}
.primarys {
  margin-bottom: 40rpx;
}
.info {
  margin-top: 60rpx;
}

.infos {
  margin-bottom: 40rpx;
  label {
    margin-right: 20rpx;
    color: #8f9ca2;
  }
}
.text0 {
  font-size: 14px;
  color: #8f9ca2;
}
.item {
  margin-bottom: 30rpx;
}
.item1 {
  margin: 10rpx 0px;
  padding-top: 40rpx;
}
.scrolls {
  padding: 0px 60rpx;
}
</style>
