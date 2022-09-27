<template>
  <view class="scrolls">
    <u-toast ref="uToast"></u-toast>
    <view class="item">
      <view class="item1">
        <text>延长机时</text>
      </view>
      <text class="text0">您需要延长的使用时间</text>
    </view>
    <u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
      <u-form-item label="延长时间至" labelWidth="auto" prop="userInfo.sex" borderBottom @click="showSex = true" ref="item1">
        <u--input v-model="model1.userInfo.sex" disabled  placeholder="请选择时间" border="none">
        </u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
    </u--form>
    <u-radio-group v-model="radiovalue1" placement="column"   @change="groupChange" style="margin-top: 20px">
      <u-radio   :customStyle="{ marginBottom: '8px',   flex: '1' }" v-for="(item, index) in radiolist1" :key="index"
        :label="item.name" :name="item.name" @change="radioChange">
      </u-radio>
    </u-radio-group>
    <u-datetime-picker :show="showSex" v-model="value" :minDate="Number(new Date())" mode="datetime"
      @cancel="showSex=false" @confirm="sexSelect" :formatter="formatter"></u-datetime-picker>
    <view class="button1">
      <u-button type="primary" text="确认" class="primarys" @click="ok"></u-button>
     
    </view>
  </view>
</template>
<script>
document.getElementsByTagName("title")[0].innerText = "延长机时"
export default {
  components: {},
  data() {
    return {
      radiovalue1:'',
      radiolist1: [{ name: "15分钟" }, { name: "30分钟" }, { name: "1小时" }, { name: "2小时" }, { name: "4小时" }],
      value: Number(new Date()),
      showSex: false,
      model1: {
        userInfo: {
          sex: ''
        }
      },
      actions: [
        {
          name: "完好"
        },
        {
          name: "异常"
        }
      ],
      rules: {
        "userInfo.sex": {
          type: "string",
          min: 1,
          required: true,
          message: "请选择时间",
          trigger: ["change"]
        }
      }
      //   iconType:  ["success", "success_no_circle", "info", "warn", "waiting", "cancel", "download", "search", "clear"]
    }
  },
  onLoad() { },
  mounted() {
document.getElementsByTagName("title")[0].innerText = "延长机时"
  },
  methods: {
    groupChange() {
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
     this.model1.userInfo.sex=this.format(new Date(time))
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
    format(dat) {
      var year = dat.getFullYear();
      var mon = (dat.getMonth() + 1) < 10 ? "0" + (dat.getMonth() + 1) : dat.getMonth() + 1;
      var data = dat.getDate() < 10 ? "0" + (dat.getDate()) : dat.getDate();
      var hour = dat.getHours() < 10 ? "0" + (dat.getHours()) : dat.getHours();
      var min = dat.getMinutes() < 10 ? "0" + (dat.getMinutes()) : dat.getMinutes();
      var seon = dat.getSeconds() < 10 ? "0" + (dat.getSeconds()) : dat.getSeconds();

      var newDate = year + "-" + mon + "-" + data + " " + hour + ":" + min;
      return newDate;
    },
    sexSelect(e) {
      this.model1.userInfo.sex = this.format(new Date(e.value))
      this.radiovalue1=''
      this.showSex = false
    },
    ok() {
      this.$refs.form1
        .validate()
        .then(res => {
          let arr = uni.getStorageSync('djsb')
          let data = {
            registerIds: arr,
            delayTime: this.model1.userInfo.sex+":00"
          }
          this.$res.post(this.https+'/api/Facility/Register/DelayPreTime', data, { "content-type": "application/json" }).then(r => {
            uni.navigateTo({
				url: `/pages/tabBar/my/index2?tk=1&q=${arr}`,
			})
          })
        })
        .catch(errors => { })
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
::v-deep .uni-input-input{
  background: #fff0 !important;
}
::v-deep .u-form-item{
background: none !important;
padding: 0px !important;
}
  ::v-deep .u-radio__text{
    font-size: 13px !important;
    height: 18px !important;
    line-height: 16px !important;
  }
::v-deep .u-form-item__body__left__content__label {
  color: #8f9ca2;
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
  color: #000 !important;
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
  padding-top: 40rpx;
}

.scrolls {
  margin-top: 0rpx;
  padding: 0px 60rpx;
}
</style>
