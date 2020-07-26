import React, { useRef, useCallback, MutableRefObject, useState, useEffect } from 'react';
import SchoolSchedule from '../../components/SchoolSchedule';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import queryString, { ParsedQuery } from 'query-string';
import { useLocation } from 'react-router-dom';
import { Error } from 'type/ErrorType';
import { scheduleStoreType } from 'type/StoreType';
import Calendar from '@toast-ui/react-calendar';

interface SchoolScheduleContainerProps {
    store?: {
        ScheduleStore: scheduleStoreType
    } | any;
}

const SchoolScheduleContainer = ({ store } : SchoolScheduleContainerProps) => {
    const [month, setMonth] = useState<string>(moment().format("yyyyMM"));
    const { search } = useLocation<History>();
    const { school_id, office_code }: ParsedQuery<string> = queryString.parse(search);
    const calendarRef: MutableRefObject<any> = useRef();

    const { handleGetSchedules, scheduleList, isLoading } = store.ScheduleStore;
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