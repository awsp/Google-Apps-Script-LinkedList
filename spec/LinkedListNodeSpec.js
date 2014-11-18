describe("LinkedListNode", function () {

  it ("should have the same data in node", function () {
    var node = new LinkedListNode("foo");
    expect(node.aData).toBe("foo");
  });

  it ("should have the same value from data()", function () {
    var node = new LinkedListNode("Hey!");
    expect(node.data()).toBe("Hey!");
    expect(node.data()).toEqual(node.aData);
  });

  it ("should have next node set null ", function () {
    var node1 = new LinkedListNode("foo");
    expect(node1.next()).toBe(null);
  });

  it ("should have next node reference set. ", function () {
    var node1 = new LinkedListNode("foo");
    var node2 = new LinkedListNode("foo2");

    node1.next(node2);
    expect(node1.next()).toEqual(node2);
  });

});