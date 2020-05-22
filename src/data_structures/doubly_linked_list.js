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
    const currHead = this._head();
    if (!currHead._active) {
      return currHead.element;
    }
    currHead.next.prev = this._sentinel;
    this._sentinel.next = currHead.next;
    return currHead.element;
  }

  removeTail() {
    const currTail = this._tail();
    if (!currTail._active) {
      return currTail.element;
    }
    currTail.prev.next = this._sentinel;
    this._sentinel.prev = currTail.prev;
    return currTail.element;
  }

  remove(node) {
    // let currentNode = this._sentinel.next;
    if (!(node instanceof DLLNode)) {
      return undefined;
    }
    if (!node._active) {
      return undefined;
    }
    let currentNode = this._sentinel;

    while (currentNode.next._active) {
      if (currentNode.next.element === node.element) {
        currentNode.next = currentNode.next.next;
        currentNode.next.prev = currentNode;
        return "removed";
      }
      currentNode = currentNode.next;
    }
    return undefined;
  }

  forEach(callback) {
    let count = 0;
    let currentNode = this._sentinel.next;
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
      currentNode = currentNode.next;
      count++;
    }
    return count;
  }
}

export default DoublyLinkedList;
