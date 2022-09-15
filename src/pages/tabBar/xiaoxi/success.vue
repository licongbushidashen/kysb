<template>
    <view class="scrolls">
      <view class="item">
        <icon :type="iconType" size="70" />
        <view class="item1">
          <text>操作成功</text>
        </view>
        <text class="text0"
          >用户{{ autherUser.userName }}({{ autherUser.code }}) 上级使用{{
            autherUser.device
          }}设备,若需要继续使用该设备，建议您联系该用户协商解决。</text
        >
      </view>
  
      <u-divider text="" lineColor="#ff0000"></u-divider>
      <view class="info">
        <view class="infos">
          <label for="">姓名</label>
          <text>{{ autherUser.userName }}</text>
        </view>
        <view class="infos">
          <label for="">工号</label>
          <text>{{ autherUser.code }}</text>
        </view>
      </view>
      <view class="button1">
        <u-button type="primary" text="确认" class="primarys"></u-button>
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
        autherUser: {
          device: "大机器",
          userName: "李德华",
          code: "000001",
          time: "20时20分"
        }
        //   iconType:  ["success", "success_no_circle", "info", "warn", "waiting", "cancel", "download", "search", "clear"]
      }
    },
    onLoad() {},
    mounted() {
      var query = this.$route.query
      if (query.accessToken) {
        this.$u.vuex("query_token", query.accessToken)
      }
      if (query.accessToken || localStorage.getItem("query_token")) {
        if (query.accessToken) {
          localStorage.setItem("query_token", query.accessToken)
        }
        var params = {
          grant_type: "onekey",
          access_token: query.accessToken || localStorage.getItem("query_token"),
          client_id: "Logistics_App",
          client_secret: "1q2w3e*"
        }
        this.$res
          .post(this.rzss, params, {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
          })
          .then(res => {
            if (!res.error) {
              this.$u.vuex("vuex_token", res.data.access_token)
              this.$res.get(`${this.https}/api/abp/application-configuration`).then(info => {
                if (!res.error) {
                  this.$u.vuex("vuex_user", info.data)
                  localStorage.setItem("vuex_userId", info.data.currentUser.id)
                } else {
                  this.title = "对不起"
                  this.info = "进入系统失败，错误码:10022"
                }
              })
            } else {
              this.title = "对不起"
              this.info = "进入系统失败，错误码:10021"
            }
          })
      } else {
        if (this.vuex_config.currentUser === undefined || !this.vuex_config.currentUser.isAuthenticated) {
          this.title = "非法访问"
          this.info = "请从正规途径进入系统"
        } else {
          this.$u.route("/pages/feedbacks/index")
        }
      }
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
  