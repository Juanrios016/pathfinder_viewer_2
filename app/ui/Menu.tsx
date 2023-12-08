import { DijkstrasAlgorithm } from "../algorithms/ dijkstrasalgorithm";
import { AStar } from "../algorithms/astar";
import { DFS } from "../algorithms/dfs";
import algoInfo from "../../public/data/algorithm_info.json";
import { useState } from "react";
import { Instructions } from "./Instructions";

export const Menu = ({ onValueChange }: any) => {
  const selectAlgo = (e: any) => {
    // function that selects algorithm based on dropdown
    if (e.target.value === "dijkstras") {
      onValueChange([new DijkstrasAlgorithm(), algoInfo.dijkstras]);
    } else if (e.target.value === "astar") {
      onValueChange([new AStar(), algoInfo.astar]);
    } else if (e.target.value === "dfs") {
      onValueChange([new DFS(), algoInfo.dfs]);
    }
  };

  const [showGlossary, setShowGlossary] = useState<boolean>(false);

  const toggleGlossary = () => {
    setShowGlossary(!showGlossary);
  };
  return (
    <div className="w-full">
      <div className=" bg-customedBlue text-center p-6 flex flex-col md:flex-row gap gap-x-10 gap-y-5">
        <div className="text-white text-[24px]">Pathfinder Viewer</div>
        <div className="p-auto flex gap gap-x-10 sm:flex-row flex-col">
          <button
            onClick={toggleGlossary}
            className="p-2 text-white flex m-auto xl:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {showGlossary ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
            <p className=" ml-4 text-[16px] font-bold">
              Glossary & Instructions
            </p>
          </button>

          <div className="cell-info gap gap-2">
            <p className="text-white">Algorithm: </p>
            <select onChange={selectAlgo} className="btn">
              <option value="">Select an Option</option>
              <option value="dijkstras">Dijkstra's Algorithm</option>
              <option value="astar">A*</option>
              <option value="dfs">Depth First Search</option>
            </select>
          </div>

          <div className=" hidden xl:flex">
            <div className="cell-info mx-2 ">
              <div className=" individual-cell start-cell mx-2"></div>
              <p className=" text-white">Start Cell</p>
            </div>

            <div className="cell-info mx-2">
              <div className="individual-cell end-cell mx-2"></div>
              <p className="text-white">Target Cell</p>
            </div>

            <div className="cell-info mx-2">
              <div className="individual-cell wall-cell mx-2"></div>
              <p className="text-white">Wall</p>
            </div>

            <div className="cell-info mx-2">
              <div className="individual-cell path-cell mx-2"></div>
              <p className="text-white">Path</p>
            </div>

            <div className="cell-info mx-2">
              <div className="individual-cell visited-cell mx-2"></div>
              <p className="text-white">Visited Cell</p>
            </div>
          </div>
        </div>
      </div>
      {showGlossary && (
        <div className="xl:hidden inset-x-0 top-36 p-2 space-y-2 bg-white shadow-md border">
          <div className="sm:flex sm:items-center sm:justify-center grid grid-cols-2 gap-5 py-5 ">
            <div className="cell-info gap gap-2">
              <div className=" individual-cell start-cell"></div>
              <p className=" text-black">Start Cell</p>
            </div>

            <div className="cell-info gap gap-2">
              <div className="individual-cell end-cell"></div>
              <p className="text-black">Target Cell</p>
            </div>

            <div className="cell-info gap gap-2">
              <div className="individual-cell wall-cell"></div>
              <p className="text-black">Wall</p>
            </div>

            <div className="cell-info gap gap-2">
              <div className="individual-cell path-cell"></div>
              <p className="text-black">Path</p>
            </div>

            <div className="cell-info gap gap-2">
              <div className="individual-cell visited-cell"></div>
              <p className="text-black">Visited Cell</p>
            </div>
          </div>
          <Instructions />
        </div>
      )}
    </div>
  );
};
