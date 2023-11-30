// ViewerState.ts

import { useState, useEffect } from "react";
import { DijkstrasAlgorithm } from "../algorithms/ dijkstrasalgorithm";

export const useViewerState = ({ selectedAlgo }: any) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedWalls, setSelectedWalls] = useState<any>([]);
  const [walls, setWalls] = useState<String[]>([]);
  const [startCell, setStartCell] = useState<string>("");
  const [endCell, setEndCell] = useState<string>("");
  const [visitedNodes, setVisitedNodes] = useState<any>([]);
  const [shortestPath, setShortestPath] = useState<string[]>([]);
  const [printingAlgoPath, setPrintingAlgoPath] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [w, setW] = useState<string[]>([]);
  const [d, setD] = useState<any>([]);
  const [button, setButtonPressed] = useState<any>(false);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  useEffect(() => {
    let intervalId: any;

    if (printingAlgoPath) {
      intervalId = setInterval(() => {
        if (currentIndex < visitedNodes.length) {
          setD([...d, visitedNodes[currentIndex]]);
          setCurrentIndex(currentIndex + 1);
        } else {
          setPrintingAlgoPath(false); // Stop printing when all items are printed
        }
      }, 1);
    } else {
      setW(shortestPath);
      clearInterval(intervalId); // Clear the interval when printing is stopped
    }

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, [printingAlgoPath, currentIndex]);

  useEffect(() => {
    if (button) {
      console.log("walls: ", walls);

      const q = new DijkstrasAlgorithm();
      const p = q.dijkstrasAlgorithm(startCell, endCell, walls);
      const c = q.getPath();
      console.log("c: ", c);

      setD(p);
      console.log("d: ", d);
      setW(c);
      console.log("w: ", w);
    }
  }, [walls]);

  const startAlgorithmSol = () => {
    setCurrentIndex(0); // Reset the index
    setPrintingAlgoPath(true);
  };

  const resetViewer = () => {
    setSelectedWalls([]);
    setWalls([]);
    setStartCell("");
    setEndCell("");
    setVisitedNodes([]);
    setShortestPath([]);
    setPrintingAlgoPath(false);
    setCurrentIndex(0);
    setW([]);
    setD([]);
    setButtonPressed(false);
  };

  return {
    isMouseDown,
    selectedWalls,
    walls,
    startCell,
    endCell,
    w,
    d,
    handleMouseDown,
    handleMouseUp,
    startAlgorithmSol,
    resetViewer,
    setWalls,
    setStartCell,
    setEndCell,
    setVisitedNodes,
    setShortestPath,
    setButtonPressed,
    setSelectedWalls,
  };
};
