import MealsRepository from './MealsRepository';
import { observable, action } from 'mobx';
import { autobind } from 'core-decorators';

@autobind
class MealsStore {
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
    handleYesterdayMeals = async (school_id: string, office_id: string) => {
        // 어제 급식정보
        try {
            const response: object = await MealsRepository.handleYesterdayMeals(school_id, office_id);
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
    handleTodayMeals = async (school_id: string, office_id: string) => {
        // 오늘 급식정보
        try {
            const response: object = await MealsRepository.handleTodayMeals(school_id, office_id);
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
    handleTomorrowMeals = async (school_id: string, office_id: string) => {
        // 내일 급식정보
        try {
            const response: object = await MealsRepository.handleTomorrowMeals(school_id, office_id);
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