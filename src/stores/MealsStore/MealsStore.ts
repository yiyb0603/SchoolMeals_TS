import MealsRepository from './MealsRepository';
import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';
import { IMealsResponseType } from 'types/MealsType';
import { IError } from 'types/ErrorType';

@autobind
class MealsStore {
    @observable isLoading: boolean = false;

    @action
    handleGetMeals = async (school_id: string, office_code: string, date: string) => {
        // 학교 급식 받아오기
        try {
            this.isLoading = true;
            const response: IMealsResponseType = await MealsRepository.handleGetMeals(school_id, office_code, date);
            return new Promise((resolve: (response: IMealsResponseType) => void, reject: () => void) => {
                resolve(response);
            });
        } catch (error) {
            return new Promise((resolve: () => void, reject: (error: IError) => void) => {
                reject(error);
            });
        } finally {
            this.isLoading = false;
        }
    }
}

export default MealsStore;