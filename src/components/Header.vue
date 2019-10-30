<!-- 后台-头部导航 -->
<template>
  <div class="header">
    <router-link :to="adminRouter" class="left">
      <img src="../assets/images/logo_back.png" class="logo" alt="logo" />
      <h1>
        瑞星证书认证管理系统
        <span class="version-num">V1.0</span>
      </h1>
    </router-link>
    <div class="right">
      <div class="avatar">
        <img src="../assets/images/user.png" alt="avatar" />
      </div>
      <p class="nick">{{nickName}}</p>
      <div class="exit" @click="exitHandle">退出</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
@Component
export default class Header extends Vue {
  readonly name: string = 'Header'
  @Prop({ type: [String, Number], default: 'nickName' })
  readonly nickName?: string
  @Prop({ type: String, default: '/admin' }) readonly adminRouter?: string

  @Emit('onExit')
  exitHandle(): void {}
}
</script>
<style lang='scss'>
@import '../assets/scss/variable.scss';
.header {
  position: relative;
  display: flex;
  height: 52px;
  min-width: 1000px;
  background: linear-gradient(
    90deg,
    #243892 0%,
    #273b95 56%,
    #3659b0 80%,
    #508def 100%
  );
  justify-content: space-between;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 125px;
    background: url(../assets/images/titlebg.png) no-repeat 0 0;
    background-size: cover;
  }
  .left,
  .right {
    position: relative;
    z-index: 10;
  }
  .left {
    margin-top: 18px;
    display: flex;
    padding-left: 15px;
    .logo {
      display: block;
      width: 132px;
      height: 18px;
    }
    & > h1 {
      margin-left: 8px;
      padding-left: 9px;
      border-left: 1px solid #789dcc;
      font-size: $font-size-xlg;
      line-height: 20px;
      height: 20px;
      color: $white;
      .version-num {
        padding-left: 8px;
        display: inline-block;
        vertical-align: top;
        font-size: $font-size-xs;
        line-height: 14px;
      }
    }
  }
  .right {
    margin-top: 10px;
    padding-right: 15px;
    display: flex;
    .avatar {
      margin-right: 10px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
    }
    .nick {
      margin-top: 6px;
      padding-right: 12px;
      border-right: 1px solid $white;
      font-size: $font-size-xs;
      line-height: 20px;
      color: $white;
      height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 40px;
      max-width: 180px;
    }
    .exit {
      display: block;
      margin-left: 14px;
      font-size: $font-size-sm;
      line-height: 32px;
      color: $white;
      cursor: pointer;
    }
  }
}
</style>