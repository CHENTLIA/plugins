;(function(window, document){
    var defaultOption = {
        pageation: true,
        autoplay: true,
        times: 1000,
        eventType: 'click'  //默认设置eventType = 'click'
    }
    var Swipper = function (targetDom, options){ 
        if(!(this instanceof Swipper)){
            return new Swipper(targetDom, options);
        }
        var self = this;
        self = Object.assign(self, defaultOption, options);
        if((typeof targetDom) === 'string') {
            this.targetDom = document.querySelector(targetDom)
        }else {
            this.targetDom = targetDom;
        }
        this.bannerLi = this.targetDom.querySelectorAll('li');
        var pLi,
            pUl = document.createElement('ul');
        for(var i = 0, len = this.bannerLi.length; i < len; i++){
            pLi = document.createElement('li');
            if(this.bannerLi[i].classList.contains('on')){
                this.index = i;
                pLi.className = 'on';
                pUl.appendChild(pLi);
            }else{
                pUl.appendChild(pLi);
            }
        }
        pUl.className = 'pageSelect';
        if(this.pageation){
            document.querySelector('#slideBanner').appendChild(pUl);
            this.pUl = document.querySelector('.pageSelect');
            this.pLi = this.pUl.querySelectorAll('li')
        }
        var prev = document.createElement('div'),
            next = document.createElement('div');
        prev.innerHTML = '<';
        prev.classList = 'prev handle';
        next.innerHTML = '>';
        next.classList = 'next handle';
        if(this.prevBtn){
            document.querySelector('#slideBanner').appendChild(prev);
            document.querySelector('#slideBanner').appendChild(next);
        }
        this.init();
    }
    var timer = null;
    Swipper.prototype = {
        init: function () { 
            if(this.autoplay){
                this.autoPlay();
            }
            if(this.prevBtn){
                this.prev();
                this.next();
            }   
            this.onmouseover();
            this.onmouseout();
            this.event()
            console.log(this.targetDom)
        },
        autoPlay: function () {
            timer = setInterval( () => { 
                if(this.index == 2) {
                    this.index = 0;
                    this.targetDom.style.left = 0 + 'px';
                }else{
                    this.index ++;
                    this.targetDom.style.left = -(this.bannerLi[this.index].clientWidth) * (this.index) + 'px';
                }
                this.targetDom.style.transition = 'all'+' '+ this.toggleTime +' ' +'linear';
                this.moveTo();
            }, this.times)
        },
        prev: function () { 
            var self = this;
            document.querySelector('.prev').addEventListener('click', () => { 
                clearInterval(timer);
                if(self.index>0){
                    self.index--;
                }else if(self.index==0) {
                    self.index = self.bannerLi.length - 1;
                }
                self.targetDom.style.transition = 'all 0.5s linear';
                self.targetDom.style.left = -(self.bannerLi[self.index].clientWidth) * (self.index) + 'px';
                self.moveTo();
            })
        },
        next: function () { 
            var self = this;
            document.querySelector('.next').addEventListener('click', () => { 
                clearInterval(timer);
                if(self.index<self.bannerLi.length - 1){
                    self.index++;
                }else if(self.index==self.bannerLi.length - 1) {
                    self.index = 0;
                }
                self.targetDom.style.transition = 'all'+' '+ self.toggleTime +' ' +'linear';
                self.targetDom.style.left = -(self.bannerLi[self.index].clientWidth) * (self.index) + 'px';
                self.moveTo()
            })
        },
        onmouseover: function () { 
            // var self = this;
            document.getElementById('slideBanner').addEventListener('mouseover', () => {
                clearInterval(timer);
            })
        },
        onmouseout: function () { 
            var self = this;
            document.getElementById('slideBanner').addEventListener('mouseout', () => {
                self.autoPlay();
            })
        },
        event: function () { 
            var self = this;
            var pageSelectLi = self.pLi;
            for(var i = 0, len = pageSelectLi.length; i < len; i++) {
                (function (num) { 
                    pageSelectLi[num].addEventListener(self.eventType, () => { 
                        self.index = num;
                        self.targetDom.style.transition = 'all'+' '+ self.toggleTime +' ' +'linear';
                        self.targetDom.style.left = -(self.bannerLi[self.index].clientWidth) * (self.index) + 'px';
                        self.moveTo();
                    })
                })(i)
            }
        },
        moveTo: function () { 
            var self = this;
            
            for(var i = 0, len = self.pLi.length; i < len; i++) {
                self.pLi[i].classList.remove('on');
                self.bannerLi[i].classList.remove('on');
            }
            self.pLi[self.index].classList.add('on')
            self.bannerLi[self.index].classList.add('on')
        }
    }
    window.Swipper = Swipper;
}(window,document))