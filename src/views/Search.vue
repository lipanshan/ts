<!-- serach -->
<template>
  <div class="search">
    <div class="bg"></div>
    <div class="content">
      <el-input
        v-model="search"
        @change="changeHandle"
        class="search-input"
        placeholder="请输入姓名 / 厂商名称 / 证书编号 拷贝"
      >
        <el-button slot="append" class="search-btn" @click="searchHandle">查询</el-button>
      </el-input>
      <p v-show="isEmpty" class="error-message">内容不能为空，请重新输入！</p>
    </div>
    <div class="version">Powered by Copyright by Rising V1.0.0.31 ©2014-2019</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Search extends Vue {
  readonly name: string = 'Search'
  private search: string = ''
  private isEmpty: boolean = false
  searchHandle(): void {
    if (!this.search) {
      this.isEmpty = true
      return
    }
    this.isEmpty = false
    this.$router.push({
      path: '/searchResult',
      query: {
        word: this.search
      }
    })
  }
  changeHandle(): void {
    this.isEmpty = !this.search
  }
}
</script>
<style lang='scss'>
@import '../assets/scss/variable';
body,
html {
  height: 100%;
}
.search {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #edeff4;
  min-width: 1000px;
  justify-content: space-between;
  .bg {
    width: 100%;
    padding-top: 25.75%;
    background: url(../assets/images/search_bg.png) no-repeat 0 0;
    background-size: cover;
  }
  .content {
    width: 534px;
    margin: 31px auto 0;
    flex: 1;
    .search-input {
      & > input {
        height: 32px;
        line-height: 32px;
      }
    }
    .search-btn {
      background-color: $button-search-default;
      color: #fff;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      padding-top: 8px;
      padding-bottom: 8px;
      &:hover {
        background-color: $button-search-hover;
      }
      &:active {
        background-color: $button-search-active;
      }
    }
    .error-message {
      position: relative;
      margin-top: 10px;
      padding-left: 24px;
      font-size: $font-size-xs;
      line-height: 14px;
      color: $font-color-danger;
      text-align: left;
      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 4px;
        width: 15px;
        height: 15px;
        background: url(../assets/images/fail_min_icon.png) no-repeat 0 0;
      }
    }
  }
  .version {
    margin-top: 40px;
    padding-bottom: 54px;
    font-size: $font-size-xs;
    line-height: 24px;
    text-align: center;
    color: $font-color-normal;
  }
}
</style>