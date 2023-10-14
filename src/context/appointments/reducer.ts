import { IAppointmentAction, ActionsTypes } from "./actions";
import { IAppointment, ActiveAppointment } from "../../shared/interfaces/appointment.interface";
import { loadingStatusOptions } from "../../hooks/http.hook";

export interface AppointmentState {
    allAppointments: IAppointment[] | [],
    activeAppointments: ActiveAppointment[] | [],
    appointmentLoadingStatus: loadingStatusOptions
}

export default function reducer(state: AppointmentState, action: IAppointmentAction): AppointmentState {
    switch (action.type) {
        case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
            return { ...state, activeAppointments: action.payload };
        case ActionsTypes.SET_ALL_APPOINTMENTS:
            return { ...state, allAppointments: action.payload };
        case ActionsTypes.FETCHING_APPOINTMENTS:
            return { ...state, appointmentLoadingStatus: 'loading' };
        case ActionsTypes.ERROR_FETCHING_APPOINTMENTS:
            return { ...state, appointmentLoadingStatus: 'error' };
        default:
            return state;
    }
}

