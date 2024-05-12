"use client";

import { fullScreenState } from "@/app/_store/fullScreen";
import { useRecoilValue } from "recoil";

const FullScreen = () => {
  const fullScreen = useRecoilValue(fullScreenState);

  const ComponentToRender = fullScreen.component ? fullScreen.component() : null;

  return fullScreen.open && (
    <div className="w-screen h-screen fixed top-0 left-0 z-50">
      <>
        {ComponentToRender}
      </>
    </div>
  );
};


export default FullScreen;