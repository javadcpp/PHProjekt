/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.mobile.app.ImageThumbView"]||(dojo._hasResource["dojox.mobile.app.ImageThumbView"]=!0,dojo.provide("dojox.mobile.app.ImageThumbView"),dojo.experimental("dojox.mobile.app.ImageThumbView"),dojo.require("dijit._WidgetBase"),dojo.require("dojo.string"),dojo.declare("dojox.mobile.app.ImageThumbView",dijit._WidgetBase,{items:[],urlParam:"url",labelParam:null,itemTemplate:'<div class="mblThumbInner"><div class="mblThumbOverlay"></div><div class="mblThumbMask"><div class="mblThumbSrc" style="background-image:url(${url})"></div></div></div>',
minPadding:4,maxPerRow:3,maxRows:-1,baseClass:"mblImageThumbView",thumbSize:"medium",animationEnabled:!0,selectedIndex:-1,cache:null,cacheMustMatch:!1,clickEvent:"onclick",cacheBust:!1,disableHide:!1,constructor:function(){},postCreate:function(){this.inherited(arguments);var a=this;this.addThumb=dojo.hitch(this,this.addThumb);this.handleImgLoad=dojo.hitch(this,this.handleImgLoad);this.hideCached=dojo.hitch(this,this.hideCached);this._onLoadImages={};this.cache=[];this.visibleImages=[];this._cacheCounter=
0;this.connect(this.domNode,this.clickEvent,function(b){if((b=a._getItemNodeFromEvent(b))&&!b._cached)a.onSelect(b._item,b._index,a.items),dojo.query(".selected",this.domNode).removeClass("selected"),dojo.addClass(b,"selected")});dojo.addClass(this.domNode,this.thumbSize);this.resize();this.render()},onSelect:function(){},_setAnimationEnabledAttr:function(a){this.animationEnabled=a;dojo[a?"addClass":"removeClass"](this.domNode,"animated")},_setItemsAttr:function(a){this.items=a||[];var a={},b;for(b=
0;b<this.items.length;b++)a[this.items[b][this.urlParam]]=1;var d=[],c;for(c in this._onLoadImages)if(!a[c]&&this._onLoadImages[c]._conn)dojo.disconnect(this._onLoadImages[c]._conn),this._onLoadImages[c].src=null,d.push(c);for(b=0;b<d.length;b++)delete this._onLoadImages[c];this.render()},_getItemNode:function(a){for(;a&&!dojo.hasClass(a,"mblThumb")&&a!=this.domNode;)a=a.parentNode;return a==this.domNode?null:a},_getItemNodeFromEvent:function(a){a.touches&&a.touches.length>0&&(a=a.touches[0]);return this._getItemNode(a.target)},
resize:function(){this._thumbSize=null;this._size=dojo.contentBox(this.domNode);this.disableHide=!0;this.render();this.disableHide=!1},hideCached:function(){for(var a=0;a<this.cache.length;a++)this.cache[a]&&dojo.style(this.cache[a],"display","none")},render:function(){for(var a,b,d;this.visibleImages&&this.visibleImages.length>0;)a=this.visibleImages.pop(),this.cache.push(a),this.disableHide||dojo.addClass(a,"hidden"),a._cached=!0;this.cache&&this.cache.length>0&&setTimeout(this.hideCached,1E3);
if(this.items&&this.items.length!=0){for(a=0;a<this.items.length;a++)if(d=this.items[a],b=dojo.isString(d)?d:d[this.urlParam],this.addThumb(d,b,a),this.maxRows>0&&(a+1)/this.maxPerRow>=this.maxRows)break;if(this._thumbSize){b=0;d=-1;var c=this._thumbSize.w+this.padding*2,f=this._thumbSize.h+this.padding*2,e=this.thumbNodes=dojo.query(".mblThumb",this.domNode),g=0,e=this.visibleImages;for(a=0;a<e.length;a++)if(!e[a]._cached){g%this.maxPerRow==0&&d++;b=g%this.maxPerRow;this.place(e[a],b*c+this.padding,
d*f+this.padding);e[a]._loading||dojo.removeClass(e[a],"hidden");if(g==this.selectedIndex)dojo[g==this.selectedIndex?"addClass":"removeClass"](e[a],"selected");g++}this._numRows=a=Math.ceil(g/this.maxPerRow);this.setContainerHeight(a*(this._thumbSize.h+this.padding*2))}}},setContainerHeight:function(a){dojo.style(this.domNode,"height",a+"px")},addThumb:function(a,b,d){var c,f=!1;if(this.cache.length>0){for(var e=0;e<this.cache.length;e++)if(this.cache[e]._url==b){c=this.cache.splice(e,1)[0];break}!c&&
!this.cacheMustMatch?(c=this.cache.pop(),dojo.removeClass(c,"selected")):f=!0}c||(c=dojo.create("div",{"class":"mblThumb hidden",innerHTML:dojo.string.substitute(this.itemTemplate,{url:b},null,this)},this.domNode));if(this.labelParam)(e=dojo.query(".mblThumbLabel",c)[0])||(e=dojo.create("div",{"class":"mblThumbLabel"},c)),e.innerHTML=a[this.labelParam]||"";dojo.style(c,"display","");this.disableHide||dojo.addClass(c,"hidden");if(!f&&(f=dojo.create("img",{}),f._thumbDiv=c,f._conn=dojo.connect(f,"onload",
this.handleImgLoad),f._url=b,c._loading=!0,this._onLoadImages[b]=f))f.src=b;this.visibleImages.push(c);c._index=d;c._item=a;c._url=b;c._cached=!1;if(!this._thumbSize){this._thumbSize=dojo.marginBox(c);if(this._thumbSize.h==0)this._thumbSize.h=100,this._thumbSize.w=100;this.labelParam&&(this._thumbSize.h+=8);this.calcPadding()}},handleImgLoad:function(a){a=a.target;dojo.disconnect(a._conn);dojo.removeClass(a._thumbDiv,"hidden");a._thumbDiv._loading=!1;a._conn=null;var b=a._url;this.cacheBust&&(b+=
(b.indexOf("?")>-1?"&":"?")+"cacheBust="+(new Date).getTime()+"_"+this._cacheCounter++);dojo.query(".mblThumbSrc",a._thumbDiv).style("backgroundImage","url("+b+")");delete this._onLoadImages[a._url]},calcPadding:function(){var a=this._size.w,b=this._thumbSize.w;this.maxPerRow=Math.floor(a/(b+this.minPadding));this.padding=Math.floor((a-b*this.maxPerRow)/(this.maxPerRow*2))},place:function(a,b,d){dojo.style(a,{"-webkit-transform":"translate("+b+"px,"+d+"px)"})},destroy:function(){var a,b=0,d;for(d in this._onLoadImages)if(a=
this._onLoadImages[d])a.src=null,b++;this.inherited(arguments)}}));