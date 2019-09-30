<template>
  <div class="m-hcity">
    <dl>
      <dt>{{title}}</dt>
      <dd v-for="(item,index) in hotCityList"
          :key="index">{{item}}</dd>
    </dl>
  </div>
</template>

<script>
  export default {
    props:['hotCityList',
            'title']
  }
</script>

<style scoped>

</style>
