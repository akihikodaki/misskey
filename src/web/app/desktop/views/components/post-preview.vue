<template>
<div class="mk-post-preview" :title="title">
	<router-link class="avatar-anchor" :to="`/${post.user.username}`">
		<img class="avatar" :src="`${post.user.avatar_url}?thumbnail&size=64`" alt="avatar" v-user-preview="post.user_id"/>
	</router-link>
	<div class="main">
		<header>
			<router-link class="name" :to="`/${post.user.username}`" v-user-preview="post.user_id">{{ post.user.name }}</router-link>
			<span class="username">@{{ post.user.username }}</span>
			<router-link class="time" :to="`/${post.user.username}/${post.id}`">
				<mk-time :time="post.created_at"/>
			</router-link>
		</header>
		<div class="body">
			<mk-sub-post-content class="text" :post="post"/>
		</div>
	</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import dateStringify from '../../../common/scripts/date-stringify';

export default Vue.extend({
	props: ['post'],
	computed: {
		title(): string {
			return dateStringify(this.post.created_at);
		}
	}
});
</script>

<style lang="stylus" scoped>
.mk-post-preview
	font-size 0.9em
	background #fff

	&:after
		content ""
		display block
		clear both

	&:hover
		> .main > footer > button
			color #888

	> .avatar-anchor
		display block
		float left
		margin 0 16px 0 0

		> .avatar
			display block
			width 52px
			height 52px
			margin 0
			border-radius 8px
			vertical-align bottom

	> .main
		float left
		width calc(100% - 68px)

		> header
			display flex
			white-space nowrap

			> .name
				margin 0 .5em 0 0
				padding 0
				color #607073
				font-size 1em
				font-weight bold
				text-decoration none
				white-space normal

				&:hover
					text-decoration underline

			> .username
				margin 0 .5em 0 0
				color #d1d8da

			> .time
				margin-left auto
				color #b2b8bb

		> .body

			> .text
				cursor default
				margin 0
				padding 0
				font-size 1.1em
				color #717171

</style>
