"use client";

import { Menu } from "./ui/Menu";
import { useState } from "react";
import { Final } from "./ui/Grid";
import Footer from "./ui/Footer";

export default function Home() {
  const [selectedAlgo, setSelectedAlgo] = useState("");
  const [changedBoo, setChangedBoo] = useState(false);
  const [algoInfo, setAlgoInfo] = useState<string>("");

  const handleValueChange = (selectedAlgo: any) => {
    setSelectedAlgo(selectedAlgo[0]);
    setChangedBoo(true);
    setAlgoInfo(selectedAlgo[1]);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Menu onValueChange={handleValueChange} />
      <Final
        selectedAlgo={selectedAlgo}
        changedBoo={changedBoo}
        algoInfo={JSON.stringify(algoInfo)}
      />
      <Footer />
    </main>
  );
}
