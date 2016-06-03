var com;
(function (com) {
    var views;
    (function (views) {
        var ui;
        (function (ui) {
            var scene;
            (function (scene) {
                var gameScene;
                (function (gameScene) {
                    var luzhang = (function (_super) {
                        __extends(luzhang, _super);
                        function luzhang() {
                            _super.call(this);
                            this.posType = 0; //位置参数
                            this.lOrR = 0; //0为luzhang  1 为 round
                            this.isEnd = false;
                            this.isHit = false;
                            this.gap = 10;
                            this.id = "luzhang";
                            this.broken = false;
                            this.initLuZhang();
                        }
                        var d = __define,c=luzhang,p=c.prototype;
                        p.initLuZhang = function () {
                            var dragonbonesData = RES.getRes("items/json");
                            var textureData = RES.getRes("items/texture");
                            var texture = RES.getRes("items/png");
                            var dragonbonesFactory = new dragonBones.EgretFactory();
                            dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
                            dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
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
                            this.armature.animation.gotoAndPlay("zhangai", -1, -1, -0);
                            //            dragonBones.WorldClock.clock.add(this.armature);
                            //
                            //            egret.Ticker.getInstance().register(this.dragonbones,this);
                            //this.tweenGoToBottom();
                            //            this.anchorOffsetX = this.width/2;
                            //            this.anchorOffsetY = this.height*3/4;
                            //            this.scaleX = 1.2;
                            //            this.scaleY = 1.2;
                        };
                        p.dragonbones = function (advancedTime) {
                            dragonBones.WorldClock.clock.advanceTime(advancedTime / 5000);
                        };
                        p.onRemoveStage = function (e) {
                            _super.prototype.onRemoveStage.call(this, e);
                            //            dragonBones.WorldClock.clock.remove(this.armature);
                            //            egret.Ticker.getInstance().unregister(this.dragonbones,this);
                        };
                        p.setPos = function (x, y) {
                            this.x = x;
                            this.y = y;
                        };
                        p.tweenGoToBottom = function () {
                            egret.Tween.get(this).to({ y: com.model.DataCenter.instance.configVO.appHeight + 50 }, 1500).call(function () {
                                //this.parent.removeChild(this);
                                this.isEnd = true;
                            }.bind(this));
                        };
                        p.update = function () {
                            if (this.isEnd)
                                return;
                            this.y += this.gap;
                            if (this.y >= com.model.DataCenter.instance.configVO.appHeight + 50) {
                                this.isEnd = true;
                            }
                        };
                        return luzhang;
                    }(com.views.ui.BasicView));
                    gameScene.luzhang = luzhang;
                    egret.registerClass(luzhang,'com.views.ui.scene.gameScene.luzhang');
                })(gameScene = scene.gameScene || (scene.gameScene = {}));
            })(scene = ui.scene || (ui.scene = {}));
        })(ui = views.ui || (views.ui = {}));
    })(views = com.views || (com.views = {}));
})(com || (com = {}));
