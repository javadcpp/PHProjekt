//>>built
define("phpr/SearchQueryEngine",["dojo/_base/lang","dojo/_base/array","dojo/Deferred"],function(i,f){return function(e,b){var d=e.name.split("").join(".*"),g=RegExp("^.*"+d+".*$","i"),h=function(a,c){return a&&a.name&&c&&c.name?a.name.localeCompare(c.name):!a||!a.name?-1:!c||!c.name?1:0};return function(a){a=f.filter(a,function(a){return g.test(a.name)});if(""!==e.name){a.sort(h);var c=null,a=a.filter(function(a){if(!a.hasOwnProperty("name"))return!1;var b=a.name!==c;c=a.name;return b})}if(b&&(b.start||
b.count)){var d=a.length,a=a.slice(b.start||0,(b.start||0)+(b.count||Infinity));a.total=d}return a}}});