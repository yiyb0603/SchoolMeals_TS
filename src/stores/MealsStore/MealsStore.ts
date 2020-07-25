import MealsRepository from './MealsRepository';
import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';

@autobind
class MealsStore {
    @observable isLoading: boolean = false;

    @action
    handleGetMeals = async (school_id: string, office_code: string, date: string) => {
        // 학교 급식 받아오기
        try {
            this.isLoading = true;
            const response: Response = await MealsRepository.handleGetMeals(school_id, office_code, date);
            return new Promise((resolve: (response: Response) => void, reject: () => void) => {
                resolve(response);
            });
        } catch (error) {
            return new Promise((resolve: () => void, reject: (error: Error) => void) => {
                reject(error);
            });
        } finally {
            this.isLoading = false;
        }
    }
}

export default MealsStore;