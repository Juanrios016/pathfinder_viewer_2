import { PriorityQueue } from "../helper classes/priorityqueue";

export class DijkstrasAlgorithm {
  // class for Dijkstras algorithm
  unvisitedAnimation: any = {};

  private unvisetedCells!: PriorityQueue<string, number>;
  private prevCell: Record<string, string> = {};
  private visitedCells!: string[];
  private forDeployment: any = { key: "string", value: "number" };
  arrowDirections!: string[][];

  algorithm(startCell: any, targetCell: any, walls: any): any {
    // initializing different variable that will hold cells information
    this.unvisetedCells = new PriorityQueue<string, number>();
    this.visitedCells = [];
    this.arrowDirections = [[], [], [], []];

    // pushing start cell
    this.unvisetedCells.enqueue(startCell, 0);

    // algorithm logic
    while (!this.unvisetedCells.isEmpty()) {
      const currCell = this.unvisetedCells.dequeue() || this.forDeployment;
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
        this.prevCell[currNeighbor] = currCell.key;
      }

      if (!this.visitedCells.includes(currCell.key)) {
        // adds current cell to visisted cell after perfrming necessary operations
        this.visitedCells.push(currCell.key);
      }
      //check if current cell is the target cell
      if (currCell.key === targetCell) {
        return this.visitedCells;
      }
    }
    return this.visitedCells;
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
