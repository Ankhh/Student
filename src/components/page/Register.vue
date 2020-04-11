<template>
  <div class="registerBox">
    <h2>用户注册</h2>
    <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="registerForm.username" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input :type="pwdType" v-model="registerForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item label="职称" prop="status">
        <el-select v-model="registerForm.status" placeholder="请选择职称">
          <el-option class="show-select" name="status" width="100%" size="mini" v-for="item in options"
            :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="submitForm()">确定</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data() {
      return {
        rules: {
          username: [{
            required: true,
            trigger: 'blur'
          }],
          password: [{
            required: true,
            trigger: 'blur'
          }],
          status: [{
            required: true,
            trigger: 'blur'
          }]
        },
        registerForm: {
          username: '',
          password: '',
          status: '',
        },
        pwdType: 'password',
        loading: false,
        options: [{
          value: '学生',
          label: '学生',
        }, {
          value: '教师',
          label: '教师',
        }, {
          value: '管理员',
          label: '管理员',
        }],
        value: ''
      };
    },
    methods: {
      // 小眼睛
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      // 提交事件
      async submitForm() {
        const res = await this.$http.post('user/register', this.registerForm)
        // console.log(res)
        const { code, message, data } = res
        if (code === 200) {
          this.$message.success("注册成功")
          this.$router.push('/login')
        } else {
          this.$message.error(message, "请重新填写信息")
          this.resetForm()
        }
      },
      // 重置事件
      resetForm() {
        this.$refs.registerForm.resetFields();
      }
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .registerBox {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;

    h2 {
      margin-top: 30px;
      color: #fff;
      text-align: center;
    }

    .registerForm {
      // position: relative;
      margin: 10px auto;
      width: 50%
    }

    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      line-height: 50px;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;

      &_login {
        font-size: 20px;
      }
    }

    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    .el-form-item__label {
      line-height: 50px;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }

    .el-select {
      width: 94%;
    }

    .el-input--suffix {
      width: 100%;
    }

    .btn {
      // text-align: center;
      padding-left: 200px;
    }
  }
</style>