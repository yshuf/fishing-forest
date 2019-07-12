<template>
  <div class="weather">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="height: 80%;">
      <!-- 标签页头部渲染 -->
      <el-tab-pane
        :label="item.label"
        :name="item.name"
        align="center"
        v-for="(item,index) in list"
        :key="index"
      >
        <!-- 图片 -->
        <div class="move animated fadeInLeftBig">
          <span class="setting">{{item.label}}设置</span>
        </div>

        <!-- 最大最小值修改 -->
        <div class="max">
          <span>
            max:
            <input type="text" v-model="changeValue.value">
          </span>
          <!-- 修改值 -->
          <el-button type="danger" @click="change">修改</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "set",
  data() {
    return {
      activeName: "",
      changeValue: {
        name: "",
        value: ""
      },
      getTabName: {
        label: ""
      },
      list: [
        { label: "空气温度", name: "max_atm_tem" },
        { label: "空气湿度", name: "max_atm_hum"},
        { label: "二氧化碳浓度", name: "max_atm_co2"},
        {label: "烟雾浓度",name:'max_atm_smoke'},
        {
          label: "土壤温度",
          name: "max_soil_tem",
          src: "stem.jpg"
        },
        {
          label: "土壤湿度",
          name: "max_soil_hum",
          src: "shum.png"
        },
        { label: "土壤盐分", name: "max_soil_nity" },
        { label: "土壤电导率", name: "max_soil_conduct"},
        { label: "水温", name: "max_water_tem"},
        { label: "浑浊度", name: "max_water_tur"}
      ]
    };
  },
  mounted() {
    this.$message.warning('请选择你要设置的参数');
  },
  methods: {
    // 获取默认最大值
    handleClick(tab) {
      this.$axios
        .get(
          "forest/standard?name=" +
            tab.$options.propsData.name
        )
        .then(res => {
          if(res.status==200){
            this.changeValue.value = res.data;
            this.changeValue.name = tab.$options.propsData.name;
            this.getTabName.name=tab.$options.propsData.label;
            window.localStorage.setItem(tab.$options.propsData.label,res.data)
          }
        }).catch(err=>{
          this.$message.error(err.data);
        });
    },

    // 图片
    getImgUrl(src) {
      return require("@/assets/images/" + src);
    },

    // 修改最大值
    change() {
      this.$axios
        .put(
          "forest/standard",
          this.changeValue
        )
        .then(res => {
          let _that=this;
          if (res.status == 200) {
            this.$message({
              message: "修改成功！",
              type: "success"
            });
            localStorage.setItem(this.getTabName.name,this.changeValue.value);
          }
        })
        .catch(err => {
          this.$message({
            message: err.message,
            type: "danger"
          });
        });
    }
  }
};
</script>

<style scoped>
.weather {
  height: 100%;
}
.setting {
  font-weight: 700;
  font-family: "Courier New", Courier, monospace;
}
.move {
  position: relative;
}
.max {
  margin: 50px auto;
  padding-top: 66px;
  /* border: 2px solid #ccc; */
  box-shadow: 5px 5px 14px #000000;
  box-sizing: border-box;
  width: 600px;
  height: 200px;
}
.max > span {
  margin-left: 40px;
}
/* 最大值 */
.max > span > input {
  height: 25px;
  border: 1px solid #ebf0bd;
}
.el-button {
  margin-left: 50px;
}
/* 图片 动画  */
.move > img {
  position: absolute;
  right: 0;
  background: transparent;
  animation: imgMove 5s infinite;
}
@keyframes imgMove {
  0% {
    top: 0px;
  }
  25% {
    top: 200px;
    right: 50px;
  }
  50% {
    top: 400px;
    right: 30px;
  }
  75% {
    top: 200px;
    right: 0px;
  }
  100% {
    top: 0px;
    right: 20px;
  }
}
.el-tabs {
  background: url('../../assets/images/setting.jpg') no-repeat center center;
  background-size: 100% 100%;
}
</style> 
