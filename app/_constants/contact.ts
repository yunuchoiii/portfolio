export interface IContactInfo {
  [key:string] : IContactData
}
export interface IContactData {
  id: number;
  title: string;
  src?: string;
}

export const CONTACT_INFO:IContactInfo = {
  github: {
    id: 0,
    title: "GitHub",
    src: "https://github.com/yunuchoiii"
  },
}