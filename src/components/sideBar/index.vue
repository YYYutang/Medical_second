<template>
  <div>
    <el-container class="con">
      <el-header class="header">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          active-text-color="#ffd04b"
          background-color="#071135"
        >
          <el-menu-item index="1" style="color: #5292d8; font-size: 20px"
            ><i class="el-icon-box"></i>多粒度人群智能分层工具软件</el-menu-item
          >
          <!--            <template slot="title">当前服务器：</template>-->
          <el-menu-item
            index="2"
            style="float: right; color: #fff; font-size: 14px"
            ><i class="el-icon-close"></i>退出登录</el-menu-item
          >
          <el-menu-item
            index="3"
            style="float: right; color: #fff; font-size: 14px"
            ><i class="el-icon-user"></i>欢迎你，{{username}}</el-menu-item
          >
          <el-menu-item index="4" style="float: right"
            ><i class="el-icon-question"></i
          ></el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px" class="side">
          <el-menu
            default-active="1"
            router
            class="el-menu-vertical-demo"
            @open="handleOpen"
            background-color="#071135"
            text-color="#fff"
            active-text-color="#ffd04b"
            font-size="14px"
          >
            <el-menu-item index="/dash">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/dataManage">
              <i class="el-icon-s-tools"></i>
              数据管理</el-menu-item
            >
             <el-menu-item index="/columnManage">
              <i class="el-icon-connection"></i>
              字段管理</el-menu-item
            >
             <el-menu-item index="/operationManage">
              <i class="el-icon-copy-document"></i>
              操作日志</el-menu-item
            >
           <el-menu-item index="/multicluster">
              <i class="el-icon-connection"></i>
              多粒度人群聚类</el-menu-item
            >
             <el-menu-item index="/peopleDivide">
              <i class="el-icon-copy-document"></i>
              人群智能分层</el-menu-item
            >
            <el-menu-item index="/interactionDivide">
              <i class="el-icon-thumb"></i>
              交互式人群智能分层</el-menu-item
            >
            <div class="menu-footer">
              <el-menu-item index="/introduce"> 软件介绍</el-menu-item>
              <el-menu-item > 操作手册</el-menu-item>
            </div>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <app-main></app-main>
        </el-main>
      </el-container>
      <el-footer>
        <h1>
          重庆邮电大学 大数据智能计算创新研发团队 @CopyRight 2020-2023 All Rights
          Reserved
        </h1>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import AppMain from "@/components/AppMain";
import {postRequest,getRequest} from '@/utils/api'
export default {
  components: { AppMain },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      dialogVisible: false,
      username:'',
    };
  },
  methods: {
    handleSelect(key) {
         if(key==2){
      postRequest('/user/logout').then((resp)=>{
        if(resp.code=="200"){
          this.$router.replace("/");
        }
      })
      }
      if (key == 4) {
        this.$alert(
          "病种的指标存在维度过多的问题，可能导致后续的分析作业效果不佳，本软件提供一个通过机器学习算法将多维的指标转化成低维指标的平台。",
          "软件介绍",
          {
            confirmButtonText: "确定",
          }
        );
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      
    },
  
  },
   mounted(){
              console.log('in')
      getRequest('index/getUserInfo').then((resp)=>{
      
      this.username=resp.data
    })
    }
};
</script>

<style scoped>
.el-icon-mobile-phone {
  color: white;
}
.el-menu-vertical-demo {
  /*解决侧边栏颜色无法撑起整个高度问题*/
  /*height: 100vh;*/
  /*解决侧边栏凸起问题*/
  border-right: none;
    height: 100%;
}
/* .el-menu-demo.is-active {
  background-color: #333 !important;
  color: #ffd04b !important;
} */
/* .el-menu-demo{
  background-color: #071135; 
} */
.header {
  background-color: #071135;

  text-align: center;
  line-height: 60px;
}

.side {
  background-color: #071135;
  color: #333;
  /*text-align: center;*/
  /*line-height: 200px;*/
 height: calc(100vh - 81px);
}

.main {
   height: calc(100vh - 81px);
}
.menu-footer {
  position: absolute;
  bottom: 0;
  margin-left: 40px;
}
.el-footer {
  height: 20px !important;
  font-size: 10px;
  background-color: #8e909794;
  color: #252525;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
