<template>
  <el-container>
    <el-header style="text-align: right; font-size: 16px;">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
      >
        <!-- 设备设置头部 -->
        <el-menu-item index=""><el-page-header @back="goBack" style="margin-top: 18px;"></el-page-header></el-menu-item>
        <el-menu-item index="/index/headerSetI/intelligent">渔林</el-menu-item>
      </el-menu>
    </el-header>

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 返回，后退
    goBack(){
      this.$router.go(-1);
    }
    
  }
};
</script>

<style scoped>
.el-header {
  background-color: #f9fdde;
  /* color: #333; */
  line-height: 60px;
  border-radius: 100px;
  font-weight: 700;
  font-size: 30px;
}

.el-menu {
  background-color: #f9fdde;
}

.el-main::-webkit-scrollbar {
  display: none;
}
</style>
