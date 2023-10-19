import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { useContext, useEffect } from 'react';
import { AppointmentContext } from "../../context/appointments/AppointmentContext";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";


function HistoryList() {
	const { allAppointments, getAppointments, appointmentLoadingStatus, calendarDate } = useContext(AppointmentContext);

	useEffect(() => {
		getAppointments();
	}, [calendarDate]);



	if (appointmentLoadingStatus === 'loading') {
		return <Spinner />
	} else if (appointmentLoadingStatus === 'error') {
		return (
			<>
				<Error />
				<button className="shedule__reload" onClick={getAppointments}>Try reload</button>
			</>
		)
	}


	return (
		<>
			{allAppointments.map((item) => {
				return <AppointmentItem key={item.id} {...item}
				/>
			})}
		</>
	);
}

export default HistoryList;
