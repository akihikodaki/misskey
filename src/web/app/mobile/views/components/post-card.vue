<template>
<div class="mk-post-card">
	<a :href="`/${post.user.username}/${post.id}`">
		<header>
			<img :src="`${post.user.avatar_url}?thumbnail&size=64`" alt="avatar"/><h3>{{ post.user.name }}</h3>
		</header>
		<div>
			{{ text }}
		</div>
		<mk-time :time="post.created_at"/>
	</a>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import summary from '../../../../../common/get-post-summary';

export default Vue.extend({
	props: ['post'],
	computed: {
		text(): string {
			return summary(this.post);
		}
	}
});
</script>

<style lang="stylus" scoped>
.mk-post-card
	display inline-block
	width 150px
	//height 120px
	font-size 12px
	background #fff
	border-radius 4px

	> a
		display block
		color #2c3940

		&:hover
			text-decoration none

		> header
			> img
				position absolute
				top 8px
				left 8px
				width 28px
				height 28px
				border-radius 6px

			> h3
				display inline-block
				overflow hidden
				width calc(100% - 45px)
				margin 8px 0 0 42px
				line-height 28px
				white-space nowrap
				text-overflow ellipsis
				font-size 12px

		> div
			padding 2px 8px 8px 8px
			height 60px
			overflow hidden
			white-space normal

			&:after
				content ""
				display block
				position absolute
				top 40px
				left 0
				width 100%
				height 20px
				background linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #fff 100%)

		> .mk-time
			display inline-block
			padding 8px
			color #aaa

</style>
