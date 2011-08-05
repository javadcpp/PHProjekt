/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.widget.Wizard"]||(dojo._hasResource["dojox.widget.Wizard"]=!0,dojo.provide("dojox.widget.Wizard"),dojo.require("dijit.layout.StackContainer"),dojo.require("dijit.layout.ContentPane"),dojo.require("dijit.form.Button"),dojo.require("dojo.i18n"),dojo.requireLocalization("dijit","common",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"),dojo.requireLocalization("dojox.widget","Wizard",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"),
dojo.declare("dojox.widget.Wizard",[dijit.layout.StackContainer,dijit._Templated],{widgetsInTemplate:!0,templateString:dojo.cache("dojox.widget","Wizard/Wizard.html",'<div class="dojoxWizard" dojoAttachPoint="wizardNode">\n    <div class="dojoxWizardContainer" dojoAttachPoint="containerNode"></div>\n    <div class="dojoxWizardButtons" dojoAttachPoint="wizardNav">\n        <button dojoType="dijit.form.Button" type="button" dojoAttachPoint="previousButton">${previousButtonLabel}</button>\n        <button dojoType="dijit.form.Button" type="button" dojoAttachPoint="nextButton">${nextButtonLabel}</button>\n        <button dojoType="dijit.form.Button" type="button" dojoAttachPoint="doneButton" style="display:none">${doneButtonLabel}</button>\n        <button dojoType="dijit.form.Button" type="button" dojoAttachPoint="cancelButton">${cancelButtonLabel}</button>\n    </div>\n</div>\n'),
nextButtonLabel:"",previousButtonLabel:"",cancelButtonLabel:"",doneButtonLabel:"",cancelFunction:null,hideDisabled:!1,postMixInProperties:function(){this.inherited(arguments);var a=dojo.mixin({cancel:dojo.i18n.getLocalization("dijit","common",this.lang).buttonCancel},dojo.i18n.getLocalization("dojox.widget","Wizard",this.lang)),b;for(b in a)this[b+"ButtonLabel"]||(this[b+"ButtonLabel"]=a[b])},startup:function(){if(!this._started){this.inherited(arguments);this.connect(this.nextButton,"onClick","_forward");
this.connect(this.previousButton,"onClick","back");if(this.cancelFunction){if(dojo.isString(this.cancelFunction))this.cancelFunction=dojo.getObject(this.cancelFunction);this.connect(this.cancelButton,"onClick",this.cancelFunction)}else this.cancelButton.domNode.style.display="none";this.connect(this.doneButton,"onClick","done");this._subscription=dojo.subscribe(this.id+"-selectChild",dojo.hitch(this,"_checkButtons"));this._started=!0}},resize:function(){this.inherited(arguments);this._checkButtons()},
_checkButtons:function(){var a=this.selectedChildWidget,b=a.isLastChild;this.nextButton.set("disabled",b);this._setButtonClass(this.nextButton);if(a.doneFunction){if(this.doneButton.domNode.style.display="",b)this.nextButton.domNode.style.display="none"}else this.doneButton.domNode.style.display="none";this.previousButton.set("disabled",!this.selectedChildWidget.canGoBack);this._setButtonClass(this.previousButton)},_setButtonClass:function(a){a.domNode.style.display=this.hideDisabled&&a.disabled?
"none":""},_forward:function(){this.selectedChildWidget._checkPass()&&this.forward()},done:function(){this.selectedChildWidget.done()},destroy:function(){dojo.unsubscribe(this._subscription);this.inherited(arguments)}}),dojo.declare("dojox.widget.WizardPane",dijit.layout.ContentPane,{canGoBack:!0,passFunction:null,doneFunction:null,startup:function(){this.inherited(arguments);if(this.isFirstChild)this.canGoBack=!1;if(dojo.isString(this.passFunction))this.passFunction=dojo.getObject(this.passFunction);
if(dojo.isString(this.doneFunction)&&this.doneFunction)this.doneFunction=dojo.getObject(this.doneFunction)},_onShow:function(){if(this.isFirstChild)this.canGoBack=!1;this.inherited(arguments)},_checkPass:function(){var a=!0;if(this.passFunction&&dojo.isFunction(this.passFunction)){var b=this.passFunction();switch(typeof b){case "boolean":a=b;break;case "string":alert(b),a=!1}}return a},done:function(){this.doneFunction&&dojo.isFunction(this.doneFunction)&&this.doneFunction()}}));