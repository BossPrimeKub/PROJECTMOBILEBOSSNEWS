//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",cache:"no-cache",useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return e.cache?o.cache=e.cache:Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"c2435c3e0f46de784341ac3ed62863ce77e117b4",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "MyUnoApp",
  "applicationEnvironment": "Development",
  "resources": {
    "hash": "sha256-P5GgB6VI9MZg3DepjRasKQJuS2ivgwmYOYJYPBsBx24=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.wijvzrw6gu.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.q5rqv3xrhm.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.9nshy1xaqr.wasm",
        "integrity": "sha256-u7777Wj3VCv+UQN8C7QnRJkOsvrb6MitD1aF/cQ6tCA=",
        "cache": "force-cache"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "integrity": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "integrity": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "integrity": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs=",
        "cache": "force-cache"
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.e22nl7riy4.wasm",
        "integrity": "sha256-yrShUYIuzeTOTVvrCt+uS/l7SFqBT6rRsjt7K48GGlc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.mwo4f5vsvi.wasm",
        "integrity": "sha256-6hWunBOsOtSRkFd3be7S5H2kiQCW6yUuiIceVtalTmM=",
        "cache": "force-cache"
      }
    ],
    "assembly": [
      {
        "virtualPath": "CommonServiceLocator.wasm",
        "name": "CommonServiceLocator.pxaxvyzjv1.wasm",
        "integrity": "sha256-neysFTz1HQ8IHPE0N5pPtuvv2eurpM6dpWeXQ8gS1T4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "CommunityToolkit.Mvvm.wasm",
        "name": "CommunityToolkit.Mvvm.4sdv9o2ycm.wasm",
        "integrity": "sha256-fP9s6pvQnT+gJSrJNfvi4Visl8xT031P2rPXWfsg5vs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "HarfBuzzSharp.wasm",
        "name": "HarfBuzzSharp.ebz6e2ijn2.wasm",
        "integrity": "sha256-Su4t1A5ca41XdWtO+/NbKlPPqL6IcGxTpGATtikbY0s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.DotNet.HotReload.WebAssembly.Browser.wasm",
        "name": "Microsoft.DotNet.HotReload.WebAssembly.Browser.9sdmuz89zv.wasm",
        "integrity": "sha256-twYjB73q/6/YZThvje1mmIUab/5qFYlYu5WzgRNvQGo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.orhptnd9xx.wasm",
        "integrity": "sha256-NC8XVrNNxyNhg7tlom6WjSopQZTaiWSbeRookBSYOyM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.b3pij3tebf.wasm",
        "integrity": "sha256-eYEoajjra7bivrxxEwRuon9Cpy6WgklT6Ys9BiILZ5Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.3ucxiitwm2.wasm",
        "integrity": "sha256-xZawkvTLRWa+BPeYO9fyRVSvrNMjoiiEdj64CPkycHY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.irlczz6hcu.wasm",
        "integrity": "sha256-LgjvUyEGK040AHn5b+4mnmzTKCnP6GMIRQwemaPYKEU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.fin3467xug.wasm",
        "integrity": "sha256-x6Vmkk+XcLsdDWVSu46CXmXkH+Et1+BWiz/qFw9XXFA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.bypfn3k8np.wasm",
        "integrity": "sha256-3SsNpwbnHYzH54P6la4aibD1sewVEBOjWFPya2+okRc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.j3u8ouhzz6.wasm",
        "integrity": "sha256-oZVl5UoD2ZjGxchUieIBOGouXPMx8KM6Wr/bJwCJlOE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Configuration.wasm",
        "name": "Microsoft.Extensions.Logging.Configuration.ah6oyszc03.wasm",
        "integrity": "sha256-MkfXb7jT04PHAESlznrY5xj1iphfAP6cAfizUDaQ2qk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Console.wasm",
        "name": "Microsoft.Extensions.Logging.Console.6m2ahthhf3.wasm",
        "integrity": "sha256-Qj9TLXd67nHlQ1Si3ENfVKq+n7YwiPfTYHflQF0zoEQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.ObjectPool.wasm",
        "name": "Microsoft.Extensions.ObjectPool.7bd5woinh9.wasm",
        "integrity": "sha256-Xc38ycyMJtqV1RPPdehYvbFGI3HPrxmqnkaNJopUhV4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.moch3gvzt4.wasm",
        "integrity": "sha256-di22E4jmM/Bs0XCMaI2qOcHAFPN2C/0JExuM/4nQZHg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.ConfigurationExtensions.wasm",
        "name": "Microsoft.Extensions.Options.ConfigurationExtensions.wtnkcgjgd7.wasm",
        "integrity": "sha256-XE7YvUnfPGK/WaRvsQKbUsR6SmSvQw35NqXgo2MvXgc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.4elrmnoxfr.wasm",
        "integrity": "sha256-DPdGxWUwWSkPlogm6xTDWrq5DbLzedmuGTh8xn+iJhQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Registry.AccessControl.wasm",
        "name": "Microsoft.Win32.Registry.AccessControl.v0vann6yge.wasm",
        "integrity": "sha256-j87w52TYxwp7dYadDhNrgTOjTQwCJ1whi7mUuSJ5/5A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.SystemEvents.wasm",
        "name": "Microsoft.Win32.SystemEvents.l6fl2t9xac.wasm",
        "integrity": "sha256-HeZuY7rXaYBEMV3mIfVrSVg2nkRuQL1Ayk4vMr+7O+Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Newtonsoft.Json.wasm",
        "name": "Newtonsoft.Json.qkbufwhni2.wasm",
        "integrity": "sha256-GlXMWKvDs45M2pACoR3Y4Qh8mcrOZGljqmvJY+6JZ5s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.wasm",
        "name": "SkiaSharp.b9qpkax3p4.wasm",
        "integrity": "sha256-0eLN/gLHChGzavdF86TTiFcxQ6EGt+zm+18ooWTFPfY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.Resources.wasm",
        "name": "SkiaSharp.Resources.as8jmr2j3z.wasm",
        "integrity": "sha256-xkrzAITFLdmRly1qkxBgEKirupd6Cf23F+xLLhSC2po=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.SceneGraph.wasm",
        "name": "SkiaSharp.SceneGraph.c3ayq2tt8y.wasm",
        "integrity": "sha256-aOblwb4RBYjQroGVIpPB3tyS/q86e2Q3qZhpei2x0oc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.Skottie.wasm",
        "name": "SkiaSharp.Skottie.oy0pz9msfr.wasm",
        "integrity": "sha256-4Ad4GFQ3EA/d6Tw3tI3dQ8D2htWFyIE6P/QFzoBi1FQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.CodeDom.wasm",
        "name": "System.CodeDom.4z73xc5ml2.wasm",
        "integrity": "sha256-IIwRbU5I+MJEzhajpIFVfj7xYm/L3dJuIIbzrE1pUfw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Composition.wasm",
        "name": "System.ComponentModel.Composition.5njutgbrue.wasm",
        "integrity": "sha256-D1RcMmR9MVyg8U+HXATHOn+KBDlvJIPqTwKFkJjeABM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Composition.Registration.wasm",
        "name": "System.ComponentModel.Composition.Registration.8v6udndjyd.wasm",
        "integrity": "sha256-vAigy4wWpyu+rjgLfRAq62o6qA2fp/o57kwBuV5nxjA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Configuration.ConfigurationManager.wasm",
        "name": "System.Configuration.ConfigurationManager.d7qttjez43.wasm",
        "integrity": "sha256-F80zBH65aajMXsVdOO8JK/6ssLpvsslwkKNwMRVaiW8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Odbc.wasm",
        "name": "System.Data.Odbc.hkqy8wyvn3.wasm",
        "integrity": "sha256-/9xYXGT7IhDmdNT5XZ24SgKk26b0mB7F4BSQ3Za6WqI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.OleDb.wasm",
        "name": "System.Data.OleDb.robkpvepbr.wasm",
        "integrity": "sha256-1dJIKVn9xSitK0UcRlvEvG+gz3mUK6KGy8qJLABsAfA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.SqlClient.wasm",
        "name": "System.Data.SqlClient.kngaw24f5u.wasm",
        "integrity": "sha256-0NovI8WqJ08mbC1+82aFqQHBHF5U16SElFhMpkq6XbQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.EventLog.wasm",
        "name": "System.Diagnostics.EventLog.lxpz2qom6g.wasm",
        "integrity": "sha256-CVj6uRv2SepSlWJBpehjP4iFtKrRoTl9k8y5XKd43aA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.PerformanceCounter.wasm",
        "name": "System.Diagnostics.PerformanceCounter.ot51kdvxzj.wasm",
        "integrity": "sha256-vOvTHlSPWJx0l0iM0LHXYcXHnvtrzO6tRPCmQImDnoY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.DirectoryServices.wasm",
        "name": "System.DirectoryServices.prjr4fw1i7.wasm",
        "integrity": "sha256-1fyXcUzA/7BzVXIoWLH+IugUG5wsylpPn/hV80DTaXA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.DirectoryServices.AccountManagement.wasm",
        "name": "System.DirectoryServices.AccountManagement.uhiqgdeic1.wasm",
        "integrity": "sha256-3lt1+TZyqIL4mZfWEQ1p13w5zwOdHmccxHjEv2rqxcM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.DirectoryServices.Protocols.wasm",
        "name": "System.DirectoryServices.Protocols.qqo8vqvdet.wasm",
        "integrity": "sha256-vnk801mErkakNyJWVWBZ7/gsDkuFZPsOsQMQaaxXxWg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Common.wasm",
        "name": "System.Drawing.Common.aw2xayg6sf.wasm",
        "integrity": "sha256-6h6gZVmZr+tgrRUlWzhvF24TKKxBiK/+RkztdQLDCGI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Windows.Core.wasm",
        "name": "System.Private.Windows.Core.15sbjvge5y.wasm",
        "integrity": "sha256-y02xDTHiRTLVTD5+0oAE6FGYA1JUezOIpqafIA6tEOE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Windows.GdiPlus.wasm",
        "name": "System.Private.Windows.GdiPlus.v1e6iva9lh.wasm",
        "integrity": "sha256-XWW0zELwvBzNAvlAbvYfpDIpNzk1+pVqdSImcJZgiTg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Packaging.wasm",
        "name": "System.IO.Packaging.avsq053c6a.wasm",
        "integrity": "sha256-Wofxv+1CI4XwK/GjDcn3U/GV+DsY3xs6mYW0GFOaiN8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Ports.wasm",
        "name": "System.IO.Ports.mxze9ylckl.wasm",
        "integrity": "sha256-am4a4sHpFukZwJIfSWriSPAf0T7iKr68NQPiGOzt264=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Json.wasm",
        "name": "System.Json.jh0shol1ss.wasm",
        "integrity": "sha256-d5IdPGK0bxQkzshQDJqETxcP3RFwrjnnj/mpzoG2XhU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Management.wasm",
        "name": "System.Management.ywkflmecyg.wasm",
        "integrity": "sha256-XrsA3EKY56XH412r2yQb08Pgs7PmMDg8dYwX2lElUBA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Context.wasm",
        "name": "System.Reflection.Context.71dhxjksvr.wasm",
        "integrity": "sha256-xXZUUvml07rf2ho8xksE3pHhtQp2JJEnpswdffgpFwM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Caching.wasm",
        "name": "System.Runtime.Caching.ojymfngtgz.wasm",
        "integrity": "sha256-ZMPPjMSMuhAL3Jt/U1DUeFb9ZhGdna0C+mCtbE8j0yA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Pkcs.wasm",
        "name": "System.Security.Cryptography.Pkcs.ro50gzscr1.wasm",
        "integrity": "sha256-y1hOjRjhWuUUAn9V/A82YWSGZlfOyYeG4bNR73Y7o7g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.ProtectedData.wasm",
        "name": "System.Security.Cryptography.ProtectedData.1psdu5skeu.wasm",
        "integrity": "sha256-haR4LNWYO3kbhtc+UdNTpyaixauXmVXAIE2+4uDEgSQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Xml.wasm",
        "name": "System.Security.Cryptography.Xml.50qqewps08.wasm",
        "integrity": "sha256-2xs6g5TAgQ7m/1+pakQlXdRJNjQXZY2tb00HOJKs+6U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Permissions.wasm",
        "name": "System.Security.Permissions.9iae65d5a6.wasm",
        "integrity": "sha256-T8nJ+rb3ljvGJAw3ob21bz3vvsB1A3F8njupmy/CigM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Http.wasm",
        "name": "System.ServiceModel.Http.at90t0g2u8.wasm",
        "integrity": "sha256-UhF9cNlE/TazZzwyoEX2z5nRVArUpbhrhASEgIM8QCE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.NetFramingBase.wasm",
        "name": "System.ServiceModel.NetFramingBase.v3krij1lir.wasm",
        "integrity": "sha256-dZOsgy1g4w6elKE87wBSakrdkxFbrNAuZoVdXWdgfFo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.NetTcp.wasm",
        "name": "System.ServiceModel.NetTcp.eue8twjesa.wasm",
        "integrity": "sha256-JmobzTKkZl4UlEJiyElVzl0sBJUEuYNHo03jyz7y6YY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Duplex.wasm",
        "name": "System.ServiceModel.Duplex.c4uwjesfm7.wasm",
        "integrity": "sha256-hDRPWDnJFeriE3VXX+yvKgztqrf4gm/HxS8vPTN7K6s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Primitives.wasm",
        "name": "System.ServiceModel.Primitives.kw3e401vs2.wasm",
        "integrity": "sha256-vKAyS7fB8F/Sn2Zveg+BrABsoVOzM129Sk0GapJIBME=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Security.wasm",
        "name": "System.ServiceModel.Security.diubfhz3ez.wasm",
        "integrity": "sha256-y01Oy9ZlPVz2kUtL/h+fD++T1jWKmhsdg3qOJWj/Be0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.wasm",
        "name": "System.ServiceModel.np7p6p03h6.wasm",
        "integrity": "sha256-S305rbad4vI09YUyaso0p7GAlE9yXFXQ0Pcmd2G6XGg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Syndication.wasm",
        "name": "System.ServiceModel.Syndication.nms1qxeaoe.wasm",
        "integrity": "sha256-0drTRD0XXqChHRkspcsl+3vW/zJQxL5KALbHDRIQVSo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceProcess.ServiceController.wasm",
        "name": "System.ServiceProcess.ServiceController.vsh7voz6c7.wasm",
        "integrity": "sha256-IRskROynIRDmGoNac4Oo8fbhBT1gvo7jYCE9dPrpC+U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Speech.wasm",
        "name": "System.Speech.4sdqfmzswr.wasm",
        "integrity": "sha256-RH93k8afhlZtOuszIERqY0fYkEONbVKS2gRnhzdQk28=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.Services.Description.wasm",
        "name": "System.Web.Services.Description.dqpfzo3jzz.wasm",
        "integrity": "sha256-BYPGbxaNUssmIKdINafLhcsKmNq5ifemKeq0K3KrtSM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Windows.Extensions.wasm",
        "name": "System.Windows.Extensions.wql7uvbjgs.wasm",
        "integrity": "sha256-2JNE2WtKmgxghyIKWjC0xhzyQtpiAhevBjd2QCPgsBE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Core.Extensions.Collections.wasm",
        "name": "Uno.Core.Extensions.Collections.pjq296lqp0.wasm",
        "integrity": "sha256-G7zvClJdt2f4dFYMawTaj882fCnAo0e6b0j3dpU9mCY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Core.Extensions.Disposables.wasm",
        "name": "Uno.Core.Extensions.Disposables.nq3oin13rl.wasm",
        "integrity": "sha256-EfmD38hHmwD8JwQ8SRRYizYt8L9wLPUsCusqcSlfTwU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Core.Extensions.Equality.wasm",
        "name": "Uno.Core.Extensions.Equality.qvkla94k3e.wasm",
        "integrity": "sha256-9qpjr+tpU3kQVPZa5bLwl1hOxKwMRk3do9MZVcD6PXE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Core.Extensions.Logging.wasm",
        "name": "Uno.Core.Extensions.Logging.5g4osb9268.wasm",
        "integrity": "sha256-heRdggTO7V4vpzzhEVImjupGylm2nc5bMm+Re0lvptI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Core.Extensions.Logging.Singleton.wasm",
        "name": "Uno.Core.Extensions.Logging.Singleton.53pf8uyhx0.wasm",
        "integrity": "sha256-wczKweZI38AU2OUYdda8Du+Gbuo2OhxACBM2dD5Ad4k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Diagnostics.Eventing.wasm",
        "name": "Uno.Diagnostics.Eventing.0doxcndiyn.wasm",
        "integrity": "sha256-bG49Jg3tnFnaQuwJV8ASDsuFWItSP7sDkS5+78iq4YQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Extensions.Logging.WebAssembly.Console.wasm",
        "name": "Uno.Extensions.Logging.WebAssembly.Console.t3bgcl6fir.wasm",
        "integrity": "sha256-ObxMcoxFD/5MjJZ+r3107WUqp1S8dl2WKzhb+80Cj+o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Fonts.Fluent.wasm",
        "name": "Uno.Fonts.Fluent.aj4vxe01pi.wasm",
        "integrity": "sha256-St5XcM2YuaW+Zb3IWu195/+3NRTryJA1ksaS8P4mAXY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Fonts.OpenSans.wasm",
        "name": "Uno.Fonts.OpenSans.fqahigjn86.wasm",
        "integrity": "sha256-l9I5oc1CC3AF8blY0LsbxI7RIfG/VUBNFFntjhwKtQk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Fonts.Roboto.wasm",
        "name": "Uno.Fonts.Roboto.e290i8pj3r.wasm",
        "integrity": "sha256-GhAXmONTn3yAHIPYSBnZ70gIWI/1zQQobvH14SQrqno=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Foundation.Logging.wasm",
        "name": "Uno.Foundation.Logging.pph8btnr52.wasm",
        "integrity": "sha256-U0WTmL3935bYYyy1rRyYmo9TKbqf3zALhpJLj4uw0s0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Foundation.Runtime.WebAssembly.wasm",
        "name": "Uno.Foundation.Runtime.WebAssembly.ca4rx5fple.wasm",
        "integrity": "sha256-dHP5yqaBHPh/ck3UhzObzrO08xcl/ii0FhlJT5EshaM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Themes.WinUI.wasm",
        "name": "Uno.Themes.WinUI.4ak2c5x6nu.wasm",
        "integrity": "sha256-1NzfCIdw8R/tCCKpaa6897wR1VtNsZGpfwgXW1PwmQ4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Toolkit.wasm",
        "name": "Uno.Toolkit.q506i4wmbm.wasm",
        "integrity": "sha256-TqgqL4sbQ2A3+rlsKHvf1AQ1HCjwvAx1c0149yo7m0o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Toolkit.WinUI.wasm",
        "name": "Uno.Toolkit.WinUI.q4d8yez5ot.wasm",
        "integrity": "sha256-er60jBM1IMkuYhtr1Ol77fPMvI/74hqK2mIMhV95PqU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Adapter.Microsoft.Extensions.Logging.wasm",
        "name": "Uno.UI.Adapter.Microsoft.Extensions.Logging.h4sv0y1s8h.wasm",
        "integrity": "sha256-IXhKznVIaeJdlXGXpl3BF4HWIFXhMT2516wyAkrfBLU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.App.Mcp.Client.wasm",
        "name": "Uno.UI.App.Mcp.Client.r9vc0rh6dr.wasm",
        "integrity": "sha256-sfq47pU2Vjmx5j6lPYwH3ZDxzqmRwOMtXXtjJ4EgPE0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.App.Mcp.Messages.wasm",
        "name": "Uno.UI.App.Mcp.Messages.y0hf8hhf10.wasm",
        "integrity": "sha256-8r+j7X7hl2Fj5N3qhTPCD2UZNgLRHkkY/IsrKsy0pHA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.AI.XamlGeneration.Contracts.wasm",
        "name": "Uno.AI.XamlGeneration.Contracts.jhf23ci6wb.wasm",
        "integrity": "sha256-5+3ulGbU0ftBgAdkclI6QGppL7zTNm+WUbFUF7aSJYU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.HotDesign.Abstractions.wasm",
        "name": "Uno.UI.HotDesign.Abstractions.ry1d4rotqj.wasm",
        "integrity": "sha256-M9uLmvsX4NtVrwWfrymMZ7GUprDKB2LLW5UIWi0EjZs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.HotDesign.Chat.wasm",
        "name": "Uno.UI.HotDesign.Chat.i6srfqkeo3.wasm",
        "integrity": "sha256-lmH+Y+l/7oagFHfcMK4eZhbvR2DOcH8jeueVqZODmvM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.HotDesign.Client.Core.wasm",
        "name": "Uno.UI.HotDesign.Client.Core.c66wpnirga.wasm",
        "integrity": "sha256-vMP7ks7MxTjZn1h8M9/xS7IsljGNNagvTYpU9crEcG4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.HotDesign.Client.wasm",
        "name": "Uno.UI.HotDesign.Client.cfi30l1taz.wasm",
        "integrity": "sha256-+Lt7r9phNIrsEilg500zT/uqUFvoFyzTCgZlJ5xSGME=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.HotDesign.CommunityToolkit.wasm",
        "name": "Uno.UI.HotDesign.CommunityToolkit.jvgmlde45v.wasm",
        "integrity": "sha256-EZiesQQ/iWT1WqFzhLUb+e51VSLcvXFfqpLkyWmcSPs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.HotDesign.Hierarchy.wasm",
        "name": "Uno.UI.HotDesign.Hierarchy.h3o9tcy0b4.wasm",
        "integrity": "sha256-Pe/oQp7rtyALlp5/0+eF0oPrteOG8kDXVl0t5yt9+n8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.HotDesign.Messaging.wasm",
        "name": "Uno.UI.HotDesign.Messaging.c5n8i7b999.wasm",
        "integrity": "sha256-0BqPbddHQU7BH5kxGBSj/g2HFe3Pa42UzrXEC+UOzMU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.HotDesign.PropertyGrid.wasm",
        "name": "Uno.UI.HotDesign.PropertyGrid.rmnf39hwg9.wasm",
        "integrity": "sha256-Y9xjJfx0S9Rdljht4ODcz/Xq8J3fc3iG+CDBun3LTpw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.HotDesign.Stories.wasm",
        "name": "Uno.UI.HotDesign.Stories.pomzq8wso1.wasm",
        "integrity": "sha256-mdcVT6PmV2E/vvAcVMk8gv5GwyGt68NgRDZUQSLi/Sc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.HotDesign.Toolbox.wasm",
        "name": "Uno.UI.HotDesign.Toolbox.7m1hqmtep6.wasm",
        "integrity": "sha256-kRsyo3GoTdv6gBHur3iRxi3w2bGEliHyqnNAXwviNmI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.HotDesign.Xaml.Interactions.wasm",
        "name": "Uno.UI.HotDesign.Xaml.Interactions.4vulkn83qb.wasm",
        "integrity": "sha256-gOChzmNaAljfbkMxXDOSo7AeY1LUMep+7Dwn7+62Bgc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.HotDesign.Xaml.Interactivity.wasm",
        "name": "Uno.UI.HotDesign.Xaml.Interactivity.8zk4z5yoxe.wasm",
        "integrity": "sha256-NJoYdZjww/N5hORuY/JKMyznu3mUPsAj2uLddh/LRlo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.HotDesign.Xaml.wasm",
        "name": "Uno.UI.HotDesign.Xaml.u3iigh9a5b.wasm",
        "integrity": "sha256-1s+8JEKwnayEB3mJb/guLbTfRXYXXWNDGcXx3Qkijx8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.HotDesign.wasm",
        "name": "Uno.UI.HotDesign.dyj7szxrm8.wasm",
        "integrity": "sha256-xTj/Opd9ffJD1yTz/FIvt695KPYaA4kmpdXzepN9/cY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Wasm.WebSockets.wasm",
        "name": "Uno.Wasm.WebSockets.lf2f7pl205.wasm",
        "integrity": "sha256-EfW0Utx6OScf6Tf8+v3R0YabjGIMpES1dd1sk+KkhNs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.RemoteControl.Messaging.wasm",
        "name": "Uno.UI.RemoteControl.Messaging.pmtd8c66io.wasm",
        "integrity": "sha256-v5DXiIPzQPPfUM9mfV0oZqj/rtoG99EXpKU50TzvEUU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.WinUI.Graphics2DSK.wasm",
        "name": "Uno.WinUI.Graphics2DSK.gfqcvrpmlu.wasm",
        "integrity": "sha256-NBS+q6UMkIyZp330HvZEjK0ZCJ2KPeVjP9MW1h58c4o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Runtime.Skia.wasm",
        "name": "Uno.UI.Runtime.Skia.c3991yhbtl.wasm",
        "integrity": "sha256-uDDIUE3hXqKVse7yOirn7gErIULKNQfL9nZvjUC20K4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Runtime.Skia.WebAssembly.Browser.wasm",
        "name": "Uno.UI.Runtime.Skia.WebAssembly.Browser.7789xtnj3g.wasm",
        "integrity": "sha256-wxY1h13Ee0Ukfsa6p3t7dHrHT+4x703PwSwBW1YnbEU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Foundation.wasm",
        "name": "Uno.Foundation.pnk5ntv4wi.wasm",
        "integrity": "sha256-1fLpJZgPxaMha3YsnKsMeHJ7/jy42YmRaN9JAcZ9JzU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.wasm",
        "name": "Uno.o9rkksyu29.wasm",
        "integrity": "sha256-9BTloigIQVrcNdRNyQtNH6PW1wqXCrDB5HO620QPw4g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Dispatching.wasm",
        "name": "Uno.UI.Dispatching.siv7pol60x.wasm",
        "integrity": "sha256-VISr7lj1+ZdZ6BN31lhVeevJwxJASfZWNxdwbwhd2lA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Composition.wasm",
        "name": "Uno.UI.Composition.qkvl56vm0y.wasm",
        "integrity": "sha256-5v9ba0susrKx6U1mctdsJw9y7qsBjD9IZvSb+2Fd8po=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.wasm",
        "name": "Uno.UI.gu0eqis3h0.wasm",
        "integrity": "sha256-yF1Fl48J9dIY6Z1docZyBCk+r2u4RzS4Km52dw3v33E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.FluentTheme.wasm",
        "name": "Uno.UI.FluentTheme.42vjy326i2.wasm",
        "integrity": "sha256-BO78Og8vAvm5OWgeHUnRolj6y9FmTs2/EboZ7qP3+Ms=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.FluentTheme.v1.wasm",
        "name": "Uno.UI.FluentTheme.v1.akqa8zcdia.wasm",
        "integrity": "sha256-+hjBPIlcu+B5T/vf2PuPN086B3fUw+VF84nm9yokT+g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.FluentTheme.v2.wasm",
        "name": "Uno.UI.FluentTheme.v2.62s0hf8307.wasm",
        "integrity": "sha256-DhuTabZsOes0IX0WTs1BXj1T+lUyLx8R+brt0ENeqVY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Toolkit.wasm",
        "name": "Uno.UI.Toolkit.ev62svqt3q.wasm",
        "integrity": "sha256-SufoacAQjl9tQbvzYAk+gIbEOwMK0iHx44Zb1YJaL1k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Xaml.wasm",
        "name": "Uno.Xaml.0ppmhjps04.wasm",
        "integrity": "sha256-lJhVK80A+IR/oHrtz6wD0QHTf6QGKwQlfPb7EPWXdOs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Lottie.wasm",
        "name": "Uno.UI.Lottie.7lbraa0bfg.wasm",
        "integrity": "sha256-lRqGnHMlLsvxE41IoUIxPMEND8+nNl48hUKkrAUcG10=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.RemoteControl.wasm",
        "name": "Uno.UI.RemoteControl.kg8jsowo95.wasm",
        "integrity": "sha256-lK0v0Cua+yMpgQwlAlj0b1OXbEK9SfMvuaNUFpbt7mo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.Views.Windows.wasm",
        "name": "SkiaSharp.Views.Windows.z1xqr73bq5.wasm",
        "integrity": "sha256-KW92VVSF79KyOMH//8JMN6fY7g0+wM/SNke2y03kH1k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.gijew29e7v.wasm",
        "integrity": "sha256-SNLVaOkao2p0/shTuuu8dKF18UHL4p0l6w83BT9mvqo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualBasic.Core.wasm",
        "name": "Microsoft.VisualBasic.Core.5wrvi89jl9.wasm",
        "integrity": "sha256-9WDok6aP2NQ8tkyVBnlRGnx4eUOkdMHSsp2F0KwwzC8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.VisualBasic.wasm",
        "name": "Microsoft.VisualBasic.ohmdjdo4x8.wasm",
        "integrity": "sha256-HHpO2Coa3NU82kyeuD0Utlt9JcalxbtrWb2LlbxmdvA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.54qaw3y2l7.wasm",
        "integrity": "sha256-S7H26k9VuAbLGJKDzlq45wpSZubQ4eZ1dOD2nT0JTJ0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Microsoft.Win32.Registry.wasm",
        "name": "Microsoft.Win32.Registry.5zehcbadkc.wasm",
        "integrity": "sha256-Ed5I2+7zzzN0URNHOacTc1Lk56gXcyydG64zE/NzCYA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.AppContext.wasm",
        "name": "System.AppContext.hb972rswn2.wasm",
        "integrity": "sha256-7XjUzOT6QSB8U9Ug+jGVAo1L/ybU0GFLhET3JyU2XoI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.fmh1lqxxe8.wasm",
        "integrity": "sha256-dzw1rBSt1IofIO8piFvHcmPttQf4KWGUNvvyjh9y8uI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.wrpunq2dmd.wasm",
        "integrity": "sha256-/FwJSpEnVRlDWAbvcPl2C9YYJyX+ajrdTY/MPLoj4wQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.dm08vuov01.wasm",
        "integrity": "sha256-JawWtEy/HyNPwWh/6K7J+J2uoyzwqYSQEbQ9nIxHFtg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.ucr2s1rjr8.wasm",
        "integrity": "sha256-/qaqgjsbZekq9VGG3GTUT6a5oDnMPTyGoaCoRNOhauQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.788c2vii7r.wasm",
        "integrity": "sha256-p3LYr5PNOhEVVzm/z5uzAGk+byTrYkFqiQSndOc3IoY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.oyg9o5jzra.wasm",
        "integrity": "sha256-IPrW8FjXCDhA+Y3Wb2lq7cDz0nwRbX43gbwmma08TqE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.kzcs3roxpa.wasm",
        "integrity": "sha256-wB/BB+YQeeh14hjDugYO7O9EJrKThC8qYYBqPsOayGI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.DataAnnotations.wasm",
        "name": "System.ComponentModel.DataAnnotations.uujisxprk9.wasm",
        "integrity": "sha256-BkVb2JdbVapd0LpZ4k6kptYr9fBU/6nnN7rzJdpa3gc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.v1qxqe5fpe.wasm",
        "integrity": "sha256-3ZsWeTWHnajqlYCOx0sLosEL5Mbjj9ZX5ELM0cuipv8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.ftz81jso1j.wasm",
        "integrity": "sha256-rQvdIpny2dTlQVO/CWX8fsDgVWNzq7ZghYLhdRnN+tY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.w7xhoe08t4.wasm",
        "integrity": "sha256-bNLHrX6OBo4SwEbWNcRP1/J0l+YYhp7e3vutNGrQYQk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.k940vnf7b8.wasm",
        "integrity": "sha256-aP+fBpJOYF7euSxwxnmeo0qfqS8PnSY2KTr6ItZoGvI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Configuration.wasm",
        "name": "System.Configuration.w3ntl07ypg.wasm",
        "integrity": "sha256-PD8WuEZ5eYNYusHpIM3czAmQR4JJeGVHao2jkKYOpFk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.439r3pkwc4.wasm",
        "integrity": "sha256-wI3rG6mP2oVI6AUXgJRLO85yXPfsUQ35+Xzr7YznLhE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Core.wasm",
        "name": "System.Core.3okiiotm1r.wasm",
        "integrity": "sha256-IzvVwMgxn2JIBodIOoNVXhtyDWKaB2Vqn6+6XQtE51c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.u1paws2ie5.wasm",
        "integrity": "sha256-Uk3GSTRuI6pkRFq4mH997reXR4sOlX3VhZL4kdZbKwo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.DataSetExtensions.wasm",
        "name": "System.Data.DataSetExtensions.k7l9fdomp8.wasm",
        "integrity": "sha256-YGlymEIk+GDWq7mWrfiakdXuNUsD6jAZQkiA5l90io0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Data.wasm",
        "name": "System.Data.0xkcfajxb8.wasm",
        "integrity": "sha256-5DuDQzyJdmJHwiTtl99gS+UX/8BQuO7OHlL7q7xHptU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Contracts.wasm",
        "name": "System.Diagnostics.Contracts.zgl132fygk.wasm",
        "integrity": "sha256-870pgrRJPsQKCRZIOJwes+AX30k/WUuZLr6tAKeGG+o=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Debug.wasm",
        "name": "System.Diagnostics.Debug.6kui682x9y.wasm",
        "integrity": "sha256-yk7Oxa37FZD0vkLE7Xk5WJy0uGF/Htk1EpX2vK0Q5mo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.bkk6sbg16x.wasm",
        "integrity": "sha256-m5UQlGnzjKpM6YtKYhNiU/KmB5tx5cJiEfUMf3XFRY8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.3alwgrae57.wasm",
        "integrity": "sha256-RVBQWNDZWDbjN6K5+VWrb8ObokJL4tSPqBAH+rgdY1Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.06srtm7zqs.wasm",
        "integrity": "sha256-qLNUUvLAFtmWZh7vg2Krl7SYL3VRAvd6jFi0nuAphfM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.un2pf554tb.wasm",
        "integrity": "sha256-RjOLLF6czV/gxd5Z4fxr6f6g6Fxz+AHdeTzYOsze3MU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TextWriterTraceListener.wasm",
        "name": "System.Diagnostics.TextWriterTraceListener.ida6tfw92t.wasm",
        "integrity": "sha256-BpMjRL6DEHRTpktF5GDpCXtclllCLXw8fMvwZQFQ4uc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tools.wasm",
        "name": "System.Diagnostics.Tools.shey8i22c8.wasm",
        "integrity": "sha256-IFIEXTKJToL/Kg3/TXwA3OYCctWHT4UfCtBJil+8sa4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.clw8b0o34g.wasm",
        "integrity": "sha256-AH5X+/uXtIez3eTiuQHyX7IvZnvo7HTUXCvbQO/hTj8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.w23ofaxx35.wasm",
        "integrity": "sha256-mEw6YOOLsKUjZZr5+Q+75UMN/3TLZV6wLeyZsXAflFQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.fzsvb9tweu.wasm",
        "integrity": "sha256-eyMzBdFZ7oga+hI/GwyijR6W75GKx7HZB1ICxB0YSls=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.crwi1p34or.wasm",
        "integrity": "sha256-WEuLLqrOxRB0Aa97F0YaRFQs7BLZPW2KF6J3gRbDRBk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Dynamic.Runtime.wasm",
        "name": "System.Dynamic.Runtime.9fcftni5l9.wasm",
        "integrity": "sha256-W7oJ2a3dfVXrXupu2WW7sXe2h3Eh6R6HusGu091xBpE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.3i8640auxn.wasm",
        "integrity": "sha256-devVvS+LaDHJcC+5cVXl307UE6sdHUlnuV8euSD/S5w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Formats.Tar.wasm",
        "name": "System.Formats.Tar.6thvjqqi69.wasm",
        "integrity": "sha256-Ftm7i+6OdmvZHPdDNzrF/mYovypo7HSEqkhenqaQpvA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.Calendars.wasm",
        "name": "System.Globalization.Calendars.b34zv6t8w8.wasm",
        "integrity": "sha256-dyba6/MCIrhvzz3+1Pq0vSFxSxM6LWBg6l/IykGgtBo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.Extensions.wasm",
        "name": "System.Globalization.Extensions.t9z23vywoa.wasm",
        "integrity": "sha256-7wEPvUvvsXLDAowQqjth1pKjZgb+lnK9BF6rNIqssBk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Globalization.wasm",
        "name": "System.Globalization.kzypximfjj.wasm",
        "integrity": "sha256-YObv2Jb7txIR1xMD2bLwkw+M9zOQk4kefyb4vjKXBPk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.Brotli.wasm",
        "name": "System.IO.Compression.Brotli.16ihu4aum0.wasm",
        "integrity": "sha256-x/t/v3wM3uOukFauk6MG26J0heKst4o64p7inRVCMXA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.FileSystem.wasm",
        "name": "System.IO.Compression.FileSystem.98t41ls3w6.wasm",
        "integrity": "sha256-B/5aiEvA/PauI8Rjc5GCI39Ymx44psLPGplxNcMY7UE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.ZipFile.wasm",
        "name": "System.IO.Compression.ZipFile.0imvrnvy4f.wasm",
        "integrity": "sha256-qKoWLzcygY4hYLT9czEe2Nn+gk4FkeJbXAjWoq9HHc8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.ne60qfmijm.wasm",
        "integrity": "sha256-kQmPZCZi2hHOPuZqmdJlUbQZwze13c4bzrbxKjkxQvQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.AccessControl.wasm",
        "name": "System.IO.FileSystem.AccessControl.8nsm8mjj5e.wasm",
        "integrity": "sha256-hErBLx/EVPgso4H7WveBMIBfM5vS59zOR9hfdv8/+1M=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.DriveInfo.wasm",
        "name": "System.IO.FileSystem.DriveInfo.zemo9xngn2.wasm",
        "integrity": "sha256-e8S0IA8cw4BlASNpHr3wUqpjx1yDM+11b9XDgAs3lcU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Primitives.wasm",
        "name": "System.IO.FileSystem.Primitives.kybpzn2oos.wasm",
        "integrity": "sha256-zOezZsWl9DQI2aRlQ2cp/5PmFWMLFMg2fbzrVflDEY0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.ontoty1fxn.wasm",
        "integrity": "sha256-JIHkqyKvhg9HtABkBOZ0DZhZDpJvcQL2r7/c5Ffd1EQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.FileSystem.wasm",
        "name": "System.IO.FileSystem.cfijc526tp.wasm",
        "integrity": "sha256-CESr5uMWBoRCc/2fZ5Nf6XS/6+5g6zXjmws1AgkDZM4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.IsolatedStorage.wasm",
        "name": "System.IO.IsolatedStorage.us5380okmk.wasm",
        "integrity": "sha256-Hsib3QCJXMdJ7Lm3+mRdPFxBIk8P12IIPjaxebH6Lro=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.v5uya98rfp.wasm",
        "integrity": "sha256-MxvF9ldmlXkgbbymHzWVCJaj/HBGtQFBKnQrrKnsmpA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.9dgkwpzi1d.wasm",
        "integrity": "sha256-3WPh5FHmUzJtUx5iP1tr+IooV28gkBJfdpcRfoWIs2U=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipes.AccessControl.wasm",
        "name": "System.IO.Pipes.AccessControl.rihuiw07yu.wasm",
        "integrity": "sha256-M0ZVar4VEc8z5NdpPtktm8vKkrUc0OcwgRVeBPMD/yY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.Pipes.wasm",
        "name": "System.IO.Pipes.f4dn7kellq.wasm",
        "integrity": "sha256-L/mDqAqP18UE5KnlbnORNSi2hsV1qQ44IHcG3u1OtI4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.UnmanagedMemoryStream.wasm",
        "name": "System.IO.UnmanagedMemoryStream.e6eipiyt6q.wasm",
        "integrity": "sha256-Rrn41XG1BEQVqfQBJfMY2WzWqR5wHtbUjBfU1lhkrfg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.IO.wasm",
        "name": "System.IO.ziabf8ylan.wasm",
        "integrity": "sha256-9QYRDGE9ScnQ0KkotsyyH2uq6QmDBH/BuKqPz2rq2IA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.AsyncEnumerable.wasm",
        "name": "System.Linq.AsyncEnumerable.fm8vwphpb6.wasm",
        "integrity": "sha256-Z7Gba/MulYJj+1wFI9vjGnnZ4QeB6rW6nesfNYmeT18=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.uudylx04pc.wasm",
        "integrity": "sha256-ptNjFPL/w4wNyTSDXrG8u2MiB5wxFeDYasxNT2Q64Io=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Parallel.wasm",
        "name": "System.Linq.Parallel.lbbvcapr26.wasm",
        "integrity": "sha256-73BYYkXj3My+OrdK7vK4kynZuAw637CA8DJB4qvsNE4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.hq9iyymx2n.wasm",
        "integrity": "sha256-ycudKlzpJbdIQ4mqYd+Eldlqu0druzq7f808TUI8FSA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.ome0590huq.wasm",
        "integrity": "sha256-EHNIfaBUTe1uI3hGXtP5G919G4MS0vJE70wZfPiuNZI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.oikctzq2yk.wasm",
        "integrity": "sha256-IES1BHcDHoDY0r3/x7A9OWemPeWWMm0v5AIdpTQnNxE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.19ykf2ghfc.wasm",
        "integrity": "sha256-ZeHmPewCJBxUYG2bR653ygRzEUaCJFcyWYmzoWZte4Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.5kege8iwcx.wasm",
        "integrity": "sha256-tbteYJwUEGBH8xaQCawlMkzOQ0jxXXD1zA4OAX6c7VA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.HttpListener.wasm",
        "name": "System.Net.HttpListener.govomr6pnd.wasm",
        "integrity": "sha256-oIehpwYYv3j4cylHjoBt12ZOOXbLq7YJMOlQfFAQJwY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Mail.wasm",
        "name": "System.Net.Mail.kpjpkrf00f.wasm",
        "integrity": "sha256-+P9vuyQ35KSePbZ/zQxPzcg/nkygfgSGQbuvGrXGYO0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NameResolution.wasm",
        "name": "System.Net.NameResolution.dxybkhgvzf.wasm",
        "integrity": "sha256-kb1H9KHH28hzYJDB3yR25mP3IavHD5hM2FS12LbNNE4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.NetworkInformation.wasm",
        "name": "System.Net.NetworkInformation.vqv9utc4ui.wasm",
        "integrity": "sha256-CcWfl/6mMx7V0RSmrDwK5rCFluSnj3HwVjdIW/JT49Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Ping.wasm",
        "name": "System.Net.Ping.783n01f2ja.wasm",
        "integrity": "sha256-F4TU133Adqpr2H1sOOnCO/QDOAJD99UEmymIhzJqK5g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.pstx0jw374.wasm",
        "integrity": "sha256-GQFm1/xpBiFdKyaObt5YCk4PVI35JNHyUvV/YETjVmA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Quic.wasm",
        "name": "System.Net.Quic.dj8trc6yee.wasm",
        "integrity": "sha256-eVvdZEE2Uccs+ueZFFYj0ryxKwr232WTsJytbKyv3Zk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.l70yyhjzub.wasm",
        "integrity": "sha256-b5QAMrZSdf/KvCpbw2nH6LCics3c3XfCfZvS0+T9XqI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.r7o76f3x7n.wasm",
        "integrity": "sha256-V0i1T+2h3mAyeKLUwy2u0Xrl/2OxLQ/rDF9f1BNQuJg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.ServerSentEvents.wasm",
        "name": "System.Net.ServerSentEvents.tgl8yc4d2m.wasm",
        "integrity": "sha256-U0+jKkEh6j3fJ2VuUGNUeDRRwCPYgEHGjidWlVdD2Fc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.ServicePoint.wasm",
        "name": "System.Net.ServicePoint.052trdlw01.wasm",
        "integrity": "sha256-7LBUC18bkWqW9Ds5v+1h8xBHGvvK7OyBO7yssiDwYJE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.Sockets.wasm",
        "name": "System.Net.Sockets.u3mk3ahtq5.wasm",
        "integrity": "sha256-Fri+U6XGqT7CofVVqFtQI664CGnE8Yn+uAO13Yg2kDs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.qqvr2j3pvg.wasm",
        "integrity": "sha256-crcBI8OSn05pIGtr9dIKTSle8WyVnVvn1ykhdCarKHk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.5uas6gg592.wasm",
        "integrity": "sha256-I5Rumv8E8wKemQ8qlIcxiBLcddHrZpstjIx198kezhg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebProxy.wasm",
        "name": "System.Net.WebProxy.navlngkykk.wasm",
        "integrity": "sha256-UfcSSJ5pFPnqX4UsSk2ak6V0oGRwVZFrI+ZZQetJN80=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.Client.wasm",
        "name": "System.Net.WebSockets.Client.7xkgcbvoi2.wasm",
        "integrity": "sha256-61X3TpUQwfZXJgHxuGbzMNjOA5Y0uMlPUKcoHegYsik=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.hmm17lo1vo.wasm",
        "integrity": "sha256-NzwFQVAP6ujP3VCOWZpuibKtH00pYj2wO25dp/sUMzA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Net.wasm",
        "name": "System.Net.gmaqhpvzve.wasm",
        "integrity": "sha256-SB39+SFpz8NGMNeKsPz8RexKLMHSs4t/YY0Cdp98Vq8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.Vectors.wasm",
        "name": "System.Numerics.Vectors.ih9man0xaa.wasm",
        "integrity": "sha256-euDi/PkliLr8iWxrj85B+0QMg9lefJfPOygCSbA1Dbs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Numerics.wasm",
        "name": "System.Numerics.w9v15jg7wg.wasm",
        "integrity": "sha256-bJrfxIfnYXa0s5HHDeyXVlYaMt6hZM+KxQAthR1xvzk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.pwzbf3ywqb.wasm",
        "integrity": "sha256-d/roUDXQbxjAyNQ4OuPGfgtb8jIEvY6APDCGnrhdq/s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.DataContractSerialization.wasm",
        "name": "System.Private.DataContractSerialization.ya7w2p8he6.wasm",
        "integrity": "sha256-Bg0b3gkDyGLuQSJ4NFq1TdfvyhVpu2sGgoscGQlZcaw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.ebclw1ctlb.wasm",
        "integrity": "sha256-ZgoPwh6cNYnlVcOfQQcYaFIY/i7HKxqJoiS6dYP7vh4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.esrdiz7prm.wasm",
        "integrity": "sha256-7jvsvsXEaT9c0qR6LZ20lnaqIHkJnuYv4+NzTme7B+c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.zese355etl.wasm",
        "integrity": "sha256-pZEvzLno6/nZ5HzgCLWe107ShtE+e9lDoX4G9xQdQik=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.DispatchProxy.wasm",
        "name": "System.Reflection.DispatchProxy.db8njzbm5e.wasm",
        "integrity": "sha256-2Rh4nfhRHZw6+6MN/73OD5G1R91lHlFt+nAfLv+gwRw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.5li0z45f7b.wasm",
        "integrity": "sha256-GQFwGopoILYhbV4a5ZcQ18C/cnfJKbP9HVF48KzN/2I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.qjvufgr3wc.wasm",
        "integrity": "sha256-yuXtIgTh2Gydkb0NKvMWmvF5B4INT62b+Ka4NGNbhtI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.wyf2c3g3ob.wasm",
        "integrity": "sha256-WPVkBo/WXt03g+HIlFWDTukIAsCW3HHnUrDClSFMCJw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Extensions.wasm",
        "name": "System.Reflection.Extensions.5423st4px4.wasm",
        "integrity": "sha256-dd1lLN1rgiJN6WHzM3IzNhrJrDNUaSBZfwql13FI5Ro=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.9jlh4rmm5n.wasm",
        "integrity": "sha256-RTc4TEF954Elk9ZKQr8I1xTmVSOwE2pTVBda3OoUbK0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.yippb5hjvi.wasm",
        "integrity": "sha256-hsMoSQeu9VuXjpO7UopMJcP1pGqFq8KyGiADDYbKjqg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.TypeExtensions.wasm",
        "name": "System.Reflection.TypeExtensions.j1u7dn4u7m.wasm",
        "integrity": "sha256-1zxekL4Ll6wIo5iSFWn7rvxvwy8FZlaGT8BSIaP+zvU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Reflection.wasm",
        "name": "System.Reflection.e4ad5khic1.wasm",
        "integrity": "sha256-ggaxTLyBPwKtMR3Ei5g7pAXF1GNazFeaR2Qvpg3/9WU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.Reader.wasm",
        "name": "System.Resources.Reader.xlkk3ynoru.wasm",
        "integrity": "sha256-VcA4/sW5O65kcxr0DmT4WIvOLrbwr+UGxPZhQ1WZPdI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.ResourceManager.wasm",
        "name": "System.Resources.ResourceManager.eugtqi7331.wasm",
        "integrity": "sha256-evN15qRqZAzMk3WeKz70EQNzmPe4MH0OLcTuaM6fuOk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Resources.Writer.wasm",
        "name": "System.Resources.Writer.depxp3za4f.wasm",
        "integrity": "sha256-K6xJgmdkaEGqn+NqniBZKue+A0nt7UeRuS9xCdd5Kv0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.qm5biyh995.wasm",
        "integrity": "sha256-vqTzHdwL4DLIonUhCndYkQnST2pCsV8EF+m6alFFnyM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.VisualC.wasm",
        "name": "System.Runtime.CompilerServices.VisualC.vjh10io2ol.wasm",
        "integrity": "sha256-G5eiK9YTeoka6teER983ca3bfm0lwgtp2zHS6Ool+10=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Extensions.wasm",
        "name": "System.Runtime.Extensions.gm74y2bo0g.wasm",
        "integrity": "sha256-aKYU2o+qnPqQiDRvBWLNd4s+XUlRHS9+7zci7G5nJQc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Handles.wasm",
        "name": "System.Runtime.Handles.ujbtg86el3.wasm",
        "integrity": "sha256-RhCJaLdJktigXzfhrE/EiLPy0npdzWs2ebzooIz4yPo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.ha950r0i18.wasm",
        "integrity": "sha256-SYq0X5xQcB0kVFD/sqEBVQGzu0ohWb/2MtNmgPZF0Y0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.g1w1fits1p.wasm",
        "integrity": "sha256-jOD1vdlO2AG4vhuUwGeGbX+VBZKkYHghpbo0qb4Klys=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Intrinsics.wasm",
        "name": "System.Runtime.Intrinsics.7n7jt1ms3p.wasm",
        "integrity": "sha256-c+4Qyqb1rOVVI6n1cz8O6Se5GjZeMziqirV8xcOos3E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.13t1lxa6p2.wasm",
        "integrity": "sha256-fcJXRFnapbNtMA2utIXPTzOgvZzNuPmhMB6jGVsfxTM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.bcciqwoqxp.wasm",
        "integrity": "sha256-BRfD+oTH6fP2lZk7uDSKNQk2o2jre7hUkJ4zi5l4eiQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.wecoe44nmz.wasm",
        "integrity": "sha256-KE0HrfhpqxXzLAi9LC1zhIO7wgZ9J3QxATUUjZJxz/Q=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Json.wasm",
        "name": "System.Runtime.Serialization.Json.8dz8w33dsz.wasm",
        "integrity": "sha256-DOE4xi6RjJRqUaowH/WgCSBm3rQPWHozxfPuwzP7Bjc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.m05m0pm5oq.wasm",
        "integrity": "sha256-5mbsUahgpegR96DPJDY4L8XxNERXyq5CDLXMieNqAf8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.Xml.wasm",
        "name": "System.Runtime.Serialization.Xml.79xb2e70lp.wasm",
        "integrity": "sha256-5dh8lIMlWuDWmR0Br2GRqKF9blNLZ6ZYWajAahuEaUI=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.Serialization.wasm",
        "name": "System.Runtime.Serialization.uyi2fb0103.wasm",
        "integrity": "sha256-enhOGU8+BMT1AzGYDu75jmqp1EC5B612S58l3YUQNY4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.69m00wu7n6.wasm",
        "integrity": "sha256-qpDLdC4MIjd15skxXsimPdigXybL8OA1Eb6fGmj6cJM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.rv6iq87t46.wasm",
        "integrity": "sha256-qeIQ2iEO0D2g3+ttESOJyIYlWsWSrCx5J0FATaRJ3EM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.2pchagji9k.wasm",
        "integrity": "sha256-emuhylOTCFG0uKmoYXAJixx4l3v5YOnUCyU8eZiw5kw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.tba5tu29wv.wasm",
        "integrity": "sha256-iZikIZiaY8gJflNxn/99b+0kb2ABObFIg95JTZ9ew+k=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Cng.wasm",
        "name": "System.Security.Cryptography.Cng.q19w88bn7l.wasm",
        "integrity": "sha256-MnIOaf3yNXO19ANyaRxR/rIo38+r4aZ57Jb79w5Hp/c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.lmdq3p0hzc.wasm",
        "integrity": "sha256-fe6Ox096kY1v6l7HeY3b69aIQmqUNxySFyafkWaLIZo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Encoding.wasm",
        "name": "System.Security.Cryptography.Encoding.irtnamfpwo.wasm",
        "integrity": "sha256-boiB5TcuTZ0JAiUq2HSdR1XKRgUNzXD7gRb3xvEnYg0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.OpenSsl.wasm",
        "name": "System.Security.Cryptography.OpenSsl.ctfxrq7l33.wasm",
        "integrity": "sha256-sN772+jmpnKDF/scdBpYbE9+e4VhpY/mz1XQjRWFCPY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.Primitives.wasm",
        "name": "System.Security.Cryptography.Primitives.wfl2haanmw.wasm",
        "integrity": "sha256-9K3LLsAlCMfTiopd00ghDgXO41QAoWXSBxzt9rLwrKY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.X509Certificates.wasm",
        "name": "System.Security.Cryptography.X509Certificates.jk1euj9vu9.wasm",
        "integrity": "sha256-c1nYqA8gjXMuoqyzLVU5oBZjk1eNXDDcbbVUkZSW0BA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.s9jclef89k.wasm",
        "integrity": "sha256-cPbaDAMj+u7y1HgcSOlQBApPZQn3Osw0j7QCBK2nvTo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.s3g4fx319q.wasm",
        "integrity": "sha256-iC1vTlA3nUsy7K43VqGmXc4iLPDN1rX3/ONAt1Ggz2g=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.Principal.wasm",
        "name": "System.Security.Principal.5ic1w2xffg.wasm",
        "integrity": "sha256-c9KfvPjCILjolmPGVvF3cUNLH+aoBiN/VpD2HX81Tx4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.SecureString.wasm",
        "name": "System.Security.SecureString.akn0vk63vp.wasm",
        "integrity": "sha256-thmIyEYCxYWr2Lqnj/NZBl2thD7LWQ5Jyb1xKTPGHN8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Security.wasm",
        "name": "System.Security.hy6omngq8z.wasm",
        "integrity": "sha256-OUtB580SwS4b7pf79+qqZ/JeckEChYyh10lC7st27vY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceModel.Web.wasm",
        "name": "System.ServiceModel.Web.c7chznvmm3.wasm",
        "integrity": "sha256-+HhPmmSxjKDjLCDMocYSnTMxaoWPpHDU53kIYV4FPkM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ServiceProcess.wasm",
        "name": "System.ServiceProcess.mfsa3z03lw.wasm",
        "integrity": "sha256-jkKntBD+DniUCs8+D54ssnB54BPgQjBKvUOZCaxRHCo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.apclussnua.wasm",
        "integrity": "sha256-joEdxIv/cd5L0ArZyAUyVNaln7bkGFr3VasZKKKGVpc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.kny0la5npq.wasm",
        "integrity": "sha256-cFwJ5+BNND5PO0aGFE6fAfVntLGJAEGcHXT7G0eZ7kU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encoding.wasm",
        "name": "System.Text.Encoding.4bprmgilq2.wasm",
        "integrity": "sha256-4C5O60oanY4qojfj8KeSd4oax9DGwRuoyXmrRQ3Izq8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.z4o1x288hz.wasm",
        "integrity": "sha256-c7k7CZKmIfVhW+yxvTRmOsOrY53ei2OpdAX1gqrYFqs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.ytv8luxawq.wasm",
        "integrity": "sha256-JlCXuvg9o7JItB6HVIZBwv1Y5PCW6ZlvJmAWpBpdqqM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.i57ntutovo.wasm",
        "integrity": "sha256-CjcPlzZTnO3L+rW+qfDjybRpfQA5r+OI87bu6G5gb7E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.AccessControl.wasm",
        "name": "System.Threading.AccessControl.vkhht9s4s0.wasm",
        "integrity": "sha256-wctBiLNn0u+v2NJ0wkJnTab7OTAg+mZQexh1g3PdokE=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Channels.wasm",
        "name": "System.Threading.Channels.ici4sc8c5d.wasm",
        "integrity": "sha256-Hv6SZPcdRQyeUGRxioGyTMLcOFx0Rx9CCKTRB6+75dY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Overlapped.wasm",
        "name": "System.Threading.Overlapped.gbkwu8tis9.wasm",
        "integrity": "sha256-JIMNE90b4q/0GRLekQX0J4jswh9Qq6zmYpsfmvOqSsY=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Dataflow.wasm",
        "name": "System.Threading.Tasks.Dataflow.5hsbzkigfv.wasm",
        "integrity": "sha256-F6ijF01G5ayyNI+AJC5dJyV90289AFYIUvfzdgf1e6c=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Extensions.wasm",
        "name": "System.Threading.Tasks.Extensions.nc1yghpvaj.wasm",
        "integrity": "sha256-qYCAixHlfTm0sPXX2WA7WBpH7wDI/WG86gIiWl6CZS8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.wasm",
        "name": "System.Threading.Tasks.Parallel.4n1o4dxc9j.wasm",
        "integrity": "sha256-sPmsa8LhlJDc/l+EYuEcv1WJwWIBARnu+5HFtyRUvf8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Tasks.wasm",
        "name": "System.Threading.Tasks.rx5istkt3h.wasm",
        "integrity": "sha256-cWHfuj76unXDn/zUJXp7vFovwSTZd5uFPxT2lBV7f9s=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.43ap29e3sq.wasm",
        "integrity": "sha256-sFrpoExTCH2u1YYEe+Bdw4NkxQ3XUnTZ2PghtpY7y4E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.ThreadPool.wasm",
        "name": "System.Threading.ThreadPool.7gbfkrjizt.wasm",
        "integrity": "sha256-SYhvLVitavmTO3nONH7HK9IX6u+WhQ5xsUxPml28vIw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.Timer.wasm",
        "name": "System.Threading.Timer.kkeuksfj0m.wasm",
        "integrity": "sha256-RNkYx2KdxuQ9vMDqmHY2nZNVCFKpY1A350W9/YZ+ZBc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.57sxvma12c.wasm",
        "integrity": "sha256-/3vckHiWbojHLbhMFwgF9JGvoycue/ypOU8qdCNh93Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Transactions.Local.wasm",
        "name": "System.Transactions.Local.kjba88uqo5.wasm",
        "integrity": "sha256-EB/k7M4CovW1V4H+tIrqciW9lto+MXdl9DXBuTCpTh4=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Transactions.wasm",
        "name": "System.Transactions.yd5orfj1dk.wasm",
        "integrity": "sha256-RjhuG0JTHUhYEC4sG11PXi18F3Agde6gC98COiSvjRo=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.ValueTuple.wasm",
        "name": "System.ValueTuple.x5xctdxzrq.wasm",
        "integrity": "sha256-5ZNR/qnzYjhJZR/VDOMryW0fJ1EqmRC77NBsz+7fmQk=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.1a72cmhu6i.wasm",
        "integrity": "sha256-pzrHuyxkCbv5ciUhSBPWsHwGdV4F6vb0kOAr5+q+B88=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Web.wasm",
        "name": "System.Web.ilju54fcp2.wasm",
        "integrity": "sha256-tmN+TCQ8POd4OjkrCo97xXTmmrx98Dm0A//7QAbl5wc=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Windows.wasm",
        "name": "System.Windows.gr5k60s0oe.wasm",
        "integrity": "sha256-LODNI3wFBqp/M9SZGeHWP6W03n14iRtnkifhyJyJNUA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.plyvi1r5s9.wasm",
        "integrity": "sha256-7aZ8st+AuepiRm0owEnGc8sqRZ5Jg/48U2tEFnpt7sA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.pt2dqzuhaf.wasm",
        "integrity": "sha256-c8pLfEXPfCSGI0XiLEKSedGKYnozE503jW1ov5X2PPs=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.Serialization.wasm",
        "name": "System.Xml.Serialization.ygdmhmuqdp.wasm",
        "integrity": "sha256-TunK4Gc5McKu9+Kfghs1mv/sbRBhmBZ9146qcfc7Y3w=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.olv3u76k95.wasm",
        "integrity": "sha256-RIPNxdIDRYv7EKohrcYLrRe+a3hV2WQpp22PPGd2xak=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XPath.XDocument.wasm",
        "name": "System.Xml.XPath.XDocument.m5wc9z7e1k.wasm",
        "integrity": "sha256-yjJWBpN2LVB3FskQDcu22lK/kqjRndIsuHryI4FVYOw=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XPath.wasm",
        "name": "System.Xml.XPath.dd748ds2m7.wasm",
        "integrity": "sha256-r2WxqdzU3ZO3yQIVtX7dfjQwaybe8A3ETT8wBmtn8tA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlDocument.wasm",
        "name": "System.Xml.XmlDocument.4gwmhmdbax.wasm",
        "integrity": "sha256-PFmDfAn9AD6FB+OavciHjzAuwMK8MbZkeMxdyODziG8=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.v02wvgnobf.wasm",
        "integrity": "sha256-wf4Mem4BwYSNvD++fwbDWW9CvDOsIoM/bIr9gifJ84E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.Xml.wasm",
        "name": "System.Xml.o33u56xp8u.wasm",
        "integrity": "sha256-NLiKVnu4dUcgEOu/femz2gVRSKEAwVJx/vRGH5YP85A=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.gxdw562h4s.wasm",
        "integrity": "sha256-fJTEe+AJSqzoKKoWR+++D3dW9xKdl4LEhs0MqDbTFKg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "WindowsBase.wasm",
        "name": "WindowsBase.itp3e5i1h2.wasm",
        "integrity": "sha256-ivi6qYvTKpjzQi347fhcWxpiB13LgAT47VztIuMy2as=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "mscorlib.wasm",
        "name": "mscorlib.k0eqaq9do2.wasm",
        "integrity": "sha256-dIsoyx8EZQo5YO7cmmymxrQLo1hMC4YIVdLJOMBnYRU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.xl4f7m8snf.wasm",
        "integrity": "sha256-FcRCeGTNGbxd840FOZNuCzMPx8AByqEW+3+ATQ6kzO0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Wasm.MetadataUpdater.wasm",
        "name": "Uno.Wasm.MetadataUpdater.fn3n2cj1xe.wasm",
        "integrity": "sha256-O9TYLCOld/JUCVTxxR3Hu/dykdy4E12jHMFWzYBG72E=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "MyUnoApp.wasm",
        "name": "MyUnoApp.2p5hrruxxx.wasm",
        "integrity": "sha256-6mFhnF8lh6TBYpAfMwxHaMm/s4m16j7TNzBBcCp1Krw=",
        "cache": "force-cache"
      }
    ],
    "pdb": [
      {
        "virtualPath": "Uno.Foundation.pdb",
        "name": "Uno.Foundation.zqc6zimhvj.pdb",
        "integrity": "sha256-9U7S4oGcelvgg6Le8tPghyPFJ8gEVBXf+02qAPF5/TQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.pdb",
        "name": "Uno.aw45270wmh.pdb",
        "integrity": "sha256-CmbDm2DTViAaH7KfAtYdPIDQbpAx+otUMksmpFIwdy0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Dispatching.pdb",
        "name": "Uno.UI.Dispatching.nuzxarrbn8.pdb",
        "integrity": "sha256-QcYtK7BOmxaxpAp3AS7RABWU8gY1OksSSGOB02Sjy5Y=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Composition.pdb",
        "name": "Uno.UI.Composition.u78a8rstu2.pdb",
        "integrity": "sha256-5mOz0AcBgKXx8wdvCE+4iXTYiCn06dXvMCcVM95h9fM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.pdb",
        "name": "Uno.UI.ax6shhryw0.pdb",
        "integrity": "sha256-DtdXMs6nK1Qsm5hBMeazxaJ1+0p7Ez3GzA4CWZbGf8I=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.FluentTheme.pdb",
        "name": "Uno.UI.FluentTheme.w9glkg6oew.pdb",
        "integrity": "sha256-pHm4Z75UYBxwcc48IBIlPU1v/d/dmegXMcEMRhoWUIU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.FluentTheme.v1.pdb",
        "name": "Uno.UI.FluentTheme.v1.jnww2p4znf.pdb",
        "integrity": "sha256-sUxJDK4RSTuSeKBFcXpoLQOtidU8JCog+U6acHHnOyM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.FluentTheme.v2.pdb",
        "name": "Uno.UI.FluentTheme.v2.vnsyfsmaqm.pdb",
        "integrity": "sha256-Zfsg3uPaoNz2JV1rOgcNYC8EuJEC2QEHiNMqnqCV3Rg=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Toolkit.pdb",
        "name": "Uno.UI.Toolkit.dbx0lq6qpa.pdb",
        "integrity": "sha256-qWXN9LGb+31lzpfUvdd8+vYQdhipAvKKIiEQu0fyLAU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Xaml.pdb",
        "name": "Uno.Xaml.f2pj9284fu.pdb",
        "integrity": "sha256-WYktpuxQ75DjmThJG+RwybSSTWC5nb6SBo+KvYchGLA=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.Lottie.pdb",
        "name": "Uno.UI.Lottie.xugujqkk7t.pdb",
        "integrity": "sha256-2YtWmwkFiJl7fwAEeAme9vs4+DLzqf2nR/aE1J2BJb0=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.UI.RemoteControl.pdb",
        "name": "Uno.UI.RemoteControl.28415y7a4d.pdb",
        "integrity": "sha256-XleFa4rIRAbkhWqszGJa3GWyv6bClUJ1Q+ZWfCkRMaM=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "SkiaSharp.Views.Windows.pdb",
        "name": "SkiaSharp.Views.Windows.j8mk8iodvp.pdb",
        "integrity": "sha256-bQIft2q55vnk4O0gSsk/2qYfBRkevTIX6FIYaZ9kWoU=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "Uno.Wasm.MetadataUpdater.pdb",
        "name": "Uno.Wasm.MetadataUpdater.z7ntmjgqa4.pdb",
        "integrity": "sha256-z5zwmykqKO1+LkglxBY8c5VGQGTmLa/4qig9REQozdQ=",
        "cache": "force-cache"
      },
      {
        "virtualPath": "MyUnoApp.pdb",
        "name": "MyUnoApp.itndnm71aj.pdb",
        "integrity": "sha256-KgdRe3k1QzKZG1c1OLBgO75/xZDMuIUAgQpd9ERXCEc=",
        "cache": "force-cache"
      }
    ],
    "satelliteResources": {
      "cs": [
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.1cv24ry2wv.wasm",
          "integrity": "sha256-34SvwD/2t8GfdPXQ3JwNXlEuC5oskFDEilS6yxdZ7FA=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.3qbbp0kiwe.wasm",
          "integrity": "sha256-5XbBIwq2UXT2ad9ONFXru6RC6P02p6UkgZDxYF8vk8I=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.io0sizosi6.wasm",
          "integrity": "sha256-js+3OnFqowCIC69QWuG8/aedwOdAsVZLIEL+t6HpeO8=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.hjkjftutdo.wasm",
          "integrity": "sha256-Q+4uMi54asuDdmrLmQd70AoWPAVBTq3DaEijpboSFDY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.ph1t9cx6cm.wasm",
          "integrity": "sha256-zZU1t+SaYE0RL46lE3xPn0RVf9FIJ8N81T2OyA7/w0k=",
          "cache": "force-cache"
        }
      ],
      "de": [
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.xqhl1yk82i.wasm",
          "integrity": "sha256-5wm0WR5mP/eyJz68rHVNDgqmgYAPdwPeMxRCdFUzB3o=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.5ohs2r80mc.wasm",
          "integrity": "sha256-dVblk2sww/UH37Z2VzYs7vIXI/FWtp1YUqXZ6xGb1jc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.ojwo5pzeqb.wasm",
          "integrity": "sha256-xJNoCV9Not1dfDYtKYWQjNo6hWWjcad0yzg777e//KM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.uy3m6ojqxv.wasm",
          "integrity": "sha256-amyZPNAZEfWf4EvYS57aIUq/4KABHkM8ehkeQ/8+iEg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.bns5vifzxb.wasm",
          "integrity": "sha256-uSjQdir/TTrJunSHTG8XwCr1LPrxeNsCU6zDKcjqzuY=",
          "cache": "force-cache"
        }
      ],
      "es": [
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.kxqfu5153g.wasm",
          "integrity": "sha256-6GfF6aSe/GuDOwY43vCuLoWHwUTrKCdIlhbHKJuvOxM=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.60kc1717bq.wasm",
          "integrity": "sha256-Rt0SjN00wjVLRb0vrUKl+V8WnLnlp8R2DuH3cKP1QwE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.t4sk73wtay.wasm",
          "integrity": "sha256-k6Gs2SXY2veNoPppgcNVb7C8/xNTJcHZShcFNdAzImY=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.6ha5og6a4k.wasm",
          "integrity": "sha256-tgPu3F5Vlx+wCJaK6d81ntC68fjaSTUAnXT9OQFLLgU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.bxg1vp865p.wasm",
          "integrity": "sha256-EXED+w8sN1Ci10ypWZef7ErANGdICmCsBPN2jMNqnj0=",
          "cache": "force-cache"
        }
      ],
      "fr": [
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.6xue6lh2ws.wasm",
          "integrity": "sha256-9qHPTTk6D4j6HINRSzrzHACWm09Px2Das2Ln767JeAU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.y2a5qx2fqx.wasm",
          "integrity": "sha256-SiA/TdCtPvlZoKjIV2D7brfgUEcIaX3K77Ly7BkACh0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.b67nawy4ww.wasm",
          "integrity": "sha256-7ZHRW7HnCC3OkjygzJCBHc5lgDiS0t1xQOBVQ6kTxks=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.kkh5qu30uo.wasm",
          "integrity": "sha256-NKqoW7PdRMYxiI71az965UOeNA3yP1aE+9nPpTfzh2E=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.uev4e67ubz.wasm",
          "integrity": "sha256-+vFpxXxqO1H7AgqkJGqv8aW48eQVCYYnWn6yvLm6kRE=",
          "cache": "force-cache"
        }
      ],
      "it": [
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.u06y04l388.wasm",
          "integrity": "sha256-/vIBnn7DWQdlgp8iZIgH+a7tmmpoMSBi3CKaQlYeMy0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.3ldrgbnbyy.wasm",
          "integrity": "sha256-h8ljwy6B7CE8w6lpxKyqAZcJEb8fMilGHXyj6rKc5TQ=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.t27er1f5ij.wasm",
          "integrity": "sha256-qxVgPABzEFv1XmCLNQdly8zBm9IWiHgReP8xgDBM2tc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.17y8viaxvx.wasm",
          "integrity": "sha256-47k/a9Ie70WjYBWyobgFbQ58QtP70CNl8Kn85sPSzzw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.mvu2xlrl3p.wasm",
          "integrity": "sha256-0i1oDiSln0YmU30DizxCQVVeCgNmZYhV87cmGIkgRHA=",
          "cache": "force-cache"
        }
      ],
      "ja": [
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.g0bhiasu77.wasm",
          "integrity": "sha256-ALRHKMKgwRftVTkOXZzQ4ejamG2zklC7cjECmTSOz9Y=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.toacmuh3ny.wasm",
          "integrity": "sha256-42DqW5m6p0+kr+DPyoQWGAfvxxPkyC9rR401ckRD4Tk=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.81i8q6wiu9.wasm",
          "integrity": "sha256-tECbEieJZSjJnCC8xfjiZTGqsB6XUVm7hf2OeDz9So4=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.lar4bvpy0h.wasm",
          "integrity": "sha256-LTqIHgVTifdFeMe0iMY1UQdjPVBC1G7U/MnCdzcUBJE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.ig4afb2hdc.wasm",
          "integrity": "sha256-EhC6GQzr3Qwrhy33XctAAsxPtNrKUJhNTHgs6KNCvaw=",
          "cache": "force-cache"
        }
      ],
      "ko": [
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.bqi83fnthp.wasm",
          "integrity": "sha256-LcDQqGxMWG63Q3WJ7CAC0Uek3oF87+zmuK/UGK1+mso=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.qpd1frohe9.wasm",
          "integrity": "sha256-UolR4VcdLXatGBs8ScDOLeI0UUxamhpnw1/9lunSeHg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.9lb296hkt1.wasm",
          "integrity": "sha256-LTgGu+e3Q0B/mcVvJmoNQBsa/zu0RE4QxjLK2kFAF8w=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.lj8ye1gbhv.wasm",
          "integrity": "sha256-wZE0WIRcijA5Jv4e0c8D+zDECq3PvFghtJTfa4UPXTI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.mjgqw0vlqu.wasm",
          "integrity": "sha256-vtlYl6fXA+PFyQPiIaTW/NQRurYKxQwpYqSpfof4vlU=",
          "cache": "force-cache"
        }
      ],
      "pl": [
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.59od22gne5.wasm",
          "integrity": "sha256-9/nyksnE29XFHqu/aaXKfk0/wrN0C6CnYXxWRciE6ng=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.2hyuh0kcec.wasm",
          "integrity": "sha256-Bvs/1H4hBVlFWhSDaQW+URKu9GXEH6vqirLfS9uWclg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.6zkwbc5j6u.wasm",
          "integrity": "sha256-ziInK0qD0SfGD4fq3Qn67NYNro1EXXIxvmFrK2edytE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.mk9c0l3h8j.wasm",
          "integrity": "sha256-imDUd60TjT+Phn4cxST1kUIXjyIqtNUIpd9pZnpFp7Q=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.9jle3u5i22.wasm",
          "integrity": "sha256-hU+sS2cMnMkR7P8rkwWtH9IR6CtBd7LX6CMYGLcxRs0=",
          "cache": "force-cache"
        }
      ],
      "pt-BR": [
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.4lz192yc43.wasm",
          "integrity": "sha256-aHvo1hBv4Ss0rJCAxqS0qvk5VinpRK4PUs7neYb5IFI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.g3gx17zd9z.wasm",
          "integrity": "sha256-vFwJ4nYUn2g2MYedAYRf2wiGrqplNf2c+rw5e88zIrE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.s7l83o59i9.wasm",
          "integrity": "sha256-aPCDLesCr3A3OiSb6k+yrumH6bPirFmFU4V6IO/TjXE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.rnmw4cthyn.wasm",
          "integrity": "sha256-t34i75b2ZLVwR92uwG8r5UokYZCuQdbIdWuiV5Pef+c=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.ohqajzwtxl.wasm",
          "integrity": "sha256-ZLxYGEG9CaD5C/OWJ9ZHGAtgqyEsjJ3YsvxY35sevB4=",
          "cache": "force-cache"
        }
      ],
      "ru": [
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.njyjrdvwt0.wasm",
          "integrity": "sha256-XYs7g7QDoQ2iFmc8rOscSCyxTB1LOyO5KTImSfUcjEI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.eldhfvjvbg.wasm",
          "integrity": "sha256-Epq5y57PnTlpQQ9oyX/vhudJP0fZ5fRiwzGau1p3L7s=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.fo0h2lathh.wasm",
          "integrity": "sha256-UUzI61l8v7jGDre1TZDPPVjAXCvIjiTwOTLSd3F4jRw=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.wrsgpfwn1w.wasm",
          "integrity": "sha256-VPVIkL5SIlHS5D3SVrPQ/yyejE7mLWxIEla1374VSUc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.w7mwyyv7v1.wasm",
          "integrity": "sha256-fBLy/EY7P74EvztShOI7ksl6Tm7TaFthzuOaXurWHBk=",
          "cache": "force-cache"
        }
      ],
      "tr": [
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.7jnee19pe3.wasm",
          "integrity": "sha256-XU++VdrsiQv3nWqPkmIU0troHrC0ZDgLRZ4WVKMuj7w=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.n4vs52qez3.wasm",
          "integrity": "sha256-lxnYrZXNIk8OWvncxWsa4v7070iOl00vhNveGLD7GYg=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.krk0d49thx.wasm",
          "integrity": "sha256-4AkerkP8fUDXU+/Vk7rjEdhyrfI3p5yfYdcQWr2jM54=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.vexrskdxzo.wasm",
          "integrity": "sha256-GaL8D59esi6hwtBgUid8dE3FWAh11RfUywbdZLG0iSI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.be4f0vfn76.wasm",
          "integrity": "sha256-A1BtNU/IkJQ+ZFM0G9vtIjqJNUEMOjEUftPu0ym1NWg=",
          "cache": "force-cache"
        }
      ],
      "zh-Hans": [
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.ti0brpfx2e.wasm",
          "integrity": "sha256-ZQa4xYNsB6wF0RzahIKW/noEAvz5ARv/whlj7o+npBc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.uzbwcs7khb.wasm",
          "integrity": "sha256-uvAn04/TB+93qSSe4VGCPo1ZHXWLUpWDX4CXZSKkxU0=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.3aqjt1zqrj.wasm",
          "integrity": "sha256-NWMXVr41Sv7wIpJ6l+ZkUPzAhcj8lQZOFyzYB3tNtOE=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.pfobbq0djk.wasm",
          "integrity": "sha256-i9y8X6WMRgGDIGi5SHOaa5FM2PUj+DtiW9yzDLIz6Lc=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.78hkzh4can.wasm",
          "integrity": "sha256-N7uB/YsPMqteEIgRisE/jYmLiYlXoOF3COhSLGW5qBA=",
          "cache": "force-cache"
        }
      ],
      "zh-Hant": [
        {
          "virtualPath": "System.ServiceModel.Http.resources.wasm",
          "name": "System.ServiceModel.Http.resources.7ohut92yxa.wasm",
          "integrity": "sha256-CaoXuv3mfGKbULJhWMz451H2CFeBvEm8FDAr88XgVjI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetFramingBase.resources.wasm",
          "name": "System.ServiceModel.NetFramingBase.resources.9kt49gjytu.wasm",
          "integrity": "sha256-qQf8YftGHJRzzPHTd9NYmzWEavfxOPSqfcH5usv7JUI=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.NetTcp.resources.wasm",
          "name": "System.ServiceModel.NetTcp.resources.27r4tq4enk.wasm",
          "integrity": "sha256-rgea1lu8lnFXHNNrdwGl4NGFRulqkcNRF0+EhU4ujkU=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.33fbwhuzx7.wasm",
          "integrity": "sha256-H8X0vvEQA4QOFZsof6WcWcXb8GrtRDuC3RzDaAyeRro=",
          "cache": "force-cache"
        },
        {
          "virtualPath": "System.Web.Services.Description.resources.wasm",
          "name": "System.Web.Services.Description.resources.g6sq3y3er2.wasm",
          "integrity": "sha256-KGzRIwQ4LRE/gFjRsIkDBWX86ovf1ChLRRe+cS26fx4=",
          "cache": "force-cache"
        }
      ]
    },
    "libraryInitializers": [
      {
        "name": "_content/Microsoft.DotNet.HotReload.WebAssembly.Browser/Microsoft.DotNet.HotReload.WebAssembly.Browser.99zm1jdh75.lib.module.js"
      }
    ],
    "modulesAfterConfigLoaded": [
      {
        "name": "../_content/Microsoft.DotNet.HotReload.WebAssembly.Browser/Microsoft.DotNet.HotReload.WebAssembly.Browser.99zm1jdh75.lib.module.js"
      }
    ]
  },
  "debugLevel": -1,
  "globalizationMode": "sharded",
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Is_System_Dynamic_DynamicObject_Available": false,
        "Is_System_Dynamic_ExpandoObject_Available": false,
        "Windows.ApplicationModel.DataTransfer.DragDrop.ExternalSupport": true,
        "Uno.UI.EnableDynamicDataTemplateUpdate": true,
        "MVVMTOOLKIT_ENABLE_INOTIFYPROPERTYCHANGING_SUPPORT": true,
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true,
        "System.Threading.Thread.EnableAutoreleasePool": false
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
