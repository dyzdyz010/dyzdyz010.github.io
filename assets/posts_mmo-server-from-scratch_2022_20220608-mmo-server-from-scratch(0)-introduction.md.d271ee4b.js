import{_ as e,c as r,o as a,a as t}from"./app.7001bd85.js";const m='{"title":"MMO Server From Scratch(0) - Introduction","description":"","frontmatter":{"title":"MMO Server From Scratch(0) - Introduction","date":"2022-06-08T09:37:13.000Z","author":"dyzdyz010","tags":["game","mmo","server","elixir"],"collection":"MMO Server From Scratch","draft":false},"headers":[{"level":2,"title":"\u5F15\u8A00","slug":"\u5F15\u8A00"},{"level":2,"title":"\u57FA\u672C\u6784\u60F3","slug":"\u57FA\u672C\u6784\u60F3"},{"level":2,"title":"\u9879\u76EE\u5730\u5740","slug":"\u9879\u76EE\u5730\u5740"}],"relativePath":"posts/mmo-server-from-scratch/2022/20220608-mmo-server-from-scratch(0)-introduction.md"}',n={},o=t(`<h2 id="\u5F15\u8A00" tabindex="-1">\u5F15\u8A00 <a class="header-anchor" href="#\u5F15\u8A00" aria-hidden="true">#</a></h2><p>\u4E00\u76F4\u60F3\u505A MMORPG \u6E38\u620F\uFF0C\u4E00\u76F4\u5728\u5B66\u4E60\uFF0C\u5F00\u4E00\u4E2A\u7CFB\u5217\u628A\u670D\u52A1\u5668\u5F00\u53D1\u7684\u8FC7\u7A0B\u8BB0\u5F55\u4E0B\u6765\u3002</p><p>\u4E00\u76F4\u4EE5\u6765\u641C\u7D22\u4E86\u8BB8\u591A\u8D44\u6599\uFF0C\u4F46\u662F\u90FD\u652F\u79BB\u7834\u788E\uFF0C\u7F3A\u5C11\u4E00\u4E2A\u5B8C\u6574\u8BE6\u7EC6\u7684\u6982\u5FF5\uFF0C\u8981\u4E48\u5C31\u662F\u53EA\u5BF9\u67B6\u6784\u6CDB\u6CDB\u800C\u8C08\uFF0C\u8981\u4E48\u5C31\u662F\u5BF9\u67D0\u4E2A\u7B97\u6CD5\u7684\u7EB8\u4E0A\u8C08\u5175\u3002\u6211\u4F5C\u4E3A\u7EAF\u7CB9\u7684\u4E1A\u5916\u4EBA\u58EB\uFF0C\u8FD9\u4E9B\u62BD\u8C61\u7684\u8D44\u6599\u57FA\u672C\u65E0\u6CD5\u5BF9\u6211\u5F62\u6210\u7279\u522B\u91CD\u8981\u7684\u6307\u5BFC\u4F5C\u7528\uFF0C\u6240\u4EE5\u6211\u8FD8\u662F\u5F97\u4EB2\u81EA\u5C1D\u8BD5\u91CD\u6784\u6240\u6709\u5185\u5BB9\u3002</p><h2 id="\u57FA\u672C\u6784\u60F3" tabindex="-1">\u57FA\u672C\u6784\u60F3 <a class="header-anchor" href="#\u57FA\u672C\u6784\u60F3" aria-hidden="true">#</a></h2><p>\u67E5\u9605\u8FC7\u4F17\u591A\u8D44\u6599\u4E4B\u540E\uFF0C\u6211\u5BF9 MMORPG \u670D\u52A1\u5668\u7684\u6574\u4F53\u67B6\u6784\u6709\u4E86\u4E00\u4E2A\u57FA\u672C\u7684\u6982\u5FF5\u3002\u6070\u597D\u4E4B\u524D\u6DF1\u5165\u4E86\u89E3\u4E86\u4E00\u4E0B <code>Erlang</code> \u548C <code>Elixir</code>\uFF0C\u5B83\u4EEC\u5929\u7136\u652F\u6301\u9AD8\u5E76\u53D1\u7684\u7279\u6027\u4EE5\u53CA\u76D1\u7763\u6811\u548C\u5C3D\u65E9\u5D29\u6E83\u7684\u601D\u60F3\u6DF1\u6DF1\u6253\u52A8\u4E86\u6211\uFF0C\u6240\u4EE5\u6211\u51B3\u5B9A\u7528 <code>Elixir</code> \u5B9E\u73B0\u670D\u52A1\u5668\u7684\u5404\u4E2A\u90E8\u4EF6\u3002</p><p>\u6211\u7684\u60F3\u6CD5\u4E2D\u670D\u52A1\u5668\u7684\u5927\u81F4\u67B6\u6784\u5982\u4E0B\uFF1A</p><div class="language-"><pre><code>                                        |----------|
                                        |  client  | x N
                                        |----------|

-----------------------------------------|-----|----------------------------------------------

|-------------|	        |--------------|         |-------------|        |--------------|
| auth_server | x N     | auth_manager | x 1     | gate_server | x N    | gate_manager | x 1
|-------------|         |--------------|         |-------------|        |--------------|

-----------------------------------------|-----|----------------------------------------------


                        |--------------|            |---------------|
                        | agent_server | x N	    | agent_manager | x 1
                        |--------------|            |---------------|

-----------------------------------------|-----|----------------------------------------------


                    |-------------------|            |--------------|
                    | scene_server(TBD) | x N	     | world_server | x 1
                    |-------------------|            |--------------|

-----------------------------------------|-----|----------------------------------------------

                |--------------|         |------------|         |--------------|
                | data_service | x N     | data_store | x N     | data_contact | x 1
                |--------------|         |------------|         |--------------|

-----------------------------------------|-----|----------------------------------------------

                                        |---------------|
                                        | beacon_server | x 1
                                        |---------------|
</code></pre></div><ul><li>auth_server - \u7528\u6237\u767B\u5F55\u6E38\u620F\u7528</li><li>auth_manager - \u7528\u4E8E\u7BA1\u7406 <code>auth_server</code>\uFF0C\u505A\u8D1F\u8F7D\u5747\u8861</li><li>gate_server - \u7F51\u5173\u670D\u52A1\u5668\uFF0C\u7528\u4E8E\u63A5\u53D7\u5BA2\u6237\u7AEF\u7684tcp\u8FDE\u63A5\uFF0C\u52A0\u89E3\u5BC6\u6D88\u606F\uFF0C\u5E76\u8F6C\u53D1\u6D41\u91CF</li><li>gate_manager - \u7528\u4E8E\u7BA1\u7406 <code>gate_server</code>\uFF0C\u505A\u8D1F\u8F7D\u5747\u8861</li><li>agent_server - \u7528\u4E8E\u6267\u884C\u975E\u573A\u666F\u7684\u7528\u6237\u903B\u8F91\uFF08\u5F85\u5B9A\uFF09</li><li>agent_manager - \u7528\u4E8E\u7BA1\u7406 <code>agent_server</code>\uFF0C\u505A\u8D1F\u8F7D\u5747\u8861</li><li>scene_server - \u7528\u4E8E\u6267\u884C\u573A\u666F\u903B\u8F91\uFF0C\u5982 AOI\u3001\u5730\u56FE\u533A\u5757\u7BA1\u7406\u7B49</li><li>world_server - \u7528\u4E8E\u7EDF\u7B79\u7BA1\u7406 <code>scene_server</code> \u7684\u5206\u914D\uFF0C\u4EE5\u53CA\u5904\u7406\u4E16\u754C\u7EA7\u903B\u8F91</li><li>data_server - \u6570\u636E\u5E93\u5185\u5B58\u5B58\u50A8\u8282\u70B9\uFF0C\u7528\u6765\u5BF9\u5176\u4ED6\u670D\u52A1\u5668\u63D0\u4F9B\u670D\u52A1</li><li>data_store - \u6570\u636E\u5E93\u6301\u4E45\u5316\u5B58\u50A8\u8282\u70B9\uFF0C\u7528\u6765\u4FDD\u5B58\u6570\u636E\u5E93\u6570\u636E</li><li>data_contact - \u6570\u636E\u8054\u7CFB\u8282\u70B9\uFF0C\u7528\u6765\u8054\u7CFB\u5404\u4E2A\u6570\u636E\u5E93\u8282\u70B9\uFF0C\u540C\u65F6\u4E3A\u5176\u4ED6\u670D\u52A1\u5668\u5206\u914D\u6570\u636E\u5E93\u8282\u70B9\uFF0C\u505A\u8D1F\u8F7D\u5747\u8861</li><li>beacon_server - \u706F\u5854\u670D\u52A1\u5668\uFF0C\u7528\u4E8E\u8054\u7CFB\u5404\u4E2A\u670D\u52A1\u5668\uFF0C\u4EA4\u6362\u8D44\u6E90\uFF0C\u5728\u8282\u70B9\u95F4\u5EFA\u7ACB\u8FDE\u63A5</li></ul><p><strong>\u6570\u636E\u5E93</strong> \u6253\u7B97\u91C7\u7528 <code>Mnesia</code>\uFF0C\u5929\u7136\u5177\u5907\u96C6\u7FA4\u80FD\u529B\uFF0C\u53EF\u4EE5\u52A8\u6001\u6A2A\u5411\u6269\u5C55\u3002</p><p>\u5BA2\u6237\u7AEF\u8FDE\u63A5\u6253\u7B97\u91C7\u7528 <code>one process per client</code>\uFF0C\u5145\u5206\u5229\u7528 BEAM \u7684\u8F7B\u91CF\u7EA7\u7EBF\u7A0B\u80FD\u529B\uFF0C\u63D0\u9AD8\u903B\u8F91\u7F16\u5199\u6548\u7387\u3002\u5F53\u7136\u8FD9\u4E9B\u90FD\u662F\u6211\u731C\u7684\uFF0C\u5230\u65F6\u5019\u5B9E\u9645\u6027\u80FD\u5982\u4F55\u8FD8\u672A\u53EF\u77E5\u3002</p><h2 id="\u9879\u76EE\u5730\u5740" tabindex="-1">\u9879\u76EE\u5730\u5740 <a class="header-anchor" href="#\u9879\u76EE\u5730\u5740" aria-hidden="true">#</a></h2><p><a href="https://github.com/dyzdyz010/ex_mmo_cluster" target="_blank" rel="noopener noreferrer">https://github.com/dyzdyz010/ex_mmo_cluster</a></p><p>\u56E0\u4E3A\u627E\u4E0D\u5230\u540C\u597D\uFF0C\u53EA\u6709\u6211\u4E00\u4E2A\u4EBA\u5728\u5B64\u519B\u594B\u6218\uFF0C\u4E0D\u77E5\u80FD\u575A\u6301\u591A\u4E45\uFF0C\u4F46\u662F\u5E0C\u671B\u80FD\u6709\u4EBA\u4E00\u8D77\u3002\u4E14\u884C\u4E14\u73CD\u60DC\u5427\u3002</p>`,13),c=[o];function i(s,d,l,_,h,p){return a(),r("div",null,c)}var g=e(n,[["render",i]]);export{m as __pageData,g as default};
