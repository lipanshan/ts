<!-- 后台首页 -->
<template>
	<div class="admin-home">
		<Header :nickName="userName" @onExit="userExit" class="admin-top"></Header>
		<div class="admin-container">
			<div class="left-menu">
				<Menu @onToggleMenu="toggleMenuHandle" :menu="menuData" @onSelect="selectHandle"></Menu>
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
	private menuData: any[] = [
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

	userExit(data: any): void {
		// console.log("退出登陆", data);
	}

	toggleMenuHandle(data: any): void {
		let item: any
		function find(data: any[], target: any): void {
			for (let i: number = 0; i < data.length; i++) {
				if (target.id === data[i].id) {
					item = data[i]
					return
				}
				if (data[i].children) {
					find(data[i].children, target)
				}
			}
		}

		find(this.menuData, data)

		item.collapse = !item.collapse
	}

	selectHandle(data: any): void {
		let item: any
		function find(data: any[], target: any): void {
			for (let i: number = 0; i < data.length; i++) {
				if (target.id === data[i].id) {
					item = data[i]
				}
				data[i].collapse && (data[i].collapse = false)
				if (data[i].children) {
					find(data[i].children, target)
				}
			}
		}

		find(this.menuData, data)
		if (item.children && item.children.length) {
			item.collapse = true
			this.$router.push({ path: item.children[0].router })
		}
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