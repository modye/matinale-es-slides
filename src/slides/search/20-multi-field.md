## Multi-field

```
POST music/album/_mapping
{
   "album": {
      "properties": {
         "artist": {
            "type": "text",
            "fields": {
               "raw": {
                  "type": "keyword"
               }
            }
         }
      }
   }
}
```
