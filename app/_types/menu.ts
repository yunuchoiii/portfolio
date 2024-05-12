export interface IMenu {
  index: number;
  title: string;
  korName: string;
  engName: string;
  children?: IMenu[]
  iconClassName?: string
}