const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  #head = null;
  #tail = null;

  getUnderlyingList() {
    // The tests compare with plain objects via deepStrictEqual, which also
    // checks prototypes, so ListNode instances are copied to plain objects.
    const dummy = { next: null };
    let tail = dummy;

    for (let node = this.#head; node; node = node.next) {
      tail.next = { value: node.value, next: null };
      tail = tail.next;
    }

    return dummy.next;
  }

  enqueue(value) {
    const node = new ListNode(value);

    if (this.#tail) {
      this.#tail.next = node;
    } else {
      this.#head = node;
    }

    this.#tail = node;
  }

  dequeue() {
    if (!this.#head) {
      return undefined;
    }

    const { value, next } = this.#head;
    this.#head = next;

    if (!this.#head) {
      this.#tail = null;
    }

    return value;
  }
}

module.exports = {
  Queue
};
