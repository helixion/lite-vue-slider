<template>
	<div id="slider-container" :style="{ height: sliderHeight + 'px'}">
	    <div class="slider-box">
	    	<div class="slider-overflow" :style="{ width: dimensions.width + 'px', height: dimensions.height + 'px' }">
	    		<div class="slider-mover" :style="animate">
	    			<image-slide 
			           v-for="(slide, index) in newSlides"
			           :slide="slide"
			           @mouseenter.native="isPaused = true"
			           @mouseleave.native="isPaused = false"
			           :key="index">   	
			        </image-slide>
	    		</div>
	    	</div>   
            <slide-controls 
          		@prev="prev" 
          		@next="next" 
          		:isPrevDisabled="isFirstSlide" 
          		:isNextDisabled="isLastSlide">
          	</slide-controls>
        </div>
    	<side-widget 
    		:slides="newSlides" 
    		:currentSlide="currentSlideIndex"
    		@setSlideIndex="setSlide">		
    	</side-widget>
  </div>
</template>

<script>
import Slide from './Slide.vue';
import SlideControls from './SlideControls.vue';
import SideWidget from './SideWidget.vue';

export default {
	mounted() {
		this.initSlides();
		this.startTimer(this.currentSlideIndex);
	},

	destroyed() {
		clearInterval(this.timer);
	},

	components: {
		imageSlide: Slide,
		slideControls: SlideControls,
		sideWidget: SideWidget
	},

	props: {
		slides: {
			type: Array,
			required: true
		},
		autoSlide: {
			type: Boolean,
			default: () => true
		},
		sliderHeight: {
			type: Number,
			default: () => 400
		},
		duration: {
			type: Number,
			default: () => 10000
		},
		speed: {
			type: Number,
			default: () => 600
		}
	},

	data() {
		return {
			newSlides: [],
			currentSlideIndex: 0,
			position: 0,
			timer: null,
			isPaused: false,
			dimensions: {
				width: 0,
				height: 0,
			}

		}
	},

	methods: {
		setScrollBar() {
			const el = document.querySelector('.is-active');
			const sideWidgetHeight = el.parentNode.clientHeight;

			if (el.parentNode.scrollHeight > sideWidgetHeight) {
				if (this.isFirstSlide) {
					el.parentNode.scrollTop = 0;
				} else if (this.isLastSlide) {
					el.parentNode.scrollTop = el.parentNode.scrollHeight;
				} else {
					el.parentNode.scrollTop = el.offsetTop;
				}
				
			}
		},

	    initSlides() {
	        const sliderBox = document.querySelector('.slider-box');
	        const sliderBoxWidth = sliderBox.clientWidth;
	        const sliderBoxHeight = sliderBox.clientHeight;

	        this.dimensions.width = Number(sliderBoxWidth); 
	        this.dimensions.height = Number(sliderBoxHeight);


	        this.newSlides = this.slides.map((slide, index) => {
	        	try {
	        		if (typeof slide === 'object' && slide && !Array.isArray(slide)) {
	        			if (slide.hasOwnProperty('title') && slide.hasOwnProperty('body')) {
	        				return {
					      		...slide,
					      		xPos: (this.dimensions.width * index),
					      		progress: 0
			      			};
	        			} else {
	        				throw new Error(`Object at index(${index}) does not have a body and/or title property`);
	        			}
		        		
		        	} else {
		        		throw new Error(`Type wasn't of type object. index: ${index}`);
		        	}
	        	} 
	        	catch(e) {
	        		console.error(e);
	        	}
	        });
	    },

	    startTimer() {
	    	if (this.autoSlide) {
	    		
	    		if (!this.timer) {
	    			const interval = (this.duration / 100);

	    			this.timer = setInterval(() => {
	    				if (this.newSlides[this.currentSlideIndex].progress === 100) {
	    					if (this.isLastSlide) {
	    						this.setSlide(0);
	    					} else {
	    						this.next();
	    					}
	    				} else {
	    					if (!this.isPaused) {
	    						this.newSlides[this.currentSlideIndex].progress++;
	    					}
	    				}
	    			}, interval);
	    		}
	    	}
	    },

	    restartTimer() {
	    	clearInterval(this.timer);
	    	this.timer = null;

	    	const slide = this.newSlides.find(slide => slide.progress > 0);
	    	if (slide) {
	    		slide.progress = 0;
	    	}
	    	this.setScrollBar();

	    	//stagger the timer so we get the full slide transition.
	    	setTimeout(() => {
	    		this.startTimer();
	    	}, this.speed);
	    	
	    },

	    prev() {
		    if (this.isFirstSlide) return;
		    this.currentSlideIndex--;
		    this.position -= -this.dimensions.width;
		    this.restartTimer();
	    },

	    next() {
	        if (this.isLastSlide) return;
	        this.currentSlideIndex++;
	      	this.position -= this.dimensions.width;
	      	this.restartTimer();
	      	
	        
	    },

	    setSlide(i) {
	    	this.currentSlideIndex = i;
	    	this.position = -this.newSlides[i].xPos;
	    	if (this.timer) {
	    		this.restartTimer();
	    	}
	    	
	    }
      
  	},
  	computed: {
  		isFirstSlide() {
  			return this.currentSlideIndex === 0;
  		},
  		isLastSlide() {
  			const lastSlide = this.newSlides.length - 1;
  			return this.currentSlideIndex === lastSlide;
  		},
  		animate() {
  			return { 'transition-duration': `${this.speed}ms`, 'transform': `translate3d(${this.position}px, 0px, 0px)`, 'transition-timing-function': 'cubic-bezier(0.445, 0.05, 0.55, 0.95)'};
  		}
  	}
}	
</script>

<style src="./styles.css"></style>
<style lang="scss" scoped>@import url('https://fonts.googleapis.com/css?family=Lato:700');</style>