import { useForm } from 'react-hook-form'
import auth from '../services/auth' 
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    email: z.string().email('El email es inválido'),
    password: z.string()
        .min(6, 'La contraseña debe contener al menos 6 caracteres')
        .regex(/.*[A-Z].*/, 'La contraseña debe contener al menos una letra mayúscula')
})
export default function FormFrontendVal() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm({ resolver: zodResolver(schema)})

    async function onSubmit(data) {
        const response = await auth.register(data)
        console.log(response)

        if(response.errors) {
            response.errors.forEach((error) =>{
                 setError(error.path, { type: "manual", message: error.msg })
            }) 
        }
    }

    return (
        <>
            <h2>Formulario usando Validación Backend y Frontend</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                Email: <input {...register('email')} /> <br />
                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                Password: <input {...register('password')} /> <br />
                {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                <input type='submit' value="enviar" />
            </form>    
        </>
    )
}