<!-- search result -->
<template>
  <div class="search-result">
    <div class="header">
      <router-link to="/" tag="div" class="logo-wrap">
        <img src="../assets/images/logo.png" class="logo" alt />
        <span class="h1">瑞星证书认证公共查询</span>
      </router-link>
    </div>
    <div class="result-list">
      <div v-loading="loading" class="wrap">
        <p class="note">查询结果：</p>
        <h3 class="title">证书详细信息</h3>
        <ul v-if="peopleInfo.length" class="list">
          <li v-for="info in peopleInfo" :key="info.id" class="item">
            <!-- 人员 -->
            <div class="title-row">
              <p class="name">姓 名：{{info.stu_name}}</p>
              <p class="gender">性 别：{{info.stu_sex}}</p>
            </div>
            <ul class="template">
              <li class="template-item">
                <div class="row">
                  <p class="left">证书类型：{{info.certificate_name}}</p>
                  <!-- <p class="right">证书名称：瑞星认证服务工程师</p> -->
                </div>
                <div class="row">
                  <p class="time">有 效 期：{{info.ValidityPeriod}}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <ul v-if="companyName" class="list">
          <li class="item">
            <!-- 厂商 -->
            <div v-show="companyName" class="title-row">
              <p class="name">厂商名称：{{companyName}}</p>
            </div>
            <ul v-if="companyInfo.length" class="template">
              <li v-for="info in companyInfo" :key="info.id" class="template-item">
                <div class="row">
                  <p class="left">单位技术认证： {{info.technology}}</p>
                  <p class="right">单位认证星级：{{'☆☆☆☆☆'.substring(0, info.star_level)}}</p>
                </div>
                <div class="row">
                  <p class="left">证书类型：{{info.certificate_name}}</p>
                  <!-- <p class="right">证书编号：{{info.}}</p> -->
                </div>
                <div class="row">
                  <p class="time">有 效 期：{{info.ValidityPeriod}}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <p v-if="isNothing" class="nothing-txt">抱歉，没有查询到相应的证书信息。</p>
        <el-pagination class="pagination" v-if="total > pageSize" background layout="prev, pager, next" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getSearchResult } from '@/api/search.ts'
@Component
export default class SearchResult extends Vue {
  readonly name: string = 'SearchResult'

  private peopleInfo: any[] = []
  private companyInfo: any[] = []
  private companyName: string = ''
  private pageNum: number = 1
  private pageSize: number = 20
  private loading: boolean = true
  private total: number = 0

  get isNothing(): boolean {
    return !this.peopleInfo.length && !this.companyInfo.length && !this.loading
  }

  created(): void {
    this.search(this.$route.query.word)
  }

  search(word: string | (string | null)[] = ''): void {
    getSearchResult({
      Keyword: word,
      page: this.pageNum,
      perpage: this.pageSize
    })
      .then((res: any): any => {
        this.loading = false
        if (res.ret === 200) {
          this.peopleInfo = res.data.StuCer.items || []
          this.companyInfo = res.data.CompanyCer.info || []
          this.companyName = res.data.CompanyCer.manufacturer_name
          this.pageSize = res.data.StuCer.perpage
          this.pageNum = res.data.StuCer.currentPage
          this.total = res.data.StuCer.totalitems
        }
      })
      .catch((): any => {
        this.loading = false
      })
  }
}
</script>
<style lang='scss'>
@import '../assets/scss/variable';
.search-result {
  min-width: 1000px;
  display: flex;
  flex: 1;
  background-color: $search-bg-color;
  flex-direction: column;
  .header {
    padding: 15px 18px 37px;
    .logo-wrap {
      display: flex;
      cursor: pointer;
      .logo {
        display: block;
        width: 132px;
        height: 18px;
      }
      .h1 {
        margin-left: 10px;
        padding-left: 10px;
        border-left: 1px solid #d6d6d6;
        font-size: $font-size-xlg;
        line-height: 18px;
        color: $font-color-default;
      }
    }
  }
  .result-list {
    flex: 1;
    margin: 0 84px 40px;
    background-color: $white;
    border: 1px solid #ececec;
    border-radius: 5px;
    .wrap {
      margin: 21px auto;
      width: 608px;
      .note {
        padding-left: 7px;
        font-size: $font-size-xs;
        line-height: 48px;
        text-align: left;
        color: #777777;
      }
      .title {
        padding-top: 2px;
        background-color: #89bceb;
        font-size: $font-size-lg;
        line-height: 40px;
        text-align: center;
        color: $white;
      }
      .nothing-txt {
        font-size: $font-size-xs;
        line-height: 70px;
        text-align: center;
        color: $font-color-normal;
      }
      .list {
        .item {
          margin-top: 15px;
          padding-left: 10px;
          padding-right: 10px;
          border: 1px solid $border-color-default;
          border-radius: 5px;
          .title-row {
            padding-bottom: 4px;
            display: flex;
            font-size: $font-size-sm;
            line-height: 38px;
            color: $font-color-normal;
            .name,
            .gender {
              flex: 1;
              text-align: left;
              white-space: pre-wrap;
              word-break: break-all;
            }
            .name {
              padding-left: 24px;
            }
            .gender {
              padding-right: 24px;
            }
          }
          .template {
            .template-item {
              text-align: left;
              border-top: 1px dotted #cdcdcd;
              &:nth-child(1) {
                border: none;
              }
              .row {
                display: flex;
                font-size: $font-size-sm;
                line-height: 46px;
                color: $font-color-normal;
                .left,
                .right {
                  flex: 1;
                  white-space: pre-wrap;
                  word-break: break-all;
                }
                .left {
                  padding-left: 24px;
                }
                .right {
                  padding-right: 24px;
                }
                .time {
                  @extend .left;
                }
              }
            }
          }
        }
      }
    }
  }
  .pagination {
    margin-top: 40px;
    margin-bottom: 20px;
  }
}
</style>