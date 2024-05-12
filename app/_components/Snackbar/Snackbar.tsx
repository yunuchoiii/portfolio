"use client";

import { snackbarStateAtom } from "@/app/_store/snackbar";
import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";

const Snackbar = () => {
  const snackbarState = useRecoilValue(snackbarStateAtom)
  const resetSnackbarState = useResetRecoilState(snackbarStateAtom)

  useEffect(()=>{
    if (snackbarState.open) {
      setTimeout(()=>{
        resetSnackbarState()
      }, 3000)
    }
  }, [snackbarState.open])

  return <div
    className={`flex items-center justify-center fixed ${snackbarState.open ? "bottom-[30px]" : "-bottom-full"} left-1/2 -translate-x-1/2 py-3 px-5 rounded-full bg-blue-1 dark:bg-blue-4 bg-opacity-25 dark:bg-opacity-25 backdrop-blur box-shadow-2 transition-all duration-300`}
  >
    <i className="fa-solid fa-clone opacity-80 mr-2"></i>
    <div className="text-sm opacity-90 whitespace-nowrap">
      {snackbarState.message}
    </div>
  </div>
}

export default Snackbar;