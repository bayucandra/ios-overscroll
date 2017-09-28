class biqIosOverscroll{

    constructor(){
        // this.init();
        this.config = {
            limit_top : 30
        };
        this.state = {
            previously_disabled: false, //For touchend detect that it was disabled
            enable_scroll : false,
            is_panning: false,
            touch_time_start: null,
            touch_time_end: null,
            touch_time_delta: 0,
            scroll_y_current: 0,
            scroll_x_current: 0,
            y_start: 0,
            y_end: 0,
            y_delta: 0,// ( - ) on scroll up, ( + ) on scrolldown
            scroll_smooth: {
                timeout_fn: null
            }
        };

    }

    init(){
        if(window.scrollY>this.config.limit_top){
            this.state.enable_scroll = true;
        }
        window.addEventListener('touchstart', (e)=>this.onTouchstart(e));
        window.addEventListener('touchmove', (e)=>this.onTouchmove(e) ,{passive: false});
        window.addEventListener('touchend', (e)=>this.onTouchend(e), {passive: false});
        window.addEventListener('scroll', (e)=>this.onScroll(e));

    }

    onTouchstart(e){
        this.state.touch_time_start = $.now();
        this.state.y_start = e.touches[0].clientY;
        this.state.scroll_y_current = window.scrollY;
        this.state.scroll_x_current = window.scrollX;
        this.state.is_panning = true;
        if(!this.state.enable_scroll){
            this.state.previously_disabled = true;
        }
    }

    onTouchmove(e){
        this.state.y_end = e.touches[0].clientY;
        let scroll_pos = window.scrollY;
        this.state.y_delta = Math.abs(this.state.y_end) - Math.abs(this.state.y_start);
        // console.log(this.state.y_delta);

        let is_limit = scroll_pos <= this.config.limit_top;
        // console.log(is_limit);
        if(!is_limit){
            // console.log('Enabling scroll');
            this.state.enable_scroll = true;
        }else{
            // console.log('Disabling scroll');
            this.state.enable_scroll = false;
        }

        if(!this.state.enable_scroll || this.state.previously_disabled){
            let scroll_pos = 0;
            let is_pan_up = this.state.y_delta<0;
            if(is_pan_up){//if scroll up
                scroll_pos = this.state.scroll_y_current + Math.abs( this.state.y_delta );
            }else{//if scroll down
                scroll_pos = this.state.scroll_y_current - this.state.y_delta;
            }

            // console.log(is_pan_up);
            window.scrollTo(this.state.scroll_x_current, scroll_pos);

            e.preventDefault();
        }

        // console.log(this.state.enable_scroll);
    }

    onTouchend(e){
        this.state.touch_time_end = $.now();
        this.state.touch_time_delta = this.state.touch_time_end - this.state.touch_time_start;

        let scroll_pos = window.scrollY;
        let is_limit_top = scroll_pos <= this.config.limit_top;
        let is_pan_up = this.state.y_delta < 0;
        this.state.is_panning = false;
        /*            console.log(JSON.stringify( {
                        is_limit_top: is_limit_top,
                        is_pan_up: is_pan_up,
                        previously_disabled: this.state.previously_disabled
                    } ));*/
        let is_touchmove_fast = this.state.touch_time_delta < 500;
        let is_touchmove_far = Math.abs(this.state.y_delta) > 50;
        if(!is_limit_top && is_pan_up && this.state.previously_disabled && this.state.enable_scroll && is_touchmove_fast && is_touchmove_far){
            e.preventDefault();
            // console.log('animate');
            $('html, body').stop().animate({scrollTop: scroll_pos+125}, 300);
        }
        this.state.previously_disabled = false;
    }

    onScroll(e){
        if(this.state.is_panning){
            return;
        }
        let scroll_pos = window.scrollY;
        let is_limit_top = scroll_pos<=this.config.limit_top;
        let is_scroll_down = this.state.y_delta > 0;
        if(is_limit_top && is_scroll_down && (scroll_pos!==0)){
            this.state.enable_scroll = false;
            window.scrollTo(0, 0);
            e.preventDefault();
        }
        /*        console.log(JSON.stringify({
                    is_limit_top: is_limit_top,
                    is_scroll_down: is_scroll_down,
                    scroll_pos: scroll_pos,
                    y_delta: this.state.y_delta,
                    y_start: this.state.y_start,
                    y_end: this.state.y_end
                }));*/
    }
}
export {biqIosOverscroll}