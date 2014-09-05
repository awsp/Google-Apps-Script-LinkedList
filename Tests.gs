


// TEST
function simpleTestLinkedList () {
  var ll = new LinkedList();
  Logger.log("Expect initial LinkedList size to be 0. Result: " + (ll.size() === 0));

  ll.add('foo');
  ll.add('foo2');
  ll.add('foo3');

  Logger.log('@ position 1: ' + ll.at(1).data() + ", data matching: " + (ll.at(1).data() === 'foo'));
  Logger.log('@ position 3: ' + ll.at(3).data() + ", data matching: " + (ll.at(3).data() === 'foo3'));
  Logger.log('@ position 2: ' + ll.at(2).data() + ", data matching: " + (ll.at(2).data() === 'foo2'));
  Logger.log('@ position 100: ' + ll.at(100) + ", data Matching: " + (ll.at(100) === null));

  Logger.log("Expect LinkedList size to be 3. Result: " + (ll.size() === 3));
  Logger.log("Expect first node's data is `foo`. Result: " + (ll.firstNode().data() === 'foo'));
  Logger.log("Expect second node's data is `foo2`. Result: " + (ll.firstNode().next().data() === 'foo2'));

  Logger.log("Expect last node's data is equal to `foo3`", (ll.lastNode().data() === 'foo3'));
  Logger.log("Expect last node's data is equal to third node. Result: " + (ll.firstNode().next().next().data() === ll.lastNode().data()));

  ll.remove('foo4');
  Logger.log("Expected nothing is removed and size stays the same, `3`. Result: " + (ll.size() === 3));


  Logger.log("Expected `foo2` is at position `1`. Result: " + (ll.indexOf('foo2') === 1));
  Logger.log(ll.toString());

  var lo = new LinkedList();
  Logger.log("Expected output to be {}. Result: " + (lo.toString() === '{}'));

  var le = new LinkedList();
  le.add("foo");
  Logger.log("Expected output to be {\"foo\"}. Result: " + (le.toString() === '{"foo"}'));

}


function simpleTestLinkedListFind()
{
  var ll = new LinkedList();
  ll.add('foo');
  ll.add('foo2');
  ll.add('foo3');

  var result = ll.find(function (item) {
    return item == 'foo2';
  });

  Logger.log("Expected result's data is `foo2`. Result: " + (result.data() === 'foo2'));


  var lo = new LinkedList();
  lo.add({ foo: 'bar', position: 1});
  lo.add({ foo: 'bar2', position: 2});
  lo.add({ foo: 'bar3', position: 3});

  var result2 = lo.find(function (item) {
    return item.foo === 'bar3';
  });

  Logger.log("Expected result's position is at `3`. Result: " + (result2.data().position === 3));

  var le = new LinkedList();
  le.add({ foo: 'bar', position: 1});
  le.add({ foo: 'bar2', position: 2});
  le.add({ foo: 'bar3', position: 3});

  var result3 = le.find(function (item) {
    return item.foobar === 'bar3';
  });

  Logger.log("Expected result to be `null` when we are finding something does not exist in LinkedList instance. Result: " + (result3 === null));


  try {
    var ls = new LinkedList();
    ls.find('aaa');
  }
  catch (e) {
    Logger.log("Execpt this is throwing exception when non-function is inserted into find(). Exception thrown: " + (e.name === "InvalidArgumentException"));
  }
}