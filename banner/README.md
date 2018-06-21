banner图的使用方法。

我在这里设置的是在  
<div id="slideBanner"></div>下包含的ul来放置banner 图

options需要传入的参数是：
    <pre>
    options{
        autoplay: true,     //设置自动播放
        times: 1000,         //interval的时间
        pageation: true,     //圆点
        prevBtn: true,       //向左按钮
        nextBtn: true,       // 向右按钮
        eventType: 'click',  //设置圆点的事件 插件默认是click
        toggleTime: '0.5s'   //设置运动时间
    }
    </pre>
目前还有一些问题后期解决，前端的美化，以及无缝的轮播