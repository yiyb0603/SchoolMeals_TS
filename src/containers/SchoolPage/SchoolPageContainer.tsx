import React, { useState, useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import SchoolPage from '../../components/SchoolPage';
import SecureLs from 'secure-ls';
import moment from 'moment';

interface SchoolPageContainerProps {
    store?: any;
}

const SchoolPageContainer = ({ store } : SchoolPageContainerProps) => {
    type schoolInfoType = {
        school_id: string;
        office_code: string;
    }

    type mealsResponseType = {
        status: number;
        data: {
            meals: string[];
        };
    };

    const ls: {
        get: (arg1: string) => schoolInfoType;
    } = new SecureLs({ encodingType: 'aes' });

    const [todayMeals, setTodayMeals] = useState<string[]>([]);
    const [date, setDate] = useState<string>(moment().format("yyyyMMDD"));
    
    const { handleGetMeals }: { 
        handleGetMeals: (school_id: string, office_code: string, date: string) => Promise<mealsResponseType>
    } = store.MealsStore;
    const { school_id, office_code }: schoolInfoType = ls.get("schoolInfo");

    const requestTodayMeals = useCallback(() => {
        handleGetMeals(school_id, office_code, date)
            .then ((response: mealsResponseType) => {
                if (response.status === 200) {
                    setTodayMeals(response.data.meals);
                }
            })

            .catch ((error: any) => {
                console.log(error);
            })
    }, [date, handleGetMeals, office_code, school_id]);

    const handlePlusDay = useCallback(() => {
        setDate(moment(date).add('+1', 'day').format('yyyyMMDD'));
    }, [date]);

    const handleMinusDay = useCallback(() => {
        setDate(moment(date).add('-1', 'day').format('yyyyMMDD'));
    }, [date]);

    useEffect(() => {
        requestTodayMeals();
    }, [requestTodayMeals, date, setDate]);

    return (
        <>
            <SchoolPage todayMeals ={todayMeals} date ={date} requestTodayMeals ={requestTodayMeals} 
                handlePlusDay ={handlePlusDay} handleMinusDay ={handleMinusDay} />
        </>
    );
}

export default inject('store')(observer(SchoolPageContainer));