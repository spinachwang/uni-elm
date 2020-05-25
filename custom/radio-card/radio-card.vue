<template>
  <view class="radio-card" :class="extraClass">
    <text v-for="(item, index) in list" :key="index" @click="onListItemClick(index)" :class="listState[index]">
      {{item}}
    </text>
  </view>
</template>

<script>
  export default {
    props: {
      list: Array,
      name: String,
      extraClass: String,
    },
    data() {
      return {
        listState: this.list.map(item => ''),
      };
    },
    methods: {
      onListItemClick(index) {
        this.$emit('onFormChange', this.name, this.list[index]);
        this.listState = this.listState.map((item, i) => {
          if (i === index) {
            return 'selected-tag';
          } else {
            return '';
          }
        });
      }
    }
  }
</script>

<style scope lang="scss">
  .radio-card {
    display: flex;
    text {
      padding: 5px 15px 5px 15px;
      border: 1px solid #ccc;
      margin-right: 10px;
    }
  }
  
  .selected-tag {
    color: #409EFF;
  }
</style>