import calendarApi from "../../src/api/calendarApi"

describe('Pruebas en el calendarApi', () => { 

    test('debe de tener la configuracion por defecto', () => { 

        //console.log(calendarApi)
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
    })

    test('debe de tener el x-token en el headers de todas las peticiones', async() => { 
        
        const token = 'ABC-123-XYZ'
        localStorage.setItem('token', token)
        const res = await calendarApi.get('/auth')

        console.log(res.config.headers['x-token'])
        expect(res.config.headers['x-token']).toBe(token)
    })
})