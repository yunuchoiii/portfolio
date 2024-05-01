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
    className={`flex items-center justify-center fixed ${snackbarState.open ? "bottom-[30px]" : "-bottom-full"} left-1/2 -translate-x-1/2 py-2 px-5 rounded-full bg-blue-3 dark:bg-blue-4 bg-opacity-15 dark:bg-opacity-15 backdrop-blur shadow-md transition-all duration-300`}
  >
    <img src="/images/icons/copy.png" className="w-5 mr-2 invert-0 dark:invert opacity-70" />
    <div className="text-sm opacity-80">
      {snackbarState.message}
    </div>
  </div>
}

export default Snackbar;