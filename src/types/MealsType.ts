export interface IMealsResponseType {
  status: number;
  message: string;
  data: {
    meals: string[];
  };
}