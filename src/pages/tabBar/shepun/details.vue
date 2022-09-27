<template>
  <view class="scrolls">
    <u-album
    singleMode
    :urls="list1"
            ></u-album>
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
      <view v-if="list.recipient">
        <label for="">领用人</label>
        <text>{{list.recipient}}</text>
      </view>
      <view v-if="list.recipientJobNumber">
        <label for="">工号</label>
        <text>{{list.recipientJobNumber}}</text>
      </view>
      <view v-if="list.recipientPhone">
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
  import i1 from "../../../static/icon/1.png"

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
           this.list1=[i1]
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
<style lang="scss" scoped>
::v-deep .u-button--square{
  border-radius:12px !important;
}
 ::v-deep .u-album{
    height: 400rpx;
  }
  ::v-deep .u-album__row{
    height: 100%;
  }
  ::v-deep .u-album__row__wrapper{
    height: 100%;
    width: 100%;
  
    img{
      object-fit:cover;
    }
  }
  ::v-deep .u-album__row__wrapper > uni-image {
  width: 100% !important;
  height: 100% !important;
    >div{
      background-size: 100% 129%;
    }
}
</style>
<style lang="scss">

.tipss {
  margin-top: 60rpx;
  padding: 0px 90rpx;
  font-size: 12px;

  >view {
       padding-bottom: 30rpx;
    border-bottom: 1px solid #efefef;
    padding-top: 30rpx;
    display: flex;
  }
}

label {
  margin-right: 20rpx;
  color: #000;
  font-size: 16px;
  width: 80px;
  display: inline-block;
}
text{
   font-size: 16px;
   flex:1;
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
  bottom: 40rpx;
  left: 60rpx;
  right: 0;
  width: calc(100% - 120rpx);
}
</style>
