<template>
	<div class="slider-image" :style="{ left: slide.xPos + 'px' }">
		<img :src="slide.img" :alt="slide.body" style="width: 100%; height: 100%;">
        <div class="slider-info">
          <h4>{{slide.title}}</h4>
          {{slide}}
        </div>
        <div class="slider-bar-primary">
      		<div class="slider-bar-secondary" :style="{ width: slide.progress + '%' }"></div>
      	</div>
    </div>
</template>

<script>
import {truncateString} from './util';

export default {
	props: {
		slide: {
			type: Object,
			required: true
		},
	},
	computed: {
		body() {
			return truncateString(this.slide.body, 100, true);
		}
	},
}
</script>

<style>
.slider-bar-primary {
	width: 100%;
	background-color: rgba(255,255,255,0.5);
	height: 5px;
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 10000;
}

.slider-bar-secondary {
	width: 0%;
	height: inherit;
	background-color: red;
}	
</style>