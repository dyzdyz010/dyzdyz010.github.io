import{_ as n,c as a,o as s,a as e}from"./app.7001bd85.js";const h='{"title":"Use Hugo with Github Pages and CircleCI","description":"","frontmatter":{"title":"Use Hugo with Github Pages and CircleCI","date":"2019-03-28T14:04:19.000Z","author":"dyzdyz010","tags":["tutorial","web","hugo","circleci"],"collection":"tutorials"},"headers":[],"relativePath":"posts/tutorials/2019/hugo-with-github-pages.md"}',t={},o=e(`<p>This tutorial is to teach you how to make youre own hugo-generated static site served by Github Pages, within a single repo.</p><h1 id="prerequisites" tabindex="-1">Prerequisites <a class="header-anchor" href="#prerequisites" aria-hidden="true">#</a></h1><ol><li>Github &amp; CircleCI account</li><li>Newly-generated SSH key pair for safety reasons(<a href="https://circleci.com/docs/2.0/add-ssh-key/" target="_blank" rel="noopener noreferrer">see here</a>)</li><li>Hugo installed locally</li></ol><h1 id="dive-in" tabindex="-1">Dive in <a class="header-anchor" href="#dive-in" aria-hidden="true">#</a></h1><p>Generate site source with <code>hugo</code> command:</p><div class="language-bash"><pre><code>hugo new site <span class="token operator">&lt;</span>SITE_NAME<span class="token operator">&gt;</span>
</code></pre></div><p>Create a repo for your site: <code>&lt;SITE_NAME&gt;.github.io</code><strong>(Be aware: this tutorial uses <em>User/Organization Pages</em> rather than <em>Project Pages</em>, <a href="https://help.github.com/en/articles/user-organization-and-project-pages" target="_blank" rel="noopener noreferrer">see here</a>)</strong>, clone it, and create a new branch called <code>source</code>(whatever you like):</p><div class="language-bash"><pre><code><span class="token function">git</span> clone https://github.com/<span class="token operator">&lt;</span>USERNAME/ORGANIZATION<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>SITE_NAME<span class="token operator">&gt;</span>.github.io.git
<span class="token builtin class-name">cd</span> <span class="token operator">&lt;</span>SITE_NAME<span class="token operator">&gt;</span>.github.io
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> <span class="token builtin class-name">source</span>
</code></pre></div><p>Copy everything from the folder created by hugo above into repo:</p><div class="language-bash"><pre><code><span class="token function">mv</span> <span class="token punctuation">..</span>/<span class="token operator">&lt;</span>SITE_NAME<span class="token operator">&gt;</span>/* <span class="token builtin class-name">.</span>
</code></pre></div><p>Go to <a href="https://circleci.com" target="_blank" rel="noopener noreferrer">circleci.com</a> and add your &lt;SITE_NAME&gt;.github.io project. Goto <code>Project Settings</code>, under <code>SSH Permissions</code>, add SSH private key you just generated(<a href="https://circleci.com/docs/2.0/add-ssh-key/" target="_blank" rel="noopener noreferrer">see here</a>), copy the <code>Fingerprint</code> for use below.</p><p>Go to Github your project settings, under <code>Deploy Key</code>, add SSH public key you just generated.</p><p>Create config file for CircleCI:</p><div class="language-bash"><pre><code><span class="token function">mkdir</span> .circleci
<span class="token builtin class-name">cd</span> .circleci
<span class="token function">touch</span> config.yml
</code></pre></div><p><code>config.yml</code>(Edit it with your own information):</p><div class="language-yaml"><pre><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">2.0</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
        <span class="token key atrule">docker</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> felicianotech/docker<span class="token punctuation">-</span>hugo<span class="token punctuation">:</span>latest
        <span class="token key atrule">working_directory</span><span class="token punctuation">:</span> ~/&lt;SITE_NAME<span class="token punctuation">&gt;</span>.github.io
        <span class="token key atrule">steps</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">add_ssh_keys</span><span class="token punctuation">:</span>
                <span class="token key atrule">fingerprints</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> <span class="token string">&quot;&lt;FINGERPRINT_YOU_JUST_COPIED&quot;</span>
            <span class="token punctuation">-</span> checkout
            <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span>
                <span class="token key atrule">name</span><span class="token punctuation">:</span> Get current site
                <span class="token key atrule">working_directory</span><span class="token punctuation">:</span> ~/
                <span class="token key atrule">command</span><span class="token punctuation">:</span> git clone <span class="token punctuation">-</span>b master git@github.com<span class="token punctuation">:</span>&lt;USERNAME/ORGANIZATION<span class="token punctuation">&gt;</span>/&lt;SITE_NAME<span class="token punctuation">&gt;</span>.github.io.git public
            <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span>
                <span class="token key atrule">name</span><span class="token punctuation">:</span> Generate site
                <span class="token key atrule">working_directory</span><span class="token punctuation">:</span> ~/&lt;SITE_NAME<span class="token punctuation">&gt;</span>.github.io
                <span class="token key atrule">command</span><span class="token punctuation">:</span> HUGO_ENV=production hugo <span class="token punctuation">-</span>d ~/public
            <span class="token punctuation">-</span> <span class="token key atrule">deploy</span><span class="token punctuation">:</span>
                <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to Github Pages
                <span class="token key atrule">working_directory</span><span class="token punctuation">:</span> ~/public
                <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
                    git config credential.helper &#39;cache --timeout=120&#39;
                    git config user.email &quot;&lt;YOUR_EMAIL&gt;&quot;
                    git config user.name &quot;Deployment Bot&quot;
                    git add .
                    git commit --allow-empty -m &quot;Trigger deployment&quot;
                    git push -q git@github.com:&lt;USERNAME/ORGANIZATION&gt;/&lt;SITE_NAME&gt;.github.io.git master</span>

<span class="token key atrule">workflows</span><span class="token punctuation">:</span>
  <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">main</span><span class="token punctuation">:</span>
    <span class="token key atrule">jobs</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">build</span><span class="token punctuation">:</span>
        <span class="token key atrule">filters</span><span class="token punctuation">:</span>
          <span class="token key atrule">branches</span><span class="token punctuation">:</span>
            <span class="token key atrule">only</span><span class="token punctuation">:</span> source
</code></pre></div><p>Now push your files to Github:</p><div class="language-bash"><pre><code><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;first commit&quot;</span>
<span class="token function">git</span> push origin <span class="token builtin class-name">source</span>
</code></pre></div><p>For every time you push to the <code>source</code> branch, CircleCI will always trigger a hugo generation to the <code>master</code> branch, where the site&#39;s static file generated by Hugo is placed.</p><p>Wait for CircleCI&#39;s job done, then visit <code>&lt;SITE_NAME&gt;.github.io</code> and enjoy!</p>`,20),p=[o];function c(i,l,r,u,k,d){return s(),a("div",null,p)}var y=n(t,[["render",c]]);export{h as __pageData,y as default};
