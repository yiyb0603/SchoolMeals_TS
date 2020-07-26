export interface mealsResponseType {
  status: number;
  message: string;
  data: {
    meals: string[];
  };
}