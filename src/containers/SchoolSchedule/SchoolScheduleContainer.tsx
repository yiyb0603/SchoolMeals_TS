import React, { useRef, useCallback, MutableRefObject, useState, useEffect } from 'react';
import SchoolSchedule from '../../components/SchoolSchedule';
import { inject, observer } from 'mobx-react';
import SecureLs from 'secure-ls';
import moment from 'moment';

interface SchoolScheduleContainerProps {
    store?: any;
}

const SchoolScheduleContainer = ({ store } : SchoolScheduleContainerProps) => {
    type schoolInfo = {
        school_id: string;
        office_code: string;
    }

    type scheduleInfo = {
        handleGetSchedules: (school_id: string, office_code: string, month: string) => Promise<object>;
        scheduleList: string[]; 
    }

    const ls: {
        get: (arg1: string) => schoolInfo
    } = new SecureLs({ encodingType: 'aes' });

    const [month, setMonth] = useState<string>(moment().format("yyyyMM"));
    const calendarRef: MutableRefObject<any> = useRef();

    const { handleGetSchedules, scheduleList }: scheduleInfo = store.ScheduleStore;
    const { school_id, office_code }: schoolInfo = ls.get("schoolInfo");

    const requestSchedules = useCallback(() => {
        handleGetSchedules(school_id, office_code, month)
        .catch ((error: Error) => {
            return error;
        })
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
            handleNextMonth ={handleNextMonth} month ={month} scheduleList ={scheduleList} />
    );
}

export default inject('store')(observer(SchoolScheduleContainer));