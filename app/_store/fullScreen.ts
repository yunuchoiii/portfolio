import { atom } from "recoil";

export const fullScreenState = atom({
  key: "fullScreenState",
  default: {
    open: false,
    component: ()=>{},
  }
})