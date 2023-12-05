import { PriorityQueue } from "../helper classes/priorityqueue";

export class AStar {
  private unvisitedCells!: PriorityQueue<string, number>;
  private visitedCells!: string[];
  private cellsDistances!: Record<string, number>;
  private prevCell: Record<string, string> = {};
  private arrowDirections: Record<string, number> = {};
  private c: string[][] = [[], [], [], []];
  private cellNeighbors: Record<string, Record<string, number>> = {};

  algorithm(startCell: string, targetCell: string, walls: string[]): string[] {
    this.unvisitedCells = new PriorityQueue<string, number>();
    this.visitedCells = [];
    this.cellsDistances = {};

    this.unvisitedCells.enqueue(startCell, 0);

    while (!this.unvisitedCells.isEmpty()) {
      const currCell = this.unvisitedCells.dequeue() || { key: "", value: 0 };
      this.visitedCells.push(currCell.key);
      this.cellsDistances[currCell.key] = currCell.value;
      const [targetX, targetY] = targetCell.split(",").map(Number);

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

      const directions: Record<number, string> = {
        0: "left",
        1: "down",
        2: "right",
        3: "up",
      };

      let direction = 0;

      this.cellNeighbors[currCell.key] = {};

      for (const currNeighbor of neighbors) {
        if (
          this.visitedCells.includes(currNeighbor) ||
          document.querySelector(`[cell-pos="${currNeighbor}"]`) === null
        ) {
          continue;
        }

        if (currNeighbor === targetCell) {
          this.prevCell[currNeighbor] = currCell.key;
          this.arrowDirections[currNeighbor] = direction;

          return this.visitedCells;
        }

        const [neighX, neighY] = currNeighbor.split(",").map(Number);
        const neighDist = this.cellsDistances[currCell.key];
        const neighHeuristic = this.calcuHeuristic(
          neighX,
          targetX,
          neighY,
          targetY
        );
        const neighTotalVal = neighHeuristic + neighDist;

        if (
          this.unvisitedCells.getValue(currNeighbor) !== undefined &&
          (this.unvisitedCells.getValue(currNeighbor) || 0) > neighTotalVal
        ) {
          this.unvisitedCells.updateValue(currNeighbor, neighTotalVal);
          this.cellsDistances[currNeighbor] = neighDist;
          this.prevCell[currNeighbor] = currCell.key;
          this.arrowDirections[currNeighbor] = direction;
          this.cellNeighbors[currCell.key][currNeighbor] = neighTotalVal;
        } else if (this.unvisitedCells.getValue(currNeighbor) === undefined) {
          this.unvisitedCells.enqueue(currNeighbor, neighTotalVal);
          this.cellsDistances[currNeighbor] = neighDist;
          this.prevCell[currNeighbor] = currCell.key;
          this.arrowDirections[currNeighbor] = direction;
          this.cellNeighbors[currCell.key][currNeighbor] = neighTotalVal;
        }
        direction += 1;
      }
    }

    return this.visitedCells;
  }

  calcuHeuristic(x1: number, x2: number, y1: number, y2: number): number {
    const result = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return result;
  }

  getPath(targetCell: string): string[] {
    let currCell = this.prevCell[targetCell];
    const previous: string[] = [targetCell];
    const arrowDir: string[][] = [["a"], ["b"], ["c"], ["d"]];

    while (currCell) {
      previous.unshift(currCell);
      currCell = this.prevCell[currCell];

      if (
        currCell !== undefined &&
        this.arrowDirections[currCell] !== undefined
      ) {
        arrowDir[this.arrowDirections[currCell]].push(currCell);
      }
    }

    this.c = arrowDir;

    this.prevCell = {};
    return previous;
  }
}
