/*:
 * @target MZ
 * @plugindesc ツクールWithのように、近景を追加します。
 * @author レイズアレイズリレイズ
 * 
 * @help
 * マップのメモ欄に <fg:foregroundsフォルダに置いたpng>と書くことで、近景を読み込めます。
 * さらに <v:縦方向スクロール速度> と書くことで縦方向へのスクロールが出来、
 * <h:縦方向スクロール速度> と書くことで横方向へのスクロールが出来ます。
 * 
 * また、イベントなどのスクリプトに
 * $gameMap.changeForeground("近景のファイル名",true,true,X移動,Y移動)
 * と書きこむことで、近景を変えることが出来ます。
 * 
 * このプラグインには、プラグインコマンドはありません。
 * 
 * @noteParam fg
 * @noteDir img/foregrounds
 * @noteType file
 */
(() => {
    "use strict";
    const _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer
    Spriteset_Map.prototype.createLowerLayer = function () {
        _Spriteset_Map_createLowerLayer.call(this);
        this.createForeground();
    };
    const _Spriteset_Map_update = Spriteset_Map.prototype.update
    Spriteset_Map.prototype.update = function () {
        _Spriteset_Map_update.call(this);
        this.updateForeground();
    };
    Spriteset_Map.prototype.createForeground = function () {
        this._foreground = new TilingSprite();
        this._foreground.move(0, 0, Graphics.width, Graphics.height);
        this._baseSprite.addChild(this._foreground);
    };
    const _Game_Map_setup = Game_Map.prototype.setup
    Game_Map.prototype.setup = function (mapId) {
        _Game_Map_setup.call(this, mapId);
        this.setupForeground();
    };
    const _Game_Map_update = Game_Map.prototype.update
    Game_Map.prototype.update = function (sceneActive) {
        _Game_Map_update.call(this, sceneActive);
        this.updateForeground();
    };
    Game_Map.prototype.setupForeground = function () {
        this._foregroundName = $dataMap.meta.fg || "";
        this._foregroundZero = ImageManager.isZeroParallax(this._foregroundName);
        this._foregroundLoopX = this._foregroundName ? true : false;
        this._foregroundLoopY = this._foregroundName ? true : false;
        this._foregroundSx = $dataMap.meta.h;
        this._foregroundSy = $dataMap.meta.v;
        this._foregroundX = 0;
        this._foregroundY = 0;
    };

    Game_Map.prototype.foregroundOx = function () {
        if (this._foregroundZero) {
            return this._foregroundX * this.tileWidth();
        } else if (this._foregroundLoopX) {
            return (this._foregroundX * this.tileWidth()) / 2;
        } else {
            return 0;
        }
    };

    Game_Map.prototype.foregroundOy = function () {
        if (this._foregroundZero) {
            return this._foregroundY * this.tileHeight();
        } else if (this._foregroundLoopY) {
            return (this._foregroundY * this.tileHeight()) / 2;
        } else {
            return 0;
        }
    };

    Game_Map.prototype.changeForeground = function (name, loopX, loopY, sx, sy) {
        this._foregroundName = name;
        this._foregroundZero = ImageManager.isZeroParallax(this._foregroundName);
        if (this._foregroundLoopX && !loopX) {
            this._foregroundX = 0;
        }
        if (this._foregroundLoopY && !loopY) {
            this._foregroundY = 0;
        }
        this._foregroundLoopX = loopX;
        this._foregroundLoopY = loopY;
        this._foregroundSx = sx;
        this._foregroundSy = sy;
    };
    Game_Map.prototype.foregroundName = function () {
        return this._foregroundName;
    };
    Game_Map.prototype.updateForeground = function () {
        if (this._foregroundLoopX) {
            this._foregroundX += this._foregroundSx / this.tileWidth() / 2;
        }
        if (this._foregroundLoopY) {
            this._foregroundY += this._foregroundSy / this.tileHeight() / 2;
        }
    };
    Spriteset_Map.prototype.updateForeground = function () {
        if (this._foregroundName !== $gameMap.foregroundName()) {
            this._foregroundName = $gameMap.foregroundName();
            this._foreground.bitmap = ImageManager.loadBitmap("img/foregrounds/", this._foregroundName);
        }
        if (this._foreground.bitmap) {
            const bitmap = this._foreground.bitmap;
            this._foreground.origin.x = $gameMap.foregroundOx() % bitmap.width;
            this._foreground.origin.y = $gameMap.foregroundOy() % bitmap.height;
        }
    };
})();