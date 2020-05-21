import React, { useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import SchoolPage from '../../components/SchoolPage';

interface SchoolPageContainerProps {
    store?: any;
}

const SchoolPageContainer = ({ store } : SchoolPageContainerProps) => {
    const { school_code, office_code } = JSON.parse(localStorage.getItem('schoolInfo') || '[]');
    const { handleGetMeals, todayMeals } = store.MealsStore;

    const requestTodayMeals = useCallback(() => {
        handleGetMeals(school_code, office_code)
            .catch ((error: any) => {
                console.log(error);
            })
    }, [handleGetMeals, office_code, school_code]);

    useEffect(() => {
        requestTodayMeals();
    }, []);

    return (
        <>
            <SchoolPage todayMeals ={todayMeals} />
        </>
    );
}

export default inject('store')(observer(SchoolPageContainer));