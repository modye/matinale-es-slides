##### Analyzer defined in mapping
```
POST music/artist/_mapping
{
    "artist": {
        "properties": {
            "name": {
                "type": "string",
                "index": "analyzed",
                "analyzer": "english"
            },
            "country" : {
                "type": "string",
                "index": "not_analyzed" 
            }
        }
    }
}
```