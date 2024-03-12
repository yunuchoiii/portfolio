export interface IProjectGroup {
  id: number;
  eng_name: string;
  kor_name: string;
}

export interface IProject {
  id: number;
  eng_name: string;
  kor_name: string;
  parent_group_id: number;
  skill_id_list: number[];
  banner_img?: string;
  logo_img?: string;
  img_list?: string[];
  prize_list?: string[],
  summary?: string;
  start_date?: string;
  end_date?: string;
  role_introduction: string[];
  function?: string[];
  result?: string[];
}