<!-- .slide: data-background="url(images/slides/kitten-little.jpg) no-repeat bottom left" data-background-size="250px" -->
##### Prefer **filtered query**
- no need to compute a *score* when filtering
- cacheable
- better performances

```
GET music/album/_search
{
   "query": {
      "filtered": {
         "query": {
            "match_all": {}
         },
         "filter": {
            "term": {
               "artist.raw": "Mac Miller"
            }
         }
      }
   }
}
```
