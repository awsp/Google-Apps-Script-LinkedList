describe("LinkedList", function() {
  var ll = null;

  beforeEach(function () {
    ll = new LinkedList();
  });

  it ("should have size to be 0 initially. ", function() {
    expect(ll.aSize).toEqual(ll.size());
    expect(ll.size()).toBe(0);
  });

  it ("should be an empty JSON object. ", function () {
    expect(ll.toString()).toBe("{}");
  });

  it ("should have size 1 after inserted one element. ", function () {
    expect(ll.size()).toBe(0);
    ll.add("string data");
    expect(ll.size()).toBe(1);
    expect(ll.toString()).toBe('{"string data"}');
  });

  it ("should have firstNode set to `foo`", function () {
    ll.add("foo");
    expect(ll.firstNode().data()).toBe("foo");
    expect(ll.firstNode()).toEqual(ll.aFirstNode);
  });

  it ("should have lastNode set to `foo`", function () {
    ll.add("foo");
    expect(ll.lastNode().data()).toBe("foo");
    expect(ll.lastNode()).toBe(ll.aLastNode);
  });

  it ("should have size n after inserted n element. ", function () {
    expect(ll.size()).toBe(0);
    var n = parseInt((Math.random() * 10).toFixed(0), 10) + 1;

    for (var i = 1; i <= n; i++) {
      ll.add("string data" + i);
    }

    expect(ll.size()).toBe(n);
  });

  it ("should have 3 elements total. ", function () {
    // init
    ll.add('foo1');
    ll.add('foo2');
    ll.add('foo3');

    var firstNode = ll.firstNode();
    expect(firstNode.data()).toBe("foo1");
    expect(firstNode.next().data()).toBe("foo2");
    expect(firstNode.next().next().data()).toBe("foo3");
  });

  it ("should have the value `foo1` @ position 1", function () {
    ll.add('foo1');
    ll.add('foo2');
    ll.add('foo5');
    expect(ll.at(1).data()).toBe('foo1');
    expect(ll.at(3).data()).toBe('foo5');
  });

  it ("should have the value `null` out of position", function () {
    ll.add('foo1');
    ll.add('foo2');
    ll.add('foo5');
    expect(ll.at(100)).toBe(null);
  });

  it ("should have last node's data `foo3` in the list. ", function () {
    ll.add('foo1');
    ll.add('foo2');
    ll.add('foo3');

    expect(ll.lastNode().data()).toBe('foo3');
  });

  it ("should not remove anything if no data is found. ", function () {
    ll.add('foo1');
    ll.add('foo2');
    ll.add('foo3');

    ll.remove('foo4');
    expect(ll.size()).toBe(3);
  });

  it ("should have size 2 after removing foo2 from the list. ", function () {
    ll.add('foo1');
    ll.add('foo2');
    ll.add('foo3');

    ll.remove('foo2');
    expect(ll.size()).toBe(2);
  });

  it ("should have empty list after removing the first element. ", function () {
    ll.add('aaa');
    ll.remove('aaa');

    expect(ll.size()).toBe(0);
    expect(ll.firstNode()).toBe(null);
    expect(ll.lastNode()).toBe(null);
    expect(ll.toString()).toBe("{}");
  });

  it ("should have `foo2` as the last node after removing foo3. ", function () {
    ll.add('foo1');
    ll.add('foo2');
    ll.add('foo3');
    ll.remove('foo3');

    expect(ll.size()).toBe(2);
    expect(ll.lastNode().data()).toBe('foo2');
  });

  it ("should remain to have `foo3` as the last node. ", function () {
    ll.add('foo1');
    ll.add('foo2');
    ll.add('foo3');
    ll.remove('foo2');

    expect(ll.size()).toBe(2);
    expect(ll.lastNode().data()).toBe('foo3');
  });

  it ("should have first node be `foo2` after removing `foo1` from the list. ", function () {
    ll.add('foo1');
    ll.add('foo2');
    ll.add('foo3');
    ll.add('foo4');
    ll.remove('foo1');

    expect(ll.size()).toBe(3);
    expect(ll.firstNode().data()).toBe('foo2');
  });

  it ("should have the result of {\"foo\"}", function () {
    ll.add('foo');
    expect(ll.toString()).toBe('{"foo"}');
  });

  it ("should return foo2 from find(). ", function () {
    ll.add('foo');
    ll.add('foo2');
    ll.add('foo3');

    var result = ll.find(function (item) {
      return item == 'foo2';
    });

    expect(result).toBe(ll.at(2));
  });

  it ("should return correct object from find(). ", function () {
    ll.add({ foo: 'bar', position: 1});
    ll.add({ foo: 'bar2', position: 2});
    ll.add({ foo: 'bar3', position: 3});

    var result = ll.find(function (item) {
      return item.foo == 'bar3';
    });

    expect(result).toBe(ll.at(3));
  });

  it ("should return null from find if nothing is matched. ", function () {
    ll.add({ foo: 'bar', position: 1});
    ll.add({ foo: 'bar2', position: 2});
    ll.add({ foo: 'bar3', position: 3});

    var result3 = ll.find(function (item) {
      return item.foobar === 'bar3';
    });

    expect(result3).toBe(null);
  });

});