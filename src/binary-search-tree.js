const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  #root = null;

  root() {
    return this.#root;
  }

  add(data) {
    const node = new Node(data);

    if (!this.#root) {
      this.#root = node;
      return;
    }

    let current = this.#root;

    while (current.data !== data) {
      const side = data < current.data ? 'left' : 'right';

      if (!current[side]) {
        current[side] = node;
        return;
      }

      current = current[side];
    }
  }

  find(data) {
    let current = this.#root;

    while (current && current.data !== data) {
      current = data < current.data ? current.left : current.right;
    }

    return current;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    this.#root = this.#removeFrom(this.#root, data);
  }

  min() {
    return this.#root ? this.#leftmost(this.#root).data : null;
  }

  max() {
    if (!this.#root) {
      return null;
    }

    let current = this.#root;

    while (current.right) {
      current = current.right;
    }

    return current.data;
  }

  #leftmost(node) {
    let current = node;

    while (current.left) {
      current = current.left;
    }

    return current;
  }

  #removeFrom(node, data) {
    if (!node) {
      return null;
    }

    if (data < node.data) {
      node.left = this.#removeFrom(node.left, data);
      return node;
    }

    if (data > node.data) {
      node.right = this.#removeFrom(node.right, data);
      return node;
    }

    if (!node.left) {
      return node.right;
    }

    if (!node.right) {
      return node.left;
    }

    // Two children: take the value of the in-order successor, then remove it.
    const successor = this.#leftmost(node.right);
    node.data = successor.data;
    node.right = this.#removeFrom(node.right, successor.data);

    return node;
  }
}

module.exports = {
  BinarySearchTree
};
