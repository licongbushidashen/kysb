<template>
    <view class="scrolls">
      <view class="item" >
        <icon :type="iconType" size="70" />
        <view class="item1">
          <text>提交成功</text>
        </view>
        <!-- <text class="text0"
          >用户{{ autherUser.userName }}({{ autherUser.code }}) 上级使用{{
            autherUser.device
          }}设备,若需要继续使用该设备，建议您联系该用户协商解决。</text
        > -->
      </view>
  
      <!-- <u-divider text="" lineColor="#ff0000"></u-divider> -->
      <!-- <view class="info">
        <view class="infos">
          <label for="">姓名</label>
          <text>{{ autherUser.userName }}</text>
        </view>
        <view class="infos">
          <label for="">工号</label>
          <text>{{ autherUser.code }}</text>
        </view>
      </view> -->
      <view class="button1">
        <u-button type="primary" text="关闭页面" class="primarys" @click="appclose()"></u-button>
      </view>
    </view>
  </template>
  <script>
  document.getElementsByTagName("title")[0].innerText = ""
  export default {
    components: {},
    data() {
      return {
        iconType: "success",
        //   iconType:  ["success", "success_no_circle", "info", "warn", "waiting", "cancel", "download", "search", "clear"]
      }
    },
    onLoad() {},
    mounted() {

    },
    methods: {}
  }
  </script>
  <style lang="scss" scoped>
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
  }
  .item {
    text-align: center;
    margin-bottom: 160rpx;
  }
  .item1 {
    margin: 40rpx 0px;
  }
  .scrolls {
    margin-top: 140rpx;
    padding: 0px 60rpx;
  }
  </style>
  