<!-- serach -->
<template>
  <div class="search">
    <div class="bg"></div>
    <div class="content">
      <el-input v-model="search" placeholder="请输入姓名 / 厂商名称 / 证书编号 拷贝">
        <el-button slot="append" class="search-btn" @click="searchHandle">查询</el-button>
      </el-input>
      <p v-show="isEmpty" class="error-message">内容不能为空，请重新输入！</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Search extends Vue {
  readonly name: string = 'Search'
  private search: string = ''
  private isEmpty: boolean = true
  searchHandle(): void {
    console.log(this.search)
    
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
    .search-btn {
        background-color: $button-search-default;
        color: #fff;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        &:hover {
            background-color: $button-search-hover;
        }   
        &:active {
            background-color: $button-search-active;
        }
        .error-message {
            
        }
    }
  }
}
</style>