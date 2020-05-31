import React, { MutableRefObject } from 'react';
import Calendar from '@toast-ui/react-calendar';
import SecureLs from 'secure-ls';
import { FaSchool, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import moment from 'moment';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import './SchoolSchedule.scss';

interface SchoolScheduleProps {
    calendarRef: MutableRefObject<any>;
    handlePrevMonth: () => void;
    handleNextMonth: () => void;
    month: string;
    scheduleList: any;
}

const SchoolSchedule = ({ calendarRef, handlePrevMonth, handleNextMonth, month, scheduleList } : SchoolScheduleProps) => {
  const ls = new SecureLs({ encodingType: 'aes' });
  const { school_name } = ls.get("schoolInfo");

  return (
    <div className ="SchoolSchedule">
      <div className ="SchoolSchedule-SchoolName">
        <FaSchool /> <span>{school_name}의 일정</span>
      </div>
        <div className ="SchoolSchedule-Date">
          <button onClick ={handlePrevMonth}><FaArrowLeft /></button>
          <span>{moment(month).format("yyyy년 MM월")}</span>
          <button onClick ={handleNextMonth}><FaArrowRight /></button>
        </div>

      <div className ="SchoolSchedule-Calendar">
        <Calendar
          height ="90vh"
          ref={calendarRef}
          taskView
          schedules ={scheduleList}
          useDetailPopup
          view="month"
          isReadOnly ={true}
          month={{
            daynames: [
              '일요일',
              '월요일',
              '화요일',
              '수요일',
              '목요일',
              '금요일',
              '토요일',
            ],
          }}
        />
      </div>
    </div>
  );
}

export default SchoolSchedule;