##### Analyzer defined in mapping
```
POST music/artist/_mapping
{
    "artist": {
        "properties": {
            "name": {
                "type": "text",
                "analyzer": "english"
            },
            "country" : {
                "type": "keyword"
            }
        }
    }
}
```
