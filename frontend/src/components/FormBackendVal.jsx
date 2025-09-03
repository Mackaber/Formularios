import { useForm } from 'react-hook-form'
import auth from '../services/auth' 
export default function FormBackendVal() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm()

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
            <h2>Formulario usando Validación sólo del backend</h2>
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