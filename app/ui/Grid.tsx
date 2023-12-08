import Link from "next/link";
import React, { useEffect, useState } from "react";
import arrow from "../../public/arrow.png";
import { Instructions } from "./Instructions";

export const Final = ({ selectedAlgo, changedBoo, algoInfo }: any) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [walls, setWalls] = useState<string[]>([]);
  const [startCell, setStartCell] = useState<string>("");
  const [targetCell, setTargetCell] = useState<string>("");

  const [visitedCells, setVisitedCells] = useState<any>([]);
  const [finalVisitedCells, setFinalVisitedCells] = useState<any>([]);

  const [shortestPath, setShortestPath] = useState<string[]>([]);
  const [finalShortestPath, setFinalShortestPath] = useState<string[]>([]);

  const [arrowDir, setArrowDir] = useState<string[][]>([[], [], [], []]);
  const [finalArrowDir, setFinalArrowDir] = useState<string[][]>([
    [],
    [],
    [],
    [],
  ]);

  const [printingAlgoPath, setPrintingAlgoPath] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buttonPressed, setButtonPressed] = useState<boolean>(false);
  const [showArrows, setShowArrows] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [totalCol, setTotalCol] = useState<number>(0);

  useEffect(() => {
    // updates the nmber of rows and cells depending on the device screen size
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    // Initial screen width
    updateScreenWidth();

    // Event listener for screen size changes
    window.addEventListener("resize", updateScreenWidth);

    setTotalRows(Math.floor(window.innerWidth / 24));
    setTotalCol(window.innerHeight * 1.5);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);
  const handleMouseDown = () => {
    // initializes function when mouse is pressed down
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    // initializes function when mouse is released
    setIsMouseDown(false);
  };

  const handleOnClick = (i: number) => {
    // initializes function when mouse is clicked
    const cell =
      document.querySelector(`[cell-key="${i}"]`)?.getAttribute("cell-pos") ||
      "";

    if (targetCell === cell) {
      setTargetCell("");
    } else if (startCell === cell) {
      setStartCell("");
    } else if (
      startCell.length > 0 &&
      targetCell === "" &&
      !walls.includes(cell)
    ) {
      setTargetCell(cell);
    } else if (startCell === "" && !walls.includes(cell)) {
      setStartCell(cell);
    } else if (
      startCell.length > 0 &&
      targetCell.length > 0 &&
      !walls.includes(cell)
    ) {
      setTargetCell(cell);
    }
  };

  const handleMouseEnter = (index: number) => {
    // initializes function when mouse enters a div with this functio assigned
    if (isMouseDown) {
      const currCell =
        document
          .querySelector(`[cell-key="${index}"]`)
          ?.getAttribute("cell-pos") || "";
      if (currCell === startCell || currCell === targetCell) {
        // do nothing because start or target cell should not be a wall
      } else if (walls.includes(currCell)) {
        setWalls((prevWalls: any) =>
          prevWalls.filter((selected: any) => selected !== currCell)
        );
      } else {
        setWalls((prevWalls: any) => [...prevWalls, currCell]);
      }
    }
  };

  const handleCheckboxChange = () => {
    // handles checkbox to show shrtest path directions
    setShowArrows(!showArrows);
  };

  const generateMaze = () => {
    // generates a random maze on the grid
    setWalls([]);
    for (let i = 1; i <= totalCol; i++) {
      const iswall = Math.random();
      const currCell =
        document.querySelector(`[cell-key="${i}"]`)?.getAttribute("cell-pos") ||
        "";
      if (
        (iswall < 0.3 && currCell !== startCell && currCell !== targetCell) ||
        (iswall < 0.3 && currCell !== targetCell && currCell !== startCell)
      ) {
        setWalls((prevWalls: any) => [...prevWalls, currCell]);
      }
    }
  };

  useEffect(() => {
    // starts when 'printingAlgoPath' or 'currentIndex' changes
    let intervalId: any;

    if (printingAlgoPath) {
      intervalId = setInterval(() => {
        if (currentIndex < visitedCells.length) {
          setFinalVisitedCells([
            ...finalVisitedCells,
            visitedCells[currentIndex],
          ]);
          setCurrentIndex(currentIndex + 1);
        } else {
          setPrintingAlgoPath(false); // Stop printing when all items are printed
        }
      }, 0.002);
    } else {
      setFinalShortestPath(shortestPath);
      setFinalArrowDir(arrowDir);
      clearInterval(intervalId); // Clear the interval when printing is stopped
    }
    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, [printingAlgoPath, currentIndex]);

  useEffect(() => {
    // starts when 'walls,' 'startCell,' or 'targetCell' changes
    if (buttonPressed && startCell !== "" && targetCell !== "") {
      const currAlgo = selectedAlgo;
      const algoVisitedCells = currAlgo.algorithm(startCell, targetCell, walls);
      const algoShortestSolu = currAlgo.getPath(targetCell);

      setFinalVisitedCells(algoVisitedCells);
      setFinalShortestPath(algoShortestSolu);
      setFinalArrowDir(currAlgo.arrowDirections);
    } else if (
      (buttonPressed && startCell === "") ||
      (buttonPressed && targetCell === "")
    ) {
      resetViewer();
      setFinalArrowDir(arrowDir);
    }
  }, [walls, startCell, targetCell]);

  const startAlgorithmSol = () => {
    // initializes function to print shortes path (yellow path) from the selected algorithm
    setCurrentIndex(0);
    setPrintingAlgoPath(true);
  };

  const resetCells = () => {
    // resets 'startCell,' 'targetCell,' and 'walls'
    setWalls([]);
    setStartCell("");
    setTargetCell("");
    setArrowDir([[], [], [], []]);
  };

  const resetViewer = () => {
    // resets all necessary variables for the grid
    setVisitedCells([]);
    setShortestPath([]);
    setArrowDir([[], [], [], []]);
    setPrintingAlgoPath(false);
    setCurrentIndex(0);
    setFinalShortestPath([]);
    setFinalVisitedCells([]);
    setFinalArrowDir([[], [], [], []]);
  };

  const resetButton = () => {
    // calls reset functions when button is pressed
    resetCells();
    resetViewer();
    setButtonPressed(false);
  };

  const startAnimation = () => {
    // start algorithm functions and animates the behavior of the same after calling functions
    if (startCell === "" || targetCell === "") {
      // if any of the 'startCell' or 'targetCell' are not set in the viewer, nothing will happen
      return;
    }
    // resets necessary variables before running algorithm
    setVisitedCells([]);
    setFinalVisitedCells([]);
    setShortestPath([]);
    setFinalShortestPath([]);
    setFinalArrowDir([[], [], [], []]);
    setArrowDir([[], [], [], []]);

    // initializing algorithm
    const currAlgo = selectedAlgo;
    const visitedCells = currAlgo.algorithm(startCell, targetCell, walls);
    setVisitedCells(visitedCells);
    startAlgorithmSol();
    setShortestPath(currAlgo.getPath(targetCell));
    setArrowDir(currAlgo.arrowDirections);

    if (startCell !== "" && targetCell !== "") {
      // enables the start button if 'startCell' and 'targetCell' are not empty
      setButtonPressed(true);
    }
  };

  // logic for creating different cells (nodes) and assigning corresponding position
  let individualCells: JSX.Element[] = [];
  let rows = [];
  let j = 0; // rows
  let k = 0; // cols
  for (let i = 1; i <= totalCol; i++) {
    rows.push(
      <div
        key={i}
        className={`individual-cell ${
          startCell === String(j) + "," + String(k)
            ? "bg-red-600"
            : targetCell === String(j) + "," + String(k)
            ? "bg-green-600"
            : walls.includes(String(j) + "," + String(k))
            ? "wall-cell"
            : finalShortestPath.includes(String(j) + "," + String(k))
            ? "path-cell"
            : finalVisitedCells.includes(String(j) + "," + String(k))
            ? "visited-cell"
            : ""
        } flex items-center justify-center`}
        onMouseEnter={() => handleMouseEnter(i)}
        onClick={() => handleOnClick(i)}
        cell-pos={String(j) + "," + String(k)}
        cell-key={i}
      >
        <img
          src="/arrow.png" // Replace with the actual path to your image
          alt="Cell Image"
          className={`w-[20px] h-auto select-none ${
            finalArrowDir[0].includes(String(j) + "," + String(k)) && showArrows
              ? "block transform  -rotate-180"
              : finalArrowDir[1].includes(String(j) + "," + String(k)) &&
                showArrows
              ? "block transform rotate-90 "
              : finalArrowDir[2].includes(String(j) + "," + String(k)) &&
                showArrows
              ? "block"
              : finalArrowDir[3].includes(String(j) + "," + String(k)) &&
                showArrows
              ? "block transform -rotate-90"
              : "hidden"
          }`}
        />{" "}
      </div>
    );
    k++;

    if (i % totalRows === 0) {
      individualCells.push(
        <div key={i} className="flex flex-wrap">
          {rows}
        </div>
      );
      rows = [];
      j++;
      k = 0;
    }
  }

  return (
    <div>
      <div className="min-h-[60px] items-center justify-center py-3 grid-rows-2 grid-flow-col sm:flex">
        <div className="flex items-center justify-center ">
          <button
            onClick={startAnimation}
            className={`btn px-5 m-3 ${!changedBoo ? "opacity-50" : ""}`}
            disabled={!changedBoo}
          >
            Start
          </button>
          <button onClick={resetButton} className="btn px-5 m-3">
            Reset
          </button>
          <button onClick={generateMaze} className="btn px-5 m-3">
            Generate Maze
          </button>
        </div>

        <div className="col-span-3 flex justify-center items-center">
          <label>
            <input
              type="checkbox"
              checked={showArrows}
              onChange={handleCheckboxChange}
              className=" mr-1"
            />
            Show Path directions
          </label>
        </div>
      </div>

      <div className=" md:min-h-[120px] flex items-center justify-center ">
        <div className={`${JSON.parse(algoInfo).info ? "hidden" : "block"}`}>
          <Instructions />
        </div>

        <p
          className={`${
            JSON.parse(algoInfo).info
              ? "xl:mx-40 m-5 p-2 text-center border border-black"
              : "hidden"
          }`}
        >
          {JSON.parse(algoInfo).info}
          <Link
            href={JSON.parse(algoInfo).source || ""}
            className={`${
              JSON.parse(algoInfo).source
                ? "block text-blue-600 underline"
                : "hidden"
            }`}
          >
            Learn More
          </Link>
        </p>
      </div>
      <div
        className={`flex flex-col justify-center items-center`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {individualCells}
      </div>
    </div>
  );
};
