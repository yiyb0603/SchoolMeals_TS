import React, { useState, useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import SchoolPage from '../../components/SchoolPage';
import SecureLs from 'secure-ls';

interface SchoolPageContainerProps {
    store?: any;
}

const SchoolPageContainer = ({ store } : SchoolPageContainerProps) => {
    const ls = new SecureLs({ encodingType: 'aes' });
    const [todayMeals, setTodayMeals] = useState([]);
    const { handleGetMeals, date } = store.MealsStore;
    const { school_id, office_code } = ls.get("schoolInfo");

    const requestTodayMeals = useCallback(() => {
        handleGetMeals(school_id, office_code)
            .then ((response: { status: number; data: { meals: React.SetStateAction<never[]>; }; }) => {
                if (response.status === 200) {
                    setTodayMeals(response.data.meals);
                }
            })

            .catch ((error: any) => {
                console.log(error);
            })
    }, [handleGetMeals, office_code, school_id]);

    useEffect(() => {
        requestTodayMeals();
    }, []);

    return (
        <>
            <SchoolPage todayMeals ={todayMeals} date ={date} requestTodayMeals ={requestTodayMeals} />
        </>
    );
}

export default inject('store')(observer(SchoolPageContainer));