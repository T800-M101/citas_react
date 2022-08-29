import { useState, useEffect } from 'react';
import Error from './Error';


const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
    
      // estado inicial de los controles del formulario
      const [ nombre, setNombre ] = useState(''); 
      const [ propietario, setPropietario] = useState('');
      const [ email, setEmail] = useState('');
      const [ fecha, setFecha] = useState('');
      const [ sintomas, setSintomas] = useState('');
      
      // estado inicial del error para validar el formulario
      const [ error, setError ] = useState(false);

      useEffect(() => {
         if(Object.keys.length > 0) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
         }
      },[paciente])

      const handleSubmit = (e) => {
      
         e.preventDefault();
         // Validacion del formulario
         if([nombre, propietario, email, fecha, sintomas].includes('')) {
            setError(true);
            return;
         } 
         setError(false);

        const objPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas
         }

         if(paciente.id) {
             objPaciente.id = paciente.id;  
             const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objPaciente:pacienteState);
             setPacientes(pacientesActualizados);
             setPaciente({});
         }else {
               objPaciente.id = generarId();
               setPacientes([...pacientes, objPaciente]);
         }
         // Reiniciar el formulario
         resetForm();
      }

      const generarId = () => {
            const fecha = Date.now().toString(36);
            const random = Math.random().toString(36).substring(2);  
            return  fecha + random;
      }

      const resetForm = () => {
            setNombre('');
            setPropietario('');
            setEmail('');
            setFecha('');
            setSintomas('');
      }


  return (
    <div className='md:w-1/2 lg:2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>
      <p className='text-lg mt-5 text-center mb-10'>
         Añade Pacientes y {''}
         <span className='text-indigo-600 font-bold'>Adminístralos</span>
      </p>

      <form onSubmit={handleSubmit} 
            className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>
            {error && <Error> <p>Todos los campos son obligatorios</p></Error>}
         <div className='mb-5'>
              <label htmlFor="mascota"
                    className='block text-gray-700 uppercase font-bold'>
                    Nombre Mascota
              </label>
              <input type="text" 
                     id="mascota"
                     className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                     placeholder='Nombre de la mascota'
                     value={nombre}
                     onChange={ (e) => setNombre(e.target.value)}
              /> 
         </div>{/*fin input mascota*/}

         <div className='mb-5'>
              <label htmlFor="propietario"
                    className='block text-gray-700 uppercase font-bold'>
                    Nombre Propietario
              </label>
              <input type="text" 
                     className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                     id="propietario"
                     placeholder='Nombre del propietario'
                     value={propietario}
                     onChange={(e) => setPropietario(e.target.value)}
              /> 
         </div>{/*fin input propietario*/}

         <div className='mb-5'>
              <label htmlFor="email"
                    className='block text-gray-700 uppercase font-bold'>
                    Email
              </label>
              <input type="email" 
                      id="email"
                      className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                      placeholder='Email Contacto Propietario'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
              /> 
         </div>{/*fin input email*/}

         <div className='mb-5'>
              <label htmlFor="alta"
                    className='block text-gray-700 uppercase font-bold'>
                    Fecha de Alta
              </label>
              <input type="date" 
                      id="alta"
                      className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value) }
              /> 
         </div>{/*fin input alta*/}

          <div className='mb-5'>
              <label htmlFor="sintomas"
                    className='block text-gray-700 uppercase font-bold'>
                    Sintomas
              </label>
              <textarea id="sintomas"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
                        placeholder='Describe los síntomas'
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value) }
              /> 
          </div>{/*fin text area sintomas*/}

          <input type="submit" 
                 className='bg-indigo-600 w-full p-3 text-white uppercase font-bold
                            hover:bg-indigo-700 cursor-pointer transition-all'
                 value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
          />
      </form>
    </div>
  )
}

export default Formulario