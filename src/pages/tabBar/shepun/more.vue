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
        <view class="list" :class="item.active ? 'active' : '111'" @click="actives(index)">
          <view>
            <image :src="item.img" mode="" style="width: 64px; height: 65px"></image>
          </view>
          <view class="tips">
            <div>
              <text>{{ item.name }}</text
              ><text>{{ item.brand }}</text>
            </div>
            <div style="margin: 10rpx 0px">
              <label for="">型号:</label>
              <text>{{ item.type }}</text>
            </div>
            <div>
              <label for="">规格:</label>
              <text>{{ item.size }}</text>
            </div>
          </view>
        </view>
      </u-list-item>
    </u-list>
    <view class="button1">
      <u-button type="primary" text="确认" class="primarys" @click="ok"></u-button>
      <u-button text="取消"></u-button>
    </view>
  </view>
</template>
<script>
import hys from "../../../static/img/hys.png"
document.getElementsByTagName("title")[0].innerText = ""
export default {
  components: {},
  data() {
    return {
      list: [
        { name: "火花", brand: "中国造", type: "001", size: "80*90", img: hys ,active:false},
        { name: "火花", brand: "中国造", type: "001", size: "80*90", img: hys ,active:false}
      ]
    }
  },
  onLoad() {},
  mounted() {},
  methods: {
    actives(index) {
      this.list[index].active = !this.list[index].active
      console.log(this.list)
    },
    sexSelect(e) {},
    ok() {
      this.$refs.form1
        .validate()
        .then(res => {
          uni.navigateTo({
            url: `/pages/tabBar/xiaoxi/success`
          })
        })
        .catch(errors => {})
    }
  }
}
</script>
<style lang="scss" scoped>
  .list.active{
    border: 1px solid #3c9cff;
    position:relative;
  }
  .list.active::before{
    content: '';
      width: 12px;
      height: 12px;
      position: absolute;
      right: 0px;
      bottom: 0px;
      background: #3c9cff;
      background: linear-gradient(135deg, transparent, transparent 50%, #3c9cff 50%, #3c9cff 100%)
  }
  .list.active::after{

      content: '';
      width: 12px;
      height: 12px;
      position: absolute;
      right: -1px;
    bottom: -2px;
      background-image:url(../../../static/img/dui.png) ;
      background-size:100% 100% ;
    
  }
.list {
  display: flex;
  border: 1px solid #d6d7d9;
  padding: 20rpx;
  margin-bottom: 20px;
  .tips {
    margin-left: 20rpx;
    color: #8f9ca2;
    font-size: 14px;
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
  bottom: 160rpx;
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
  margin-bottom: 80rpx;
}
.item1 {
  margin: 10rpx 0px;
  padding-top: 100rpx;
}
.scrolls {

  padding: 0px 60rpx;
}
</style>
