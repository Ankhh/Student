<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 班级信息管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input ref="searchBox" v-model="query.clbum_name" placeholder="请输入班级名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-search" @click="handleReset">重置</el-button>
        <el-button v-if="this.status !== '学生'" type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addSelection">添加班级
        </el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
      @expand-change="handleExpand">
        <el-table-column v-if="this.status !== '学生'" type="expand">
          <template slot-scope="props">
            <el-transfer v-model="value" :data="data" :titles="titles" @change="handleTransfer"></el-transfer>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="yx" label="院系名称" align="center"></el-table-column>
        <el-table-column prop="nj" label="年级" align="center"></el-table-column>
        <el-table-column prop="clbum_name" label="班级名称" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleOpen(scope.row)">{{scope.row.clbum_name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="class_teacher" label="任课老师" align="center"></el-table-column>
        <el-table-column v-if="this.status !== '学生'" label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageNum"
          :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
      </div>
    </div>

    <!-- 新建弹出框 -->
    <el-dialog title="新建" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="院系名称">
          <el-input v-model="form.yx"></el-input>
        </el-form-item>
        <el-form-item label="年级">
          <el-input v-model="form.nj"></el-input>
        </el-form-item>
        <el-form-item label="班级名称">
          <el-input v-model="form.clbum_name"></el-input>
        </el-form-item>
        <el-form-item label="任课老师">
          <el-input v-model="form.class_teacher"></el-input>
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
        <el-form-item label="院系名称">
          <el-input v-model="form.yx"></el-input>
        </el-form-item>
        <el-form-item label="年级">
          <el-input v-model="form.nj"></el-input>
        </el-form-item>
        <el-form-item label="班级名称">
          <el-input v-model="form.clbum_name"></el-input>
        </el-form-item>
        <el-form-item label="任课老师">
          <el-input v-model="form.class_teacher"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="班级名单"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <span v-for="(item,index) in this.studentData"><el-tag style="margin-right: 10px;" type="warning">{{item.username}}</el-tag></span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'basetable',
    data() {
      return {
        query: {
          clbum_name: '',
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
        data: [],
        titles: ["所有学生", "选中学生"],
        value: [],
        status: localStorage.getItem('ms_status'),
        dialogVisible: false,
        studentData: [],
      };
    },
    created() {
      this.getData();
    },
    methods: {
      // 获取数据
      async getData() {
        const res = await this.$http.post('clbum/search', { pageNum: this.query.pageNum, pageSize: this.query.pageSize })
        const { data, code, message } = res
        // console.log(res)
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
        const res = await this.$http.post('clbum/search', this.query)
        // console.log(res)
        this.$set(this.query, 'pageNum', 1);
        const { data, code, message } = res
        if (code === 200) {
          this.tableData = data.list
          this.query.pageNum = data.pageNum
          this.query.pageSize = data.pageSize
          this.pageTotal = data.total
        } else {
          this.$message.error(message)
        }
        // this.getData();
      },
      // 删除按钮
      async handleDelete(index, row) {
        // console.log(row.cb_id)
        const res = await this.$http.get(`clbum/delete/${row.cb_id}`)
        // console.log(res)
        const { data, code, message } = res
        if (code === 200) {
          this.$message.success(message)
          this.getData()
        } else {
          this.$message.error(message)
        }
      },
      // 新建按钮
      addSelection() {
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
        // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        // this.$set(this.tableData, this.idx, this.form);
        const res = await this.$http.post('clbum/saveOrupdate', this.form);
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
      },
      // 获取学生信息
      async handleExpand(row) {
        const res = await this.$http.post('user/searchStudent', this.query)
        // console.log(res)
        const { code, message, data } = res
        if (code === 200) {
          this.data = data.list.map(item => {
            return {
              label: item.username,
              key: item.uid
            }
          })
        } else {
          this.$message.error(message)
        }
      },
      // 穿梭框右侧发生变化时触发
      async handleTransfer(e) {
        // console.log(e)
        const query = {
          ...this.query,
          e,
        }
        const res = await this.$http.post('course/add', query)
        // console.log(res)
        if (code === 200) {
          this.$message.success(message)
        } else {
          this.$message.error(message)
        }
      },
      // 打开班级查看学生姓名
      async handleOpen(row) {
        const res = await this.$http.get(`clbum/findStudent/${row.cb_id}`)
        const { data, code, message } = res
        if (code === 200) {
          this.studentData = data
          this.dialogVisible = true
          this.$message.success(message)
        } else {
          this.$message.error(message)
        }
      },
    }
  };
</script>

<style scoped>
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