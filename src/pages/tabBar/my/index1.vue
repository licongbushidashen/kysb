<template>
  <view class="scrolls">
    <view class="item">
      <view class="item1">
        <text>设备使用详情</text>
      </view>
      <text class="text0">您当前正在使用以下设备，是否现在下机?</text>
    </view>
    <u-list>
      <u-list-item v-for="(item, index) in list" :key="index">
        <view class="list" :class="item.active ? 'active' : '111'" @click="actives(index)">
          <view>
            <image :src="item.url" mode="" style="width: 64px; height: 65px"></image>
          </view>
          <view class="tips">
            <div>
              <text>{{ item.registerName}}</text>
            </div>
            <div style="margin: 10rpx 0px">
              <label for="">预计下机时间:</label>
              <text>{{ item.presetTime |formatDate('yyyy-MM-dd hh:mm')}}</text>
            </div>
            <div style="margin: 10rpx 0px">
              <label for="">本次使用时长:</label>
               <text>{{ item.minutes |ChangeHourMinutestr}}</text>
            </div>
          </view>
        </view>
      </u-list-item>
    </u-list>
    <view class="button1">
      <u-button type="primary" text="继续使用" class="primarys" @click="appclose()"></u-button>
      <u-button text="延长机时" class="primarys" @click="ok"></u-button>
      <u-button  text="确认下机" class="primarys" @click="xiaji"></u-button>
    </view>
  </view>
</template>
<script>
        import i1 from "../../../static/icon/1.png"

document.getElementsByTagName("title")[0].innerText = "设备使用详情"
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
    document.getElementsByTagName("title")[0].innerText = "设备使用详情"
    this.dto()
  },
  methods: {
    xiaji() {
      let arr =[]
      this.list.map(e=>{
        if(e.active){
           arr.push(e.id)
        }
      })
       uni.setStorageSync('djsb',arr)
      uni.navigateTo({
        url: `/pages/tabBar/xiaoxi/stuts`
      })
    },

    dto() {
      let arr = uni.getStorageSync('sb')
      this.$res.post(this.https+'/api/Facility/Register/GetListByRegisterNo', arr, { "content-type": "application/json" }).then(r => {
        r.data.forEach(e => {
        e.url=i1
     
          e.active=true
        });
        this.list = r.data
      })
    },
    actives(index) {
      this.list[index].active = !this.list[index].active
    },
    sexSelect(e) { },

    ok() {
      let arr=[]
      this.list.map(e=>{
        if(e.active){
           arr.push(e.id)
        }
      })
       uni.setStorageSync('djsb',arr)
      uni.navigateTo({
            url: `/pages/tabBar/xiaoxi/time`
          })
    }
  }
}
</script>
<style lang="scss" scoped>
.tips{
label{
  color: #000 !important;
  width: 60rpx !important;
}
text{
  color: #000 !important;
  flex:1 !important
}
}
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
  margin-bottom: 20rpx;
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
  margin-bottom: 20rpx;
}

.item1 {
  margin: 10rpx 0px;
  padding-top: 60rpx;
}

.scrolls {
  padding: 0px 60rpx;
}
</style>
  