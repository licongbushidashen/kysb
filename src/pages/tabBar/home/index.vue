<template>
  <view class="scrolls">
    <view class="item">
      <view class="item1">
        <text>设备被占用</text>
      </view>
      <text class="text0">您当前扫描的设备被占用，建议您先联系确认后，勾选设备终止使用</text>
    </view>
    <u-list>
      <u-list-item v-for="(item, index) in list" :key="index">
        <view class="list" :class="item.active ? 'active' : '111'" @click="actives(index)">
          <view>
            <image :src="item.img" mode="" style="width: 64px; height: 65px"></image>
          </view>
          <view class="tips">
            <div>
              <!-- <text>{{ item.name }}</text> -->
              <text>
                {{ item.brand }}</text>
            </div>
            <div style="margin: 10rpx 0px" @click.stop="show=true">
              <label for="">当前占用人:</label>
              <text>{{ item.name }}</text>
            </div>
            <div style="margin: 10rpx 0px">
              <label for="">预计下机时间:</label>
              <text>{{ item.name }}</text>
            </div>

          </view>
        </view>
      </u-list-item>
    </u-list>
    <u-modal :show="show" title="个人信息"  @confirm="show=false">
      <div>
        <div style="margin: 10rpx 0px">
          <label for="" style="margin-right:10px;width: 110rpx;    display: inline-block;">姓名:</label>
          <text>{{ presetTime }}李小凤</text>
        </div>
        <div style="margin: 10rpx 0px">
          <label for="" style="margin-right:10px;width: 110rpx;    display: inline-block;">工号:</label>
          <text>{{ presetTime }}000814</text>
        </div>
        <div style="margin: 10rpx 0px">
          <label for="" style="margin-right:10px;width: 110rpx;    display: inline-block;">部门:</label>
          <text>{{presetTime }}test</text>
        </div>
        <div style="margin: 10rpx 0px">
          <label for="" style="margin-right:10px;width: 110rpx;    display: inline-block;">手机号:</label>
          <text>{{ presetTime }}000</text>
        </div>
      </div>
    </u-modal>
    <view class="button1">
      <u-button type="primary" text="终止使用" class="primarys" @click="ok"></u-button>
      <u-button text="取消"></u-button>
    </view>
  </view>
</template>
<script>
import hys from "../../../static/img/hys.png"
document.getElementsByTagName("title")[0].innerText = ""
export default {
  components: {},
  data() {
    return {
      show:false,
      presetTime:'',
      list: [
        { name: "火花", brand: "中国造", type: "001", size: "80*90", img: hys, active: false },
        { name: "火花", brand: "中国造", type: "001", size: "80*90", img: hys, active: false }
      ]
    }
  },
  onLoad() { },
  mounted() {
    this.dto()
  },
  methods: {
    xiaji() {
      uni.navigateTo({
        url: `/pages/tabBar/xiaoxi/stuts`
      })
    },

    dto() {
      let arr = uni.getStorageSync('sb')
      this.$res.post('/sb/api/Facility/Register/GetListByRegisterNo', arr, { "content-type": "application/json" }).then(r => {
        r.forEach(e => {
          if (e.serviceCategory == 0) {
            e.serviceCategoryName = '支撑本研究中心科研项目'
          }
          if (e.serviceCategory == 1) {
            e.serviceCategoryName = '支撑其他科研中心科研项目'
          }
          if (e.serviceCategory == 2) {
            e.serviceCategoryName = '为外部提供支撑服务'
          }
        });
        // this.list = r
      })
    },
    actives(index) {
      this.list[index].active = !this.list[index].active
      console.log(this.list)
    },
    sexSelect(e) { },

    ok() {

      let arr = uni.getStorageSync('sb')
      let data = {
        registerNos: arr
      }
      this.$res.post('/sb/api/Facility/Register/Offline', data, { "content-type": "application/json" }).then(r => {
        if (arr.length > 1) {
          uni.navigateTo({
            url: `/pages/tabBar/shepun/more`,
          })
        } else {
          uni.navigateTo({
            url: `/pages/tabBar/shepun/details`,
          })
        }

      })
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
  width: 12px;
  height: 12px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  background: #3c9cff;
  background: linear-gradient(135deg, transparent, transparent 50%, #3c9cff 50%, #3c9cff 100%);
}

.list.active::after {
  content: "";
  width: 12px;
  height: 12px;
  position: absolute;
  right: -1px;
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
    font-size: 14px;

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
