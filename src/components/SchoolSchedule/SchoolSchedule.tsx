import React, { MutableRefObject } from 'react';
import Calendar from '@toast-ui/react-calendar';
import SecureLs from 'secure-ls';
import moment from 'moment';
import { FaSchool, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Loading from '../Common/Loading';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import './SchoolSchedule.scss';
import { scheduleCalendarType } from 'type/ScheduleType';
import { secureLsType, getSchoolInfoFrom_LS } from 'type/SecureLsType';

interface SchoolScheduleProps {
  calendarRef: MutableRefObject<Calendar>;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  month: string;
  isLoading: boolean;
  scheduleList: scheduleCalendarType[];
};

const SchoolSchedule = ({ calendarRef, handlePrevMonth, handleNextMonth, month, scheduleList, isLoading } : SchoolScheduleProps) => {
  const ls: secureLsType = new SecureLs({ encodingType: 'aes' });
  const { school_name }: getSchoolInfoFrom_LS = ls.get("schoolInfo");

  return (
    <div className ="SchoolSchedule">
      {
        isLoading && <Loading />
      }
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
          height ="80vh"
          ref={calendarRef}
          taskView ={true}
          schedules ={scheduleList}
          useDetailPopup ={true}
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