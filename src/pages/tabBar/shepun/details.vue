<template>
  <view class="scrolls">
    <u-swiper :list="list1" indicator indicatorMode="line" circular></u-swiper>

    <div class="tipss">
      <view>
        <label for="">设备名称</label>
        <text>{{list.registerName}}</text>
      </view>
      <view>
        <label for="">品牌</label>
        <text>{{list.brand}}</text>
      </view>
      <view>
        <label for="">型号</label>
        <text>{{list.model}}</text>
      </view>
      <view>
        <label for="">规格</label>
        <text>{{list.size}}</text>
      </view>
      <view>
        <label for="">领用人</label>
        <text>{{list.recipient}}</text>
      </view>
      <view>
        <label for="">工号</label>
        <text>{{list.recipientJobNumber}}</text>
      </view>
      <view>
        <label for="">联系方式</label>
        <text>{{list.recipientPhone }}</text>
      </view>
    </div>
    <view class="button1">
      <u-button type="primary" text="下一步" class="primarys" @click="ok"></u-button>
    </view>
  </view>
</template>
<script>
  import i1 from "../../../static/icon/1.jpg"
import i2 from "../../../static/icon/2.jpeg"
import i3 from "../../../static/icon/3.jpeg"
import i4 from "../../../static/icon/4.jpg"
import i5 from "../../../static/icon/5.jpeg"
import i6 from "../../../static/icon/6.jpeg"
export default {
  components: {},
  data() {
    return {
      list1: [],
      list: {}
    }
  },
  onLoad() { },
  mounted() {
    const arr = uni.getStorageSync('sb');
    this.$res.post(this.https+'/api/Facility/Register/GetRegisterInfos', arr, { "content-type": "application/json" }).then(r => {
      uni.setStorageSync('list', r.data);
      console.log(r.data)
      this.list = r.data[0] ? r.data[0] : {}
      if(r.data[0].registerNo=='1001'){
        this.list1=[i1]
      }else if(r.data[0].registerNo=='1002'){
        this.list1=[i2]
      }else if(r.data[0].registerNo=='1003'){
        this.list1=[i3]
      }else if(r.data[0].registerNo=='2001'){
        this.list1=[i4]
      }else if(r.data[0].registerNo=='2002'){
        this.list1=[i5]
      }else if(r.data[0].registerNo=='2003'){
        this.list1=[i6]
      }
      // this.list1 = r.data[0] ? [r.data[0].url] : []
    })
  },
  methods: {
    ok() {

      uni.navigateTo({
        url: `/pages/tabBar/shepun/register`
      })

    }
  }
}
</script>
<style lang="scss">
.tipss {
  margin-top: 60rpx;
  padding: 0px 90rpx;
  font-size: 12px;

  >view {
    margin-bottom: 80rpx;
  }
}

label {
  margin-right: 20rpx;
  color: #8f9ca2;
  font-size: 14px;
  width: 80px;
  display: inline-block;
}

::v-deep .u-swiper__wrapper,
::v-deep .u-swiper__wrapper__item__wrapper__image {
  height: 250px !important;
}

::v-deep .u-swiper {
  height: 250px !important;
}

.button1 {
  position: fixed;
  bottom: 80rpx;
  left: 60rpx;
  right: 0;
  width: calc(100% - 120rpx);
}
</style>
