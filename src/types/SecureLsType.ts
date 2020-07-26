export interface IGetSchoolInfoFrom_LS {
  school_name: string;
  school_locate?: string;
}

export interface ISecureLsType {
  get: (arg1: string) => IGetSchoolInfoFrom_LS;
  remove: (arg1: string) => void;
}