/**
 * LinkedListNode Class
 * This holds the actually data and reference to the next node.
 *
 * @author Anthony S. Wu
 */
var LinkedListNode = function (nodeData) {
  var self = this;
  var aData = null;
  var aNext = null;

  /**
   * Getter / Setter
   * When tmpData is provided, this turns into a setter, otherwise return node's content.
   *
   * @param mixed tmpData
   * @return mixed|void
   */
  self.data = function (tmpData) {
    // Set data if tmpData is set, even if it is null
    if (typeof tmpData !== 'undefined') {
      aData = tmpData;
      return ;
    }
    return aData;
  };


  /**
   * Getter / Setter
   * When tmpData is provided, this turns into a setter, otherwise return next linked list node.
   *
   * @param mixed tmpNext
   * @return mixed|void
   */
  self.next = function (tmpNext) {
    // Set data if tmpNext is set, even if it is null
    if (typeof tmpNext !== 'undefined') {
      aNext = tmpNext;
      return ;
    }
    return aNext;
  };


  /**
   * Constructor
   */
  if (typeof nodeData != 'undefined') {
    self.data(nodeData);
  }
};


var LinkedList = function () {
  var self = this;
  var aFirstNode = null;
  var aLastNode = null;
  var aSize = 0;

  /**
   * First node getter / setter, if an agrument is provided.
   *
   * @param mixed tmpFirstNode
   * @return mixed
   */
  self.firstNode = function (tmpFirstNode) {
    if (typeof tmpFirstNode !== 'undefined') {
      aFirstNode = tmpFirstNode;
    }

    return aFirstNode;
  };


  /**
   * Last node getter / setter, if an agrument is provided.
   *
   * @param mixed tmpLastNode
   * @return mixed
   */
  self.lastNode = function (tmpLastNode) {
    if (typeof tmpLastNode !== 'undefined') {
      aLastNode = tmpLastNode;
    }

    return aLastNode;
  };


  /**
   * Add new linkedlist node to linkedlist
   *
   * @param mixed data
   * @return void
   */
  self.add = function (data) {
    var newNode = new LinkedListNode(data);

    if (typeof data === 'undefined') {
      throw new InvalidArgumentException('data is not defined');
      return ;
    }

    if (aFirstNode == null) {
      aFirstNode = newNode;
      aLastNode = newNode;
    }
    else {
      aLastNode.next(newNode);
      aLastNode = newNode;
    }

    // Increment size of LinkedList
    aSize++;

    return self;
  };


  /**
   * Revmoe linkedlist node to linkedlist
   *
   * @param mixed data
   * @return void
   */
  self.remove = function (removeData) {
    var currentNode = self.firstNode();
    var wasDeleted = false;

    if (aSize === 0) {
      return ;
    }

    if (typeof removeData === 'undefined') {
      throw new InvalidArgumentException('removeData is undefiend');
      return ;
    }

    // In situation where removeData is the first node.
    if (removeData == currentNode.data()) {

      // Next node is not available.
      if (currentNode.next() === null) {
        self.firstNode().data(null);
        self.firstNode(null);
        aSize--;
        return ;
      }

      currentNode.data(null);
      currentNode = currentNode.next();
      self.firstNode(currentNode);
      aSize--;
      return;
    }


    while (true) {
      if (currentNode === null) {
        wasDeleted = false;
        break;
      }

      /* Check if the data of the next is what we're looking for */
      var nextNode = currentNode.next();
      if (nextNode !== null) {
        if (removeData == nextNode.data()) {
          // Found the right one, loop around the node
          var nextNextNode = nextNode.next();
          currentNode.next(nextNextNode);
          nextNode = null;
          wasDeleted = true;
          break;
        }
      }

      currentNode = currentNode.next();
    }

    if (wasDeleted) {
      aSize--;
    }
  };


  /**
   * Return size of current linkedlist
   *
   * @return int
   */
  self.size = function () {
    return aSize;
  };


  /**
   * Find index position of given data.
   * Zero-based, if not found, return -1,
   * otherwise return first occurance position starting from 0
   *
   * @param mixed searchData
   * @return int
   */
  self.indexOf = function (searchData) {
    var currentNode = self.firstNode();
    var position = 0;
    var found = false;

    for (; ; position++) {
      if (currentNode === null) {
        break;
      }

      if (searchData == currentNode.data()) {
        found = true;
        break;
      }

      currentNode = currentNode.next();
    }

    if ( ! found) {
      position = -1;
    }

    return position;
  };


  /**
   * Convert linkedlist to JSON format-like
   *
   * @return JSON
   */
  self.toString = function () {
    var currentNode = self.firstNode();

    var result = '{';

    for (var i = 0; currentNode !== null; i++) {
      if (i > 0) {
        result += ',';
      }

      var dataObject = currentNode.data();

      if (dataObject !== null) {
        if (typeof dataObject === 'string') {
          result += '"' + dataObject + '"';
        }
        else if (typeof dataObject == 'object') {
          result += JSON.stringify(dataObject);
        }
      }
      currentNode = currentNode.next();
    }

    if (i > 0) {
      //result = result.substr(0, result.length - 1);
    }

    result += "}";

    return result;
  };



  /**
   * Allow certain extend of random access.
   * Search is in linar: O(n)
   * Non-zero based, starts from 1...n
   *
   * @param int n
   * @return LinkedListNode
   */
  self.at = function (n, maxLoop) {
    var currentNode = self.firstNode();
    var i = 0;

    while (true) {
      if (currentNode === null) {
        break;
      }

      if (++i === n) {
        return currentNode;
      }

      currentNode = currentNode.next();
    }

    return null;
  }


  /**
   * Find and return the corresponded LinkedListNode given a condition.
   *
   * @param Function callback
   * @return mixed
   */
  self.find = function (callback) {
    // Check if `callback` is callable.
    if (typeof callback !== 'function') {
      throw new InvalidArgumentException('You need to provide an valid callback function. ');
      return ;
    }

    // Start from the first node.
    var currentNode = self.firstNode();
    var i = 0, flag = false;

    // Loop-thru data
    while (true) {
      if (currentNode === null) {
        break;
      }

      // Filter
      flag = callback(currentNode.data());
      if (flag) {
        return currentNode;
      }

      currentNode = currentNode.next();
    }

    return null;
  };
}




// EXCEPTIONS
function InvalidArgumentException(message)
{
  this.message = '[InvalidArgumentException] ' + (message ? message : 'Argument is invalid. ');
  this.name = "InvalidArgumentException";
}




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