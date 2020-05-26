class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  _head() {
    return this._sentinel.next;
  }

  _tail() {
    return this._sentinel.prev;
  }

  insertHead(element) {
    const prevHead = this._head();
    const newHead = new DLLNode({element});
    this._sentinel.next = newHead;
    newHead.prev = this._sentinel;
    newHead.next = prevHead;
    prevHead.prev = newHead;
    return this._head();
  }

  insertTail(element) {
    const prevTail = this._tail();
    const newTail = new DLLNode({element});
    this._sentinel.prev = newTail;
    newTail.next = this._sentinel;
    prevTail.next = newTail;
    newTail.prev = prevTail;
    return this._tail();
  }

  removeHead() {
    return this._head().remove();
  }

  removeTail() {
    return this._tail().remove();
  }

  remove(node) {
    if (!(node instanceof DLLNode) && !node._active) {
      return undefined;
    }
    return node.remove();
  }

  forEach(callback) {
    let count = 0;
    let currentNode = this._head();
    while (currentNode._active) {
      callback(currentNode.element, count, this);
      currentNode = currentNode.next;
      count++;
    }
  }

  count() {
    let count = 0;
    let currentNode = this._sentinel.next;
    while (currentNode._active) {
      count++;
      currentNode = currentNode.next;
    }
    return count;
  }
}

export default DoublyLinkedList;
