import React from "react";

export const Instructions = () => {
  return (
    <div className="p-2 border border-black m-2">
      <b>Instructions:</b>
      <ol>
        <li>
          <span className="custom-number bold-text">1.</span> Select a starting
          point by clicking any cell. It should turn red. If you want to select
          a different cell, just click it again to unselect.
        </li>

        <li>
          <span className="custom-number bold-text">2.</span> Select a target
          point by clicking any other cell. It should turn green. If you want to
          select a different cell, just click it again to unselect. Make sure
          your starting cell has been selected first.
        </li>
        <li>
          <span className="custom-number bold-text">3.</span> Add walls
          (obstacles) by simply holding down the left click and dragging your
          mouse around the grid. To unselect a wall, repeat the same process.
          (NOTE: This feature might not work on touchscreen devives. Please
          generate a random maze.)
        </li>
        <li>
          <span className="custom-number bold-text">4.</span> Select an
          algorithm and click the "Start" button.
        </li>
      </ol>
    </div>
  );
};
