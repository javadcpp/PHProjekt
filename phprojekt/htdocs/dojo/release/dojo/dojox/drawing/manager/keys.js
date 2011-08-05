/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.drawing.manager.keys"]||(dojo._hasResource["dojox.drawing.manager.keys"]=!0,dojo.provide("dojox.drawing.manager.keys"),function(){var c=!1,d=!0;dojox.drawing.manager.keys={arrowIncrement:1,arrowShiftIncrement:10,shift:!1,ctrl:!1,alt:!1,cmmd:!1,meta:!1,onDelete:function(){},onEsc:function(){},onEnter:function(){},onArrow:function(){},onKeyDown:function(){},onKeyUp:function(){},listeners:[],register:function(a){this.listeners.push({handle:dojox.drawing.util.uid("listener"),
scope:a.scope||window,callback:a.callback,keyCode:a.keyCode})},_getLetter:function(a){return!a.meta&&a.keyCode>=65&&a.keyCode<=90?"abcdefghijklmnopqrstuvwxyz".charAt(a.keyCode-65):null},_mixin:function(a){a.meta=this.meta;a.shift=this.shift;a.alt=this.alt;a.cmmd=this.cmmd;a.letter=this._getLetter(a);return a},editMode:function(a){c=a},enable:function(a){d=a},scanForFields:function(){this._fieldCons&&dojo.forEach(this._fieldCons,dojo.disconnect,dojo);this._fieldCons=[];dojo.query("input").forEach(function(a){var b=
dojo.connect(a,"focus",this,function(){this.enable(!1)}),a=dojo.connect(a,"blur",this,function(){this.enable(!0)});this._fieldCons.push(b);this._fieldCons.push(a)},this)},init:function(){setTimeout(dojo.hitch(this,"scanForFields"),500);dojo.connect(document,"blur",this,function(){this.meta=this.shift=this.ctrl=this.cmmd=this.alt=!1});dojo.connect(document,"keydown",this,function(a){if(d){if(a.keyCode==16)this.shift=!0;if(a.keyCode==17)this.ctrl=!0;if(a.keyCode==18)this.alt=!0;if(a.keyCode==224)this.cmmd=
!0;this.meta=this.shift||this.ctrl||this.cmmd||this.alt;c||(this.onKeyDown(this._mixin(a)),(a.keyCode==8||a.keyCode==46)&&dojo.stopEvent(a))}});dojo.connect(document,"keyup",this,function(a){if(d){var b=!1;if(a.keyCode==16)this.shift=!1;if(a.keyCode==17)this.ctrl=!1;if(a.keyCode==18)this.alt=!1;if(a.keyCode==224)this.cmmd=!1;this.meta=this.shift||this.ctrl||this.cmmd||this.alt;!c&&this.onKeyUp(this._mixin(a));a.keyCode==13&&(console.warn("KEY ENTER"),this.onEnter(a),b=!0);a.keyCode==27&&(this.onEsc(a),
b=!0);if(a.keyCode==8||a.keyCode==46)this.onDelete(a),b=!0;b&&!c&&dojo.stopEvent(a)}});dojo.connect(document,"keypress",this,function(a){if(d){var b=this.shift?this.arrowIncrement*this.arrowShiftIncrement:this.arrowIncrement,e=0,f=0;a.keyCode==32&&!c&&dojo.stopEvent(a);a.keyCode==37&&(e=-b);a.keyCode==38&&(f=-b);a.keyCode==39&&(e=b);a.keyCode==40&&(f=b);if(e||f)a.x=e,a.y=f,a.shift=this.shift,c||(this.onArrow(a),dojo.stopEvent(a))}})}};dojo.addOnLoad(dojox.drawing.manager.keys,"init")}());