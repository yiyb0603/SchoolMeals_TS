import React from 'react';
import SchoolScheduleContainer from '../containers/SchoolSchedule/SchoolScheduleContainer';
import PageTemplate from '../components/Common/PageTemplate';

const SchoolSchedulePage = () => {
    return (
        <PageTemplate>
            <SchoolScheduleContainer />
        </PageTemplate>
    );
};

export default SchoolSchedulePage;