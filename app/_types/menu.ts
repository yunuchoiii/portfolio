export interface IMenu {
  id: number;
  title: string;
  korName: string;
  engName: string;
  children?: IMenu[]
}