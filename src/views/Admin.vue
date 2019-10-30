<!-- 后台首页 -->
<template>
  <div class="admin-home">
    <Header :nickName="userName" @onExit="userExit" class="admin-top"></Header>
    <div class="admin-container">
      <div class="left-menu">
        <Menu></Menu>
      </div>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
@Component({
  components: {
    Header,
    Menu
  }
})
export default class Admin extends Vue {
  readonly name: string = 'Admin'
  private userName: string = '用户昵称'

  userExit(data: any): void {
    console.log('退出登陆', data)
  }
}
</script>
<style lang='scss'>
@import '../assets/scss/variable';
.admin-home {
  display: flex;
  height: 100%;
  flex: 1;
  background-color: #eceef3;
  flex-direction: column;
  .admin-top {
    height: 52px;
  }
  .admin-container {
    margin-top: 10px;
    padding-left: 12px;
    padding-right: 12px;
    flex: 1;
    display: flex;
    .left-menu {
      margin-right: 12px;
      margin-bottom: 12px;
      padding-top: 10px;
      padding-left: 16px;
      width: 138px;
      background: $white;
      border-radius: 5px;
    }
    .container {
        margin-bottom: 12px;
        flex: 1;
        background: $white;
        border-radius: 5px;
    }
  }
}
</style>