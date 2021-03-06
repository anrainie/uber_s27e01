var com;
(function (com) {
    var views;
    (function (views) {
        var scene;
        (function (scene) {
            var GameScene = (function (_super) {
                __extends(GameScene, _super);
                function GameScene() {
                    _super.call(this);
                    this.score = 0;
                    this.spScore = 0;
                    this.age = 0;
                    this.spDuration = 3;
                    this.spCount = 0;
                    this.timeGap = 35;
                    this.lOrRMovrGap = 9;
                    this.levelChange = false;
                    this.leftArr = new Array();
                    this.rightArr = new Array();
                    this.gameOver = false;
                    //this.loading = new com.views.ui.loading.LoaderLoading("resource/resource.json?v=0","gameScene",this.onConfigComplete.bind(this));
                    //this.addChild(this.loading);
                    this.initGameLayout();
                }
                var d = __define,c=GameScene,p=c.prototype;
                p.onRemoveStage = function (e) {
                    _super.prototype.onRemoveStage.call(this, e);
                    this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                    this.bg = null;
                    this.carLeft = null;
                    this.carRight = null;
                    this.loading = null;
                    this.cloud = null;
                };
                p.onConfigComplete = function (e) {
                    this.initGameLayout();
                };
                p.initGameLayout = function () {
                    this.bg = new egret.Shape();
                    this.bg.graphics.beginFill(0x5096C8);
                    this.bg.graphics.drawRect(0, 0, com.model.DataCenter.instance.configVO.appWidth, com.model.DataCenter.instance.configVO.appHeight);
                    this.bg.graphics.endFill();
                    this.addChild(this.bg);
                    //绘制赛道
                    this.bg.graphics.beginFill(0x696969);
                    this.bg.graphics.drawRect(com.model.DataCenter.instance.configVO.appWidth / 4 - 3, 0, 6, com.model.DataCenter.instance.configVO.appHeight);
                    this.bg.graphics.endFill();
                    this.bg.graphics.beginFill(0x989898);
                    this.bg.graphics.drawRect(com.model.DataCenter.instance.configVO.appWidth / 2 - 3, 0, 6, com.model.DataCenter.instance.configVO.appHeight);
                    this.bg.graphics.endFill();
                    this.bg.graphics.beginFill(0x696969);
                    this.bg.graphics.drawRect(com.model.DataCenter.instance.configVO.appWidth * 3 / 4 - 3, 0, 6, com.model.DataCenter.instance.configVO.appHeight);
                    this.bg.graphics.endFill();
                    this.bg.graphics.beginFill(0x323232);
                    this.bg.graphics.drawRoundRect(com.model.DataCenter.instance.configVO.appWidth / 2 - 40, 46, 80, 57, 25, 25);
                    this.bg.graphics.endFill();
                    var carnum = com.utils.AppUtils.GetRandomNum(0, 7);
                    this.carLeft = new com.views.ui.scene.gameScene.car();
                    this.addChildAt(this.carLeft, 10);
                    this.carLeft.setPos(com.model.DataCenter.instance.configVO.appWidth / 8, com.model.DataCenter.instance.configVO.appHeight * 8.5 / 10);
                    this.carRight = new com.views.ui.scene.gameScene.car();
                    this.addChildAt(this.carRight, 10);
                    this.carRight.setPos(com.model.DataCenter.instance.configVO.appWidth * 5 / 8, com.model.DataCenter.instance.configVO.appHeight * 8.5 / 10);
                    this.carLeft.resetCar(carnum);
                    this.carRight.resetCar(carnum);
                    this.touchEnabled = true;
                    //云层
                    var cloudImg = RES.getRes("cloud");
                    this.cloud = new egret.Bitmap();
                    this.cloud.texture = cloudImg;
                    this.cloud.x = 0;
                    this.cloud.y = -this.cloud.height;
                    this.addChildAt(this.cloud, 11);
                    var tw = egret.Tween.get(this.cloud, { loop: false });
                    tw.to({ y: 0 }, 15000, egret.Ease.sineIn);
                    var panelBg = RES.getRes("scorePanel");
                    var scorePanel = new egret.Bitmap();
                    scorePanel.texture = panelBg;
                    scorePanel.x = (com.model.DataCenter.instance.configVO.appWidth - scorePanel.width) / 2;
                    scorePanel.y = 0;
                    this.addChildAt(scorePanel, 12);
                    this.scoreLabel = new egret.TextField;
                    this.scoreLabel.textColor = 0xf8f8f8;
                    this.scoreLabel.text = 0 + "";
                    this.scoreLabel.width = 80;
                    this.scoreLabel.anchorOffsetX = 40;
                    this.scoreLabel.size = 45;
                    this.scoreLabel.x = com.model.DataCenter.instance.configVO.appWidth / 2 + com.model.DataCenter.instance.configVO.appWidth / 10;
                    this.scoreLabel.y = 35;
                    this.scoreLabel.width = com.model.DataCenter.instance.configVO.appWidth / 2;
                    this.scoreLabel.textAlign = egret.HorizontalAlign.LEFT;
                    this.addChildAt(this.scoreLabel, 13);
                    this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                    this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                    com.controller.EventManager.instance.addEventListener(this, com.model.localData.event.TimerEvent.TIMER, this.onTimeEvent.bind(this));
                };
                p.onTimeEvent = function () {
                    if (this.gameOver)
                        return;
                    for (var i = 0; i <= this.leftArr.length - 1; i++) {
                        if (this.leftArr[i] != null) {
                            if (this.leftArr[i].isHit || this.leftArr[i].isEnd) {
                                this.leftArr[i] = null;
                            }
                        }
                    }
                    for (var i = 0; i <= this.rightArr.length - 1; i++) {
                        if (this.rightArr[i] != null) {
                            if (this.rightArr[i].isHit || this.rightArr[i].isEnd) {
                                this.rightArr[i] = null;
                            }
                        }
                    }
                    for (var i = 0; i <= this.leftArr.length - 1; i++) {
                        if (this.leftArr[i] == null) {
                            this.leftArr.splice(i, 1);
                        }
                    }
                    for (var i = 0; i <= this.rightArr.length - 1; i++) {
                        if (this.rightArr[i] == null) {
                            this.rightArr.splice(i, 1);
                        }
                    }
                };
                p.onEnterFrame = function (e) {
                    if (this.gameOver)
                        return;
                    this.age++;
                    if (this.age % 300 == 0) {
                        if (this.timeGap > 11) {
                            this.timeGap -= 1;
                            this.lOrRMovrGap += 1.5;
                            this.levelChange = true;
                        }
                    }
                    if ((this.age % (this.timeGap | 0)) == 0) {
                        if (this.levelChange) {
                            this.levelChange = false;
                            return;
                        }
                        //left
                        this.create(this.leftArr, 0, 1);
                        //right
                        this.create(this.rightArr, 2, 3);
                    }
                    //检查左侧赛道
                    this.check(this.leftArr, this.carLeft, -350, -180);
                    //检查右侧赛道
                    this.check(this.rightArr, this.carRight, 0, 140);
                };
                p.create = function (items, s, e) {
                    switch (com.utils.AppUtils.GetRandomNum(0, 2)) {
                        case 0: {
                            var luzhangs = this.luzhangFactory(com.utils.AppUtils.GetRandomNum(s, e));
                            items.push(luzhangs);
                            this.addChildAt(luzhangs, 13);
                            break;
                        }
                        case 1: {
                            this.spCount++;
                            if (this.spCount % this.spDuration == 0) {
                                var sp = this.shieldFactory(com.utils.AppUtils.GetRandomNum(s, e));
                                items.push(sp);
                                this.addChildAt(sp, 13);
                            }
                            else {
                                var rounds = this.roundFactory(com.utils.AppUtils.GetRandomNum(s, e));
                                items.push(rounds);
                                this.addChildAt(rounds, 13);
                            }
                            break;
                        }
                    }
                };
                /**
                 * 检查运动状态
                 */
                p.check = function (items, car, rx, lx) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i] == null)
                            continue;
                        items[i].update();
                        if (items[i].y >= com.model.DataCenter.instance.configVO.appHeight - 20) {
                            this.removeChild(items[i]);
                            items.splice(i, 1);
                            continue;
                        }
                        if (items[i].isHit || items[i].isEnd) {
                            this.removeChild(items[i]);
                            items.splice(i, 1);
                            continue;
                        }
                        var clx = car.x;
                        var cly = car.y;
                        var lax = items[i].x;
                        var lay = items[i].y;
                        if (com.utils.AppUtils.posDistance({ x: clx, y: cly }, { x: lax, y: lay }) < 10) {
                            switch (items[i].getType()) {
                                case com.constants.ItemConstant.BLOCK: {
                                    this.luZhangBomb = new com.views.ui.scene.gameScene.luzhangBomb();
                                    this.luZhangBomb.x = car.isLeftRight ? lx : rx;
                                    this.luZhangBomb.y = 450;
                                    this.addChild(this.luZhangBomb);
                                    if (car.hasShield) {
                                        car.setShield(false);
                                    }
                                    else {
                                        console.log("gameOver");
                                        car.broken();
                                        this.gameOverCallFunc();
                                    }
                                    break;
                                }
                                case com.constants.ItemConstant.SCORE: {
                                    this.score += 50;
                                    this.scoreLabel.text = this.score + "";
                                    break;
                                }
                                case com.constants.ItemConstant.SHILED: {
                                    this.score += 50;
                                    car.setShield(true);
                                    this.scoreLabel.text = this.score + "";
                                }
                            }
                            this.removeChild(items[i]);
                            items.splice(i, 1);
                        }
                    }
                };
                p.gameOverCallFunc = function () {
                    if (this.gameOver)
                        return;
                    this.gameOver = true;
                    console.log(egret.localStorage.getItem("highestScore"));
                    this.carLeft.stopArmature1Animation();
                    this.carRight.stopArmature1Animation();
                    if (parseInt(egret.localStorage.getItem("highestScore")) < this.score || egret.localStorage.getItem("highestScore") == null) {
                        egret.localStorage.setItem("highestScore", this.score + "");
                    }
                };
                p.luzhangFactory = function (num) {
                    //            var luzhang = new com.views.ui.scene.gameScene.luzhang();
                    var luzhang = ClassPool.getInstance().getBlock();
                    luzhang.reset();
                    luzhang.setPos((1 + num * 2) / 8 * com.model.DataCenter.instance.configVO.appWidth, 0);
                    luzhang.gap = this.lOrRMovrGap;
                    return luzhang;
                };
                p.roundFactory = function (num) {
                    //            var round = new com.views.ui.scene.gameScene.round();
                    var round = ClassPool.getInstance().getScore();
                    round.reset();
                    round.setPos((1 + num * 2) / 8 * com.model.DataCenter.instance.configVO.appWidth, 0);
                    round.gap = this.lOrRMovrGap;
                    return round;
                };
                p.shieldFactory = function (num) {
                    //            var shield = new com.views.ui.scene.gameScene.shield();
                    var shield = ClassPool.getInstance().getShield();
                    shield.reset();
                    shield.setPos((1 + num * 2) / 8 * com.model.DataCenter.instance.configVO.appWidth, 0);
                    shield.gap = this.lOrRMovrGap;
                    return shield;
                };
                p.onTouchBegin = function (e) {
                    if (this.gameOver)
                        return;
                    if (e.stageX < com.model.DataCenter.instance.configVO.appWidth / 2) {
                        if (this.carLeft.isLeftRight == 0) {
                            this.carLeft.tweenGoTo(com.model.DataCenter.instance.configVO.appWidth * 3 / 8, 1);
                        }
                        else {
                            this.carLeft.tweenGoTo(com.model.DataCenter.instance.configVO.appWidth * 1 / 8, 0);
                        }
                    }
                    else {
                        if (this.carRight.isLeftRight == 0) {
                            this.carRight.tweenGoTo(com.model.DataCenter.instance.configVO.appWidth * 7 / 8, 1);
                        }
                        else {
                            this.carRight.tweenGoTo(com.model.DataCenter.instance.configVO.appWidth * 5 / 8, 0);
                        }
                    }
                };
                return GameScene;
            }(com.views.ui.BasicView));
            scene.GameScene = GameScene;
            egret.registerClass(GameScene,'com.views.scene.GameScene');
        })(scene = views.scene || (views.scene = {}));
    })(views = com.views || (com.views = {}));
})(com || (com = {}));
