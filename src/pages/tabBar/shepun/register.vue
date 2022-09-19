<template>
  <view class="scrolls">
    <u-toast ref="uToast"></u-toast>
    <u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
      <u-form-item label="设备状态" labelWidth="auto" prop="userInfo.status" borderBottom ref="item1" class="required">
        <u--input placeholder="请输入设备状态" border="surround" clearable v-model="model1.userInfo.status"></u--input>
        <!-- <u-icon slot="right" name="arrow-right"></u-icon> -->
      </u-form-item>
      <u-form-item label="实验/样品名称" labelWidth="auto" prop="userInfo.sampleName" borderBottom ref="item1"
        class="required" @click="showsample = true">
        <u--input class="yangshixiugai" v-model="model1.userInfo.sampleName" disabled disabledColor="#ffffff" placeholder="请选择实验/样品名称"
          border="none"></u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
      <u-form-item label="样品数量" labelWidth="auto" prop="userInfo.quantity" borderBottom ref="item1" class="required">
        <u--input placeholder="请输入样品数量" border="surround" clearable v-model="model1.userInfo.quantity">
        </u--input>
        <!-- <u-icon slot="right" name="arrow-right"></u-icon> -->
      </u-form-item>
      <u-form-item label="预估结束时间" labelWidth="auto" prop="userInfo.sex" borderBottom @click="opentime" ref="item1">
        <u--input class="yangshixiugai" v-model="model1.userInfo.presetTime" disabled disabledColor="#ffffff" placeholder="请选择时间"
          border="none">
        </u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
      <u-form-item label="支撑服务类型" labelWidth="auto" prop="userInfo.serviceCategory" borderBottom ref="item1"
        class="required" @click="showstype = true">
        <u--input class="yangshixiugai" v-model="model1.userInfo.serviceCategory" disabled disabledColor="#ffffff" placeholder="请选择支撑服务类型"
          border="none">
        </u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
      <u-form-item  label="项目名称" labelWidth="auto" prop="userInfo.project" borderBottom ref="item1" class="required"
        @click="project">
        <u--input class="yangshixiugai" v-model="model1.userInfo.project.itemName" disabled disabledColor="#ffffff" placeholder="请选择支撑服务类型"
          border="none"></u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
      <u-form-item  label="项目代码" labelWidth="auto" prop="userInfo.type" borderBottom ref="item1" class="required">
        <u--input class="yangshixiugai" v-model="model1.userInfo.project.itemCode" disabled disabledColor="#ffffff" placeholder="请选择支撑服务类型"
          border="none"></u--input>
      </u-form-item>
      <u-form-item label="项目负责人" labelWidth="auto" prop="userInfo.type" borderBottom ref="item1" class="required">
        <u--input class="yangshixiugai" v-model="model1.userInfo.project.dutyUser" disabled disabledColor="#ffffff" placeholder="请选择支撑服务类型"
          border="none"></u--input>
      </u-form-item>
    </u--form>
    <view v-if="model1.userInfo.serviceCategory">
      <view v-for="(item, i) in clients" :key="i" class="wtr">
        <p class="addwt">
          委托人信息
          <u-icon name="close-circle" color="#2979ff" size="28" @click="splies(i)"  style="    margin-top: 3px;    margin-left: 5px;"></u-icon>
        </p>
        <view @click="openurl(i)"><label for="">姓名</label>
          <u--input v-model="item.userName" :disabled="model1.userInfo.type != '为外部提供支撑服务'" disabledColor="#ffffff"
            placeholder="请输入姓名" border="none"></u--input>
        </view>
        <view><label for="">部门</label>
          <u--input v-model="item.department" :disabled="model1.userInfo.type != '为外部提供支撑服务'" disabledColor="#ffffff"
            placeholder="请输入部门" border="none"></u--input>
        </view>
        <view><label for="">电话</label>
          <u--input v-model="item.phone" :disabled="model1.userInfo.type != '为外部提供支撑服务'" disabledColor="#ffffff"
            placeholder="请输入电话" border="none"></u--input>
        </view>
      </view>
      <p class="addwt" @click="addpush">
        <u-icon name="plus-circle" color="#2979ff" size="28" style="    margin-top: 3px;    margin-right: 5px;"></u-icon><span>添加委托人</span>
      </p>
    </view>
    <u-action-sheet :show="showsample" :actions="list" @close="showsample = false" @select="sample"> </u-action-sheet>
    <u-action-sheet :show="showstype" :actions="list1" @close="showstype = false" @select="sample1"> </u-action-sheet>
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
      clients: [{}],
      showsample: false,
      showstype: false,
      list: [{ name: "测试" }, { name: "加工" }, { name: "计算" }, { name: "分析" }],
      list1: [{ name: "支撑本研究中心科研项目" }, { name: "支撑其他科研中心科研项目" }, { name: "为外部提供支撑服务" }],
      model1: {
        userInfo: {
          status: "完好",
          sampleName: "测试",
          quantity: '',
          serviceCategory: "",
          remarks: "",
          presetTime: "",
          project: {}
        }
      },
      rules: {
        "userInfo.status": {
          type: "string",
          min: 1,
          required: true,
          message: "请输入设备当前状态",
          trigger: ["blur", "change"]
        },
        "userInfo.quantity": {
          type: "number",
          min: 1,
          required: true,
          message: "请输入样品数量",
          trigger: ["blur", "change"]
        },
        "userInfo.presetTime": {
          type: "string",
          min: 1,
          required: true,
          message: "请选择结束时间",
          trigger: ["blur", "change"]
        },
        "userInfo.serviceCategory": {
          type: "string",
          min: 1,
          required: true,
          message: "请选择支撑服务类型",
          trigger: ["blur", "change"]
        }
      },

      //   iconType:  ["success", "success_no_circle", "info", "warn", "waiting", "cancel", "download", "search", "clear"]
    }
  },
  onLoad: function (o) {
    debugger
    if (o.storage == 1) {
      this.clients = uni.getStorageSync("clients")
      this.model1.userInfo = uni.getStorageSync("userInfo")
    } else if (JSON.stringify(o) != "{}") {
      this.clients = uni.getStorageSync("clients")
      this.model1.userInfo = o
    }

    if (o.i != undefined || o.i != null) {
      let userInfo = uni.getStorageSync("userInfo")
      this.clients = uni.getStorageSync("clients")
      this.clients[o.i] = JSON.parse(JSON.stringify(userInfo.project1))
    }
  },
  mounted() { },
  methods: {
    openurl(i) {
      if (this.model1.userInfo.type != "为外部提供支撑服务") {
        uni.setStorageSync("userInfo", this.model1.userInfo)

        uni.navigateTo({
          url: `/pages/tabBar/shepun/newopen/project1?storage=1&i=${i}`
        })
      }
    },
    splies(i) {
      this.clients.splice(i, 1)
    },
    addpush() {
      this.clients.push({})
    },
    sample1(e) {
      this.model1.userInfo.serviceCategory = e.name
    },
    sample(e) {
      this.model1.userInfo.sampleName = e.name
    },
    changeParam(param) {
      return JSON.stringify(param).replace(/:/g, "=").replace(/,/g, "&").replace(/{/g, "?").replace(/}/g, "").replace(/"/g, "")
    },
    project() {
      uni.setStorageSync("userInfo", this.model1.userInfo)
      uni.setStorageSync("clients", this.clients)
      uni.navigateTo({
        url: `/pages/tabBar/shepun/newopen/project?storage=1`
      })
    },
    opentime() {
      uni.setStorageSync("userInfo", this.model1.userInfo)
      uni.setStorageSync("clients", this.clients)
      uni.navigateTo({
        url: `/pages/tabBar/shepun/time?storage=1`
      })
    },
    ok() {
      this.$refs.form1
        .validate()
        .then(res => {
          debugger
          let list = JSON.parse(JSON.stringify(uni.getStorageSync('list')))
          list.push({
            "registerNo": "1",
            "registerName": "1",
          })
          for (let i = 0; i < list.length; i++) {
            list[i] = { ...list[i], ...this.model1.userInfo.project1, ...this.model1.userInfo.project, ...this.model1.userInfo }
            list[i].url = 't'
            list[i].brand = 'b'
            delete list[i].project1
            delete list[i].project
            if (list[i].sampleName == '测试') {
              list[i].sampleName = 0
            }
            if (list[i].sampleName == '加工') {
              list[i].sampleName = 1
            }
            if (list[i].sampleName == '计算') {
              list[i].sampleName = 2
            }
            if (list[i].sampleName == '分析') {
              list[i].sampleName = 3
            }
            if (list[i].serviceCategory == '支撑本研究中心科研项目') {
              list[i].serviceCategory = 0
            }
            if (list[i].serviceCategory == '支撑其他科研中心科研项目') {
              list[i].serviceCategory = 1
            }
            if (list[i].serviceCategory == '为外部提供支撑服务') {
              list[i].serviceCategory = 2
            }
            list[i].presetTime = list[i].presetTime + ':00'
          }
          let data = {
            registerDto: list,
            detailList: [{
              "userName": "string",
              "company": "string",
              "phone": "string"
            }]
          }
          this.$res.post('/sb/api/Facility/Register/CreateRegister', data, { "content-type": "application/json" }).then(r => {
            this.$refs.uToast.show({
              type: 'success',
              message: '操作成功',

              complete() {
                this.appclose()
              }
            })

          })

        })
        .catch(errors => { })
    }
  }
}
</script>
<style lang="scss" scoped>
.yangshixiugai{
  padding-left: 16rpx !important;
}
::v-deep .u-line {
  border: 0px !important;
  border-bottom: 0.1px solid #eaeaea !important;
}

.addwt {
  display: flex;
  margin-top: 20rpx;

  span {
    font-size: 14px;
  }
}

.wtr {
  p {
    margin: 20rpx 0;
  }

  view {
    display: flex;

    label {
      width: 200rpx;
    }

    ::v-deep .u-input {
      flex: 1;
    }
  }
}

::v-deep .u-input {
  border: 0px !important;
}

::v-deep .u-radio.u-radio-label--undefined {
  margin-bottom: 0px !important;
  height: 20px !important;
}

::v-deep .u-form-item__body__left__content__label {
  width: 110px !important;

  &::before {
    content: "*";
    display: inline-block;
    color: red;
  }
}

::v-deep .u-form-item__body__left__content__label {
  color: #8f9ca2;
}

.button1 {
  position: fixed;
  bottom: 80rpx;
  left: 60rpx;
  right: 0;
  width: calc(100% - 120rpx);
  background: #fff;
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
  padding-bottom: 290rpx;
}
</style>
