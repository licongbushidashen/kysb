<template>
  <view class="scrolls">
    <view class="item">
      <view class="item1">
        <text>超时提醒</text>
      </view>
      <text class="text0">您当前正在使用的设备已超过预计使用时长，您是否现在下机</text>
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
              <text>
                {{ item.registerName }}</text>
            </div>
            <div style="margin: 10rpx 0px">
              <label for="">本次使用时长:</label>
              <text>{{ item.minutes |ChangeHourMinutestr}}</text>
            </div>
            <div style="margin: 10rpx 0px">
              <label for="">原预计结束时间:</label>
              <text>{{ item.presetTime }}</text>
            </div>
          </view>
        </view>
      </u-list-item>
    </u-list>
    <view class="button1">
      <u-button type="primary" text="延长机时" class="primarys" @click="ok"></u-button>
      <u-button text="确认下机" class="primarys" @click="xiaji"></u-button>
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
document.getElementsByTagName("title")[0].innerText = ""
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
                arr.forEach(e => {
                  e = e + ''
                });
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
        console.log(r)
        for(let i=0;i<r.data.length;i++){
          if(r.data[i].registerNo=='1001'){
            r.data[i].url=i1
          }else if(r.data[i].registerNo=='1002'){
            r.data[i].url=i2
          }else if(r.data[i].registerNo=='1003'){
            r.data[i].url=i3
          }else if(r.data[i].registerNo=='2001'){
            r.data[i].url=i4
          }else if(r.data[i].registerNo=='2002'){
            r.data[i].url=i5
          }else if(r.data[i].registerNo=='2003'){
            r.data[i].url=i6
          }
          // r.data[i].minutes=this.ChangeHourMinutestr(r.data[i].minutes)
        }
        this.list = r.data
      })
    },
    xiaji() {
      let arr = uni.getStorageSync('sb')
      let data = {
        registerNos: arr
      }
      this.$res.post(this.https+'/api/Facility/Register/Offline', data, { "content-type": "application/json" }).then(r => {
        this.appclose()
      })
    },
    actives(index) {
      this.list[index].active = !this.list[index].active
      console.log(this.list)
    },
    sexSelect(e) { },
    ok() {
          uni.navigateTo({
            url: `/pages/tabBar/xiaoxi/time`
          })
        // .catch(errors => { })
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
  width: 22px;
  height: 20px;
  position: absolute;
  right: -3px;
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
