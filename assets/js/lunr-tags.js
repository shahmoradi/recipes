!function(){var t=function(e){var n=new t.Index;return n.pipeline.add(t.trimmer,t.stopWordFilter,t.stemmer),e&&e.call(n,n),n};t.version="0.6.0",t.utils={},t.utils.warn=function(t){return function(e){t.console&&console.warn&&console.warn(e)}}(this),t.utils.asString=function(t){return void 0===t||null===t?"":t.toString()},t.EventEmitter=function(){this.events={}},t.EventEmitter.prototype.addListener=function(){var t=Array.prototype.slice.call(arguments),e=t.pop(),n=t;if("function"!=typeof e)throw new TypeError("last argument must be a function");n.forEach(function(t){this.hasHandler(t)||(this.events[t]=[]),this.events[t].push(e)},this)},t.EventEmitter.prototype.removeListener=function(t,e){if(this.hasHandler(t)){var n=this.events[t].indexOf(e);this.events[t].splice(n,1),this.events[t].length||delete this.events[t]}},t.EventEmitter.prototype.emit=function(t){if(this.hasHandler(t)){var e=Array.prototype.slice.call(arguments,1);this.events[t].forEach(function(t){t.apply(void 0,e)})}},t.EventEmitter.prototype.hasHandler=function(t){return t in this.events},t.tokenizer=function(e){return arguments.length&&null!=e&&void 0!=e?Array.isArray(e)?e.map(function(e){return t.utils.asString(e).toLowerCase()}):e.toString().trim().toLowerCase().split(t.tokenizer.seperator):[]},t.tokenizer.seperator=/[\s\-]+/,t.Pipeline=function(){this._stack=[]},t.Pipeline.registeredFunctions={},t.Pipeline.registerFunction=function(e,n){n in this.registeredFunctions&&t.utils.warn("Overwriting existing registered function: "+n),e.label=n,t.Pipeline.registeredFunctions[e.label]=e},t.Pipeline.warnIfFunctionNotRegistered=function(e){var n=e.label&&e.label in this.registeredFunctions;n||t.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n",e)},t.Pipeline.load=function(e){var n=new t.Pipeline;return e.forEach(function(e){var i=t.Pipeline.registeredFunctions[e];if(!i)throw new Error("Cannot load un-registered function: "+e);n.add(i)}),n},t.Pipeline.prototype.add=function(){var e=Array.prototype.slice.call(arguments);e.forEach(function(e){t.Pipeline.warnIfFunctionNotRegistered(e),this._stack.push(e)},this)},t.Pipeline.prototype.after=function(e,n){t.Pipeline.warnIfFunctionNotRegistered(n);var i=this._stack.indexOf(e);if(-1==i)throw new Error("Cannot find existingFn");i+=1,this._stack.splice(i,0,n)},t.Pipeline.prototype.before=function(e,n){t.Pipeline.warnIfFunctionNotRegistered(n);var i=this._stack.indexOf(e);if(-1==i)throw new Error("Cannot find existingFn");this._stack.splice(i,0,n)},t.Pipeline.prototype.remove=function(t){var e=this._stack.indexOf(t);-1!=e&&this._stack.splice(e,1)},t.Pipeline.prototype.run=function(t){for(var e=[],n=t.length,i=this._stack.length,r=0;n>r;r++){for(var o=t[r],s=0;i>s&&(o=this._stack[s](o,r,t),void 0!==o&&""!==o);s++);void 0!==o&&""!==o&&e.push(o)}return e},t.Pipeline.prototype.reset=function(){this._stack=[]},t.Pipeline.prototype.toJSON=function(){return this._stack.map(function(e){return t.Pipeline.warnIfFunctionNotRegistered(e),e.label})},t.Vector=function(){this._magnitude=null,this.list=void 0,this.length=0},t.Vector.Node=function(t,e,n){this.idx=t,this.val=e,this.next=n},t.Vector.prototype.insert=function(e,n){this._magnitude=void 0;var i=this.list;if(!i)return this.list=new t.Vector.Node(e,n,i),this.length++;if(e<i.idx)return this.list=new t.Vector.Node(e,n,i),this.length++;for(var r=i,o=i.next;void 0!=o;){if(e<o.idx)return r.next=new t.Vector.Node(e,n,o),this.length++;r=o,o=o.next}return r.next=new t.Vector.Node(e,n,o),this.length++},t.Vector.prototype.magnitude=function(){if(this._magnitude)return this._magnitude;for(var t,e=this.list,n=0;e;)t=e.val,n+=t*t,e=e.next;return this._magnitude=Math.sqrt(n)},t.Vector.prototype.dot=function(t){for(var e=this.list,n=t.list,i=0;e&&n;)e.idx<n.idx?e=e.next:e.idx>n.idx?n=n.next:(i+=e.val*n.val,e=e.next,n=n.next);return i},t.Vector.prototype.similarity=function(t){return this.dot(t)/(this.magnitude()*t.magnitude())},t.SortedSet=function(){this.length=0,this.elements=[]},t.SortedSet.load=function(t){var e=new this;return e.elements=t,e.length=t.length,e},t.SortedSet.prototype.add=function(){var t,e;for(t=0;t<arguments.length;t++)e=arguments[t],~this.indexOf(e)||this.elements.splice(this.locationFor(e),0,e);this.length=this.elements.length},t.SortedSet.prototype.toArray=function(){return this.elements.slice()},t.SortedSet.prototype.map=function(t,e){return this.elements.map(t,e)},t.SortedSet.prototype.forEach=function(t,e){return this.elements.forEach(t,e)},t.SortedSet.prototype.indexOf=function(t){for(var e=0,n=this.elements.length,i=n-e,r=e+Math.floor(i/2),o=this.elements[r];i>1;){if(o===t)return r;t>o&&(e=r),o>t&&(n=r),i=n-e,r=e+Math.floor(i/2),o=this.elements[r]}return o===t?r:-1},t.SortedSet.prototype.locationFor=function(t){for(var e=0,n=this.elements.length,i=n-e,r=e+Math.floor(i/2),o=this.elements[r];i>1;)t>o&&(e=r),o>t&&(n=r),i=n-e,r=e+Math.floor(i/2),o=this.elements[r];return o>t?r:t>o?r+1:void 0},t.SortedSet.prototype.intersect=function(e){for(var n=new t.SortedSet,i=0,r=0,o=this.length,s=e.length,a=this.elements,h=e.elements;;){if(i>o-1||r>s-1)break;a[i]!==h[r]?a[i]<h[r]?i++:a[i]>h[r]&&r++:(n.add(a[i]),i++,r++)}return n},t.SortedSet.prototype.clone=function(){var e=new t.SortedSet;return e.elements=this.toArray(),e.length=e.elements.length,e},t.SortedSet.prototype.union=function(t){var e,n,i;return this.length>=t.length?(e=this,n=t):(e=t,n=this),i=e.clone(),i.add.apply(i,n.toArray()),i},t.SortedSet.prototype.toJSON=function(){return this.toArray()},t.Index=function(){this._fields=[],this._ref="id",this.pipeline=new t.Pipeline,this.documentStore=new t.Store,this.tokenStore=new t.TokenStore,this.corpusTokens=new t.SortedSet,this.eventEmitter=new t.EventEmitter,this._idfCache={},this.on("add","remove","update",function(){this._idfCache={}}.bind(this))},t.Index.prototype.on=function(){var t=Array.prototype.slice.call(arguments);return this.eventEmitter.addListener.apply(this.eventEmitter,t)},t.Index.prototype.off=function(t,e){return this.eventEmitter.removeListener(t,e)},t.Index.load=function(e){e.version!==t.version&&t.utils.warn("version mismatch: current "+t.version+" importing "+e.version);var n=new this;return n._fields=e.fields,n._ref=e.ref,n.documentStore=t.Store.load(e.documentStore),n.tokenStore=t.TokenStore.load(e.tokenStore),n.corpusTokens=t.SortedSet.load(e.corpusTokens),n.pipeline=t.Pipeline.load(e.pipeline),n},t.Index.prototype.field=function(t,e){var e=e||{},n={name:t,boost:e.boost||1};return this._fields.push(n),this},t.Index.prototype.ref=function(t){return this._ref=t,this},t.Index.prototype.add=function(e,n){var i={},r=new t.SortedSet,o=e[this._ref],n=void 0===n?!0:n;this._fields.forEach(function(n){var o=this.pipeline.run(t.tokenizer(e[n.name]));i[n.name]=o,t.SortedSet.prototype.add.apply(r,o)},this),this.documentStore.set(o,r),t.SortedSet.prototype.add.apply(this.corpusTokens,r.toArray());for(var s=0;s<r.length;s++){var a=r.elements[s],h=this._fields.reduce(function(t,e){var n=i[e.name].length;if(!n)return t;var r=i[e.name].filter(function(t){return t===a}).length;return t+r/n*e.boost},0);this.tokenStore.add(a,{ref:o,tf:h})}n&&this.eventEmitter.emit("add",e,this)},t.Index.prototype.remove=function(t,e){var n=t[this._ref],e=void 0===e?!0:e;if(this.documentStore.has(n)){var i=this.documentStore.get(n);this.documentStore.remove(n),i.forEach(function(t){this.tokenStore.remove(t,n)},this),e&&this.eventEmitter.emit("remove",t,this)}},t.Index.prototype.update=function(t,e){var e=void 0===e?!0:e;this.remove(t,!1),this.add(t,!1),e&&this.eventEmitter.emit("update",t,this)},t.Index.prototype.idf=function(t){var e="@"+t;if(Object.prototype.hasOwnProperty.call(this._idfCache,e))return this._idfCache[e];var n=this.tokenStore.count(t),i=1;return n>0&&(i=1+Math.log(this.documentStore.length/n)),this._idfCache[e]=i},t.Index.prototype.search=function(e){var n=this.pipeline.run(t.tokenizer(e)),i=new t.Vector,r=[],o=this._fields.reduce(function(t,e){return t+e.boost},0),s=n.some(function(t){return this.tokenStore.has(t)},this);if(!s)return[];n.forEach(function(e,n,s){var a=1/s.length*this._fields.length*o,h=this,u=this.tokenStore.expand(e).reduce(function(n,r){var o=h.corpusTokens.indexOf(r),s=h.idf(r),u=1,l=new t.SortedSet;if(r!==e){var c=Math.max(3,r.length-e.length);u=1/Math.log(c)}o>-1&&i.insert(o,a*s*u);for(var f=h.tokenStore.get(r),p=Object.keys(f),d=p.length,v=0;d>v;v++)l.add(f[p[v]].ref);return n.union(l)},new t.SortedSet);r.push(u)},this);var a=r.reduce(function(t,e){return t.intersect(e)});return a.map(function(t){return{ref:t,score:i.similarity(this.documentVector(t))}},this).sort(function(t,e){return e.score-t.score})},t.Index.prototype.documentVector=function(e){for(var n=this.documentStore.get(e),i=n.length,r=new t.Vector,o=0;i>o;o++){var s=n.elements[o],a=this.tokenStore.get(s)[e].tf,h=this.idf(s);r.insert(this.corpusTokens.indexOf(s),a*h)}return r},t.Index.prototype.toJSON=function(){return{version:t.version,fields:this._fields,ref:this._ref,documentStore:this.documentStore.toJSON(),tokenStore:this.tokenStore.toJSON(),corpusTokens:this.corpusTokens.toJSON(),pipeline:this.pipeline.toJSON()}},t.Index.prototype.use=function(t){var e=Array.prototype.slice.call(arguments,1);e.unshift(this),t.apply(this,e)},t.Store=function(){this.store={},this.length=0},t.Store.load=function(e){var n=new this;return n.length=e.length,n.store=Object.keys(e.store).reduce(function(n,i){return n[i]=t.SortedSet.load(e.store[i]),n},{}),n},t.Store.prototype.set=function(t,e){this.has(t)||this.length++,this.store[t]=e},t.Store.prototype.get=function(t){return this.store[t]},t.Store.prototype.has=function(t){return t in this.store},t.Store.prototype.remove=function(t){this.has(t)&&(delete this.store[t],this.length--)},t.Store.prototype.toJSON=function(){return{store:this.store,length:this.length}},t.stemmer=function(){var t={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},e={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},n="[^aeiou]",i="[aeiouy]",r=n+"[^aeiouy]*",o=i+"[aeiou]*",s="^("+r+")?"+o+r,a="^("+r+")?"+o+r+"("+o+")?$",h="^("+r+")?"+o+r+o+r,u="^("+r+")?"+i,l=new RegExp(s),c=new RegExp(h),f=new RegExp(a),p=new RegExp(u),d=/^(.+?)(ss|i)es$/,v=/^(.+?)([^s])s$/,m=/^(.+?)eed$/,g=/^(.+?)(ed|ing)$/,y=/.$/,S=/(at|bl|iz)$/,w=new RegExp("([^aeiouylsz])\\1$"),x=new RegExp("^"+r+i+"[^aeiouwxy]$"),k=/^(.+?[^aeiou])y$/,b=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,E=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,_=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,F=/^(.+?)(s|t)(ion)$/,O=/^(.+?)e$/,P=/ll$/,N=new RegExp("^"+r+i+"[^aeiouwxy]$"),T=function(n){var i,r,o,s,a,h,u;if(n.length<3)return n;if(o=n.substr(0,1),"y"==o&&(n=o.toUpperCase()+n.substr(1)),s=d,a=v,s.test(n)?n=n.replace(s,"$1$2"):a.test(n)&&(n=n.replace(a,"$1$2")),s=m,a=g,s.test(n)){var T=s.exec(n);s=l,s.test(T[1])&&(s=y,n=n.replace(s,""))}else if(a.test(n)){var T=a.exec(n);i=T[1],a=p,a.test(i)&&(n=i,a=S,h=w,u=x,a.test(n)?n+="e":h.test(n)?(s=y,n=n.replace(s,"")):u.test(n)&&(n+="e"))}if(s=k,s.test(n)){var T=s.exec(n);i=T[1],n=i+"i"}if(s=b,s.test(n)){var T=s.exec(n);i=T[1],r=T[2],s=l,s.test(i)&&(n=i+t[r])}if(s=E,s.test(n)){var T=s.exec(n);i=T[1],r=T[2],s=l,s.test(i)&&(n=i+e[r])}if(s=_,a=F,s.test(n)){var T=s.exec(n);i=T[1],s=c,s.test(i)&&(n=i)}else if(a.test(n)){var T=a.exec(n);i=T[1]+T[2],a=c,a.test(i)&&(n=i)}if(s=O,s.test(n)){var T=s.exec(n);i=T[1],s=c,a=f,h=N,(s.test(i)||a.test(i)&&!h.test(i))&&(n=i)}return s=P,a=c,s.test(n)&&a.test(n)&&(s=y,n=n.replace(s,"")),"y"==o&&(n=o.toLowerCase()+n.substr(1)),n};return T}(),t.Pipeline.registerFunction(t.stemmer,"stemmer"),t.generateStopWordFilter=function(t){var e=t.reduce(function(t,e){return t[e]=e,t},{});return function(t){return t&&e[t]!==t?t:void 0}},t.stopWordFilter=t.generateStopWordFilter(["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"]),t.Pipeline.registerFunction(t.stopWordFilter,"stopWordFilter"),t.trimmer=function(t){return t.replace(/^\W+/,"").replace(/\W+$/,"")},t.Pipeline.registerFunction(t.trimmer,"trimmer"),t.TokenStore=function(){this.root={docs:{}},this.length=0},t.TokenStore.load=function(t){var e=new this;return e.root=t.root,e.length=t.length,e},t.TokenStore.prototype.add=function(t,e,n){var n=n||this.root,i=t.charAt(0),r=t.slice(1);return i in n||(n[i]={docs:{}}),0===r.length?(n[i].docs[e.ref]=e,void(this.length+=1)):this.add(r,e,n[i])},t.TokenStore.prototype.has=function(t){if(!t)return!1;for(var e=this.root,n=0;n<t.length;n++){if(!e[t.charAt(n)])return!1;e=e[t.charAt(n)]}return!0},t.TokenStore.prototype.getNode=function(t){if(!t)return{};for(var e=this.root,n=0;n<t.length;n++){if(!e[t.charAt(n)])return{};e=e[t.charAt(n)]}return e},t.TokenStore.prototype.get=function(t,e){return this.getNode(t,e).docs||{}},t.TokenStore.prototype.count=function(t,e){return Object.keys(this.get(t,e)).length},t.TokenStore.prototype.remove=function(t,e){if(t){for(var n=this.root,i=0;i<t.length;i++){if(!(t.charAt(i)in n))return;n=n[t.charAt(i)]}delete n.docs[e]}},t.TokenStore.prototype.expand=function(t,e){var n=this.getNode(t),i=n.docs||{},e=e||[];return Object.keys(i).length&&e.push(t),Object.keys(n).forEach(function(n){"docs"!==n&&e.concat(this.expand(t+n,e))},this),e},t.TokenStore.prototype.toJSON=function(){return{root:this.root,length:this.length}},function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e():t.lunr=e()}(this,function(){return t})}();
var index = lunr(function () {
  this.field('tags')
  this.ref('id')
});

index.add({
  tags: ["Python","numpy","matplotlib","visualization","Monte Carlo","simulation","plot","line","figure","random number","distribution function","probability density function","PDF","probability","Gaussian"],
  id: 0
})
index.add({
  tags: ["Python","numpy","matplotlib","visualization","scikit-learn","clustering","plot","scatter plot","kmeans","kmeans++","figure","random number","pandas","read_csv"],
  id: 1
})
index.add({
  tags: ["MATLAB","regression","visualization","plot","line","figure","random number","distribution function","probability density function","PDF","probability","objective function","least squares method"],
  id: 2
})
index.add({
  tags: ["Python","MATLAB","probability","Central Limit Theorem","CLT","histogram","random walk","random","Gaussian","normal","Monte Carlo"],
  id: 3
})
index.add({
  tags: ["Python","maximum","recursive","function","recursive function","branching","list"],
  id: 4
})
index.add({
  tags: ["Python","maximum","recursive","function","recursive function","branching","list"],
  id: 5
})
index.add({
  tags: ["Fortran","DLL","library","dynamic-link library","interoperation","compiler","Intel","Windows","alias","name mangling","DLLIMPORT","DLLEXPORT","bind","C","function","iso_fortran_env","real64"],
  id: 6
})
index.add({
  tags: ["Fortran","C","Python","DLL","library","dynamic-link library","interoperation","compiler","Intel","Windows","alias","name mangling","DLLIMPORT","DLLEXPORT","bind","function","iso_fortran_env","real64","int32","ctypes","iso_c_binding"],
  id: 7
})
index.add({
  tags: ["interoperation","compiler","Intel","Windows","alias","name mangling","bind","Fortran","C","function","iso_fortran_env","iso_c_binding","char","string"],
  id: 8
})
index.add({
  tags: ["interoperation","compiler","Intel","Windows","alias","name mangling","bind","Fortran","C","function","iso_fortran_env","iso_c_binding","char","string"],
  id: 9
})
index.add({
  tags: ["MATLAB","Python","input","output","IO","command line","argument","function","exception","for-loop"],
  id: 10
})
index.add({
  tags: ["MATLAB","Python","while-loop","for-loop","loop","vectorization","performance","timing","temperature","num2str","timeit","function handle"],
  id: 11
})
index.add({
  tags: ["VCS","git","GitHub","version control system","project","markdown","git branch"],
  id: 12
})
index.add({
  tags: ["value","variable","type","class","logical","whos","who","cell array","list","syntax error","error","Python","MATLAB"],
  id: 13
})
index.add({
  tags: ["MATLAB","Python","unit-testing","triangle","area","function","list","nested list","cell array","matrix","tuple"],
  id: 14
})
index.add({
  tags: ["Python","MATLAB","value","variable","type","script","physics","heat capacity","egg"],
  id: 15
})
index.add({
  tags: ["MATLAB","string","concatenation","for-loop","loop","Python","cell array","list"],
  id: 16
})
index.add({
  tags: ["MATLAB","string","concatenation","for-loop","loop","cell array","list"],
  id: 17
})
index.add({
  tags: ["MATLAB","Python","visualization","matplotlib","Monte Carlo","simulation","plot","figure","line","random number","probability"],
  id: 18
})
index.add({
  tags: ["MATLAB","Python","roundoff","error","sqrt","for-loop","loop"],
  id: 19
})
index.add({
  tags: ["MATLAB","regression","visualization","Monte Carlo","simulation","plot","line","figure","random number","distribution function","probability density function","PDF","probability","objective function"],
  id: 20
})
index.add({
  tags: ["MATLAB","Python","visualization","web","data transfer","IO","input","output","string","exception","exception handling","raise","try-catch","try-except","scatter plot","urllib","HTTPError","matplotlib","plot","figure"],
  id: 21
})
index.add({
  tags: ["Python","value","variable","type","alias","copy","tuple","list","id","is"],
  id: 22
})
index.add({
  tags: ["Python","branching","print","tuple","input","string"],
  id: 23
})
index.add({
  tags: ["Python","value","variable","type","syntax","error","syntax error","multiple assignment","logical","alias"],
  id: 24
})
index.add({
  tags: ["value","variable","type","syntax error","error","string","Python","value","variable","type"],
  id: 25
})
index.add({
  tags: ["Python","value","variable","type","dictionary"],
  id: 26
})
index.add({
  tags: ["Python","working directory","directory","script","run","mkdir","cd","string","print","escape character","value","variable","type"],
  id: 27
})
index.add({
  tags: ["MATLAB","Python","roundoff","precision","error","for-loop","loop"],
  id: 28
})
index.add({
  tags: ["MATLAB","function","structure","isfield","Cartesian","polar","coordinates","branching","logical"],
  id: 29
})
index.add({
  tags: ["value","variable","type","operator","precedence","operator precedence","Python","MATLAB"],
  id: 30
})
index.add({
  tags: ["logical","Python","function","modulus","even","modulo"],
  id: 31
})
index.add({
  tags: ["MATLAB","visualization","subplot","plot","figure","object boundary","imagesc","image","bwboundaries","cell array"],
  id: 32
})
index.add({
  tags: ["Python","numpy","matplotlib","visualization","Monte Carlo","simulation","plot","line","figure","random number","distribution function","probability density function","PDF","probability"],
  id: 33
})
index.add({
  tags: ["MATLAB","Python","numpy","matplotlib","visualization","Monte Carlo","simulation","plot","line","figure","random number","probability"],
  id: 34
})
index.add({
  tags: ["Python","for-loop","loop"],
  id: 35
})
index.add({
  tags: ["value","variable","type","matrix","initialization","zeros","eye","diag","numpy","Python","MATLAB"],
  id: 36
})
index.add({
  tags: ["MATLAB","working directory","directory","script","figure","plot","mkdir","cd","value","variable","type"],
  id: 37
})
index.add({
  tags: ["MATLAB","visualization","subplot","plot","figure"],
  id: 38
})
index.add({
  tags: ["value","variable","type","syntax error","error","string","MATLAB"],
  id: 39
})
index.add({
  tags: ["function","for-loop","branching","logical","prime number","isprime","MATLAB","Python"],
  id: 40
})
index.add({
  tags: ["function","nested function","recursive","branching","logical","prime number","isprime","MATLAB","Python"],
  id: 41
})
index.add({
  tags: ["value","variable","type","semantic error","overflow","integer","Python","MATLAB"],
  id: 42
})
index.add({
  tags: ["Python","MATLAB","Gaussian","bell-shaped","pi","value","variable","type"],
  id: 43
})
index.add({
  tags: ["VCS","git","GitHub","version control system","project","markdown","git branch","GitHub pages","webpage"],
  id: 44
})
index.add({
  tags: ["MATLAB","function","generator","nested function","function generator","branching","switch","nargin"],
  id: 45
})
index.add({
  tags: ["MATLAB","Python","Fibonacci sequence","recursive","function","recursive function","branching","isreal","round","str2double","input","string"],
  id: 46
})
index.add({
  tags: ["MATLAB","Python","Fibonacci sequence","recursive","function","recursive function","branching","isreal","round","str2double","input","string","for-loop","timeit","performance","tab","disp","char"],
  id: 47
})
index.add({
  tags: ["Python","projectile motion","exception handling","exception","ValueError","try-except","raise"],
  id: 48
})
index.add({
  tags: ["Python","derivative","exception handling","exception","ValueError","try-except","raise","assert","unit-testing","function"],
  id: 49
})
index.add({
  tags: ["Python","Amino Acid","input","output","IO","command line","argument","exception handling","exception","for-loop","dictionary","map"],
  id: 50
})
index.add({
  tags: ["Python","command line","input","argument","sum","IO"],
  id: 51
})
index.add({
  tags: ["Python","command line","input","argument","sum","eval","IO"],
  id: 52
})
index.add({
  tags: ["MATLAB","directory","dir","size","fieldnames","sum"],
  id: 53
})
index.add({
  tags: ["Python","branching","print","tuple","input"],
  id: 54
});
var store = [{
  "title": "Monte Carlo sampling of the sum of two Gaussian distributions",
  "link": "/programming/monte-carlo-sampling-of-bimodal-gaussian/monte-carlo-sampling-of-bimodal-gaussian",
  "date": "November 21, 2019",
  "category": null,
  "tags": ["Python","numpy","matplotlib","visualization","Monte Carlo","simulation","plot","line","figure","random number","distribution function","probability density function","PDF","probability","Gaussian"],
  "excerpt": "Problem Suppose that you wanted to generate points whose distribution follows the blue curve in the following curve, whose mathematical..."
},{
  "title": "Kmeans clustering",
  "link": "/programming/clustering-kmeans/clustering-kmeans",
  "date": "November 21, 2019",
  "category": null,
  "tags": ["Python","numpy","matplotlib","visualization","scikit-learn","clustering","plot","scatter plot","kmeans","kmeans++","figure","random number","pandas","read_csv"],
  "excerpt": "Problem Consider this dataset points.txt. Write a sctipt that reads this dataset and plots the second column of the dataset..."
},{
  "title": "Regression: Predicting the global land temperature of the Earth in 2050 from the past data",
  "link": "/programming/regression-predicting-future-global-land-temperature/regression-predicting-future-global-land-temperature",
  "date": "November 1, 2019",
  "category": null,
  "tags": ["MATLAB","regression","visualization","plot","line","figure","random number","distribution function","probability density function","PDF","probability","objective function","least squares method"],
  "excerpt": "Problem Consider this dataset, usaTemperatureHistory.txt, which contains the global land temperature of the earth from 1743 to 2013 at every..."
},{
  "title": "Understanding the Central Limit Theorem via random walk",
  "link": "/programming/random-walk-central-limit-theorem/random-walk-central-limit-theorem",
  "date": "November 1, 2019",
  "category": null,
  "tags": ["Python","MATLAB","probability","Central Limit Theorem","CLT","histogram","random walk","random","Gaussian","normal","Monte Carlo"],
  "excerpt": "In probability theory, the central limit theorem (CLT) establishes that, when independent random variables are added together, their properly normalized..."
},{
  "title": "Finding the maximum value of an array via recursive function calls",
  "link": "/programming/finding-maximum-value-via-recursive-function/finding-maximum-value-via-recursive-function",
  "date": "October 29, 2019",
  "category": null,
  "tags": ["Python","maximum","recursive","function","recursive function","branching","list"],
  "excerpt": "Problem Write a recursive Python function findMaxVal() that takes an input list of numbers and returns the maximum value stored..."
},{
  "title": "Finding the position of the maximum value of an array via recursive function calls",
  "link": "/programming/finding-maximum-location-via-recursive-function/finding-maximum-location-via-recursive-function",
  "date": "October 29, 2019",
  "category": null,
  "tags": ["Python","maximum","recursive","function","recursive function","branching","list"],
  "excerpt": "Problem Write a recursive Python function findMaxValMaxLoc() that takes an input list of numbers and returns, as a tuple, both..."
},{
  "title": "Making and using a Dynamic-Link Library (DLL) from a Fortran procedure using Intel Fortran Compiler on Windows OS: getSquare()",
  "link": "/programming/fortran-dll-getsquare/fortran-dll-getsquare",
  "date": "August 4, 2019",
  "category": null,
  "tags": ["Fortran","DLL","library","dynamic-link library","interoperation","compiler","Intel","Windows","alias","name mangling","DLLIMPORT","DLLEXPORT","bind","C","function","iso_fortran_env","real64"],
  "excerpt": "Consider the following example Fortran function contained in Fortran module Square_mod which takes an input real number of type real64..."
},{
  "title": "Calling Fortran function from other languages via a Dynamic-Link Library (DLL): getPower()",
  "link": "/programming/fortran-dll-getpower/fortran-dll-getpower",
  "date": "August 4, 2019",
  "category": null,
  "tags": ["Fortran","C","Python","DLL","library","dynamic-link library","interoperation","compiler","Intel","Windows","alias","name mangling","DLLIMPORT","DLLEXPORT","bind","function","iso_fortran_env","real64","int32","ctypes","iso_c_binding"],
  "excerpt": "Consider the following example Fortran function contained in Fortran module Power_mod which takes an input real number base of type..."
},{
  "title": "Passing characters and strings from C to Fortran and from Fortran to C",
  "link": "/programming/fortran-c-interoperation-string/fortran-c-interoperation-string",
  "date": "August 4, 2019",
  "category": null,
  "tags": ["interoperation","compiler","Intel","Windows","alias","name mangling","bind","Fortran","C","function","iso_fortran_env","iso_c_binding","char","string"],
  "excerpt": "Problem Consider the following example Fortran function getLowerCase which takes a string of arbitrary length as input and converts all..."
},{
  "title": "Passing allocatable string from Fortran to C",
  "link": "/programming/fortran-c-interoperation-passing-allocatable-to-c/fortran-c-interoperation-passing-allocatable-to-c",
  "date": "August 4, 2019",
  "category": null,
  "tags": ["interoperation","compiler","Intel","Windows","alias","name mangling","bind","Fortran","C","function","iso_fortran_env","iso_c_binding","char","string"],
  "excerpt": "Problem Consider the following example Fortran function replaceStr which takes a string of arbitrary length as input and search string...."
},{
  "title": "Data transfer: Converting Comma-Separated-Values (CSV) input to formatted output",
  "link": "/programming/csv-input-to-formatted-output/csv-input-to-formatted-output",
  "date": "August 4, 2019",
  "category": null,
  "tags": ["MATLAB","Python","input","output","IO","command line","argument","function","exception","for-loop"],
  "excerpt": "Problem Consider this comma-separated data file: data.in. Write a simple script named csv2formatted that takes two input arguments representing the..."
},{
  "title": "The while-loop implementation of for-loop",
  "link": "/programming/while-loop-to-for-loop/while-loop-to-for-loop",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","Python","while-loop","for-loop","loop","vectorization","performance","timing","temperature","num2str","timeit","function handle"],
  "excerpt": "Problem MATLAB Consider the following two vectors of temperatures in Celsius degrees to Fahrenheit, using a for-loop and then prints..."
},{
  "title": "Version-control using Git and GitHub",
  "link": "/programming/version-control-using-git-github/version-control-using-git-github",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["VCS","git","GitHub","version control system","project","markdown","git branch"],
  "excerpt": "Git Guidelines. Use the following Markdown language references, or any other reference that you find or prefer, to perform the..."
},{
  "title": "value, variable, type, syntax error",
  "link": "/programming/values-variables-types-syntax-error/values-variables-types-syntax-error",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["value","variable","type","class","logical","whos","who","cell array","list","syntax error","error","Python","MATLAB"],
  "excerpt": "Problem Type the following in the command window and submit the results. Briefly explain what each assignment does. a =..."
},{
  "title": "Computing the area of a triangle",
  "link": "/programming/triangle-area/triangle-area",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","Python","unit-testing","triangle","area","function","list","nested list","cell array","matrix","tuple"],
  "excerpt": "Problem An arbitrary triangle can be described by the coordinates of its three vertices: $(x1,y1),(x2,y2),(x3,y3)$, numbered in a counterclockwise direction...."
},{
  "title": "Time required for cooking a refrigerated egg",
  "link": "/programming/time-to-cook-frozen-egg/time-to-cook-frozen-egg",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["Python","MATLAB","value","variable","type","script","physics","heat capacity","egg"],
  "excerpt": "Problem As an egg cooks, the proteins first denature and then coagulate. When the temperature exceeds a critical point, reactions..."
},{
  "title": "String concatenation using for-loop",
  "link": "/programming/string-concatenation-using-for-loop/string-concatenation-using-for-loop",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","string","concatenation","for-loop","loop","Python","cell array","list"],
  "excerpt": "Problem MATLAB Consider the following nested cell array, q = {{'a', 'b', 'c'}, {'d', 'e', 'f'}, {'g', 'h'}} Write a..."
},{
  "title": "String concatenation using for-loop I",
  "link": "/programming/string-concatenation-using-for-loop-i/string-concatenation-using-for-loop-I",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","string","concatenation","for-loop","loop","cell array","list"],
  "excerpt": "Problem MATLAB Consider the following nested cell vector, List = { {'M','A','T','L','A','B'}, {' '}, {'i','s'}, {' '}, {'a'}, {' '},..."
},{
  "title": "Simulating the Monty Hall game",
  "link": "/programming/simulating-monty-hall-game/simulating-monty-hall-game",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","Python","visualization","matplotlib","Monte Carlo","simulation","plot","figure","line","random number","probability"],
  "excerpt": "Problem Suppose you’re on a game show, and you’re given the choice of three doors, Behind one door is a..."
},{
  "title": "Impact of round-off errors on numerical computations",
  "link": "/programming/roundoff-error-paradox/roundoff-error-paradox",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","Python","roundoff","error","sqrt","for-loop","loop"],
  "excerpt": "Problem MATLAB Consider the following program, formatSpec = 'With %d sqrt, then %d times ^2 operations, the number %.16f becomes:..."
},{
  "title": "Regression: obtaining the most likely mean and standard deviation of a set of Standard Normally Distributed Random Variables",
  "link": "/programming/regression-standard-normal-distribution/regression-standard-normal-distribution",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","regression","visualization","Monte Carlo","simulation","plot","line","figure","random number","distribution function","probability density function","PDF","probability","objective function"],
  "excerpt": "Problem Consider this dataset, Drand.mat, which contains a set of random numbers. Let’s make a hypothesis with regards to this..."
},{
  "title": "Reading data from the World Wide Web",
  "link": "/programming/reading-data-from-web/reading-data-from-web",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","Python","visualization","web","data transfer","IO","input","output","string","exception","exception handling","raise","try-catch","try-except","scatter plot","urllib","HTTPError","matplotlib","plot","figure"],
  "excerpt": "Problem Part A Consider the following web-page address https://cdslaborg.github.io/DataRepos_SwiftBat/index.html. This is an data table (in HTML language) containing data from..."
},{
  "title": "Python aliasing vs. copying variables",
  "link": "/programming/python-variable-aliasing-copying/python-variable-aliasing-copying",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["Python","value","variable","type","alias","copy","tuple","list","id","is"],
  "excerpt": "Run the following Python statements and briefly explain why you get the behavior displayed by the print functions. Problem Part..."
},{
  "title": "Single-line Python input and string manipulation",
  "link": "/programming/python-single-line-input-string-manipulation/python-single-line-input-string-manipulation",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["Python","branching","print","tuple","input","string"],
  "excerpt": "Problem Part A Write a single-line Python code that reads a string containing comma-separated first-name, last-name, and the city in..."
},{
  "title": "Python script full of syntax errors",
  "link": "/programming/python-script-full-of-syntax-errors/python-script-full-of-syntax-errors",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["Python","value","variable","type","syntax","error","syntax error","multiple assignment","logical","alias"],
  "excerpt": "Problem Python Download this code. This code is full syntax errors. Fix the errors and submit the corrected code with..."
},{
  "title": "Python script full of errors",
  "link": "/programming/python-script-full-of-errors/python-script-full-of-errors",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["value","variable","type","syntax error","error","string","Python","value","variable","type"],
  "excerpt": "Problem Python Download this Python script. This Python script is full of syntax, runtime, and semantic errors. Please identify and..."
},{
  "title": "Python dictionary of class members",
  "link": "/programming/python-dictionary-of-class-members/python-dictionary-of-class-members",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["Python","value","variable","type","dictionary"],
  "excerpt": "Problem Python The following is the name list of all people in a hypothetical class. Christian-Andrew Bagby-wright Matthew Chrysler Niyousha..."
},{
  "title": "Python script call from the Bash command line",
  "link": "/programming/python-call-script-from-bash/python-call-script-from-bash",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["Python","working directory","directory","script","run","mkdir","cd","string","print","escape character","value","variable","type"],
  "excerpt": "Problem Python Write a Python script that is directly executable from the Git Bash command line, without any need to..."
},{
  "title": "Impact of machine precision on numerical computation",
  "link": "/programming/precision-error-paradox/precision-error-paradox",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","Python","roundoff","precision","error","for-loop","loop"],
  "excerpt": "Problem MATLAB Consider the following code named epsError.m, eps = 1.0; while 1.0 ~= 1.0 + eps disp(num2str(eps)); eps =..."
},{
  "title": "Converting polar and Cartesian vector representations using functions and structures",
  "link": "/programming/polar-cartesian-coordinates-conversion/polar-cartesian-coordinates-conversion",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","function","structure","isfield","Cartesian","polar","coordinates","branching","logical"],
  "excerpt": "Problem A vector is a mathematical quantity that has both magnitude and direction. A 2-dimensional vector can be represented as..."
},{
  "title": "Operator precedence",
  "link": "/programming/operator-precedence/operator-precedence",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["value","variable","type","operator","precedence","operator precedence","Python","MATLAB"],
  "excerpt": "Problem Operator Precedence. Think about what the results would be for the following expressions, and then type them into the..."
},{
  "title": "Check if number is even in one line function definition",
  "link": "/programming/one-line-check-even-number/one-line-check-even-number",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["logical","Python","function","modulus","even","modulo"],
  "excerpt": "Problem Write a one-line function is_even() that returns True is the input value to the function is an even number,..."
},{
  "title": "Getting the boundary of objects in images",
  "link": "/programming/object-boundary-detection/object-boundary-detection",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","visualization","subplot","plot","figure","object boundary","imagesc","image","bwboundaries","cell array"],
  "excerpt": "Problem Consider this MATLAB data file data3D.mat which contains a 3-dimensional $41\\times 61\\times 16$ matrix of the brain of a..."
},{
  "title": "Monte Carlo sampling of distribution functions",
  "link": "/programming/monte-carlo-sampling-of-distribution-functions/monte-carlo-sampling-of-distribution-functions",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["Python","numpy","matplotlib","visualization","Monte Carlo","simulation","plot","line","figure","random number","distribution function","probability density function","PDF","probability"],
  "excerpt": "Problem Suppose that you wanted to generate points whose distribution follows the blue curve in the following curve, whose mathematical..."
},{
  "title": "Monte Carlo approximation of the number Pi",
  "link": "/programming/monte-carlo-approximation-of-pi/monte-carlo-approximation-of-pi",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","Python","numpy","matplotlib","visualization","Monte Carlo","simulation","plot","line","figure","random number","probability"],
  "excerpt": "Problem Suppose we did not know the value of $\\pi$ and we wanted to estimate its value using Monte Carlo..."
},{
  "title": "Modifying the index of a for-loop",
  "link": "/programming/modifying-loop-index-value/modifying-loop-index-value",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["Python","for-loop","loop"],
  "excerpt": "Problem Python Consider the following list, numbers = list(range(10)) print(numbers) [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]..."
},{
  "title": "Matrix Initialization",
  "link": "/programming/matrix-initialization/matrix-initialization",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["value","variable","type","matrix","initialization","zeros","eye","diag","numpy","Python","MATLAB"],
  "excerpt": "Problem Provide three different methods of generating the matrix a, one method should use the diag() function, one should use..."
},{
  "title": "MATLAB working directory",
  "link": "/programming/matlab-working-directory/matlab-working-directory",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","working directory","directory","script","figure","plot","mkdir","cd","value","variable","type"],
  "excerpt": "Problem Part 1 MATLAB Use MATLAB help to find out how you can create a new directory named mynewdir from..."
},{
  "title": "Subplots in MATLAB",
  "link": "/programming/matlab-subplots/matlab-subplots",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","visualization","subplot","plot","figure"],
  "excerpt": "Problem MATLAB Consider this MATLAB data file data3D.mat which contains a 3-dimensional $41\\times 61\\times 16$ matrix of the brain of..."
},{
  "title": "MATLAB script full of errors",
  "link": "/programming/matlab-script-full-of-errors/matlab-script-full-of-errors",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["value","variable","type","syntax error","error","string","MATLAB"],
  "excerpt": "Problem MATLAB Download this code. This code is full syntax errors. Fix the errors and submit the corrected code with..."
},{
  "title": "Getting the largest prime number smaller than the input value",
  "link": "/programming/largest-prime-number-smaller-than-input/largest-prime-number-smaller-than-input",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["function","for-loop","branching","logical","prime number","isprime","MATLAB","Python"],
  "excerpt": "Problem MATLAB Suppose you want to find the largest prime number that is smaller than a given input value by..."
},{
  "title": "Checking if an input is a prime number (via recursive function calls)?",
  "link": "/programming/isprime-recursive/isprime-recursive",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["function","nested function","recursive","branching","logical","prime number","isprime","MATLAB","Python"],
  "excerpt": "Problem Write a logical (boolean) function named isPrime(n) that takes in an integer number n, and finds whether it is..."
},{
  "title": "Integer overflow",
  "link": "/programming/integer-overflow/integer-overflow",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["value","variable","type","semantic error","overflow","integer","Python","MATLAB"],
  "excerpt": "Problem Overflow. What would happen if you went beyond the range for a particular type? For example, the largest integer..."
},{
  "title": "Implementing the Bell-shaped (Gaussian) function",
  "link": "/programming/implementing-gaussian-function/implementing-gaussian-function",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["Python","MATLAB","Gaussian","bell-shaped","pi","value","variable","type"],
  "excerpt": "Problem The bell-shaped Gaussian probability density function, is one of the most widely used functions in science and technology. The..."
},{
  "title": "Simple GitHub page from README.md file",
  "link": "/programming/github-readme-webpage/github-readme-webpage",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["VCS","git","GitHub","version control system","project","markdown","git branch","GitHub pages","webpage"],
  "excerpt": "GitHub Problem Part 1 Design a simple GitHub page for your project, using the main directory’s readme.md file. Submit the..."
},{
  "title": "Function generators",
  "link": "/programming/function-generators/function-generators",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","function","generator","nested function","function generator","branching","switch","nargin"],
  "excerpt": "Problem Write a nested function that evaluates a polynomial of the form $y = ax^2+bx+c$. The host function genFunc() should..."
},{
  "title": "Computing the Fibonacci sequence via recursive function calls",
  "link": "/programming/fibonacci-sequence-via-recursive-function-calls/fibonacci-sequence-via-recursive-function-calls",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","Python","Fibonacci sequence","recursive","function","recursive function","branching","isreal","round","str2double","input","string"],
  "excerpt": "Problem In mathematics, the Fibonacci numbers are the numbers in the following integer sequence, called the Fibonacci sequence, that is..."
},{
  "title": "Computing the Fibonacci sequence via for-loop",
  "link": "/programming/fibonacci-sequence-via-for-loop/fibonacci-sequence-via-for-loop",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","Python","Fibonacci sequence","recursive","function","recursive function","branching","isreal","round","str2double","input","string","for-loop","timeit","performance","tab","disp","char"],
  "excerpt": "MATLAB Problem Part MATLAB-A Consider the MATLAB function fib(). Modify this function using MATLAB’s built-in timeit() function such that fib()..."
},{
  "title": "Exception handling in the case of a simple projectile motion",
  "link": "/programming/exception-handling-projectile-motion/exception-handling-projectile-motion",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["Python","projectile motion","exception handling","exception","ValueError","try-except","raise"],
  "excerpt": "Problem Python Consider the simplest program for evaluating the formula $y(t) = v_0t-\\frac{1}{2}gt^2$, v0 = 3; g = 9.81; t..."
},{
  "title": "Exception handling in the case of division by zero",
  "link": "/programming/exception-handling-derivative/exception-handling-derivative",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["Python","derivative","exception handling","exception","ValueError","try-except","raise","assert","unit-testing","function"],
  "excerpt": "Problem Python Consider the function Newton(), def Newton(f, dfdx, x, eps=1E-7, maxit=100): if not callable(f): raise TypeError( 'f is %s,..."
},{
  "title": "Data transfer: Parsing Amino Acid data file",
  "link": "/programming/data-transfer-amino-acid/data-transfer-amino-acid",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["Python","Amino Acid","input","output","IO","command line","argument","exception handling","exception","for-loop","dictionary","map"],
  "excerpt": "Problem Consider this data file. It contains information about the amino-acids in a protein called 1A2T. Each amino-acid in the..."
},{
  "title": "Command line input arguments summation via sum()",
  "link": "/programming/command-line-input-arguments-summation/command-line-input-arguments-summation",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["Python","command line","input","argument","sum","IO"],
  "excerpt": "Problem Python Write a simple program named sum.py, that takes in an arbitrary-size list of input floats from the command-line,..."
},{
  "title": "Command line input arguments summation via eval()",
  "link": "/programming/command-line-input-arguments-eval/command-line-input-arguments-eval",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["Python","command line","input","argument","sum","eval","IO"],
  "excerpt": "Problem Python Write a simple program named sum_via_eval.py that takes in an arbitrary-size list of input numbers from the command-line,..."
},{
  "title": "Calculating the size of a directory",
  "link": "/programming/calculating-directory-size/calculating-directory-size",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["MATLAB","directory","dir","size","fieldnames","sum"],
  "excerpt": "Problem MATLAB The MATLAB function dir returns the contents of a specified directory. It returns the result in the form..."
},{
  "title": "Branching, the Pythonic way",
  "link": "/programming/branching-pythonic-way/branching-pythonic-way",
  "date": "July 4, 2019",
  "category": null,
  "tags": ["Python","branching","print","tuple","input"],
  "excerpt": "Problem Part A Change the first if statement in the following script to an equivalent one-line if-expression. Test the resulting..."
}];
$.urlParam = function(name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null){
     return null;
  }
  else{
     return results[1] || 0;
  }
};

function addParam(url, param, value) {
    var a = document.createElement('a'), regex = /(?:\?|&amp;|&)+([^=]+)(?:=([^&]*))*/g;
   var match, str = []; a.href = url; param = encodeURIComponent(param);
   while (match = regex.exec(a.search))
       if (param != match[1]) str.push(match[1]+(match[2]?"="+match[2]:""));
   str.push(param+(value?"="+ encodeURIComponent(value):""));
   a.search = str.join("&");
   return a.href;
};

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
    } else {
        return Array.from(arr);
    }
};

$.injectResults = function(name) {
    var resultdiv = $('#search-results');
    query = decodeURIComponent(name.replace(/\+/g, " "));
    $('input#search').val(query);
    var result = index.search(query);
    var tagset = new Set();
    resultdiv.empty();
    resultdiv.prepend('<center><h2 style="background:#ad141e;border-radius: 20px;margin-bottom: 56px;color: white;" class="post_title">Found ' + result.length + ' result(s)</h2></center>');
    for (var item in result) {
        var ref = result[item].ref;
        var searchitem = '<li style="padding-top: 1rem;" class="s-post-list"><a style="float:left;font-size:1.1rem" class="title" href="' + store[ref].link + '">' + store[ref].title + '</a><div style="float:right;display:inline-block;">';
        var tags = store[ref].tags;
        for (var tag in tags) {
            if (query.indexOf(tags[tag]) == -1) tagset.add(tags[tag]);
            searchitem += '<a class="tags" style="float:right" href="/tag/' + tags[tag] + '">' + tags[tag] + '</a>';
        };
        searchitem += '</div></li>';
        resultdiv.append(searchitem);
    }
    taglist = [].concat(_toConsumableArray(tagset));
    var tagitem = '';
    for (tag in taglist) {
        tagitem += '<button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(' + '\'' + taglist[tag] + '\'' + ')">' + taglist[tag] + '</button>';
    }
    $("#s-tags-div").html(tagitem);
    href = addParam(document.URL, 'q', query);
    window.history.pushState('Revanth Revoori', "Tag search for" + query + " Revanth's Blog", href);
};

function tagClick(id) {
  text = $('#search').val() + ' ' + id;
  $.injectResults(text.trim());
};

$(document).ready(function() {

  $('.s-tags-toggle').on('click',function() {
      $('#s-tags-div').toggle();
      if ($(".s-tags-toggle").text() == "Hide Tags") {
          $(".s-tags-toggle").text("Show Tags");
      }
      else {
          $(".s-tags-toggle").text("Hide Tags");
      }
  });
  
  if($.urlParam('q')) {
    var query = $.urlParam('q');
    $.injectResults(query);
    };

  $('input#search').on('input', function () {
    var query = $(this).val();
    if (!this.value || this.value.trim() == '') {
      
      
      $('#s-tags-div').html('<button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'Amino Acid\')" >Amino Acid</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'C\')" >C</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'CLT\')" >CLT</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'Cartesian\')" >Cartesian</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'Central Limit Theorem\')" >Central Limit Theorem</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'DLL\')" >DLL</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'DLLEXPORT\')" >DLLEXPORT</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'DLLIMPORT\')" >DLLIMPORT</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'Fibonacci sequence\')" >Fibonacci sequence</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'Fortran\')" >Fortran</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'Gaussian\')" >Gaussian</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'GitHub\')" >GitHub</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'GitHub pages\')" >GitHub pages</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'HTTPError\')" >HTTPError</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'IO\')" >IO</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'Intel\')" >Intel</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'MATLAB\')" >MATLAB</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'Monte Carlo\')" >Monte Carlo</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'PDF\')" >PDF</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'Python\')" >Python</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'VCS\')" >VCS</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'ValueError\')" >ValueError</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'Windows\')" >Windows</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'alias\')" >alias</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'area\')" >area</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'argument\')" >argument</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'assert\')" >assert</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'bell-shaped\')" >bell-shaped</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'bind\')" >bind</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'branching\')" >branching</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'bwboundaries\')" >bwboundaries</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'cd\')" >cd</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'cell array\')" >cell array</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'char\')" >char</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'class\')" >class</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'clustering\')" >clustering</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'command line\')" >command line</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'compiler\')" >compiler</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'concatenation\')" >concatenation</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'coordinates\')" >coordinates</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'copy\')" >copy</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'ctypes\')" >ctypes</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'data transfer\')" >data transfer</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'derivative\')" >derivative</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'diag\')" >diag</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'dictionary\')" >dictionary</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'dir\')" >dir</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'directory\')" >directory</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'disp\')" >disp</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'distribution function\')" >distribution function</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'dynamic-link library\')" >dynamic-link library</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'egg\')" >egg</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'error\')" >error</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'escape character\')" >escape character</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'eval\')" >eval</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'even\')" >even</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'exception\')" >exception</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'exception handling\')" >exception handling</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'eye\')" >eye</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'fieldnames\')" >fieldnames</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'figure\')" >figure</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'for-loop\')" >for-loop</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'function\')" >function</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'function generator\')" >function generator</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'function handle\')" >function handle</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'generator\')" >generator</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'git\')" >git</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'git branch\')" >git branch</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'heat capacity\')" >heat capacity</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'histogram\')" >histogram</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'id\')" >id</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'image\')" >image</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'imagesc\')" >imagesc</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'initialization\')" >initialization</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'input\')" >input</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'int32\')" >int32</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'integer\')" >integer</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'interoperation\')" >interoperation</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'is\')" >is</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'isfield\')" >isfield</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'iso_c_binding\')" >iso_c_binding</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'iso_fortran_env\')" >iso_fortran_env</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'isprime\')" >isprime</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'isreal\')" >isreal</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'kmeans\')" >kmeans</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'kmeans++\')" >kmeans++</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'least squares method\')" >least squares method</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'library\')" >library</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'line\')" >line</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'list\')" >list</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'logical\')" >logical</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'loop\')" >loop</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'map\')" >map</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'markdown\')" >markdown</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'matplotlib\')" >matplotlib</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'matrix\')" >matrix</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'maximum\')" >maximum</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'mkdir\')" >mkdir</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'modulo\')" >modulo</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'modulus\')" >modulus</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'multiple assignment\')" >multiple assignment</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'name mangling\')" >name mangling</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'nargin\')" >nargin</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'nested function\')" >nested function</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'nested list\')" >nested list</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'normal\')" >normal</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'num2str\')" >num2str</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'numpy\')" >numpy</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'object boundary\')" >object boundary</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'objective function\')" >objective function</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'operator\')" >operator</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'operator precedence\')" >operator precedence</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'output\')" >output</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'overflow\')" >overflow</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'pandas\')" >pandas</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'performance\')" >performance</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'physics\')" >physics</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'pi\')" >pi</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'plot\')" >plot</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'polar\')" >polar</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'precedence\')" >precedence</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'precision\')" >precision</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'prime number\')" >prime number</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'print\')" >print</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'probability\')" >probability</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'probability density function\')" >probability density function</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'project\')" >project</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'projectile motion\')" >projectile motion</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'raise\')" >raise</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'random\')" >random</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'random number\')" >random number</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'random walk\')" >random walk</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'read_csv\')" >read_csv</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'real64\')" >real64</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'recursive\')" >recursive</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'recursive function\')" >recursive function</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'regression\')" >regression</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'round\')" >round</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'roundoff\')" >roundoff</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'run\')" >run</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'scatter plot\')" >scatter plot</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'scikit-learn\')" >scikit-learn</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'script\')" >script</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'semantic error\')" >semantic error</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'simulation\')" >simulation</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'size\')" >size</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'sqrt\')" >sqrt</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'str2double\')" >str2double</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'string\')" >string</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'structure\')" >structure</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'subplot\')" >subplot</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'sum\')" >sum</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'switch\')" >switch</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'syntax\')" >syntax</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'syntax error\')" >syntax error</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'tab\')" >tab</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'temperature\')" >temperature</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'timeit\')" >timeit</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'timing\')" >timing</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'triangle\')" >triangle</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'try-catch\')" >try-catch</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'try-except\')" >try-except</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'tuple\')" >tuple</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'type\')" >type</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'unit-testing\')" >unit-testing</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'urllib\')" >urllib</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'value\')" >value</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'variable\')" >variable</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'vectorization\')" >vectorization</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'version control system\')" >version control system</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'visualization\')" >visualization</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'web\')" >web</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'webpage\')" >webpage</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'while-loop\')" >while-loop</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'who\')" >who</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'whos\')" >whos</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'working directory\')" >working directory</button><button style="margin:2px;" id="s-tag-button" class="search-tags" onclick="tagClick(\'zeros\')" >zeros</button>');
      $('#search-results').html('<h2 style="background:#ad141e;border-radius: 20px;margin-bottom: 56px;color: white;" class="post_title">Found 55 result(s)</h2> <li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/monte-carlo-sampling-of-bimodal-gaussian/monte-carlo-sampling-of-bimodal-gaussian">Monte Carlo sampling of the sum of two Gaussian distributions</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/numpy">numpy</a> <a class="tags" style="float:right" href="/tag/matplotlib">matplotlib</a> <a class="tags" style="float:right" href="/tag/visualization">visualization</a> <a class="tags" style="float:right" href="/tag/Monte Carlo">Monte Carlo</a> <a class="tags" style="float:right" href="/tag/simulation">simulation</a> <a class="tags" style="float:right" href="/tag/plot">plot</a> <a class="tags" style="float:right" href="/tag/line">line</a> <a class="tags" style="float:right" href="/tag/figure">figure</a> <a class="tags" style="float:right" href="/tag/random number">random number</a> <a class="tags" style="float:right" href="/tag/distribution function">distribution function</a> <a class="tags" style="float:right" href="/tag/probability density function">probability density function</a> <a class="tags" style="float:right" href="/tag/PDF">PDF</a> <a class="tags" style="float:right" href="/tag/probability">probability</a> <a class="tags" style="float:right" href="/tag/Gaussian">Gaussian</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/clustering-kmeans/clustering-kmeans">Kmeans clustering</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/numpy">numpy</a> <a class="tags" style="float:right" href="/tag/matplotlib">matplotlib</a> <a class="tags" style="float:right" href="/tag/visualization">visualization</a> <a class="tags" style="float:right" href="/tag/scikit-learn">scikit-learn</a> <a class="tags" style="float:right" href="/tag/clustering">clustering</a> <a class="tags" style="float:right" href="/tag/plot">plot</a> <a class="tags" style="float:right" href="/tag/scatter plot">scatter plot</a> <a class="tags" style="float:right" href="/tag/kmeans">kmeans</a> <a class="tags" style="float:right" href="/tag/kmeans++">kmeans++</a> <a class="tags" style="float:right" href="/tag/figure">figure</a> <a class="tags" style="float:right" href="/tag/random number">random number</a> <a class="tags" style="float:right" href="/tag/pandas">pandas</a> <a class="tags" style="float:right" href="/tag/read_csv">read_csv</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/regression-predicting-future-global-land-temperature/regression-predicting-future-global-land-temperature">Regression: Predicting the global land temperature of the Earth in 2050 from the past data</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/regression">regression</a> <a class="tags" style="float:right" href="/tag/visualization">visualization</a> <a class="tags" style="float:right" href="/tag/plot">plot</a> <a class="tags" style="float:right" href="/tag/line">line</a> <a class="tags" style="float:right" href="/tag/figure">figure</a> <a class="tags" style="float:right" href="/tag/random number">random number</a> <a class="tags" style="float:right" href="/tag/distribution function">distribution function</a> <a class="tags" style="float:right" href="/tag/probability density function">probability density function</a> <a class="tags" style="float:right" href="/tag/PDF">PDF</a> <a class="tags" style="float:right" href="/tag/probability">probability</a> <a class="tags" style="float:right" href="/tag/objective function">objective function</a> <a class="tags" style="float:right" href="/tag/least squares method">least squares method</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/random-walk-central-limit-theorem/random-walk-central-limit-theorem">Understanding the Central Limit Theorem via random walk</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/probability">probability</a> <a class="tags" style="float:right" href="/tag/Central Limit Theorem">Central Limit Theorem</a> <a class="tags" style="float:right" href="/tag/CLT">CLT</a> <a class="tags" style="float:right" href="/tag/histogram">histogram</a> <a class="tags" style="float:right" href="/tag/random walk">random walk</a> <a class="tags" style="float:right" href="/tag/random">random</a> <a class="tags" style="float:right" href="/tag/Gaussian">Gaussian</a> <a class="tags" style="float:right" href="/tag/normal">normal</a> <a class="tags" style="float:right" href="/tag/Monte Carlo">Monte Carlo</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/finding-maximum-value-via-recursive-function/finding-maximum-value-via-recursive-function">Finding the maximum value of an array via recursive function calls</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/maximum">maximum</a> <a class="tags" style="float:right" href="/tag/recursive">recursive</a> <a class="tags" style="float:right" href="/tag/function">function</a> <a class="tags" style="float:right" href="/tag/recursive function">recursive function</a> <a class="tags" style="float:right" href="/tag/branching">branching</a> <a class="tags" style="float:right" href="/tag/list">list</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/finding-maximum-location-via-recursive-function/finding-maximum-location-via-recursive-function">Finding the position of the maximum value of an array via recursive function calls</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/maximum">maximum</a> <a class="tags" style="float:right" href="/tag/recursive">recursive</a> <a class="tags" style="float:right" href="/tag/function">function</a> <a class="tags" style="float:right" href="/tag/recursive function">recursive function</a> <a class="tags" style="float:right" href="/tag/branching">branching</a> <a class="tags" style="float:right" href="/tag/list">list</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/fortran-dll-getsquare/fortran-dll-getsquare">Making and using a Dynamic-Link Library (DLL) from a Fortran procedure using Intel Fortran Compiler on Windows OS: getSquare()</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Fortran">Fortran</a> <a class="tags" style="float:right" href="/tag/DLL">DLL</a> <a class="tags" style="float:right" href="/tag/library">library</a> <a class="tags" style="float:right" href="/tag/dynamic-link library">dynamic-link library</a> <a class="tags" style="float:right" href="/tag/interoperation">interoperation</a> <a class="tags" style="float:right" href="/tag/compiler">compiler</a> <a class="tags" style="float:right" href="/tag/Intel">Intel</a> <a class="tags" style="float:right" href="/tag/Windows">Windows</a> <a class="tags" style="float:right" href="/tag/alias">alias</a> <a class="tags" style="float:right" href="/tag/name mangling">name mangling</a> <a class="tags" style="float:right" href="/tag/DLLIMPORT">DLLIMPORT</a> <a class="tags" style="float:right" href="/tag/DLLEXPORT">DLLEXPORT</a> <a class="tags" style="float:right" href="/tag/bind">bind</a> <a class="tags" style="float:right" href="/tag/C">C</a> <a class="tags" style="float:right" href="/tag/function">function</a> <a class="tags" style="float:right" href="/tag/iso_fortran_env">iso_fortran_env</a> <a class="tags" style="float:right" href="/tag/real64">real64</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/fortran-dll-getpower/fortran-dll-getpower">Calling Fortran function from other languages via a Dynamic-Link Library (DLL): getPower()</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Fortran">Fortran</a> <a class="tags" style="float:right" href="/tag/C">C</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/DLL">DLL</a> <a class="tags" style="float:right" href="/tag/library">library</a> <a class="tags" style="float:right" href="/tag/dynamic-link library">dynamic-link library</a> <a class="tags" style="float:right" href="/tag/interoperation">interoperation</a> <a class="tags" style="float:right" href="/tag/compiler">compiler</a> <a class="tags" style="float:right" href="/tag/Intel">Intel</a> <a class="tags" style="float:right" href="/tag/Windows">Windows</a> <a class="tags" style="float:right" href="/tag/alias">alias</a> <a class="tags" style="float:right" href="/tag/name mangling">name mangling</a> <a class="tags" style="float:right" href="/tag/DLLIMPORT">DLLIMPORT</a> <a class="tags" style="float:right" href="/tag/DLLEXPORT">DLLEXPORT</a> <a class="tags" style="float:right" href="/tag/bind">bind</a> <a class="tags" style="float:right" href="/tag/function">function</a> <a class="tags" style="float:right" href="/tag/iso_fortran_env">iso_fortran_env</a> <a class="tags" style="float:right" href="/tag/real64">real64</a> <a class="tags" style="float:right" href="/tag/int32">int32</a> <a class="tags" style="float:right" href="/tag/ctypes">ctypes</a> <a class="tags" style="float:right" href="/tag/iso_c_binding">iso_c_binding</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/fortran-c-interoperation-string/fortran-c-interoperation-string">Passing characters and strings from C to Fortran and from Fortran to C</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/interoperation">interoperation</a> <a class="tags" style="float:right" href="/tag/compiler">compiler</a> <a class="tags" style="float:right" href="/tag/Intel">Intel</a> <a class="tags" style="float:right" href="/tag/Windows">Windows</a> <a class="tags" style="float:right" href="/tag/alias">alias</a> <a class="tags" style="float:right" href="/tag/name mangling">name mangling</a> <a class="tags" style="float:right" href="/tag/bind">bind</a> <a class="tags" style="float:right" href="/tag/Fortran">Fortran</a> <a class="tags" style="float:right" href="/tag/C">C</a> <a class="tags" style="float:right" href="/tag/function">function</a> <a class="tags" style="float:right" href="/tag/iso_fortran_env">iso_fortran_env</a> <a class="tags" style="float:right" href="/tag/iso_c_binding">iso_c_binding</a> <a class="tags" style="float:right" href="/tag/char">char</a> <a class="tags" style="float:right" href="/tag/string">string</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/fortran-c-interoperation-passing-allocatable-to-c/fortran-c-interoperation-passing-allocatable-to-c">Passing allocatable string from Fortran to C</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/interoperation">interoperation</a> <a class="tags" style="float:right" href="/tag/compiler">compiler</a> <a class="tags" style="float:right" href="/tag/Intel">Intel</a> <a class="tags" style="float:right" href="/tag/Windows">Windows</a> <a class="tags" style="float:right" href="/tag/alias">alias</a> <a class="tags" style="float:right" href="/tag/name mangling">name mangling</a> <a class="tags" style="float:right" href="/tag/bind">bind</a> <a class="tags" style="float:right" href="/tag/Fortran">Fortran</a> <a class="tags" style="float:right" href="/tag/C">C</a> <a class="tags" style="float:right" href="/tag/function">function</a> <a class="tags" style="float:right" href="/tag/iso_fortran_env">iso_fortran_env</a> <a class="tags" style="float:right" href="/tag/iso_c_binding">iso_c_binding</a> <a class="tags" style="float:right" href="/tag/char">char</a> <a class="tags" style="float:right" href="/tag/string">string</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/csv-input-to-formatted-output/csv-input-to-formatted-output">Data transfer: Converting Comma-Separated-Values (CSV) input to formatted output</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/input">input</a> <a class="tags" style="float:right" href="/tag/output">output</a> <a class="tags" style="float:right" href="/tag/IO">IO</a> <a class="tags" style="float:right" href="/tag/command line">command line</a> <a class="tags" style="float:right" href="/tag/argument">argument</a> <a class="tags" style="float:right" href="/tag/function">function</a> <a class="tags" style="float:right" href="/tag/exception">exception</a> <a class="tags" style="float:right" href="/tag/for-loop">for-loop</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/while-loop-to-for-loop/while-loop-to-for-loop">The while-loop implementation of for-loop</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/while-loop">while-loop</a> <a class="tags" style="float:right" href="/tag/for-loop">for-loop</a> <a class="tags" style="float:right" href="/tag/loop">loop</a> <a class="tags" style="float:right" href="/tag/vectorization">vectorization</a> <a class="tags" style="float:right" href="/tag/performance">performance</a> <a class="tags" style="float:right" href="/tag/timing">timing</a> <a class="tags" style="float:right" href="/tag/temperature">temperature</a> <a class="tags" style="float:right" href="/tag/num2str">num2str</a> <a class="tags" style="float:right" href="/tag/timeit">timeit</a> <a class="tags" style="float:right" href="/tag/function handle">function handle</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/version-control-using-git-github/version-control-using-git-github">Version-control using Git and GitHub</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/VCS">VCS</a> <a class="tags" style="float:right" href="/tag/git">git</a> <a class="tags" style="float:right" href="/tag/GitHub">GitHub</a> <a class="tags" style="float:right" href="/tag/version control system">version control system</a> <a class="tags" style="float:right" href="/tag/project">project</a> <a class="tags" style="float:right" href="/tag/markdown">markdown</a> <a class="tags" style="float:right" href="/tag/git branch">git branch</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/values-variables-types-syntax-error/values-variables-types-syntax-error">value, variable, type, syntax error</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/value">value</a> <a class="tags" style="float:right" href="/tag/variable">variable</a> <a class="tags" style="float:right" href="/tag/type">type</a> <a class="tags" style="float:right" href="/tag/class">class</a> <a class="tags" style="float:right" href="/tag/logical">logical</a> <a class="tags" style="float:right" href="/tag/whos">whos</a> <a class="tags" style="float:right" href="/tag/who">who</a> <a class="tags" style="float:right" href="/tag/cell array">cell array</a> <a class="tags" style="float:right" href="/tag/list">list</a> <a class="tags" style="float:right" href="/tag/syntax error">syntax error</a> <a class="tags" style="float:right" href="/tag/error">error</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/triangle-area/triangle-area">Computing the area of a triangle</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/unit-testing">unit-testing</a> <a class="tags" style="float:right" href="/tag/triangle">triangle</a> <a class="tags" style="float:right" href="/tag/area">area</a> <a class="tags" style="float:right" href="/tag/function">function</a> <a class="tags" style="float:right" href="/tag/list">list</a> <a class="tags" style="float:right" href="/tag/nested list">nested list</a> <a class="tags" style="float:right" href="/tag/cell array">cell array</a> <a class="tags" style="float:right" href="/tag/matrix">matrix</a> <a class="tags" style="float:right" href="/tag/tuple">tuple</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/time-to-cook-frozen-egg/time-to-cook-frozen-egg">Time required for cooking a refrigerated egg</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/value">value</a> <a class="tags" style="float:right" href="/tag/variable">variable</a> <a class="tags" style="float:right" href="/tag/type">type</a> <a class="tags" style="float:right" href="/tag/script">script</a> <a class="tags" style="float:right" href="/tag/physics">physics</a> <a class="tags" style="float:right" href="/tag/heat capacity">heat capacity</a> <a class="tags" style="float:right" href="/tag/egg">egg</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/string-concatenation-using-for-loop/string-concatenation-using-for-loop">String concatenation using for-loop</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/string">string</a> <a class="tags" style="float:right" href="/tag/concatenation">concatenation</a> <a class="tags" style="float:right" href="/tag/for-loop">for-loop</a> <a class="tags" style="float:right" href="/tag/loop">loop</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/cell array">cell array</a> <a class="tags" style="float:right" href="/tag/list">list</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/string-concatenation-using-for-loop-i/string-concatenation-using-for-loop-I">String concatenation using for-loop I</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/string">string</a> <a class="tags" style="float:right" href="/tag/concatenation">concatenation</a> <a class="tags" style="float:right" href="/tag/for-loop">for-loop</a> <a class="tags" style="float:right" href="/tag/loop">loop</a> <a class="tags" style="float:right" href="/tag/cell array">cell array</a> <a class="tags" style="float:right" href="/tag/list">list</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/simulating-monty-hall-game/simulating-monty-hall-game">Simulating the Monty Hall game</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/visualization">visualization</a> <a class="tags" style="float:right" href="/tag/matplotlib">matplotlib</a> <a class="tags" style="float:right" href="/tag/Monte Carlo">Monte Carlo</a> <a class="tags" style="float:right" href="/tag/simulation">simulation</a> <a class="tags" style="float:right" href="/tag/plot">plot</a> <a class="tags" style="float:right" href="/tag/figure">figure</a> <a class="tags" style="float:right" href="/tag/line">line</a> <a class="tags" style="float:right" href="/tag/random number">random number</a> <a class="tags" style="float:right" href="/tag/probability">probability</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/roundoff-error-paradox/roundoff-error-paradox">Impact of round-off errors on numerical computations</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/roundoff">roundoff</a> <a class="tags" style="float:right" href="/tag/error">error</a> <a class="tags" style="float:right" href="/tag/sqrt">sqrt</a> <a class="tags" style="float:right" href="/tag/for-loop">for-loop</a> <a class="tags" style="float:right" href="/tag/loop">loop</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/regression-standard-normal-distribution/regression-standard-normal-distribution">Regression: obtaining the most likely mean and standard deviation of a set of Standard Normally Distributed Random Variables</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/regression">regression</a> <a class="tags" style="float:right" href="/tag/visualization">visualization</a> <a class="tags" style="float:right" href="/tag/Monte Carlo">Monte Carlo</a> <a class="tags" style="float:right" href="/tag/simulation">simulation</a> <a class="tags" style="float:right" href="/tag/plot">plot</a> <a class="tags" style="float:right" href="/tag/line">line</a> <a class="tags" style="float:right" href="/tag/figure">figure</a> <a class="tags" style="float:right" href="/tag/random number">random number</a> <a class="tags" style="float:right" href="/tag/distribution function">distribution function</a> <a class="tags" style="float:right" href="/tag/probability density function">probability density function</a> <a class="tags" style="float:right" href="/tag/PDF">PDF</a> <a class="tags" style="float:right" href="/tag/probability">probability</a> <a class="tags" style="float:right" href="/tag/objective function">objective function</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/reading-data-from-web/reading-data-from-web">Reading data from the World Wide Web</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/visualization">visualization</a> <a class="tags" style="float:right" href="/tag/web">web</a> <a class="tags" style="float:right" href="/tag/data transfer">data transfer</a> <a class="tags" style="float:right" href="/tag/IO">IO</a> <a class="tags" style="float:right" href="/tag/input">input</a> <a class="tags" style="float:right" href="/tag/output">output</a> <a class="tags" style="float:right" href="/tag/string">string</a> <a class="tags" style="float:right" href="/tag/exception">exception</a> <a class="tags" style="float:right" href="/tag/exception handling">exception handling</a> <a class="tags" style="float:right" href="/tag/raise">raise</a> <a class="tags" style="float:right" href="/tag/try-catch">try-catch</a> <a class="tags" style="float:right" href="/tag/try-except">try-except</a> <a class="tags" style="float:right" href="/tag/scatter plot">scatter plot</a> <a class="tags" style="float:right" href="/tag/urllib">urllib</a> <a class="tags" style="float:right" href="/tag/HTTPError">HTTPError</a> <a class="tags" style="float:right" href="/tag/matplotlib">matplotlib</a> <a class="tags" style="float:right" href="/tag/plot">plot</a> <a class="tags" style="float:right" href="/tag/figure">figure</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/python-variable-aliasing-copying/python-variable-aliasing-copying">Python aliasing vs. copying variables</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/value">value</a> <a class="tags" style="float:right" href="/tag/variable">variable</a> <a class="tags" style="float:right" href="/tag/type">type</a> <a class="tags" style="float:right" href="/tag/alias">alias</a> <a class="tags" style="float:right" href="/tag/copy">copy</a> <a class="tags" style="float:right" href="/tag/tuple">tuple</a> <a class="tags" style="float:right" href="/tag/list">list</a> <a class="tags" style="float:right" href="/tag/id">id</a> <a class="tags" style="float:right" href="/tag/is">is</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/python-single-line-input-string-manipulation/python-single-line-input-string-manipulation">Single-line Python input and string manipulation</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/branching">branching</a> <a class="tags" style="float:right" href="/tag/print">print</a> <a class="tags" style="float:right" href="/tag/tuple">tuple</a> <a class="tags" style="float:right" href="/tag/input">input</a> <a class="tags" style="float:right" href="/tag/string">string</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/python-script-full-of-syntax-errors/python-script-full-of-syntax-errors">Python script full of syntax errors</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/value">value</a> <a class="tags" style="float:right" href="/tag/variable">variable</a> <a class="tags" style="float:right" href="/tag/type">type</a> <a class="tags" style="float:right" href="/tag/syntax">syntax</a> <a class="tags" style="float:right" href="/tag/error">error</a> <a class="tags" style="float:right" href="/tag/syntax error">syntax error</a> <a class="tags" style="float:right" href="/tag/multiple assignment">multiple assignment</a> <a class="tags" style="float:right" href="/tag/logical">logical</a> <a class="tags" style="float:right" href="/tag/alias">alias</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/python-script-full-of-errors/python-script-full-of-errors">Python script full of errors</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/value">value</a> <a class="tags" style="float:right" href="/tag/variable">variable</a> <a class="tags" style="float:right" href="/tag/type">type</a> <a class="tags" style="float:right" href="/tag/syntax error">syntax error</a> <a class="tags" style="float:right" href="/tag/error">error</a> <a class="tags" style="float:right" href="/tag/string">string</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/value">value</a> <a class="tags" style="float:right" href="/tag/variable">variable</a> <a class="tags" style="float:right" href="/tag/type">type</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/python-dictionary-of-class-members/python-dictionary-of-class-members">Python dictionary of class members</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/value">value</a> <a class="tags" style="float:right" href="/tag/variable">variable</a> <a class="tags" style="float:right" href="/tag/type">type</a> <a class="tags" style="float:right" href="/tag/dictionary">dictionary</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/python-call-script-from-bash/python-call-script-from-bash">Python script call from the Bash command line</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/working directory">working directory</a> <a class="tags" style="float:right" href="/tag/directory">directory</a> <a class="tags" style="float:right" href="/tag/script">script</a> <a class="tags" style="float:right" href="/tag/run">run</a> <a class="tags" style="float:right" href="/tag/mkdir">mkdir</a> <a class="tags" style="float:right" href="/tag/cd">cd</a> <a class="tags" style="float:right" href="/tag/string">string</a> <a class="tags" style="float:right" href="/tag/print">print</a> <a class="tags" style="float:right" href="/tag/escape character">escape character</a> <a class="tags" style="float:right" href="/tag/value">value</a> <a class="tags" style="float:right" href="/tag/variable">variable</a> <a class="tags" style="float:right" href="/tag/type">type</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/precision-error-paradox/precision-error-paradox">Impact of machine precision on numerical computation</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/roundoff">roundoff</a> <a class="tags" style="float:right" href="/tag/precision">precision</a> <a class="tags" style="float:right" href="/tag/error">error</a> <a class="tags" style="float:right" href="/tag/for-loop">for-loop</a> <a class="tags" style="float:right" href="/tag/loop">loop</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/polar-cartesian-coordinates-conversion/polar-cartesian-coordinates-conversion">Converting polar and Cartesian vector representations using functions and structures</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/function">function</a> <a class="tags" style="float:right" href="/tag/structure">structure</a> <a class="tags" style="float:right" href="/tag/isfield">isfield</a> <a class="tags" style="float:right" href="/tag/Cartesian">Cartesian</a> <a class="tags" style="float:right" href="/tag/polar">polar</a> <a class="tags" style="float:right" href="/tag/coordinates">coordinates</a> <a class="tags" style="float:right" href="/tag/branching">branching</a> <a class="tags" style="float:right" href="/tag/logical">logical</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/operator-precedence/operator-precedence">Operator precedence</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/value">value</a> <a class="tags" style="float:right" href="/tag/variable">variable</a> <a class="tags" style="float:right" href="/tag/type">type</a> <a class="tags" style="float:right" href="/tag/operator">operator</a> <a class="tags" style="float:right" href="/tag/precedence">precedence</a> <a class="tags" style="float:right" href="/tag/operator precedence">operator precedence</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/one-line-check-even-number/one-line-check-even-number">Check if number is even in one line function definition</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/logical">logical</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/function">function</a> <a class="tags" style="float:right" href="/tag/modulus">modulus</a> <a class="tags" style="float:right" href="/tag/even">even</a> <a class="tags" style="float:right" href="/tag/modulo">modulo</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/object-boundary-detection/object-boundary-detection">Getting the boundary of objects in images</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/visualization">visualization</a> <a class="tags" style="float:right" href="/tag/subplot">subplot</a> <a class="tags" style="float:right" href="/tag/plot">plot</a> <a class="tags" style="float:right" href="/tag/figure">figure</a> <a class="tags" style="float:right" href="/tag/object boundary">object boundary</a> <a class="tags" style="float:right" href="/tag/imagesc">imagesc</a> <a class="tags" style="float:right" href="/tag/image">image</a> <a class="tags" style="float:right" href="/tag/bwboundaries">bwboundaries</a> <a class="tags" style="float:right" href="/tag/cell array">cell array</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/monte-carlo-sampling-of-distribution-functions/monte-carlo-sampling-of-distribution-functions">Monte Carlo sampling of distribution functions</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/numpy">numpy</a> <a class="tags" style="float:right" href="/tag/matplotlib">matplotlib</a> <a class="tags" style="float:right" href="/tag/visualization">visualization</a> <a class="tags" style="float:right" href="/tag/Monte Carlo">Monte Carlo</a> <a class="tags" style="float:right" href="/tag/simulation">simulation</a> <a class="tags" style="float:right" href="/tag/plot">plot</a> <a class="tags" style="float:right" href="/tag/line">line</a> <a class="tags" style="float:right" href="/tag/figure">figure</a> <a class="tags" style="float:right" href="/tag/random number">random number</a> <a class="tags" style="float:right" href="/tag/distribution function">distribution function</a> <a class="tags" style="float:right" href="/tag/probability density function">probability density function</a> <a class="tags" style="float:right" href="/tag/PDF">PDF</a> <a class="tags" style="float:right" href="/tag/probability">probability</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/monte-carlo-approximation-of-pi/monte-carlo-approximation-of-pi">Monte Carlo approximation of the number Pi</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/numpy">numpy</a> <a class="tags" style="float:right" href="/tag/matplotlib">matplotlib</a> <a class="tags" style="float:right" href="/tag/visualization">visualization</a> <a class="tags" style="float:right" href="/tag/Monte Carlo">Monte Carlo</a> <a class="tags" style="float:right" href="/tag/simulation">simulation</a> <a class="tags" style="float:right" href="/tag/plot">plot</a> <a class="tags" style="float:right" href="/tag/line">line</a> <a class="tags" style="float:right" href="/tag/figure">figure</a> <a class="tags" style="float:right" href="/tag/random number">random number</a> <a class="tags" style="float:right" href="/tag/probability">probability</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/modifying-loop-index-value/modifying-loop-index-value">Modifying the index of a for-loop</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/for-loop">for-loop</a> <a class="tags" style="float:right" href="/tag/loop">loop</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/matrix-initialization/matrix-initialization">Matrix Initialization</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/value">value</a> <a class="tags" style="float:right" href="/tag/variable">variable</a> <a class="tags" style="float:right" href="/tag/type">type</a> <a class="tags" style="float:right" href="/tag/matrix">matrix</a> <a class="tags" style="float:right" href="/tag/initialization">initialization</a> <a class="tags" style="float:right" href="/tag/zeros">zeros</a> <a class="tags" style="float:right" href="/tag/eye">eye</a> <a class="tags" style="float:right" href="/tag/diag">diag</a> <a class="tags" style="float:right" href="/tag/numpy">numpy</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/matlab-working-directory/matlab-working-directory">MATLAB working directory</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/working directory">working directory</a> <a class="tags" style="float:right" href="/tag/directory">directory</a> <a class="tags" style="float:right" href="/tag/script">script</a> <a class="tags" style="float:right" href="/tag/figure">figure</a> <a class="tags" style="float:right" href="/tag/plot">plot</a> <a class="tags" style="float:right" href="/tag/mkdir">mkdir</a> <a class="tags" style="float:right" href="/tag/cd">cd</a> <a class="tags" style="float:right" href="/tag/value">value</a> <a class="tags" style="float:right" href="/tag/variable">variable</a> <a class="tags" style="float:right" href="/tag/type">type</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/matlab-subplots/matlab-subplots">Subplots in MATLAB</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/visualization">visualization</a> <a class="tags" style="float:right" href="/tag/subplot">subplot</a> <a class="tags" style="float:right" href="/tag/plot">plot</a> <a class="tags" style="float:right" href="/tag/figure">figure</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/matlab-script-full-of-errors/matlab-script-full-of-errors">MATLAB script full of errors</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/value">value</a> <a class="tags" style="float:right" href="/tag/variable">variable</a> <a class="tags" style="float:right" href="/tag/type">type</a> <a class="tags" style="float:right" href="/tag/syntax error">syntax error</a> <a class="tags" style="float:right" href="/tag/error">error</a> <a class="tags" style="float:right" href="/tag/string">string</a> <a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/largest-prime-number-smaller-than-input/largest-prime-number-smaller-than-input">Getting the largest prime number smaller than the input value</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/function">function</a> <a class="tags" style="float:right" href="/tag/for-loop">for-loop</a> <a class="tags" style="float:right" href="/tag/branching">branching</a> <a class="tags" style="float:right" href="/tag/logical">logical</a> <a class="tags" style="float:right" href="/tag/prime number">prime number</a> <a class="tags" style="float:right" href="/tag/isprime">isprime</a> <a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/isprime-recursive/isprime-recursive">Checking if an input is a prime number (via recursive function calls)?</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/function">function</a> <a class="tags" style="float:right" href="/tag/nested function">nested function</a> <a class="tags" style="float:right" href="/tag/recursive">recursive</a> <a class="tags" style="float:right" href="/tag/branching">branching</a> <a class="tags" style="float:right" href="/tag/logical">logical</a> <a class="tags" style="float:right" href="/tag/prime number">prime number</a> <a class="tags" style="float:right" href="/tag/isprime">isprime</a> <a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/integer-overflow/integer-overflow">Integer overflow</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/value">value</a> <a class="tags" style="float:right" href="/tag/variable">variable</a> <a class="tags" style="float:right" href="/tag/type">type</a> <a class="tags" style="float:right" href="/tag/semantic error">semantic error</a> <a class="tags" style="float:right" href="/tag/overflow">overflow</a> <a class="tags" style="float:right" href="/tag/integer">integer</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/implementing-gaussian-function/implementing-gaussian-function">Implementing the Bell-shaped (Gaussian) function</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/Gaussian">Gaussian</a> <a class="tags" style="float:right" href="/tag/bell-shaped">bell-shaped</a> <a class="tags" style="float:right" href="/tag/pi">pi</a> <a class="tags" style="float:right" href="/tag/value">value</a> <a class="tags" style="float:right" href="/tag/variable">variable</a> <a class="tags" style="float:right" href="/tag/type">type</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/github-readme-webpage/github-readme-webpage">Simple GitHub page from README.md file</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/VCS">VCS</a> <a class="tags" style="float:right" href="/tag/git">git</a> <a class="tags" style="float:right" href="/tag/GitHub">GitHub</a> <a class="tags" style="float:right" href="/tag/version control system">version control system</a> <a class="tags" style="float:right" href="/tag/project">project</a> <a class="tags" style="float:right" href="/tag/markdown">markdown</a> <a class="tags" style="float:right" href="/tag/git branch">git branch</a> <a class="tags" style="float:right" href="/tag/GitHub pages">GitHub pages</a> <a class="tags" style="float:right" href="/tag/webpage">webpage</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/function-generators/function-generators">Function generators</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/function">function</a> <a class="tags" style="float:right" href="/tag/generator">generator</a> <a class="tags" style="float:right" href="/tag/nested function">nested function</a> <a class="tags" style="float:right" href="/tag/function generator">function generator</a> <a class="tags" style="float:right" href="/tag/branching">branching</a> <a class="tags" style="float:right" href="/tag/switch">switch</a> <a class="tags" style="float:right" href="/tag/nargin">nargin</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/fibonacci-sequence-via-recursive-function-calls/fibonacci-sequence-via-recursive-function-calls">Computing the Fibonacci sequence via recursive function calls</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/Fibonacci sequence">Fibonacci sequence</a> <a class="tags" style="float:right" href="/tag/recursive">recursive</a> <a class="tags" style="float:right" href="/tag/function">function</a> <a class="tags" style="float:right" href="/tag/recursive function">recursive function</a> <a class="tags" style="float:right" href="/tag/branching">branching</a> <a class="tags" style="float:right" href="/tag/isreal">isreal</a> <a class="tags" style="float:right" href="/tag/round">round</a> <a class="tags" style="float:right" href="/tag/str2double">str2double</a> <a class="tags" style="float:right" href="/tag/input">input</a> <a class="tags" style="float:right" href="/tag/string">string</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/fibonacci-sequence-via-for-loop/fibonacci-sequence-via-for-loop">Computing the Fibonacci sequence via for-loop</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/Fibonacci sequence">Fibonacci sequence</a> <a class="tags" style="float:right" href="/tag/recursive">recursive</a> <a class="tags" style="float:right" href="/tag/function">function</a> <a class="tags" style="float:right" href="/tag/recursive function">recursive function</a> <a class="tags" style="float:right" href="/tag/branching">branching</a> <a class="tags" style="float:right" href="/tag/isreal">isreal</a> <a class="tags" style="float:right" href="/tag/round">round</a> <a class="tags" style="float:right" href="/tag/str2double">str2double</a> <a class="tags" style="float:right" href="/tag/input">input</a> <a class="tags" style="float:right" href="/tag/string">string</a> <a class="tags" style="float:right" href="/tag/for-loop">for-loop</a> <a class="tags" style="float:right" href="/tag/timeit">timeit</a> <a class="tags" style="float:right" href="/tag/performance">performance</a> <a class="tags" style="float:right" href="/tag/tab">tab</a> <a class="tags" style="float:right" href="/tag/disp">disp</a> <a class="tags" style="float:right" href="/tag/char">char</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/exception-handling-projectile-motion/exception-handling-projectile-motion">Exception handling in the case of a simple projectile motion</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/projectile motion">projectile motion</a> <a class="tags" style="float:right" href="/tag/exception handling">exception handling</a> <a class="tags" style="float:right" href="/tag/exception">exception</a> <a class="tags" style="float:right" href="/tag/ValueError">ValueError</a> <a class="tags" style="float:right" href="/tag/try-except">try-except</a> <a class="tags" style="float:right" href="/tag/raise">raise</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/exception-handling-derivative/exception-handling-derivative">Exception handling in the case of division by zero</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/derivative">derivative</a> <a class="tags" style="float:right" href="/tag/exception handling">exception handling</a> <a class="tags" style="float:right" href="/tag/exception">exception</a> <a class="tags" style="float:right" href="/tag/ValueError">ValueError</a> <a class="tags" style="float:right" href="/tag/try-except">try-except</a> <a class="tags" style="float:right" href="/tag/raise">raise</a> <a class="tags" style="float:right" href="/tag/assert">assert</a> <a class="tags" style="float:right" href="/tag/unit-testing">unit-testing</a> <a class="tags" style="float:right" href="/tag/function">function</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/data-transfer-amino-acid/data-transfer-amino-acid">Data transfer: Parsing Amino Acid data file</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/Amino Acid">Amino Acid</a> <a class="tags" style="float:right" href="/tag/input">input</a> <a class="tags" style="float:right" href="/tag/output">output</a> <a class="tags" style="float:right" href="/tag/IO">IO</a> <a class="tags" style="float:right" href="/tag/command line">command line</a> <a class="tags" style="float:right" href="/tag/argument">argument</a> <a class="tags" style="float:right" href="/tag/exception handling">exception handling</a> <a class="tags" style="float:right" href="/tag/exception">exception</a> <a class="tags" style="float:right" href="/tag/for-loop">for-loop</a> <a class="tags" style="float:right" href="/tag/dictionary">dictionary</a> <a class="tags" style="float:right" href="/tag/map">map</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/command-line-input-arguments-summation/command-line-input-arguments-summation">Command line input arguments summation via sum()</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/command line">command line</a> <a class="tags" style="float:right" href="/tag/input">input</a> <a class="tags" style="float:right" href="/tag/argument">argument</a> <a class="tags" style="float:right" href="/tag/sum">sum</a> <a class="tags" style="float:right" href="/tag/IO">IO</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/command-line-input-arguments-eval/command-line-input-arguments-eval">Command line input arguments summation via eval()</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/command line">command line</a> <a class="tags" style="float:right" href="/tag/input">input</a> <a class="tags" style="float:right" href="/tag/argument">argument</a> <a class="tags" style="float:right" href="/tag/sum">sum</a> <a class="tags" style="float:right" href="/tag/eval">eval</a> <a class="tags" style="float:right" href="/tag/IO">IO</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/calculating-directory-size/calculating-directory-size">Calculating the size of a directory</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/MATLAB">MATLAB</a> <a class="tags" style="float:right" href="/tag/directory">directory</a> <a class="tags" style="float:right" href="/tag/dir">dir</a> <a class="tags" style="float:right" href="/tag/size">size</a> <a class="tags" style="float:right" href="/tag/fieldnames">fieldnames</a> <a class="tags" style="float:right" href="/tag/sum">sum</a> </div></section></li><li style="padding-top: 1rem;" class="s-post-list"><section><a style="float:left;font-size:1.1rem" class="title" href="/programming/branching-pythonic-way/branching-pythonic-way">Branching, the Pythonic way</a><div style="float:right;display:inline-block;"><a class="tags" style="float:right" href="/tag/Python">Python</a> <a class="tags" style="float:right" href="/tag/branching">branching</a> <a class="tags" style="float:right" href="/tag/print">print</a> <a class="tags" style="float:right" href="/tag/tuple">tuple</a> <a class="tags" style="float:right" href="/tag/input">input</a> </div></section></li>');
      window.history.pushState('Revanth Revoori', "", addParam(document.URL,'q',''));
    }
    else {
      $.injectResults(query);
    }
  });
});