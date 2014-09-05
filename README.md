Google-Apps-Script-LinkedList
=============================

LinkedList functionality in GAS (Google Apps Script)

## Example
```javascript

// To add
var ll = new LinkedList();
ll.add('foo');
ll.add('foo2');
ll.add('foo3');


// To add 2
var lo = new LinkedList();
lo.add({ foo: 'bar', position: 1 });
lo.add({ foo: 'bar2', position: 2 });
lo.add({ foo: 'bar3', position: 3 });


// To retrieve first node
var ln = ll.firstNode(); // Return LinkedListNode
var data = ln.data();    // Return content of this node.


// To retrieve second node
var lnn = ll.firstNode().next();


// To get nth node, non-zero based.
var lnn = ll.at(2);      // Return 2nd node
var data = lnn.data();   // Return 'foo2'


// To find a node by condition
ll.find(function (node) {
   return node == 'foo';
});


// To find a node by condition in object form
// aNode.position will be 2
var aNode = lo.find(function (node) {
    return node.foo === 'bar2';
});


// toString
var string = lo.toString();

```


## ToDo
---------------
- `remove()` and `indexOf()` do not work very well with objects. They will need some works.