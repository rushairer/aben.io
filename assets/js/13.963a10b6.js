(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{479:function(a,s,e){"use strict";e.r(s);var t=e(0),r=Object(t.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("podman")]),a._v(" run "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--replace")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-dt")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--name")]),a._v(" certbot "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-p")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("80")]),a._v(":80/tcp "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-p")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("443")]),a._v(":443/tcp "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$(")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("pwd")]),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v(")")])]),a._v("/nginx_secrets:/etc/letsencrypt "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$(")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("pwd")]),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v(")")])]),a._v("/user_conf.d:/etc/nginx/user_conf.d:ro "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-v")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$(")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("pwd")]),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v(")")])]),a._v("/www:/www:ro "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("--env")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("CERTBOT_EMAIL")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("me@aben.io io84.com/nginx-certbot:alpine\n\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])])])}),[],!1,null,null,null);s.default=r.exports}}]);