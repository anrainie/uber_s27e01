module com.views.ui.scene.gameScene {
    export class luzhang extends com.views.ui.BasicView {

        private armature: dragonBones.Armature;
        private item;
        bg:egret.Bitmap;

        posType:number = 0;//位置参数
        lOrR:number = 0;//0为luzhang  1 为 round

        isEnd:boolean = false;
        isHit:boolean = false;
        gap: number = 10; 
        public id = "luzhang";
        
        public broken = false;


        constructor() {
            super();
            this.initLuZhang();
        }

        initLuZhang():void{

            var dragonbonesData = RES.getRes("items/json");
            var textureData = RES.getRes("items/texture");
            var texture = RES.getRes("items/png");

            var dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
            dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));
            this.armature = dragonbonesFactory.buildArmature("Armature");


            this.item = this.armature.display;
            this.addChild(this.item);

            //this.tweenGoToBottom();
            this.item.anchorOffsetX = this.width / 2;
            this.item.anchorOffsetY = this.height / 2;
            this.item.x = this.width / 2;
            this.item.y = this.height / 2;
//            this.scaleX = .8;
//            this.scaleY = .8;

            this.armature.animation.gotoAndPlay("zhangai",-1,-1,-0);

//            dragonBones.WorldClock.clock.add(this.armature);
//
//            egret.Ticker.getInstance().register(this.dragonbones,this);
            
            //this.tweenGoToBottom();
//            this.anchorOffsetX = this.width/2;
//            this.anchorOffsetY = this.height*3/4;
//            this.scaleX = 1.2;
//            this.scaleY = 1.2;


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
            egret.Tween.get(this).to({y:com.model.DataCenter.instance.configVO.appHeight+50},1500).call(function(){
                //this.parent.removeChild(this);
                this.isEnd = true;
            }.bind(this));
        }

        update():void{
            if(this.isEnd)return;
            this.y+=this.gap;
            if(this.y>=com.model.DataCenter.instance.configVO.appHeight+50){
                this.isEnd = true;
            }
        }

    }
}
