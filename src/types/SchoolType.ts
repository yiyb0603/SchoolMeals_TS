// 학교 정보
export interface ISchoolType {
  school_name: string;
  office_code: string;
  school_id: string;
  school_locate: string;
}

// 학교 검색
export interface ISearchResponseType {
  status: number;
  message: string;
  data: {
    schools: ISchoolType[];
  };
}