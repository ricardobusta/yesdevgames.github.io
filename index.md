---
layout: default
---

{% for post in paginator.posts %}

<article class="post" itemscope itemtype="http://schema.org/BlogPosting">
    <div class="main-content" itemprop="articleBody">
      <a name="blog{{ forloop.index }}"></a>
      <header class="post-header">
      <a class="post-link" href="{{ post.url | prepend: site.baseurl }}"><h1 class="post-title" itemprop="name headline">{{ post.title }}</h1> </a>
      </header>

	  {{ post.content }}

      <p class="post-meta" style="text-align: right; color: rgb(152,152,152);"><time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished">
        {{ post.date | date: "%d-%m-%Y" }}
        {% if post.time %}
        , at {{ post.time }}
        {% endif %}
	      </time>{% if page.author %} • <span itemprop="author" itemscope itemtype="http://schema.org/Person"><span itemprop="name">{{ post.author }}</span></span>{% endif %} • <label for="our-popup-{{ forloop.index }}"><i class="fa fa-share"></i> Link / Compartilhar</label></p>
    <div>
      Tags: 
      {% for tag in post.tags %}
        <span class="post-tag">{{ tag }}</span>
      {% endfor %}
    </div>
  </div>
</article>

<div class="post-separator"></div>

{% endfor %}

<div class="pagination" style="text-align: center;">

  {% if paginator.next_page %}
      <h2><a href="{{ paginator.next_page_path }}" class="next">next page</a></h2>
  {% endif %}

  {% if paginator.previous_page %}
    <h2><a href="{{ paginator.previous_page_path }}" class="previous">previous page</a></h2>
  {% endif %}

</div>
