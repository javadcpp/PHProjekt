/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.sql._base"]||(dojo._hasResource["dojox.sql._base"]=!0,dojo.provide("dojox.sql._base"),dojo.require("dojox.sql._crypto"),dojo.mixin(dojox.sql,{dbName:null,debug:dojo.exists("dojox.sql.debug")?dojox.sql.debug:!1,open:function(a){if(!this._dbOpen||a&&a!=this.dbName){if(!this.dbName&&(this.dbName="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_"),this.dbName.length>63))this.dbName=this.dbName.substring(0,63);if(!a)a=this.dbName;try{this._initDb(),this.db.open(a),
this._dbOpen=!0}catch(b){throw b.message||b;}}},close:function(a){if(!dojo.isIE&&(this._dbOpen||a&&a!=this.dbName)){if(!a)a=this.dbName;try{this.db.close(a),this._dbOpen=!1}catch(b){throw b.message||b;}}},_exec:function(a){try{this._initDb();if(!this._dbOpen)this.open(),this._autoClose=!0;var b=null,d=null,c=null,e=dojo._toArray(a),b=e.splice(0,1)[0];if(this._needsEncrypt(b)||this._needsDecrypt(b))d=e.splice(e.length-1,1)[0],c=e.splice(e.length-1,1)[0];this.debug&&this._printDebugSQL(b,e);if(this._needsEncrypt(b))return new dojox.sql._SQLCrypto("encrypt",
b,c,e,d),null;else if(this._needsDecrypt(b))return new dojox.sql._SQLCrypto("decrypt",b,c,e,d),null;var f=this.db.execute(b,e),f=this._normalizeResults(f);this._autoClose&&this.close();return f}catch(g){g=g.message||g;console.debug("SQL Exception: "+g);if(this._autoClose)try{this.close()}catch(h){console.debug("Error closing database: "+h.message||h)}throw g;}},_initDb:function(){if(!this.db)try{this.db=google.gears.factory.create("beta.database","1.0")}catch(a){dojo.setObject("google.gears.denied",
!0);if(dojox.off)dojox.off.onFrameworkEvent("coreOperationFailed");throw"Google Gears must be allowed to run";}},_printDebugSQL:function(a,b){for(var d='dojox.sql("'+a+'"',c=0;c<b.length;c++)d+=typeof b[c]=="string"?', "'+b[c]+'"':", "+b[c];d+=")";console.debug(d)},_normalizeResults:function(a){var b=[];if(!a)return[];for(;a.isValidRow();){for(var d={},c=0;c<a.fieldCount();c++){var e=a.fieldName(c),f=a.field(c);d[e]=f}b.push(d);a.next()}a.close();return b},_needsEncrypt:function(a){return/encrypt\([^\)]*\)/i.test(a)},
_needsDecrypt:function(a){return/decrypt\([^\)]*\)/i.test(a)}}),dojo.declare("dojox.sql._SQLCrypto",null,{constructor:function(a,b,d,c,e){a=="encrypt"?this._execEncryptSQL(b,d,c,e):this._execDecryptSQL(b,d,c,e)},_execEncryptSQL:function(a,b,d,c){var e=this._stripCryptoSQL(a),f=this._flagEncryptedArgs(a,d),g=this;this._encrypt(e,b,d,f,function(d){var f=[],i=null;try{f=dojox.sql.db.execute(e,d)}catch(j){i=j.message||j}if(i!=null){if(dojox.sql._autoClose)try{dojox.sql.close()}catch(l){}c(null,!0,i.toString())}else f=
dojox.sql._normalizeResults(f),dojox.sql._autoClose&&dojox.sql.close(),dojox.sql._needsDecrypt(a)?(d=g._determineDecryptedColumns(a),g._decrypt(f,d,b,function(a){c(a,!1,null)})):c(f,!1,null)})},_execDecryptSQL:function(a,b,d,c){var e=this._stripCryptoSQL(a),a=this._determineDecryptedColumns(a),f=[],g=null;try{f=dojox.sql.db.execute(e,d)}catch(h){g=h.message||h}if(g!=null){if(dojox.sql._autoClose)try{dojox.sql.close()}catch(k){}c(f,!0,g.toString())}else f=dojox.sql._normalizeResults(f),dojox.sql._autoClose&&
dojox.sql.close(),this._decrypt(f,a,b,function(a){c(a,!1,null)})},_encrypt:function(a,b,d,c,e){this._finishedCrypto=this._totalCrypto=0;this._finishedSpawningCrypto=!1;this._finalArgs=d;for(a=0;a<d.length;a++)if(c[a]){var f=d[a],g=a;this._totalCrypto++;dojox.sql._crypto.encrypt(f,b,dojo.hitch(this,function(a){this._finalArgs[g]=a;this._finishedCrypto++;this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto&&e(this._finalArgs)}))}this._finishedSpawningCrypto=!0},_decrypt:function(a,
b,d,c){this._finishedCrypto=this._totalCrypto=0;this._finishedSpawningCrypto=!1;this._finalResultSet=a;for(var e=0;e<a.length;e++){var f=a[e],g;for(g in f)if(b=="*"||b[g])this._totalCrypto++,this._decryptSingleColumn(g,f[g],d,e,function(a){c(a)})}this._finishedSpawningCrypto=!0},_stripCryptoSQL:function(a){var a=a.replace(/DECRYPT\(\*\)/ig,"*"),b=a.match(/ENCRYPT\([^\)]*\)/ig);if(b!=null)for(var d=0;d<b.length;d++)var c=b[d],e=c.match(/ENCRYPT\(([^\)]*)\)/i)[1],a=a.replace(c,e);b=a.match(/DECRYPT\([^\)]*\)/ig);
if(b!=null)for(d=0;d<b.length;d++)c=b[d],e=c.match(/DECRYPT\(([^\)]*)\)/i)[1],a=a.replace(c,e);return a},_flagEncryptedArgs:function(a){for(var b=RegExp(/([\"][^\"]*\?[^\"]*[\"])|([\'][^\']*\?[^\']*[\'])|(\?)/ig),d=0,c=[];b.exec(a)!=null;)if(!/^[\"\']/.test(RegExp.lastMatch+"")){var e=!1;/ENCRYPT\([^\)]*$/i.test(RegExp.leftContext)&&(e=!0);c[d]=e;d++}return c},_determineDecryptedColumns:function(a){var b={};if(/DECRYPT\(\*\)/i.test(a))b="*";else for(var d=/DECRYPT\((?:\s*\w*\s*\,?)*\)/ig,c=d.exec(a);c;)c=
(new String(RegExp.lastMatch)).replace(/DECRYPT\(/i,""),c=c.replace(/\)/,""),c=c.split(/\s*,\s*/),dojo.forEach(c,function(a){/\s*\w* AS (\w*)/i.test(a)&&(a=a.match(/\s*\w* AS (\w*)/i)[1]);b[a]=!0}),c=d.exec(a);return b},_decryptSingleColumn:function(a,b,d,c,e){dojox.sql._crypto.decrypt(b,d,dojo.hitch(this,function(b){this._finalResultSet[c][a]=b;this._finishedCrypto++;this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto&&e(this._finalResultSet)}))}}),function(){var a=dojox.sql;dojox.sql=
new Function("return dojox.sql._exec(arguments);");dojo.mixin(dojox.sql,a)}());