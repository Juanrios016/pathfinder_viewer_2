import { PriorityQueue } from "../helper classes/priorityqueue";

export class AStar {
  private unvisitedCells!: PriorityQueue<string, number>;
  private visitedCells!: string[];
  private cellsDistances!: Record<string, number>;
  private prevCell: Record<string, string> = {};
  arrowDirections!: string[][];

  algorithm(startCell: string, targetCell: string, walls: string[]): string[] {
    // main algorithm logic
    this.unvisitedCells = new PriorityQueue<string, number>();
    this.visitedCells = [];
    this.cellsDistances = {};
    this.arrowDirections = [[], [], [], []];

    this.unvisitedCells.enqueue(startCell, 0);
    this.cellsDistances[startCell] = 0;

    const [targetX, targetY] = targetCell.split(",").map(Number);

    while (!this.unvisitedCells.isEmpty()) {
      const currCell = this.unvisitedCells.dequeue() || { key: "", value: 0 };
      this.visitedCells.push(currCell.key);

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
        if (
          this.visitedCells.includes(currNeighbor) ||
          document.querySelector(`[cell-pos="${currNeighbor}"]`) === null
        ) {
          // checks if 'currNeighbor' has not been visited or is not null
          continue;
        }

        if (currNeighbor === targetCell) {
          // checks if current neighbor is the target cell
          this.prevCell[currNeighbor] = currCell.key;
          return this.visitedCells;
        }

        const [neighX, neighY] = currNeighbor.split(",").map(Number);
        const neighDist = this.cellsDistances[currCell.key] + 1;
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
          // updates 'currNeihgbor' value if a
          this.unvisitedCells.updateValue(currNeighbor, neighTotalVal);
          this.cellsDistances[currNeighbor] = neighDist;
          this.prevCell[currNeighbor] = currCell.key;
        } else if (this.unvisitedCells.getValue(currNeighbor) === undefined) {
          this.unvisitedCells.enqueue(currNeighbor, neighTotalVal);
          this.cellsDistances[currNeighbor] = neighDist;
          this.prevCell[currNeighbor] = currCell.key;
        }
      }
    }
    return this.visitedCells;
  }

  calcuHeuristic(x1: number, x2: number, y1: number, y2: number): number {
    // calculates heuristic value based on euclidean dstance
    const result = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return result;
  }

  getPath(targetCell: string): string[] {
    // gets shortest path starting from the 'targetCell'
    let currCell = targetCell;
    const previous: string[] = [];

    while (currCell) {
      previous.unshift(currCell);
      currCell = this.prevCell[currCell];

      if (currCell !== undefined) {
        this.arrowDirections[this.getArrowDir(currCell, previous[0])].push(
          currCell
        );
      }
    }

    this.prevCell = {};
    return previous;
  }

  getArrowDir(prevCell: any, currCell: any) {
    // assignes arow direction based 'prevCell' and 'currCell' coordinates to see where 'prevcell' is located at based on the 'currCell'
    const [currX, currY] = currCell.split(",").map(Number);
    const [prevX, prevY] = prevCell.split(",").map(Number);
    const calcX = currX - prevX;
    const calcY = currY - prevY;
    // 0: "left",
    // 1: "down",
    // 2: "right",
    // 3: "up",

    if (calcX === 0 && calcY === 1) {
      return 2;
    } else if (calcX === 0 && calcY === -1) {
      return 0;
    } else if (calcX === 1 && calcY === 0) {
      return 1;
    } else if (calcX === -1 && calcY === 0) {
      return 3;
    }
    return 5;
  }
}
