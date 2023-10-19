import React, { createContext, useReducer } from 'react';
import reducer, { AppointmentState } from './reducer';
import useAppointmentService from "../../services/AppointmentService";
import { loadingStatusOptions } from '../../hooks/http.hook';
import { Value } from "react-calendar/dist/cjs/shared/types";

import { ActionsTypes } from './actions';

const initialState: AppointmentState = {
    allAppointments: [],
    activeAppointments: [],
    appointmentLoadingStatus: 'idle',
    calendarDate: [null, null]
};

interface AppointmentContextValue extends AppointmentState {
    appointmentLoadingStatus: loadingStatusOptions
    getAppointments: () => void,
    getActiveAppointments: () => void,
    setDateAndFilter: (newDate: Value) => void
}

export const AppointmentContext = createContext<AppointmentContextValue>({
    allAppointments: initialState.allAppointments,
    activeAppointments: initialState.activeAppointments,
    appointmentLoadingStatus: initialState.appointmentLoadingStatus,
    calendarDate: initialState.calendarDate,
    getAppointments: () => { },
    getActiveAppointments: () => { },
    setDateAndFilter: (newDate: Value) => { }
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
        calendarDate: state.calendarDate,
        getAppointments: () => {
            getAllAppointments().then((data) => {
                const filteredData = data.filter((item) => {
                    if (Array.isArray(state.calendarDate) && state.calendarDate[0] && state.calendarDate[1]) {
                        if (new Date(item.date).getTime() >= new Date(state.calendarDate[0]).getTime() && new Date(item.date).getTime() <=
                            new Date(state.calendarDate[1]).getTime()) {
                            return item
                        }
                    } else {
                        return item;
                    }
                })
                dispatch({ type: ActionsTypes.SET_ALL_APPOINTMENTS, payload: filteredData })
            }).catch(() => {
                dispatch({ type: ActionsTypes.ERROR_FETCHING_APPOINTMENTS })
            })
        },
        getActiveAppointments: () => {
            getAllActiveAppointments().then((data) => {
                const filteredData = data.filter((item) => {
                    if (Array.isArray(state.calendarDate) && state.calendarDate[0] && state.calendarDate[1]) {
                        if (new Date(item.date).getTime() >= new Date(state.calendarDate[0]).getTime() && new Date(item.date).getTime() <=
                            new Date(state.calendarDate[1]).getTime()) {
                            return item
                        }
                    } else {
                        return item;
                    }
                })

                dispatch({ type: ActionsTypes.SET_ACTIVE_APPOINTMENTS, payload: filteredData })
            }).catch(() => {
                dispatch({ type: ActionsTypes.ERROR_FETCHING_APPOINTMENTS })
            })
        },
        setDateAndFilter: (newDate: Value) => dispatch({ type: ActionsTypes.SET_CALENDAR_DATE, payload: newDate })
    }


    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    )

}

export default AppointmentContextProvider;