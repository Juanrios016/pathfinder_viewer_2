export class DFS {
  // class for depth first search algorithm

  private visitedCells!: string[];
  private previousCells: Record<string, string> = {};
  private found!: boolean;
  private tobeVisited!: string[];

  algorithm(startCell: string, target: string, walls: string[]): string[] {
    // initializing different variable that will hold cells information
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
            this.previousCells[neighbor] = currCell;
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
    // returns path from startcell to target cell
    let currCell = this.previousCells[targetCell];
    const path: string[] = [targetCell];

    while (currCell) {
      path.push(currCell);
      currCell = this.previousCells[currCell];
    }

    this.previousCells = {};
    return path;
  }
}
