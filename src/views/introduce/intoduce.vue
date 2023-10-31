<template>
  <div>
    <div class="container">
      <div style="font-size: 50px">多粒度人群智能分层工具软件</div>
      <div class="size-icon">
        <div class="icon" @click="linktoDash">
          <svg-icon icon-file-name="首页" />
          <h3 style="font-size: 30px">大屏展示</h3>
        </div>
        <div class="icon" @click="linktoDataManage">
          <svg-icon icon-file-name="数据管理" />
          <h3 style="font-size: 30px">数据管理与上传</h3>
        </div>

        <div class="icon" @click="linktomulticluster">
          <svg-icon icon-file-name="多粒度人群" style="" />
          <h3 style="font-size: 30px">多粒度人群聚类</h3>
        </div>
      </div>
      <div class="size-icon2">
        <div class="icon" @click="linktopeopleDivide">
          <svg-icon icon-file-name="分层" />
          <h3 style="font-size: 30px">人群智能分层</h3>
        </div>
          <div class="icon" @click="linktointeractionDivide">
          <svg-icon icon-file-name="交互" />
          <h3 style="font-size: 30px">交互式人群智能分层</h3>
        </div>
      
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {},
  methods: {
    linktoDash() {
      this.$router.push("/dash");
    },
    linktoDataManage() {
      this.$router.push("/dataManage");
    },
    linktomulticluster() {
      this.$router.push("/multicluster");
    },
    linktopeopleDivide() {
      this.$router.push("/peopleDivide");
    },
    linktointeractionDivide(){
         this.$router.push("/interactionDivide");
    }
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-flow: column;
}
.size-icon {
  font-size: 80px;
  display: grid;

  grid-template-columns: repeat(3, 300px);
  grid-template-rows: repeat(1, 300px);
  gap: 5px;
  justify-items: center;
  align-items: center;
}
.size-icon2{
      font-size: 80px;
  display: grid;
  grid-template-columns: repeat(2, 300px);
  grid-template-rows: repeat(1, 300px);
  gap: 5px;
  justify-items: center;
  align-items: center;
}
.icon {
  display: grid;
  place-items: center;
  text-align: center;
}
.icon svg-icon {
  max-width: 100%;
  vertical-align: middle;
}
.icon h3 {
  margin-top: 10px;
}
</style>