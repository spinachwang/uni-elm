<template>
	<view class="container" :scroll-y="true">
    <view class="address" @click="selectAddress">
      <text class="elm">&#xe611;</text>
      <text>{{address}}</text>
      <text class="elm">&#xe74e;</text>
    </view>
    
    <view class="sticky-box search-top" @click="searchShop">
       <view class="search">
         <view class="search-placeholder">
           <text class="elm">&#xe62c;</text>
           <text>搜索商家、商品名称</text>
         </view>
       </view>
    </view>
    
    <uni-swiper-dot :info="foodGroup" mode="default" :current="current" :dotsStyles="dotsStyles">
      <swiper @change="onChangeSwiper">
        <swiper-item v-for="(group, index) in foodGroup" :key="index" class="group">
          <view v-for="food in group" :key="food.id" class="group-item">
             <image :src="imgBaseUrl + food['image_url']"></image>
             <text>{{food['title']}}</text>
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    
    <view class="sticky-box tag-top">
      <text class="recommend-title">推荐商家</text>
      <view class="shop-type">
        <text>首单立减</text>
        <text>津贴优惠</text>
        <text>满减优惠</text>
        <text>下单返红包</text>
      </view>
    </view>
    
    <restaurants-summary :restaurants="restaurants"/>
    
    
	</view>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import amap from '../../common/amap-wx.js'
  import restaurantsSummary from '../../custom/restaurants-summary/restaurants-summary.vue';
  
	export default {
		data() {
			return {
        current: 0,
        shopSummary: [],
        dotsStyles: {
          bottom: 0,
          selectedBackgroundColor: '#f2f2f2'
        },// 微信不能cover实例变量,一定要data.
        imgBaseUrl: 'https://fuss10.elemecdn.com',
			}
		},
    components: {
      'restaurants-summary': restaurantsSummary,
    },
    mounted() {
      this.getFoodGroup();
      this.getAddressList();
    },
		methods: {
      ...mapActions(['getRestaurants', 'getFoodGroup', 'getAddressList']),
      onChangeSwiper(e) {
        this.current = e.detail.current;
      },
      selectAddress() {
        uni.navigateTo({
            url: '/pages/selectAddress/selectAddress?type=selectAddress'
        });
      },
      searchShop() {
        uni.navigateTo({
            url: '/pages/searchShop/searchShop'
        });
      }
		},
    computed: {
      ...mapState(['currentAddress', 'restaurants', 'foodGroup', 'lonLat', 'currentLocation']),
      address() {
        return this.currentAddress.address ? this.currentAddress.address : '未选择收货地址';
      }
    },
    watch: {
      currentAddress() {
        this.getRestaurants({
          latitude: this.currentAddress.latitude,
          longitude: this.currentAddress.longitude
        });
      }
    }
	}
</script>

<style scoped lang="scss">
	.container {
		padding: 10px;
    .elm {
      color: #409EFF;
    }
    .search {
      width: 100%;
      height: 25px;
      border-radius: 10px;
      background-color: #f4f4f5;
      text-align: center;
      .search-placeholder {
        line-height: 25px;
        color: #909399;
        font-size: 24rpx;
        .elm {
          font-size: 24rpx;
          color: #909399;
        }
      }
    }
    .group {
      display: flex;
      flex-wrap: wrap;
      font-size: 24rpx;
      .group-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-basis: 20%;
      }
      image {
        width: 50px;
        height: 50px;
      }
    }
    
    .recommend-title {
      color: #409EFF;
      font-size: 35rpx;
    }
    
    .shop-type {
      padding-top: 10px;
      height: 50rpx;
      display: flex;
      justify-content: space-between;
      text {
        line-height: 50rpx;
        flex-basis: 22%;
        font-size: 24rpx;
        width: 20px;
        background-color: #f4f4f5;
        text-align: center;
      }
    }
    
    
    
    .sticky-box {
    	/* #ifndef APP-PLUS-NVUE */
    	position: -webkit-sticky;
    	/* #endif */
    	position: sticky;
    	top: var(--window-top);
    	z-index: 99;;
    	
    	background-color: #fff;;
    } 
    .search-top {
      padding: 10px 0 10px 0;
      top: var(--window-top);
    }
    .tag-top {
      padding-bottom: 10px;
      top: calc(var(--window-top) + 45px);
    }
	}
</style>
