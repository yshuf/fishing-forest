<template>
  <div class="containerS">
    <!-- 手动增氧 -->
    <div class="aeration">
      <div class="area">
        <h1>手动增氧</h1>
      </div>
      <el-switch
        :width="60"
        v-model="value1"
        active-text="开"
        inactive-text="关"
        inactive-color="#e4c778"
        @change="manualAeration"
      ></el-switch>
    </div>
    <!-- 手动浇灌 -->
    <div class="watering">
      <div class="area">
        <h1>手动浇灌</h1>
      </div>
      <el-switch
        style="display: block"
        v-model="value2"
        :width="60"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="开"
        inactive-text="关"
        @change="manualWatering"
      ></el-switch>
    </div>
    <!-- 智能控制 -->
    <div class="intelligent">
      <div class="area">
        <h1>智能控制</h1>
        <h1 class="automatic_aeration">自动增氧</h1>
        <h1 class="automatic_watering">自动浇灌</h1>
      </div>
      <el-switch
        :width="50"
        v-model="value"
        active-text="智能开启"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="intelligentControl"
      ></el-switch>
      <el-switch v-model="valueW" active-text="自动浇灌" class="autWat" @change="automaticWatering" ref="autoWat"></el-switch>
      <el-switch
        style="display: block"
        class="autAer"
        v-model="valueO"
        active-color="#13ce66"
        inactive-color="#fff"
        active-text="自动增氧"
        @change="automaticAeration"
        ref="autoAera"
      ></el-switch>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: false,
      value2: false,
      value: false,
      valueO: false,
      valueW: false
    };
  },
  mounted() {
    // this.automaticAeration();
    // this.automaticWatering();
  },
  methods: {
    // 设置手动增氧
    manualAeration() {
      let status = this.value1 == true ? "1" : "0";
      this.$axios
        .get("/forest/control?control=l&launch="+status)
        .then(res => {
          if (res.status == 200) {
            if (status == 1) {
              this.$message.success("手动设置增氧");
            } else {
              this.$message.error("关闭手动增氧");
            }
          }
        })
        .catch(err => {
          console.log(res.data);
        });
    },
    // 设置手动浇灌
    manualWatering() {
      let status = this.value2 == true ? "1" : "0";
      this.$axios
        .get("/forest/control?control=m&launch=" + status)
        .then(res => {
          if (res.status == 200) {
            if (status == 1) {
              this.$message.success("手动设置浇灌");
            } else {
              this.$message.error("关闭手动浇灌");
            }
          }
        })
        .catch(err => {
          console.log(res.data);
        });
    },
    // 智能开启，自动增氧和自动浇灌才可能工作
    intelligentControl() {
      let status = this.value == true ? "1" : "0";
      this.$axios
        .get("/forest/control?control=p&launch=" + status)
        .then(res => {
          if (res.status == 200) {
            if (status == 1) {
              this.$refs.autoAera.disabled = false;
              this.$refs.autoWat.disabled = false;
              this.valueO=false;
              this.valueW=false;
              this.$message.success("你已开启智能控制，可以设置自动功能");
            } else {
              this.valueO=false;
              this.valueW=false;
              this.$message.error("你已关闭智能控制，自动功能将停止使用");
            }
          }
        })
        .catch(err => {
          console.log(res.data);
        });
    },
    // 自动增氧，首先判断智能控制是否已经开起
    automaticAeration() {
      let status = this.valueO == true ? "1" : "0";
      if (this.value == true) {
        this.$axios
          .get("/forest/control?control=o&launch=" + status)
          .then(res => {
            if (res.status == 200) {
              if (status == 1) {
                this.$message.success("自动增氧开启");
              } else {
                this.$message.error("自动增氧已关闭");
              }
            }
          })
          .catch(err => {
            this.$message.error(err.data);
          });
      } else {
        this.$refs.autoAera.disabled = true;
        this.$message.error("如果想使用智能控制，请先开启智能控制开关");
      }
    },
    // 自动浇灌
    automaticWatering(){
      let status = this.valueW == true ? "1" : "0";
      if (this.value == true) {
        this.$axios
          .get("/forest/control?control=n&launch=" + status)
          .then(res => {
            if (res.status == 200) {
              if (status == 1) {
                this.$message.success("自动浇灌开启");
              } else {
                this.$message.error("自动浇灌已关闭");
              }
            }
          })
          .catch(err => {
            this.$message.error(err.data);
          });
      } else {
        this.$refs.autoWat.disabled = true;
        this.$message.error("如果想使用智能控制，请先开启智能控制开关");
      }
    }
  }
};
</script>

<style>
.containerS {
  position: relative;
}
.aeration {
  position: absolute;
  width: 400px;
  height: 200px;
  box-shadow: 2px 2px 16px #000000;
  margin-top: 1%;
  left: 15%;
  background: url("../../assets/images/fishpond.jpg") center center;
}
.aeration > .area {
  width: 60px;
  height: 60px;
  font-family: cursive;
  border-radius: 50%;
  line-height: 30px;
  text-align: center;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  margin: 20px 0px;
}
.watering {
  width: 400px;
  height: 200px;
  box-shadow: 2px 2px 16px rgb(0, 0, 0);
  position: absolute;
  margin-top: 3%;
  right: 15%;
  background: url("../../assets/images/watering.jpg") center center;
}
.watering > .area {
  width: 60px;
  height: 60px;
  font-family: cursive;
  border-radius: 50%;
  background-color: #7c8178;
  line-height: 30px;
  text-align: center;
  box-shadow: 1px 1px 10px #e2f1d5;
  color: #fff;
  margin: 20px 0px;
}
.intelligent {
  width: 800px;
  height: 250px;
  box-shadow: 2px 2px 16px #ccc;
  position: absolute;
  top: 300px;
  left: 20%;
  border-radius: 50% 50%;
  background: url("../../assets/images/automatic.jpg") center center;
  background-size: 100% 100%;
  box-shadow: 2px 2px 16px rgb(0, 0, 0);
}
.intelligent > .area {
  width: 60px;
  height: 60px;
  font-family: cursive;
  border-radius: 50%;
  background-color: #0ddd75;
  line-height: 30px;
  text-align: center;
  box-shadow: 1px 1px 10px #e2f1d5;
  color: rgb(0, 0, 0);
  margin: 12% 0px;
}
.intelligent > .area > .automatic_watering {
  background-color: #d8ec7d;
  transform: skew(30deg);
  position: absolute;
  top: 18%;
  left: 35%;
  box-shadow: 1px 1px 10px rgb(255, 255, 255);
}
.intelligent > .area > .automatic_aeration {
  background-color: #7dc9ec;
  transform: skew(-30deg);
  position: absolute;
  top: 48%;
  left: 35%;
  box-shadow: 1px 1px 10px rgb(0, 0, 0);
}
.intelligent > .el-switch:nth-child(2) {
  position: absolute;
  top: 46%;
  left: 15%;
}
.intelligent > .el-switch:nth-child(3) {
  position: absolute;
  top: 32%;
  left: 52%;
}
.intelligent > .el-switch:nth-child(4) {
  position: absolute;
  top: 62%;
  left: 52%;
}
</style>
