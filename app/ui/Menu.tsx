import { DijkstrasAlgorithm } from "../algorithms/ dijkstrasalgorithm";
import { AStar } from "../algorithms/astar";
import { DFS } from "../algorithms/dfs";
import algoInfo from "../../public/data/algorithm_info.json";

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
  return (
    <div className=" bg-customedBlue p-6 flex flex-row gap gap-10 w-full">
      <div className="text-white text-[24px]">Pathfinder Viewer</div>
      <div className="p-auto flex flex-row gap gap-10">
        <div className="cell-info gap gap-2">
          <p className="text-white">Algorithm: </p>
          <select onChange={selectAlgo} className="btn">
            <option value="">Select an Option</option>
            <option value="dijkstras">Dijkstra's Algorithm</option>
            <option value="astar">A*</option>
            <option value="dfs">Depth First Search</option>
          </select>
        </div>

        <div className="cell-info gap gap-2">
          <div className=" individual-cell start-cell"></div>
          <p className=" text-white">Start Cell</p>
        </div>

        <div className="cell-info gap gap-2">
          <div className="individual-cell end-cell"></div>
          <p className="text-white">Target Cell</p>
        </div>

        <div className="cell-info gap gap-2">
          <div className="individual-cell wall-cell"></div>
          <p className="text-white">Wall</p>
        </div>

        <div className="cell-info gap gap-2">
          <div className="individual-cell path-cell"></div>
          <p className="text-white">Path</p>
        </div>

        <div className="cell-info gap gap-2">
          <div className="individual-cell visited-cell"></div>
          <p className="text-white">Visited Cell</p>
        </div>
      </div>
    </div>
  );
};
