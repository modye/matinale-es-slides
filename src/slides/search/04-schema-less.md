<!-- .slide: data-background="url(images/slides/kitten-little.jpg) no-repeat bottom left" data-background-size="250px" -->
## Schema less ?

- Each *index* has settings

```
GET music/_settings
```

- Each *type* has a mapping

```
GET music/album/_mapping
```

- *Mapping* define *properties*

```
{
	 "album": {
	    "properties": {
	       "artist": {
	          "type": "string"
	       },
	       "description": {
	          "type": "string"
	       }
	    }
	 }
}
```
