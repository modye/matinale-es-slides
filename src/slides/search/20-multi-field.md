## Multi-field

```
POST music/album/_mapping
{
   "album": {
      "properties": {
         "artist": {
            "type": "multi_field",
            "fields": {
               "artist": {
                  "type": "string",
                  "index": "analyzed"
               },
               "raw": {
                  "type": "string",
                  "index": "not_analyzed"
               }
            }
         }
      }
   }
}
```