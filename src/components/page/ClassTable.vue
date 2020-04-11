<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-picfill"></i> 课程和成绩管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.course_name" placeholder="请输入课程名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch(row)">搜索</el-button>
        <el-button type="primary" icon="el-icon-search" @click="handleReset">重置</el-button>
        <el-button v-if="this.status !== '学生'" type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addSelection">添加成绩
        </el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="course_yx" label="院系" align="center"></el-table-column>
        <el-table-column prop="uid" label="学生姓名" align="center"></el-table-column>
        <el-table-column prop="course_name" label="课程名称" align="center"></el-table-column>
        <el-table-column prop="course_num" label="课程分数" align="center"></el-table-column>
        <el-table-column prop="is_qualified" label="是否合格" align="center">
          <template slot-scope="scope">
            <!-- @change="changeStatus(scope.row)"-->
            <el-switch
              v-model="scope.row.is_qualified"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column v-if="this.status !== '学生'" label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageNum"
          :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
      </div>
    </div>
    <!-- 新建弹出框 -->
    <el-dialog title="添加" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="院系">
          <el-input v-model="form.course_yx"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input v-model="form.uid"></el-input>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="form.course_name"></el-input>
        </el-form-item>
        <el-form-item label="课程分数">
          <el-input v-model="form.course_num"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="院系">
          <el-input v-model="form.course_yx"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input v-model="form.uid"></el-input>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="form.course_name"></el-input>
        </el-form-item>
        <el-form-item label="课程分数">
          <el-input v-model="form.course_num"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'basetable',
  data() {
    return {
      query: {
        course_name: '',
        pageNum: 1,
        pageSize: 10
      },
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      status: localStorage.getItem('ms_status'),
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取数据
    async getData() {
      const res = await this.$http.post('course/search', { pageNum: this.query.pageNum, pageSize: this.query.pageSize })
      const { data, code, message } = res
      // console.log(data)
      if (code === 200) {
        this.tableData = data.list
        this.query.pageNum = data.pageNum
        this.query.pageSize = data.pageSize
        this.pageTotal = data.total
      } else {
        this.$message.error(message)
      }
    },
    // 触发搜索按钮
    async handleSearch() {
      const res = await this.$http.post('course/search', this.query)
      const { data, code, message } = res
      if (code === 200) {
        this.tableData = data.list
        this.query.pageNum = data.pageNum
        this.query.pageSize = data.pageSize
        this.pageTotal = data.total
      } else {
        this.$message.error(message)
      }
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 删除按钮
    async handleDelete(index, row) {
      const res = await this.$http.get(`course/delete/${row.c_id}`)
      const { data, code, message } = res
      if (code === 200) {
        this.getData()
      } else {
        this.$message.error(message)
      }
    },
    // 新建按钮
    addSelection() {
      this.form = {}
      this.editVisible = true
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑和新建
    async saveEdit() {
      this.editVisible = false;
      const res = await this.$http.post('course/updateOrsave', this.form);
      const { code, message } = res
      if (code === 200) {
        this.$message.success(message)
        this.getData();
      } else {
        this.$message.error(message)
      }
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageNum', val);
      this.getData();
    },
    // 重置按钮
    handleReset() {
      this.query = {}
      this.getData();
    }
  }
};
</script>

<style>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }

  .table {
    width: 100%;
    font-size: 14px;
  }

  .red {
    color: #ff0000;
  }

  .mr10 {
    margin-right: 10px;
  }

  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
</style>