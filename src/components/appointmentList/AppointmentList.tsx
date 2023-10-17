import React, { useEffect, useContext, useState, useCallback } from "react";
import AppointmentItem from "../appointmentItem.tsx/AppointmentItem";
import { AppointmentContext } from "../../context/appointments/AppointmentContext";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import CancelModal from "../modal/CancelModal";




function AppointmentList() {

	const { activeAppointments, getActiveAppointments, appointmentLoadingStatus } = useContext(AppointmentContext);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedId, selectId] = useState(0);

	useEffect(() => {
		getActiveAppointments();
	}, []);

	const handleOpenModal = useCallback((id: number) => {
		setIsOpen(true);
		selectId(id);
	}, []);



	if (appointmentLoadingStatus === 'loading') {
		return <Spinner />
	} else if (appointmentLoadingStatus === 'error') {
		return (
			<>
				<Error />
				<button className="shedule__reload" onClick={getActiveAppointments}>Try reload</button>
			</>
		)
	}

	return (
		<>
			{activeAppointments.map((item) => {
				return <AppointmentItem key={item.id} {...item} openModal={handleOpenModal}
				/>
			})}
			<CancelModal handleClose={setIsOpen} selectedId={selectedId} isOpen={isOpen} />
		</>
	);
}

export default AppointmentList;

