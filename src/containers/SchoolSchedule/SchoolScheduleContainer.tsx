import React, { useRef, useCallback, MutableRefObject, useState, useEffect } from 'react';
import SchoolSchedule from '../../components/SchoolSchedule';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

interface SchoolScheduleContainerProps {
    store?: {
        ScheduleStore: {
            handleGetSchedules: (school_id: string, office_code: string, month: string) => void | Promise<Error>,
            scheduleList: object[];
            isLoading: boolean;
        };
    } | any;
}

const SchoolScheduleContainer = ({ store } : SchoolScheduleContainerProps) => {
    const [month, setMonth] = useState<string>(moment().format("yyyyMM"));
    const { search } = useLocation();
    const { school_id, office_code } = queryString.parse(search);
    const calendarRef: MutableRefObject<any> = useRef();

    const { handleGetSchedules, scheduleList, isLoading } = store.ScheduleStore;
    console.log(scheduleList);
    const requestSchedules = useCallback(async () => {
        await handleGetSchedules(school_id, office_code, month)
            .catch ((error: Error) => {
                return error;
            });
    }, [handleGetSchedules, month, office_code, school_id]);

    const handlePrevMonth = useCallback(() => {
        const calendarInstance = calendarRef.current.getInstance();
        calendarInstance.prev();

        setMonth(moment(month).add('-1', 'month').format('yyyyMM'));
    }, [month]);

    const handleNextMonth = useCallback(() => {
        const calendarInstance = calendarRef.current.getInstance();
        calendarInstance.next();

        setMonth(moment(month).add('+1', 'month').format('yyyyMM'));
    }, [month]);

    useEffect(() => {
        requestSchedules();
    }, [requestSchedules]);

    return (
        <SchoolSchedule calendarRef ={calendarRef} handlePrevMonth ={handlePrevMonth} 
            handleNextMonth ={handleNextMonth} month ={month} scheduleList ={scheduleList} isLoading ={isLoading} />
    );
}

export default inject('store')(observer(SchoolScheduleContainer));