<!-- .slide: data-background="url(images/slides/kitten-little.jpg) no-repeat bottom left" data-background-size="250px" -->
#### Full text search
```
GET music/album/_search
{
    "query": {
        "match": {
           "artist": "Mac Miller"
        }
    }
}
```

#### Exact search (filter)
```
GET music/album/_search
{
    "query": {
        "term": {
           "artist.raw": {
              "value": "Mac Miller"
           }
        }
    }
}
```
