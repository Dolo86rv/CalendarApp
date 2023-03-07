import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

const tempEvent =  {
    title: 'Cumpleaños del Jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user:{
        _id:'123',
        name: 'Alexander'
    }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        onEventCreated: (state, action) => {
            state.events.push(action.payload)
        },

    },
})

export const { onEventCreated } = calendarSlice.actions