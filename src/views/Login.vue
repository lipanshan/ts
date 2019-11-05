<!-- 登录 -->
<template>
  <div class="login" ref="loginWrap">
    <div class="content">
      <div class="header">
        <h1></h1>
        <p>
          <span>瑞星证书认证管理系统</span>
          <span class="version">v1.0</span>
        </p>
      </div>
      <el-form
        :rules="rules"
        class="form"
        label-position="right"
        label-width="64px"
        :model="formData"
        ref="loginForm"
      >
        <el-form-item prop="username" label="账  户">
          <el-input
            v-model="formData.username"
            maxlength="16"
            minlength="6"
            placeholder="6-16位字母数字/邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密  码">
          <el-input
            v-model="formData.password"
            maxlength="16"
            minlength="6"
            placeholder="6-16（字母数字标识符）"
          ></el-input>
        </el-form-item>
        <el-form-item prop="vcode" label="验证码">
          <div class="vcode-wrap">
            <el-input class="input-vcode" v-model="formData.vcode" placeholder="请输入右侧信息"></el-input>
            <img class="vcode" :src="vcodeUrl" />
            <div class="refresh" @click="refreshVcodeHandle"></div>
          </div>
        </el-form-item>
        <div class="sumbit" @click="submitForm">登录</div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import { Getter, Mutation } from 'vuex-class'
import { loginHandle, getVCode } from '@/api/login'
@Component
export default class Login extends Vue {
  readonly name: string = 'Login'
  private formData: any = {
    username: '',
    password: '',
    vcode: ''
  }

  private validatorNamePass(
    rule: any,
    value: string,
    callback: any,
    el: any
  ): void {
    if (!value) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  }
  private validatorVcode: any = (
    rule: any,
    value: string,
    callback: any
  ): void => {
    if (!value) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  }
  private rules: any = {
    username: [
      {
        trigger: 'none', // 禁用input验证
        message: '请检查账号和密码是否正确',
        validator: this.validatorNamePass
      }
    ],
    password: [
      {
        trigger: 'none', // 禁用input验证
        message: '请检查账号和密码是否正确',
        validator: this.validatorNamePass
      }
    ],
    vcode: [
      {
        trigger: 'none', // 禁用input验证
        message: '验证码错误，请重新输入',
        validator: this.validatorVcode
      }
    ]
  }
  private vcodeUrl: string = ''
  @Ref('loginForm') readonly loginForm!: HTMLFormElement
  @Getter('getUserName') readonly getUserName!: string

  created(): void {
    this.refreshVcodeHandle() // 初始化验证码
  }

  refreshVcodeHandle(): void {
    this.vcodeUrl = getVCode()
  }

  submitForm(): void {
    this.validataForm('password')
  }

  validataForm(prop: string): void {
    if (prop === '') {
      this.loginForm.validateField(prop)
      return
    }
    let catchProp: string = this.formData[prop]
    this.formData[prop] = ''
    this.loginForm.validateField(prop)
    this.formData[prop] = catchProp
  }
}
</script>
<style lang='scss'>
@import '../assets/scss/variable';
.login {
  position: relative;
  flex: 1;
  background: url(../assets/images/bj.jpg) no-repeat 0 0;
  background-size: cover;
  .content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    border-radius: 8px;
    width: 300px;
    background: $white;
    .header {
      padding-top: 20px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      background: url(../assets/images/logo_title.png) no-repeat 0 0;
      background-size: 300px 89px;
      & > h1 {
        margin: 0 auto;
        width: 132px;
        height: 18px;
        background: url(../assets/images/logo_back.png) no-repeat 0 0;
        background-size: 132px 18px;
      }
      & > p {
        & > span {
          padding-bottom: 8px;
          font-size: $font-size-xlg;
          line-height: 44px;
          text-align: center;
          color: #83daf7;
        }
        .version {
          margin-top: 13px;
          display: inline-block;
          vertical-align: top;
          font-size: $font-size-xs;
          line-height: 14px;
        }
        &::after {
          content: '';
          margin-left: 4px;
          display: inline-block;
          vertical-align: middle;
          width: 24px;
          height: 2px;
          background: #6ba3ed;
        }
        &::before {
          content: '';
          margin-right: 10px;
          display: inline-block;
          vertical-align: middle;
          width: 24px;
          height: 2px;
          background: #6ba3ed;
        }
      }
    }
    .form {
      margin-top: 20px;
      .el-form-item__content {
        width: 216px;
        line-height: 32px;
        .el-input__inner {
          height: 32px;
          line-height: 32px;
        }
      }
      .vcode-wrap {
        display: flex;
        .input-vcode {
          flex: 1;
          margin-right: 4px;
        }
        .vcode {
          margin-right: 4px;
          display: block;
          width: 68px;
          height: 30px;
        }
        .refresh {
          display: block;
          width: 30px;
          height: 30px;
          background: url(../assets/images/refresh.png) no-repeat 0 0;
          background-size: 30px 30px;
          cursor: pointer;
        }
      }
      .sumbit {
        margin: 0 auto 30px;
        width: 140px;
        height: 34px;
        font-size: $font-size-sm;
        line-height: 34px;
        border-radius: 34px;
        background-color: $button-search-default;
        color: $white;
        &:hover {
          background-color: $button-search-hover;
        }
        &:active {
          background-color: $button-search-active;
        }
        cursor: pointer;
      }
      .el-form-item__error::before {
        content: '';
        display: inline-block;
        vertical-align: top;
        width: 15px;
        height: 15px;
        background: url(../assets/images/fail_min_icon.png) no-repeat 0 0;
        background-size: 15px 15px;
      }
    }
  }
}
</style>