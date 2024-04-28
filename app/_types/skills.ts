export interface ISkillGroup {
  id: number
  title: string
}

export interface ISkill {
  id: number
  parent_id: number
  title: string
  img: string
  background: string
  grade: number
  show_yn?: boolean
}