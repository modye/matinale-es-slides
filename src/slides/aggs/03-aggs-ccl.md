## Aggregations
##### Use not_analyzed fields
- Aggregations logic is filtering
- **doc_values** does not work with **analyzed** fields
- **fielddata** use a lot of memory
- Better performances, avoid high cardinality tokens