<!-- .slide: data-background="url(images/slides/kitten-little.jpg) no-repeat bottom left" data-background-size="250px" -->
- Full text search : match query

```
GET _search
{
    "query": {
        "match": {
           "artist": "Mac Miller"
        }
    }
}
```

- Exact term search : term query

```
GET _search
{
    "query": {
        "term": {
           "artist": {
              "value": "Mac Miller"
           }
        }
    }
}
```
