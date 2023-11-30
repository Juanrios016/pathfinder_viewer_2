import { PriorityQueue } from "../helper classes/priorityqueue";

export class DijkstrasAlgorithm {
  // class for Dijkstras algorithm
  unvisitedAnimation: any = {};

  private unvisetedCells!: PriorityQueue<string, number>;
  private previousCell: Record<string, string> = {};
  private minDistance: any;
  private visitedCells!: string[];

  algorithm(startCell: any, targetCell: any, walls: any): any {
    // initializing different variable that will hold cells information
    this.unvisetedCells = new PriorityQueue<string, number>();
    this.minDistance = Infinity;
    this.visitedCells = [];

    // pushing start cell
    this.unvisetedCells.enqueue(startCell, 0);

    // algorithm logic
    while (!this.unvisetedCells.isEmpty()) {
      const currCell = this.unvisetedCells.dequeue() || "";
      if (
        this.visitedCells.includes(currCell.key) ||
        walls.includes(currCell.key)
      ) {
        continue;
      }
      const [x, y] = currCell?.key.split(",").map(Number);

      const neighbors = [
        `${x},${y - 1}`, // Left
        `${x + 1},${y}`, // Down
        `${x},${y + 1}`, // Right
        `${x - 1},${y}`, // Up
      ];

      for (let i = 0; i < neighbors.length; i++) {
        const currNeighbor = neighbors[i];

        // checks if current neighbor has been visited or equals null if x and y coordinates go outside the the panel
        if (
          this.visitedCells.includes(currNeighbor) ||
          document.querySelector(`[cell-pos="` + neighbors[i] + `"]`) === null
        ) {
          continue;
        }
        this.unvisetedCells.enqueue(currNeighbor, currCell.value + 1);
        this.previousCell[currNeighbor] = currCell.key;
      }

      if (!this.visitedCells.includes(currCell.key)) {
        // adds current cell to visisted cell after perfrming necessary operations
        this.visitedCells.push(currCell.key);
      }
      //check if current cell is the target cell
      if (currCell.key === targetCell) {
        this.minDistance = currCell.value;
        return this.visitedCells;
      }
    }
    return this.visitedCells;
  }

  getPath(targetCell: string): any {
    // returns path from startcell to target cell

    let currCell = this.previousCell[targetCell];
    const previous = [targetCell];

    while (currCell) {
      previous.unshift(currCell);
      currCell = this.previousCell[currCell];
    }

    this.previousCell = {};
    return previous;
  }
}
