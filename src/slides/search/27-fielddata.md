### A quick word about **fielddata**

- Inverted Index is not optimal for sort/aggregations
- **Uninvert** inverted index to have each terms present in document
- Kept in JVM heap

<table>
   <thead>
       <tr>
           <th>Document</th>
           <th align="center">Terms</th>
       </tr>
   </thead>
   <tbody>
       <tr>
           <td>Doc1</td>
           <td align="center">mac, miller</td>
       </tr>
       <tr>
           <td>Doc2</td>
           <td align="center">mac, donald</td>
       </tr>
   </tbody>
</table>
