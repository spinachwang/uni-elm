<template>
  <view class="wapper">
    <view class="sticky-box search-wapper">
      <view class="search-icon">
        <text class="elm">&#xe62c;</text>
      </view>
      <input type="text" :value="searchValue" placeholder-class="search-placeholder" placeholder="搜索商家、商品名称"/>
    </view>
    
    <view>
      <view class="search" v-if="searchWord.length > 0">
        <view class="history-title">
          <text>历史搜索</text>
          <text class="elm clear-icon" @click="clearHistory">&#xe61d;</text>
        </view>
        
        <view class="search-word">
          <text v-for="item in searchWord" :key="item" @click="onSearch(item)">{{item}}</text>
        </view>
      </view>
      
      
      <view class="search">
        <text>热门搜索</text>
        <view class="hot-word">
          <text v-for="item in hotWord" :key="item" @click="onSearch(item)">{{item}}</text>
        </view>
      </view>
    </view>
    
    <!-- <view class="restaurants-summary-wapper" v-else>
      <view class="order">
        <text>综合排序</text>
        <text>距离最近</text>
        <text>销量最高</text>
        <text>筛选</text>
      </view>
      
      <restaurants-summary :restaurants="searchRestaurants"/>
    </view>
    
    <view class="nomore" v-if="searchValue !== ''">
      <text>没有更多</text>
    </view> -->
    
    
  </view>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import restaurantsSummary from '../../custom/restaurants-summary/restaurants-summary.vue';
  export default {
    components: {
      'restaurants-summary': restaurantsSummary,
    },
    data() {
      return {
        searchWord: [],
        hotWord: [],
        searchValue: '',
      }
    },
    mounted() {
      uni.getStorage({
          key: 'searchWord',
          success: (res) => {
            if (res.data !== '') {
              this.searchWord = res.data.split(',');
            }
          }
      });
      this.hotWord = ['一点点', '古茗', '汉堡王', '麦当劳', '星巴克', '喜茶', '奶茶', '麻辣烫', '麻辣香锅', '炸鸡'];
    },
    methods: {
      ...mapActions(['searchRestaurants']),
      onSearch(word) {
        if (!this.searchWord.includes(word)) {
           this.searchWord.push(word);
           uni.setStorage({
               key: 'searchWord',
               data: this.searchWord.join()
           });
        }
        this.searchValue = word;
        this.searchRestaurants({
          address: this.currentAddress,
          keyword: this.searchValue,
        });
      },
      clearHistory() {
        this.searchWord = [];
        uni.setStorage({
            key: 'searchWord',
            data: ''
        });
      }
    },
    computed: {
      ...mapState(['restaurantsResult', 'currentAddress']),
    }
  }
</script>

<style scoped lang="scss">
  
  .search-placeholder {
    color: #909399;
    font-size: 24rpx;
    .elm {
      font-size: 24rpx;
      color: #909399;
    };
  }
  
  .sticky-box {
  	/* #ifndef APP-PLUS-NVUE */
  	position: -webkit-sticky;
  	/* #endif */
  	position: sticky;
  	top: var(--window-top);
  	z-index: 99;;
  } 
  
  .search-wapper {
    background-color: #409EFF;
    padding: 5px 10px;
    display: flex;
    .search-icon {
      background-color: #fff;
      height: 25px;
      line-height: 25px;
      width: 20px;
      text-align: center;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
       .elm {
         font-size: 24rpx;
         color: #909399;
       };
    }
    input {
      flex: 1;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      height: 25px;
      line-height: 25px;
      color: #909399;
      background-color: #fff;
      font-size: 24rpx;
    }   
  }
  
  .search {
    padding: 10px;
  }
  .search-word, .hot-word {
    display: flex;
    flex-wrap: wrap;
    text {
      padding: 5px;
      margin-top: 10px;
      margin-right: 10px;
      border: 1px solid #f4f4f5;
    }
  }
  .history-title {
    display: flex;
    justify-content: space-between;
    .clear-icon {
      font-size: 34rpx;
    }
  }
  
  .restaurants-summary-wapper {
    padding: 5px;
    background-color: #FFFFFF;
    .order {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
    }
  }
  
  .nomore {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 5px;
    padding-bottom: 5px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  
  
</style>