import MealsRepository from './MealsRepository';
import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';

@autobind
class MealsStore {
    @observable isLoading: boolean = false;
    @observable schoolList: never[] = [];

    @action
    handleSchoolSearch = async (school_name: string, page: number) => {
        // 학교 검색
        type searchResponseType = {
            status: number;
            data: {
                schools: never;
            };
        };

        try {
            this.isLoading = true;
            const response: searchResponseType = await MealsRepository.handleSchoolSearch(school_name, page);
            this.schoolList = response.data.schools;

            return new Promise((resolve: (response: searchResponseType) => void, reject: () => void) => {
                resolve(response);
            })
        } catch (error) {
            return new Promise((resolve: () => void, reject: (error: Error) => void) => {
                reject(error);
            })
        } finally {
            this.isLoading = false;
        }
    }

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