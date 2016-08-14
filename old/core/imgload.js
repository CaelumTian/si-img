;(function($){
	var defaults={
		container:window,   //加载的图片的父容器
		loadEvent:"scroll", //默认加载触发事件
		animate:"fadeIn",   //图片加载的动画效果
		animateTime:500,   //动画时间
		skipDisplay:true,   //是否跳过隐藏（不可见）元素
		heightShow:0,		//图片进入可视区域高度后加载
		loading:null,		//图片加载时候的出发的事件
		loaded:null,		//图片加载后触发的事件
	}
	$.fn.imgload=function(options){
		var $element=$(this),
			settings=$.extend({},defaults,options),
			$container = (settings.container === undefined || settings.container === window) ? $(window) : $(settings.container);
		function init(){
			var count=0;
			$element.each(function(){
				var self=$(this);
				if(settings.skipDisplay && !$(this).is(":visible")){
					return false;
				}
				if(getTop(self) || getLeft(self)){

				}else if(!getUnder(self) && !getRight(self)){
					self.trigger("apper");
				}
			})
		}
		$element.each(function(){
			var self=$(this);
			this.loaded=false;    //为DOM元素添加属性，判断是否加载过（这里不能给jquery添加）
			self.one("apper", function(event) {
				var currentElement=this;   //获取当前元素信息
				if(!this.loaded){
					if(settings.loading !== null){
						settings.loading.call(this,$element.length);
						//这里是加载时函数
					}
					$("<img />")   //创建临时存储图片，用于检测图片加载情况
					.attr("src",self.data("imgload"))
					.on("load",function(){
						self.hide();
						self.attr("src",self.data("imgload"));
						self[settings.animate](settings.animateTime);    //图片隐藏，动画显示
						//console.log(currentElement.loaded);
						currentElement.loaded=true;                                //这里注意不能用self

						var temp=$.grep($element,function(el){
							return !el.loaded;         //删除图片中已经加载完毕的图片
						})
						$element=$(temp);
						if(settings.loaded !== null){
							settings.loading.call(this,$element.length);
							//这里是加载完成后的函数
						}
					})            //检测图片是否加载完毕
				}
			});
			if(settings.loadEvent !== "scroll"){
				self.on(settings.loadEvent,function(event){
					if(!this.loaded){
						self.trigger("apper");
					}
				})
			}
		}) //为每个匹配到的元素添加事件
		if(settings.loadEvent === "scroll"){
			$container.on("scroll",function(event){
				init();
			})
		}
		//窗口变化时重新加载
		$(window).on("resize",function(event){
			init();
		})
		init();
		//判断元素是否进入视口
		function getTop(element){
			var distance=NaN;
			if(settings.container === undefined || settings.container === window) {
	            distance=$(window).scrollTop(); 	//获取页面滚动条偏移
	        }else{
	            distance=$container.offset().Top;	//获取容器相对于视窗偏移
	        }
	        return distance >= (element.offset().top + settings.heightShow  + element.height());   //获取图片高度上是否离开可视区
		}
		function getLeft(element){
			var distance=NaN;
			if(settings.container === undefined || settings.container === window){
				distance=$(window).scrollLeft;
			}else{
				distance=$container.offset().left;
			}
			return distance >= (element.offset().left + settings.heightShow + element.width());
		}
		function getUnder(element){
			var distance=NaN;
			if(settings.container === undefined || settings.container === window){
				distance=$(window).height()+$(window).scrollTop();
			}else{
				distance=$container.offset().top+$container.height();
			}
			return distance <= (element.offset().top-settings.heightShow);   //判断图片高度上是否在可视区外
		}
		function getRight(element){
			var distance=NaN;
			if(settings.container === undefined || settings.container === window){
				distance=$(window).width()+$(window).scrollLeft();
			}else{
				distance=$container.offset().left+$container.width();
			}
			//console.log(element.offset().left - $container.width());
			return distance <= (element.offset().left - settings.heightShow);
		}
	}
})(jQuery)