/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.gfx.svg"]||(dojo._hasResource["dojox.gfx.svg"]=!0,dojo.provide("dojox.gfx.svg"),dojo.require("dojox.gfx._base"),dojo.require("dojox.gfx.shape"),dojo.require("dojox.gfx.path"),function(){function j(a,b){return dojo.doc.createElementNS?dojo.doc.createElementNS(a,b):dojo.doc.createElement(b)}function m(a){return d.useSvgWeb?dojo.doc.createTextNode(a,!0):dojo.doc.createTextNode(a)}var h=dojo,g=dojox.gfx,i=g.shape,d=g.svg;d.useSvgWeb=typeof window.svgweb!="undefined";d.xmlns={xlink:"http://www.w3.org/1999/xlink",
svg:"http://www.w3.org/2000/svg"};d.getRef=function(a){return!a||a=="none"?null:a.match(/^url\(#.+\)$/)?h.byId(a.slice(5,-1)):a.match(/^#dojoUnique\d+$/)?h.byId(a.slice(1)):null};d.dasharray={solid:"none",shortdash:[4,1],shortdot:[1,1],shortdashdot:[4,1,1,1],shortdashdotdot:[4,1,1,1,1,1],dot:[1,3],dash:[4,3],longdash:[8,3],dashdot:[4,3,1,3],longdashdot:[8,3,1,3],longdashdotdot:[8,3,1,3,1,3]};h.declare("dojox.gfx.svg.Shape",i.Shape,{setFill:function(a){if(!a)return this.fillStyle=null,this.rawNode.setAttribute("fill",
"none"),this.rawNode.setAttribute("fill-opacity",0),this;var b,c=function(a){this.setAttribute(a,b[a].toFixed(8))};if(typeof a=="object"&&"type"in a){switch(a.type){case "linear":b=g.makeParameters(g.defaultLinearGradient,a);a=this._setFillObject(b,"linearGradient");h.forEach(["x1","y1","x2","y2"],c,a);break;case "radial":b=g.makeParameters(g.defaultRadialGradient,a);a=this._setFillObject(b,"radialGradient");h.forEach(["cx","cy","r"],c,a);break;case "pattern":b=g.makeParameters(g.defaultPattern,a),
a=this._setFillObject(b,"pattern"),h.forEach(["x","y","width","height"],c,a)}this.fillStyle=b;return this}this.fillStyle=b=g.normalizeColor(a);this.rawNode.setAttribute("fill",b.toCss());this.rawNode.setAttribute("fill-opacity",b.a);this.rawNode.setAttribute("fill-rule","evenodd");return this},setStroke:function(a){var b=this.rawNode;if(!a)return this.strokeStyle=null,b.setAttribute("stroke","none"),b.setAttribute("stroke-opacity",0),this;if(typeof a=="string"||h.isArray(a)||a instanceof h.Color)a=
{color:a};a=this.strokeStyle=g.makeParameters(g.defaultStroke,a);a.color=g.normalizeColor(a.color);if(a){b.setAttribute("stroke",a.color.toCss());b.setAttribute("stroke-opacity",a.color.a);b.setAttribute("stroke-width",a.width);b.setAttribute("stroke-linecap",a.cap);typeof a.join=="number"?(b.setAttribute("stroke-linejoin","miter"),b.setAttribute("stroke-miterlimit",a.join)):b.setAttribute("stroke-linejoin",a.join);var c=a.style.toLowerCase();c in d.dasharray&&(c=d.dasharray[c]);if(c instanceof Array){for(var c=
h._toArray(c),e=0;e<c.length;++e)c[e]*=a.width;if(a.cap!="butt"){for(e=0;e<c.length;e+=2)c[e]-=a.width,c[e]<1&&(c[e]=1);for(e=1;e<c.length;e+=2)c[e]+=a.width}c=c.join(",")}b.setAttribute("stroke-dasharray",c);b.setAttribute("dojoGfxStrokeStyle",a.style)}return this},_getParentSurface:function(){for(var a=this.parent;a&&!(a instanceof g.Surface);a=a.parent);return a},_setFillObject:function(a,b){var c=d.xmlns.svg;this.fillStyle=a;var e=this._getParentSurface().defNode,f=this.rawNode.getAttribute("fill");
if(f=d.getRef(f))if(f.tagName.toLowerCase()!=b.toLowerCase()){var h=f.id;f.parentNode.removeChild(f);f=j(c,b);f.setAttribute("id",h);e.appendChild(f)}else for(;f.childNodes.length;)f.removeChild(f.lastChild);else f=j(c,b),f.setAttribute("id",g._base._getUniqueId()),e.appendChild(f);if(b=="pattern")f.setAttribute("patternUnits","userSpaceOnUse"),c=j(c,"image"),c.setAttribute("x",0),c.setAttribute("y",0),c.setAttribute("width",a.width.toFixed(8)),c.setAttribute("height",a.height.toFixed(8)),c.setAttributeNS(d.xmlns.xlink,
"xlink:href",a.src),f.appendChild(c);else{f.setAttribute("gradientUnits","userSpaceOnUse");for(e=0;e<a.colors.length;++e){var h=a.colors[e],i=j(c,"stop"),k=h.color=g.normalizeColor(h.color);i.setAttribute("offset",h.offset.toFixed(8));i.setAttribute("stop-color",k.toCss());i.setAttribute("stop-opacity",k.a);f.appendChild(i)}}this.rawNode.setAttribute("fill","url(#"+f.getAttribute("id")+")");this.rawNode.removeAttribute("fill-opacity");this.rawNode.setAttribute("fill-rule","evenodd");return f},_applyTransform:function(){if(this.matrix){var a=
this.matrix;this.rawNode.setAttribute("transform","matrix("+a.xx.toFixed(8)+","+a.yx.toFixed(8)+","+a.xy.toFixed(8)+","+a.yy.toFixed(8)+","+a.dx.toFixed(8)+","+a.dy.toFixed(8)+")")}else this.rawNode.removeAttribute("transform");return this},setRawNode:function(a){a=this.rawNode=a;this.shape.type!="image"&&a.setAttribute("fill","none");a.setAttribute("fill-opacity",0);a.setAttribute("stroke","none");a.setAttribute("stroke-opacity",0);a.setAttribute("stroke-width",1);a.setAttribute("stroke-linecap",
"butt");a.setAttribute("stroke-linejoin","miter");a.setAttribute("stroke-miterlimit",4)},setShape:function(a){this.shape=g.makeParameters(this.shape,a);for(var b in this.shape)b!="type"&&this.rawNode.setAttribute(b,this.shape[b]);this.bbox=null;return this},_moveToFront:function(){this.rawNode.parentNode.appendChild(this.rawNode);return this},_moveToBack:function(){this.rawNode.parentNode.insertBefore(this.rawNode,this.rawNode.parentNode.firstChild);return this}});dojo.declare("dojox.gfx.svg.Group",
d.Shape,{constructor:function(){i.Container._init.call(this)},setRawNode:function(a){this.rawNode=a}});d.Group.nodeType="g";dojo.declare("dojox.gfx.svg.Rect",[d.Shape,i.Rect],{setShape:function(a){this.shape=g.makeParameters(this.shape,a);this.bbox=null;for(var b in this.shape)b!="type"&&b!="r"&&this.rawNode.setAttribute(b,this.shape[b]);this.shape.r&&(this.rawNode.setAttribute("ry",this.shape.r),this.rawNode.setAttribute("rx",this.shape.r));return this}});d.Rect.nodeType="rect";dojo.declare("dojox.gfx.svg.Ellipse",
[d.Shape,i.Ellipse],{});d.Ellipse.nodeType="ellipse";dojo.declare("dojox.gfx.svg.Circle",[d.Shape,i.Circle],{});d.Circle.nodeType="circle";dojo.declare("dojox.gfx.svg.Line",[d.Shape,i.Line],{});d.Line.nodeType="line";dojo.declare("dojox.gfx.svg.Polyline",[d.Shape,i.Polyline],{setShape:function(a,b){a&&a instanceof Array?(this.shape=g.makeParameters(this.shape,{points:a}),b&&this.shape.points.length&&this.shape.points.push(this.shape.points[0])):this.shape=g.makeParameters(this.shape,a);this.bbox=
null;this._normalizePoints();for(var c=[],d=this.shape.points,f=0;f<d.length;++f)c.push(d[f].x.toFixed(8),d[f].y.toFixed(8));this.rawNode.setAttribute("points",c.join(" "));return this}});d.Polyline.nodeType="polyline";dojo.declare("dojox.gfx.svg.Image",[d.Shape,i.Image],{setShape:function(a){this.shape=g.makeParameters(this.shape,a);this.bbox=null;var a=this.rawNode,b;for(b in this.shape)b!="type"&&b!="src"&&a.setAttribute(b,this.shape[b]);a.setAttribute("preserveAspectRatio","none");a.setAttributeNS(d.xmlns.xlink,
"xlink:href",this.shape.src);return this}});d.Image.nodeType="image";dojo.declare("dojox.gfx.svg.Text",[d.Shape,i.Text],{setShape:function(a){this.shape=g.makeParameters(this.shape,a);this.bbox=null;var a=this.rawNode,b=this.shape;a.setAttribute("x",b.x);a.setAttribute("y",b.y);a.setAttribute("text-anchor",b.align);a.setAttribute("text-decoration",b.decoration);a.setAttribute("rotate",b.rotated?90:0);a.setAttribute("kerning",b.kerning?"auto":0);a.setAttribute("text-rendering","optimizeLegibility");
a.firstChild?a.firstChild.nodeValue=b.text:a.appendChild(m(b.text));return this},getTextWidth:function(){var a=this.rawNode,b=a.parentNode,a=a.cloneNode(!0);a.style.visibility="hidden";var c=0,d=a.firstChild.nodeValue;b.appendChild(a);if(d!="")for(;!c;)c=a.getBBox?parseInt(a.getBBox().width):68;b.removeChild(a);return c}});d.Text.nodeType="text";dojo.declare("dojox.gfx.svg.Path",[d.Shape,g.path.Path],{_updateWithSegment:function(a){this.inherited(arguments);typeof this.shape.path=="string"&&this.rawNode.setAttribute("d",
this.shape.path)},setShape:function(a){this.inherited(arguments);this.shape.path?this.rawNode.setAttribute("d",this.shape.path):this.rawNode.removeAttribute("d");return this}});d.Path.nodeType="path";dojo.declare("dojox.gfx.svg.TextPath",[d.Shape,g.path.TextPath],{_updateWithSegment:function(a){this.inherited(arguments);this._setTextPath()},setShape:function(a){this.inherited(arguments);this._setTextPath();return this},_setTextPath:function(){if(typeof this.shape.path=="string"){var a=this.rawNode;
if(!a.firstChild){var b=j(d.xmlns.svg,"textPath"),c=m("");b.appendChild(c);a.appendChild(b)}b=(b=a.firstChild.getAttributeNS(d.xmlns.xlink,"href"))&&d.getRef(b);if(!b&&(c=this._getParentSurface())){var c=c.defNode,b=j(d.xmlns.svg,"path"),e=g._base._getUniqueId();b.setAttribute("id",e);c.appendChild(b);a.firstChild.setAttributeNS(d.xmlns.xlink,"xlink:href","#"+e)}b&&b.setAttribute("d",this.shape.path)}},_setText:function(){var a=this.rawNode;if(!a.firstChild){var b=j(d.xmlns.svg,"textPath"),c=m("");
b.appendChild(c);a.appendChild(b)}a=a.firstChild;b=this.text;a.setAttribute("alignment-baseline","middle");switch(b.align){case "middle":a.setAttribute("text-anchor","middle");a.setAttribute("startOffset","50%");break;case "end":a.setAttribute("text-anchor","end");a.setAttribute("startOffset","100%");break;default:a.setAttribute("text-anchor","start"),a.setAttribute("startOffset","0%")}a.setAttribute("baseline-shift","0.5ex");a.setAttribute("text-decoration",b.decoration);a.setAttribute("rotate",
b.rotated?90:0);a.setAttribute("kerning",b.kerning?"auto":0);a.firstChild.data=b.text}});d.TextPath.nodeType="text";dojo.declare("dojox.gfx.svg.Surface",i.Surface,{constructor:function(){i.Container._init.call(this)},destroy:function(){this.defNode=null;this.inherited(arguments)},setDimensions:function(a,b){if(!this.rawNode)return this;this.rawNode.setAttribute("width",a);this.rawNode.setAttribute("height",b);return this},getDimensions:function(){return this.rawNode?{width:g.normalizedLength(this.rawNode.getAttribute("width")),
height:g.normalizedLength(this.rawNode.getAttribute("height"))}:null}});d.createSurface=function(a,b,c){var e=new d.Surface;e.rawNode=j(d.xmlns.svg,"svg");b&&e.rawNode.setAttribute("width",b);c&&e.rawNode.setAttribute("height",c);b=j(d.xmlns.svg,"defs");e.rawNode.appendChild(b);e.defNode=b;e._parent=h.byId(a);e._parent.appendChild(e.rawNode);return e};var k={_setFont:function(){var a=this.fontStyle;this.rawNode.setAttribute("font-style",a.style);this.rawNode.setAttribute("font-variant",a.variant);
this.rawNode.setAttribute("font-weight",a.weight);this.rawNode.setAttribute("font-size",a.size);this.rawNode.setAttribute("font-family",a.family)}},l=i.Container,n={openBatch:function(){this.fragment=d.useSvgWeb?dojo.doc.createDocumentFragment(!0):dojo.doc.createDocumentFragment()},closeBatch:function(){this.fragment&&(this.rawNode.appendChild(this.fragment),delete this.fragment)},add:function(a){this!=a.getParent()&&(this.fragment?this.fragment.appendChild(a.rawNode):this.rawNode.appendChild(a.rawNode),
l.add.apply(this,arguments));return this},remove:function(a,b){this==a.getParent()&&(this.rawNode==a.rawNode.parentNode&&this.rawNode.removeChild(a.rawNode),this.fragment&&this.fragment==a.rawNode.parentNode&&this.fragment.removeChild(a.rawNode),l.remove.apply(this,arguments));return this},clear:function(){for(var a=this.rawNode;a.lastChild;)a.removeChild(a.lastChild);var b=this.defNode;if(b){for(;b.lastChild;)b.removeChild(b.lastChild);a.appendChild(b)}return l.clear.apply(this,arguments)},_moveChildToFront:l._moveChildToFront,
_moveChildToBack:l._moveChildToBack},o={createObject:function(a,b){if(!this.rawNode)return null;var c=new a,e=j(d.xmlns.svg,a.nodeType);c.setRawNode(e);c.setShape(b);this.add(c);return c}};h.extend(d.Text,k);h.extend(d.TextPath,k);h.extend(d.Group,n);h.extend(d.Group,i.Creator);h.extend(d.Group,o);h.extend(d.Surface,n);h.extend(d.Surface,i.Creator);h.extend(d.Surface,o);if(d.useSvgWeb)d.createSurface=function(a,b,c){var e=new d.Surface;if(!b||!c)var f=h.position(a),b=b||f.w,c=c||f.h;var a=h.byId(a),
f=a.id?a.id+"_svgweb":g._base._getUniqueId(),i=j(d.xmlns.svg,"svg");i.id=f;i.setAttribute("width",b);i.setAttribute("height",c);svgweb.appendChild(i,a);i.addEventListener("SVGLoad",function(){e.rawNode=this;e.isLoaded=!0;var a=j(d.xmlns.svg,"defs");e.rawNode.appendChild(a);e.defNode=a;if(e.onLoad)e.onLoad(e)},!1);e.isLoaded=!1;return e},d.Surface.extend({destroy:function(){var a=this.rawNode;svgweb.removeChild(a,a.parentNode)}}),k={connect:function(a,b,c){a.substring(0,2)==="on"&&(a=a.substring(2));
c=arguments.length==2?b:h.hitch(b,c);this.getEventSource().addEventListener(a,c,!1);return[this,a,c]},disconnect:function(a){this.getEventSource().removeEventListener(a[1],a[2],!1);delete a[0]}},dojo.extend(d.Shape,k),dojo.extend(d.Surface,k);g.loadAndSwitch==="svg"&&(g.switchTo("svg"),delete g.loadAndSwitch)}());