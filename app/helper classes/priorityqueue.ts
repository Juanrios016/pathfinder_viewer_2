export class PriorityQueue<K, V> {
  private items: { key: K; value: V }[] = [];

  enqueue(key: K, value: V) {
    this.items.push({ key, value });
    this.items.sort((a, b) => this.compareValues(a.value, b.value));
  }

  dequeue(): { key: K; value: V } | undefined {
    return this.items.shift();
  }

  peek(): { key: K; value: V } | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  updateValue(key: K, newValue: V): void {
    const index = this.items.findIndex((item) => item.key === key);

    if (index !== -1) {
      // Update the value
      this.items[index].value = newValue;

      // Re-sort the items based on the updated values
      this.items.sort((a, b) => this.compareValues(a.value, b.value));
    } else {
      console.log(`Key '${key}' not found in the priority queue.`);
    }
  }

  getValue(key: K): V | undefined {
    const item = this.items.find((item) => item.key === key);
    return item ? item.value : undefined;
  }

  private compareValues(a: V, b: V): number {
    // Implement your custom value comparison logic here.
    // Return a negative value if a < b, 0 if a == b, and a positive value if a > b.
    // For simplicity, we assume a and b are numbers in this example.
    return Number(a) - Number(b);
  }
  getAllKeys(): K[] {
    return this.items.map((item) => item.key);
  }
}
