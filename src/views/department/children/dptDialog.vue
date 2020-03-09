<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="visible" :before-close="beforeClose" >
      <el-form :model="newForm" :rules="rules" ref="dialogForm">
        <el-form-item label="部门名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="newForm.name" placeholder="请输入部门名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门编号" prop="sn" :label-width="formLabelWidth">
          <el-input v-model="newForm.sn" placeholder="请输入部门编号" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleBtn">取 消</el-button>
        <el-button type="primary" @click="submitButton">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  departmentsApi,
  addDepartmentsApi,
  editDepartmentsApi
} from "../../../request/api";

export default {
  props: {
    dialogTitle: {
      type: String,
      default: ""
    },
    visible: {
      type: Boolean,
      default: false
    },
    btnType: {
      type: String,
      default: ""
    },
    form:{
        type:Object,
        default:{},
    },
  },
  data() {
    return {
      // dialog表单规则
      rules: {
        name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
        sn: [{ required: true, message: "请输入部门编号", trigger: "blur" }]
      },
      newForm: {},
      formLabelWidth: "120px"
    };
  },
  watch:{
      form(newVal,oldVal){
        //   console.log(newVal,oldVal);
          this.newForm = JSON.parse(JSON.stringify(newVal))
      }
  },
  methods: {
    beforeClose() {
      // 关闭时visible的值被改变
      // dialog关闭前的回调函数,会暂停dialog的关闭,这里手动关闭;
      this.cancleBtn();
    },
    cancleBtn() {
      this.$emit("close");
    },
    // 消息提示
    tipsFlag(message, type, flag) {
      switch (flag) {
        case 1:
          this.$message({ message, type });
          break;
        case 2:
          this.$message.error(message);
          break;
        default:
          this.$message.error("发生未知错误");
          return;
      }
    },
    // 成功失败消息盒子
    showTips(res, { sucMes, type, eMes }) {
      res ? this.tipsFlag(sucMes, type, 1) : this.tipsFlag(eMes, null, 2);
      this.newForm ={};
      this.cancleBtn();
      this.$emit('reload');
    },
    // 提交dialog表单
    submitButton() {
      //表单规则验证
      this.$refs.dialogForm.validate(vali => {
        if (vali) {
          this.dialogFormVisible = false;
          // 验证通过后发生添加请求
          switch (this.btnType) {
            case "添加":
              addDepartmentsApi({ name: this.newForm.name,sn: this.newForm.sn,token: localStorage.getItem("token")}).then(res => {
                // 显示成功或失败提示消息
                this.showTips(res.success, {sucMes: "部门添加成功",type: "success", eMes: "部门添加失败"});
              });
              break;
            case "编辑":
                
              editDepartmentsApi({ name: this.newForm.name,sn: this.newForm.sn,id: this.newForm.id,token: localStorage.getItem("token") }).then(res => {
                // 显示成功或失败提示消息
                this.showTips(res.success, {sucMes: "部门编辑成功",type: "success",eMes: "部门编辑失败"});
              });
              break;
            default:
              throw new Error("未知按钮类型");
              return;
          }
        }
      });
    }
  }
};
</script>

<style>
</style>