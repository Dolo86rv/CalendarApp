import { useDispatch, useSelector } from "react-redux"
import { onEventCreated } from "../store"


export const useCalendarStore = () => {
    
    const dispatch = useDispatch()
    const { events, activeEvent } = useSelector(state => state.calendar)

    const onEventCreated = () => {
        dispatch(onEventCreated())
    }

    return {
        //*Propiedades
        activeEvent,
        events,

        //*Metodos
        onEventCreated,
    }
}
