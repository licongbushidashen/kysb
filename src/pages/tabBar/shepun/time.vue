<template>
  <view class="scrolls">
    <text>请选择时间</text>
    <u-radio-group v-model="radiovalue1" placement="column">
      <u-radio :customStyle="{ marginBottom: '8px' }" v-for="(item, index) in radiolist1" :key="index"
        :label="item.name" :name="item.name" @change="radioChange">
      </u-radio>
    </u-radio-group>
    <u-datetime-picker :show="showSex" v-model="value" :minDate="Number(new Date())" mode="datetime"
      @cancel="showSex = false" @confirm="sexSelect" :formatter="formatter"></u-datetime-picker>

    <view class="button1">
      <u-button type="primary" text="确认" class="primarys" @click="ok" :disabled="radiovalue1==''"></u-button>
    </view>
  </view>
</template>
<script>
document.getElementsByTagName("title")[0].innerText = "请选择时间"
export default {
  components: {},
  data() {
    return {
      disabled:false,
      radiovalue1: "",
      value: "",
      showSex: false,
      radiolist1: [{ name: "15分钟" }, { name: "30分钟" }, { name: "1小时" }, { name: "2小时" }, { name: "4小时" }, { name: "自定义时间" }],
      endtime: {}
    }
  },

  mounted() { 
    document.getElementsByTagName("title")[0].innerText = "请选择时间"
  },
  methods: {
    ok() {
      let time = ''
      if (this.radiovalue1 == '15分钟') {
        time = new Date().getTime() + 1000 * 900
      }
      if (this.radiovalue1 == '30分钟') {
        time = new Date().getTime() + 1000 * 1800
      }
      if (this.radiovalue1 == '1小时') {
        time = new Date().getTime() + 1 * 1000 * 3600
      }
      if (this.radiovalue1 == '2小时') {
        time = new Date().getTime() + 2 * 1000 * 3600
      }
      if (this.radiovalue1 == '4小时') {
        time = new Date().getTime() + 4 * 1000 * 3600
      }
      this.endtime = this.format(new Date(time))
      let userInfo = uni.getStorageSync("userInfo")
      userInfo.presetTime = this.endtime
      uni.setStorageSync("userInfo", userInfo)
      this.showSex = false
      uni.navigateTo({
        url: `/pages/tabBar/shepun/register?storage=1`
      })
    },
    radioChange(e) {
      if (e == "自定义时间") {
        this.showSex = true
      }
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`
      }
      if (type === "month") {
        return `${value}月`
      }
      if (type === "day") {
        return `${value}日`
      }
      if (type === "hour") {
        return `${value}时`
      }
      if (type === "minute") {
        return `${value}分`
      }
      return value
    },
    changeParam(param) {
      return JSON.stringify(param).replace(/:/g, "=").replace(/,/g, "&").replace(/{/g, "?").replace(/}/g, "").replace(/"/g, "")
    },
    format(dat) {
      var year = dat.getFullYear()
      var mon = dat.getMonth() + 1 < 10 ? "0" + (dat.getMonth() + 1) : dat.getMonth() + 1
      var data = dat.getDate() < 10 ? "0" + dat.getDate() : dat.getDate()
      var hour = dat.getHours() < 10 ? "0" + dat.getHours() : dat.getHours()
      var min = dat.getMinutes() < 10 ? "0" + dat.getMinutes() : dat.getMinutes()
      var seon = dat.getSeconds() < 10 ? "0" + dat.getSeconds() : dat.getSeconds()

      var newDate = year + "-" + mon + "-" + data + " " + hour + ":" + min
      return newDate
    },
    sexSelect(e) {
      this.endtime = this.format(new Date(e.value))
      let userInfo = uni.getStorageSync("userInfo")
      userInfo.presetTime = this.endtime
      uni.setStorageSync("userInfo", userInfo)
      this.showSex = false
      uni.navigateTo({
        url: `/pages/tabBar/shepun/register?storage=1`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .u-radio__icon-wrap__icon{
  span{
  font-size: 12px !important;
    line-height: 11px !important;
  }
}
::v-deep .u-radio-group {
  margin-top: 20px !important;
}

::v-deep .u-radio__icon-wrap--circle {
  height: 20px !important;
  width: 20px !important;
}

::v-deep .u-radio__text {
  color: #000 !important;
  font-size: 14px !important;
  line-height: 14px !important;
}

::v-deep .u-radio.u-radio-label--undefined {
  margin-bottom: 20px !important;
  height: 20px !important;
}

::v-deep .u-form-item__body__left__content__label {
  width: 100px !important;
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
  margin-bottom: 160rpx;
}

.item1 {
  margin: 10rpx 0px;
  padding-top: 100rpx;
}

.scrolls {
  padding: 0px 60rpx;
  margin-top: 60rpx;
}
</style>
