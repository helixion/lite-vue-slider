<template>
	<div class="slider-controls">
        <button class="prev" role="button" :disabled="isPrevDisabled" @click="prev">
          <span>&#9668;</span>
        </button>
        <button class="next" role="button" :disabled="isNextDisabled" @click="next">
          <span>&#9658;</span>
        </button>
    </div>
</template>

<script>
export default {
	props: {
		isPrevDisabled: {
			type: Boolean,
			required: true
		},
		isNextDisabled: {
			type: Boolean,
			required: true
		}
	},
	methods: {
		prev() {
			this.$emit('prev');
		},
		next() {
			this.$emit('next');
		}
	}
}	
</script>