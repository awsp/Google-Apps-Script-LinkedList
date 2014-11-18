/**
 * LinkedListNode Class
 * Google Apps Script
 * Data structure to hold the actually data and reference
 *
 * @author Anthony S. Wu
 * @organization S S Enterprise, Inc.
 * @version  1.0.0
 */
var LinkedListNode = function (nodeData) {
  this.aData = null;
  this.aNext = null;

  /**
   * Constructor
   */
  if (typeof nodeData != 'undefined') {
    this.aData = nodeData;
  }
};

/**
 * Getter / Setter
 * When tmpData is provided, this turns into a setter, otherwise return node's content.
 *
 * @param mixed tmpData
 * @return mixed|void
 */
LinkedListNode.prototype.data = function (data) {
  // Set data if data is set, even if it is null
    if (typeof data !== 'undefined') {
      this.aData = data;
      return ;
    }
    return this.aData;
};

/**
 * Getter / Setter
 * When tmpData is provided, this turns into a setter, otherwise return next linked list node.
 *
 * @param mixed tmpNext
 * @return mixed|void
 */
LinkedListNode.prototype.next = function (tmpNext) {
  // Set data if tmpNext is set, even if it is null
  if (typeof tmpNext !== 'undefined') {
    this.aNext = tmpNext;
    return ;
  }
  return this.aNext;
};


var LinkedList = function () {
  this.aFirstNode = null;
  this.aLastNode  = null;
  this.aSize = 0;
};


/**
 * Return size of current linked list
 *
 * @return int
 */
LinkedList.prototype.size = function () {
  return this.aSize;
};


/**
 * First node getter / setter, if an argument is provided.
 *
 * @param mixed tmpFirstNode
 * @return mixed
 */
LinkedList.prototype.firstNode = function (firstNode) {
  if (typeof firstNode !== 'undefined') {
    this.aFirstNode = firstNode;
  }

  return this.aFirstNode;
};

/**
 * Last node getter / setter, if an argument is provided.
 *
 * @param mixed tmpLastNode
 * @return mixed
 */
LinkedList.prototype.lastNode = function (lastNode) {
  if (typeof lastNode !== 'undefined') {
    this.aLastNode = lastNode;
  }

  return this.aLastNode;
};


/**
 * Add new linked list node to linked list
 *
 * @param mixed data
 * @return void
 */
LinkedList.prototype.add = function (data) {
  var newNode = new LinkedListNode(data);

  if (typeof data === 'undefined') {
    Logger.log('Data key is not defined. ');
    throw new InvalidArgumentException('data is not defined');
  }

  if (this.aFirstNode === null) {
    this.aFirstNode = newNode;
    this.aLastNode = newNode;
  }
  else {
    this.aLastNode.next(newNode);
    this.aLastNode = newNode;
  }

  // Increment size of LinkedList
  this.aSize++;

  return ;
};


/**
 * Remove linked list node to linked list
 *
 * @param mixed data
 * @return void
 */
LinkedList.prototype.remove = function (removeData) {
  var currentNode = this.firstNode();
  var wasDeleted = false;

  if (this.size() === 0) {
    return ;
  }

  if (typeof removeData === 'undefined') {
    Logger.log('Data key is not defined. ');
    throw new InvalidArgumentException('removeData is undefined');
  }

  // In situation where removeData is the first node.
  if (removeData == currentNode.data()) {

    // Next node is not available.
    if (currentNode.next() === null) {
      this.firstNode().data(null);
      this.firstNode(null);
      this.lastNode(null);
      this.aSize--;
      return ;
    }
    else {
      currentNode.data(null);
      currentNode = currentNode.next();
      this.firstNode(currentNode);
      this.aSize--;
      return;
    }
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
        // Check if removed one is last node, if it is, bring current node to be the last one.
        if (nextNode === this.lastNode()) {
          this.aLastNode = currentNode;
        }

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
    this.aSize--;
  }
};


/**
 * Find index position of given data.
 * Zero-based, if not found, return -1,
 * otherwise return first occurrence position starting from 0
 *
 * @param mixed searchData
 * @return int
 */
LinkedList.prototype.indexOf = function (searchData) {
  var currentNode = this.firstNode();
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
LinkedList.prototype.toString = function () {
  var currentNode = this.firstNode();

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
LinkedList.prototype.at = function (n) {
  var currentNode = this.firstNode();
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
LinkedList.prototype.find = function (callback) {
  // Check if `callback` is callable.
  if (typeof callback !== 'function') {
    Logger.log('Invalid callback. ');
    throw new InvalidArgumentException('You need to provide an valid callback function. ');
  }

  // Start from the first node.
  var currentNode = this.firstNode();
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


// EXCEPTIONS
function InvalidArgumentException(message)
{
  this.message = '[InvalidArgumentException] ' + (message ? message : 'Argument is invalid. ');
  this.name = "InvalidArgumentException";
}
