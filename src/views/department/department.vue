<template>
  <div class="depa-wapper">
    <el-button icon="el-icon-plus" @click="addBtnFun" type="success" size="small">添加</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="name" label="部门姓名" width="180"></el-table-column>
      <el-table-column prop="sn" label="部门编号"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  <!-- 添加表单 -->
    <el-dialog title="添加部门" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules='rules' ref='dialogForm'>
        <el-form-item label="部门名称" prop='name' :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder='请输入部门名称' autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门编号" prop='sn' :label-width="formLabelWidth">
          <el-input v-model="form.sn"   placeholder='请输入部门编号' autocomplete="off"></el-input>
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
import { departmentsApi,addDepartmentsApi } from "../../request/api";

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
      rules:{
        name:[
          {required:true,message:'请输入部门名称',trigger:'blur'},
        ],
        sn:[
          {required:true,message:'请输入部门编号',trigger:'blur'},
        ],
      },
      tableData: [],
      dialogFormVisible:false,
      form:{
        name:'',
        sn:'',
      },
      formLabelWidth: '120px',
    };
  },
  methods: {
    addBtnFun() {
      this.dialogFormVisible = true;
    },
    
    submitButton(){
      //表单规则验证
      this.$refs.dialogForm.validate(vali => {
        if(vali){
          this.dialogFormVisible = false;
          addDepartmentsApi({
            name:this.form.name,
            sn:this.form.sn,
            token:localStorage.getItem('token')
          }).then(res => {
            res.success
            
          })
        }
      })
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