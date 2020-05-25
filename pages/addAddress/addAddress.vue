<template>
  
  <view class="wapper">
    <view class="form">
    	<view class="form-item">
    	  <text>联系人</text>
        <input type="text" value="" placeholder="姓名" @input="onFormChange('name', $event.target.value)"/>
    	</view>
      <radio-card extraClass="radio-class item-top" :list="sexList" v-on:onFormChange="onFormChange" name="sex"></radio-card>
      <view class="form-item item-top">
        <text>电话</text>
        <input type="number" value="" placeholder="手机号码" @input="onFormChange('phone', $event.target.value)" maxlength="11"/>
      </view>
      <view class="form-item item-top">
        <text>地址</text>
        <input type="text" :value="formValue.address" :disabled="true" placeholder="选择收货地址" @click="selectAddress"/>
        <text class="elm">&#xe688;</text>
      </view>
      <view class="form-item item-top">
        <text>补充说明</text>
        <input type="text" value="" placeholder="详细地址(如门牌号等)" @input="onFormChange('desc', $event.target.value)"/>
      </view>
      <radio-card extraClass="radio-class item-top" :list="oftenList" v-on:onFormChange="onFormChange" name="often"></radio-card>
    </view>
    <view class="btn">
       <button type="primary" @click="onSubmit">确定</button>
    </view>
    <uni-popup ref="popup" type="center" :maskClick="false">
      <uni-popup-dialog type="info" before-close="true" :title="warning" :before-close="true" @confirm="confirm"></uni-popup-dialog>
    </uni-popup>
  </view>
	
  
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import radioCard from '../../custom/radio-card/radio-card.vue';
	export default {
    components: {
      'radio-card': radioCard,
    },
		data() {
			return {
        sexList: ['先生', '女士'],
        oftenList: ['家', '学校', '公司'],
        formValue: {
          name: '',
          sex: '',
          phone: '',
          address: '',
          desc: '',
          often: '',
          latitude: '',
          longitude: '',
        },
        warning: '',
			};
		},
    computed: {
      ...mapState(['addAddressFormValue']),
    },
    onShow() {
      this.formValue =  {
        ...this.formValue,
        ...this.addAddressFormValue
      };
    },
    onBackPress() {
      this.setAddAddressFormValue({});
    },
    methods: {
      ...mapActions(['addAddress', 'setAddAddressFormValue', 'setCurrentAddress']),
      onFormChange(name, value) {
        this.formValue[name] = value;
      },
      onSubmit() {
        if (!this.formValue['name']) {
          this.warning = '请填写联系人';
          this.$refs.popup.open();
          return;
        }
        if (!this.formValue['phone']) {
          this.warning = '请填写联系电话';
          this.$refs.popup.open();
          return;
        } else if (!/^1[3-8]\d{9}$/.test(this.formValue['phone'])) {
          this.warning = '请检查手机号码格式是否有误';
          this.$refs.popup.open();
          return;
        } 
        if (!this.formValue['address'] || !this.formValue['desc'] ) {
          this.warning = '请填写收货地址';
          this.$refs.popup.open();
          return;
        }
        this.addAddress(this.formValue);
        this.setAddAddressFormValue({});
        this.setCurrentAddress(this.formValue);
        uni.switchTab({
          url: '/pages/home/home'
        });
      },
      confirm() {
        this.$refs.popup.close();
      },
      selectAddress() {
        this.setAddAddressFormValue(this.formValue);
        uni.navigateTo({
            url: '/pages/selectAddress/selectAddress?type=addAddress'
        });
      }
    }
	}
</script>

<style lang="scss">
  page {
    height: 100%;
  }
  .wapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #f4f4f5;
  }
  .form {
    margin-top: 10px;
    background-color: #fff;
  }
  .form-item {
    padding: 10px;
    display: flex;
    text {
      width: 80px;
    }
    input {
      flex-grow: 1;
    }
    .elm {
      width: 20px;
      display: flex;
      align-items: center;
      color: grey;
    }
  }
  .radio-class {
    margin-left: 90px;
    padding: 10px 0 10px 0;
  }
  .btn {
    padding: 10px;
  }
  
  .item-top {
    border-top: 1px solid #f4f4f5;
  }
  .input-placeholder {
    font-size: 28rpx;
  }
  
</style>
