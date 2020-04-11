<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-warn"></i> 管理员权限操作</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--
    <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addSelection">添加管理员</el-button>
    -->
    <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="username" label="管理员姓名" align="center"></el-table-column>
      <el-table-column prop="password" label="管理员密码" align="center"></el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <!--
          <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="total, prev, pager, next" :current-page="query.pageNum"
        :page-size="query.pageSize" :total="total" @current-change="handlePageChange"></el-pagination>
    </div>
    <!-- 新建弹出框 -->
    <el-dialog title="新建" :visible.sync="addVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="管理员姓名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        name: localStorage.getItem('ms_username'),
        query: {
          username: localStorage.getItem('ms_username'),
          pageNum: 1,
          pageSize: 10,
        },
        tableData: [],
        total: 0,
        addVisible: false,
        form: {},
      }
    },
    created() {
      this.getData()
    },
    methods: {
      // 获取数据接口
      async getData() {
        const res = await this.$http.post('user/searchAdministrator', this.query)
        console.log(res)
        const { code, message, data } = res
        if (code === 200) {
          this.tableData = data.list
          this.totsl = data.total
        } else {
          this.$message.error(message)
        }
      },
      // 新建按钮
      addSelection() {
        this.addVisible = true
      },
      // 编辑按钮
      handleEdit(row) {
        console.log(row)
        this.addVisible = true
        this.form = row
      },
      // 新建和编辑的保存按钮
      async saveAdd() {
        // const res = await this.$http.
      },
      // 删除按钮
      handleDelete(index, row) {

      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageNum', val);
        this.getData();
      },
    }
  }
</script>

<style scoped>
  h1 {
    text-align: center;
    margin: 30px 0;
  }

  p {
    line-height: 30px;
    margin-bottom: 10px;
    text-indent: 2em;
  }

  .logout {
    color: #409EFF;
  }
</style>