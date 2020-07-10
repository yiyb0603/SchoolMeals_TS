import MealsRepository from './MealsRepository';
import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';
import moment from 'moment';

@autobind
class MealsStore {
    @observable date: string = moment().format("yyyy-MM-DD");
    @observable isLoading: boolean = true;

    @action
    handleSchoolSearch = async (school_name: string, page: number) => {
        // 학교 검색
        try {
            const response: Response = await MealsRepository.handleSchoolSearch(school_name, page);
            return new Promise((resolve: (response: Response) => void, reject) => {
                resolve(response);
            })
        } catch (error) {
            return new Promise((resolve, reject: (error: Error) => void) => {
                reject(error);
            })
        }
    }

    @action
    handleGetMeals = async (school_id: string, office_code: string, date: string) => {
        try {
            this.isLoading = true;
            const response: Response = await MealsRepository.handleGetMeals(school_id, office_code, date);
            this.isLoading = false;
            return new Promise((resolve: (response: Response) => void, reject) => {
                resolve(response);
            })
        } catch (error) {
            return new Promise((resolve, reject: (error: Error) => void) => {
                reject(error);
            })
        }
    }
}

export default MealsStore;