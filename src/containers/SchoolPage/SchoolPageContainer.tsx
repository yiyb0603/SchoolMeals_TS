import React, { useState, useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string';
import moment from 'moment';
import SchoolPage from '../../components/SchoolPage';
import { Error } from 'type/ErrorType';

interface SchoolPageContainerProps {
    store?: {
        MealsStore: {
            handleGetMeals: (school_id: string, office_code: string, date: string) => Promise<Response | Error>,
            isLoading : boolean,
        };
    } | any;
};

const SchoolPageContainer = ({ store } : SchoolPageContainerProps) => {
    const { search } = useLocation();
    const { school_id, office_code }: ParsedQuery<string> = queryString.parse(search);

    type mealsResponseType = {
        status: number;
        data: {
            meals: never[];
        };
    };

    const [date, setDate] = useState<string>(moment().format("yyyyMMDD"));
    const [dailyMeals, setDailyMeals] = useState<string[]>([]);
    const { handleGetMeals, isLoading } = store.MealsStore;

    const requstDailyMeals = useCallback(() => {
        handleGetMeals(school_id, office_code, date)
            .then((response: mealsResponseType) => {
                setDailyMeals(response.data.meals);
            })
            .catch ((error: Error) => {
                const { status } = error.response.data;

                if (status === 404) {
                    setDailyMeals([]);
                }
                return error;
            })
    }, [date, handleGetMeals, office_code, school_id]);

    const handlePlusDay = useCallback(() => {
        setDate(moment(date).add('+1', 'day').format('yyyyMMDD'));
    }, [date]);

    const handleMinusDay = useCallback(() => {
        setDate(moment(date).add('-1', 'day').format('yyyyMMDD'));
    }, [date]);

    useEffect(() => {
        requstDailyMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date, setDate]);

    return (
        <SchoolPage dailyMeals ={dailyMeals} date ={date} handlePlusDay ={handlePlusDay} handleMinusDay ={handleMinusDay} isLoading ={isLoading} />
    );
}

export default inject('store')(observer(SchoolPageContainer));