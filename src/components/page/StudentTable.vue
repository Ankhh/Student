<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 学生基本信息
        </el-breadcrumb-item>
        <el-breadcrumb-item>基本表单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container" v-if="this.status === '学生'">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
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
          <el-form-item>
            <el-button type="primary" @click="onSubmit">表单提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="container" v-if="this.status !== '学生'">
      <el-button type="info" @click="handleLink">如果需要查看学生信息，请移步学籍管理</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'baseform',
    data() {
      return {
        username: localStorage.getItem('ms_username'),
        status: localStorage.getItem('ms_status'),
        form: {
          name: '',
          sex: '',
          student_num: '',
          department: '',
          major: '',
          class_and_grade: '',
          ethnic: '',
        }
      };
    },
    created() {
      this.getData()
    },
    methods: {
      // 获取学生数据
      async getData() {
        console.log(this.username)
        if (this.status === "学生") {
          const res = await this.$http.get(`user/findByschoolRoll/${this.username}`)
          // console.log(res)
          const { data, code, message } = res
          if (code === 200 && data === null) {
            this.$message.warning(message)
          } else if (code === 200 && data !== null) {
            this.form = data.schoolRolls
          } else {
            this.$message.error(message)
          }
        } else {
            this.$message.warning("请在学籍管理页面查看")
        }
      },
      onSubmit() {
        this.$message.success('提交成功！');
      },
      // 跳转
      handleLink() {
        this.$router.push('/schoolRoll');
      }
    }
  };
</script>