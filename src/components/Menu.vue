<!-- 左侧-菜单 -->
<template>
  <ul v-if="menu.length" class="menu-list">
    <li class="menu-item" v-for="item in menu" :key="item.id">
      <router-link
        tag="div"
        :to="item.router"
        @click.native="selectHandle(item)"
        class="menu-title"
      >
        <span class="icon" :class="item.icon"></span>
        <p class="txt">{{item.txt}}</p>
        <span
          v-if="item.children"
          @click.stop="toggleSubMenu(item)"
          class="collapse-icon"
          :class="{'collapsed': item.collapse}"
        ></span>
      </router-link>
      <Menu
        v-if="item.children && item.children.length"
        v-show="item.collapse"
        :menu="item.children"
      ></Menu>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
type menuStack = {
  router?: string
  children?: menuStack[]
  id: string | number
  txt: string | number
  collapse?: boolean
}
@Component
export default class Menu extends Vue {
  readonly name: string = 'Menu'
  @Prop({
    type: Array,
    default() {
      return [
        {
          id: 1,
          txt: '学员证书',
          icon: 'icon1',
          router: '/admin/student',
          children: [
            {
              id: 2,
              txt: '以获取',
              icon: '',
              router: '/admin/student/obtain',
              collapse: false
            },
            {
              id: 3,
              txt: '未获取',
              icon: '',
              router: '/admin/student/unobtain',
              collapse: false
            }
          ],
          collapse: false
        },
        {
          id: 4,
          txt: '厂商证书',
          icon: 'icon2',
          router: '/admin/factory',
          collapse: false
        },
        {
          id: 5,
          txt: '证书类型',
          icon: 'icon3',
          router: '/admin/certificatetype',
          collapse: false
        },
        {
          id: 6,
          txt: '培训期数',
          icon: 'icon4',
          router: '/admin/train',
          collapse: false
        },
        {
          id: 7,
          txt: '系统设置',
          icon: 'icon5',
          router: '/admin/systemset',
          collapse: false
        }
      ]
    }
  })
  readonly menu?: {
    icon?: string
    txt?: string
    children?: any[]
    id: number | string
  }[]
  private catchMenu: menuStack | any[] = []

  beforeRouteEnter (to: any, from: any, next: any) {
    console.log(to)
    // next()
  }

  toggleSubMenu(data: menuStack): void {
    data.collapse = !data.collapse
  }

  selectHandle(data: menuStack): void {
    data.collapse = true
    if (data.children && data.children.length) {
      const path = data.children[0].router
      this.$router.push({
        path: path
      })
      console.log(path)
    }
  }

  collapseSubMenu(data: menuStack): void {
    if (data.children && data.children.length) {
      for (let i: number = 0, arr: any[] = data.children; i < arr.length; i++) {
        arr[0].collapse = false
      }
    }
  }
}
</script>
<style lang='scss'>
@import '../assets/scss/variable';
.menu-list {
  .menu-item {
    .menu-title {
      display: flex;
      padding-top: 9px;
      padding-bottom: 9px;
      cursor: pointer;
      & > .icon {
        margin-right: 12px;
        display: block;
        width: 16px;
        height: 16px;
        @for $index from 1 through 7 {
          &.icon#{$index} {
            background: url(../assets/images/icon.png)
              no-repeat
              0 -#{$index *
              33}px;
          }
        }
      }
      & > .txt {
        flex: 1;
        font-size: $font-size-sm;
        line-height: 16px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: $menu-color-default;
        text-align: left;
      }
      .collapse-icon {
        margin-top: 5px;
        width: 12px;
        height: 6px;
        margin-left: 5px;
        margin-right: 12px;
        background: red;
        cursor: pointer;
        background: url(../assets/images/ctrd.png) no-repeat 0 0;
        &.collapsed {
          background: url(../assets/images/ctrup.png) no-repeat 0 0;
        }
      }
      &:hover {
        .icon {
          @for $i from 1 through 7 {
            &.icon#{$i} {
              background-position: -36px -#{$i * 33}px;
            }
          }
        }
        .txt {
          color: $menu-color-hover;
        }
      }
      &:active {
        .icon {
          @for $i from 1 through 7 {
            &.icon#{$i} {
              background-position: -36px -#{$i * 33}px;
            }
          }
        }
        .txt {
          color: $menu-color-active;
        }
      }
      &.active,
      &.router-link-active {
        .icon {
          @for $i from 1 through 7 {
            &.icon#{$i} {
              background-position: -36px -#{$i * 33}px;
            }
          }
        }
        .txt {
          color: $menu-color-active;
        }
      }
    }
  }
}
</style>