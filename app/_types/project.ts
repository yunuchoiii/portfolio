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
  features?: string[];
  results?: string[];
  show_yn?: boolean
}

// export const project_list:IProject[] = [
//   {
//     id: 0,
//     eng_name: "Admin System",
//     kor_name: "어드민 시스템",
//     parent_group_id: 0,
//     skill_id_list: [0, 1, 3, 5, 10, 15],
//     banner_img: "",
//     logo_img: "",
//     img_list: [],
//     summary: "회사 내부 사용자 및 SaaS 고객을 위한 어드민 시스템 프론트엔드 작업",
//     start_date: "2023.04",
//     end_date: "Now",
//     role_introduction: [
//       "프론트엔드 작업 전체", 
//       "UX/UI 디자인 작업 참여"
//     ],
//     features: [
//       "회사의 앱 및 이커머스 서비스 관리를 위한 내부 어드민 시스템입니다.",
//       "병원 클라이언트 대상으로 SaaS 기능을 제공합니다.",
//     ],
//     results: [
//       "Next.js, Typescript, Recoil 등의 최신 프론트 엔드 기술들을 실무 프로젝트에 처음으로 사용해봄으로써, 해당 기술들에 대한 심층적인 이해를 바탕으로 전문성을 크게 향상시켰습니다. 이는 프론트엔드 개발 역량 강화에 큰 도움이 되는 경험이었습니다.",
//       "디자인 단계에서 미처 고려되지 않은 사용자 인터페이스 개선 작업을 선제적으로 진행하고, 이를 디자이너와 협력하여 최적화하는 과정에서 사용자 경험(UX) 및 사용자 인터페이스(UI) 설계 능력을 향상시킬 수 있었습니다.",
//     ],
//   },
//   {
//     id: 1,
//     eng_name: "E-commerce System",
//     kor_name: "이커머스 시스템",
//     parent_group_id: 0,
//     skill_id_list: [0, 1, 3, 5, 10, 15],
//     banner_img: "",
//     logo_img: "",
//     img_list: [],
//     summary: "Shop In Shop 형태의 건강기능식품 이커머스 사이트 구축",
//     start_date: "2023.10",
//     end_date: "Now",
//     role_introduction: [
//       "프론트엔드 작업 전체", 
//       "UX/UI 디자인 작업 참여",
//     ],
//     features: [
//       "건강기능식품을 주된 제품으로 판매하는 이커머스 사이트입니다.",
//       "병원 클라이언트들의 상품을 판매하는 Shop In Shop 형태의 이커머스 입니다.",
//     ],
//     results: [
//       "이커머스 프론트엔드를 구축해본 첫 실무 경험으로써, 프로젝트의 초기 단계에서부터 프론트엔드 전체 아키텍처를 설계하며 프로젝트 관리 능력을 향상시킬 수 있는 기회였습니다.",
//       "디자인 팀의 디자인과 이커머스를 사용해본 개인적 경험을 토대로 사용자 경험을 최우선으로 고려하여, 직관적이고 사용자 친화적인 인터페이스를 개발하는 데 집중했습니다.",
//     ],
//   },
//   {
//     id: 2,
//     eng_name: "Insieat App",
//     kor_name: "인사잇 앱",
//     parent_group_id: 0,
//     skill_id_list: [6, 7],
//     banner_img: "",
//     logo_img: "",
//     img_list: [],
//     summary: "Flutter를 이용한 앱 작업",
//     start_date: "2023.06",
//     end_date: "Now",
//     role_introduction: [
//       "퍼블리싱 위주 개발 작업 참여",
//     ],
//     features: [
//       "공단 검진 정보를 토대로 식품처방 리포트를 생성하고 추천 식품 리스트를 제공하는 서비스입니다.",
//     ],
//     results: [
//       "Dart와 Flutter를 이용한 크로스 플랫폼 애플리케이션 개발에 처음 참여한 의미있는 경험이었습니다.",
//       "비록 현재까지는 앱 개발자를 도와 화면 퍼블리싱 위주로 참여하였으나, Flutter 기술 학습을 통해 프로젝트 진행에 기여도를 높이기 위해 노력하고 있습니다.",
//     ],
//   },
//   {
//     id: 3,
//     eng_name: "DIY Food",
//     kor_name: "집밥 김선생",
//     parent_group_id: 1,
//     skill_id_list: [2, 4, 5, 8],
//     github_link: "https://github.com/BobBob-3/DIYFood.git",
//     banner_img: "/images/projects/diyfood/banner.png",
//     logo_img: "/images/projects/diyfood/logo.png",
//     img_list: [],
//     summary: "경제적이고 건강한 식습관을 위한 식단 관리·계획 서비스",
//     prize_list: ["2022 공개 소프트웨어 개발자 대회 동상"],
//     start_date: "2022.07",
//     end_date: "2022.12",
//     role_introduction: [
//       "팀원 구성 : 백엔드 2명 + 프론트엔드 1명(본인)",
//       "프론트엔드 전체 작업",
//       "디자인 전체 작업",
//     ],
//     features: [
//       "실시간 식재료 가격 정보 API 를 이용해 설정된 예산을 기반으로 식단을 관리하도록 돕고 건강한 식습관을 유도하는 서비스입니다.",
//       "식단 계획·등록 및 식단 분석",
//       "선택한 식재료를 기반으로 레시피 정보 제공",
//       "실시간 식재료 시세 조회 기능",
//     ],
//     results: [
//       "이 프로젝트는 제 개발 경력의 출발점이 되었으며, 개발 부트캠프를 통해 습득한 지식을 실제로 적용해 본 첫 프로젝트 작업이었습니다.",
//       "저는 프론트엔드 개발과 UI/UX 디자인의 전반적인 작업을 단독으로 수행하며, 집중적이고 심도 있는 실무 경험을 쌓을 수 있었습니다. 끊임없는 연구와 개발로, 저는 개발 역량을 급속도로 향상시킬 수 있었습니다.",
//       "이는 2022년 공개 소프트웨어 개발자 대회에서의 입상으로 이어지며, 제 기술적 능력과 창의성을 인정받는 계기가 되었습니다. 이 프로젝트는 제 개발 인생의 첫 발걸음으로, 매우 의미 있는 경험이었습니다."
//     ],
//   },
//   {
//     id: 4,
//     eng_name: "Inventory Management Service",
//     kor_name: "재고 관리 서비스",
//     parent_group_id: 1,
//     skill_id_list: [2, 4, 5, 11, 16],
//     github_link: "https://github.com/yunuchoiii/InventoryManagement.git",
//     banner_img: "/images/projects/inventory/banner.png",
//     logo_img: "/images/projects/inventory/logo.png",
//     img_list: [],
//     summary: "입·출고 통계 및 관리를 위한 재고 관리 서비스",
//     start_date: "2022.12",
//     end_date: "2023.06",
//     role_introduction: [
//       "팀원 구성 : 백엔드 1명 + 프론트엔드 1명(본인)",
//       "프론트엔드 전체 작업",
//       "디자인 전체 작업",
//     ],
//     features: [
//       "입·출고 통계 및 관리를 위한 재고 관리 서비스입니다.",
//       "홈 대시보드 (재고량·입고량·출고량 추이 차트 및 기타 정보 제공)",
//       "입고·출고 조회, 등록, 수정, 삭제, 마감 기능",
//       "상품 조회, 등록, 수정, 삭제 기능",
//       "최초 진입시 기능 튜토리얼 제공",
//     ],
//     results: [
//       "'집밥 김선생' 프로젝트에 이어 Vue 프레임워크를 이용해 작업한 두번째 프로젝트로 SPA 프레임워크에 대한 이해도를 한층 더 높일 수 있는 기회였습니다.",
//       "지인의 요청으로 시작하게 된 프로젝트인만큼, 사용자 편의성을 최우선으로 UX·UI를 디자인하였으며 실제 사용자의 니즈에 맞는 서비스를 구축하기 위해 노력하였습니다.",
//       "데스크탑과 태블릿PC에 맞게 반응형 디자인을 적용하였으며 VueX 상태 관리를 이용한 첫 프로젝트이기도 하였습니다.",
//     ],
//   },
//   {
//     id: 5,
//     eng_name: "Next Movie",
//     kor_name: "Next Movie",
//     parent_group_id: 2,
//     skill_id_list: [0, 1, 4, 5],
//     github_link: "https://github.com/yunuchoiii/next-movie.git",
//     deployed_link: "https://yunu-next-movie.vercel.app",
//     banner_img: "/images/projects/nextmovie/banner.png",
//     logo_img: "/images/projects/nextmovie/logo.png",
//     img_list: [],
//     summary: "React + Next.js 실습용 영화 정보 제공 사이트",
//     start_date: "2023.03.18",
//     end_date: "2023.04.09",
//     role_introduction: [
//       "프론트엔드 전체 작업",
//       "디자인 전체 작업",
//     ],
//     features: [
//       "영화 목록 확인(인기순, 평가순, 상영 중)",
//       "영화 상세 정보 확인",
//       "영화 검색 기능 제공",
//     ],
//     results: [
//       "회사 프로젝트 투입 전 React와 Next.js 학습을 위해 진행했던 개인 프로젝트로 해당 기술들의 기초를 다질 수 있던 경험이었습니다.",
//     ],
//   },
//   {
//     id: 6,
//     eng_name: "YMDB",
//     kor_name: "YMDB",
//     parent_group_id: 2,
//     skill_id_list: [1, 4, 5],
//     github_link: "https://github.com/yunuchoiii/react-ymdb.git",
//     deployed_link: "https://yunuchoiii.github.io/react-ymdb",
//     banner_img: "/images/projects/ymdb/banner.png",
//     logo_img: "/images/projects/ymdb/logo.png",
//     img_list: [],
//     summary: "React 실습용 영화 정보 제공 사이트",
//     start_date: "2023.03.06",
//     end_date: "2023.03.11",
//     role_introduction: [
//       "프론트엔드 전체 작업",
//       "디자인 전체 작업",
//     ],
//     features: [
//       "영화 목록 확인(제목, 연도, 평가순, 다운로드 수, 좋아요 수)",
//       "영화 상세 정보 확인",
//     ],
//     results: [
//       "회사 프로젝트 투입 전 React 학습을 위해 진행했던 개인 프로젝트로 해당 기술의 기초를 다질 수 있던 경험이었습니다.",
//     ],
//   },
//   {
//     id: 7,
//     eng_name: "TOONMOA",
//     kor_name: "TOONMOA",
//     parent_group_id: 2,
//     skill_id_list: [6, 7],
//     github_link: "https://github.com/yunuchoiii/toonmoa.git",
//     banner_img: "/images/projects/toonmoa/banner.png",
//     logo_img: "/images/projects/toonmoa/logo.png",
//     img_list: [],
//     summary: "Flutter 실습용 웹툰 정보 제공 앱",
//     start_date: "2023.01.03",
//     end_date: "2023.01.06",
//     role_introduction: [
//       "프론트엔드 전체 작업",
//       "디자인 전체 작업",
//     ],
//     features: [
//       "네이버 요일 웹툰 리스트 제공",
//       "줄거리, 장르, 권장연령 등 웹툰에 대한 간단한 정보 표시",
//       "에피소드 목록 제공 및 에피소드 시청 기능"
//     ],
//     results: [
//       "회사 앱 개발 프로젝트 투입 전 Dart, Flutter 학습을 위해 진행했던 개인 프로젝트로 관련 강좌를 들으며 해당 기술들의 기초를 다질 수 있던 경험이었습니다.",
//     ],
//   },
//   {
//     id: 8,
//     eng_name: "JJH Math Academy",
//     kor_name: "수학학원 홈페이지 프로젝트",
//     parent_group_id: 2,
//     skill_id_list: [0, 1, 3, 5, 9],
//     github_link: "https://github.com/yunuchoiii/jjh-math-academy.git",
//     banner_img: "/images/projects/jjh/banner.png",
//     logo_img: "/images/projects/jjh/logo.png",
//     img_list: [],
//     summary: "수학학원 홈페이지 프로젝트",
//     start_date: "2023.10",
//     end_date: "Now",
//     role_introduction: [
//       "프론트엔드 전체 작업",
//       "디자인 전체 작업",
//     ],
//     features: [
//       "커리큘럼 정보 제공",
//     ],
//     show_yn: false,
//   },
//   {
//     id: 9,
//     eng_name: "Portfolio",
//     kor_name: "포트폴리오",
//     parent_group_id: 2,
//     skill_id_list: [0, 1, 3, 5, 9, 17],
//     github_link: "https://github.com/yunuchoiii/portfolio.git",
//     banner_img: "/images/projects/portfolio/banner.png",
//     logo_img: "/images/projects/portfolio/logo.png",
//     img_list: [],
//     summary: "프론트엔드 개발자 최서원의 포트폴리오입니다.",
//     start_date: "2024.03.01",
//     end_date: "Now",
//     role_introduction: [
//       "프론트엔드 전체 작업",
//       "디자인 전체 작업",
//     ],
//     features: [
//       "자기소개, 기술, 프로젝트 등의 정보를 랜딩페이지 형식으로 제공",
//       "Desktop, Tablet PC, Mobile 등 반응형 디자인 적용",
//     ],
//   },
// ]