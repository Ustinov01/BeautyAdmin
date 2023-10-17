import Portal from "../portal/Portal";
import { useRef, useEffect, useState, useContext } from 'react'
import useAppointmentService from "../../services/AppointmentService";
import { AppointmentContext } from "../../context/appointments/AppointmentContext";
import { CSSTransition } from "react-transition-group";
import "./modal.scss";

interface IModalProps {
	handleClose: (state: boolean) => void;
	selectedId: number
	isOpen: boolean;
}

function CancelModal({ handleClose, selectedId, isOpen }: IModalProps) {
	const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
	const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);

	const { cancelOneAppointment } = useAppointmentService();
	const { getActiveAppointments } = useContext(AppointmentContext);

	const nodeRef = useRef<HTMLDivElement>(null);
	const cancelStatusRef = useRef<boolean | null>(null);



	const handleCancelAppointment = (id: number) => {
		setBtnDisabled(true);
		cancelOneAppointment(id).then(() => {
			console.log('done');
			setCancelStatus(true);
		}).catch(() => {
			console.log('error');
			setCancelStatus(false);
			setBtnDisabled(false);

		})
	}

	const closeModal = () => {
		handleClose(false);
		if (cancelStatus || cancelStatusRef.current) {
			getActiveAppointments();
		}
	}

	const closeOnEscape = (e: KeyboardEvent): void => {
		if (e.key === 'Escape') {
			closeModal();
		}
	}

	useEffect(() => {
		cancelStatusRef.current = cancelStatus;
	}, [cancelStatus]);

	useEffect(() => {
		document.body.addEventListener('keydown', closeOnEscape);


		return () => {
			document.body.removeEventListener('keydown', closeOnEscape);
		}
	}, [handleClose]);


	return (
		<Portal>
			<CSSTransition
				in={isOpen}
				timeout={{ enter: 500, exit: 500 }}
				unmountOnExit
				classNames='modal'
			>
				<div className="modal" ref={nodeRef}>
					<div className="modal__body">
						<span className="modal__title">
							Are you sure you want to delete the appointment? #{selectedId}
						</span>
						<div className="modal__btns">
							<button className="modal__ok" disabled={btnDisabled} onClick={() => {
								handleCancelAppointment(selectedId);
							}}>Ok</button>
							<button className="modal__close" onClick={() => closeModal()}>Close</button>
						</div>
						<div className="modal__status">
							{cancelStatus === null ? '' : cancelStatus ? 'Success' : 'Error, please try again'}
						</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	);
}

export default CancelModal;
