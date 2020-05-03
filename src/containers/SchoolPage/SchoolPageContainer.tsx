import React, { useCallback, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import SchoolPage from '../../components/SchoolPage';

interface SchoolPageContainerProps {
    store?: any;
}

const SchoolPageContainer = ({ store } : SchoolPageContainerProps) => {
    const school_id = JSON.parse(localStorage.getItem('schoolInfo') || '[]').school_id;
    const office_id = JSON.parse(localStorage.getItem('schoolInfo') || '[]').office_id;

    const [todayMeals, setTodayMeals] = useState([]);
    const { handleTodayMeals } = store.MealsStore;

    const requestTodayMeals = useCallback(() => {
        handleTodayMeals(school_id, office_id)
            .then ((response: any) => {
                console.log(response);
            })

            .catch ((error: any) => {
                console.log(error);
            })
    }, [handleTodayMeals, office_id, school_id]);

    useEffect(() => {
        requestTodayMeals();
    }, []);

    return (
        <>
            <SchoolPage />
        </>
    );
}

export default inject('store')(observer(SchoolPageContainer));