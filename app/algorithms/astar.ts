import { PriorityQueue } from "../helper classes/priorityqueue";

export class AStar {
  // class for A star algorithm

  private unvisitedCells!: PriorityQueue<string, number>;
  private visitedCeells!: string[];
  private cellsDistances!: Record<string, number>;
  private prevCell: Record<string, string> = {};

  algorithm(startCell: string, targetCell: string, walls: string[]): string[] {
    // initializing different variable that will hold cells information
    this.unvisitedCells = new PriorityQueue();
    this.visitedCeells = [];
    this.cellsDistances = {};

    // pushing start cell
    this.unvisitedCells.enqueue(startCell, 0);

    // algorithm logic
    while (!this.unvisitedCells.isEmpty()) {
      console.log(this.unvisitedCells);

      const currCell = this.unvisitedCells.dequeue();
      this.visitedCeells.push(currCell.key);
      this.cellsDistances[currCell.key] = currCell.value;
      const [targetX, targetY] = targetCell.split(",").map(Number);

      // checking if walls include current cell
      if (walls.includes(currCell.key)) {
        continue;
      }

      const [x, y] = currCell.key.split(",").map(Number);

      const neighbors = [
        `${x},${y - 1}`, // Left
        `${x + 1},${y}`, // Down
        `${x},${y + 1}`, // Right
        `${x - 1},${y}`, // Up
      ];

      for (const currNeighbor of neighbors) {
        // checks if current neighbor has been visited or equals null if x and y coordinates go outside the the panel
        if (
          this.visitedCeells.includes(currNeighbor) ||
          document.querySelector(`[cell-pos="${currNeighbor}"]`) === null
        ) {
          continue;
        }

        // checks if current cell is target cell
        if (currNeighbor === targetCell) {
          this.prevCell[currNeighbor] = currCell.key;
          return this.visitedCeells;
        }

        const [neighX, neighY] = currNeighbor.split(",").map(Number); // current neighbor x and y coordinates
        const neighDist = this.cellsDistances[currCell.key] + 1; // distance from start cell to current cell
        const neighHeuristic = this.calcuHeuristic(
          // calculating heuristic value
          neighX,
          targetX,
          neighY,
          targetY
        );
        const neighTotalVal = neighHeuristic; // + neighDist; // total value combining heuristic val and distance vale

        // checking if current neighbor is not undefined
        if (this.unvisitedCells.getValue(currNeighbor) !== undefined) {
          // if current neighor is in unvisited cells and new 'neighTotalVal' is smaller, it updates necessary data
          if (this.unvisitedCells.getValue(currNeighbor) > neighTotalVal) {
            this.unvisitedCells.updateValue(currNeighbor, neighTotalVal);
            this.cellsDistances[currNeighbor] = neighDist;
            this.prevCell[currNeighbor] = currCell.key;
          }
          continue; // skips remaining functions
        }

        this.unvisitedCells.enqueue(currNeighbor, neighTotalVal);
        this.cellsDistances[currNeighbor] = neighDist;
        this.prevCell[currNeighbor] = currCell.key;
      }
    }

    return this.visitedCeells;
  }

  calcuHeuristic(x1: number, x2: number, y1: number, y2: number): number {
    // calculates heuristic value base on the following operation
    const result = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return result;
  }

  getPath(targetCell: string): string[] {
    // returns path from startcell to target cell

    let currCell = this.prevCell[targetCell];
    const previous: string[] = [targetCell];

    while (currCell) {
      previous.unshift(currCell);
      currCell = this.prevCell[currCell];
    }

    this.prevCell = {};
    return previous;
  }
}
