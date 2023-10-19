import { Calendar as LibCalendar } from "react-calendar";
import { useContext } from 'react';
import { AppointmentContext } from "../../context/appointments/AppointmentContext";
import 'react-calendar/dist/Calendar.css';
import "./calendar.scss";

function Calendar() {

	const { calendarDate, setDateAndFilter, getActiveAppointments } = useContext(AppointmentContext);

	return <div className="calendar">
		<LibCalendar value={calendarDate} onChange={(value) => {
			setDateAndFilter(value);
			getActiveAppointments();
		}} selectRange />
	</div>
}

export default Calendar;