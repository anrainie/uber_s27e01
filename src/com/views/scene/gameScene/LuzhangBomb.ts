module com.views.ui.scene.gameScene {
    export class luzhangBomb extends com.views.ui.BasicView {


        system:particle.GravityParticleSystem;

        constructor() {
            super();
            this.initLuzhangBomb();
        }

        initLuzhangBomb():void{

            var texture = RES.getRes("luzhang");
            var config = RES.getRes("luzhangjson");
            this.system = new particle.GravityParticleSystem(texture, config);

            this.system.start(400);

            this.addChild(this.system);




        }
        protected onRemoveStage(e: egret.Event) {//移除
            super.onRemoveStage(e);
            this.system.stop(true);
            this.system = null;


        }

        setPos(x:number,y:number):void{
            this.x = x;
            this.y = y;

        }

    }
}

