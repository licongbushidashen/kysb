<template>
  <view class="scrolls">
    <view class="item">
      <view class="item1">
        <text>设备当前状态</text>
      </view>
      <text class="text0">设备是否完好</text>
    </view>
    <u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
      <u-form-item label="设备状态" labelWidth="auto" :labelStyle="labelStyle" prop="userInfo.sex" borderBottom
        @click="showSex = true" ref="item1">
        <u--input v-model="model1.userInfo.sex" disabled disabledColor="#ffffff" placeholder="请选择状态" border="none" >
        </u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
      <u-form-item label="异常原因" labelWidth="auto" prop="userInfo.remarks" borderBottom ref="item2"
        v-if="model1.userInfo.sex=='异常'">
        <u--textarea v-model="model1.userInfo.remarks" placeholder="请输入异常原因" autoHeight style="border:0px"></u--textarea>

      </u-form-item>
    </u--form>

    <u-action-sheet :show="showSex" :actions="actions" title="请选择状态" @close="showSex = false" @select="sexSelect">
    </u-action-sheet>
    <view class="button1">
      <u-button type="primary" text="确认" class="primarys" @click="ok"></u-button>
      <u-button text="取消"></u-button>
    </view>
  </view>
</template>
<script>
document.getElementsByTagName("title")[0].innerText = ""
export default {
  components: {},
  data() {
    return {
      labelStyle: {
        color: '#8f9ca2',
        marginRight:'20rpx'
      },
      showSex: false,
      model1: {
        userInfo: {
          sex: "完好",
          remarks: '',
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
        "userInfo.remarks": {
          type: "string",
          min: 1,
          required: true,
          message: "请输入异常原因",
          trigger: ["blur", "change"]
        }
      }
      //   iconType:  ["success", "success_no_circle", "info", "warn", "waiting", "cancel", "download", "search", "clear"]
    }
  },
  onLoad() { },
  mounted() { },
  methods: {
    sexSelect(e) {
      this.model1.userInfo.sex = e.name
      this.model1.userInfo.remarks = ''
      // this.$refs.form1.validateField("userInfo.sex")
    },
    ok() {
      this.$refs.form1.validate().then(res => {
        let arr = uni.getStorageSync('sb')
     
        let data = {
          registerNos: arr,
          status: this.model1.userInfo.sex == '完好' ? this.model1.userInfo.sex : this.model1.userInfo.remarks
        }
        this.$res.post(this.https+'/api/Facility/Register/Offline', data, { "content-type": "application/json" }).then(r => {
          // this.$refs.uToast.show({
          //       type: "success",
          //       message: "下机成功",               
          //     });
                       uni.navigateTo({
              url: `/pages/tabBar/shepun/index`,
            })
          // if (arr.length > 1) {
          //   uni.navigateTo({
          //     url: `/pages/tabBar/shepun/more`,
          //   })
          // } else {
          //   uni.navigateTo({
          //     url: `/pages/tabBar/shepun/details`,
          //   })
          // }
        })
      }).catch(errors => {

      })
    }
  }
}
</script>
<style lang="scss" scoped>
  ::v-deep .u-textarea{
    padding:9px 0px !important
  }
  ::v-deep .u-form-item__body__left{
    margin-right: 20rpx !important;
  }
::v-deep .u-form-item__body__left__content__label {
  color: #8f9ca2
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
  margin-bottom: 160rpx;
}

.item1 {
  margin: 10rpx 0px;
  padding-top: 100rpx
}

.scrolls {
  margin-top: 140rpx;
  padding: 0px 60rpx;
}
</style>
