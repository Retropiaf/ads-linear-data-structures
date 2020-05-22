import DoublyLinkedList from '../doubly_linked_list';

describe(DoublyLinkedList, () => {
  let dll;
  beforeEach(() => {
    dll = new DoublyLinkedList();
  });

  const fillMixed = () => {
    const headGroup1 = ['a', 'b', 'c'];
    headGroup1.forEach(el => dll.insertHead(el));

    const tailGroup1 = ['d', 'e', 'f'];
    tailGroup1.forEach(el => dll.insertTail(el));

    const headGroup2 = ['g', 'h', 'i'];
    headGroup2.forEach(el => dll.insertHead(el));

    const tailGroup2 = ['j', 'k', 'l'];
    tailGroup2.forEach(el => dll.insertTail(el));

    const expectedOrder = [
      ...headGroup2.reverse(),
      ...headGroup1.reverse(),
      ...tailGroup1,
      ...tailGroup2,
    ];
    return expectedOrder;
  }

  it('begins empty', () => {
    expect(dll.count()).toBe(0);
  });

  describe('insert', () => {
    it('insertHead increases count by 1', () => {
      dll.insertHead('test');
      expect(dll.count()).toBe(1);

      for (let i = 0; i < 10; i += 1) {
        dll.insertHead('test');
      }
      expect(dll.count()).toBe(11);
    });

    it('insertTail increases count by 1', () => {
      dll.insertTail('test');
      expect(dll.count()).toBe(1);

      for (let i = 0; i < 10; i += 1) {
        dll.insertTail('test');
      }
      expect(dll.count()).toBe(11);
    });
  });

  describe('removeHead', () => {
    it('yields elements in tail-insertion order', () => {
      const elements = ['linked', 'list', 'elements'];
      elements.forEach(el => dll.insertTail(el));

      elements.forEach(el => {
        expect(dll.removeHead()).toBe(el);
      });
    });

    it('yields elements in reverse head-insertion order', () => {
      const elements = ['linked', 'list', 'elements'];
      elements.forEach(el => dll.insertHead(el));

      elements.reverse().forEach(el => {
        expect(dll.removeHead()).toBe(el);
      });
    });

    it('yields head-inserted elements before tail-inserted elements', () => {
      const expectedOrder = fillMixed();

      expectedOrder.forEach(el => {
        expect(dll.removeHead()).toBe(el);
      });
    });

    it('decreases count by 1', () => {
      const elements = ['linked', 'list', 'elements'];
      elements.forEach(el => dll.insertTail(el));

      expect(dll.count()).toBe(elements.length);

      elements.forEach((el, i) => {
        dll.removeHead();
        expect(dll.count()).toBe(elements.length - i - 1);
      });
    });

    it('yields undefined and does not decrease count when run on an empty list', () => {
      expect(dll.count()).toBe(0);
      expect(dll.removeHead()).toBe(undefined);
      expect(dll.count()).toBe(0);
    });

    it('yields undefined and does not decrease count when all elements have been removed', () => {
      const elements = ['linked', 'list', 'elements'];
      elements.forEach(el => dll.insertTail(el));
      elements.forEach(() => dll.removeHead());

      expect(dll.count()).toBe(0);
      expect(dll.removeHead()).toBe(undefined);
      expect(dll.count()).toBe(0);
    });
  });

  describe('removeTail', () => {
    it('yields elements in Head-insertion order', () => {
      const elements = ['linked', 'list', 'elements'];
      elements.forEach(el => dll.insertHead(el));

      elements.forEach(el => {
        expect(dll.removeTail()).toBe(el);
      });
    });

    it('yields elements in reverse Tail-insertion order', () => {
      const elements = ['linked', 'list', 'elements'];
      elements.forEach(el => dll.insertTail(el));

      elements.reverse().forEach(el => {
        expect(dll.removeTail()).toBe(el);
      });
    });

    it('yields tail-inserted elements before head-inserted elements', () => {
      const expectedOrder = fillMixed().reverse();

      expectedOrder.forEach(el => {
        expect(dll.removeTail()).toBe(el);
      });
    });

    it('decreases count by 1', () => {
      const elements = ['linked', 'list', 'elements'];
      elements.forEach(el => dll.insertHead(el));

      expect(dll.count()).toBe(elements.length);

      elements.forEach((el, i) => {
        dll.removeTail();
        expect(dll.count()).toBe(elements.length - i - 1);
      });
    });

    it('yields undefined and does not decrease count when run on an empty list', () => {
      expect(dll.count()).toBe(0);
      expect(dll.removeTail()).toBe(undefined);
      expect(dll.count()).toBe(0);
    });

    it('yields undefined and does not decrease count when all elements have been removed', () => {
      const elements = ['linked', 'list', 'elements'];
      elements.forEach(el => dll.insertHead(el));
      elements.forEach(() => dll.removeTail());

      expect(dll.count()).toBe(0);
      expect(dll.removeTail()).toBe(undefined);
      expect(dll.count()).toBe(0);
    });
  });

  describe('forEach', () => {
    it('runs the callback 0 times on an empty list', () => {
      const cb = jest.fn();
      dll.forEach(cb);

      expect(cb.mock.calls.length).toBe(0);
    });

    it('provides element, index and ll as cb args', () => {
      const element = 'test';
      dll.insertHead(element);

      const cb = jest.fn();
      dll.forEach(cb);

      expect(cb.mock.calls.length).toBe(1);
      expect(cb.mock.calls[0][0]).toBe(element);
      expect(cb.mock.calls[0][1]).toBe(0);
      expect(cb.mock.calls[0][2]).toBe(dll);
    });

    it('iterates elements in tail-insert-order', () => {
      const elements = ['linked', 'list', 'elements'];
      elements.forEach(el => dll.insertTail(el));

      const cb = jest.fn();
      dll.forEach(cb);

      expect(cb.mock.calls.length).toBe(elements.length);

      elements.forEach((element, i) => {
        expect(cb.mock.calls[i][0]).toBe(element);
        expect(cb.mock.calls[i][1]).toBe(i);
        expect(cb.mock.calls[i][2]).toBe(dll);
      });
    });

    it('iterates elements in reverse head-insert order', () => {
      const elements = ['linked', 'list', 'elements'];
      elements.forEach(el => dll.insertHead(el));

      const cb = jest.fn();
      dll.forEach(cb);

      expect(cb.mock.calls.length).toBe(elements.length);

      elements.reverse().forEach((element, i) => {
        expect(cb.mock.calls[i][0]).toBe(element);
        expect(cb.mock.calls[i][1]).toBe(i);
        expect(cb.mock.calls[i][2]).toBe(dll);
      });
    });

    it('iterates all head inserts before all tail inserts', () => {
      const expectedOrder = fillMixed();

      const cb = jest.fn();
      dll.forEach(cb);

      expect(cb.mock.calls.length).toBe(expectedOrder.length);

      expectedOrder.forEach((element, i) => {
        expect(cb.mock.calls[i][0]).toBe(element);
        expect(cb.mock.calls[i][1]).toBe(i);
        expect(cb.mock.calls[i][2]).toBe(dll);
      });
    })
  });

  describe('remove', () => {
    it('decreases count by 1', () => {
      const elements = ['linked', 'list', 'elements'];
      const tickets = [];
      elements.forEach(el => tickets.push(dll.insertHead(el)));

      expect(dll.count()).toBe(3);

      tickets.forEach((ticket, i) => {
        dll.remove(ticket);
        expect(dll.count()).toBe(elements.length - i - 1);
      })
    });

    it('will not yield a removed element when calling removeHead', () => {
      const elements = ['linked', 'removed', 'elements'];
      const tickets = [];
      elements.forEach(el => tickets.push(dll.insertHead(el)));

      expect(dll.remove(tickets[1])).toBe('removed');

      expect(dll.removeHead()).toBe('elements');
      expect(dll.removeHead()).toBe('linked');
    });

    it('will not yield a removed element when calling removeTail', () => {
      const elements = ['linked', 'removed', 'elements'];
      const tickets = [];
      elements.forEach(el => tickets.push(dll.insertHead(el)));

      expect(dll.remove(tickets[1])).toBe('removed');

      expect(dll.removeTail()).toBe('linked');
      expect(dll.removeTail()).toBe('elements');
    });

    it('will not yield a removed element during iteration', () => {
      const elements = ['linked', 'removed', 'elements'];
      const tickets = [];
      elements.forEach(el => tickets.push(dll.insertHead(el)));

      expect(dll.remove(tickets[1])).toBe('removed');

      const cb = jest.fn();
      dll.forEach(cb);
      expect(cb.mock.calls.length).toBe(elements.length - 1);
      expect(cb.mock.calls[0][0]).toBe('elements');
      expect(cb.mock.calls[1][0]).toBe('linked');
    });

    it('does nothing for an invalid node', () => {
      const elements = ['linked', 'list', 'elements'];
      const tickets = [];
      elements.forEach(el => tickets.push(dll.insertHead(el)));

      expect(dll.remove('bogus')).toBe(undefined);

      const cb = jest.fn();
      dll.forEach(cb);
      expect(cb.mock.calls.length).toBe(elements.length);
      expect(cb.mock.calls[0][0]).toBe('elements');
      expect(cb.mock.calls[1][0]).toBe('list');
      expect(cb.mock.calls[2][0]).toBe('linked');
    });

    it('does nothing for a node that has already been removed', () => {
      const elements = ['linked', 'removed', 'elements'];
      const tickets = [];
      elements.forEach(el => tickets.push(dll.insertHead(el)));

      expect(dll.remove(tickets[1])).toBe('removed');
      expect(dll.remove(tickets[1])).toBe(undefined);

      const cb = jest.fn();
      dll.forEach(cb);
      expect(cb.mock.calls.length).toBe(elements.length - 1);
      expect(cb.mock.calls[0][0]).toBe('elements');
      expect(cb.mock.calls[1][0]).toBe('linked');
    });

    it('does nothing for the sentinel', () => {
      const elements = ['linked', 'list', 'elements'];
      const tickets = [];
      elements.forEach(el => tickets.push(dll.insertHead(el)));

      expect(dll.remove(dll._sentinel)).toBe(undefined);

      const cb = jest.fn();
      dll.forEach(cb);
      expect(cb.mock.calls.length).toBe(elements.length);
      expect(cb.mock.calls[0][0]).toBe('elements');
      expect(cb.mock.calls[1][0]).toBe('list');
      expect(cb.mock.calls[2][0]).toBe('linked');
    });
  });
});
