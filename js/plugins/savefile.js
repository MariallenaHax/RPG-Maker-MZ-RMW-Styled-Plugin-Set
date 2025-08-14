/*:
 * @target MZ
 * @plugindesc セーブファイルの数を10にします。
 * @author レイズアレイズリレイズ
 * 
 * @help
 * 
 * ツクウィズはセーブファイル数が10しかありません。
 * このプラグインは単にそれに合わせるだけです。
 * 
 */
(() => {
    "use strict";
    DataManager.maxSavefiles = function () {
        return 10;
    };
})();