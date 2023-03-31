import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState, notAuthenticatedState } from "../../fixtures/authState"
import { testUserCredentials } from "../../fixtures/testUser"

describe('Pruebas en authSlice', () => { 

    test('debe regresar el estado incial', () => { 

        expect( authSlice.getInitialState()).toEqual( initialState)
    })

    test('debe de realizar el login', () => {
        const state = authSlice.reducer( initialState, onLogin(testUserCredentials))
        expect(state).toEqual({
            status: 'authenticated', //'authenticated', 'not-authenticated'
            user: testUserCredentials,
            errorMessage: undefined, 
        })
    })

    test('debe de realizar el logout', () => { 

        const state = authSlice.reducer( authenticatedState, onLogout())
        
        expect(state).toEqual({
            status: 'not-authenticated', //'authenticated', 'not-authenticated'
            user: {},
            errorMessage: undefined, 
        })
    })

    test('debe de realizar el logout', () => { 
        
        const errorMessage = 'Credenciales no validas'
        const state = authSlice.reducer( authenticatedState, onLogout( errorMessage))
        
        expect(state).toEqual({
            status: 'not-authenticated', //'authenticated', 'not-authenticated'
            user: {},
            errorMessage: errorMessage, 
        })
    })

    test('debe de limpiar el mensaje de error', () => { 

        const errorMessage = 'Credenciales no validas'
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage))
        const newState = authSlice.reducer(state, clearErrorMessage())
        expect(newState.errorMessage).toBe( undefined )
    })
})