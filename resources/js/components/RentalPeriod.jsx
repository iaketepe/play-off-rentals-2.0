import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { addMonths } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

function RentalPeriod({ className }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    return <DatePicker
        className={className || ""}
        selected={startDate}
        onChange={onChange}
        minDate={new Date()}
        maxDate={addMonths(new Date(), 5)}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        showDisabledMonthNavigation
        required
    />;
}

export default RentalPeriod;