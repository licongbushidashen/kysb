<template>
  <view class="scrolls">
    <u-toast ref="uToast"></u-toast>
    <u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
      <u-form-item
        label="设备状态"
        labelWidth="auto"
        prop="userInfo.status"
        borderBottom
        ref="item1"
        class="required"
      >
        <u--input
          placeholder="请输入设备状态"
          border="surround"
          clearable
          v-model="model1.userInfo.status"
        ></u--input>
        <!-- <u-icon slot="right" name="arrow-right"></u-icon> -->
      </u-form-item>
      <u-form-item
        label="实验/样品名称"
        labelWidth="auto"
        prop="userInfo.sampleName"
        borderBottom
        ref="item1"
        class="required"
        @click="
          showsample = true;
          fstates1 = false;
        "
      >
        <u--input
          ref="inputs"
          class="yangshixiugai"
          :focus="fstates"
          v-model="model1.userInfo.sampleName"
          :disabled="!fstates1"
          disabledColor="#ffffff"
          placeholder="请选择实验/样品名称"
          border="none"
        ></u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
      <u-form-item
        label="数量"
        labelWidth="auto"
        prop="userInfo.quantity"
        borderBottom
        ref="item1"
        class="required"
      >
        <u--input
          placeholder="请输入数量"
          border="surround"
          clearable
          v-model="model1.userInfo.quantity"
        >
        </u--input>
        <!-- <u-icon slot="right" name="arrow-right"></u-icon> -->
      </u-form-item>
      <u-form-item
        label="单位"
        labelWidth="auto"
        prop="userInfo.unit"
        borderBottom
        ref="item1"
        class="required"
      >
        <u--input
          placeholder="请输入单位"
          border="surround"
          clearable
          v-model="model1.userInfo.unit"
        >
        </u--input>
        <!-- <u-icon slot="right" name="arrow-right"></u-icon> -->
      </u-form-item>
      <u-form-item
        label="预估结束时间"
        labelWidth="auto"
        prop="userInfo.presetTime"
        borderBottom
        @click="opentime"
        ref="item1"
      >
        <u--input
          class="yangshixiugai"
          v-model="model1.userInfo.presetTime"
          disabled
          disabledColor="#ffffff"
          placeholder="请选择时间"
          border="none"
        >
        </u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
      <u-form-item
        label="支撑服务类型"
        labelWidth="auto"
        prop="userInfo.serviceCategory"
        borderBottom
        ref="item1"
        class="required"
        @click="showstype = true"
      >
        <u--input
          class="yangshixiugai"
          v-model="model1.userInfo.serviceCategory"
          disabled
          disabledColor="#ffffff"
          placeholder="请选择支撑服务类型"
          border="none"
        >
        </u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
      <!-- <u-form-item
        label="项目名称"
        labelWidth="auto"
        prop="userInfo.project"
        borderBottom
        ref="item1"
        class="required"
        @click="project"
      >
        <u--input
          class="yangshixiugai"
          v-model="model1.userInfo.project.name"
          disabled
          disabledColor="#ffffff"
          placeholder="请选择项目名称"
          border="none"
        ></u--input>
        <u-icon slot="right" name="arrow-right"></u-icon>
      </u-form-item>
      <u-form-item
        label="项目代码"
        labelWidth="auto"
        prop="userInfo.type"
        borderBottom
        ref="item1"
        class="required"
      >
        <u--input
          class="yangshixiugai"
          v-model="model1.userInfo.project.code"
          disabled
          disabledColor="#ffffff"
          placeholder="请选择项目代码"
          border="none"
        ></u--input>
      </u-form-item> -->
      <!-- <u-form-item
        label="项目负责人"
        labelWidth="auto"
        prop="userInfo.type"
        borderBottom
        ref="item1"
        class="required"
      >
        <u--input
          class="yangshixiugai"
          v-model="model1.userInfo.project.chargE_NAME"
          disabled
          disabledColor="#ffffff"
          placeholder="请选择支撑服务类型"
          border="none"
        ></u--input>
      </u-form-item> -->
    </u--form>
    <view>
      <view v-for="(item, i) in clients2" :key="i" class="wtr">
        <p class="addwt addwt1">
          项目信息
          <u-icon
            name="close-circle"
            color="#2979ff"
            size="28"
            v-if="i != 0"
            @click="splies2(i)"
            style="margin-top: 3px; margin-left: 5px"
          ></u-icon>
        </p>
        <view @click="project(i)" class="urtt">
          <label for="">项目名称</label>
          <u--textarea
            autoHeight
            v-model="item.name"
            disabledColor="#ffffff"
            disabled
            placeholder="请输入项目名称"
            border="none"
          ></u--textarea>
        </view>
        <div @click="project(i)" v-if="item.name1" style="position: relative; height: 28rpx">
          <p
            style="
              font-size: 12px;
              line-height: 12px;
              margin-left: auto;
              color: #f56c6c;
              position: absolute;
              right: 0px;
            "
          >
            请输入项目名称
          </p>
        </div>

        <view class="urtt"
           @click="project(i)"
          ><label for="">项目代码</label>
          <u--input
       
          :disabled="true"
            v-model="item.code"
            disabledColor="#ffffff"
            placeholder="请输入项目代码"
            border="none"
          ></u--input>
        </view>
        <div v-if="item.code1" style="position: relative; height: 28rpx">
          <p
            style="
              font-size: 12px;
              line-height: 12px;
              margin-left: auto;
              color: #f56c6c;
              position: absolute;
              right: 0px;
            "
          >
            请输入项目代码
          </p>
        </div>
        <view class="urtt"
         @click="project(i)"
          ><label for="">负责人</label>
          <u--input
            v-model="item.chargE_NAME"
            :disabled="true"
            disabledColor="#ffffff"
            placeholder="请输入负责人"
            border="none"
          ></u--input>
        </view>
        <div v-if="item.chargE_NAME1" style="position: relative; height: 28rpx">
          <p
            style="
              font-size: 12px;
              line-height: 12px;
              margin-left: auto;
              color: #f56c6c;
              position: absolute;
              right: 0px;
            "
          >
            请输入负责人
          </p>
        </div>
      </view>
      <p class="addwt" @click="addpush2" style="padding-left: 18rpx">
        <view class="addclass">
          <u-icon
            name="plus"
            color="#303133"
            size="24"
            style="display: inline-block"
          ></u-icon
          ><span>添加</span>
        </view>
      </p>
    </view>
    <view v-if="model1.userInfo.serviceCategory">
      <view v-for="(item, i) in clients" :key="i" class="wtr">
        <p class="addwt addwt1">
          委托人信息
          <u-icon
            name="close-circle"
            color="#2979ff"
            size="28"
            v-if="i != 0"
            @click="splies(i)"
            style="margin-top: 3px; margin-left: 5px"
          ></u-icon>
        </p>
        <view @click="openurl(i)" class="urtt">
          <label for="">姓名</label>
          <u--input
            v-model="item.userName"
            :disabled="model1.userInfo.serviceCategory != '为外部提供支撑服务'"
            disabledColor="#ffffff"
            placeholder="请输入姓名"
            border="none"
          ></u--input>
        </view>
        <div v-if="item.userName1" style="position: relative; height: 28rpx">
          <p
            style="
              font-size: 12px;
              line-height: 12px;
              margin-left: auto;
              color: #f56c6c;
              position: absolute;
              right: 0px;
            "
          >
            请输入姓名
          </p>
        </div>

        <view class="urtt"
        click="openurl(i)"
          ><label for="">{{
            model1.userInfo.serviceCategory != "为外部提供支撑服务"
              ? "部门"
              : "单位"
          }}</label>
          <u--input
            v-model="item.department"
            :disabled="model1.userInfo.serviceCategory != '为外部提供支撑服务'"
            disabledColor="#ffffff"
            :placeholder="
              model1.userInfo.serviceCategory != '为外部提供支撑服务'
                ? '请输入部门'
                : '请输入单位'
            "
            border="none"
          ></u--input>
        </view>
        <div v-if="item.department1" style="position: relative; height: 28rpx">
          <p
            style="
              font-size: 12px;
              line-height: 12px;
              margin-left: auto;
              color: #f56c6c;
              position: absolute;
              right: 0px;
            "
          >
            请输入部门
          </p>
        </div>
        <view class="urtt"
        click="openurl(i)"
          ><label for="">电话</label>
          <u--input
            v-model="item.phone"
            :disabled="model1.userInfo.serviceCategory != '为外部提供支撑服务'"
            disabledColor="#ffffff"
            placeholder="请输入电话"
            border="none"
          ></u--input>
        </view>
        <div v-if="item.phone1" style="position: relative; height: 28rpx">
          <p
            style="
              font-size: 12px;
              line-height: 12px;
              margin-left: auto;
              color: #f56c6c;
              position: absolute;
              right: 0px;
            "
          >
            请输入电话
          </p>
        </div>
      </view>
      <p class="addwt" @click="addpush" style="padding-left: 18rpx">
        <view class="addclass">
          <u-icon
            name="plus"
            color="#303133"
            size="24"
            style="display: inline-block"
          ></u-icon
          ><span>添加</span>
        </view>
      </p>
    </view>
    <u-action-sheet
      :show="showsample"
      :actions="list"
      @close="showsample = false"
      @select="sample"
    >
    </u-action-sheet>
    <u-action-sheet
      :show="showstype"
      :actions="list1"
      @close="showstypes"
      @select="sample1"
    >
    </u-action-sheet>
    <view class="button1" v-show="fnd">
      <u-button
        type="primary"
        text="确认"
        class="primarys"
        @click="ok"
      ></u-button>
    </view>
  </view>
</template>
<script>
document.getElementsByTagName("title")[0].innerText = "科研仪器设备使用登记表";
export default {
  components: {},
  data() {
    return {
      fnd: true,
      clients: [{}],
      clients2: [{}],
      showsample: false,
      showstype: false,
      fstates: false,
      fstates1: false,
      list: [
        { name: "测试" },
        { name: "加工" },
        { name: "计算" },
        { name: "分析" },
        { name: "自定义" },
      ],
      list1: [
        { name: "支撑本研究中心科研项目" },
        { name: "支撑其他科研中心科研项目" },
        { name: "为外部提供支撑服务" },
      ],
      model1: {
        userInfo: {
          status: "完好",
          sampleName: "测试",
          quantity: "",
          serviceCategory: "",
          remarks: "",
          presetTime: "",
          project: {},
          unit: "",
        },
      },
      rules: {
        "userInfo.status": {
          type: "string",
          min: 1,
          required: true,
          message: "请输入设备当前状态",
          trigger: ["blur", "change"],
        },
        "userInfo.unit": {
          type: "string",
          min: 1,
          required: true,
          message: "请输入单位",
          trigger: ["blur", "change"],
        },
        "userInfo.quantity": {
          type: "number",
          min: 1,
          required: true,
          message: "请输入样品数量",
          trigger: ["blur", "change"],
        },
        "userInfo.presetTime": {
          type: "string",
          min: 1,
          required: true,
          message: "请选择结束时间",
          trigger: ["blur", "change"],
        },
        "userInfo.serviceCategory": {
          type: "string",
          min: 1,
          required: true,
          message: "请选择支撑服务类型",
          trigger: ["blur", "change"],
        },
        "userInfo.project.name": {
          type: "string",
          min: 1,
          required: true,
          message: "请选择项目名称",
          trigger: ["blur", "change"],
        },
      },

      //   iconType:  ["success", "success_no_circle", "info", "warn", "waiting", "cancel", "download", "search", "clear"]
    };
  },
  onLoad: function (o) {
    document.getElementsByTagName("title")[0].innerText =
      "科研仪器设备使用登记表";
    debugger;
    if (o.storage == 1) {
      this.clients = uni.getStorageSync("clients");
      this.clients2 = uni.getStorageSync("clients2");
      this.model1.userInfo = uni.getStorageSync("userInfo");
    } else if (JSON.stringify(o) != "{}") {
      this.clients = uni.getStorageSync("clients");
      this.model1.userInfo = o;
    }

    if (o.i != undefined || o.i != null) {
      let userInfo = uni.getStorageSync("userInfo");
      this.clients = uni.getStorageSync("clients");
      this.clients[o.i] = JSON.parse(JSON.stringify(userInfo.project1));
      this.clients2 = uni.getStorageSync("clients2");
    }
    if (o.j != undefined || o.j != null) {
      let userInfo = uni.getStorageSync("userInfo");
      this.clients = uni.getStorageSync("clients");
      this.clients2 = uni.getStorageSync("clients2");
      this.clients2[o.j] = JSON.parse(JSON.stringify(userInfo.project));
    }
    if (JSON.stringify(o) == "{}") {
      this.getInfo();
    }
  },
  mounted() {
    document.getElementsByTagName("title")[0].innerText =
      "科研仪器设备使用登记表";
    const originalHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    let _this = this;
    // window.onresize= () => {
    //   const resizeHeight =
    //     document.documentElement.clientHeight || document.body.clientHeight;
    //   // 当前屏幕高度 < 原始屏幕高度，隐藏按钮
    //   if (resizeHeight < originalHeight) {
    //     _this.fnd = false;
    //   } else {
    //     _this.fnd = true;
    //   }
    // };
    document.body.addEventListener("focusin", () => {
      //软键盘弹出的事件处理
      _this.fnd = false;
    });
    document.body.addEventListener("focusout", () => {
      _this.fnd = true;
    });
    // let {currentUser}=this.$store.state.vuex_user
    // if(this.clients.length==0){
    //   this.clients.push({userName:currentUser.name,phone:currentUser.phoneNumber})
    // }
  },

  methods: {
    getInfo() {
      this.$res
        .get(this.https + "/api/Facility/Register/GetLatestRegisterInfo", "", {
          "content-type": "application/json",
        })
        .then((s) => {
          document.getElementsByTagName("title")[0].innerText =
            "科研仪器设备使用登记表";
          let r = s.data;
          if (r) {
            let serviceCategory = "";
            if (r.serviceCategory == 0) {
              serviceCategory = "支撑本研究中心科研项目";
            } else if (r.serviceCategory == 1) {
              serviceCategory = "支撑其他科研中心科研项目";
            } else if (r.serviceCategory == 2) {
              serviceCategory = "为外部提供支撑服务";
            }
            this.model1 = {
              userInfo: {
                status: r.status,
                sampleName: r.sampleName,
                quantity: r.quantity,
                serviceCategory: serviceCategory,
                remarks: r.serviceCategory,
                presetTime: "",
                unit: r.unit,
                project: {},
              },
            };
            this.clients = r.detailList.map((d) => {
              return {
                userName: d.userName,
                jobNumber: d.company,
                phone: d.phone,
                department: d.department,
              };
            });
            this.clients2 = r.items.map((d) => {
              return {
                chargE_NAME: d.dutyUser,
                name: d.itemName,
                code: d.itemCode,
              };
            });
          }
        });
    },
    addpush2() {
      this.clients2.push({});
    },
    showstypes() {
      this.showstype = false;
      if (this.model1.userInfo.serviceCategory != "为外部提供支撑服务") {
        let clients = [];
        for (let i = 0; i < this.clients.length; i++) {
          if (this.clients[i].jobNumber) {
            clients.push(this.clients[i]);
          }
        }

        this.clients = clients.length > 0 ? clients : [{}];
      } else {
        let clients = [];
        for (let i = 0; i < this.clients.length; i++) {
          if (!this.clients[i].jobNumber) {
            clients.push(this.clients[i]);
          }
        }
        this.clients = clients.length > 0 ? clients : [{}];
      }
    },
    openurl(i) {
      if (this.model1.userInfo.serviceCategory != "为外部提供支撑服务") {
        uni.setStorageSync("userInfo", this.model1.userInfo);
        uni.setStorageSync("clients2", this.clients2);
        uni.setStorageSync("clients", this.clients);
        uni.navigateTo({
          url: `/pages/tabBar/shepun/newopen/project1?storage=1&i=${i}`,
        });
      }
    },
    splies(i) {
      this.clients.splice(i, 1);
    },
    splies2(i) {
      this.clients2.splice(i, 1);
    },
    addpush() {
      this.clients.push({});
    },
    sample1(e) {
      this.model1.userInfo.serviceCategory = e.name;
    },
    sample(e) {
      if (e.name == "自定义") {
        this.model1.userInfo.sampleName = null;
        this.fstates1 = true;
        this.$nextTick(() => {
          this.fstates = true;
        });
      } else {
        this.model1.userInfo.sampleName = e.name;
        this.fstates1 = false;
        this.$nextTick(() => {
          this.fstates = false;
        });
      }
    },
    changeParam(param) {
      return JSON.stringify(param)
        .replace(/:/g, "=")
        .replace(/,/g, "&")
        .replace(/{/g, "?")
        .replace(/}/g, "")
        .replace(/"/g, "");
    },
    project(i) {
      uni.setStorageSync("userInfo", this.model1.userInfo);
      uni.setStorageSync("clients2", this.clients2);
      uni.setStorageSync("clients", this.clients);
      uni.navigateTo({
        url: `/pages/tabBar/shepun/newopen/project?storage=1&j=${i}`,
      });
    },
    opentime() {
      uni.setStorageSync("userInfo", this.model1.userInfo);
      uni.setStorageSync("clients2", this.clients2);
      uni.setStorageSync("clients", this.clients);
      uni.navigateTo({
        url: `/pages/tabBar/shepun/time?storage=1`,
      });
    },
    ok() {
      this.$refs.form1
        .validate()
        .then((res) => {
          let i = 0;
          this.clients.forEach((e) => {
            if (e.userName) {
              e.userName1 = false;
            } else {
              e.userName1 = true;
              i = 1;
            }
            if (e.department) {
              e.department1 = false;
            } else {
              e.department1 = true;
              i = 1;
            }
            if (e.phone) {
              e.phone1 = false;
            } else {
              e.phone1 = true;
              i = 1;
            }
          });
          if (i == 1) {
            this.clients = JSON.parse(JSON.stringify(this.clients));
            return;
          }
          let list = JSON.parse(JSON.stringify(uni.getStorageSync("list")));
          let project = {
            DutyUser: this.model1.userInfo.project.chargE_NAME,
            ItemCode: this.model1.userInfo.project.code,
            ItemName: this.model1.userInfo.project.name,
          };
          for (let i = 0; i < list.length; i++) {
            list[i] = {
              ...list[i],
              ...this.model1.userInfo.project1,
              ...project,
              ...this.model1.userInfo,
            };

            delete list[i].project1;
            delete list[i].project;
            // if (list[i].sampleName == "测试") {
            //   list[i].sampleName = 0;
            // }
            // if (list[i].sampleName == "加工") {
            //   list[i].sampleName = 1;
            // }
            // if (list[i].sampleName == "计算") {
            //   list[i].sampleName = 2;
            // }
            // if (list[i].sampleName == "分析") {
            //   list[i].sampleName = 3;
            // }
            if (list[i].serviceCategory == "支撑本研究中心科研项目") {
              list[i].serviceCategory = 0;
            }
            if (list[i].serviceCategory == "支撑其他科研中心科研项目") {
              list[i].serviceCategory = 1;
            }
            if (list[i].serviceCategory == "为外部提供支撑服务") {
              list[i].serviceCategory = 2;
            }
            list[i].presetTime = list[i].presetTime + ":00";
          }
          let clients = this.clients.map((e) => {
            return {
              userName: e.userName,
              company: e.jobNumber,
              phone: e.phone,
              department: e.department,
            };
          });
          let clients2 = this.clients2.map((e) => {
            return {
              dutyUser: e.chargE_NAME,
              itemName: e.name,
              itemCode: e.code,
            };
          });
          let data = {
            registerDto: list,
            detailList: clients,
            items: clients2,
          };
          this.$res
            .post(this.https + "/api/Facility/Register/CreateRegister", data, {
              "content-type": "application/json",
            })
            .then((r) => {
              uni.setStorageSync("success", list);
              uni.navigateTo({
                url: `/pages/tabBar/xiaoxi/success`,
              });
            });
        })
        .catch((errors) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .u-form-item__body__right__message{
  top: 20px;
  margin-left: 232rpx !important;
}
.wtr {
  background: #fff;
  margin-top: 10rpx;
  padding-top: 10rpx;
  padding-left: 22rpx;
}
.addclass {
  width: 140rpx;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  text-align: center;

  span {
    font-size: 12px !important;
    color: #303133;
  }
}
::v-deep .uni-textarea-textarea {
  color: #303133 !important;
}
::v-deep.u-textarea--disabled {
  background: #fff !important;
  padding-left: 0px !important;
  color: #303133 !important;
}
.urtt {
  uni-label {
    color: #303133;
    font-size: 14px;
    width: 225rpx !important;
  }
}

.yangshixiugai {
  padding-left: 16rpx !important;
}

::v-deep .u-line {
  border: 0px !important;
  border-bottom: 0.1px solid #eaeaea !important;
}

.urtt {
  padding: 0px 16rpx;
  // height: 80rpx;
  line-height: 80rpx;
}

.addwt1 {
  &::before {
    content: "*";
    color: red;
  }
}

.addwt {
  display: flex;
  margin-top: 20rpx;
  color: #303133;
  font-size: 15px;

  ::v-deep .uni-label-pointer {
    color: #303133;
    font-size: 15px;
  }

  span {
    font-size: 15px;
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
  color: #303133;
}

.button1 {
  // padding: 40rpx;
  //   margin-top: 44rpx;
  position: fixed;
  bottom: 0px;
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
  padding: 0px 0px;
  padding-bottom: 120rpx;
}
::v-deep.u-textarea--disabled {
  background: #fff !important;
}
</style>
