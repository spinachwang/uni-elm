import Vue from 'vue'
import Vuex from 'vuex'
import amap from '../common/amap-wx.js'


const amapPlugin = new amap.AMapWX({  
  key: '4b23934bf4b6e2129d2af7d745392d39', //高德地图key
}); 

Vue.use(Vuex)

const ADD_ADDRESS_FORM_VALUE = 'ADD_ADDRESS_FORM_VALUE';

const ADD_ADDRESS_LIST = 'ADD_ADDRESS_LIST';
const CURRENT_ADDRESS = 'CURRENT_ADDRESS';
const LON_LAT = 'LON_LAT';
const CURRENT_LOCATION = 'CURRENT_LOCATION';

const ADDRESS_LIST = 'ADDRESS_LIST';


const RESTAURANTS_URL = 'https://elm.cangdu.org/shopping/restaurants';
const RESTAURANTS = 'RESTAURANTS';

// https://elm.cangdu.org/v4/restaurants?geohash=31.22967,121.4762&keyword=肯德基
const SEARCH_RESTAURANTS_URL = 'https://elm.cangdu.org/v4/restaurants';
const SEARCH_RESTAURANTS = 'SEARCH_RESTAURANTS';

const FOOD_GROUP_URL = 'https://elm.cangdu.org/v2/index_entry';
const FOOD_GROUP = 'FOOD_GROUP';

const state = {
  currentAddress: {},
  currentLocation: {},
  addressList: [],
  restaurants: [],
  restaurantsResult: [],
  foodGroup: [],
  lonLat: {},
  addAddressFormValue: {},
};

const mutations = {
  [ADD_ADDRESS_LIST] (state, data) {
    state.addressList.push({...data, id: state.addressList.length + 1});
  },
  [ADDRESS_LIST] (state, data) {
    state.addressList = data;
  },
  [CURRENT_ADDRESS](state, data) {
    state.currentAddress = data;
  },
  [CURRENT_LOCATION](state, data) {
    state.currentLocation = data;
  },
  [LON_LAT] (state, data) {
    state.lonLat = data;
  },
  [RESTAURANTS] (state, data) {
    state.restaurants = data;
  },
  [SEARCH_RESTAURANTS] (state, data) {
    state.restaurantsResult = data;
  },
  [FOOD_GROUP] (state, data) {
    state.foodGroup = data;
  },
  [ADD_ADDRESS_FORM_VALUE] (state, data) {
    state.addAddressFormValue = data;
  }
};

const actions = {
  setAddAddressFormValue({commit}, data) {
    commit(ADD_ADDRESS_FORM_VALUE, data);
  },
  addAddress({commit}, data) {
    //will call end service and get response id
    commit(ADD_ADDRESS_LIST, data);
  },
  getAddressList({commit}, data) {
    const list = [
      {
        id: 1,
        name: 'bob',
        sex: '先生',
        phone: '116453333',
        address: '浙江省杭州市xx区xx镇xx路110号',
        desc: 'bbbb',
        often: 'cccc',
        latitude: '30',
        longitude: '100'
      }, {
        id: 2,
        name: 'hebe',
        sex: '女士',
        phone: '116453333',
        address: '河南省xx市xx区xx镇xx路110号',
        desc: 'bbbb',
        often: 'cccc',
        latitude: '30',
        longitude: '100'
      }, {
        id: 3,
        name: 'mike',
        sex: '',
        phone: '132569874',
        address: '安徽省xx市xx区xx镇xx路110号',
        desc: 'bbbb',
        often: 'cccc',
        latitude: '30',
        longitude: '100'
      },
    ];
    commit(ADDRESS_LIST, list);
    commit(CURRENT_ADDRESS, list[0]);
  },
  getCurrentLocation({commit}) {
    amapPlugin.getRegeo({
      success: (location) => {
         commit(CURRENT_LOCATION, location[0]);
         commit(LON_LAT, {
           latitude: location[0].latitude,
           longitude: location[0].longitude,
         });
      },
      fail: (err) => {
        console.error(err);
      }
    })
  },
  setCurrentAddress({commit}, data) {
    commit(CURRENT_ADDRESS, data);
  },
  getRestaurants({commit}, address) {
    uni.request({
      url: RESTAURANTS_URL,
      data: {
        latitude: address.latitude,
        longitude: address.longitude
      },
      success: (shopSummary) => {
        commit(RESTAURANTS, shopSummary.data);
      }
    });
  },
  searchRestaurants({commit}, payload) {
    const {address, keyword} = payload;
    const geohash = address.latitude + ',' + address.longitude;
    uni.request({
      url: SEARCH_RESTAURANTS_URL,
      data: {
        geohash,
        keyword,
      },
      success: (shopSummary) => {
        commit(SEARCH_RESTAURANTS, shopSummary.data);
      }
    });
  },
  getFoodGroup({commit}) {
    uni.request({
      url: FOOD_GROUP_URL,
      success: (foodGroups) => {
        const length = foodGroups.data.length;
        const count = Math.ceil(length / 10);
        let temp = [];
        for(let i = 0; i < count; i++) {
          temp.push(foodGroups.data.slice(i * 10, (i + 1) * 10));
        }
        commit(FOOD_GROUP, temp);
      }
    });
  },
  
};


export default new Vuex.Store({
  state,
  mutations,
  actions
})