<template>
  <el-menu
    :default-active="getPath"
    class="el-menu-vertical-demo home-leftnav"
    background-color="#324157"
    text-color="#bfcbd9"
    active-text-color="#20a0ff"
    router
    unique-opened
    :collapse='isRetract'
  >
    <el-submenu :index="indexKey+''" v-for="(menuCon,indexKey) in menuConfig" :key="indexKey">
      <template slot="title">
        <i :class="menuCon.icon"></i>
        <span>{{menuCon.title}}</span>
      </template>
      <el-menu-item
        v-for="(subCon,subIndex) in menuCon.subs"
        :key="subIndex"
        :index="subCon.index"
      >{{subCon.title}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import Bus from "./bus";
export default {
  created() {
    //   监听自定义事件
      Bus.$on('retract', res =>{
          this.isRetract = res;
      })
  },
  data() {
    return {
      isRetract: false,
      menuConfig: [
        {
          icon: "el-icon-s-tools",
          title: "系统管理",
          subs: [
            {
              index: "/department",
              title: "部门管理"
            },
            {
              index: "/employee",
              title: "员工管理"
            },
            {
              index: "/permission",
              title: "权限管理"
            },
            {
              index: "/role",
              title: "角色管理"
            }
          ]
        },
        {
          icon: "el-icon-s-management",
          title: "数据管理",
          subs: [
            {
              index: "/sysdictionary",
              title: "字典目录"
            },
            {
              index: "/sysdictionaryitem",
              title: "字典明细"
            }
          ]
        },
        {
          icon: "el-icon-service",
          title: "客户管理",
          subs: [
            {
              index: "/customerlist",
              title: "客户列表"
            },
            {
              index: "/pcustomerlist",
              title: "潜在客户"
            },
            {
              index: "/rpoolcustomer",
              title: "客户池"
            },
            {
              index: "/failcustomer",
              title: "失败客户"
            }
          ]
        },
        {
          icon: "el-icon-s-custom",
          title: "客户历史",
          subs: [
            {
              index: "/customertracehistory",
              title: "跟进历史"
            }
          ]
        },
        {
          icon: "el-icon-s-data",
          title: "报表统计",
          subs: [
            {
              index: "/customerreport",
              title: "潜在客户报表"
            }
          ]
        }
      ]
    };
  },
  computed: {
    getPath() {
      return this.$route.path;
    }
  }
};
</script>

<style lang='less' scoped>
.home-leftnav {
  position: absolute;
  top: 70px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
}
// 当.home-leftnav 标签class名中有 .el-menu--collapse 该样式不生效
.home-leftnav:not(.el-menu--collapse){
  width: 250px;

}
.home-leftnav::-webkit-scrollbar {
  width: 0;
}
</style>