## imgload.js
imgload.js是一款基于jQuery的图片惰性加载插件，能够提高网站的响应速度。配合瀑布流，能够更好的展示图片效果  
### 一丶使用：
HTML:
```javascript  
<img src="loading.gif" data-imgload="src" width="500px" height="500px">

```  
在src中填写用于加载前显示的gif图片，`data-imgload`中填写图片真正的地址，需要指明图片的`宽度`和`高度`
便于，插件对图片的处理和排版。


JS引用：

```javascript  
<script src="./js/jquery-1.11.2.js"></script>
<script src="./js/imgload.js"></script>
<script>
    jQuery(document).ready(function($) {
		$("img").imgload({可选参数})
	});	
</script>
```
###二丶定制：
```javascript  
    var defaults={
        container:window,    //加载的图片的父容器
    	loadEvent:"scroll",  //默认加载触发事件
		animate:"fadeIn",    //图片加载的动画效果
		animateTime:500,     //动画时间
		skipDisplay:true,    //是否跳过隐藏（不可见）元素
		heightShow:0,		//图片进入可视区域高度后加载
		loading:null,		//图片加载时候的出发的事件
		loaded:null,		 //图片加载后触发的事件
	}
```

