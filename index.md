---
layout: default
title: Home
---

# Philosophy Dialogues

Welcome to a live archive of philosophical conversations exploring determinism, consciousness, and the search for meaning.  
Each entry is a dialogue — a record of curiosity, reason, and unfolding thought.

## Conversations
{% for post in site.conversations %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}
