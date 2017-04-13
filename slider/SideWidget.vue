<template>
	<div class="slider-side-widget">
		<div v-for="(slide, index) in slides" 
			:class="['widget-box', { 'is-active': currentSlide === index }]" 
			@click="setSlide(index)">
			<h4>{{slide.title}}</h4>
			<div class="widget-content">
				{{widgetContent(slide.body)}}
			</div>
		</div>
	</div>
</template>

<script>
import {truncateString} from './util';

export default {

	props: {
		slides: {
			type: Array,
			required: true
		},
		currentSlide: {
			type: Number,
			required: true
		}
	},

	methods: {
		setSlide(index) {
			this.$emit('setSlideIndex', index);
		},
		widgetContent(content) {
			return truncateString(content, 50, true);
		}
		
	}
}
</script>

<style scoped>
::-webkit-scrollbar {
	width: 5px;
	background-color: #232323;
}

::-webkit-scrollbar-thumb {
	width: auto;
	height: 90px;
	background-color: #555;
}

::-webkit-scrollbar-button:vertical:decrement {
  width: auto;
  background-color: #555;
}

::-webkit-scrollbar-button:vertical:increment {
  width: auto;
  background-color: #555;
}
</style>