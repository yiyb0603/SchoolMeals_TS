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
            const response: object = await MealsRepository.handleSchoolSearch(school_name, page);
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
    handleGetMeals = async (school_id: string, office_code: string) => {
        try {
            this.isLoading = true;
            const response: any = await MealsRepository.handleGetMeals(school_id, office_code, this.date);
            this.isLoading = false;
            return new Promise((resolve, reject) => {
                resolve(response);
            })
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            })
        }
    }

    @action
    handlePlusDay = () => {
        this.date = moment(this.date).add('+1', 'day').format('YYYY-MM-DD');
    }

    @action
    handleMinusDay = () => {
        this.date = moment(this.date).add('-1', 'day').format('YYYY-MM-DD');
    }
}

export default MealsStore;