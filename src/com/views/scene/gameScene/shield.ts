module com.views.ui.scene.gameScene {
    export class shield extends com.views.ui.BasicView {

        private  armature: dragonBones.Armature;
        private  item;
        
        public id="shield";

        posType:number = 0;//位置参数
        lOrR:number = 1;//0为luzhang  1 为 round

        isEnd:boolean = false;
        isHit:boolean = false;

        gap:number = 10;

        constructor() {
            super();
            this.initRound();
        }

        initRound():void{
            var dragonbonesData = RES.getRes("items/json");
            var textureData = RES.getRes("items/texture");
            var texture = RES.getRes("items/png");
            
            var dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
            dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));
            this.armature = dragonbonesFactory.buildArmature("Armature");
            
            
            this.item=this.armature.display;
            this.addChild(this.item);
            
            //this.tweenGoToBottom();
            this.item.anchorOffsetX = this.width/2;
            this.item.anchorOffsetY = this.height/2;
            this.item.x = this.width/2;
            this.item.y = this.height/2;
//            this.scaleX = .8;
//            this.scaleY = .8;
            
            this.armature.animation.gotoAndPlay("logo",-1,-1,-0);

//            dragonBones.WorldClock.clock.add(this.armature);
//
//            egret.Ticker.getInstance().register(this.dragonbones,this);
        }
        

        dragonbones(advancedTime: number): void {
            dragonBones.WorldClock.clock.advanceTime(advancedTime / 5000);
        }
        
        protected onRemoveStage(e: egret.Event) {//移除

            super.onRemoveStage(e);
//            dragonBones.WorldClock.clock.remove(this.armature);
//            egret.Ticker.getInstance().unregister(this.dragonbones,this);
        }

        setPos(x:number,y:number):void{
            this.x = x;
            this.y = y;
        }

        tweenGoToBottom():void{
            egret.Tween.get(this).to({y:com.model.DataCenter.instance.configVO.appHeight-50},1500).call(function(){
                //this.parent.removeChild(this);
                if(!this.isHit){
                    this.isEnd = true;

//                    egret.setTimeout(function(){

                        egret.Tween.get(this.item,{loop:false}).to({scaleX:3,scaleY:3,alpha:0},800)

//                    },this, 400, [""]);
                }
            }.bind(this));


        }

        roundEnd():void{
            if(!this.isHit){
                this.isEnd = true;
                egret.Tween.get(this.item,{loop:false}).to({scaleX:3,scaleY:3,alpha:0},800)
            }
        }

        update():void{

            if(this.isEnd)return;
            this.y+=this.gap;

            if(this.y>=com.model.DataCenter.instance.configVO.appHeight-50){
                this.roundEnd();
            }
        }

    }


}
