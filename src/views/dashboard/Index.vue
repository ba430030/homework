<template>
  <div>
    <dashCard :dataList="cardList" />
  </div>
</template>

<script>
import dashCard from './components/Card.vue'
export default {
  components: {
    dashCard
  },
  data() {
    return {
      cardList: [
        { id: 1, icon: 'icon-wenjian', title: '总订单', num: '102,400' },
        { id: 2, icon: 'icon-Dollar', title: '总销售额', num: '102,400' },
        { id: 3, icon: 'icon-icon-', title: '今日订单数', num: '102,400' },
        { id: 4, icon: 'icon-renminbi', title: '今日销售额', num: '102,400' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
</style>
