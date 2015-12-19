var getFlag=function (id) {
  return document.getElementById(id);   //��ȡԪ������
}
var extend=function(des, src) {
   for (p in src) {
     des[p]=src[p];
  }
  return des;
}
var clss=['one','two','three','four','five','six','seven','eight','nine','ten'];
var Ball=function (diameter,classn) {
    var ball=document.createElement("div");
    ball.className=classn;
    with(ball.style) {
      width=height=diameter+'px';position='absolute';
    }
    return ball;
}
var Screen=function (cid,config) {
    //�ȴ����������
    var self=this;
    if (!(self instanceof Screen)) {
        return new Screen(cid,config)
    }
    config=extend(Screen.Config, config)    //configj��extend���ʵ��    self.container=getFlag(cid);            //���ڶ���
    self.container=getFlag(cid);
    self.ballsnum=config.ballsnum;
    self.diameter=80;                       //���ֱ��
    self.radius=self.diameter/2;
    self.spring=config.spring;              //��������ķ�����
    self.bounce=config.bounce;              //���������ڱ߽��ķ�����
    self.gravity=config.gravity;            //�������
    self.balls=[];                          //�Ѵ����������ڸ��������
    self.timer=null;                       //���ú���������ʱ��id
    self.L_bound=0;                       //container�ı߽�
    self.R_bound=self.container.clientWidth;  //document.documentElement.clientWidth || document.body.clientWidth ������
    self.T_bound=0;
    self.B_bound=self.container.clientHeight;
};
Screen.Config={                         //Ϊ���Ը���ֵ
    ballsnum:10,
    spring:0.8,
    bounce:-0.9,
    gravity:0.05
};
Screen.prototype={
    initialize:function () {
        var self=this;
        self.createBalls();
        self.timer=setInterval(function (){self.hitBalls()}, 30)
    },
    createBalls:function () {
        var self=this, 
            num=self.ballsnum;
        var frag=document.createDocumentFragment();    //�����ĵ���Ƭ��������ˢ��       
        for (i=0;i<num;i++) {
            var ball=new Ball(self.diameter,clss[i]);
            //var ball=new Ball(self.diameter,clss[ Math.floor(Math.random()* num )]);//�����������10��С�����ײЧ��
            ball.diameter=self.diameter;
            ball.radius=self.radius;
            ball.style.left=(Math.random()*self.R_bound)+'px';  //��ĳ�ʼλ�ã�
            ball.style.top=(Math.random()*self.B_bound)+'px';
            ball.vx=Math.random() * 6 -3;
            ball.vy=Math.random() * 6 -3;
            frag.appendChild(ball);
            self.balls[i]=ball;
        }
        self.container.appendChild(frag);
    },
    hitBalls:function () {
        var self=this, 
            num=self.ballsnum,
            balls=self.balls;
        for (i=0;i<num-1;i++) {
           var ball1=self.balls[i];
           ball1.x=ball1.offsetLeft+ball1.radius;      //С��Բ������
           ball1.y=ball1.offsetTop+ball1.radius;
           for (j=i+1;j<num;j++) {
               var ball2=self.balls[j];
               ball2.x=ball2.offsetLeft+ball2.radius;
               ball2.y=ball2.offsetTop+ball2.radius;
               dx=ball2.x-ball1.x;                      //��С��Բ�ľ��Ӧ������ֱ�Ǳ�
               dy=ball2.y-ball1.y;
               var dist=Math.sqrt(dx*dx + dy*dy);       //��ֱ�Ǳ���Բ�ľ�
               var misDist=ball1.radius+ball2.radius;   //Բ�ľ���Сֵ
              if(dist < misDist) {                    
                   //������ײ����ᰴԭ���������һ�����˶������䶨��Ϊ�˶�A   
                   var angle=Math.atan2(dy,dx);
                  //���պ���������dist=misDistʱ��tx=ballb.x, ty=ballb.y
                   tx=ball1.x+Math.cos(angle) * misDist; 
                   ty=ball1.y+Math.sin(angle) * misDist;
                  //�����˶�A��tx > ballb.x, ty > ballb.y,������ax��ay��¼�����˶�A��ֵ
                   ax=(tx-ball2.x) * self.spring;  
                   ay=(ty-ball2.y) * self.spring;
                  //һ�����ȥax��ay����һ������������ʵ�ַ���
                   ball1.vx-=ax;                         
                   ball1.vy-=ay;
                   ball2.vx+=ax;
                   ball2.vy+=ay;
              }
           }
        }
        for (i=0;i<num;i++) {
            self.moveBalls(balls[i]);
        }
    },
    moveBalls:function (ball) {
        var self=this;
        ball.vy+=self.gravity;
        ball.style.left=(ball.offsetLeft+ball.vx)+'px';
        ball.style.top=(ball.offsetTop+ball.vy)+'px';
        //�ж����봰�ڱ߽��������ѱ�������һ��
        var L=self.L_bound, R=self.R_bound, T=self.T_bound, B=self.B_bound, BC=self.bounce;  
        if (ball.offsetLeft < L) {
            ball.style.left=L;
            ball.vx*=BC;
        }
       else if (ball.offsetLeft + ball.diameter > R) {
            ball.style.left=(R-ball.diameter)+'px';
            ball.vx*=BC;
        }
       else if (ball.offsetTop < T) {
            ball.style.top=T;
            ball.vy*=BC;
        }
        if (ball.offsetTop + ball.diameter > B) {
            ball.style.top=(B-ball.diameter)+'px';
            ball.vy*=BC;
        }
    }
}
window.onload=function() {
    var sc=null;
    document.getElementById("inner").innerHTML='';
        sc=new Screen('inner',{ballsnum:10, spring:0.3, bounce:-0.9, gravity:0.01});
        sc.initialize();
     getFlag('start').onclick=function () {
         document.getElementById("inner").innerHTML='';
         sc=new Screen('inner',{ballsnum:10, spring:0.3, bounce:-0.9, gravity:0.01});
         sc.initialize();
     }
     getFlag('stop').onclick=function() {
       clearInterval(sc.timer);
     }
}