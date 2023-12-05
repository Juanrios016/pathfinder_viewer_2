export class DFS {
  // class for depth first search algorithm

  private visitedCells!: string[];
  private prevCell: Record<string, string> = {};
  private found!: boolean;
  private tobeVisited!: string[];
  arrowDirections!: string[][];

  algorithm(startCell: string, target: string, walls: string[]): string[] {
    // initializing different variable that will hold cells information
    this.arrowDirections = [[], [], [], []];
    this.visitedCells = [];
    this.found = false;
    this.tobeVisited = [];

    // pushing start cell
    this.tobeVisited.push(startCell);

    // algorithm logic
    while (this.tobeVisited.length > 0 && !this.found) {
      const currCell = this.tobeVisited.shift() || "";
      const cell = document.querySelector(`[cell-pos="${currCell}"]`);

      if (currCell === undefined || walls.includes(currCell) || !cell) {
        // checks if cell is 'undefinied', a wall, or goes outside the boundaries of the panel
        continue;
      }

      // checking if cell has been visited
      if (!this.visitedCells.includes(currCell)) {
        this.visitedCells.push(currCell);

        const [x, y] = currCell.split(",").map(Number);
        const neighbors = [
          `${x},${y - 1}`, // Left
          `${x + 1},${y}`, // Down
          `${x},${y + 1}`, // Right
          `${x - 1},${y}`, // Up
        ];

        for (const neighbor of neighbors) {
          if (
            !this.visitedCells.includes(neighbor) //&& !this.tobeVisited.includes(neighbor)
          ) {
            this.tobeVisited.unshift(neighbor);
            this.prevCell[neighbor] = currCell;
          }
        }

        if (currCell === target) {
          // if target cell is found, this.found becomes true and while loops breaks
          this.found = true;
        }
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
