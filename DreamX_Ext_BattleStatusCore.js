/*:
 * @plugindesc v1.6
 * @author DreamX
 *
 * @param --General Status--
 *
 * @param Battle Status Frame Opacity
 * @desc From 0 to 1 Default: 1
 * @default 1
 *
 * @param Battle Status Window Opacity
 * @desc Includes frame. Default: 255
 * @default 255
 *
 * @param Battle Status Width
 * @desc Eval. Default: Graphics.boxWidth - 192
 * @default Graphics.boxWidth - 192
 *
 * @param Battle Status Height
 * @desc Eval. Default: this.fittingHeight(this.numVisibleRows())
 * @default this.fittingHeight(this.numVisibleRows())
 *
 * @param Battle Status Input X
 * @desc Eval. Default: this._partyCommandWindow.width
 * @default this._partyCommandWindow.width
 *
 * @param Battle Status Action X
 * @desc Eval. Default: this._partyCommandWindow.width / 2
 * @default this._partyCommandWindow.width / 2
 *
 * @param Battle Status Y
 * @desc Eval. Default: Graphics.boxHeight - this.windowHeight()
 * @default Graphics.boxHeight - this.windowHeight()
 *
 * @param Battle Status Rows
 * @desc Eval. Default: 1
 * @default 1
 *
 * @param Battle Status Item Width
 * @desc Eval. Default: this.contents.width / this.maxCols()
 * @default this.contents.width / this.maxCols()
 *
 * @param Battle Status Item Height
 * @desc Eval. Default: this.lineHeight() * this.numVisibleRows()
 * @default this.lineHeight() * this.numVisibleRows()
 *
 * @param Battle Status Columns
 * @desc Eval. Default: Yanfly.Param.BSWAdjustCol ? this.maxItems() : $gameParty.maxBattleMembers()
 * @default Yanfly.Param.BSWAdjustCol ? this.maxItems() : $gameParty.maxBattleMembers()
 *
 * @param Battle Status Max Visible Rows
 * @desc Eval. Default: Yanfly.Param.BECCommandRows || 4
 * @default Yanfly.Param.BECCommandRows || 4
 *
 * @param Battle Status Spacing
 * @desc Eval. Horizontal spacing between status rectangles. Default: 0
 * @default 0
 *
 * @param Battle Status Dummy Windows
 * @desc Create dummy windows for selection rectangles. Default: false
 * @default false
 *
 * @param Battle Status Dummy Window Prevent Cutoff
 * @desc Prevent dummy window from being made if it would go out of bounds. Default: true
 * @default true
 *
 * @param Battle Status Dummy Window Quantity
 * @desc Number of dummy windows to make. Default: $gameParty.battleMembers().length
 * @default $gameParty.battleMembers().length
 *
 * @param Flash Current Actor Rect
 * @desc Whether to have a flashing cursor on rect of current actor. Default: false
 * @default false
 * 
 * @param Battle Status Dim Window
 * @desc Whether to have a dim window. Good idea to use 0 for opacity parameter if true. Default: false
 * @default false
 * 
 * @param Allow Switch Actor With Directional Buttons
 * @desc Allows switching actors in default battle system with directional buttons. Default: true
 * @default true
 
 * @param Allow Left To Party Command
 * @desc Allows pressing left to go to party command. Default: true
 * @default true
 * 
 * @param Allow Cancel To Party Command
 * @desc Allows pressing cancel to go to party command. Default: true
 * @default true
 * 
 * @param Allow Cancel Actor Command
 * @desc Allows canceling actor command with cancel. Default: true
 * @default true
 * 
 * @param Allow Right To Actor Command
 * @desc Allows switching to actor command with right button. Default: true
 * @default true
 * 
 * @param Allow Right To Confirm Turn
 * @desc Allows confirming turns when pressing right. Default: true
 * @default true
 * 
 * @param --Status Faces--
 *
 * @param Draw Face
 * @desc Eval. Default: true
 * @default true
 *
 * @param Draw Face Width
 * @desc Eval. Default: Math.min(rect.width - 8, Window_Base._faceWidth)
 * @default Math.min(rect.width - 8, Window_Base._faceWidth)
 *
 * @param Draw Face Height
 * @desc Eval. Default: Math.min(rect.height - 8, Window_Base._faceHeight)
 * @default Math.min(rect.height - 8, Window_Base._faceHeight)
 *
 * @param Face X
 * @desc Eval. rect.x + rect.width - ww - 6
 * @default rect.x + rect.width - ww - 6
 *
 * @param Face Y
 * @desc Eval. rect.y + 4
 * @default rect.y + 4
 *
 * @param --Status Gauges--
 *
 * @param Current Value Font Size
 * @desc Eval. Default: Yanfly.Param.BSWParamFontSize
 * @default Yanfly.Param.BSWParamFontSize
 *
 * @param Max Value Font Size
 * @desc Eval. Default: Yanfly.Param.BSWParamFontSize
 * @default Yanfly.Param.BSWParamFontSize
 *
 * @param -HP Gauge-
 *
 * @param Draw HP Gauge
 * @desc Eval. Default: true
 * @default true
 *
 * @param Hide HP Gauge
 * @desc Eval. Hide the actual gauge graphic. Default: false
 * @default false
 *
 * @param HP Gauge X
 * @desc Eval. Default: gaugeRect.x
 * @default gaugeRect.x
 *
 * @param HP Gauge Y
 * @desc Eval. Default: gaugeRect.y + gaugeRect.height - this.lineHeight() - (Math.max(16, (Imported.YEP_CoreEngine) ? Yanfly.Param.GaugeHeight : 6))
 * @default gaugeRect.y + gaugeRect.height - this.lineHeight() - (Math.max(16, (Imported.YEP_CoreEngine) ? Yanfly.Param.GaugeHeight : 6))
 *
 * @param HP Gauge Width
 * @desc Eval. Default: gaugeRect.width
 * @default gaugeRect.width
 *
 * @param Hide HP Name
 * @desc Eval. Hide HP Name. Default: false
 * @default false
 *
 * @param HP Name X
 * @desc Eval. eval(paramHpGaugeX)
 * @default eval(paramHpGaugeX)
 *
 * @param HP Name Y
 * @desc Eval. Default: eval(paramHpGaugeY)
 * @default eval(paramHpGaugeY)
 *
 * @param HP Name Width
 * @desc Eval. Default: 44
 * @default 44
 *
 * @param HP Name Alignment
 * @desc Default: left
 * @default left
 *
 * @param Hide HP Values
 * @desc Eval. Hide Values. Default: false
 * @default false
 *
 * @param HP Values X
 * @desc Eval. Default: eval(paramHpGaugeX)
 * @default eval(paramHpGaugeX)
 *
 * @param HP Values Y
 * @desc Eval. Default: eval(paramHpGaugeY)
 * @default eval(paramHpGaugeY)
 *
 * @param HP Values Width
 * @desc Default: eval(paramHpGaugeWidth)
 * @default eval(paramHpGaugeWidth)
 *
 * @param HP Values Alignment
 * @desc When not drawing the max only. Default: right
 * @default right
 *
 * @param -MP Gauge-
 *
 * @param Draw MP Gauge
 * @desc Eval. Default: true
 * @default true
 *
 * @param Hide MP Gauge
 * @desc Eval. Hide the actual gauge graphic. Default: false
 * @default false
 *
 * @param MP Gauge X
 * @desc Eval. Default: gaugeRect.x
 * @default gaugeRect.x
 *
 * @param MP Gauge Y
 * @desc Eval. Default: gaugeRect.y + gaugeRect.height - this.lineHeight()
 * @default gaugeRect.y + gaugeRect.height - this.lineHeight()
 *
 * @param MP Gauge Width
 * @desc Eval. Default: this.getGaugesDrawn(actor) <= 2 ? gaugeRect.width : gaugeRect.width / 2
 * @default this.getGaugesDrawn(actor) <= 2  ? gaugeRect.width : gaugeRect.width / 2
 *
 * @param Hide MP Name
 * @desc Eval. Hide HP Name. Default: false
 * @default false
 *
 * @param MP Name X
 * @desc Eval. Default: eval(paramMpGaugeX)
 * @default eval(paramMpGaugeX)
 *
 * @param MP Name Y
 * @desc Eval. Default: eval(paramMpGaugeY)
 * @default eval(paramMpGaugeY)
 *
 * @param MP Name Width
 * @desc Eval. Default: 44
 * @default 44
 *
 * @param MP Name Alignment
 * @desc Default: left
 * @default left
 *
 * @param Hide MP Values
 * @desc Eval. Hide Values. Default: false
 * @default false
 *
 * @param MP Values X
 * @desc Eval. Default: eval(paramMpGaugeX)
 * @default eval(paramMpGaugeX)
 *
 * @param MP Values Y
 * @desc Eval. Default: eval(paramMpGaugeY)
 * @default eval(paramMpGaugeY)
 *
 * @param MP Values Width
 * @desc Default: eval(paramMpGaugeWidth)
 * @default eval(paramMpGaugeWidth)
 
 * @param MP Values Alignment
 * @desc When not drawing the max only. Default: right
 * @default right
 *
 * @param -TP Gauge-
 *
 * @param Draw TP Gauge
 * @desc Eval. Default: $dataSystem.optDisplayTp
 * @default $dataSystem.optDisplayTp
 *
 * @param Hide TP Gauge
 * @desc Eval. Hide the actual gauge graphic. Default: false
 * @default false
 *
 * @param TP Gauge X
 * @desc Eval. Default: gaugeRect.x + (gaugeRect.width / 2)
 * @default gaugeRect.x + (gaugeRect.width / 2)
 *
 * @param TP Gauge Y
 * @desc Eval. Default: gaugeRect.y + gaugeRect.height - this.lineHeight()
 * @default gaugeRect.y + gaugeRect.height - this.lineHeight()
 *
 * @param TP Gauge Width
 * @desc Eval. Default: gaugeRect.width / 2
 * @default gaugeRect.width / 2
 *
 * @param Hide TP Name
 * @desc Eval. Hide HP Name. Default: false
 * @default false
 *
 * @param TP Name X
 * @desc Eval. Default: eval(paramTpGaugeX)
 * @default eval(paramTpGaugeX)
 *
 * @param TP Name Y
 * @desc Eval. Default: eval(paramTpGaugeY)
 * @default eval(paramTpGaugeY)
 *
 * @param TP Name Width
 * @desc Eval. Default: 44
 * @default 44
 *
 * @param TP Name Alignment
 * @desc Default: left
 * @default left
 *
 * @param Hide TP Values
 * @desc Eval. Hide Values. Default: false
 * @default false
 *
 * @param TP Values X
 * @desc Eval. Default: eval(paramTpGaugeY) + eval(paramTpGaugeWidth) - 64
 * @default eval(paramTpGaugeX) + eval(paramTpGaugeWidth) - 64
 *
 * @param TP Values Y
 * @desc Eval. Default: eval(paramTpGaugeY)
 * @default eval(paramTpGaugeY)
 *
 * @param TP Values Width
 * @desc Default: 64
 * @default 64
 *
 * @param TP Values Alignment
 * @desc Default: right
 * @default right
 *
 * @param -ATB Gauge-
 *
 * @param ATB Gauge X
 * @desc Eval. Default: basicAreaRect.x
 * @default basicAreaRect.x
 *
 * @param ATB Gauge Y
 * @desc Eval. Default: basicAreaRect.y
 * @default basicAreaRect.y
 *
 * @param ATB Gauge Width
 * @desc Eval. Default: basicAreaRect.width
 * @default basicAreaRect.width
 *
 * @param --Status Action Icons--
 *
 * @param Draw Action Icon
 * @desc Eval. Default: true
 * @default true
 *
 * @param Action Icon X
 * @desc Eval. Default: basicAreaRect.x
 * @default basicAreaRect.x
 *
 * @param Action Icon Y
 * @desc Eval. Default: basicAreaRect.y
 * @default basicAreaRect.y
 *
 * @param --Status Names--
 *
 * @param Draw Name
 * @desc Eval. Default: true
 * @default true
 *
 * @param Name X
 * @desc Eval. Default: basicAreaRect.x + Window_Base._iconWidth + 4
 * @default basicAreaRect.x + Window_Base._iconWidth + 4
 *
 * @param Name Y
 * @desc Eval. Default: basicAreaRect.y
 * @default basicAreaRect.y
 *
 * @param Name Width
 * @desc Eval. Default: basicAreaRect.width
 * @default basicAreaRect.width
 *
 * @param Name Alignment
 * @desc Eval. Default: left
 * @default left
 *
 * @param -- Status Icons--
 *
 * @param Draw Icons
 * @desc Eval. Whether to draw normal state icons. Default: true
 * @default true
 *
 * @param Icons X
 * @desc Eval. Default: basicAreaRect.x + 2
 * @default basicAreaRect.x + 2
 *
 * @param Icons Y
 * @desc Eval. Default: basicAreaRect.y + this.lineHeight()
 * @default basicAreaRect.y + this.lineHeight()
 *
 * @param Icons Width
 * @desc Eval. Default: basicAreaRect.width
 * @default basicAreaRect.width
 *
 * @param Icons Height
 * @desc Eval. Default: Window_Base._iconHeight
 * @default Window_Base._iconHeight
 *
 * @param --Rolling States--
 * 
 * @param Rolling States
 * @desc Eval. Use rolling states that alternate the state icons. Default: false
 * @default false
 * 
 * @param Rolling States X
 * @desc Eval. Rolling States Y position. Default: rect.x + Window_Base._iconWidth + (this.textPadding() * 2)
 * @default rect.x + Window_Base._iconWidth + (this.textPadding() * 2)
 
 * @param Rolling States Y
 * @desc Eval. Rolling States Y position. Default: rect.y + this.textPadding() + Window_Base._iconHeight + this.lineHeight()
 * @default rect.y + this.textPadding() + Window_Base._iconHeight + this.lineHeight()
 *
 * @param --Party Command Window--
 *
 * @param Party Command X
 * @desc Eval. Default: 0
 * @default 0
 *
 * @param Party Command Y
 * @desc Eval. Default: Graphics.boxHeight - this.windowHeight()
 * @default Graphics.boxHeight - this.windowHeight()
 *
 * @param Party Command Width
 * @desc Eval. Default: 192
 * @default 192
 *
 * @param Party Command Height
 * @desc Eval. Default: this.fittingHeight(this.numVisibleRows())
 * @default this.fittingHeight(this.numVisibleRows())
 *
 * @param Party Command Rows
 * @desc Eval. Default: Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1)
 * @default Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1)
 *
 * @param Party Command Columns
 * @desc Eval. Default: 1
 * @default 1
 *
 * @param Party Command Visible Rows
 * @desc Eval. Default: 4
 * @default 4
 *
 * @param Party Command Item Width
 * @desc Eval. Default: Math.floor((this.width - this.padding * 2 + this.spacing()) / this.maxCols() - this.spacing())
 * @default Math.floor((this.width - this.padding * 2 + this.spacing()) / this.maxCols() - this.spacing())
 *
 * @param Party Command Item Height
 * @desc Eval. Default: this.lineHeight()
 * @default this.lineHeight()
 * 
 * @param Party Command Opacity
 * @desc Eval. Default: 255
 * @default 255
 * 
 * @param Party Command Dim Window
 * @desc Whether to have a dim window. Good idea to use 0 for opacity parameter if true. Default: false
 * @default false
 *
 * @param --Actor Command Window--
 *
 * @param Actor Command X
 * @desc Eval. Default: 0
 * @default 0
 *
 * @param Actor Command Y
 * @desc Eval. Default: Graphics.boxHeight - this.windowHeight()
 * @default Graphics.boxHeight - this.windowHeight()
 *
 * @param Actor Command Width
 * @desc Eval. Default: 192
 * @default 192
 *
 * @param Actor Command Height
 * @desc Eval. Default: this.fittingHeight(this.numVisibleRows())
 * @default this.fittingHeight(this.numVisibleRows())
 *
 * @param Actor Command Rows
 * @desc Eval. Default: Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1)
 * @default Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1)
 *
 * @param Actor Command Columns
 * @desc Eval. Default: 1
 * @default 1
 *
 * @param Actor Command Visible Rows
 * @desc Eval. Default: 4
 * @default 4
 *
 * @param Actor Command Item Width
 * @desc Eval. Default: Math.floor((this.width - this.padding * 2 + this.spacing()) / this.maxCols() - this.spacing())
 * @default Math.floor((this.width - this.padding * 2 + this.spacing()) / this.maxCols() - this.spacing())
 *
 * @param Actor Command Item Height
 * @desc Eval. Default: this.lineHeight()
 * @default this.lineHeight()
 *
 * @param Actor Command Close When Selecting
 * @desc Eval. Whether to close actor command window when selecting an action. Default: false
 * @default false
 * 
 * @param Actor Command Opacity
 * @desc Eval. Default: 255
 * @default 255
 * 
 * @param Actor Command Dim Window
 * @desc Whether to have a dim window. Good idea to use 0 for opacity parameter if true. Default: false
 * @default false
 *
 * @param --Battle Skill Window--
 *
 * @param Battle Skill X
 * @desc Eval. Default: 0
 * @default 0
 *
 * @param Battle Skill Y
 * @desc Eval. Default: eval(Yanfly.Param.BECLowerWindows) ? Graphics.boxHeight - this._skillWindow.height : this._helpWindow.y + this._helpWindow.height
 * @default eval(Yanfly.Param.BECLowerWindows) ? Graphics.boxHeight - this._skillWindow.height : this._helpWindow.y + this._helpWindow.height
 *
 * @param Battle Skill Width
 * @desc Eval. Default: Graphics.boxWidth
 * @default Graphics.boxWidth
 *
 * @param Battle Skill Height
 * @desc Eval. Default: eval(Yanfly.Param.BECLowerWindows) ? this._skillWindow.fittingHeight(eval(Yanfly.Param.BECWindowRows)) : this._statusWindow.y - (this._helpWindow.y + this._helpWindow.height)
 * @default eval(Yanfly.Param.BECLowerWindows) ? this._skillWindow.fittingHeight(eval(Yanfly.Param.BECWindowRows)) : this._statusWindow.y - (this._helpWindow.y + this._helpWindow.height)
 *
 * @param Battle Skill Rows
 * @desc Eval. Default: Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1)
 * @default Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1)
 *
 * @param Battle Skill Columns
 * @desc Eval. Default: 2
 * @default 2
 *
 * @param Battle Skill Item Width
 * @desc Eval. Default: Math.floor((this.width - this.padding * 2 + this.spacing()) / this.maxCols() - this.spacing())
 * @default Math.floor((this.width - this.padding * 2 + this.spacing()) / this.maxCols() - this.spacing())
 *
 * @param Battle Skill Item Height
 * @desc Eval. Default: this.lineHeight()
 * @default this.lineHeight()
 * 
 * @param Battle Skill Opacity
 * @desc Eval. Default: 255
 * @default 255
 * 
 * @param Battle Skill Dim Window
 * @desc Whether to have a dim window. Good idea to use 0 for opacity parameter if true. Default: false
 * @default false
 *
 * @param --Battle Item Window--
 *
 * @param Battle Item X
 * @desc Eval. Default: 0
 * @default 0
 *
 * @param Battle Item Y
 * @desc Eval. Default: eval(Yanfly.Param.BECLowerWindows) ? Graphics.boxHeight - this._itemWindow.height : this._helpWindow.y + this._helpWindow.height
 * @default eval(Yanfly.Param.BECLowerWindows) ? Graphics.boxHeight - this._itemWindow.height : this._helpWindow.y + this._helpWindow.height
 *
 * @param Battle Item Width
 * @desc Eval. Default: Graphics.boxWidth
 * @default Graphics.boxWidth
 *
 * @param Battle Item Height
 * @desc Eval. Default: eval(Yanfly.Param.BECLowerWindows) ? this._itemWindow.fittingHeight(eval(Yanfly.Param.BECWindowRows)) : this._statusWindow.y - (this._helpWindow.y + this._helpWindow.height)
 * @default eval(Yanfly.Param.BECLowerWindows) ? this._itemWindow.fittingHeight(eval(Yanfly.Param.BECWindowRows)) : this._statusWindow.y - (this._helpWindow.y + this._helpWindow.height)
 *
 * @param Battle Item Rows
 * @desc Eval. Default: Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1)
 * @default Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1)
 *
 * @param Battle Item Columns
 * @desc Eval. Default: 2
 * @default 2
 *
 * @param Battle Item Item Width
 * @desc Eval. Default: Math.floor((this.width - this.padding * 2 + this.spacing()) / this.maxCols() - this.spacing())
 * @default Math.floor((this.width - this.padding * 2 + this.spacing()) / this.maxCols() - this.spacing())
 *
 * @param Battle Item Item Height
 * @desc Eval. Default: this.lineHeight()
 * @default this.lineHeight()
 * 
 * @param Battle Item Opacity
 * @desc Eval. Default: 255
 * @default 255
 * 
 * @param Battle Item Dim Window
 * @desc Whether to have a dim window. Good idea to use 0 for opacity parameter if true. Default: false
 * @default false
 *
 * @param --Help Window--
 *
 * @param Help Window X
 * @desc Eval. Default: 0
 * @default 0
 *
 * @param Help Window Y
 * @desc Eval. Default: 0
 * @default 0
 *
 * @param Help Window Width
 * @desc Eval. Default: Graphics.boxWidth
 * @default Graphics.boxWidth
 *
 * @param Help Window Height
 * @desc Eval. Default: this._helpWindow.fittingHeight(2)
 * @default this._helpWindow.fittingHeight(2)
 * 
 * @param Help Window Opacity
 * @desc Eval. Default: 255
 * @default 255
 * 
 * @param Help Window Dim Window
 * @desc Whether to have a dim window. Good idea to use 0 for opacity parameter if true. Default: false
 * @default false
 *
 * @param --Battle Log Window--
 *
 * @param Battle Log X
 * @desc Eval. Default: 0
 * @default 0
 *
 * @param Battle Log Y
 * @desc Eval. Default: 0
 * @default 0
 *
 * @param Battle Log Width
 * @desc Eval. Default: Graphics.boxWidth
 * @default Graphics.boxWidth
 *
 * @param Battle Log Height
 * @desc Eval. Default: this.fittingHeight(this.maxLines())
 * @default this.fittingHeight(this.maxLines())
 *
 * @param Battle Log Window Style
 * @desc Eval. Whether Battle Log Window appears like a normal window. Default: false
 * @default false
 * 
 * @param Battle Log Window Opacity
 * @desc Eval. Default: 0
 * @default 0
 * 
 * @param Battle Log Window Background Type
 * @desc 0 - default window, 1 - dimmer, 2 - none Default: 0
 * @default 0
 *
 * @param --Battler Picture--
 *
 * @param Show Battler Picture
 * @desc Eval. Whether to show battler picture Default: false
 * @default false
 *
 * @param Always Show Battler Picture
 * @desc Eval. Whether to always show battler picture Default: false
 * @default false
 *
 * @param Show Battler Picture When Inputting
 * @desc Eval. Show battler picture when battler is inputting Default: true
 * @default true
 *
 * @param Show Battler Picture When Targeted By Enemy
 * @desc Eval. Show battler picture when targeted by enemy Default: false
 * @default false
 *
 * @param Show Battler Picture When Targeted By Ally
 * @desc Eval. Show battler picture when targeted by ally Default: false
 * @default false
 *
 * @param Show Battler Picture When Acting
 * @desc Eval. Show battler picture when acting Default: true
 * @default true
 *
 * @param Battler Picture X
 * @desc Eval. Default: (battleStatusWindow.x + battleStatusWindow.standardPadding() + rect.x) + (rect.width / 2) - (this.bitmap.width / 2)
 * @default (battleStatusWindow.x + battleStatusWindow.standardPadding() + rect.x) + (rect.width / 2) - (this.bitmap.width / 2)
 *
 * @param Battler Picture Y
 * @desc Eval. Default: battleStatusWindow.y - this.bitmap.height
 * @default battleStatusWindow.y - this.bitmap.height
 *
 * @param --Frontview--
 *
 * @param Frontview Animations On Top
 * @desc Eval. Animations on actors in frontview appear above battle hud instead of below. Default: false
 * @default false
 * 
 * @param Prevent Frontview Sprite Move
 * @desc Eval. Prevents this plugin from moving the frontview sprites, enabling you to use the settings from other plugins. Default: false
 * @default false
 * 
 * @param Frontview Actor Sprite X
 * @desc Eval. Actor Sprite X in Frontview. Affects where animations on actor are. Default: statusWindow.x + statusWindow.standardPadding() + rect.x + (rect.width / 2)
 * @default statusWindow.x + statusWindow.standardPadding() + rect.x + (rect.width / 2)
 * 
 * @param Frontview Actor Sprite Y
 * @desc Eval. Actor Sprite X in Frontview. Affects where animations on actor are. Default: statusWindow.y + statusWindow.standardPadding() + rect.y + (rect.height / 2) + (this.height / 2)
 * @default statusWindow.y + statusWindow.standardPadding() + rect.y + (rect.height / 2) + (this.height / 2)
 * 
 * @param --Quick Settings--
 *
 * @param Center Animations and Popups On Face
 * @desc Eval. Overrides Frontview Actor Sprite X & Y to be centered on face.  Default: false
 * @default false
 * 
 * @param Center Animations and Popups On Battler Pic
 * @desc Eval. Overrides Frontview Actor Sprite X & Y to be centered on battler pic.  Default: false
 * @default false
 * 
 * @param DreamX Setup Suggestion
 * @desc Overrides several parameters Default: false
 * @default false
 * 
 
 *
 * @help
 * ============================================================================
 * Actor Notetags
 * ============================================================================
 * <HideBattleStatusHp> will hide the hp gauge from the battle status window
 * for the actor.
 *
 * <HideBattleStatusMp> will hide the mp gauge from the battle status window
 * for the actor.
 *
 * <HideBattleStatusTp> will hide the tp gauge from the battle status window
 * for the actor.
 *
 * <HideBattleStatusAtb> will hide the tp gauge from the battle status window
 * for the actor.
 *
 * <BattlerPicture: x> will use x as the actor's picture. See parameters.
 * ============================================================================
 * Tips
 * ============================================================================
 * Other Yanfly plugins like Core Engine, Buffs State Core and of course
 * Battle Status will change how the battle hud looks like. Also look at those
 * parameters to customize your hud.
 *
 * The rect variable refers to the entire rectangle. It's best to use this
 * instead of basicAreaRect, gaugeRect etc if you want to change positioning.
 * ============================================================================
 * DreamX Setup Suggestion Parameter Info
 * ============================================================================
 * This parameter sets up the hud similar to my example screenshot.
 * It overrides parameters for these things:
 *
 * Face X, Width, Height
 * Gauge/Name X, Width
 *
 * Name Y
 * HP Gauge Y
 * MP Gauge Y
 *
 * Icons X, Y
 *
 * Name Alignment
 *
 * Adjust Columns set to true in YEP Battle Status Window
 *
 * Therefore, you can still use the other parameters to your liking to
 * customize further.
 *
 * You can also of course individually use the functions provided by this
 * plugin.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Yanfly for YEP Battle Status Window
 */

var Imported = Imported || {};
Imported.DreamX_Ext_BattleStatusCore = true;

var DreamX = DreamX || {};
DreamX.Ext_BattleStatusCore = DreamX.Ext_BattleStatusCore || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_Ext_BattleStatusCore');

    var paramDrawFace = String(parameters['Draw Face']);
    var paramDrawFaceWidth = String(parameters['Draw Face Width']);
    var paramDrawFaceHeight = String(parameters['Draw Face Height']);
    var paramDrawFaceX = String(parameters['Face X']);
    var paramDrawFaceY = String(parameters['Face Y']);

    var paramHpGauge = String(parameters['Draw HP Gauge']);
    var paramHpGaugeWidth = String(parameters['HP Gauge Width']);
    var paramHpGaugeX = String(parameters['HP Gauge X']);
    var paramHpGaugeY = String(parameters['HP Gauge Y']);
    var paramHpHideGauge = String(parameters['Hide HP Gauge']);
    var paramHpHideName = String(parameters['Hide HP Name']);
    var paramHpNameX = String(parameters['HP Name X']);
    var paramHpNameY = String(parameters['HP Name Y']);
    var paramHpNameAlignment = String(parameters['HP Name Alignment']);
    var paramHpNameWidth = String(parameters['HP Name Width']);
    var paramHpValuesX = String(parameters['HP Values X']);
    var paramHpValuesY = String(parameters['HP Values Y']);
    var paramHpValuesWidth = String(parameters['HP Values Width']);
    var paramHpValuesAlignment = String(parameters['HP Values Alignment']);
    var paramHpHideValues = String(parameters['Hide HP Values']);

    var paramMpGauge = String(parameters['Draw MP Gauge']);
    var paramMpGaugeX = String(parameters['MP Gauge X']);
    var paramMpGaugeY = String(parameters['MP Gauge Y']);
    var paramMpGaugeWidth = String(parameters['MP Gauge Width']);
    var paramMpHideGauge = String(parameters['Hide MP Gauge']);
    var paramMpHideName = String(parameters['Hide MP Name']);
    var paramMpNameX = String(parameters['MP Name X']);
    var paramMpNameY = String(parameters['MP Name Y']);
    var paramMpNameAlignment = String(parameters['MP Name Alignment']);
    var paramMpNameWidth = String(parameters['MP Name Width']);
    var paramMpValuesX = String(parameters['MP Values X']);
    var paramMpValuesY = String(parameters['MP Values Y']);
    var paramMpValuesWidth = String(parameters['MP Values Width']);
    var paramMpValuesAlignment = String(parameters['MP Values Alignment']);
    var paramMpHideValues = String(parameters['Hide MP Values']);

    var paramTpGauge = String(parameters['Draw TP Gauge']);
    var paramTpGaugeX = String(parameters['TP Gauge X']);
    var paramTpGaugeY = String(parameters['TP Gauge Y']);
    var paramTpGaugeWidth = String(parameters['TP Gauge Width']);
    var paramTpHideGauge = String(parameters['Hide TP Gauge']);
    var paramTpHideName = String(parameters['Hide TP Name']);
    var paramTpNameX = String(parameters['TP Name X']);
    var paramTpNameY = String(parameters['TP Name Y']);
    var paramTpNameAlignment = String(parameters['TP Name Alignment']);
    var paramTpNameWidth = String(parameters['TP Name Width']);
    var paramTpValuesX = String(parameters['TP Values X']);
    var paramTpValuesY = String(parameters['TP Values Y']);
    var paramTpValuesWidth = String(parameters['TP Values Width']);
    var paramTpValuesAlignment = String(parameters['TP Values Alignment']);
    var paramTpHideValues = String(parameters['Hide TP Values']);


    var paramDrawActionIcon = String(parameters['Draw Action Icon']);
    var paramActionIconX = String(parameters['Action Icon X']);
    var paramActionIconY = String(parameters['Action Icon Y']);

    var paramAtbGaugeX = String(parameters['ATB Gauge X']);
    var paramAtbGaugeY = String(parameters['ATB Gauge Y']);
    var paramAtbGaugeWidth = String(parameters['ATB Gauge Width']);

    var paramDrawName = String(parameters['Draw Name']);
    var paramNameX = String(parameters['Name X']);
    var paramNameY = String(parameters['Name Y']);
    var paramNameWidth = String(parameters['Name Width']);
    var paramNameAlign = String(parameters['Name Alignment']);


    var paramDrawIcons = String(parameters['Draw Icons']);
    var paramIconsX = String(parameters['Icons X']);
    var paramIconsY = String(parameters['Icons Y']);
    var paramIconsWidth = String(parameters['Icons Width']);
    var paramIconsHeight = String(parameters['Icons Height']);

    var paramActorCommandCloseSelect = String(parameters['Actor Command Close When Selecting']);
    var paramFrontViewSpriteMovePrevent = String(parameters['Prevent Frontview Sprite Move']);




    var paramFrameOpacity = parseInt(String(parameters['Battle Status Frame Opacity']));
    var paramWindowOpacity = parseInt(String(parameters['Battle Status Window Opacity']));

    var paramDXStyle = eval(String(parameters['DreamX Setup Suggestion']));


    var paramBattleStatusDim = String(parameters['Battle Status Dim Window']);
    var paramPartyCommandDim = String(parameters['Party Command Dim Window']);
    var paramActorCommandDim = String(parameters['Actor Command Dim Window']);
    var paramBattleSkillDim = String(parameters['Battle Skill Dim Window']);
    var paramBattleItemDim = String(parameters['Battle Item Dim Window']);
    var paramHelpDim = String(parameters['Help Window Dim Window']);

    var paramActorCommandX = String(parameters['Actor Command X']);
    var paramActorCommandY = String(parameters['Actor Command Y']);
    var paramActorCommandW = String(parameters['Actor Command Width']);
    var paramActorCommandH = String(parameters['Actor Command Height']);
    var paramActorCommandRows = String(parameters['Actor Command Rows']);
    var paramActorCommandCols = String(parameters['Actor Command Columns']);
    var paramActorCommandVisRows = String(parameters['Actor Command Visible Rows']);
    var paramActorCommandItemWidth = String(parameters['Actor Command Item Width']);
    var paramActorCommandItemHeight = String(parameters['Actor Command Item Height']);
    var paramActorCommandOpacity = String(parameters['Actor Command Opacity']);

    var paramPartyCommandX = String(parameters['Party Command X']);
    var paramPartyCommandY = String(parameters['Party Command Y']);
    var paramPartyCommandW = String(parameters['Party Command Width']);
    var paramPartyCommandH = String(parameters['Party Command Height']);
    var paramPartyCommandRows = String(parameters['Party Command Rows']);
    var paramPartyCommandCols = String(parameters['Party Command Columns']);
    var paramPartyCommandVisRows = String(parameters['Party Command Visible Rows']);
    var paramPartyCommandItemWidth = String(parameters['Party Command Item Width']);
    var paramPartyCommandItemHeight = String(parameters['Party Command Item Height']);
    var paramPartyCommandOpacity = String(parameters['Party Command Opacity']);

    var paramBattleSkillX = String(parameters['Battle Skill X']);
    var paramBattleSkillY = String(parameters['Battle Skill Y']);
    var paramBattleSkillW = String(parameters['Battle Skill Width']);
    var paramBattleSkillH = String(parameters['Battle Skill Height']);
    var paramBattleSkillRows = String(parameters['Battle Skill Rows']);
    var paramBattleSkillCols = String(parameters['Battle Skill Columns']);
    var paramBattleSkillItemWidth = String(parameters['Battle Skill Item Width']);
    var paramBattleSkillItemHeight = String(parameters['Battle Skill Item Height']);
    var paramBattleSkillOpacity = String(parameters['Battle Skill Opacity']);

    var paramBattleItemX = String(parameters['Battle Item X']);
    var paramBattleItemY = String(parameters['Battle Item Y']);
    var paramBattleItemW = String(parameters['Battle Item Width']);
    var paramBattleItemH = String(parameters['Battle Item Height']);
    var paramBattleItemRows = String(parameters['Battle Item Rows']);
    var paramBattleItemCols = String(parameters['Battle Item Columns']);
    var paramBattleItemItemWidth = String(parameters['Battle Item Item Width']);
    var paramBattleItemItemHeight = String(parameters['Battle Item Item Height']);
    var paramBattleItemOpacity = String(parameters['Battle Item Opacity']);

    var paramHelpX = String(parameters['Help Window X']);
    var paramHelpY = String(parameters['Help Window Y']);
    var paramHelpW = String(parameters['Help Window Width']);
    var paramHelpH = String(parameters['Help Window Height']);
    var paramHelpOpacity = String(parameters['Help Window Opacity']);

    var paramBLogX = String(parameters['Battle Log X']);
    var paramBLogY = String(parameters['Battle Log Y']);
    var paramBLogW = String(parameters['Battle Log Width']);
    var paramBLogH = String(parameters['Battle Log Height']);
    var paramBLogRegWindowStyle = String(parameters['Battle Log Window Style']);
    var paramBLogOpacity = String(parameters['Battle Log Window Opacity']);


    var paramCurrentValueFontSize = String(parameters['Current Value Font Size']);
    var paramMaxValueFontSize = String(parameters['Max Value Font Size']);

    var paramStatusWidth = String(parameters['Battle Status Width']);
    var paramStatusHeight = String(parameters['Battle Status Height']);
    var paramStatusInputX = String(parameters['Battle Status Input X']);
    var paramStatusActionX = String(parameters['Battle Status Action X']);
    var paramStatusY = String(parameters['Battle Status Y']);
    var paramStatusRows = String(parameters['Battle Status Rows']);
    var paramStatusCols = String(parameters['Battle Status Columns']);
    var paramStatusVisRows = String(parameters['Battle Status Max Visible Rows']);
    var paramStatusItemWidth = String(parameters['Battle Status Item Width']);
    var paramStatusItemHeight = String(parameters['Battle Status Item Height']);
    var paramStatusSpacing = String(parameters['Battle Status Spacing']);
    var paramStatusDummyWindows = String(parameters['Battle Status Dummy Windows']);
    var paramStatusDummyPreventCutoff = String(parameters['Battle Status Dummy Window Prevent Cutoff']);
    var paramStatusDummyQuantity = String(parameters['Battle Status Dummy Window Quantity']);

    var paramShowBattlerPic = String(parameters['Show Battler Picture']);
    var paramShowBattlerPicAlways = String(parameters['Always Show Battler Picture']);
    var paramShowBattlerPicInput = String(parameters['Show Battler Picture When Inputting']);
    var paramShowBattlerEnemyTarget = String(parameters['Show Battler Picture When Targeted By Enemy']);
    var paramShowBattlerAllyTarget = String(parameters['Show Battler Picture When Targeted By Ally']);
    var paramShowBattlerActing = String(parameters['Show Battler Picture When Acting']);
    var paramBattlerPicX = String(parameters['Battler Picture X']);
    var paramBattlerPicY = String(parameters['Battler Picture Y']);



    var paramRollingStates = String(parameters['Rolling States']);
    var paramRollingStatesX = String(parameters['Rolling States X']);
    var paramRollingStatesY = String(parameters['Rolling States Y']);

    var paramFlashCurrentActorRect = String(parameters['Flash Current Actor Rect']);

    var paramActorSpriteFrontViewX = String(parameters['Frontview Actor Sprite X']);
    var paramActorSpriteFrontViewY = String(parameters['Frontview Actor Sprite Y']);

    var paramTopAnimations = String(parameters['Frontview Animations On Top']);
    var paramCenterFrontViewSprites = eval(parameters['Center Animations and Popups On Face']);
    var paramCenterFrontViewSpritesOnBPic = eval(parameters['Center Animations and Popups On Battler Pic']);


    var paramBattlerPicY = String(parameters['Battler Picture Y']);

    var paramDirButtonSwitchActor = String(parameters['Allow Switch Actor With Directional Buttons']);
    var paramPressCancelToPartyCommand = String(parameters['Allow Cancel To Party Command']);
    var paramPressCancelToCancelActorCommand = String(parameters['Allow Cancel Actor Command']);
    var paramLeftPartyCommand = String(parameters['Allow Left To Party Command']);
    var paramRightConfirmTurn = String(parameters['Allow Right To Confirm Turn']);
    var paramRightActorCommand = String(parameters['Allow Right To Actor Command']);




    if (paramDXStyle) {
        paramDrawFaceX = "rect.x";
        paramDrawFaceWidth = "144";
        paramDrawFaceHeight = "144";

        paramHpGaugeX = "this.DXGaugeNameX(actor, rect)";
        paramMpGaugeX = "this.DXGaugeNameX(actor, rect)";
        paramTpGaugeX = "this.DXGaugeNameX(actor, rect)";
        paramAtbGaugeX = "this.DXGaugeNameX(actor, rect)";
        paramNameX = "this.DXGaugeNameX(actor, rect)";

        paramHpGaugeWidth = "this.DXGaugeNameWidth(actor, rect)";
        paramMpGaugeWidth = "this.DXGaugeNameWidth(actor, rect)";
        paramTpGaugeWidth = "this.DXGaugeNameWidth(actor, rect)";
        paramAtbGaugeWidth = "this.DXGaugeNameWidth(actor, rect)";
        paramNameWidth = "this.DXGaugeNameWidth(actor, rect)";

        paramHpGaugeY = "rect.y + this.lineHeight()";
        paramMpGaugeY = "rect.y + this.lineHeight() * 2";
        paramNameY = "rect.y";
        paramIconsX = "this.DXIconX(actor, rect)";
        paramIconsY = "rect.y + rect.height - Window_Base._iconHeight - this.textPadding()";
        Yanfly.Param.BSWAdjustCol = true;

        paramNameAlign = "center";
    }

    if (paramCenterFrontViewSprites) {
        paramActorSpriteFrontViewX = "statusWindow.x + eval(paramDrawFaceX) + statusWindow.standardPadding() + (ww / 2)";
        paramActorSpriteFrontViewY = "statusWindow.y + eval(paramDrawFaceY) + statusWindow.standardPadding() + (wh / 2) + (this.height / 2)";
    }

    if (paramCenterFrontViewSpritesOnBPic) {
        paramActorSpriteFrontViewX = "currentBattlerSprite ? currentBattlerSprite.x + (currentBattlerSprite.width/2) : 0";
        paramActorSpriteFrontViewY = "currentBattlerSprite ? currentBattlerSprite.y + (currentBattlerSprite.height/2) + (this.height/2)  : 0";
    }

    //==========================================================================
    // DataManager
    //==========================================================================
    DreamX.Ext_BattleStatusCore.DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        DreamX.Ext_BattleStatusCore.DataManager_loadDatabase.call(this);
        if (!Imported.YEP_CoreEngine) {
            throw new Error('DreamX_Ext_BattleStatusCore requires YEP_CoreEngine');
        }
        if (!Imported.YEP_BattleEngineCore) {
            throw new Error('DreamX_Ext_BattleStatusCore requires YEP_BattleEngineCore');
        }
        if (!Imported.YEP_BattleStatusWindow) {
            throw new Error('DreamX_Ext_BattleStatusCore requires YEP_BattleStatusWindow');
        }
    };

    //==========================================================================
    // Window_BattleStatus
    //==========================================================================
    DreamX.Ext_BattleStatusCore.Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
    Window_BattleStatus.prototype.initialize = function () {
        DreamX.Ext_BattleStatusCore.Window_BattleStatus_initialize.call(this);
        this._windowFrameSprite.alpha = paramFrameOpacity;
        this.opacity = paramWindowOpacity;
        this.y = eval(paramStatusY);
        if (eval(paramStatusDummyWindows)) {
            this.createDummyWindows();
        }
        if (eval(paramRollingStates)) {
            this.createRollingStates();
        }
        if (eval(paramBattleStatusDim)) {
            this.showBackgroundDimmer();
        }
    };

    DreamX.Ext_BattleStatusCore.Window_BattleStatus_update = Window_BattleStatus.prototype.update;
    Window_BattleStatus.prototype.update = function () {
        DreamX.Ext_BattleStatusCore.Window_BattleStatus_update.call(this);
        if (!this.active && eval(paramFlashCurrentActorRect)) {
            this._animationCount++;
        }
    };

    DreamX.Ext_BattleStatusCore.Window_BattleStatus_refresh = Window_BattleStatus.prototype.refresh;
    Window_BattleStatus.prototype.refresh = function () {
        DreamX.Ext_BattleStatusCore.Window_BattleStatus_refresh.call(this);
        if (!this._rollingStateSprites) {
            return;
        }
        for (var i = 0; i < this._rollingStateSprites.length; i++) {
            var stateSprite = this._rollingStateSprites[i];
            var battler = $gameParty.battleMembers()[i];
            if (battler !== stateSprite.battler()) {
                stateSprite.setup(battler);
            }
        }
    };

    Window_BattleStatus.prototype.createRollingStates = function () {
        this._rollingStateSprites = [];
        for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
            var rect = this.itemRect(i);
            var basicAreaRect = this.basicAreaRect(i);
            var stateSprite = new Sprite_StateIconActorStatus();

            this._rollingStateSprites.push(stateSprite);
            stateSprite.x = eval(paramRollingStatesX);
            stateSprite.y = eval(paramRollingStatesY);

            this.addChild(stateSprite);
        }
    };

    Window_BattleStatus.prototype.itemWidth = function () {
        return eval(paramStatusItemWidth);
    };

    Window_BattleStatus.prototype.itemHeight = function () {
        return eval(paramStatusItemHeight);
    };

    Window_BattleStatus.prototype._updateCursor = function () {
        var blinkCount = this._animationCount % 40;
        var cursorOpacity = this.contentsOpacity;

        if (this.active || eval(paramFlashCurrentActorRect)) {
            if (blinkCount < 20) {
                cursorOpacity -= blinkCount * 8;
            } else {
                cursorOpacity -= (40 - blinkCount) * 8;
            }
        }
        this._windowCursorSprite.alpha = cursorOpacity / 255;
        this._windowCursorSprite.visible = this.isOpen();
    };

    Window_BattleStatus.prototype.createDummyWindows = function () {
        var numWindows = eval(paramStatusDummyQuantity);

        for (var i = 0; i < numWindows; i++) {
            var rect = this.itemRect(i);
            var padding = Window_Base.prototype.standardPadding();
            var x = rect.x;
            var y = rect.y;
            var w = rect.width + (padding * 2);
            var h = rect.height + (padding * 2);

            var cutOffW = this.x + x + w;
            var cutOffH = this.y + y + h;

            if (eval(paramStatusDummyPreventCutoff) && (cutOffW > Graphics.boxWidth || cutOffH > Graphics.boxHeight)) {
                break;
            }

            this.addChildAt(new Window_Base(x, y, w, h), 0);
        }

    };

    Window_BattleStatus.prototype.windowWidth = function () {
        return eval(paramStatusWidth);
    };

    Window_BattleStatus.prototype.windowHeight = function () {
        return eval(paramStatusHeight);
    };

    Window_BattleStatus.prototype.maxRows = function () {
        return eval(paramStatusRows);
    };

    Window_BattleStatus.prototype.maxCols = function () {
        return eval(paramStatusCols);
    };

    Window_BattleStatus.prototype.numVisibleRows = function () {
        return eval(paramStatusVisRows);
    };

    Window_BattleStatus.prototype.spacing = function () {
        return eval(paramStatusSpacing);
    };

    Window_BattleStatus.prototype.drawStatusFace = function (index) {
        var actor = $gameParty.battleMembers()[index];
        var rect = this.itemRect(index);
        var ww = eval(paramDrawFaceWidth);
        var wh = eval(paramDrawFaceHeight);
        var wx = eval(paramDrawFaceX);
        var wy = eval(paramDrawFaceY);

        if (!eval(paramDrawFace)) {
            return;
        }
        this.drawActorFace(actor, wx, wy, ww, wh);

        if ($gameSystem.isSideView() || !eval(paramCenterFrontViewSprites) || !actor) {
            return;
        }

        var battler = actor.battler();
        battler._faceActorPositionObj = {xOffset: wx + Math.floor(ww / 2),
            yOffset: wy + Math.floor(wh / 2)};
    };

    Window_BattleStatus.prototype.drawItem = function (index) {
        var actor = $gameParty.battleMembers()[index];
        this.drawBasicArea(this.basicAreaRect(index), actor, index);
        this.drawGaugeArea(this.gaugeAreaRect(index), actor, index);
    };

    Window_BattleStatus.prototype.drawGaugeArea = function (gaugeRect, actor, index) {
        var rect = this.itemRect(index);
        this.contents.fontSize = Yanfly.Param.BSWParamFontSize;
        this._enableYBuffer = true;

        if (eval(paramHpGauge) && !actor.actor().meta.HideBattleStatusHp) {
            this.drawActorHp(actor, gaugeRect, rect);
        }

        if (eval(paramMpGauge) && !actor.actor().meta.HideBattleStatusMp) {
            this.drawActorMp(actor, gaugeRect, rect);
        }

        if (eval(paramTpGauge) && !actor.actor().meta.HideBattleStatusTp) {
            this.drawActorTp(actor, gaugeRect, rect);
        }

        this._enableYBuffer = false;
    };

    Window_BattleStatus.prototype.drawCurrentAndMax2 = function (current, max, x, y,
            width, color1, color2, alignment) {
        var labelWidth = this.textWidth('HP');
        var valueWidth = this.textWidth(Yanfly.Util.toGroup(max));
        var slashWidth = this.textWidth('/');
        var x1 = x + width - valueWidth;
        var x2 = x1 - slashWidth;
        var x3 = x2 - valueWidth;
        if (x3 >= x + labelWidth) {
            this.changeTextColor(color1);

            this.contents.fontSize = eval(paramCurrentValueFontSize);

            this.drawText(Yanfly.Util.toGroup(current), x3, y, valueWidth,
                    alignment);
            this.changeTextColor(color2);
            this.drawText('/', x2, y, slashWidth, alignment);

            this.contents.fontSize = eval(paramMaxValueFontSize);

            this.drawText(Yanfly.Util.toGroup(max), x1, y, valueWidth, alignment);
        } else {
            this.contents.fontSize = eval(paramCurrentValueFontSize);
            this.changeTextColor(color1);
            this.drawText(Yanfly.Util.toGroup(current), x1, y, valueWidth,
                    alignment);
        }
        this.contents.fontSize = Yanfly.Param.BSWParamFontSize;
    };

    Window_BattleStatus.prototype.drawCurrentAndMax = function (current, max, x, y,
            width, color1, color2, alignment) {

        if (this._currentMax) {
            // problem right here
            this.drawCurrentAndMax2(current, max,
                    x, y, width, color1, color2, alignment);
        } else {
            this.contents.fontSize = eval(paramCurrentValueFontSize);
            this.changeTextColor(color1);
            var value = Yanfly.Util.toGroup(current);
            this.drawText(value, x, y, width, alignment);
        }

        this.contents.fontSize = Yanfly.Param.BSWParamFontSize;
    };

    Window_BattleStatus.prototype.drawActorHp = function (actor, gaugeRect, rect) {
        var color1 = this.hpGaugeColor1();
        var color2 = this.hpGaugeColor2();

        if (!eval(paramHpHideGauge)) {
            this.drawGauge(eval(paramHpGaugeX), eval(paramHpGaugeY),
                    eval(paramHpGaugeWidth), actor.hpRate(), color1, color2);
        }

        if (Imported.YEP_AbsorptionBarrier) {
            if (actor.barrierPoints() > 0) {
                this.drawBarrierGauge(actor, eval(paramHpGaugeX), eval(paramHpGaugeY), eval(paramHpGaugeWidth));
            }
        }

        this.changeTextColor(this.systemColor());

        if (!eval(paramHpHideName)) {
            this.drawText(TextManager.hpA, eval(paramHpNameX),
                    eval(paramHpNameY), eval(paramHpNameWidth), paramHpNameAlignment);
        }

        if (!eval(paramHpHideValues)) {
            this.drawCurrentAndMax(actor.hp, actor.mhp, eval(paramHpValuesX),
                    eval(paramHpValuesY), eval(paramHpValuesWidth),
                    this.hpColor(actor), this.normalColor(), paramHpValuesAlignment);
        }
    };

    Window_BattleStatus.prototype.drawActorMp = function (actor, gaugeRect, rect) {
        var color1 = this.mpGaugeColor1();
        var color2 = this.mpGaugeColor2();

        if (!eval(paramMpHideGauge)) {
            this.drawGauge(eval(paramMpGaugeX), eval(paramMpGaugeY),
                    eval(paramMpGaugeWidth), actor.mpRate(), color1, color2);
        }

        this.changeTextColor(this.systemColor());

        if (!eval(paramMpHideName)) {
            this.drawText(TextManager.mpA, eval(paramMpNameX),
                    eval(paramMpNameY), eval(paramMpNameWidth), paramMpNameAlignment);
        }

        if (!eval(paramMpHideValues)) {
            this.drawCurrentAndMax(actor.mp, actor.mmp, eval(paramMpValuesX),
                    eval(paramMpValuesY), eval(paramMpValuesWidth),
                    this.mpColor(actor), this.normalColor(), paramMpValuesAlignment);
        }
    };

    Window_BattleStatus.prototype.drawActorTp = function (actor, gaugeRect, rect) {
        var color1 = this.tpGaugeColor1();
        var color2 = this.tpGaugeColor2();

        if (!eval(paramTpHideGauge)) {
            this.drawGauge(eval(paramTpGaugeX), eval(paramTpGaugeY),
                    eval(paramTpGaugeWidth), actor.tpRate(), color1, color2);
        }

        this.changeTextColor(this.systemColor());

        if (!eval(paramTpHideName)) {
            this.drawText(TextManager.tpA, eval(paramTpNameX),
                    eval(paramTpNameY), eval(paramTpNameWidth), paramTpNameAlignment);
        }

        if (!eval(paramTpHideValues)) {
            this.contents.fontSize = eval(paramCurrentValueFontSize);

            this.changeTextColor(this.tpColor(actor));
            this.drawText(actor.tp, eval(paramTpValuesX), eval(paramTpValuesY), eval(paramTpValuesWidth), paramTpValuesAlignment);

            this.contents.fontSize = Yanfly.Param.BSWParamFontSize;
        }
    };

    Window_BattleStatus.prototype.drawActorName = function (actor, x, y, width,
            alignment) {
        width = width || 168;
        this.changeTextColor(this.hpColor(actor));
        this.drawText(actor.name(), x, y, width, alignment);
    };

    Window_BattleStatus.prototype.drawBasicArea = function (basicAreaRect, actor, index) {
        var rect = this.itemRect(index);
        var gaugeRect = this.gaugeAreaRect(index);
        var actionIconX = eval(paramActionIconX);
        var actionIconY = eval(paramActionIconY);

        var nameX = eval(paramNameX);
        var nameY = eval(paramNameY);
        var nameWidth = eval(paramNameWidth);

        var iconsX = eval(paramIconsX);
        var iconsY = eval(paramIconsY);
        var iconsWidth = eval(paramIconsWidth);


        if (eval(paramDrawActionIcon)) {
            this.drawActorActionIcon(actor, actionIconX, actionIconY);
        }

        this.resetFontSettings();
        this.contents.fontSize = Yanfly.Param.BSWNameFontSize;

        if (eval(paramDrawName)) {
            this.drawActorName(actor, nameX, nameY, nameWidth, paramNameAlign);
        }

        if (eval(paramDrawIcons)) {
            this.drawActorIcons(actor, iconsX, iconsY, iconsWidth, eval(paramIconsHeight));
        }

        if (Imported.YEP_X_BattleSysATB && Yanfly.Param.ATBGaugeStyle
                && !actor.actor().meta.HideBattleStatusAtb) {
            if (BattleManager.isATB()) {
                this.drawActorAtbGauge(actor, eval(paramAtbGaugeX),
                        eval(paramAtbGaugeY), eval(paramAtbGaugeWidth));
            }
        }
    };



    //==========================================================================
    // Window_BattleStatus - DreamX Setup
    //==========================================================================
    Window_BattleStatus.prototype.DXIconX = function (actor, rect) {
        var availableSpace = this.DXRectFreeSpace(rect);

        var x2 = rect.x + rect.width;
        if (availableSpace < actor.allIcons().length * Window_Base._iconWidth) {
            return x2 - (actor.allIcons().length * Window_Base._iconWidth) - this.textPadding();
        } else {
            return rect.x + Window_Base._faceWidth;
        }
    };

    Window_BattleStatus.prototype.DXIconW = function (actor, rect) {
        var x2 = rect.x + rect.width;

        if (this.DXRectFreeSpace(rect) + Window_Base._iconWidth
                < actor.allIcons() * Window_Base._iconWidth) {
            return x2 - (x2 - (actor.allIcons() * Window_Base._iconWidth));
        } else {
            return this.DXRectFreeSpace(rect) + Window_Base._iconWidth;
        }
    };

    Window_BattleStatus.prototype.DXThreshold = function () {
        return 64;
    };

    Window_BattleStatus.prototype.DXGaugeNameX = function (actor, rect) {
        var availableSpace = this.DXRectFreeSpace(rect);

        if (availableSpace > this.DXThreshold()) {
            return rect.x + rect.width - (this.DXRectFreeSpace(rect));
        } else {
            return rect.x + rect.width - (this.DXRectFreeSpace(rect)
                    + Window_Base._iconWidth);
        }
    };

    Window_BattleStatus.prototype.DXGaugeNameWidth = function (actor, rect) {
        var availableSpace = this.DXRectFreeSpace(rect);

        if (availableSpace > this.DXThreshold()) {
            return this.DXRectFreeSpace(rect) - this.textPadding();
        } else {
            return (this.DXRectFreeSpace(rect) - this.textPadding())
                    + Window_Base._iconWidth;
        }
    };


    Window_BattleStatus.prototype.DXRectFreeSpace = function (rect) {
        return rect.width - Window_Base._faceWidth;
    };

    //==========================================================================
    // Window_BattleSkill
    //==========================================================================
    DreamX.Ext_BattleStatusCore.Window_BattleSkill_initialize = Window_BattleSkill.prototype.initialize;
    Window_BattleSkill.prototype.initialize = function (x, y, width, height) {
        DreamX.Ext_BattleStatusCore.Window_BattleSkill_initialize.call(this, x, y, width, height);
        if (eval(paramBattleSkillDim)) {
            this.showBackgroundDimmer();
        }
    };

    Window_BattleSkill.prototype.maxRows = function () {
        return eval(paramBattleSkillRows);
    };

    Window_BattleSkill.prototype.maxCols = function () {
        return eval(paramBattleSkillCols);
    };

    Window_BattleSkill.prototype.itemWidth = function () {
        return eval(paramBattleSkillItemWidth);
    };

    Window_BattleSkill.prototype.itemHeight = function () {
        return eval(paramBattleSkillItemHeight);
    };

    //==========================================================================
    // Window_BattleItem
    //==========================================================================
    DreamX.Ext_BattleStatusCore.Window_BattleItem_initialize = Window_BattleItem.prototype.initialize;
    Window_BattleItem.prototype.initialize = function (x, y, width, height) {
        DreamX.Ext_BattleStatusCore.Window_BattleItem_initialize.call(this, x, y, width, height);
        if (eval(paramBattleItemDim)) {
            this.showBackgroundDimmer();
        }
    };

    Window_BattleItem.prototype.maxRows = function () {
        return eval(paramBattleItemRows);
    };

    Window_BattleItem.prototype.maxCols = function () {
        return eval(paramBattleItemCols);
    };

    Window_BattleItem.prototype.itemWidth = function () {
        return eval(paramBattleItemItemWidth);
    };

    Window_BattleItem.prototype.itemHeight = function () {
        return eval(paramBattleItemItemHeight);
    };

    //==========================================================================
    // Window_BattleLog
    //==========================================================================
    DreamX.Ext_BattleStatusCore.Window_BattleLog_initialize = Window_BattleLog.prototype.initialize;
    Window_BattleLog.prototype.initialize = function () {
        DreamX.Ext_BattleStatusCore.Window_BattleLog_initialize.call(this);
        this.x = eval(paramBLogX);
        this.y = eval(paramBLogY);
        this.opacity = eval(paramBLogOpacity);
    };

    DreamX.Ext_BattleStatusCore.Window_BattleLog_update = Window_BattleLog.prototype.update;
    Window_BattleLog.prototype.update = function () {
        DreamX.Ext_BattleStatusCore.Window_BattleLog_update.call(this);
        if (this._lines.length > 0 && eval(paramBLogRegWindowStyle)) {
            this.opacity = 255;
        } else {
            this.opacity = eval(paramBLogOpacity);
        }
    };

    DreamX.Ext_BattleStatusCore.Window_BattleLog_drawBackground = Window_BattleLog.prototype.drawBackground;
    Window_BattleLog.prototype.drawBackground = function () {
        if (eval(paramBLogRegWindowStyle)) {
            return;
        }
        DreamX.Ext_BattleStatusCore.Window_BattleLog_drawBackground.call(this);
    };

    Window_BattleLog.prototype.windowWidth = function () {
        return eval(paramBLogW);
    };

    Window_BattleLog.prototype.windowHeight = function () {
        return eval(paramBLogH);
    };
    //==========================================================================
    // Window_ActorCommand
    //==========================================================================
    DreamX.Ext_BattleStatusCore.Window_ActorCommand_initialize = Window_ActorCommand.prototype.initialize;
    Window_ActorCommand.prototype.initialize = function () {
        DreamX.Ext_BattleStatusCore.Window_ActorCommand_initialize.call(this);
        this.opacity = eval(paramActorCommandOpacity);
        if (eval(paramActorCommandDim)) {
            this.showBackgroundDimmer();
        }
    };

    DreamX.Ext_BattleStatusCore.Window_ActorCommand_update = Window_ActorCommand.prototype.update;
    Window_ActorCommand.prototype.update = function () {
        DreamX.Ext_BattleStatusCore.Window_ActorCommand_update.call(this);
        this.updatePosition();
    };

    Window_ActorCommand.prototype.leoX = function (index) {
        var scene = SceneManager._scene;
        var battleStatusWindow = scene._statusWindow;
        var leoIndex = index === $gameParty.battleMembers().length - 1 ? index - 2 : index;
        var leoRect = leoIndex >= 0 ? battleStatusWindow.itemRect(leoIndex) : battleStatusWindow.itemRect(index);

        if (leoIndex >= 0) {
            var leoX = battleStatusWindow.x + leoRect.x + leoRect.width + (battleStatusWindow.standardPadding() * 2);
        } else {
            leoX = battleStatusWindow.x + leoRect.x - leoRect.width - (battleStatusWindow.standardPadding() * 2);
        }
        leoX = Math.max(0, leoX);
        leoX = Math.min(Graphics.boxWidth - this.width, leoX);
        return leoX;
    };

    Window_ActorCommand.prototype.leoY = function () {
        var scene = SceneManager._scene;
        var battleStatusWindow = scene._statusWindow;
        var leoY = battleStatusWindow.y - this.height;
        return leoY;
    };

    Window_ActorCommand.prototype.updatePosition = function () {
        var scene = SceneManager._scene;
        var battleStatusWindow = scene._statusWindow;
        var index = $gameParty.battleMembers().indexOf(BattleManager.actor());
        var rect = battleStatusWindow.itemRect(index);

        var leoX = this.leoX(index);
        var leoY = this.leoY();

        this.x = eval(paramActorCommandX);
        this.y = eval(paramActorCommandY);
    };

    Window_ActorCommand.prototype.windowWidth = function () {
        return eval(paramActorCommandW);
    };

    Window_ActorCommand.prototype.windowHeight = function () {
        return eval(paramActorCommandH);
    };

    Window_ActorCommand.prototype.maxRows = function () {
        return eval(paramActorCommandRows);
    };

    Window_ActorCommand.prototype.maxCols = function () {
        return eval(paramActorCommandCols);
    };

    Window_ActorCommand.prototype.itemWidth = function () {
        return eval(paramActorCommandItemWidth);
    };

    Window_ActorCommand.prototype.itemHeight = function () {
        return eval(paramActorCommandItemHeight);
    };

    Window_ActorCommand.prototype.numVisibleRows = function () {
        return eval(paramActorCommandVisRows);
    };

    //==========================================================================
    // Window_PartyCommand
    //==========================================================================
    DreamX.Ext_BattleStatusCore.Window_PartyCommand_initialize = Window_PartyCommand.prototype.initialize;
    Window_PartyCommand.prototype.initialize = function () {
        DreamX.Ext_BattleStatusCore.Window_PartyCommand_initialize.call(this);
        this.x = eval(paramPartyCommandX);
        this.y = eval(paramPartyCommandY);
        this.opacity = eval(paramPartyCommandOpacity);
        if (eval(paramPartyCommandDim)) {
            this.showBackgroundDimmer();
        }
    };

    Window_PartyCommand.prototype.windowWidth = function () {
        return eval(paramPartyCommandW);
    };

    Window_PartyCommand.prototype.windowHeight = function () {
        return eval(paramPartyCommandH);
    };

    Window_PartyCommand.prototype.maxRows = function () {
        return eval(paramPartyCommandRows);
    };

    Window_PartyCommand.prototype.maxCols = function () {
        return eval(paramPartyCommandCols);
    };

    Window_PartyCommand.prototype.itemWidth = function () {
        return eval(paramPartyCommandItemWidth);
    };

    Window_PartyCommand.prototype.itemHeight = function () {
        return eval(paramPartyCommandItemHeight);
    };

    Window_PartyCommand.prototype.numVisibleRows = function () {
        return eval(paramPartyCommandVisRows);
    };

    //==========================================================================
    // Window_Base
    //==========================================================================
    Window_Base.prototype.drawActorIcons = function (actor, x, y, width, height) {
        width = width || 144;
        height = height || Window_Base._iconHeight;

        var icons = actor.allIcons().slice(0,
                Math.floor(width / Window_Base._iconWidth)
                * Math.floor(height / Window_Base._iconHeight));
        var currentX = x;
        var currentY = y + 2;
        var currentWidth = 0;

        for (var i = 0; i < icons.length; i++) {
            this.drawIcon(icons[i], currentX, currentY);
            currentX += Window_Base._iconWidth;
            currentWidth += Window_Base._iconWidth;
            var nextWidth = currentWidth + Window_Base._iconWidth;
            if (currentWidth >= width || nextWidth >= width) {
                currentX = x;
                currentY += Window_Base._iconHeight;
                currentWidth = 0;
            }
        }

        if (Imported.YEP_BuffsStatesCore) {
            this.drawActorIconsTurns(actor, x, y, width, height);
        }
    };

    if (Imported.YEP_BuffsStatesCore) {
        Window_Base.prototype.drawActorIconsTurns = function (actor, wx, wy, ww, wh) {

            var iw = Window_Base._iconWidth;
            var ih = Window_Base._iconHeight;
            var wh = wh || ih;

            var shownMax = Math.floor(ww / iw) * Math.floor(wh / ih);

            var currentX = wx;
            var currentY = wy;
            var currentWidth = 0;

            for (var i = 0; i < actor.states().length; ++i) {
                if (shownMax <= 0)
                    break;
                var state = actor.states()[i];
                if (state.iconIndex <= 0)
                    continue;
                if (state.autoRemovalTiming > 0) {
                    this.drawStateTurns(actor, state, currentX, currentY);
                }
                this.drawStateCounter(actor, state, currentX, currentY);

                currentX += iw;
                currentWidth += Window_Base._iconWidth;
                var nextWidth = currentWidth + Window_Base._iconWidth;
                if (currentWidth >= ww || nextWidth >= ww) {
                    currentX = wx;
                    currentY += Window_Base._iconHeight;
                    currentWidth = 0;
                }
                --shownMax;
            }

            for (var i = 0; i < 8; ++i) {
                if (shownMax <= 0)
                    break;
                if (actor._buffs[i] === 0)
                    continue;
                this.drawBuffTurns(actor, i, currentX, currentY);
                if (Yanfly.Param.BSCShowBuffRate) {
                    this.drawBuffRate(actor, i, currentX, currentY);
                }

                currentX += iw;
                currentWidth += Window_Base._iconWidth;
                var nextWidth = currentWidth + Window_Base._iconWidth;
                if (currentWidth >= ww || nextWidth >= ww) {
                    currentX = wx;
                    currentY += Window_Base._iconHeight;
                    currentWidth = 0;
                }
                --shownMax;
            }
            this.resetFontSettings();
            this.resetTextColor();
        };
    }

    //==========================================================================
    // Scene_Battle
    //==========================================================================
    DreamX.Ext_BattleStatusCore.Window_Selectable_processCancel = Window_Selectable.prototype.processCancel;
    Window_ActorCommand.prototype.processCancel = function () {
        if (!eval(paramPressCancelToPartyCommand) && BattleManager._actorIndex <= 0) {
            return;
        }
        if (!eval(paramPressCancelToCancelActorCommand) && BattleManager._actorIndex > 0) {
            return;
        }
        DreamX.Ext_BattleStatusCore.Window_Selectable_processCancel.call(this);
    };

    DreamX.Ext_BattleStatusCore.Window_ActorCommand_processLeft = Window_ActorCommand.prototype.processLeft;
    Window_ActorCommand.prototype.processLeft = function () {

        if (!eval(paramLeftPartyCommand) && BattleManager._actorIndex <= 0) {
            return;
        }
        if (!eval(paramDirButtonSwitchActor) && BattleManager._actorIndex > 0) {
            return;
        }
        DreamX.Ext_BattleStatusCore.Window_ActorCommand_processLeft.call(this);
    };

    DreamX.Ext_BattleStatusCore.Window_ActorCommand_processRight = Window_ActorCommand.prototype.processRight;
    Window_ActorCommand.prototype.processRight = function () {
        var nextActors = $gameParty.members().slice(BattleManager._actorIndex + 1);
        var hasNextActorThatCanInput = nextActors.some(function (member) {
            return member.canInput();
        });

        if (!eval(paramRightConfirmTurn) && !hasNextActorThatCanInput) {
            return false;
        }
        if (!eval(paramDirButtonSwitchActor) && hasNextActorThatCanInput) {
            return false;
        }

        DreamX.Ext_BattleStatusCore.Window_ActorCommand_processRight.call(this);
    };

    DreamX.Ext_BattleStatusCore.Window_PartyCommand_processRight = Window_PartyCommand.prototype.processRight;
    Window_PartyCommand.prototype.processRight = function () {
        if (!eval(paramRightActorCommand)) {
            return;
        }
        DreamX.Ext_BattleStatusCore.Window_PartyCommand_processRight.call(this);
    };

    DreamX.Ext_BattleStatusCore.Scene_Battle_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
    Scene_Battle.prototype.selectEnemySelection = function () {
        DreamX.Ext_BattleStatusCore.Scene_Battle_selectEnemySelection.call(this);
        if (!eval(paramActorCommandCloseSelect)) {
            return;
        }
        this._actorCommandWindow.close();
    };

    DreamX.Ext_BattleStatusCore.Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
    Scene_Battle.prototype.onEnemyCancel = function () {
        DreamX.Ext_BattleStatusCore.Scene_Battle_onEnemyCancel.call(this);
        if (!eval(paramActorCommandCloseSelect)) {
            return;
        }
        this._actorCommandWindow.open();
    };

    Scene_Battle.prototype.updateWindowPositions = function () {
        var statusX = 0;
        if (BattleManager.isInputting()) {
            statusX = eval(paramStatusInputX);
        } else {
            statusX = eval(paramStatusActionX);
        }
        if (this._statusWindow.x < statusX) {
            this._statusWindow.x += 16;
            if (this._statusWindow.x > statusX) {
                this._statusWindow.x = statusX;
            }
        }
        if (this._statusWindow.x > statusX) {
            this._statusWindow.x -= 16;
            if (this._statusWindow.x < statusX) {
                this._statusWindow.x = statusX;
            }
        }
    };

    DreamX.Ext_BattleStatusCore.Scene_Battle_createSkillWindow = Scene_Battle.prototype.createSkillWindow;
    Scene_Battle.prototype.createSkillWindow = function () {
        DreamX.Ext_BattleStatusCore.Scene_Battle_createSkillWindow.call(this);
        this._skillWindow.x = eval(paramBattleSkillX);
        this._skillWindow.y = eval(paramBattleSkillY);
        this._skillWindow.width = eval(paramBattleSkillW);
        this._skillWindow.height = eval(paramBattleSkillH);
        this._skillWindow.opacity = eval(paramBattleSkillOpacity);
        this._skillWindow.createContents();
    };

    DreamX.Ext_BattleStatusCore.Scene_Battle_createItemWindow = Scene_Battle.prototype.createItemWindow;
    Scene_Battle.prototype.createItemWindow = function () {
        DreamX.Ext_BattleStatusCore.Scene_Battle_createItemWindow.call(this);
        this._itemWindow.x = eval(paramBattleItemX);
        this._itemWindow.y = eval(paramBattleItemY);
        this._itemWindow.width = eval(paramBattleItemW);
        this._itemWindow.height = eval(paramBattleItemH);
        this._itemWindow.opacity = eval(paramBattleItemOpacity);
        this._itemWindow.createContents();
    };

    DreamX.Ext_BattleStatusCore.Scene_Battle_createHelpWindow = Scene_Battle.prototype.createHelpWindow;
    Scene_Battle.prototype.createHelpWindow = function () {
        DreamX.Ext_BattleStatusCore.Scene_Battle_createHelpWindow.call(this);
        this._helpWindow.x = eval(paramHelpX);
        this._helpWindow.y = eval(paramHelpY);
        this._helpWindow.width = eval(paramHelpW);
        this._helpWindow.height = eval(paramHelpH);
        this._helpWindow.opacity = eval(paramHelpOpacity);
        this._helpWindow.createContents();
        if (eval(paramHelpDim)) {
            this._helpWindow.showBackgroundDimmer();
        }
    };

    //==========================================================================
    // Sprite_CurrentBattler
    //==========================================================================
    function Sprite_CurrentBattler() {
        this.initialize.apply(this, arguments);
    }

    Sprite_CurrentBattler.prototype = Object.create(Sprite_Base.prototype);
    Sprite_CurrentBattler.prototype.constructor = Sprite_CurrentBattler;

    Sprite_CurrentBattler.prototype.initialize = function (battler) {
        Sprite_Base.prototype.initialize.call(this);
        this._battler = battler;
    };

    Sprite_CurrentBattler.prototype.update = function () {
        Sprite_Base.prototype.update.call(this);
        this.updatePicAndVisibility();
        this.updatePosition();

    };

    Sprite_CurrentBattler.prototype.updatePosition = function () {
        if (!this.bitmap) {
            return;
        }

        var scene = SceneManager._scene;
        var battleStatusWindow = scene._statusWindow;
        if (!battleStatusWindow) {
            return;
        }

        var index = $gameParty.battleMembers().indexOf(this._battler);
        if (index === -1) {
            return;
        }

        var rect = battleStatusWindow.itemRect(index);


        this.x = eval(paramBattlerPicX);
        this.y = eval(paramBattlerPicY);
    };

    Sprite_CurrentBattler.prototype.shouldShow = function () {
        if (eval(paramShowBattlerPicAlways)) {
            return true;
        }
        if (eval(paramShowBattlerPicInput) && BattleManager.isInputting() && BattleManager.actor() === this._battler) {
            return true;
        }
        var action = BattleManager._action;
        if (action && !BattleManager.isInputting()) {
            if (BattleManager._targets.indexOf(this._battler) !== -1) {
                if (eval(paramShowBattlerEnemyTarget) && action.isForOpponent()) {
                    return true;
                }
                if (eval(paramShowBattlerAllyTarget) && action.isForFriend()) {
                    return true;
                }
            }
            if (eval(paramShowBattlerActing) && action.subject() === this._battler) {
                return true;
            }
        }
        return false;
    };

    Sprite_CurrentBattler.prototype.updatePicAndVisibility = function () {
        this.hide();
        var actorPic = this._battler.actor().meta.BattlerPicture;
        if (!actorPic) {
            return;
        }
        if (!this.shouldShow()) {
            return;
        }

        actorPic = actorPic.trim();
        this.bitmap = ImageManager.loadPicture(actorPic);
        this.show();
    };

    //==========================================================================
    // Sprite_Actor
    //==========================================================================
    Sprite_Actor.prototype.setActorHomeFrontViewCenter = function (index) {
        var scene = SceneManager._scene;
        var statusWindow = scene._statusWindow;
        if (!statusWindow) {
            return;
        }
        var rect = statusWindow.itemRect(index);
        var currentBattlerSprite;

        var currentBattlerPics = scene._spriteset._currentBattlerSprites;
        if (currentBattlerPics) {
            currentBattlerSprite = currentBattlerPics[index];
        }

        var ww = eval(paramDrawFaceWidth);
        var wh = eval(paramDrawFaceHeight);
        // defaults
        var x = eval(paramActorSpriteFrontViewX);
        var y = eval(paramActorSpriteFrontViewY);

        this.setHome(x, y);
        this.moveToStartPosition();
    };



    //==========================================================================
    // Sprite_Battler
    //==========================================================================
    if (!Imported['VE - Damge Popup']) {
        DreamX.Ext_BattleStatusCore.Sprite_Battler_setupDamagePopup = Sprite_Battler.prototype.setupDamagePopup;
        Sprite_Battler.prototype.setupDamagePopup = function () {
            DreamX.Ext_BattleStatusCore.Sprite_Battler_setupDamagePopup.call(this);

            if (!$gameSystem.DXIsAboveBattleStatus()) {
                return;
            }

            var parent = this.parent;
            var scene = SceneManager._scene;
            this._damages.forEach(function (sprite) {
                parent.removeChild(sprite);
                scene.addChild(sprite);
            });
        };
    }


    Sprite_Battler.prototype.createVisualHpGaugeWindow = function () {
        var scene = SceneManager._scene;
        var spriteset = scene._spriteset;
        if (!spriteset) {
            return;
        }

        var baseSprite = spriteset._baseSprite;
        var newParent = baseSprite;
        if (!$gameSystem.DXIsAboveBattleStatus()) {
            newParent = scene;
        }

        if (this._createdVisualHpGaugeWindow)
            return;
        if (!this._battler)
            return;
        if (this.checkVisualATBGauge()) {
            if (!this._visualATBWindow)
                return;
            if (!baseSprite.children.contains(this._visualATBWindow))
                return;
        }
        this._createdVisualHpGaugeWindow = true;
        this._visualHpGauge = new Window_VisualHPGauge();
        this._visualHpGauge.setBattler(this._battler);
        newParent.addChild(this._visualHpGauge);
    };

    //==========================================================================
    // Game_System
    //==========================================================================
    Game_System.prototype.DXIsAboveBattleStatus = function () {
        if ($gameSystem.isSideView() || !eval(paramTopAnimations)) {
            return false;
        }
        return true;
    };

    //==========================================================================
    // Spriteset_Battle
    //==========================================================================
    DreamX.Ext_BattleStatusCore.Scene_Base_createWindowLayer = Scene_Base.prototype.createWindowLayer;
    Scene_Battle.prototype.createWindowLayer = function () {
        DreamX.Ext_BattleStatusCore.Scene_Base_createWindowLayer.call(this);
        if (!$gameSystem.DXIsAboveBattleStatus()) {
            return;
        }

        var scene = SceneManager._scene;
        var spriteset = scene._spriteset;
        var sprites = spriteset._actorSprites;

        if (!sprites) {
            return;
        }

        sprites.forEach(function (sprite) {
            scene.addChild(sprite);
        });
    };

    DreamX.Ext_BattleStatusCore.Spriteset_Battle_updateActors = Spriteset_Battle.prototype.updateActors;
    Spriteset_Battle.prototype.updateActors = function () {
        DreamX.Ext_BattleStatusCore.Spriteset_Battle_updateActors.call(this);
        if ($gameSystem.isSideView() || eval(paramFrontViewSpriteMovePrevent)) {
            return;
        }
        for (var i = 0; i < this._actorSprites.length; i++) {
            this._actorSprites[i].setActorHomeFrontViewCenter(i);
        }
    };

    DreamX.Ext_BattleStatusCore.Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
    Spriteset_Battle.prototype.createLowerLayer = function () {
        DreamX.Ext_BattleStatusCore.Spriteset_Battle_createLowerLayer.call(this);
        this.createCurrentActorSprite();
    };

    Spriteset_Battle.prototype.createCurrentActorSprite = function () {
        if (!eval(paramShowBattlerPic)) {
            return;
        }
        this._currentBattlerSprites = [];
        for (var i = 0; i < $gameParty.battleMembers().length; i++) {
            var member = $gameParty.battleMembers()[i];
            var sprite = new Sprite_CurrentBattler(member);
            this._currentBattlerSprites.push(sprite);
            this.addChild(sprite);
        }
    };

//==========================================================================
// Spriteset_Battle
//==========================================================================
    function Sprite_StateIconActorStatus() {
        this.initialize.apply(this, arguments);
    }

    Sprite_StateIconActorStatus.prototype = Object.create(Sprite_StateIcon.prototype);
    Sprite_StateIconActorStatus.prototype.constructor = Sprite_StateIconActorStatus;

    Sprite_StateIconActorStatus.prototype.battler = function () {
        return this._battler;
    };

})();
