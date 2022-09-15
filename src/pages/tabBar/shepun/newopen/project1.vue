<template>
  <view class="scrolls">
    <view class="item">
      <u-search placeholder="请输入关键字" v-model="keyword" @change="ban" :showAction="false"></u-search>
    </view>
    <u-list @scrolltolower="scrolltolower">
      <u-list-item v-for="(item, index) in list" :key="index">
        <view class="list" @click="radioChange(index)">
          <view class="listnue">
            <div class="listnue-f">
              <!-- <u-radio-group v-model="item.active">
                  <u-radio v-model="item.active"> </u-radio>
                </u-radio-group> -->
              <radio :checked="item.active" />
            </div>
            <div class="listnue-r">
              <p>姓名： {{ item.xm }}({{ item.gh }})</p>
              <p>部门： {{ item.orgpathname }}</p>
              <p>电话： {{ item.tel }}</p>
            </div>
          </view>
        </view>
      </u-list-item>
    </u-list>
    <div class="buttons">
      <u-button text="取消" @click="goback"></u-button>
      <u-button text="确定" :type="kes.jobNumber ? 'primary' : 'info'" @click="ok"></u-button>
    </div>
  </view>
</template>
<script>
document.getElementsByTagName("title")[0].innerText = ""
import lodash from "lodash" //引入lodash
export default {
  components: {},
  data() {
    return {
      keyword: "",
      list: [
        { jobNumber: "000815", userName: "李小双", department: "部门", phone: '130000000000', active: false },
      ],
      skipCount: 0,
      maxResultCount: 15,
      kes: {},
      userInfo: {},
      index: 0
    }
  },
  onLoad: function (o) {
    this.index = o.i
  },
  mounted() {
    this.loadmore()
  },
  methods: {
    goback() {
      uni.navigateBack()
    },
    ok() {
      if (!this.kes.jobNumber) {
        return
      }
      let userInfo = uni.getStorageSync("userInfo")
      userInfo.project1 = this.kes
      uni.setStorageSync("userInfo", userInfo)
      console.log(userInfo)
      uni.navigateTo({
        url: `/pages/tabBar/shepun/register?storage=1&i=${this.index}`
      })
    },
    ban: lodash.throttle(function (id) {
      this.ban2(id) //触发第二个方法
    }, 1000),
    ban2(id) {
      this.list = []
      this.skipCount = 0
      this.maxResultCount = 15
      this.loadmore()
    },
    radioChange(e) {
      this.list.forEach((j, i) => {
        if (e == i) {
          j.active = !j.active
          if (j.active) {
            this.kes = j
          } else {
            this.kes = {}
          }
        } else {
          j.active = false
        }
      })
    },
    scrolltolower() {
      this.maxResultCount = this.maxResultCount + 15
      this.skipCount = this.skipCount + 15
      this.loadmore()
    },
    loadmore() {
      let data = {
        maxResultCount: this.maxResultCount,
        skipCount: this.skipCount,
        keyword: this.keyword
      }
      this.$res.post('/sb/api/Facility/Register/GetCardList', data, { "content-type": "application/json" }).then(r => {
        r.items.forEach(e => {
          e.active = false
        })
        this.list = [...this.list, ...r.items]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.buttons {
  position: absolute;
  bottom: 0px;
  display: flex;
  width: 100%;

  ::v-deep.u-button {
    flex: 1;
    border-radius: 0px;
    border-right: 0px;
  }
}

.listnue {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10rpx;

  .listnue-f {
    width: 40px;
    text-align: center;

    ::v-deep uni-radio .uni-radio-input {
      width: 14px;
      height: 14px;
    }
  }

  .listnue-r {
    flex: 1;
    font-size: 14px;
    padding-top: 10rpx;

    p {
      line-height: 50rpx;
    }
  }
}
</style>
