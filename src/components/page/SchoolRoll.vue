<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 学籍信息管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
    <!-- 
      <div class="handle-box">
        <el-input v-model="query.name" placeholder="请输入学生姓名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-search" @click="handleReset">重置</el-button>
      </div>
      -->
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="status" label="角色" align="center"></el-table-column>
        <el-table-column prop="username" label="学生姓名" align="center"></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
          <el-button type="text" icon="el-icon-plus" class="handle-del mr10" @click="addSelection(scope.row)">添加学籍</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
    <el-dialog title="新建" :visible.sync="editVisible" width="50%">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="学生姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option key="1" label="男" value="1"></el-option>
              <el-option key="0" label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学号">
            <el-input v-model="form.student_num"></el-input>
          </el-form-item>
          <el-form-item label="院系">
            <el-input v-model="form.department"></el-input>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="form.major"></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="form.class_and_grade"></el-input>
          </el-form-item>
          <el-form-item label="民族">
            <el-input v-model="form.ethnic"></el-input>
          </el-form-item>
          <el-form-item label="出生年月">
            <el-input v-model="form.date_of_birth"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="form.id_number"></el-input>
          </el-form-item>
          <el-form-item label="学制">
            <el-input v-model="form.length_of_schooling"></el-input>
          </el-form-item>
          <el-form-item label="学历">
            <el-input v-model="form.study_force"></el-input>
          </el-form-item>
          <el-form-item label="户口所在地">
            <el-input v-model="form.domicile_place"></el-input>
          </el-form-item>
          <el-form-item label="入学时间">
            <el-input v-model="form.admission_Date"></el-input>
          </el-form-item>
          <el-form-item label="毕业时间">
            <el-input v-model="form.graduation_time"></el-input>
          </el-form-item>
          <el-form-item label="是否合格毕业">
            <el-input v-model="form.qualified_for_graduation"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" rows="5" v-model="form.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'schoolRoll',
    data() {
      return {
        query: {
          name: '',
          pageNum: 1,
          pageSize: 10
        },
        tableData: [],
        multipleSelection: [],
        editVisible: false,
        pageTotal: 0,
        form: {},
        idx: -1,
        id: -1,
        status: localStorage.getItem('ms_status'),
        uid: '',//主键id
      };
    },
    created() {
      this.getData();
    },
    methods: {
      // 获取数据
      async getData() {
        console.log(this.status)
        const res = await this.$http.get(`schoolRoll/studentList/${this.query.pageNum}/${this.query.pageSize}`)
        // console.log(res)
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
        // console.log(row.uid)
        const res = await this.$http.post(`schoolRoll/delete/${row.uid}`)
        console.log(res)
        const { data, code, message } = res
        if (code === 200) {
          this.$message.error(message)
          this.form = {}
          this.getData()
        } else {
          this.$message.error(message)
        }
      },
      // 新建按钮
      addSelection(row) {
        this.uid = row.uid
        this.editVisible = true
      },
      // 编辑操作
      async handleEdit(index, row) {
        // console.log(row)
        this.uid = row.uid
        this.idx = index;
        const res = await this.$http.get(`schoolRoll/findById/${this.uid}`)
        // console.log(res)
        const { data, code, message } = res
        if (code === 200 && data === null) {
          this.$message.warning("请先添加学籍信息")
        } else if (code === 200 && data !== null) {
          this.form = data;
          this.editVisible = true;
        } else {
          this.$message.error(message)
        }
        // 跳转到学籍页
        // this.$router.push( name: 'student' )
      },
      // 保存编辑和新建
      async saveEdit() {
        this.editVisible = false;
        const form = {
          ...this.form,
          sr_id: this.uid,
        }
        const res = await this.$http.post('schoolRoll/addschoolRollOrUpdate', form);
        console.log(res)
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