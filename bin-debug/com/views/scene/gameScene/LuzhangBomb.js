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
                    var luzhangBomb = (function (_super) {
                        __extends(luzhangBomb, _super);
                        function luzhangBomb() {
                            _super.call(this);
                            this.initLuzhangBomb();
                        }
                        var d = __define,c=luzhangBomb,p=c.prototype;
                        p.initLuzhangBomb = function () {
                            var texture = RES.getRes("luzhang");
                            var config = RES.getRes("luzhangjson");
                            this.system = new particle.GravityParticleSystem(texture, config);
                            this.system.start(400);
                            this.addChild(this.system);
                        };
                        p.onRemoveStage = function (e) {
                            _super.prototype.onRemoveStage.call(this, e);
                            this.system.stop(true);
                            this.system = null;
                        };
                        p.setPos = function (x, y) {
                            this.x = x;
                            this.y = y;
                        };
                        return luzhangBomb;
                    }(com.views.ui.BasicView));
                    gameScene.luzhangBomb = luzhangBomb;
                    egret.registerClass(luzhangBomb,'com.views.ui.scene.gameScene.luzhangBomb');
                })(gameScene = scene.gameScene || (scene.gameScene = {}));
            })(scene = ui.scene || (ui.scene = {}));
        })(ui = views.ui || (views.ui = {}));
    })(views = com.views || (com.views = {}));
})(com || (com = {}));
