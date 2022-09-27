<template>
  <view class="scrolls">
    <view class="item">
      <view class="item1">
        <text>设备被占用提醒</text>
      </view>
      <text class="text0">您当前正在使用的设备被占用，若您需要继续使用该设备，建议您联系该用户协调解决</text>
    </view>
    <u-list>
      <u-list-item v-for="(item, index) in list" :key="index">
        <view class="list" :class="item.active ? 'active' : '111'" @click="actives(index)">
          <view>
            <image :src="item.url" mode="" style="width: 64px; height: 65px"></image>
          </view>
          <view class="tips">
            <div>
              <!-- <text>{{ item.name }}</text> -->
              <text>{{ item.name }}</text>
            </div>
            <div style="margin: 10rpx 0px">
              <label for="">本次使用时长:</label>
                <text>{{ item.minutes |ChangeHourMinutestr}}</text>
            </div>
            <div style="margin: 10rpx 0px">
              <label for="">支持科研项目:</label>
              <text>{{ item.itemName }}</text>
            </div>
            <div style="margin: 10rpx 0px">
              <label for="">本年度累计使用时长:</label>
              <text>{{ item.totalMinutes }}</text>
            </div>
            <div style="margin: 10rpx 0px">
              <label for="">占总机时:</label>
              <text>{{ item.selfTotalMinutes }}</text>
            </div>
            <div style="margin: 10rpx 0px">
              <label for="">当前占用人:</label>
              <text>{{ item.newUser }}</text>
            </div>
            <div style="margin: 10rpx 0px">
              <label for="">预估结束时间:</label>
              <text>{{ item.endTime }}</text>
            </div>
          </view>
        </view>
      </u-list-item>
    </u-list>
    <view class="button1">
      <u-button type="primary" text="我已知晓" class="primarys" @click="ok"></u-button>
    </view>
  </view>
</template>
<script>
import hys from "../../../static/img/hys.png"
document.getElementsByTagName("title")[0].innerText = "设备被占用"
export default {
  components: {},
  data() {
    return {
      list: [
      ]
    }
  },
  onLoad() { },
  mounted() {
    document.getElementsByTagName("title")[0].innerText = "设备被占用"
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
                let arr=[]
                // let arr = query.id.split(',')
                // arr.forEach(e => {
                //   e = e + ''
                // });
                arr.push('3a066812-987c-3e96-b28f-7996b23d94f1')
                this.dto(arr)
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
  methods: {
    dto(arr) {
      this.$res.post(this.https+'/api/Facility/Register/GetOfflineRemind', arr, { "content-type": "application/json" }).then(r => {
        this.list = r.data
      })
    },
    actives(index) {
      this.list[index].active = !this.list[index].active
      console.log(this.list)
    },
    sexSelect(e) { },
    ok() {
 this.appclose()
    }
  }
}
</script>
<style lang="scss" scoped>
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
  background: linear-gradient(135deg, transparent, transparent 50%, #3c9cff 50%, #3c9cff 100%);
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
