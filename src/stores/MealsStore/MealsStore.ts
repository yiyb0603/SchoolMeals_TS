import MealsRepository from './MealsRepository';
import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';

@autobind
class MealsStore {
    @observable todayMeals: string[] = [];

    @action
    handleSchoolSearch = async (school_name: string) => {
        // 학교 검색
        try {
            const response: object = await MealsRepository.handleSchoolSearch(school_name);
            return new Promise((resolve, reject) => {
                resolve(response);
            })
        } catch (e) {
            return new Promise((resolve, reject) => {
                reject(e);
            })
        }
    }

    @action
    handleGetMeals = async (school_id: string, office_id: string) => {
        try {
            const response: any = await MealsRepository.handleGetMeals(school_id, office_id);
            this.todayMeals = response.data.meal;
            return new Promise((resolve, reject) => {
                resolve(response);
            })
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }
}

export default MealsStore;