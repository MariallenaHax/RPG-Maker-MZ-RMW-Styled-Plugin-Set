/*:
 * @target MZ
 * @plugindesc ツクウィズのような、エンドロールを実装します。
 * @author レイズアレイズリレイズ
 * 
 * @help
 * 
 * プラグインの設定でエンドロールの設定を行えます。
 * そしてプラグインコマンドの
 * 「エンドロール表示」
 * でエンドロールを呼び出すことが出来ます。
 * 
 * @command ShowEnd
 * @text エンドロール表示
 * @desc エンドロールを表示します。
 * 
 * @param endBG
 * @text エンドロールの背景
 * @desc エンドロールの背景を設定します。
 * @type file
 * @dir img/titles1
 * 
 * @param endBG2
 * @text エンドロールの背景2
 * @desc エンドロールの背景の上に表示される画像を設定します。
 * @type file
 * @dir img/titles2
 * 
 * @param texts
 * @text エンドロールのテキスト
 * @desc エンドロールのテキストを設定します。
 * @type struct<EndMain>
 * 
 * @param endSpeed
 * @text エンドロールの速度
 * @desc エンドロールの速度を設定します。
 * @type number
 * @max 99
 * @min 1
 * @default 1
 * 
 * @param haya
 * @text エンドロールの早送り
 * @desc オンの場合、早送りできるようになります。
 * @type boolean
 * @on はい
 * @off いいえ
 * @default false
 * 
 * @param endMusic
 * @text エンドロールの音楽
 * @desc エンドロールの音楽を設定します。
 * @type struct<EndMus>
 */
/*~struct~EndMain:
 * @param staff1
 * @text 担当1
 * @desc 担当1の役職と名前を記入します。
 * @type struct<staffName>
 * 
 * @param staff2
 * @text 担当2
 * @desc 担当2の名前を記入します。
 * @type struct<staffName>
 * 
 * @param staff3
 * @text 担当3
 * @desc 担当3の役職と名前を記入します。
 * @type struct<staffName>
 * 
 * @param staff4
 * @text 担当4
 * @desc 担当4の役職と名前を記入します。
 * @type struct<staffName>
 * 
 * @param staff5
 * @text 担当5
 * @desc 担当5の役職と名前を記入します。
 * @type struct<staffName>
 * 
 * @param staff6
 * @text 担当6
 * @desc 担当6の役職と名前を記入します。
 * @type struct<staffName>
 * 
 * @param endText
 * @text エンド文字
 * @desc エンド文字の設定をします。設定した場合、最後に表示されます。
 * @type string
 */
/*~struct~staffName:
* @param role
* @text 役職
* @desc 役職を記入します。
* @type string
* 
* @param name
* @text 担当者
* @desc 担当者の名前を記入します。
* @type struct<staffName2>
* 
*/
/*~struct~staffName2:
* @param name1
* @text 名前1
* @desc 名前を記入します。
* @type string
* 
* @param name2
* @text 名前2
* @desc 名前を記入します。
* @type string
*
* @param name3
* @text 名前3
* @desc 名前を記入します。
* @type string
*
* @param name4
* @text 名前4
* @desc 名前を記入します。
* @type string
* 
*/
/*~struct~EndMus:
* @param Mus
* @text エンドロールの曲
* @desc エンドロールで流れる曲を指定します。
* @type file
 * @dir audio/bgm
* 
* @param Vol
* @text 音量
* @desc エンドロール曲の音量を設定します。
 * @type number
 * @max 150
 * @min 0
 * @default 90 
 * 
* @param Pit
* @text ピッチ
* @desc エンドロール曲のピッチを設定します。
 * @type number
 * @max 150
 * @min 50
 * @default 100
 * 
* @param Pan
* @text 位相
* @desc エンドロール曲の位相を設定します。
 * @type number
 * @max 100
 * @min -100
 * @default 0
* 
*/
(() => {
    "use strict";
    let staffs = []
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    const params = PluginManager.parameters(pluginName)
    const BG1 = params["endBG"]
    const BG2 = params["endBG2"]
    const BGM = JsonEx.parse(params["endMusic"])
    const texts1 = JsonEx.parse((params["texts"]))
    if (texts1.staff1)
        staffs.push(JsonEx.parse(texts1.staff1))
    if (texts1.staff2)
        staffs.push(JsonEx.parse(texts1.staff2))
    if (texts1.staff3)
        staffs.push(JsonEx.parse(texts1.staff3))
    if (texts1.staff4)
        staffs.push(JsonEx.parse(texts1.staff4))
    if (texts1.staff5)
        staffs.push(JsonEx.parse(texts1.staff5))
    if (texts1.staff6)
        staffs.push(JsonEx.parse(texts1.staff6))
    if (texts1.endText)
        staffs[6] = texts1.endText
    const speed = Number(params["endSpeed"] || 4)
    class Scene_StaffCredits extends Scene_Title {
        initialize() {
            this.yPos = 0;
            this.siiiiiiiiiiiiiiii = false;
            Scene_Base.prototype.initialize.call(this);
        }
        isBusy() {
        }
        create() {
            this.sus = true;
            Scene_Base.prototype.create.call(this);
            this.createBackground();
            this.createForeground();
            this.createWindowLayer();
        }
        start() {
            Scene_Base.prototype.start.call(this);
            this.adjustBackground();
            this.playTitleMusic();
            this.startFadeIn(this.fadeSpeed(), false);
        }
        playTitleMusic() {
            if (BGM)
                AudioManager.playBgm({ name: BGM.Mus, volume: BGM.Vol, pitch: BGM.Pit, pan: BGM.Pan, }, 0);
            AudioManager.stopBgs();
            AudioManager.stopMe();
        };
        update() {
            this.yPos -= speed
            if ((Input.isLongPressed("ok") || TouchInput.isLongPressed()) && params["haya"])
                this.yPos -= 1
            this.drawGameTitle()
            if (this.loadTime > this.yPos && this.sus == true) {
                this.sus = false
                this.startFadeOut(this.fadeSpeed())
                $gameScreen.startFadeIn(20)
                setTimeout(() => {
                    SceneManager.pop()
                    AudioManager.stopBgm()
                }, 500)
            }
            else {
                Scene_Base.prototype.update.call(this);
            }
        }
        adjustBackground() {
            this.scaleSprite(this._backSprite1);
            this.scaleSprite(this._backSprite2);
            this.centerSprite(this._backSprite1);
            this.centerSprite(this._backSprite2);
        };
        createBackground() {
            this._backSprite1 = new Sprite(
                ImageManager.loadTitle1(BG1.toString('utf-8'))
            );
            this._backSprite2 = new Sprite(
                ImageManager.loadTitle2(BG2.toString('utf-8'))
            );
            this.addChild(this._backSprite1);
            this.addChild(this._backSprite2);
        }
        maxName(number) {
            let i3 = 0
            for (let i = 0; i < 5; i++) {
                let i2 = JsonEx.parse(staffs[number].name)["name" + i]
                if (i2 == "") return i;
                i3 = i
            }
            return i3 + 1
        }
        drawGameTitle() {
            const x = 20;
            let y = 800;
            const maxWidth = Graphics.width;
            const text = $dataSystem.gameTitle;
            const bitmap = this._gameTitleSprite.bitmap;
            bitmap.fontFace = $gameSystem.mainFontFace();
            bitmap.outlineColor = "black";
            bitmap.outlineWidth = 3;
            bitmap.fontSize = 35;
            this._gameTitleSprite.y = this.yPos
            if (this.siiiiiiiiiiiiiiii == false) {
                bitmap.drawText(text, x, y, maxWidth, 48, "center");
                bitmap.fontSize = 20;
                bitmap.outlineWidth = 2;
                y += 200
                if (staffs[0]) {
                    bitmap.drawText(staffs[0].role, x, y + 200, maxWidth, 48, "center");
                    for (let i = 1; i < this.maxName(0); i++) {
                        let i2 = JsonEx.parse(staffs[0].name)["name" + i]
                        bitmap.drawText(i2, x, y + 300, maxWidth, 48, "center");
                        y += 100
                    }
                }
                else {
                    if (staffs[6] != "") {
                        bitmap.drawText(staffs[6], x, y + 200, maxWidth, 48, "center");
                        this.siiiiiiiiiiiiiiii = true
                        return this.loadTime = -(y + 400)
                    }
                    else {
                        this.siiiiiiiiiiiiiiii = true
                        return this.loadTime = -(y + 200)
                    }
                }
                if (staffs[1]) {
                    bitmap.drawText(staffs[1].role, x, y + 500, maxWidth, 48, "center");
                    for (let i = 1; i < this.maxName(1); i++) {
                        let i2 = JsonEx.parse(staffs[1].name)["name" + i]
                        bitmap.drawText(i2, x, y + 600, maxWidth, 48, "center");
                        y += 100
                    }
                }
                else {
                    if (staffs[6] != "") {
                        bitmap.drawText(staffs[6], x, y + 500, maxWidth, 48, "center");
                        this.siiiiiiiiiiiiiiii = true
                        return this.loadTime = -(y + 700)
                    }
                    else {
                        this.siiiiiiiiiiiiiiii = true
                        return this.loadTime = -(y + 500)
                    }
                }
                if (staffs[2]) {
                    bitmap.drawText(staffs[2].role, x, y + 800, maxWidth, 48, "center");
                    for (let i = 1; i < this.maxName(2); i++) {
                        let i2 = JsonEx.parse(staffs[2].name)["name" + i]
                        bitmap.drawText(i2, x, y + 900, maxWidth, 48, "center");
                        y += 100
                    }
                }
                else {
                    if (staffs[6] != "") {
                        bitmap.drawText(staffs[6], x, y + 800, maxWidth, 48, "center");
                        this.siiiiiiiiiiiiiiii = true
                        return this.loadTime = -(y + 1000)
                    }
                    else {
                        this.siiiiiiiiiiiiiiii = true
                        return this.loadTime = -(y + 800)
                    }
                }
                if (staffs[3]) {
                    bitmap.drawText(staffs[3].role, x, y + 1100, maxWidth, 48, "center");
                    for (let i = 1; i < this.maxName(3); i++) {
                        let i2 = JsonEx.parse(staffs[3].name)["name" + i]
                        bitmap.drawText(i2, x, y + 1200, maxWidth, 48, "center");
                        y += 100
                    }
                }
                else {
                    if (staffs[6] != "") {
                        bitmap.drawText(staffs[6], x, y + 1100, maxWidth, 48, "center");
                        this.siiiiiiiiiiiiiiii = true
                        return this.loadTime = -(y + 1300)
                    }
                    else {
                        this.siiiiiiiiiiiiiiii = true
                        return this.loadTime = -(y + 1100)
                    }
                }
                if (staffs[4]) {
                    bitmap.drawText(staffs[4].role, x, y + 1400, maxWidth, 48, "center");
                    for (let i = 1; i < this.maxName(4); i++) {
                        let i2 = JsonEx.parse(staffs[4].name)["name" + i]
                        bitmap.drawText(i2, x, y + 1500, maxWidth, 48, "center");
                        y += 100
                    }
                }
                else {
                    if (staffs[6] != "") {
                        bitmap.drawText(staffs[6], x, y + 1400, maxWidth, 48, "center");
                        this.siiiiiiiiiiiiiiii = true
                        return this.loadTime = -(y + 1600)
                    }
                    else {
                        this.siiiiiiiiiiiiiiii = true
                        return this.loadTime = -(y + 1400)
                    }
                }
                if (staffs[5]) {
                    bitmap.drawText(staffs[5].role, x, y + 1800, maxWidth, 48, "center");
                    for (let i = 1; i < this.maxName(5); i++) {
                        let i2 = JsonEx.parse(staffs[5].name)["name" + i]
                        bitmap.drawText(i2, x, y + 1900, maxWidth, 48, "center");
                        y += 100
                    }
                    if (staffs[6] != "") {
                        bitmap.drawText(staffs[6], x, y + 2200, maxWidth, 48, "center");
                        this.siiiiiiiiiiiiiiii = true
                        return this.loadTime = -(y + 2400)
                    }
                    else {
                        this.siiiiiiiiiiiiiiii = true
                        return this.loadTime = -(y + 2200)
                    }
                }
                else
                    if (staffs[6] != "") {
                        bitmap.drawText(staffs[6], x, y + 1800, maxWidth, 48, "center");
                        this.siiiiiiiiiiiiiiii = true
                        return this.loadTime = -(y + 2000)
                    }
                    else {
                        this.siiiiiiiiiiiiiiii = true
                        return this.loadTime = -(y + 1800)
                    }
            }
        };
        createForeground() {
            this._gameTitleSprite = new Sprite(
                new Bitmap(Graphics.width, Graphics.height + 6000)
            );
            this.addChild(this._gameTitleSprite);
        };
    }
    PluginManager.registerCommand(pluginName, "ShowEnd", function () {
        $gameScreen.startFadeOut(20)
        this.wait(30)
        setTimeout(() => {
            SceneManager.push(Scene_StaffCredits)
        }, 500)
    })
})();