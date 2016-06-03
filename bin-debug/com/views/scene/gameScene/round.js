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
                    var round = (function (_super) {
                        __extends(round, _super);
                        function round() {
                            _super.call(this);
                            this.posType = 0; //位置参数
                            this.lOrR = 1; //0为luzhang  1 为 round
                            this.isEnd = false;
                            this.isHit = false;
                            this.id = "round";
                            this.gap = 10;
                            this.initRound();
                        }
                        var d = __define,c=round,p=c.prototype;
                        p.initRound = function () {
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
                            this.armature.animation.gotoAndPlay("zongzi", -1, -1, -0);
                            //            dragonBones.WorldClock.clock.add(this.armature);
                            //
                            //            egret.Ticker.getInstance().register(this.dragonbones,this);
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
                            egret.Tween.get(this).to({ y: com.model.DataCenter.instance.configVO.appHeight - 50 }, 1500).call(function () {
                                //this.parent.removeChild(this);
                                if (!this.isHit) {
                                    this.isEnd = true;
                                    //                    egret.setTimeout(function(){
                                    egret.Tween.get(this.item, { loop: false }).to({ scaleX: 3, scaleY: 3, alpha: 0 }, 800);
                                }
                            }.bind(this));
                        };
                        p.roundEnd = function () {
                            if (!this.isHit) {
                                this.isEnd = true;
                                egret.Tween.get(this.item, { loop: false }).to({ scaleX: 3, scaleY: 3, alpha: 0 }, 800);
                            }
                        };
                        p.update = function () {
                            if (this.isEnd)
                                return;
                            this.y += this.gap;
                            if (this.y >= com.model.DataCenter.instance.configVO.appHeight - 50) {
                                this.roundEnd();
                            }
                        };
                        return round;
                    }(com.views.ui.BasicView));
                    gameScene.round = round;
                    egret.registerClass(round,'com.views.ui.scene.gameScene.round');
                })(gameScene = scene.gameScene || (scene.gameScene = {}));
            })(scene = ui.scene || (ui.scene = {}));
        })(ui = views.ui || (views.ui = {}));
    })(views = com.views || (com.views = {}));
})(com || (com = {}));
