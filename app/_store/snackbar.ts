import { atom } from "recoil";

export const snackbarStateAtom = atom({
  key: "snackbarStateAtom",
  default: {
    open: false,
    message: "정상적으로 처리되었습니다.",
  }
})