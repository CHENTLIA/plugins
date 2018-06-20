;(function (window,document) { 
    var defaultOptions = {
        title: '提示',
        content: '这是提示框',
    };

    var MaskDialog = function (dom, options) { 
        if(!(this instanceof MaskDialog)){
            return new MaskDialog(dom, options);
        }
        var self = this;
        self = Object.assign(self, defaultOptions, options)
        console.log(self)
        if((typeof dom) === 'string'){
            this.dom = document.querySelector(dom);
        }else{
            this.dom = dom;
        }
        var boxDom = document.createElement('div');
        boxDom.className = 'mask';
        var contentBox = document.createElement('div');
        contentBox.className = 'maskBox';
        contentBox.innerHTML = `<div class="diaTitle">`+self.title+`</div><div class="diaContent">`+self.content+`</div><div></div>`;
        if(self.boxDomStyle) {
            this.setStyle(boxDom, self.boxDomStyle)
        }
        if(self.maskDomStyle) {
            this.setStyle(contentBox, self.maskDomStyle)
        }
        // imgDom.src = self.imgSrc;  
        boxDom.appendChild(contentBox);  
        this.boxDom = boxDom;  
        // 初始化  
        this.init();  
    }

    MaskDialog.prototype = {
        init: function () { 
            this.event();
        },
        extend: function (obj1, obj2) { 
            for( var k in obj2 ){
                obj1[k] = obj2[k]
            }
            return obj1;
        },
        setStyle: function (dom, objStyle) { 
            for(var k in objStyle) {
                dom.style[k] = objStyle[k];
            }
        },
        event: function() {
            var _that = this;
            this.dom.addEventListener('click', function () {  
                document.body.appendChild(_that.boxDom);
                if(document.querySelector('.mask')){
                    document.querySelector('.mask').style.display = 'block'
                }
            }, false)
            this.boxDom.addEventListener('click', function () { 
                this.style.display = 'none'    
            }, false)
        }
    }
    window.MaskDialog = MaskDialog
}(window,document))