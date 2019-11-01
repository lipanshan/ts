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
        @onToggleMenu="toggleSubMenu" @onSelect="selectHandle"
        v-if="item.children && item.children.length"
        v-show="item.collapse"
        :menu="item.children"
      ></Menu>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
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
      return []
    }
  })
  readonly menu?: {
    icon?: string
    txt?: string
    children?: any[]
    id: number | string
  }[]
  private catchMenu: menuStack | any[] = []

  @Emit('onToggleMenu')
  toggleSubMenu<T>(data: T): T {
    return data
  }

  @Emit('onSelect')
  selectHandle<T>(data: T): T {
    return data
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