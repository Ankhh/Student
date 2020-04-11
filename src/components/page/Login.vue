<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">学生信息管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <!-- <el-button slot="prepend" icon="el-icon-lx-people"></el-button>-->
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="param.password" @keyup.enter.native="submitForm()">
            <!-- <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>-->
          </el-input>
        </el-form-item>
        <el-form-item prop="status">
          <!-- <el-button slot="prepend" icon="el-icon-lx-people"></el-button>-->
          <el-select v-model="param.status" width="40%" placeholder="请选择职称">
            <el-option name="status"  size="mini" v-for="item in options"
              :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <p class="login-tips" @click="handleRegister()">没有账号？点击注册</p>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        param: {
          username: '',
          password: '',
          status: '',
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请',
            trigger: 'blur'
          }],
        },
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
      async submitForm() {
        const res = await this.$http.post('user/login', this.param)
        const {
          data,
          code,
          message
        } = res
        if (code === 200) {
          this.$message.success('登录成功');
          localStorage.setItem('ms_username', this.param.username);
          localStorage.setItem('ms_status', this.param.status);
          // localStorage.setItem('u_id', data.uid);
          this.$router.push('/');
        } else {
          this.$message.error('请输入账号和密码');
          return false;
        }
      },
      // 注册按钮
      handleRegister() {
        this.$router.push('/register')
      }
    },
  };
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #2d3a4b;
    background-size: 100%;
  }

  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(6, 6, 6, 0.2);
    overflow: hidden;
  }

  .ms-content {
    padding: 30px 30px;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }

  .login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
    cursor: pointer;
  }

  .el-select {
    display: inline-block;
    position: relative;
    width: 100%;
  }
</style>