import React, { useState, useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string';
import moment from 'moment';
import SchoolPage from '../../components/SchoolPage';
import { IError } from 'types/ErrorType';
import { IMealsResponseType } from 'types/MealsType';
import { IMealsStoreType } from 'types/StoreType';

interface SchoolPageContainerProps {
    store?: {
        MealsStore: IMealsStoreType
    } | any;
};

const SchoolPageContainer = ({ store } : SchoolPageContainerProps) => {
    const days: string[] = ["일", "월", "화", "수", "목", "금", "토"];
    const { search } = useLocation<History>();
    const { school_id, office_code }: ParsedQuery<string> = queryString.parse(search);

    const [date, setDate] = useState<string>(moment().format("yyyyMMDD"));
    const dateParse: string = moment(date).toString();
    const dayIndex: number = new Date(dateParse).getDay();
    const dayName: string = days[dayIndex];

    const [dailyMeals, setDailyMeals] = useState<string[]>([]);
    const { handleGetMeals, isLoading } = store.MealsStore;

    const requstDailyMeals = useCallback(() => {
        handleGetMeals(school_id, office_code, date)
            .then((response: IMealsResponseType) => {
                setDailyMeals(response.data.meals);
            })

            .catch ((error: IError) => {
                const { status } = error.response.data;

                if (status === 404) {
                    setDailyMeals([]);
                }
                return error;
            });
    }, [date, handleGetMeals, office_code, school_id]);

    const handlePlusDay = useCallback(() => {
        setDate(moment(date).add('+1', 'day').format('yyyyMMDD'));
    }, [date]);

    const handleMinusDay = useCallback(() => {
        setDate(moment(date).add('-1', 'day').format('yyyyMMDD'));
    }, [date]);

    useEffect(() => {
        setDate(moment(date).format('yyyyMMDD'));
        requstDailyMeals();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, setDate]);

    return (
        <SchoolPage dailyMeals ={dailyMeals} date ={date} handlePlusDay ={handlePlusDay} 
            handleMinusDay ={handleMinusDay} dayName ={dayName} isLoading ={isLoading} 
        />
    );
}

export default inject('store')(observer(SchoolPageContainer));