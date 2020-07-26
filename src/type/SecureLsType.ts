export interface getSchoolInfoFrom_LS {
  school_name: string;
  school_locate?: string;
}

export interface secureLsType {
  get: (arg1: string) => getSchoolInfoFrom_LS;
  remove: (arg1: string) => void;
}