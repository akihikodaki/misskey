<template>
<div class="mk-images">
	<mk-images-image v-for="image in images" ref="image" :image="image" :key="image.id"/>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: ['images'],
	mounted() {
		const tags = this.$refs.image as Vue[];

		if (this.images.length == 1) {
			(this.$el.style as any).gridTemplateRows = '1fr';

			(tags[0].$el.style as any).gridColumn = '1 / 2';
			(tags[0].$el.style as any).gridRow = '1 / 2';
		} else if (this.images.length == 2) {
			(this.$el.style as any).gridTemplateColumns = '1fr 1fr';
			(this.$el.style as any).gridTemplateRows = '1fr';

			(tags[0].$el.style as any).gridColumn = '1 / 2';
			(tags[0].$el.style as any).gridRow = '1 / 2';
			(tags[1].$el.style as any).gridColumn = '2 / 3';
			(tags[1].$el.style as any).gridRow = '1 / 2';
		} else if (this.images.length == 3) {
			(this.$el.style as any).gridTemplateColumns = '1fr 0.5fr';
			(this.$el.style as any).gridTemplateRows = '1fr 1fr';

			(tags[0].$el.style as any).gridColumn = '1 / 2';
			(tags[0].$el.style as any).gridRow = '1 / 3';
			(tags[1].$el.style as any).gridColumn = '2 / 3';
			(tags[1].$el.style as any).gridRow = '1 / 2';
			(tags[2].$el.style as any).gridColumn = '2 / 3';
			(tags[2].$el.style as any).gridRow = '2 / 3';
		} else if (this.images.length == 4) {
			(this.$el.style as any).gridTemplateColumns = '1fr 1fr';
			(this.$el.style as any).gridTemplateRows = '1fr 1fr';

			(tags[0].$el.style as any).gridColumn = '1 / 2';
			(tags[0].$el.style as any).gridRow = '1 / 2';
			(tags[1].$el.style as any).gridColumn = '2 / 3';
			(tags[1].$el.style as any).gridRow = '1 / 2';
			(tags[2].$el.style as any).gridColumn = '1 / 2';
			(tags[2].$el.style as any).gridRow = '2 / 3';
			(tags[3].$el.style as any).gridColumn = '2 / 3';
			(tags[3].$el.style as any).gridRow = '2 / 3';
		}
	}
});
</script>

<style lang="stylus" scoped>
.mk-images
	display grid
	grid-gap 4px
	height 256px

	@media (max-width 500px)
		height 192px
</style>
