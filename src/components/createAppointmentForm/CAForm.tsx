import "./caform.scss";
import useAppointmentService from "../../services/AppointmentService";
import { AppointmentContext } from "../../context/appointments/AppointmentContext";
import { useState, FormEvent, ChangeEvent, useContext } from 'react';
import { IAppointment } from "../../shared/interfaces/appointment.interface";



function CAForm() {

	const { createNewAppointment } = useAppointmentService();
	const { getActiveAppointments } = useContext(AppointmentContext);
	const [formData, setFormData] = useState<IAppointment>({
		id: 1,
		name: '',
		service: '',
		phone: '',
		date: '',
		canceled: false
	});

	const [creationStatus, setCreationStatus] = useState<boolean>(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCreationStatus(true);
		createNewAppointment(formData).then(() => {
			setCreationStatus(false);
			setFormData({
				id: 1,
				name: '',
				service: '',
				phone: '',
				date: '',
				canceled: false
			});
			getActiveAppointments();
		}).catch(() => {
			alert('Error');
		})
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}))

	}



	return (
		<form className="caform" onSubmit={handleSubmit}>
			<div className="caform__title">Create new appointment</div>
			<label htmlFor="name">
				Name<span>*</span>
			</label>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="User name"
				required
				onChange={handleChange}
				value={formData.name}
			/>

			<label htmlFor="service">
				Service<span>*</span>
			</label>
			<input
				type="text"
				name="service"
				id="service"
				placeholder="Service name"
				required
				onChange={handleChange}
				value={formData.service}
			/>

			<label htmlFor="phone">
				Phone number<span>*</span>
			</label>
			<input
				type="tel"
				name="phone"
				id="phone"
				placeholder="+1 890 335 372"
				pattern="^\++[0-9]{1} [0-9]{3} [0-9]{3} [0-9]{3}"
				title="Format should be +1 804 944 567"
				required
				onChange={handleChange}
				value={formData.phone}
			/>

			<label htmlFor="date">
				Date<span>*</span>
			</label>
			<input
				type="text"
				name="date"
				id="date"
				placeholder="DD/MM/YYYY HH:mm"
				pattern="^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$"
				title="Format should be DD/MM/YYYY HH:mm"
				required
				onChange={handleChange}
				value={formData.date}
			/>
			<button disabled={creationStatus}>Create</button>
		</form>
	);
}

export default CAForm;
