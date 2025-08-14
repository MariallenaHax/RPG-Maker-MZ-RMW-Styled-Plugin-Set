/*:
 * @target MZ
 * @plugindesc LoadingSpinnerをツクールWithの様な感じにします。
 * @author レイズアレイズリレイズ
 * 
 * @help
 * 
 * ロード画面をツクウィズのロード画面風にします。
 * 付属のmain.js、cssフォルダとこれを入れるだけで、すぐに適応されます。
 * 
 */
(() => {
    "use strict";
    Graphics._createLoadingSpinner = function () {
        const loadingSpinner = document.createElement("div");
        const loadingSpinnerImage = document.createElement("div");
        let loading = Math.floor(Math.random() * 7) + 1
        let imageUrl = `css/LoadingActor_${loading}.png`
        loadingSpinnerImage.style.backgroundImage = `url(${imageUrl})`
        loadingSpinner.id = "loadingSpinner";
        loadingSpinnerImage.id = "loadingSpinnerImage";
        loadingSpinner.appendChild(loadingSpinnerImage);
        this._loadingSpinner = loadingSpinner;
    };
})();