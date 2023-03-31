import { configureStore } from "@reduxjs/toolkit"
import { act, renderHook, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { calendarApi } from "../../src/api"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { authSlice } from "../../src/store"
import { initialState, notAuthenticatedState } from "../fixtures/authState"
import { testUserCredentials } from "../fixtures/testUser"

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
        preloadedState: {
            auth: {...initialState}
        }
    })
}

describe('Pruebas en el useAuthStore', () => { 
    
    beforeEach(()=> localStorage.clear())

    test('debe de regresar los valores por defectos', () => { 
        
        const mockStore = getMockStore({...initialState})
        const {result} = renderHook(() => useAuthStore(), {
            wrapper:({ children }) => <Provider store={ mockStore }>{children}</Provider>
        })

        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function)
        }) 
    })

    test('startLogin debe de realizar el login correctamente', async() => {
        
        const mockStore = getMockStore({...notAuthenticatedState})
        const {result} = renderHook(() => useAuthStore(), {
            wrapper:({ children }) => <Provider store={ mockStore }>{children}</Provider>
        })

        await act(async()=>{
            await result.current.startLogin( testUserCredentials )
        })

        const { errorMessage, user, status } = result.current

        expect({ errorMessage, user, status }).toEqual({
            errorMessage: undefined,
            status: "authenticated",
            user: { name: 'Test-User', uid: '642169a7ec1e3b2a1eb0ce1a' }
        })

        expect(localStorage.getItem('token')).toEqual(expect.any(String))
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String))
    })

    test('startLogin debe de fallar la autenticacion', async() => { 
        
        const mockStore = getMockStore({...notAuthenticatedState})
        const {result} = renderHook(() => useAuthStore(), {
            wrapper:({ children }) => <Provider store={ mockStore }>{children}</Provider>
        })

        await act(async()=>{
            await result.current.startLogin({ email: 'algo@google.com', password: '1234567'} )
        })

        const { errorMessage, user, status } = result.current
        expect({ errorMessage, user, status }).toEqual({
            errorMessage: expect.any(String),
            user: {},
            status: 'not-authenticated'
        })
        expect(localStorage.getItem('token')).toBe(null)

        waitFor(
            ()=> expect(result.current.errorMessage).toBe(undefined)
        )
    })

    test('startRegister debe decrear un usuario', async() => {

        const newUser = { email: 'algo@google.com', password: '1234567', name: 'Test User 2' }
        const mockStore = getMockStore({...notAuthenticatedState})
        const {result} = renderHook(() => useAuthStore(), {
            wrapper:({ children }) => <Provider store={ mockStore }>{children}</Provider>
        })
        
        // Espia
        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({ 
            data: {
                ok: true,
                uid: "ALGUN-ID",
                name: "Test-User",
                token: "ALGUN-TOPKEN"
            } 
        })

        await act(async()=>{
            await result.current.startRegister(newUser)
        })

        const { errorMessage, status, user } = result.current

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test-User', uid: 'ALGUN-ID' }
        })

        spy.mockRestore()
    })

    test('startRegister debe fallar la conexion', async() => { 

        const mockStore = getMockStore({...notAuthenticatedState})
        const {result} = renderHook(() => useAuthStore(), {
            wrapper:({ children }) => <Provider store={ mockStore }>{children}</Provider>
        })
        
        await act(async()=>{
            await result.current.startRegister(testUserCredentials)
        })

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Existe un usauario con ese correo electronico',
            status: 'not-authenticated',
            user: {} 
        })
    })

    test('checkAuthToken debe de fallar si no hay token', async() => { 
        
        const mockStore = getMockStore({...initialState})
        const {result} = renderHook(() => useAuthStore(), {
            wrapper:({ children }) => <Provider store={ mockStore }>{children}</Provider>
        })
        
        await act(async()=>{
            await result.current.checkAuthToken()
        })

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        })
    })

    test('checkAuthToken debe de autenticar si hay token', async() => { 

        const { data } = await calendarApi.post('/auth', testUserCredentials)
        localStorage.setItem('token', data.token)

        const mockStore = getMockStore({...initialState})
        const {result} = renderHook(() => useAuthStore(), {
            wrapper:({ children }) => <Provider store={ mockStore }>{children}</Provider>
        })
        
        await act(async()=>{
            await result.current.checkAuthToken()
        })

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test-User', uid: '642169a7ec1e3b2a1eb0ce1a' }
        })
    })
    
})