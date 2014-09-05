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



/**
 * LinkedList Class
 * This holds all the LinkedListNode instances
 *
 * @author Anthony S. Wu
 */
var LinkedList = function () {
  var self = this;
  var aFirstNode = null;
  var aLastNode = null;
  var aSize = 0;

  /**
   * First node getter / setter, if an argument is provided.
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
   * Last node getter / setter, if an argument is provided.
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
   * Add new linked list node to linked list
   *
   * @param mixed data
   * @return void
   */
  self.add = function (data) {
    var newNode = new LinkedListNode(data);

    if (typeof data === 'undefined') {
      throw new InvalidArgumentException('data is not defined');
    }

    if (aFirstNode === null) {
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
   * Remove linked list node to linked list
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
      throw new InvalidArgumentException('removeData is undefined');
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
   * Return size of current linked list
   *
   * @return int
   */
  self.size = function () {
    return aSize;
  };


  /**
   * Find index position of given data.
   * Zero-based, if not found, return -1,
   * otherwise return first occurrence position starting from 0
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
   * Convert linked list to JSON format-like
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

    result += "}";

    return result;
  };



  /**
   * Allow certain extend of random access.
   * Search is in linear: O(n)
   * Non-zero based, starts from 1...n
   *
   * @param int n
   * @return LinkedListNode
   */
  self.at = function (n) {
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
  };


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
};




// EXCEPTIONS
function InvalidArgumentException(message)
{
  this.message = '[InvalidArgumentException] ' + (message ? message : 'Argument is invalid. ');
  this.name = "InvalidArgumentException";
}