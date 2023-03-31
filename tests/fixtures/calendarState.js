
export const events = [
    {
        id: '1',
        title: 'Cumpleaños del Jefe',
        notes: 'Hay que comprar el pastel',
        start: new Date('2023-3-27 15:54:00'),
        end: new Date('2023-3-27 17:00:00'),
    },
    {
        id: '2',
        title: 'Cumpleaños de Valentina',
        notes: 'Hay que comprar el pastel',
        start: new Date('2023-10-04 15:54:00'),
        end: new Date('2023-10-04 17:00:00'),
    }
    
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null
}

export const calendarWithActiveEventesState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: {...events[0]}
}
