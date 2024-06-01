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
  github_link?: string;
  deployed_link?: string;
  banner_img?: string;
  logo_img?: string;
  img_list?: string[];
  prize_list?: string[],
  summary?: string;
  start_date?: string;
  end_date?: string;
  role_introduction?: string[];
  features?: IProjectFeature[];
  troubles?: IProjectTrouble[];
  results?: string[];
  show_yn?: boolean
}

export interface IProjectFeature {
  feature: string;
  description: string[];
}

export interface IProjectTrouble {
  trouble: string;
  solution: string[];
  comparation: string[];
}