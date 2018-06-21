这里是基本的弹出层组件

涉及到的功能不多

目前只是一个遮罩层，一个弹出框，点击按钮

用户调用方法

<pre>
    MaskDialog(dom,{  
        title: '',  
        content: ''  
    }); 
</pre>
options为可选
由于使用的事Object.assign()方法，在之后并没有做判断，所以当传入的有title或者content字段时，值不能为空。