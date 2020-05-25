<template>
  <view>
    <view class="shop-summary" v-for="(summary, index) in restaurants" :key="summary.id">
      <image src="https://fuss10.elemecdn.com/0/da/f42235e6929a5cb0e7013115ce78djpeg.jpeg"></image>
      <view class="summary-wapper">
         <view class="summary1">
           <text class="title">{{summary['name'] + "(" + summary['address'] + ")"}}</text>
           <text class="like">...</text>
         </view>
         <view class="summary2">
           <view>
             <text class="elm">&#xe676;</text>
             <text class="rating">{{summary['rating']}}</text>
             <text class="rating-count">月售{{summary['rating_count']}}</text>
           </view>
           <text class="delivery-mode">{{summary['delivery_mode'].text}}</text>
         </view>
         <view class="summary3">
           <view class="order-amount">
             <text>起送¥{{summary['float_minimum_order_amount']}}</text>
             <text class="free-label">免配送费</text>
             <text class="free-amount">¥{{summary['float_delivery_fee']}}</text>
           </view>
           <view>
             <text class="time">{{summary['order_lead_time']}}</text>
             <text class="distance">{{summary['distance']}}</text>
           </view>
         </view>
         <view class="summary4"> 
           <text v-for="support in summary['supports']" :key="support.id">{{support.name}}</text>
         </view>
      </view>
    </view>
  </view>
  
</template>

<script>
  export default {
    props: {
      restaurants: Array,
    },
  }
</script>

<style scoped lang="scss">


.shop-summary {
  display: flex;
  margin-bottom: 10px;
  image {
    width: 80px;
    height: 80px;
  }
  
  .summary-wapper {
    width: calc(100% - 80px);
    .summary1 {
      display: flex;
      justify-content: space-between;
      padding-bottom: 3px;
      .title {
        flex-basis: 85%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-weight: bold;
        font-size: 28rpx;
      }
      .like {
        color: #909399;
      }
    }
    .summary2 {
      font-size: 22rpx;
      display: flex;
      justify-content: space-between;
      .elm {
        font-size: 22rpx;
        color: red;
      }
      .rating {
        color: red;
      }
      .rating-count {
        color: #606266;
        margin-left: 10px;
      }
      .delivery-mode {
        color: white;
        background-color: #409EFF;
        padding-left: 5rpx;
        padding-right: 5rpx;
      }
    }
    .summary3 {
      font-size: 22rpx;
      display: flex;
      justify-content: space-between;
      color: #606266;
      .free-label {
        margin-left: 10px;
      }
      .free-amount {
        font-size: 20rpx;
        margin-left: 3px;
        color: #808080;
        text-decoration: line-through;
      }
      .time {
        margin-right: 3px;
      }
    }
    
    .summary4 {
      font-size: 22rpx;
      display: flex;
      color: red;
      text {
        margin-right: 5px;
        border: 1px solid red;
        padding-left: 3px;
        padding-right: 3px;
      }
    }
  }
}
</style>