import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventesState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarState"

describe('Pruebas en el calendarSlice', () => { 

    test('debe regresar el estado incial', () => { 
        const state = calendarSlice.getInitialState()
        expect( state ).toEqual( initialState )
    })

    test('onSetActiveEvent debe de activar el evento', () => { 
        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent( events[0]))
        expect(state.activeEvent).toEqual(events[0])
    })

    test('onAddNewEvent debe de agregar el evento', () => { 
        const newEvent = {
            id: '3',
            title: 'Cumpleaños de mi esposo',
            notes: 'Hay que comprar el pastel',
            start: new Date('2023-3-27 15:54:00'),
            end: new Date('2023-3-27 17:00:00'),
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent))
        expect(state.events).toEqual([...events, newEvent])
    })
    
    test('onUpdateEvent debe de actualizar el evento', () => { 
        
        const updateEvent = {
            id: '1',
            title: 'Cumpleaños del Jefe',
            notes: 'Regalar coche',
            start: new Date('2023-3-27 15:54:00'),
            end: new Date('2023-3-27 17:00:00'),
        }
                
        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent( updateEvent))
        expect(state.events).toContain( updateEvent )
    })

    test('onDeleteEvent debe de borrar el evento activo', () => { 
        
        const state = calendarSlice.reducer( calendarWithActiveEventesState, onDeleteEvent())
        expect(state.activeEvent).toBe(null)
        expect(state.events).not.toContain(events[0])
        
    })

    test('onLogoutCalendar debe de limpiar el estado el evento', () => { 
        
        const state = calendarSlice.reducer(calendarWithActiveEventesState, onLogoutCalendar())
        expect(state).toEqual({
            isLoadingEvents: true,
            events: [],
            activeEvent: null
        } )
    })
    
    test('onLoadEvents debe establecer los eventos', () => { 
        
        const state = calendarSlice.reducer( initialState, onLoadEvents( events))
        expect(state.isLoadingEvents).toBeFalsy()
        expect(state.events).toEqual(events)

        const newState = calendarSlice.reducer( state, onLoadEvents(events))
        expect(state.events.length).toBe(events.length)
    })
    



})