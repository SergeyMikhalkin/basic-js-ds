const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rootNode = null;
  }

  addWithin(node, data) {
    if(!node) return new Node(data);

    if(node.data === data) return node;
    
    if(data < node.data) node.left = this.addWithin(node.left, data);
    else node.right = this.addWithin(node.right, data);

    return node;
  }

  searchWithin(node, data, searching = false) {
    if(!node) {
      if(!searching) return false;
      else return null;
    }

    if(node.data === data) 
    {
      if(!searching) return true;
      else return node;
    }

    return data < node.data ? 
    this.searchWithin(node.left, data, searching) :
    this.searchWithin(node.right, data, searching);
  }

  removeNode(node, data) {
    if(!node) return null;

    if(data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if(data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if(node.left === null && node.right === null) {
        return null;
      }
      if(node.left === null) {
        node = node.right;
        return node;
      }

      if(node.right === null) {
        node = node.left;
        return node;
      }

      let min = node.right;
      while(min.left) {
        min = min.left;
      }
      node.data = min.data;
      node.right = this.removeNode(node.right, min.data);
      return node;
    }
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = this.addWithin(this.rootNode, data);
  }

  has(data) {
    return this.searchWithin(this.rootNode, data);
  }

  find(data) {
    return this.searchWithin(this.rootNode, data, true);
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  min() {
    if(this.rootNode === null) return null;

    let curr = this.rootNode;
    while(curr.left != null) {
      curr = curr.left;
    }

    return curr.data;
  }

  max() {
    if(this.rootNode === null) return null;

    let curr = this.rootNode;
    while(curr.right != null) {
      curr = curr.right;
    }

    return curr.data;
  }
}

module.exports = {
  BinarySearchTree
};