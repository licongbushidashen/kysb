<template>
  <view class="scrolls">
    <view class="item">
      <view class="item1">
        <text>设备下机提醒</text>
      </view>
      <text class="text0">您当前正在使用的设备已下机，如需继续使用，请重新扫码登记</text>
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
              <text>{{ item.brand }}</text>
            </div>
            <div style="margin: 10rpx 0px">
              <label for="">本次使用时长:</label>
              <text>{{ item.minutes }}分钟</text>
            </div>
            <div style="margin: 10rpx 0px">
              <label for="">支撑科研项目:</label>
              <text>{{ item.itemName }}</text>
            </div>
            <div style="margin: 10rpx 0px">
              <label for="">本年度累计使用时长:</label>
              <text>{{ item.totalMinutes }}分钟</text>
            </div>
            <div style="margin: 10rpx 0px">
              <label for="">占总机时:</label>
              <text>{{ item.percent }}%</text>
            </div>
          </view>
        </view>
      </u-list-item>
    </u-list>
    <view class="button1">
      <u-button type="primary" text="我已知晓" class="primarys" @click="appclose()"></u-button>
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
import hys from "../../../static/img/hys.png"
document.getElementsByTagName("title")[0].innerText = ""
export default {
  components: {},
  data() {
    return {
      list: [
       
      ]
    }
  },
  onLoad() {},
  mounted() {
    this.dto()
  },
  methods: {
    actives(index) {
      this.list[index].active = !this.list[index].active
      console.log(this.list)
    },
    dto(){
      let arr = uni.getStorageSync('djsb')
      this.$res.post(this.https+'/api/Facility/Register/GetOfflineRemind', arr, { "content-type": "application/json" }).then(r => {
        r.data.forEach(e => {
          if(e.registerNo=='1001'){
        e.url=i1
      }else if(e.registerNo=='1002'){
        e.url=i2
      }else if(e.registerNo=='1003'){
        e.url=i3
      }else if(e.registerNo=='2001'){
        e.url=i4
      }else if(e.registerNo=='2002'){
        e.url=i5
      }else if(e.registerNo=='2003'){
        e.url=i6
      }
          e.active=true
        });
        this.list = r.data
      })
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
// .list.active {
//   border: 1px solid #3c9cff;
//   position: relative;
// }
// .list.active::before {
//   content: "";
//   width: 22px;
//   height: 22px;
//   position: absolute;
//   right: 0px;
//   bottom: 0px;
//   background: #3c9cff;
//   background: linear-gradient(135deg, transparent, transparent 50%, #3c9cff 50%, #3c9cff 100%);
// }

// .list.active::after {
//   content: "";
//   width: 22px;
//   height: 20px;
//   position: absolute;
//   right: -3px;
//   bottom: -2px;
//   background-image: url(../../../static/img/dui.png);
//   background-size: 100% 100%;
// }

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
