import React, { useRef, useCallback, MutableRefObject, useState, useEffect } from 'react';
import SchoolSchedule from '../../components/SchoolSchedule';
import { inject, observer } from 'mobx-react';
import SecureLs from 'secure-ls';
import moment from 'moment';

interface SchoolScheduleContainerProps {
    store?: any;
}

const SchoolScheduleContainer = ({ store } : SchoolScheduleContainerProps) => {
    const ls = new SecureLs({ encodingType: 'aes' });
    const [month, setMonth] = useState<string>(moment().format("yyyyMM"));
    const { handleGetSchedules, scheduleList } = store.ScheduleStore;
    const calendarRef: MutableRefObject<any> = useRef();
    const { school_id, office_code } = ls.get("schoolInfo");

    const requestSchedules = useCallback(() => {
        handleGetSchedules(school_id, office_code, month)
        .catch ((error: Error) => {
            console.log(error);
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