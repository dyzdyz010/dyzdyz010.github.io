import{_ as a,c as t,b as e,a as n,o,r as p}from"./app.7001bd85.js";const A='{"title":"MMO Server From Scratch(5) - Scene Server(2) - AOI - \u76D1\u7763\u6811","description":"","frontmatter":{"title":"MMO Server From Scratch(5) - Scene Server(2) - AOI - \u76D1\u7763\u6811","date":"2022-10-22T08:47:13.000Z","author":"dyzdyz010","tags":["game","mmo","server","elixir"],"collection":"MMO Server From Scratch","draft":false},"headers":[{"level":2,"title":"NIF - Elixir \u90E8\u5206","slug":"nif-elixir-\u90E8\u5206"},{"level":2,"title":"AOI \u8FDB\u7A0B\u7ED3\u6784\u8BBE\u8BA1","slug":"aoi-\u8FDB\u7A0B\u7ED3\u6784\u8BBE\u8BA1"},{"level":3,"title":"\u76EE\u524D\u8003\u8651\u5230\u7684\u95EE\u9898","slug":"\u76EE\u524D\u8003\u8651\u5230\u7684\u95EE\u9898"},{"level":2,"title":"\u63A5\u4E0B\u6765\u7684\u5DE5\u4F5C","slug":"\u63A5\u4E0B\u6765\u7684\u5DE5\u4F5C"}],"relativePath":"posts/mmo-server-from-scratch/2022/20221016-mmo-server-from-scratch(5)-scene-server-aoi-supervision-tree.md"}',c={},u=n(`<p>\u4ECA\u5929\u6765\u786E\u5B9A <code>NIF</code> \u7684 <code>Elixir</code> \u63A5\u53E3\u90E8\u5206\u4EE5\u53CA\u76F8\u5E94\u76D1\u7763\u6811\u7684\u7ED3\u6784\u3002</p><h2 id="nif-elixir-\u90E8\u5206" tabindex="-1">NIF - Elixir \u90E8\u5206 <a class="header-anchor" href="#nif-elixir-\u90E8\u5206" aria-hidden="true">#</a></h2><p>\u5728<a href="./20221016-mmo-server-from-scratch(4)-scene-server-aoi-data-structure.html">\u4E0A\u4E00\u7BC7\u6587\u7AE0</a>\u4E2D\u6211\u7B80\u8981\u5B9E\u73B0\u4E86\u5750\u6807\u7BA1\u7406\u7CFB\u7EDF <code>coordinate_system</code> \u7684 <code>Rust</code> \u90E8\u5206\uFF0C\u9664\u6B64\u4E4B\u5916\u8FD8\u9700\u8981\u5B83\u7684\u53E6\u4E00\u534A\uFF0C<code>Elixir</code> \u63A5\u53E3\u3002</p><p>\u8FD9\u4E2A\u8FC7\u7A0B\u5341\u5206\u7B80\u5355\u3002<code>mix rustler.new</code> \u547D\u4EE4\u751F\u6210 <code>Rust</code> \u4EE3\u7801\u65F6\uFF0C\u4F1A\u5728 <code>README.md</code> \u6587\u4EF6\u4E2D\u5199\u597D\u6A21\u677F\uFF1A</p><div class="language-elixir"><pre><code><span class="token keyword">defmodule</span> <span class="token module class-name">SceneServer</span><span class="token punctuation">.</span><span class="token module class-name">Native</span><span class="token punctuation">.</span><span class="token module class-name">SortedSet</span> <span class="token keyword">do</span>
  <span class="token keyword">use</span> <span class="token module class-name">Rustler</span><span class="token punctuation">,</span> <span class="token attr-name">otp_app:</span> <span class="token atom symbol">:scene_server</span><span class="token punctuation">,</span> <span class="token attr-name">crate:</span> <span class="token string">&quot;coordinate_system&quot;</span>

  <span class="token comment"># When your NIF is loaded, it will override this function.</span>
  <span class="token keyword">def</span> <span class="token function">add</span><span class="token punctuation">(</span>_a<span class="token punctuation">,</span> _b<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token attr-name">do:</span> <span class="token atom symbol">:erlang</span><span class="token punctuation">.</span><span class="token function">nif_error</span><span class="token punctuation">(</span><span class="token atom symbol">:nif_not_loaded</span><span class="token punctuation">)</span>
<span class="token keyword">end</span>
</code></pre></div><p>\u53EF\u4EE5\u770B\u5230\uFF0C\u6211\u53EA\u9700\u8981\u65B0\u5EFA\u4E00\u4E2A <code>.ex</code> \u6587\u4EF6\uFF0C\u5E76\u5C06\u4E0E <code>Rust</code> \u4E2D\u5BF9\u5E94\u7684\u6A21\u5757\u540D\u53CA\u51FD\u6570\u539F\u578B\u5199\u597D\u5373\u53EF\u3002\u6B64\u5904\u6709\u4E24\u4E2A\u5730\u65B9\u9700\u8981\u4E0E <code>Rust</code> \u4EE3\u7801\u5BF9\u5E94\uFF1A</p><ol><li><code>crate:</code> \u53C2\u6570\uFF0C\u9700\u8981\u4E0E <code>Cargo.toml</code> \u6587\u4EF6\u4E2D\u7684 <code>package name</code> \u4E00\u81F4</li><li><code>defmodule \u6A21\u5757\u540D</code>\uFF0C\u9700\u8981\u4E0E <code>lib.rs</code> \u4E2D <code>rustler::init!</code> \u51FD\u6570\u8C03\u7528\u4E2D\u7684\u53C2\u6570\u4E00\u81F4</li></ol><p>\u521B\u5EFA\u597D\u4E4B\u540E\uFF0C\u9700\u8981\u9010\u4E2A\u6DFB\u52A0 <code>Rust</code> \u4EE3\u7801\u4E2D\u7684\u63A5\u53E3\uFF0C\u4F8B\uFF1A</p><div class="language-elixir"><pre><code><span class="token attribute variable">@spec</span> <span class="token function">new_system</span><span class="token punctuation">(</span><span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">::</span> <span class="token punctuation">{</span><span class="token function">atom</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token module class-name">Types</span><span class="token punctuation">.</span><span class="token function">coordinate_system</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token keyword">def</span> <span class="token function">new_system</span><span class="token punctuation">(</span>_set_capacity<span class="token punctuation">,</span> _bucket_capacity<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token attr-name">do:</span> <span class="token function">error</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token attribute variable">@spec</span> <span class="token function">add_item_to_system</span><span class="token punctuation">(</span><span class="token module class-name">Types</span><span class="token punctuation">.</span><span class="token function">coordinate_system</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token function">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">::</span> <span class="token punctuation">{</span><span class="token atom symbol">:ok</span><span class="token punctuation">,</span> <span class="token module class-name">Types</span><span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token punctuation">{</span><span class="token atom symbol">:err</span><span class="token punctuation">,</span> <span class="token function">atom</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token keyword">def</span> <span class="token function">add_item_to_system</span><span class="token punctuation">(</span>_system<span class="token punctuation">,</span> _cid<span class="token punctuation">,</span> _coord<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token attr-name">do:</span> <span class="token function">error</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token attribute variable">@spec</span> <span class="token function">remove_item_from_system</span><span class="token punctuation">(</span><span class="token module class-name">Types</span><span class="token punctuation">.</span><span class="token function">coordinate_system</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token module class-name">Types</span><span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">::</span> <span class="token punctuation">{</span><span class="token atom symbol">:ok</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token punctuation">{</span><span class="token atom symbol">:err</span><span class="token punctuation">,</span> <span class="token function">atom</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token keyword">def</span> <span class="token function">remove_item_from_system</span><span class="token punctuation">(</span>_system<span class="token punctuation">,</span> _item<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token attr-name">do:</span> <span class="token function">error</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token attribute variable">@spec</span> <span class="token function">update_item_from_system</span><span class="token punctuation">(</span><span class="token module class-name">Types</span><span class="token punctuation">.</span><span class="token function">coordinate_system</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token module class-name">Types</span><span class="token punctuation">.</span><span class="token function">item</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">tuple</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">::</span> <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">integer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token function">atom</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token keyword">def</span> <span class="token function">update_item_from_system</span><span class="token punctuation">(</span>_system<span class="token punctuation">,</span> _item<span class="token punctuation">,</span> _new_position<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token attr-name">do:</span> <span class="token function">error</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">defp</span> error<span class="token punctuation">,</span> <span class="token attr-name">do:</span> <span class="token atom symbol">:erlang</span><span class="token punctuation">.</span><span class="token function">nif_error</span><span class="token punctuation">(</span><span class="token atom symbol">:nif_not_loaded</span><span class="token punctuation">)</span>
</code></pre></div><p>\u53EF\u4EE5\u770B\u5230\uFF0C\u6709\u7684\u63A5\u53E3\u6211\u5199\u7684\u7C7B\u578B\u89C4\u683C <code>@spec</code> \u7684\u8FD4\u56DE\u503C\u4E0D\u592A\u5408\u7406\uFF0C\u4F46\u662F\u76EE\u524D\u95EE\u9898\u4E0D\u5927\u3002</p><p>\u6709\u773C\u5C16\u7684\u5C0F\u4F19\u4F34\u53EF\u80FD\u8FD8\u6CE8\u610F\u5230\u4E86 <code>Types.item()</code> \u548C <code>Types.Coordinate_system()</code> \u8FD9\u4E24\u79CD\u7C7B\u578B\uFF0C\u8FD9\u4E9B\u90FD\u662F\u81EA\u5B9A\u4E49\u7C7B\u578B\uFF1A</p><div class="language-elixir"><pre><code><span class="token keyword">defmodule</span> <span class="token module class-name">SceneServer</span><span class="token punctuation">.</span><span class="token module class-name">Native</span><span class="token punctuation">.</span><span class="token module class-name">CoordinateSystem</span><span class="token punctuation">.</span><span class="token module class-name">Types</span> <span class="token keyword">do</span>
  <span class="token attribute variable">@type</span> item <span class="token operator">::</span> <span class="token function">reference</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token attribute variable">@type</span> coordinate_system <span class="token operator">::</span> <span class="token function">reference</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">end</span>
</code></pre></div><p>\u53EF\u4EE5\u770B\u5230\u8FD9\u91CC\u4F7F\u7528\u4E86 <code>reference()</code> \u7C7B\u578B\uFF0C\u8FD9\u4E2A\u5C31\u5F88\u6709\u610F\u601D\u4E86\u3002\u53C2\u8003\u4E0A\u4E00\u7BC7\u6587\u7AE0\u4E2D\u63D0\u5230\u7684 <a href="https://github.com/discord/sorted_set_nif" target="_blank" rel="noopener noreferrer">Discord \u4EE3\u7801</a>\uFF0C\u6211\u7684\u505A\u6CD5\u7167\u642C\u4E86\u8FD9\u4EFD\u4EE3\u7801\uFF0C\u539F\u56E0\u662F <code>Elixir</code> \u4FA7\u5E0C\u671B\u53EA\u4FDD\u6709\u76F8\u5E94\u8D44\u6E90\u7684 <strong>\u5F15\u7528</strong>\uFF0C\u800C\u4E0D\u662F\u5185\u5BB9\u672C\u8EAB\uFF0C\u4F7F\u5F97\u5185\u5BB9\u53EA\u5B58\u5728\u4E8E <code>NIF</code> \u7A7A\u95F4\u5185\uFF0C\u907F\u514D\u5185\u5BB9\u6765\u56DE\u590D\u5236\u4F20\u9012\u9020\u6210\u7684\u8D44\u6E90\u6D6A\u8D39\u548C\u6548\u7387\u964D\u4F4E\u3002</p><p>\u5230\u8FD9\u91CC\uFF0C\u5750\u6807\u7CFB\u7EDF\u7684 <code>NIF</code> \u90E8\u5206\u5DF2\u7ECF\u57FA\u672C\u5B8C\u6210\uFF0C\u53EF\u4EE5\u4F5C\u4E3A\u4E00\u4E2A\u5B8C\u6574\u6A21\u5757\u88AB\u5176\u4ED6\u6A21\u5757\u8C03\u7528\u4E86\u3002</p><h2 id="aoi-\u8FDB\u7A0B\u7ED3\u6784\u8BBE\u8BA1" tabindex="-1">AOI \u8FDB\u7A0B\u7ED3\u6784\u8BBE\u8BA1 <a class="header-anchor" href="#aoi-\u8FDB\u7A0B\u7ED3\u6784\u8BBE\u8BA1" aria-hidden="true">#</a></h2><p>\u521A\u5F00\u59CB\u7684\u60F3\u6CD5\u65F6\uFF0C<code>AOI</code> \u4F5C\u4E3A\u4E00\u4E2A\u5355\u4E00\u8FDB\u7A0B\u5B58\u5728\uFF0C\u63A5\u53D7\u6240\u6709 <code>PlayerCharacter</code> \u8FDB\u7A0B\u7684\u8BF7\u6C42\uFF0C\u5E76\u8FD4\u56DE\u76F8\u5173\u6570\u636E\u3002\u4F46\u662F\u8FD9\u6837\u4E00\u6765\uFF0C<code>PlayerCharacter</code> \u8FDB\u7A0B\u6570\u91CF\u4F17\u591A\uFF0C\u5168\u90E8\u5411\u4E00\u4E2A\u5355\u4E00\u8FDB\u7A0B\u53D1\u9001\u6D88\u606F\uFF0C\u52BF\u5FC5\u4F1A\u9020\u6210 <strong>\u6D88\u606F\u62E5\u5835</strong>\uFF0C\u5BFC\u81F4\u6709\u7684\u73A9\u5BB6\u9700\u8981\u7B49\u5F85\u597D\u4E45\u624D\u80FD\u83B7\u53D6\u8FD4\u56DE\u6570\u636E\uFF0C\u6781\u5927\u5F71\u54CD\u73A9\u5BB6\u6E38\u620F\u4F53\u9A8C\u3002</p><p>\u56E0\u6B64\u6211\u53C8\u60F3\u51FA\u4E86\u53E6\u4E00\u79CD\u65B9\u6CD5\uFF0C\u6BCF\u4E00\u4E2A\u73A9\u5BB6\u5BF9\u5E94\u521B\u5EFA\u4E00\u4E2A <code>AoiItem</code> \u8FDB\u7A0B\uFF0C\u53EA\u4FDD\u6709\u4E0E\u5F53\u524D\u73A9\u5BB6\u6709\u5173\u7684 <code>AOI</code> \u4FE1\u606F\uFF0C\u540C\u65F6 <code>Aoi</code> \u6A21\u5757\u7EF4\u62A4\u4E00\u4E2A <code>\u7528\u6237ID</code> \u5230 <code>AOI\u8FDB\u7A0BID</code> \u7684\u6620\u5C04\uFF0C\u4FBF\u4E8E\u5411\u5176\u4ED6\u73A9\u5BB6\u53D1\u9001 <code>AOI</code> \u6D88\u606F\u3002</p><p>\u8FD9\u6837\u4E00\u6765\uFF0C\u7528\u6237\u7684\u903B\u8F91\u4E0E <code>AOI</code> \u76F8\u5173\u903B\u8F91\u5C31\u5728\u4E00\u5B9A\u7A0B\u5EA6\u4E0A\u89E3\u8026\u4E86\uFF0C<code>AoiItem</code> \u53EA\u4E13\u6CE8\u4E8E\u66F4\u65B0\u81EA\u5DF1\u7684 <code>\u611F\u5174\u8DA3\u5217\u8868</code> \u548C <code>\u6536\u53D1\u5E7F\u64AD\u6D88\u606F</code>\uFF0C\u73A9\u5BB6\u8FDB\u7A0B\u53EA\u9700\u8981\u901A\u77E5\u81EA\u5DF1\u7684 <code>AoiItem</code> \u8FDB\u7A0B\u8FDB\u884C\u5404\u79CD\u64CD\u4F5C\uFF0C\u53D1\u9001\u4E00\u6761\u6D88\u606F\u7684\u4E8B\uFF0C\u5B8C\u5168\u4E0D\u5F71\u54CD\u81EA\u5DF1\u8FDB\u7A0B\u4E2D\u7684\u903B\u8F91\u88AB <code>AOI</code> \u76F8\u5173\u64CD\u4F5C\u963B\u585E\u3002</p><p>\u5982\u6B64\u4E00\u6765\uFF0C\u6574\u4E2A <code>scene_server</code> \u7684\u76D1\u7763\u6811\u76EE\u524D\u53D8\u6210\u4E86\u8FD9\u6837\uFF1A</p>`,19),l=n('<p>\u5176\u4E2D\uFF1A</p><ol><li>AoiManager - \u8D1F\u8D23\u7EF4\u62A4 <code>\u7528\u6237ID</code> \u5230 <code>AOI\u8FDB\u7A0BID</code> \u6620\u5C04\u7684\u6A21\u5757</li><li>AoiItem - \u4E0E <code>PlayerCharacter</code> \u5BF9\u5E94\u7684\u5355\u4E2A\u73A9\u5BB6 <code>AOI</code> \u8FDB\u7A0B\uFF0C\u88AB <code>PlayerCharacter</code> \u6240\u6301\u6709\u3002</li></ol><h3 id="\u76EE\u524D\u8003\u8651\u5230\u7684\u95EE\u9898" tabindex="-1">\u76EE\u524D\u8003\u8651\u5230\u7684\u95EE\u9898 <a class="header-anchor" href="#\u76EE\u524D\u8003\u8651\u5230\u7684\u95EE\u9898" aria-hidden="true">#</a></h3><p><code>AoiItem</code> \u8FDB\u7A0B\u6240\u5E94\u8BE5\u5177\u5907\u7684\u5C5E\u6027\uFF0C\u9664\u4E86 <code>\u7528\u6237ID</code> \u548C <code>\u73A9\u5BB6\u8FDB\u7A0BID</code>\uFF0C\u662F\u5426\u9700\u8981\u540C\u65F6\u6301\u6709 <code>\u7F51\u5173\u8FDE\u63A5\u8FDB\u7A0BID</code>\uFF0C\u5982\u679C <code>AoiItem</code> \u9700\u8981\u5411\u5BA2\u6237\u7AEF\u53D1\u9001\u5468\u56F4\u73A9\u5BB6\u66F4\u65B0\u4FE1\u606F\u7684\u65F6\u5019\uFF0C\u662F\u7ECF\u8FC7 <code>\u73A9\u5BB6\u8FDB\u7A0B</code>\uFF0C\u8FD8\u662F\u76F4\u63A5\u53D1\u5F80 <code>\u7F51\u5173\u8FDE\u63A5\u8FDB\u7A0B</code>\uFF1F\u8FD9\u91CC\u6211\u8FD8\u6CA1\u6709\u60F3\u6E05\u695A\uFF0C\u5982\u679C\u76F4\u63A5\u53D1\u5F80\u7F51\u5173\u7684\u8BDD\uFF0C\u6301\u6709 <code>\u7F51\u5173\u8FDE\u63A5\u8FDB\u7A0BID</code> \u662F\u5426\u4F1A\u9020\u6210\u6570\u636E\u4E00\u81F4\u6027\u95EE\u9898\uFF1F\u76EE\u524D\u4E0D\u5F97\u800C\u77E5\u3002</p><h2 id="\u63A5\u4E0B\u6765\u7684\u5DE5\u4F5C" tabindex="-1">\u63A5\u4E0B\u6765\u7684\u5DE5\u4F5C <a class="header-anchor" href="#\u63A5\u4E0B\u6765\u7684\u5DE5\u4F5C" aria-hidden="true">#</a></h2><p>\u4E0B\u4E00\u6B65\u5BF9 <code>AOI</code> \u8FDB\u7A0B\u6811\u7684\u521D\u59CB\u5316\u6D41\u7A0B\u8FDB\u884C\u5206\u6790\u548C\u5B9E\u73B0\uFF0C\u540C\u65F6\u51C6\u5907\u52A0\u5165\u5BA2\u6237\u7AEF\u53CA <code>Proto</code> \u534F\u8BAE\u5BF9\u5176\u8FDB\u884C\u6D4B\u8BD5\u3002</p>',6);function i(r,k,d,m,_,f){const s=p("Mermaid");return o(),t("div",null,[u,e(s,{id:"mermaid_382ee1e0",graph:"flowchart%20TD%0A%0AA%5BSceneServer%5D%20--%3E%20B%5BInterfaceSup%5D%0AA%20--%3E%20C%5BPlayerSup%5D%0AA%20--%3E%20D%5BAoiSup%5D%0AB%20--%3E%20E%5BInterface%5D%0A%0Asubgraph%20Player%0AC%20--%3E%20F%5BPlayerManager%5D%0AC%20--%3E%20G%5BPlayerCharacterSup%5D%0AG%20--%201%3AN%20--%3E%20J%5BPlayerCharacter%5D%0Aend%0A%0Asubgraph%20AOI%0AD%20--%3E%20H%5BAoiManager%5D%0AD%20--%3E%20I%5BAoiItemSup%5D%0AI%20--%201%3AN%20--%3E%20K%5BAoiItem%5D%0Aend%0A%0AJ%20-.-%3E%20K"}),l])}var h=a(c,[["render",i]]);export{A as __pageData,h as default};
