import{_ as e,c as o,o as t,a}from"./app.7001bd85.js";const f='{"title":"Enable latex-export-logging in org-mode","description":"","frontmatter":{"title":"Enable latex-export-logging in org-mode","date":"2018-05-10T23:50:12.000Z","tags":["emacs","code","latex"],"author":"dyzdyz010","collection":"productivity"},"headers":[],"relativePath":"posts/productivity/2018/enable-latex-export-logging-in-org-mode.md"}',r={},s=a("<p>Emacs version: GNU Emacs 26.1(Also works in Emacs 24 or maybe even in earlier versions)</p><p>By default, when exporting latex and PDF file from emacs org-mode, log files are removed when the process finishes, you may want to reserve it.</p><p>To make emacs stop removing log files, do as below:</p><p><code>M-x</code> -&gt; <code>customize-variable</code>, <code>RET</code> -&gt; <code>org-latex-remove-logfiles</code></p><p>By default this variable is set to <code>true</code>, means log files are removed automatically, then you just need to toggle it to <code>false</code>, save, restart Emacs, and you&#39;re good to go \u{1F600}</p>",5),i=[s];function c(n,l,d,g,p,m){return t(),o("div",null,i)}var u=e(r,[["render",c]]);export{f as __pageData,u as default};
