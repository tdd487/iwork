<template>
  <swiper :options="swiperOption">
    <!-- 幻灯内容 -->
    <swiper-slide><img src="../../assets/img/header.jpg"/></swiper-slide>
    <swiper-slide><img src="../../assets/img/header.jpg"/></swiper-slide>
    <swiper-slide><img src="../../assets/img/header.jpg"/></swiper-slide>
    <!-- 以下配置均为可选（使用具名slot来确定并应用一些操作控件元素） -->
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
          scrollbar: '.swiper-scrollbar',
          autoplay: 3000,
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true,
          debugger: true
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped>
</style>
