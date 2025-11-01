import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { addMonths, differenceInDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

function RentalPeriod({ className, setRentalDays }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    useEffect(() => {
        if(startDate & endDate) {
            const days = differenceInDays(endDate,startDate);
            setRentalDays(days > 0 ? days : 1);
        } 
    }, [startDate, endDate, setRentalDays]);

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