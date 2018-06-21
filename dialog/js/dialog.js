;(function (window,document) { 
    var defaultOptions = {
        title: '提示',
        content: '这是提示框',
    };

    var MaskDialog = function (targetDom, options) { 
        if(!(this instanceof MaskDialog)){
            return new MaskDialog(targetDom, options);
        }
        var self = this;
        self = Object.assign(self, defaultOptions, options)
        if((typeof targetDom) === 'string'){
            self.targetDom = document.querySelector(targetDom)
        }else{
            self.targetDom = targetDom;
        }
        var maskBox = document.createElement('div');
        maskBox.className = 'mask';
        var maskContent = document.createElement('div');
        maskContent.className = 'maskBox';
        maskContent.innerHTML = `<div class = "diaTitle">
                                <p>`+self.title+`</p><span class="close">×</span>
                                </div><div class = "diaContent">
                                    <div class="contents">`+self.content+`</div>
                                    <div class="handleBtn">
                                        <div class="closeBtn">取消</div>
                                        <div class="submitBtn">确认</div>
                                    </div>
                                </div>`;
        maskBox.appendChild(maskContent);
        this.maskBox = maskBox;
        console.log(this.maskBox)
        this.init();
    }
    MaskDialog.prototype = {
        init: function () { 
            this.openDialog(); 
        },
        openDialog: function () { 
            var self = this;
            this.targetDom.addEventListener('click', function () { 
                if(document.querySelector('.mask')){
                    document.querySelector('.mask').style.display = 'block';
                }else{
                    document.body.appendChild(self.maskBox);
                }
                self.closeDialog();
                self.submitDialog()
            })
        },
        closeDialog: function () { 
            var self = this;
            if(document.querySelector('.mask')){
                document.querySelector('.close').addEventListener('click', () => {
                    document.querySelector('.mask').style.display = 'none';
                })
                document.querySelector('.closeBtn').addEventListener('click', () => {
                    document.querySelector('.mask').style.display = 'none';
                })
            }
            
        },
        submitDialog: function () { 
            document.querySelector('.submitBtn').addEventListener('click', () => {
                console.log('确定')
                document.querySelector('.mask').style.display = 'none';
            })
        }
    }
    window.MaskDialog = MaskDialog
}(window,document))