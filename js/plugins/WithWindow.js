/*:
 * @target MZ
 * @plugindesc ウィンドウをツクールWith化します。
 * @author レイズアレイズリレイズ
 * 
 * @help
 * このプラグインには、プラグインコマンドはありません。
 * このプラグインを導入し、必要なアセットとKeke_WithLinkage.jsを入れるだけでOKです。
 * ほとんどのウィンドウ描画系プラグインと競合する可能性があることにだけ注意してください。
 * 
 * ※このプラグインは、一部のウィンドウレイアウトでタッチ操作を台無しにするので、その点にご留意ください。
 * ※このプラグインは自由に改変してもらって構いません。
 * 
 * このプラグインはステータス画面とショップ画面のビジュアルを壊してしまうので注意してください。
 * 私はそのレイアウトのコードを書く前に力尽きました。
 * 
 * ついでに、おまけでマップスクロール中にスペースキーを長押ししても早くスクロールしなくなります。
 * 
 * @requiredAssets img/system/Btn_BaseShadow_XS
 * @requiredAssets img/system/blank
 * 
 */



(() => {
    "use strict";
    Object.defineProperty(Window.prototype, "openness", {
        get: function () {
            return this._openness;
        },
        set: function (value) {
            if (this._openness !== value) {
                this._openness = value.clamp(0, 255);
                this.alpha = this._openness / 255;
            }
        },
        configurable: true
    });
    Window.prototype._createContentsFaceSprite = function () {
        this._contentsFaceSprite = new Sprite();
        this._clientArea.addChild(this._contentsFaceSprite);
    };
    Window.prototype._updateContentsFace = function () {
        const bitmap = this._contentsFaceSprite.bitmap;
        if (bitmap) {
            this._contentsFaceSprite.setFrame(0, 0, bitmap.width, bitmap.height);
        }
    };
    Scene_Battle.prototype.statusWindowX = function () {
        return this.statusWindowRect().x;
    };
    Object.defineProperty(Window.prototype, "contentsFace", {
        get: function () {
            return this._contentsFaceSprite.bitmap;
        },
        set: function (value) {
            if (this._contentsFaceSprite)
                this._contentsFaceSprite.bitmap = value;
        },
        configurable: true
    });
    const _Window__createAllParts = Window.prototype._createAllParts
    Window.prototype._createAllParts = function () {
        _Window__createAllParts.call(this);
        this._createContentsFaceSprite();
    };
    const _Window_updateTransform = Window.prototype.updateTransform
    Window.prototype.updateTransform = function () {
        _Window_updateTransform.call(this);
        this._updateContentsFace();
    };

    const _Window_Selectable_initialize = Window_Selectable.prototype.initialize
    Window_Selectable.prototype.initialize = function (rect) {
        _Window_Selectable_initialize.call(this, rect);
        this.button = null;
        this.windowskin = ImageManager.loadSystem("blank")
    };
    const _Window_Base_initialize = Window_Base.prototype.initialize
    Window_Base.prototype.initialize = function (rect) {
        _Window_Base_initialize.call(this, rect);
        this.windowbutton = ImageManager.loadSystem("Btn_BaseShadow_XS")
    };

    Window_Selectable.prototype.drawBackgroundRect = function (rect) {

    };
    Window_Options.prototype.drawBackgroundRect = function (rect) {

    };

    Object.defineProperty(Window.prototype, "windowbutton", {
        get: function () {
            return this._windowbutton;
        },
        set: function (value) {
            if (this._windowbutton !== value) {
                this._windowbutton = value;
                this._windowbutton.addLoadListener(this._onWindowbuttonLoad.bind(this));
            }
        },
        configurable: true
    });

    Window.prototype._refreshBack = function () {
    };

    Window.prototype._onWindowbuttonLoad = function () {
        this._refreshAllParts();
    };
    Window.prototype._refreshFrame = function () {
        const drect = { x: 0, y: 0, width: this._width, height: this._height };
        const srect = { x: 0, y: 0, width: 96, height: 96 };
        const m = 24;
        for (const child of this._frameSprite.children) {
            child.bitmap = this._windowskin;
        }
        this._setRectPartsGeometry(this._frameSprite, srect, drect, m);
    };
    Scene_MenuBase.prototype.mainAreaHeight = function () {
        return (Graphics.boxHeight - this.buttonAreaHeight() - this.helpAreaHeight()) + 128;
    };
    Scene_Shop.prototype.mainAreaHeight = function () {
        return (Graphics.boxHeight - this.buttonAreaHeight() - this.helpAreaHeight());
    };
    Window_ItemList.prototype.drawItem2 = function (index) {

    };
    Scene_Equip.prototype.mainAreaHeight = function () {
        return (Graphics.boxHeight - this.buttonAreaHeight() - this.helpAreaHeight());
    };
    Scene_Skill.prototype.mainAreaHeight = function () {
        return (Graphics.boxHeight - this.buttonAreaHeight() - this.helpAreaHeight());
    };
    Scene_Item.prototype.mainAreaHeight = function () {
        return (Graphics.boxHeight - this.buttonAreaHeight() - this.helpAreaHeight());
    };
    Scene_Status.prototype.mainAreaHeight = function () {
        return (Graphics.boxHeight - this.buttonAreaHeight() - this.helpAreaHeight());
    };
    Window.prototype._createFrameSprite = function () {
        this._frameSprite = new Sprite();
        for (let i = 0; i < 9; i++) {
            this._frameSprite.addChild(new Sprite());
        }
        this._container.addChild(this._frameSprite);
    };
    Window_Help.prototype._createButtonSprite = function () {
        this._buttonSprite = new Sprite();
        for (let i = 0; i < 9; i++) {
            this._buttonSprite.addChild(new Sprite());
        }
        this._container.addChild(this._buttonSprite);
    };
    Window_Selectable.prototype._createButtonSprite = function () {
        this._buttonSprite = new Sprite();
        for (let i = 0; i < 9; i++) {
            this._buttonSprite.addChild(new Sprite());
        }
        this._contentsBackSprite.addChild(this._buttonSprite);
    };
    Window_Selectable.prototype._createButtonSprite4 = function () {
        this._buttonSprite4 = new Sprite();
        for (let i = 0; i < 9; i++) {
            this._buttonSprite4.addChild(new Sprite());
        }
        this._container.addChild(this._buttonSprite4);
    };
    Window_Selectable.prototype._createButtonSprite5 = function () {
        this._buttonSprite5 = new Sprite();
        for (let i = 0; i < 9; i++) {
            this._buttonSprite5.addChild(new Sprite());
        }
        this._container.addChild(this._buttonSprite5);
    };
    Window_Selectable.prototype._createButtonSprite2 = function () {
        this._buttonSprite2 = new Sprite();
        for (let i = 0; i < 9; i++) {
            this._buttonSprite2.addChild(new Sprite());
        }
        this._contentsBackSprite.addChild(this._buttonSprite2);
    };
    Window_Selectable.prototype._createButtonSprite3 = function () {
        this._buttonSprite3 = new Sprite();
        for (let i = 0; i < 9; i++) {
            this._buttonSprite3.addChild(new Sprite());
        }
        this._container.addChild(this._buttonSprite3);
    };
    Scene_MenuBase.prototype.createBackground = function () {
        this._backgroundFilter = new PIXI.filters.BlurFilter();
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this._backgroundSprite.filters = [];
        this.addChild(this._backgroundSprite);
        this.setBackgroundOpacity(192);
    };
    Window_SavefileList.prototype.refreshCursor = function () {
        if (this.index() >= 0) {
            this.changeTextColor(ColorManager.dimColor2());
            let srect;
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 10;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 11.5;
            rect.height -= padding * 2;
            const drect = { x: rect2.x + 190, y: rect.y - 62, width: rect2.width - 2250, height: rect.height + 100 };
            if (this.isEnabled(this.indexToSavefileId(this.index())))
                srect = { x: 0, y: 32, width: 32, height: 32 };
            else
                srect = { x: 32, y: 32, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite2.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite2, srect, drect, m);
        }
    };
    Window_SavefileList.prototype._refreshButton = function (index) {
        let srect;
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 10;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding + 11.5;
        rect.height -= padding * 2;
        const drect = { x: rect2.x + 190, y: rect.y - 62, width: rect2.width - 2250, height: rect.height + 100 };
        if (!this.isEnabled(this.indexToSavefileId(index)))
            srect = { x: 32, y: 32, width: 32, height: 32 };
        else
            srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite.children) {
            child.bitmap = this._windowbutton;
        }

        this._setRectPartsGeometry(this._buttonSprite, srect, drect, m);
    };
    Window_SavefileList.prototype.numVisibleRows = function () {
        return 4;
    };
    Window_SavefileList.prototype.drawContents = function (info, rect) {
        const bottom = rect.y + rect.height;
        if (rect.width >= 420) {
            this.drawPartyCharacters(info, rect.x + 520, bottom - 8);
        }
        const lineHeight = this.lineHeight();
        const y2 = bottom - lineHeight - 4;
        if (y2 >= lineHeight) {
            this.drawPlaytime(info, rect.x - 2556, y2 - 80, rect.width);
        }
    };
    Window_SavefileList.prototype.drawTitle = function (savefileId, x, y) {
        if (savefileId === 0) {
            this.drawText(TextManager.autosave, x + 180, y, 180);
        } else {
            this.drawText(TextManager.file + " " + savefileId, x + 220, y + 25, 180);
        }
    };


    Window_Selectable.prototype.paint = function () {
        if (this.contents) {
            this.contents.clear();
            this.contentsBack.clear();
            this.contentsFace.clear();
            this.drawAllItems();
        }
    };
    Window_SavefileList.prototype.drawPartyCharacters = function (info, x, y) {
        if (info.characters) {
            let characterX = x;
            for (const data of info.characters) {
                this.drawFace2(data[0], data[1], characterX + 1000, y * 2.85 - 220, 144, 144);
                this._contentsFaceSprite.scale.x = 0.35
                this._contentsFaceSprite.scale.y = 0.35
                characterX += 250;
            }
        }
    };
    Window_SkillStatus.prototype.drawActorFace = function (
        actor, x, y, width, height
    ) {
        this.drawFace3(actor.faceName(), actor.faceIndex(), x, y, width, height);
    };
    Window_Base.prototype.drawFace2 = function (
        faceName, faceIndex, x, y, width, height
    ) {
        width = width || ImageManager.standardFaceWidth;
        height = height || ImageManager.standardFaceHeight;
        const bitmap = ImageManager.loadFace(faceName);
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const sw = Math.min(width, pw);
        const sh = Math.min(height, ph);
        const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
        const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
        this.contentsFace.blt(bitmap, sx, sy, sw, sh, dx, dy);
    };
    Window_Base.prototype.drawFace3 = function (
        faceName, faceIndex, x, y, width, height
    ) {
        width = width || ImageManager.standardFaceWidth;
        height = height || ImageManager.standardFaceHeight;
        const bitmap = ImageManager.loadFace(faceName);
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const sw = Math.min(width, pw);
        const sh = Math.min(height, ph);
        const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        const sx = Math.floor((faceIndex % 4) * pw + (pw - sw) / 2);
        const sy = Math.floor(Math.floor(faceIndex / 4) * ph + (ph - sh) / 2);
        this.contentsFace.blt(bitmap, sx, sy, sw, sh, dx, dy);
        this._contentsFaceSprite.scale.x = 0.9
        this._contentsFaceSprite.scale.y = 0.9
    };
    Scene_File.prototype.helpWindowRect = function () {
        const wx = 0;
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(1, false);
        return new Rectangle(wx + 275, wy - 50, ww - 600, wh - 10);
    };
    Scene_File.prototype.listWindowRect = function () {
        const wx = 0;
        const wy = this.mainAreaTop() + this._helpWindow.height;
        const ww = Graphics.boxWidth;
        const wh = this.mainAreaHeight() - this._helpWindow.height;
        return new Rectangle(wx, wy - 50, ww + 1700, wh - 70);
    };
    Window_ShopBuy.prototype.drawItem2 = function (index) {
    };
    Window_ShopSell.prototype.drawItem2 = function (index) {
    };
    Window_ShopNumber.prototype.drawItem2 = function (index) {
    };
    Window_Command.prototype._refreshButton = function (index) {
        let srect;
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 10;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding + 11.5;
        rect.height -= padding * 2;
        const drect = { x: rect2.x - 12, y: rect.y - 12, width: rect2.width, height: rect.height };
        if (!this.isCommandEnabled(index))
            srect = { x: 32, y: 32, width: 32, height: 32 };
        else
            srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite.children) {
            child.bitmap = this._windowbutton;
        }

        this._setRectPartsGeometry(this._buttonSprite, srect, drect, m);
    };
    Window_Selectable.prototype._refreshButton = function (index) {
        let srect;
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 10;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding + 11.5;
        rect.height -= padding * 2;
        const drect = { x: rect2.x - 12, y: rect.y - 12, width: rect2.width, height: rect.height };
        srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite.children) {
            child.bitmap = this._windowbutton;
        }

        this._setRectPartsGeometry(this._buttonSprite, srect, drect, m);
    };
    Window_Selectable.prototype.refreshCursor = function () {
        if (this.index() >= 0) {
            this.changeTextColor(ColorManager.dimColor2());
            let srect;
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 10;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 11.5;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 12, y: rect.y - 12, width: rect2.width, height: rect.height };
            srect = { x: 0, y: 32, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite2.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite2, srect, drect, m);
        }
    };
    Window_ChoiceList.prototype._refreshButton = function (index) {
        let srect;
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 10;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding + 11.5;
        rect.height -= padding * 2;
        const drect = { x: rect2.x - 22, y: rect.y - 15, width: rect2.width + 21, height: rect.height + 10 };
        srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite.children) {
            child.bitmap = this._windowbutton;
        }

        this._setRectPartsGeometry(this._buttonSprite, srect, drect, m);
    };
    Window_ChoiceList.prototype.refreshCursor = function () {
        if (this.index() >= 0) {
            this.changeTextColor(ColorManager.dimColor2());
            let srect;
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 10;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 11.5;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 22, y: rect.y - 15, width: rect2.width + 21, height: rect.height + 10 };
            srect = { x: 0, y: 32, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite2.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite2, srect, drect, m);
        }
    };
    const _Window_Options_processOk = Window_Options.prototype.processOk
    Window_Options.prototype.processOk = function () {
        _Window_Options_processOk.call(this);
        this.drawItem2(this.index())
    };
    Window_BattleEnemy.prototype._refreshButton = function (index) {
        let srect;
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 10;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding + 11.5;
        rect.height -= padding * 2;
        const drect = { x: rect2.x - 12, y: rect.y - 15, width: rect2.width + 5, height: rect.height + 5 };
        srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite.children) {
            child.bitmap = this._windowbutton;
        }

        this._setRectPartsGeometry(this._buttonSprite, srect, drect, m);
    };
    Window_ChoiceList.prototype.windowHeight = function () {
        return this.fittingHeight(this.numVisibleRows()) + 10;
    };
    Window_BattleEnemy.prototype.refreshCursor = function () {
        if (this.index() >= 0) {
            this.changeTextColor(ColorManager.dimColor2());
            let srect;
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 10;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 11.5;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 12, y: rect.y - 15, width: rect2.width + 5, height: rect.height + 5 };
            srect = { x: 0, y: 32, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite2.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite2, srect, drect, m);
        }
    };
    Window_BattleSkill.prototype._refreshButton = function (index) {
        let srect;
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 10;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding + 11.5;
        rect.height -= padding * 2;
        const drect = { x: rect2.x - 12, y: rect.y - 15, width: rect2.width + 5, height: rect.height + 5 };
        srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite.children) {
            child.bitmap = this._windowbutton;
        }

        this._setRectPartsGeometry(this._buttonSprite, srect, drect, m);
    };
    Window_BattleSkill.prototype.refreshCursor = function () {
        if (this.index() >= 0 && this.itemAt(this.index())) {
            this.changeTextColor(ColorManager.dimColor2());
            let srect;
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 10;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 11.5;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 12, y: rect.y - 15, width: rect2.width + 5, height: rect.height + 5 };
            srect = { x: 0, y: 32, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite2.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite2, srect, drect, m);
        }
    };
    Window_BattleItem.prototype._refreshButton = function (index) {
        let srect;
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 10;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding + 11.5;
        rect.height -= padding * 2;
        const drect = { x: rect2.x - 12, y: rect.y - 15, width: rect2.width + 5, height: rect.height + 5 };
        srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite.children) {
            child.bitmap = this._windowbutton;
        }

        this._setRectPartsGeometry(this._buttonSprite, srect, drect, m);
    };
    Window_BattleItem.prototype.refreshCursor = function () {
        if (this.index() >= 0 && this.itemAt(this.index())) {
            this.changeTextColor(ColorManager.dimColor2());
            let srect;
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 10;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 11.5;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 12, y: rect.y - 15, width: rect2.width + 5, height: rect.height + 5 };
            srect = { x: 0, y: 32, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite2.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite2, srect, drect, m);
        }
    };
    Window_Selectable.prototype.select = function (index) {
        this._index = index;
        if (this._buttonSprite2)
            this._buttonSprite2.destroy()
        if (this._buttonSprite3)
            this._buttonSprite3.destroy()
        this.drawItem2(index)
        this._createButtonSprite2()
        this.refreshCursor();
        this._createButtonSprite3()
        this.refreshCursor2();
        this.callUpdateHelp();
    };
    Window_StatusBase.prototype.drawItem2 = function () {
    };
    Window_EquipSlot.prototype.drawItem2 = function () {
    };
    Window_EquipItem.prototype.drawItem2 = function () {
    };
    Window_SkillType.prototype.drawItem2 = function () {
    };
    Window_SkillList.prototype.drawItem2 = function () {
    };
    Window_EquipSlot.prototype.drawItem = function (index) {
        if (this._actor) {
            const slotName = this.actorSlotName(this._actor, index);
            const item = this.itemAt(index);
            const slotNameWidth = this.slotNameWidth();
            const rect = this.itemLineRect(index);
            const itemWidth = rect.width - slotNameWidth;
            this.changeTextColor(ColorManager.systemColor());
            this.changePaintOpacity(this.isEnabled(index));
            this.drawText(slotName, rect.x, rect.y, slotNameWidth, rect.height);
            this.drawItemName(item, rect.x + slotNameWidth, rect.y, itemWidth);
            this.changePaintOpacity(true);
        }
    };
    Window_EquipSlot.prototype._refreshButton = function (index) {
        let srect;
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 10;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding + 11.5;
        rect.height -= padding * 2;
        const drect = { x: rect2.x - 24, y: rect.y - 12, width: rect2.width - 124, height: rect.height + 5 };
        srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite.children) {
            child.bitmap = this._windowbutton;
        }

        this._setRectPartsGeometry(this._buttonSprite, srect, drect, m);
    };
    Window_EquipSlot.prototype.refreshCursor = function () {
        if (this.index() >= 0) {
            this.changeTextColor(ColorManager.dimColor2());
            let srect;
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 10;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 11.5;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 24, y: rect.y - 12, width: rect2.width - 124, height: rect.height + 5 };
            srect = { x: 0, y: 32, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite2.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite2, srect, drect, m);
        }
    };
    const _Window_EquipStatus_drawItem = Window_EquipStatus.prototype.drawItem
    Window_EquipStatus.prototype.drawItem = function (x, y, paramId) {
        _Window_EquipStatus_drawItem.call(this, x, y, paramId)
        this._createButtonSprite()
        this._refreshButton(1);
    };
    Window_SkillStatus.prototype.refresh = function () {
        Window_StatusBase.prototype.refresh.call(this);
        if (this._actor) {
            const x = this.colSpacing() / 2;
            const h = this.innerHeight;
            const y = h / 2 - this.lineHeight() * 1.5;
            this.drawActorFace(this._actor, x + 240, 0, 144, h);
            this.drawActorSimpleStatus(this._actor, x + 180, y);
            this._createButtonSprite()
            this._refreshButton(1);
        }
    };
    Window_SkillStatus.prototype._refreshButton = function (index) {
        let srect;
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 10;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding + 11.5;
        rect.height -= padding * 2;
        const drect = { x: rect2.x + 100, y: rect.y - 48, width: rect2.width - 325, height: rect.height + 127 };
        srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite.children) {
            child.bitmap = this._windowbutton;
        }

        this._setRectPartsGeometry(this._buttonSprite, srect, drect, m);
    };
    Window_EquipStatus.prototype._refreshButton = function (index) {
        let srect;
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 10;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding + 11.5;
        rect.height -= padding * 2;
        const drect = { x: rect2.x - 72, y: rect.y - 48, width: rect2.width - 64, height: rect.height + 450 };
        srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite.children) {
            child.bitmap = this._windowbutton;
        }

        this._setRectPartsGeometry(this._buttonSprite, srect, drect, m);
    };
    Window_EquipStatus.prototype.refresh = function () {
        this.contents.clear();
        if (this._actor) {
            const nameRect = this.itemLineRect(0);
            this.drawActorName(this._actor, nameRect.x + 128, 32, nameRect.width);
            this.drawActorFace(this._actor, nameRect.x, nameRect.height);
            this.drawAllParams();
        }
    };
    Window_EquipStatus.prototype.drawCurrentParam = function (x, y, paramId) {
        const paramWidth = this.paramWidth();
        this.resetTextColor();
        this.drawText(this._actor.param(paramId), x - 64, y, paramWidth, "right");
    };
    Window_EquipStatus.prototype.drawRightArrow = function (x, y) {
        const rightArrowWidth = this.rightArrowWidth();
        this.changeTextColor(ColorManager.systemColor());
        this.drawText("\u2192", x - 54, y, rightArrowWidth, "center");
    };
    Window_EquipStatus.prototype.drawNewParam = function (x, y, paramId) {
        const paramWidth = this.paramWidth();
        const newValue = this._tempActor.param(paramId);
        const diffvalue = newValue - this._actor.param(paramId);
        this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
        this.drawText(newValue, x - 64, y, paramWidth, "right");
    };
    Scene_Equip.prototype.statusWindowRect = function () {
        const wx = 0;
        const wy = this.mainAreaTop();
        const ww = this.statusWidth();
        const wh = this.mainAreaHeight();
        return new Rectangle(wx, wy, ww + 48, wh);
    };
    Scene_Skill.prototype.statusWindowRect = function () {
        const ww = Graphics.boxWidth - this.mainCommandWidth();
        const wh = this._skillTypeWindow.height;
        const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
        const wy = this.mainAreaTop();
        return new Rectangle(wx + 75, wy, ww - 50, wh + 40);
    };
    Window_EquipSlot.prototype.refreshCursor2 = function () {
        if (this.index() >= 0) {
            let srect;
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 10;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 11.5;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 32, y: rect.y + 3, width: 32, height: 32 };
            srect = { x: 32, y: 0, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite3.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite3, srect, drect, m);
        }
    };
    Window_MenuCommand.prototype.drawItem2 = function (index) {
        if (this.index() >= 0) {
            const rect = this.itemLineRect(index);
            const align = this.itemTextAlign();
            this.resetTextColor();
            this.changePaintOpacity(this.isCommandEnabled(index));
            for (let i = 0; i < this.maxVisibleItems(); i++) {
                const index = this.topIndex() + i;
                if (index < this.maxItems()) {
                    this.redrawItem(i)
                }
            }
            if (this.isCommandEnabled(index)) {
                this.changeTextColor("rgba(0, 0, 0, 1)")
                this.changeOutlineColor("rgba(0, 0, 0, 0)");
                this.drawText(this.commandName(index), rect.x + 48, rect.y - 48, rect.width, align);
            }

        }
    };
    Window_ChoiceList.prototype.windowWidth = function () {
        const width = this.maxChoiceWidth() + this.colSpacing() + this.padding * 2;
        return Math.min(width + 70, Graphics.boxWidth + 70);
    };
    Window_ChoiceList.prototype.drawItem = function (index) {
        const rect = this.itemLineRect(index);
        const align = this.itemTextAlign();
        this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
    };
    Window_ChoiceList.prototype.drawItem2 = function (index) {
        if (this.index() >= 0) {
            const rect = this.itemLineRect(index);
            const align = this.itemTextAlign();
            this.resetTextColor();
            this.changePaintOpacity(this.isCommandEnabled(index));
            for (let i = 0; i < this.maxVisibleItems(); i++) {
                const index = this.topIndex() + i;
                if (index < this.maxItems()) {
                    this.redrawItem(i)
                }
            }
            if (this.isCommandEnabled(index)) {
                this.changeTextColor("rgba(0, 0, 0, 1)")
                this.changeOutlineColor("rgba(0, 0, 0, 0)");
                this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
            }

        }
    };
    Window_Selectable.prototype.drawItem2 = function (index) {
        if (this.index() >= 0) {
            const rect = this.itemLineRect(index);
            const align = this.itemTextAlign();
            this.resetTextColor();
            this.changePaintOpacity(this.isCommandEnabled(index));
            for (let i = 0; i < this.maxVisibleItems(); i++) {
                const index = this.topIndex() + i;
                if (index < this.maxItems()) {
                    this.redrawItem(i)
                }
            }
            if (this.isCommandEnabled(index)) {
                this.changeTextColor("rgba(0, 0, 0, 1)")
                this.changeOutlineColor("rgba(0, 0, 0, 0)");
                this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
            }

        }
    };
    Window_Command.prototype.isCommandEnabled = function (index) {
        return this._list[index]?.enabled;
    };

    Window_ItemList.prototype.refreshCursor2 = function () {
        if (this.index() >= 0 && this.itemAt(this.index())) {
            let srect;
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 10;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 11.5;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 20, y: rect.y + 2, width: 32, height: 32 };
            srect = { x: 32, y: 0, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite3.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite3, srect, drect, m);
        }
    };
    Window_Selectable.prototype.refreshCursor2 = function () {
        if (this.index() >= 0) {
            let srect;
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 10;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 11.5;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 20, y: rect.y + 2, width: 32, height: 32 };
            srect = { x: 32, y: 0, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite3.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite3, srect, drect, m);
        }
    };
    Window_SavefileList.prototype.refreshCursor2 = function () {
        if (this.index() >= 0) {
            let srect;
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 10;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 11.5;
            rect.height -= padding * 2;
            const drect = { x: rect2.x + 175, y: rect.y + 2, width: 32, height: 32 };
            srect = { x: 32, y: 0, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite3.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite3, srect, drect, m);
        }
    };
    Window_BattleSkill.prototype.refreshCursor2 = function () {
        if (this.index() >= 0 && this.itemAt(this.index())) {
            let srect;
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 10;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 11.5;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 20, y: rect.y + 2, width: 32, height: 32 };
            srect = { x: 32, y: 0, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite3.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite3, srect, drect, m);
        }
    };
    Window_BattleItem.prototype.refreshCursor2 = function () {
        if (this.index() >= 0 && this.itemAt(this.index())) {
            let srect;
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 10;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 11.5;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 20, y: rect.y + 2, width: 32, height: 32 };
            srect = { x: 32, y: 0, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite3.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite3, srect, drect, m);
        }
    };
    Window_Options.prototype.refreshCursor2 = function () {
        if (this.index() >= 0) {
            let srect;
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 3;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 9;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 20, y: rect.y + 4, width: 32, height: 32 };
            srect = { x: 32, y: 0, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite3.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite3, srect, drect, m);
        }
    };
    Window_Options.prototype.drawItem2 = function (index) {
        if (this.index() >= 0) {
            const title = this.commandName(index);
            const status = this.statusText(index);
            const rect = this.itemLineRect(index);
            const statusWidth = this.statusWidth();
            const titleWidth = rect.width - statusWidth;
            this.resetTextColor();
            this.changePaintOpacity(this.isCommandEnabled(index));
            for (let i = 0; i < this.maxVisibleItems(); i++) {
                const index = this.topIndex() + i;
                if (index < this.maxItems()) {
                    this.redrawItem(i)
                }
            }
            if (this.isCommandEnabled(index)) {
                this.changeTextColor("rgba(0, 0, 0, 1)")
                this.changeOutlineColor("rgba(0, 0, 0, 0)");
                this.drawText(title, rect.x, rect.y, titleWidth, "left");
                this.drawText(status, rect.x + titleWidth, rect.y, statusWidth, "right");
            }
        }
    };
    Window_Selectable.prototype.refreshCursor = function () {

    };
    Window.prototype.moveCursorBy = function (x, y) {
        this._cursorRect.x += x;
        this._cursorRect.y += y;
        this._buttonSprite3.x += x;
        this._buttonSprite3.y += y;
    };
    Window_Options.prototype.refreshCursor = function () {
        if (this.index() >= 0) {
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 3;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 9;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 12, y: rect.y - 12, width: rect2.width + 20, height: rect.height + 5 };
            const srect = { x: 0, y: 32, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite2.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite2, srect, drect, m);
        }
    };

    Window_Options.prototype._refreshButton = function (index) {
        let srect;
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 3;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding + 9;
        rect.height -= padding * 2;
        const drect = { x: rect2.x - 12, y: rect.y - 12, width: rect2.width + 20, height: rect.height + 5 };
        if (!this.isCommandEnabled(index))
            srect = { x: 32, y: 32, width: 32, height: 32 };
        else
            srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite.children) {
            child.bitmap = this._windowbutton;
        }
        this._setRectPartsGeometry(this._buttonSprite, srect, drect, m);
    };
    Window_BattleStatus.prototype._refreshButton = function (index) {
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 3;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding;
        rect.height -= padding * 2;
        const drect = { x: rect2.x - 13, y: rect.y - 156, width: rect2.width - 10, height: rect.height - 7 };
        const srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite.children) {
            child.bitmap = this._windowbutton;
        }
        this._setRectPartsGeometry(this._buttonSprite, srect, drect, m);
    };
    Window_BattleStatus.prototype._refreshButton3 = function (index) {
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 3;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding;
        rect.height -= padding * 2;
        const drect = { x: rect2.x - 5, y: rect.y - 135, width: rect2.width - 10, height: rect.height + 70 };
        const srect = { x: 32, y: 32, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite4.children) {
            child.bitmap = this._windowbutton;
        }
        this._setRectPartsGeometry(this._buttonSprite4, srect, drect, m);
    };
    Window_BattleStatus.prototype._refreshButton4 = function (index) {
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 3;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding;
        rect.height -= padding * 2;
        const drect = { x: rect2.x - 5, y: rect.y - 40, width: rect2.width - 10, height: rect.height + 50 };
        const srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite5.children) {
            child.bitmap = this._windowbutton;
        }
        this._setRectPartsGeometry(this._buttonSprite5, srect, drect, m);
    };
    Window_BattleStatus.prototype.refreshCursor = function () {
        if (this.index() >= 0) {
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 3;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 13, y: rect.y - 156, width: rect2.width - 10, height: rect.height - 7 };
            const srect = { x: 0, y: 32, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite2.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite2, srect, drect, m);
        }
    };
    Window_ItemList.prototype.maxCols = function () {
        return 3;
    };
    Window_SkillList.prototype.maxCols = function () {
        return 3;
    };
    Window_BattleEnemy.prototype.maxCols = function () {
        return 3;
    };
    Window_BattleSkill.prototype.drawItem2 = function (index) {
        if (this.index() >= 0) {
            this.resetTextColor();
            for (let i = 0; i < this.maxVisibleItems(); i++) {
                const index = this.topIndex() + i;
                if (index < this.maxItems()) {
                    this.redrawItem(i)
                }
            }
            if (this.itemAt(index)) {
                this.changeTextColor("rgba(0, 0, 0, 1)")
                this.changeOutlineColor("rgba(0, 0, 0, 0)");
                const costWidth = this.costWidth();
                const rect = this.itemLineRect(index);
                this.changePaintOpacity(this.isEnabled(this.itemAt(index)));
                this.drawItemName(this.itemAt(index), rect.x, rect.y, rect.width - costWidth);
                this.drawSkillCost(this.itemAt(index), rect.x, rect.y, rect.width);
                this.changePaintOpacity(1);
            }

        }
    };
    Window_BattleEnemy.prototype.drawItem2 = function (index) {
        if (this.index() >= 0) {
            this.resetTextColor();
            for (let i = 0; i < this.maxVisibleItems(); i++) {
                const index = this.topIndex() + i;
                if (index < this.maxItems()) {
                    this.redrawItem(i)
                }
            }
            if (this._enemies[index].name()) {
                this.changeTextColor("rgba(0, 0, 0, 1)")
                this.changeOutlineColor("rgba(0, 0, 0, 0)");
                const rect = this.itemLineRect(index);
                this.drawText(this._enemies[index].name(), rect.x, rect.y, rect.width);
            }

        }
    };
    Window_SavefileList.prototype.drawItem2 = function (index) {
    };
    Window_BattleItem.prototype.drawItem2 = function (index) {
    };
    Window_Help.prototype._refreshButton = function (index) {
        const wy = this.helpAreaTop();
        const ww = Graphics.boxWidth;
        const wh = this.helpAreaHeight();
        const drect = { x: 0, y: wy, width: ww, height: wh };
        const srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite.children) {
            child.bitmap = this._windowbutton;
        }
        this._setRectPartsGeometry(this._buttonSprite, srect, drect, m);
    };
    Window_StatusBase.prototype._refreshButton = function (index) {
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 3;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding;
        rect.height -= padding * 2;
        const drect = { x: rect2.x - 62, y: rect.y - 68, width: rect2.width - 178, height: rect.height + 134 };
        const srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite.children) {
            child.bitmap = this._windowbutton;
        }
        this._setRectPartsGeometry(this._buttonSprite, srect, drect, m);
    };
    Window_BattleStatus.prototype.refreshCursor2 = function () {
    };
    Window_StatusBase.prototype.refreshCursor = function () {
        if (this.index() >= 0) {
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 3;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 62, y: rect.y - 68, width: rect2.width - 178, height: rect.height + 134 };
            const srect = { x: 0, y: 32, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite2.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite2, srect, drect, m);
        }
    };
    Window_StatusBase.prototype.refreshCursor2 = function () {
        if (this.index() >= 0) {
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 3;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 56, y: rect.y + 4, width: 32, height: 32 };
            const srect = { x: 32, y: 0, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite3.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite3, srect, drect, m);
        }
    };
    Window_BattleStatus.prototype.drawItemStatus = function (index) {
        const actor = this.actor(index);
        const rect = this.itemRectWithPadding(index);
        const nameX = this.nameX(rect);
        const nameY = this.nameY(rect);
        const stateIconX = this.stateIconX(rect);
        const stateIconY = this.stateIconY(rect);
        const basicGaugesX = this.basicGaugesX(rect);
        const basicGaugesY = this.basicGaugesY(rect);
        this.placeTimeGauge(actor, nameX, nameY);
        this.placeActorName(actor, nameX, nameY - 217);
        this.placeStateIcon(actor, stateIconX, stateIconY - 134);
        this.placeBasicGauges(actor, basicGaugesX, basicGaugesY - 134);
    };
    Window_BattleStatus.prototype.placeActorName = function (actor, x, y) {
        const key = "actor%1-name".format(actor.actorId());
        const sprite = this.createInnerSprite(key, Sprite_Name);
        sprite.setup(actor);
        sprite.move(x, y);
        sprite.scale.x = 0.5
        sprite.scale.y = 0.5
        sprite.show();
    };
    Window_BattleStatus.prototype.itemRect = function (index) {
        const maxCols = this.maxCols();
        const itemWidth = this.itemWidth();
        const itemHeight = this.itemHeight() + 10;
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const col = index % maxCols;
        const row = Math.floor(index / maxCols);
        const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
        const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
        const width = itemWidth - colSpacing;
        const height = itemHeight - rowSpacing;
        return new Rectangle(x, y + 20, width, height + 105);
    };
    Window_BattleStatus.prototype.itemRect2 = function (index) {
        const maxCols = this.maxCols();
        const itemWidth = this.itemWidth();
        const itemHeight = this.itemHeight() + 10;
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const col = index % maxCols;
        const row = Math.floor(index / maxCols);
        const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
        const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
        const width = itemWidth - colSpacing;
        const height = itemHeight - rowSpacing;
        return new Rectangle(x * 1.44, y + 40, width, height + 105);
    };
    const _Window_Base_createContents = Window_Base.prototype.createContents
    Window_Base.prototype.createContents = function () {
        _Window_Base_createContents.call(this);
        this.contentsFace = new Bitmap(this.contentsWidth() + 1300, this.contentsHeight() + 1300);
    };
    SceneManager.currentScene = function () {
        return this._scene
    };
    const _Window_Base_destroyContents = Window_Base.prototype.destroyContents
    Window_Base.prototype.destroyContents = function () {
        _Window_Base_destroyContents.call(this);
        if (this.contentsFace) {
            this.contentsFace.destroy();
        }
    };

    Window_BattleStatus.prototype.createContents = function () {
        const width = this.contentsWidth();
        const height = this.contentsHeight();
        this.destroyContents();
        this.contents = new Bitmap(width + 500, height);
        this.contentsBack = new Bitmap(width + 500, height);
        this.contentsFace = new Bitmap(width + 500, height);
        this.resetFontSettings();
    };
    Window_BattleStatus.prototype.faceRect = function (index) {
        const rect = this.itemRect2(index);
        rect.pad(-1);
        rect.height = this.nameY(rect) + this.gaugeLineHeight() / 2 - rect.y;
        return rect;
    };
    Window_BattleStatus.prototype.drawItemImage = function (index) {
        const actor = this.actor(index);
        const rect = this.faceRect(index)
        this._contentsSprite.scale.x = 0.7
        this._contentsSprite.scale.y = 0.7
        this.drawActorFace(actor, rect.x + 27, rect.y, rect.width, rect.height - 95);
    };
    Window_SkillStatus.prototype.drawActorSimpleStatus = function (actor, x, y) {
        const lineHeight = this.lineHeight();
        const x2 = x + 360;
        this.drawActorName(actor, x + 180, y - 18);
        this.drawActorLevel(actor, x + 180, y + 12 + lineHeight * 1);
        this.drawActorIcons(actor, x, (y - lineHeight * 1.5));
        this.drawActorClass(actor, x + 180, y + 10);
        this.placeBasicGauges(actor, x2, y + lineHeight);
    };
    Window_StatusBase.prototype.drawActorSimpleStatus = function (actor, x, y) {
        const lineHeight = this.lineHeight();
        const x2 = x + 360;
        this.drawActorName(actor, x - 40, y - 18);
        this.drawActorLevel(actor, x - 40, y + 12 + lineHeight * 1);
        this.drawActorIcons(actor, x, (y - lineHeight * 1.5));
        this.drawActorClass(actor, x - 40, y + 10);
        this.placeBasicGauges(actor, x2 - 20, y + 10 + lineHeight);
    };
    Sprite_Gauge.prototype.bitmapWidth = function () {
        return 192;
    };
    Window_MenuCommand.prototype.itemRectWithPadding = function (index) {
        const rect = this.itemRect(index);
        const padding = this.itemPadding();
        rect.x += padding - 50;
        rect.width -= padding * 2;
        return rect;
    };

    Scene_Menu.prototype.createWindowLayer = function () {
        this._windowLayer = new WindowLayer();
        this._windowLayer.x = (Graphics.width - Graphics.boxWidth) / 2;
        this._windowLayer.y = ((Graphics.height - Graphics.boxHeight) / 2) - 68;
        this.addChild(this._windowLayer);
    };
    Window_SavefileList.prototype.itemRect = function (index) {
        const maxCols = this.maxCols();
        const itemWidth = this.itemWidth();
        const itemHeight = this.itemHeight();
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const col = index % maxCols;
        const row = Math.floor(index / maxCols);
        const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
        const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
        const width = itemWidth - colSpacing;
        const height = itemHeight - rowSpacing;
        return new Rectangle(x + 50, y, width, height);
    };
    Window_EquipSlot.prototype.itemRect = function (index) {
        const maxCols = this.maxCols();
        const itemWidth = this.itemWidth();
        const itemHeight = this.itemHeight();
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const col = index % maxCols;
        const row = Math.floor(index / maxCols);
        const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
        const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
        const width = itemWidth - colSpacing;
        const height = itemHeight - rowSpacing;
        return new Rectangle(x + 50, y + 24, width, height + 24);
    };
    Window_SavefileList.prototype.rowSpacing = function () {
        return -26;
    };
    Window_StatusBase.prototype.itemRect = function (index) {
        const maxCols = this.maxCols();
        const itemWidth = this.itemWidth();
        const itemHeight = this.itemHeight() - 10;
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing() - 20;
        const col = index % maxCols;
        const row = Math.floor(index / maxCols);
        const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
        const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
        const width = itemWidth - colSpacing;
        const height = itemHeight - rowSpacing;
        return new Rectangle(x + 50, y, width + 50, height);
    };
    Window_Command.prototype.refreshCursor = function () {
        if (this.index() >= 0) {
            this.changeTextColor(ColorManager.dimColor2());
            let srect;
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 10;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 11.5;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 12, y: rect.y - 12, width: rect2.width, height: rect.height };
            if (!this.isCommandEnabled(this.index()))
                srect = { x: 32, y: 32, width: 32, height: 32 };
            else
                srect = { x: 0, y: 32, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite2.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite2, srect, drect, m);
        }
    };
    Window_StatusBase.prototype.drawActorFace = function (
        actor, x, y, width, height
    ) {
        this.drawFace(actor.faceName(), actor.faceIndex(), x - 30, y, width, height);
    };
    Window_Status.prototype.drawActorFace = function (
        actor, x, y, width, height
    ) {
        this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
    };
    Window_BattleStatus.prototype.drawActorFace = function (
        actor, x, y, width, height
    ) {
        this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
    };
    Window_MenuCommand.prototype.itemRect = function (index) {
        const maxCols = this.maxCols();
        const itemWidth = this.itemWidth();
        const itemHeight = this.itemHeight() + 25;
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing() + 35;
        const col = index % maxCols;
        const row = Math.floor(index / maxCols);
        const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
        const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
        const width = itemWidth - colSpacing;
        const height = itemHeight - rowSpacing;
        return new Rectangle(x, y, width, height);
    };
    Window_MenuCommand.prototype.drawItem = function (index) {
        const rect = this.itemLineRect(index);
        const align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x + 48, rect.y - 48, rect.width, align);
    };
    Scene_Menu.prototype.commandWindowRect = function () {
        const ww = this.mainCommandWidth();
        const wh = this.mainAreaHeight() - this.goldWindowRect().height;
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = this.mainAreaTop();
        return new Rectangle(wx - 140, wy + 45, ww + 180, wh + 20);
    };
    Window_MenuCommand.prototype._refreshButton = function (index) {
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 3;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding + 9;
        rect.height -= padding * 2;
        const drect = { x: rect2.x - 12, y: rect.y - 12, width: rect2.width, height: rect.height + 25 };
        const srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite.children) {
            child.bitmap = this._windowbutton;
        }
        this._setRectPartsGeometry(this._buttonSprite, srect, drect, m);
    };
    Window_Gold.prototype._refreshButton = function (index) {
        const rect2 = this.itemRect(index);
        const padding2 = this.itemPadding();
        rect2.x += padding2 + 3;
        rect2.width -= padding2 * 2;
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding + 8;
        rect.height -= padding * 2;
        const drect = { x: rect2.x - 12, y: rect.y - 10, width: rect2.width + 15, height: rect.height + 25 };
        const srect = { x: 0, y: 0, width: 32, height: 32 };
        const m = 12;
        for (const child of this._buttonSprite.children) {
            child.bitmap = this._windowbutton;
        }
        this._setRectPartsGeometry(this._buttonSprite, srect, drect, m);
    };
    Window_MenuCommand.prototype.refreshCursor = function () {
        if (this.index() >= 0) {
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 3;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 9;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 12, y: rect.y - 12, width: rect2.width, height: rect.height + 25 };
            const srect = { x: 0, y: 32, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite2.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite2, srect, drect, m);
        }
    };
    Window_NumberInput.prototype.drawItem2 = function () {

    };
    Window_Message.prototype.lineHeight = function () {
        return 24;
    };
    Window_Message.prototype.calcTextHeight = function (textState) {
        const lineSpacing = this.lineHeight() - 16;
        const lastFontSize = this.contents.fontSize;
        const lines = textState.text.slice(textState.index).split("\n");
        const textHeight = this.maxFontSizeInLine(lines[0]) + lineSpacing;
        this.contents.fontSize = lastFontSize;
        return textHeight;
    };
    Window_Message.prototype.resetFontSettings = function () {
        this.contents.fontFace = $gameSystem.mainFontFace();
        this.contents.fontSize = 16;
        this.resetTextColor();
    };
    Window_MenuCommand.prototype.refreshCursor2 = function () {
        if (this.index() >= 0) {
            let srect;
            const rect2 = this.itemRect(this.index());
            const padding2 = this.itemPadding();
            rect2.x += padding2 + 3;
            rect2.width -= padding2 * 2;
            const rect = this.itemRectWithPadding(this.index());
            const padding = (rect.height - this.lineHeight()) / 2;
            rect.y += padding + 9;
            rect.height -= padding * 2;
            const drect = { x: rect2.x - 24, y: rect.y + 16, width: 32, height: 32 };
            srect = { x: 32, y: 0, width: 32, height: 32 };
            const m = 12;
            for (const child of this._buttonSprite3.children) {
                child.bitmap = this._windowbutton;
            }
            this._setRectPartsGeometry(this._buttonSprite3, srect, drect, m);
        }
    };
    Scene_Menu.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createStatusWindow();
        this.createCommandWindow();
        this.createGoldWindow();
    };
    Scene_Menu.prototype.goldWindowRect = function () {
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(1, true);
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = this.mainAreaBottom() - wh;
        return new Rectangle(wx - 10, wy - 60, ww + 30, wh + 20);
    };
    Window_Gold.prototype.refresh = function () {
        this._createButtonSprite()
        this._refreshButton(0);
        const rect = this.itemLineRect(0);
        const x = rect.x;
        const y = rect.y;
        const width = rect.width;
        this.contents.clear();
        this.drawCurrencyValue(this.value(), this.currencyUnit(), x, y + 10, width);
    };
    Scene_Map.prototype.updateMainMultiply = function () {
        if (this.isFastForward()) {
            this.cancelMessageWait();
        }
        this.updateMain();
    };
    Scene_Base.prototype.buttonY = function () {
        const offsetY = Math.floor((this.buttonAreaHeight() - 48) / 2) - 25;
        return this.buttonAreaTop() + offsetY;
    };
    Scene_Menu.prototype.buttonY = function () {
        const offsetY = Math.floor((this.buttonAreaHeight() - 48) / 2) + 43;
        return this.buttonAreaTop() + offsetY;
    };
    Scene_Battle.prototype.buttonY = function () {
        const offsetY = Math.floor((this.buttonAreaHeight() - 48) / 2) + 300;
        return this.buttonAreaTop() + offsetY;
    };
    Window_MenuCommand.prototype.itemLineRect = function (index) {
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding + 57;
        rect.height -= padding * 2;
        return rect;
    };
    Window_TitleCommand.prototype.initialize = function (rect) {
        Window_Command.prototype.initialize.call(this, rect);
        this.openness = 255;
        this.selectLast();
    };
    Window_Selectable.prototype.drawAllItems = function () {
        const topIndex = this.topIndex();
        for (let i = 0; i < this.maxVisibleItems(); i++) {
            const index = topIndex + i;
            if (index < this.maxItems()) {
                this.drawItemBackground(index);
                this.drawItem(index);
                this._createButtonSprite()
                this._refreshButton(index);
            }
        }
    };
    Window_BattleStatus.prototype.drawAllItems = function () {
        const topIndex = this.topIndex();
        for (let i = 0; i < this.maxVisibleItems(); i++) {
            const index = topIndex + i;
            if (index < this.maxItems()) {
                this.drawItemBackground(index);
                this.drawItem(index);
                this._createButtonSprite()
                this._createButtonSprite4()
                this._createButtonSprite5()
                this._refreshButton3(index);
                this._refreshButton4(index);
                this._refreshButton(index);
            }
        }
    };
})();