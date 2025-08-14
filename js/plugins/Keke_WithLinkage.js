//=============================================================================
// Keke_WithLinkage - ツクールWITH連携
// バージョン: 1.0.0
//=============================================================================
// Copyright (c) 2024 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc ツクールWITHと連携
 * @author ケケー
 * @url https://kekeelabo.com
 * 
 * @help
 * 【ver.1.0.0】
 * MZをツクールWITHと連携可能にする
 * ツクールWITHのピクチャ調整をMZで行えるようになる
 * 
 * ◎本来は、MZのピクチャ設定をWITHにそのまま入力してもズレてしまう。
 * 　WITHとMZとでは画面構造が全く異なるため
 * ◎それをMZの画面構造をWITHに合わせ、ずれなくする
 * ◎それにより「MZでピクチャ調整 → WITHに適用」といったことが可能になる
 * ◎単純に見た目もWITHに寄せるので、MZでWITH風ゲームを作るのにも使えるかも？
 * 
 * ■使う上での注意点
 * ◎MZでピクチャ調整するとき、原点は「中央」にすること
 * 　WITHのピクチャ仕様が中央なので　
 * ◎ピクチャの簡単設定はマトモに機能しなくなる
 * 　プラグインの機能では簡単設定の方までWITHに合わせることが難しいため
 * 　申し訳ない
 * 
 *
 *
 * ● 利用規約 ●
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 */
 
 
 
(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    
    
    
    //==================================================
    //--  画面サイズをWITH化
    //==================================================

    //- 画面のリサイズ(再定義)
    Scene_Boot.prototype.resizeScreen = function() {
        const screenWidth = 1280;
        const screenHeight = 720;;
        Graphics.resize(screenWidth, screenHeight);
        Graphics.defaultScale = this.screenScale();
        this.adjustBoxSize();
        this.adjustWindow();
    };
    

    //- UIエリアのサイズ(再定義)
    Scene_Boot.prototype.adjustBoxSize = function() {
        const uiAreaWidth = 1212;
        const uiAreaHeight = 672;
        const boxMargin = 4;
        Graphics.boxWidth = uiAreaWidth - boxMargin * 2;
        Graphics.boxHeight = uiAreaHeight - boxMargin * 2;
    };



    //==================================================
    //--  ピクチャの完全互換性
    //==================================================

    //- 表示
    const _Game_Picture_show = Game_Picture.prototype.show;
    Game_Picture.prototype.show = function(name, origin, x, y, scaleX, scaleY, opacity, blendMode) {
        x = Math.round(x * 2 / 3);
        y = Math.round(y * 2 / 3);
        scaleX = Math.round(scaleX * 2 / 3);
        scaleY = Math.round(scaleY * 2 / 3);
        _Game_Picture_show.call(this, name, origin, x, y, scaleX, scaleY, opacity, blendMode);
    };


    //- 移動
    const _Game_Picture_move = Game_Picture.prototype.move;
    Game_Picture.prototype.move = function(origin, x, y, scaleX, scaleY, opacity, blendMode, duration, easingType) {
        x = Math.round(x * 2 / 3);
        y = Math.round(y * 2 / 3);
        scaleX = Math.round(scaleX * 2 / 3);
        scaleY = Math.round(scaleY * 2 / 3);
        _Game_Picture_move.call(this, origin, x, y, scaleX, scaleY, opacity, blendMode, duration, easingType);
    };



    //==================================================
    //--  メッセージウインドウのWITH化
    //==================================================

    //- メッセージウインドウのサイズを縮める
    const _Window_Message_initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function(rect) {
        // 横幅
        rect.width = Math.round(rect.width * 0.725);
        rect.x = (Graphics.boxWidth - rect.width) / 2;
        // 縦高
        const preHeight = rect.height;
        rect.height = Math.round(rect.height * 0.71);
        rect.y = (preHeight - rect.height) / 2;
        _Window_Message_initialize.call(this, rect);
        // フレームを消去
        //this.frameVisible = false;
    };


    //- 行の高さを縮める(再定義)
    Window_Message.prototype.lineHeight = function() {
        return 30;
    };



    //==================================================
    //--  メッセージネームウインドウのWITH化
    //==================================================

    let padding = 2;

    //- 名前ウインドウの余白縮小
    const _Window_NameBox_initialize = Window_NameBox.prototype.initialize;
    Window_NameBox.prototype.initialize = function() {
        _Window_NameBox_initialize.apply(this);
        this._padding = padding;
    };


    //- 名前ウインドウの横幅を広げる(再定義)
    Window_NameBox.prototype.itemPadding = function() {
        return 32;
    };


    //- 名前ウインドウの高さを縮める(再定義)
    Window_NameBox.prototype.windowHeight = function() {
        return this.itemHeight() + padding * 2;
    };


    //- 名前ウインドウのY位置を少し上に
    const _Window_NameBox_updatePlacement = Window_NameBox.prototype.updatePlacement;
    Window_NameBox.prototype.updatePlacement = function() {
        _Window_NameBox_updatePlacement.apply(this);
        const messageWindow = this._messageWindow;
        if (messageWindow.y > 0) {
            this.y -= 4;
        } else {
            this.y += 4;
        }
    };



    //==================================================
    //--  バトル前効果音の継続
    //==================================================

    //- バトル前音声停止を無効(再定義)
    Scene_Map.prototype.stopAudioOnBattleStart = function() {

    };
    
})();