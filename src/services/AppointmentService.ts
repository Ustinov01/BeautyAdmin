import { useHttp } from "../hooks/http.hook";
import harRequiredFields from "../utils/hasReuiredFields";
import dayjs from "dayjs";

import { IAppointment, ActiveAppointment } from "../shared/interfaces/appointment.interface";

const requiredFields = ['id', 'date', 'name', 'service', 'phone', 'canceled'];

const useAppointmentService = () => {
    const { loadingStatus, request } = useHttp();
    const _apiBase = "http://localhost:3001/appointments";

    const getAllAppointments = async (): Promise<IAppointment[]> => {
        const res = await request({ url: _apiBase });

        if (res.every((item: IAppointment) => harRequiredFields(item, requiredFields))) {
            return res;
        } else {
            throw new Error('Data have no all the fields');
        }
    }

    const getAllActiveAppointments = async () => {
        const base = await getAllAppointments();
        const transformed: ActiveAppointment[] = base.filter(item => !item.canceled && dayjs(item.date).diff(undefined, 'minute') > 0).map((item: IAppointment) => {
            return {
                id: item.id,
                date: item.date,
                name: item.name,
                service: item.service,
                phone: item.phone
            }
        })

        return transformed;
    }

    return {
        loadingStatus,
        getAllAppointments,
        getAllActiveAppointments
    }
}

export default useAppointmentService;