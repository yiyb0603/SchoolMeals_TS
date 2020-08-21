import React, { useRef, useCallback, useState, useEffect } from 'react';
import SchoolSchedule from '../../components/SchoolSchedule';
import { observer } from 'mobx-react';
import moment from 'moment';
import queryString, { ParsedQuery } from 'query-string';
import { useLocation } from 'react-router-dom';
import { IError } from 'types/ErrorType';
import { IScheduleStoreType } from 'types/StoreType';
import useStores from 'lib/useStores';
import Calendar from '@toast-ui/react-calendar';

const SchoolScheduleContainer = observer(() => {
    const { store } = useStores();

    const [month, setMonth] = useState<string>(moment().format("yyyyMM"));
    const { search } = useLocation<History>();
    const { school_id, office_code }: ParsedQuery<string> = queryString.parse(search);
    const calendarRef = useRef<Calendar | null>(null);

    const { handleGetSchedules, scheduleList, isLoading }: IScheduleStoreType = store.ScheduleStore;
    const requestSchedules = useCallback(async () => {
        await handleGetSchedules(school_id, office_code, month)
            .catch ((error: IError) => {
                return error;
            });
    }, [handleGetSchedules, month, office_code, school_id]);

    const handlePrevMonth = useCallback(() => {
        if (calendarRef.current !== null) {
            const calendarInstance = calendarRef.current.getInstance();
            calendarInstance.prev();

            setMonth(moment(month).add('-1', 'month').format('yyyyMM'));
        }
    }, [month]);

    const handleNextMonth = useCallback(() => {
        if (calendarRef.current !== null) {
            const calendarInstance = calendarRef.current.getInstance();
            calendarInstance.next();

            setMonth(moment(month).add('+1', 'month').format('yyyyMM'));
        }
    }, [month]);

    useEffect(() => {
        requestSchedules();
    }, [requestSchedules]);

    return (
        <SchoolSchedule calendarRef ={calendarRef} handlePrevMonth ={handlePrevMonth} 
            handleNextMonth ={handleNextMonth} month ={month} scheduleList ={scheduleList} isLoading ={isLoading}
        />
    );
});

export default SchoolScheduleContainer;