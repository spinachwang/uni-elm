<template>
	<view class="wapper">
    
    <view class="content">
      <view class="search">
        <view class="city">
           <text>{{city}}</text>
           <text class="elm">&#xe74e;</text>
        </view>
         <input type="text" value="" placeholder="小区/写字楼/学校等" confirm-type="done" placeholder-class="placeholder" />
      </view>
      
      <view class="address-title">
        <text>当前地址</text>
      </view>
      <view class="current-address">
        <text>{{poiName}}</text>
        <view class="reset-address" @click="getCurrentLocation">
          <text class="elm">&#xe61c;</text>
          <text>重新定位</text>
        </view>
      </view>
      
      <view class="address-title">
        <text>{{addressTitle}}</text>
      </view>
      <view v-if="!isAddAddress">
        <view class="address-item" v-for="address in addressList" :key="address.id" @click="selectAddress(address)">
          <text class="address">{{address.address}}</text>
          <view class="contact">
            <text class="name">{{address.name + (address.sex? '(' + address.sex + ')': '')}}</text>
            <text class="phone">{{address.phone}}</text>
          </view>
        </view>
      </view>
      
      <view v-else>
        <view class="address-item" v-for="poi in pois" :key="poi.id" @click="addAddress(poi)">
          <text>{{poi.address}}</text>
        </view>
      </view>
      
    </view>
    
 
    <view class="add-address" @click="addAddress" v-if="!isAddAddress">
      <view class="">
        <text class="elm">&#xe612;</text>
        <text>添加地址</text>
      </view>
    </view>
	</view>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
	export default {
		data() {
			return {
				city: '未定位',
        poiName: '未定位',
        type: '',
        pois: []
			};
		},
    onLoad({type}) {
      this.type = type;
      if (this.type === 'addAddress') {
        //call near by address
        
      }
    },
    mounted() {
      this.getCurrentLocation();
    },
    computed: {
      ...mapState(['currentLocation', 'addressList', 'addAddressFormValue']),
      isAddAddress() {
        return this.type === 'addAddress';
      },
      addressTitle() {
        return this.type === 'addAddress' ? '附近地址': '收货地址';
      },
    },
    methods: {
      ...mapActions(['getCurrentLocation', 'setAddAddressFormValue', 'setCurrentAddress']),
      addAddress(poi) {
        let url = '/pages/addAddress/addAddress';
        if (this.isAddAddress && poi) {
          const longitude = poi.location.substring(0, poi.location.indexOf(','));
          const latitude = poi.location.substring(poi.location.indexOf(',') + 1);
          this.setAddAddressFormValue({
            ...this.addAddressFormValue,
            address: poi.address,
            latitude,
            longitude,
          })
          uni.navigateBack();
        } else {
          uni.navigateTo({
            url
          });
        }
        
      },
      selectAddress(item) {
        this.setCurrentAddress(item);
        uni.switchTab({
          url: '/pages/home/home'
        });
      }
    },
    watch: {
      currentLocation() {
        this.city = this.currentLocation.regeocodeData.addressComponent.city;
        this.poiName = this.currentLocation.regeocodeData.addressComponent.township;
        this.pois = this.currentLocation.regeocodeData.pois;
      },
    }
	}
</script>

<style scoped lang="scss">

  .city {
    width: 60px;
  }
  .search {
    display: flex;
    padding: 5px 10px;
    background-color: #409EFF;
    color: #fff;
    .elm {
      color: #fff;
    }
    input {
      color: #808080;
      width: calc(100% - 60px - 20%);
      background-color: #fff;
      padding-left: 20%;
    }
  }
  
  .address-title {
    background-color: #f4f4f5;
    padding: 5px 10px 5px 10px;
  }
  .current-address {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    color: #409EFF;
  }
  
 
  .address-item {
    padding: 5px 10px 5px 10px;
    border-bottom: 1px solid #f4f4f5;
    .address {
      color: #000;
    }
    .phone {
      margin-left: 10px;
      color: #808080;
    }
    .name {
      color: #808080;
    }
  }

  
 .add-address {
   display: flex;
   align-items: center;
   justify-content: space-around;
   height: 50px;
   border-top: 1px solid #f4f4f5;
   color: #409EFF;
   background-color: #fff;
   
   // /* #ifndef APP-PLUS-NVUE */
   // position: -webkit-sticky;
   // /* #endif */
   // position: sticky;
   // bottom: calc(var(--window-bottom));
   // z-index: 99;
   position: fixed;
   bottom: 0;
   width: 100%;
 }
  
</style>
