import React, { createContext, useReducer } from 'react';
import reducer, { AppointmentState } from './reducer';
import useAppointmentService from "../../services/AppointmentService";
import { loadingStatusOptions } from '../../hooks/http.hook';

import { ActionsTypes } from './actions';

const initialState: AppointmentState = {
    allAppointments: [],
    activeAppointments: [],
    appointmentLoadingStatus: 'idle'
};

interface AppointmentContextValue extends AppointmentState {
    appointmentLoadingStatus: loadingStatusOptions
    getAppointments: () => void,
    getActiveAppointments: () => void
}

export const AppointmentContext = createContext<AppointmentContextValue>({
    allAppointments: initialState.allAppointments,
    activeAppointments: initialState.activeAppointments,
    appointmentLoadingStatus: initialState.appointmentLoadingStatus,
    getAppointments: () => { },
    getActiveAppointments: () => { }
});

interface ProviderProps {
    children: React.ReactNode;
}


const AppointmentContextProvider = ({ children }: ProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        loadingStatus,
        getAllAppointments,
        getAllActiveAppointments
    } = useAppointmentService();

    const value: AppointmentContextValue = {
        allAppointments: state.allAppointments,
        activeAppointments: state.activeAppointments,
        appointmentLoadingStatus: loadingStatus,
        getAppointments: () => {
            getAllAppointments().then((data) => dispatch({ type: ActionsTypes.SET_ALL_APPOINTMENTS, payload: data }))
        },
        getActiveAppointments: () => {
            getAllActiveAppointments().then((data) => dispatch({ type: ActionsTypes.SET_ACTIVE_APPOINTMENTS, payload: data }))
        }
    }


    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    )

}

export default AppointmentContextProvider;