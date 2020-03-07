<template>
  <div class="depa-wapper">
    <el-button
      icon="el-icon-plus"
      @click="btnHandle(true,{},'添加部门','添加')"
      type="success"
      size="small"
    >添加</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="name" label="部门姓名" width="180"></el-table-column>
      <el-table-column prop="sn" label="部门编号"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="btnHandle(true,scope.row,'编辑部门','编辑')">编辑</el-button>
          <el-button size="small" type="danger" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加表单 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="dialogForm">
        <el-form-item label="部门名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入部门名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门编号" prop="sn" :label-width="formLabelWidth">
          <el-input v-model="form.sn" placeholder="请输入部门编号" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
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
} from "../../request/api";

export default {
  created() {
    // api获取列表
    departmentsApi({
      currentPage: 1,
      pageSize: 10,
      token: localStorage.getItem("token")
    }).then(res => {
      // console.log(res);
      this.tableData = res.data.list;
    });
  },
  data() {
    return {
      // dialog表单规则
      rules: {
        name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
        sn: [{ required: true, message: "请输入部门编号", trigger: "blur" }]
      },
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: "",
        sn: ""
      },
      formLabelWidth: "120px",
      dialogTitle: "",
      btnType: ""
    };
  },
  methods: {
    // 按钮句柄
    btnHandle(formVis, formDataObj, titText, btnType) {
      this.dialogFormVisible = formVis;
      this.form = formDataObj;
      this.dialogTitle = titText;
      this.btnType = btnType;
    },
    // 消息提示
    tipsFlag(message, type, flag) {
      switch (flag) {
        case 1:
          this.$message({ message, type});
          this.clearDialog();
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
    },
    // dialog内容清空
    clearDialog() {
      this.form = {};
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
              addDepartmentsApi({
                name: this.form.name,
                sn: this.form.sn,
                token: localStorage.getItem("token")
              }).then(res => {
                // 显示成功或失败提示消息
                this.showTips(res.success, {sucMes: "部门添加成功",type: "success",eMes: "部门添加失败" });
              });
              break;
            case "编辑":
              addDepartmentsApi({
                name: this.form.name,
                sn: this.form.sn,
                id:this.form.id,
                token: localStorage.getItem("token")
              }).then(res => {
                // 显示成功或失败提示消息
                this.showTips(res.success, {sucMes: "部门编辑成功",type: "success",eMes: "部门编辑失败"});
              });
              break;
              default:
                throw new Error('未知按钮类型');
          }
        }
      });
    }
  }
};
</script>

<style lang='less' scope>
.depa-wapper {
  padding: 10px 0;
  background-color: #fff;
}
</style>