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
          <el-button size="small" type="danger" @click="delHandle(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <section class="pageNum">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 50, 100]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </section>
    <!-- 添加表单 -->
    <dpt-dialog
      @close="cancleHandel"
      @reload="reload"
      :visible="dialogFormVisible"
      :btnType="btnType"
      :dialogTitle="dialogTitle"
      :form="form"
    ></dpt-dialog>
  </div>
</template>

<script>
import dptDialog from "./children/dptDialog";
import { departmentsApi,delDepartmentsApi } from "../../request/api";

export default {
  components: {
    dptDialog
  },
  created() {
    // api获取列表
    this.reload();
  },
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: "",
        sn: ""
      },
      formLabelWidth: "120px",
      dialogTitle: "",
      btnType: "",
      currentPage: 0,
      pageSize: 5,
      total: 0
    };
  },
  methods: {
    reload() {
      console.log('reload');
      
      departmentsApi({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
     
      }).then(res => {

        this.tableData = res.data.list;
        this.total = res.data.total;
      });
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.reload();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.reload();
    },
    cancleHandel() {
      this.dialogFormVisible = false;
    },
    delHandle(scope){
      console.log('delete');
      
       this.$confirm('此操作将永久删除该部门数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {

        this.$message({
            type: 'success',
            message: '删除成功!'
          });
        delDepartmentsApi({id:scope.row.id});
        this.reload();
        
        }).catch(() => {
          
        });
    },
    // 按钮句柄
    btnHandle(formVis, formDataObj, titText, btnType) {
      this.dialogFormVisible = formVis;
      this.form = {...formDataObj};
      this.dialogTitle = titText;
      this.btnType = btnType;
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