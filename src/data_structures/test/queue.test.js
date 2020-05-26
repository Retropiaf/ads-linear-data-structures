import ArrayQueue from '../array_queue';
import DLLQueue from '../dll_queue';

const dataStructures = [
  ArrayQueue,
  DLLQueue,
]

dataStructures.forEach(ds => {
  describe(ds, () => {
    let queue;
    beforeEach(() => {
      queue = new ds();
    });

    it('starts empty', () => {
      expect(queue.count()).toBe(0);
    });

    describe('enqueue', () => {
      it('increases the count by 1', () => {
        queue.enqueue('test');
        expect(queue.count()).toBe(1);

        for (let i = 0; i < 10; i += 1) {
          queue.enqueue('test');
        }
        expect(queue.count()).toBe(11);
      });
    })

    describe('dequeue', () => {
      it('yields elements in insertion order', () => {
        const elements = ['various', 'interesting', 'strings'];
        elements.forEach(el => queue.enqueue(el));

        elements.forEach(el => {
          const result = queue.dequeue();
          expect(result).toBe(el);
        })
      });

      it('decreases count by 1', () => {
        const elements = ['various', 'interesting', 'strings'];
        elements.forEach(el => queue.enqueue(el));

        const start_count = queue.count();
        expect(start_count).toBe(elements.length);

        elements.forEach((_, i) => {
          queue.dequeue();
          expect(queue.count()).toBe(start_count - i - 1);
        })
      });

      it('yields undefined when run on an empty queue', () => {
        const result = queue.dequeue();
        expect(result).toBe(undefined);
      });

      it('yields undefined when all elements have been dequeued', () => {
        const count = 10;
        for (let i = 0; i < count; i += 1) {
          queue.enqueue(i * i);
        }
        for (let i = 0; i < count; i += 1) {
          queue.dequeue();
        }

        const result = queue.dequeue();
        expect(result).toBe(undefined);
      });

      it('does not decrease count when dequeueing on empty queue', () => {
        queue.dequeue();
        expect(queue.count()).toBe(0);

        const count = 10;
        for (let i = 0; i < count; i += 1) {
          queue.enqueue(i * i);
        }
        for (let i = 0; i < count; i += 1) {
          queue.dequeue();
        }
        expect(queue.count()).toBe(0);

        queue.dequeue();
        expect(queue.count()).toBe(0);
      });
    });

    describe('forEach', () => {
      // Hope to match the JavaScript Array forEach interface:
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
      // Note that we ignore the thisArg

      // See also Jest function mocks: https://jestjs.io/docs/en/mock-functions.html

      it('runs the callback 0 times on an empty queue', () => {
        const cb = jest.fn();
        queue.forEach(cb);

        expect(cb.mock.calls.length).toBe(0);
      });

      it('provides element, index and the queue itself as cb args', () => {
        const elements = ['various', 'interesting', 'strings'];
        elements.forEach(el => queue.enqueue(el));

        const cb = jest.fn();
        queue.forEach(cb);

        expect(cb.mock.calls.length).toBe(elements.length);

        elements.forEach((element, i) => {
          expect(cb.mock.calls[i][0]).toBe(element);
          expect(cb.mock.calls[i][1]).toBe(i);
          expect(cb.mock.calls[i][2]).toBe(queue);
        });
      });
    });

    describe('cancel', () => {
      it('reduces the count by one', () => {
        const elements = ['various', 'interesting', 'strings'];
        const tickets = [];
        elements.forEach(el => tickets.push(queue.enqueue(el)));

        expect(queue.count()).toBe(elements.length);

        tickets.forEach((ticket, i) => {
          queue.cancel(ticket);
          expect(queue.count()).toBe(elements.length - i - 1);
        });
      });

      it('skips cancelled elements when dequeueing', () => {
        const elements = ['various', 'cancelled', 'strings'];
        const tickets = [];
        elements.forEach(el => tickets.push(queue.enqueue(el)));

        queue.cancel(tickets[1]);
        expect(queue.count()).toBe(2);

        expect(queue.dequeue()).toBe('various');
        expect(queue.count()).toBe(1);

        expect(queue.dequeue()).toBe('strings');
        expect(queue.count()).toBe(0);
      });

      it('skips cancelled elements during iteration', () => {
        const elements = ['various', 'cancelled', 'strings'];
        const tickets = [];
        elements.forEach(el => tickets.push(queue.enqueue(el)));

        queue.cancel(tickets[1]);
        const cb = jest.fn();
        queue.forEach(cb);

        expect(cb.mock.calls.length).toBe(elements.length - 1);
        expect(cb.mock.calls[0][0]).toBe('various');
        expect(cb.mock.calls[1][0]).toBe('strings');
      });

      it('does nothing for an invalid ticket', () => {
        const elements = ['various', 'interesting', 'strings'];
        elements.forEach(el => queue.enqueue(el));

        expect(queue.count()).toBe(elements.length);
        queue.cancel('bogus');
        expect(queue.count()).toBe(elements.length);
      });

      it('does nothing when cancelling an element that has already been dequeued', () => {
        const elements = ['various', 'cancelled', 'strings'];
        const tickets = [];
        elements.forEach(el => tickets.push(queue.enqueue(el)));

        queue.dequeue();
        queue.dequeue();

        expect(queue.count()).toBe(1);
        queue.cancel(tickets[1]);
        expect(queue.count()).toBe(1);
      });
    })
  });
});
