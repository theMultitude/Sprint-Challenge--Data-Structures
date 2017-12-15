/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  resize() {
    // double limit
    this.limit *= 2;
    // copy old storage to variable
    const oldStorage = this.storage;
    // creat a new LA with expanded capacity
    this.storage = new LimitedArray(this.limit);
    // search through oS and return out if no data or copy data from bucket(array) to new LA
    oldStorage.each((bucket) => {
      if (!bucket) return;
      bucket.forEach((pair) => {
        this.insert(pair[0], pair[1]);
      });
    });
  }

  capacityIsFull() {
    // create count
    let fullCells = 0;
    // loop through storage and increment count for each bucket
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullCells++;
    });
    // assess state of cell to limit ratio
    return fullCells / this.limit >= 0.75;
  }

  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    // resize if need be
    if (this.capacityIsFull()) this.resize();
    // hash key given and assign it to index
    const index = getIndexBelowMax(key.toString(), this.limit);
    // creates variable assciated with  
    let bucket = this.storage.get(index) || [];

    addToTail(value)
    // bucket = bucket.filter(item => item[0] !== key);
    // bucket.push([key, value]);
    // this.storage.set(index, bucket);
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = this.storage.get(index);

    if (bucket) {
      bucket = bucket.filter(item => item[0] !== key);
      this.storage.set(index, bucket);
    }
  }
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    let retrieved;
    if (bucket) {
      retrieved = bucket.filter(item => item[0] === key)[0];
    }

    return retrieved ? retrieved[1] : undefined;
  }
}

module.exports = HashTable;
