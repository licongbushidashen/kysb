<template>
  <view>
    <!-- <u-navbar title="公告通知" @rightClick="rightClick" @leftClick="leftClick">
    </u-navbar> -->
    <u-loading-icon text="加载中"></u-loading-icon>
  </view>
</template>
<script>
document.getElementsByTagName('title')[0].innerText = ''
export default {
  data() {
    return {

      list: [],
      list1: [],
      current: 0,
      indexList: [],
      keyword: '',
      Category: ''
    }
  },

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
        client_id: "InternalGateway",
        client_secret: "1q2w3e*"
      }
      this.$res
        .post(this.rzss+'/connect/token', params, {
          "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        })
        .then(res => {
          if (!res.error) {
            this.$u.vuex("vuex_token", res.data.access_token)
            this.$res.get(`${this.https}/api/abp/application-configuration`).then(info => {
              if (!res.error) {
                this.$u.vuex("vuex_user", info.data)
                localStorage.setItem("vuex_userId", info.data.currentUser.id)
                let arr = query.q.split(',')
                console.log(arr,222)
                arr.forEach(e => {
                  e = e + ''
                });
                this.$res
                  .post(this.https+'/api/Facility/Register/IsUsed', arr, { "content-type": "application/json" }).then(r => {
                    let isUsed = false, isUser = false
                    uni.setStorageSync('sb', arr);
                    r.data.forEach(e => {
                      if (e.isUsed) {
                        isUsed = true
                      }
                      if (e.isUser) {
                        isUser = true
                      }
                    })
                    if (isUsed && isUser) {
                      uni.navigateTo({
                        url: `/pages/tabBar/my/index1`,
                      })
                    } else if (isUsed) {
                      uni.navigateTo({
                        url: `/pages/tabBar/home/index`,
                      })
                    } else {
                      if (arr.length > 1) {
                        uni.navigateTo({
                          url: `/pages/tabBar/shepun/more`,
                        })
                      } else {
                        uni.navigateTo({
                          url: `/pages/tabBar/shepun/details`,
                        })
                      }

                    }
                  })
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

  onLoad: function (option) {

  },

}
</script>
<style lang="scss" scoped>
uni-image {
  height: 100% !important;
  width: 100% !important;

  div {
    background-position: center center;
    background-size: 100% !important;
    background-repeat: no-repeat;
  }
}

.emptys {
  margin-top: 50% !important;
}

.search {
  padding: 0px 16px;
  margin: 40rpx 0;

  .u-search__content {
    height: 36px !important;
  }
}

.list_notice {

  padding: 0px 16px;

  h1 {
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #282828;
  }

  p {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;

    color: #999999;

    &::after {
      content: '';
      display: block;
      height: 1px;
      background: #efefef;
      width: 100%;
      margin: 12px 0px;
    }

    span {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      float: none;
      margin-left: 16px;
    }
  }
}
</style>

<style lang="scss">
.item-attachments {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-template-rows: repeat(2, 100px);
  margin: 8px 0px;
  grid-row-gap: 2%;
  grid-column-gap: 1%;
}

::v-deep .u-album {
  margin-top: 10px;
}

::v-deep .u-album__row {
  margin-bottom: 10px;
}

.album {
  @include flex;
  align-items: flex-start;

  &__avatar {
    background-color: $u-bg-color;
    padding: 5px;
    border-radius: 3px;
  }

  &__content {
    margin-left: 10px;
    flex: 1;
  }
}
</style>