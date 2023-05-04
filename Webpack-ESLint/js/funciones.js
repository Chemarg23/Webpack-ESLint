import Citas from './classes/Citas';

import UI from './classes/UI';

import {
  mascotaInput, propietarioInput, telefonoInput,
  fechaInput,
  horaInput,
  sintomasInput,
  formulario,
} from './selectores';

const administrarCitas = new Citas();
const ui = new UI(administrarCitas);

let editando = false;

const citaObj = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: '',
};

export function reiniciarObjeto() {

  citaObj.mascota = '';
  citaObj.propietario = '';
  citaObj.telefono = '';
  citaObj.fecha = '';
  citaObj.hora = '';
  citaObj.sintomas = '';
}

export function datosCita(e) {
  
  citaObj[e.target.name] = e.target.value;
}

export function nuevaCita(e) {
  e.preventDefault();

  const {
    mascota, propietario, telefono, fecha, hora, sintomas,
  } = citaObj;

  if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
    ui.imprimirAlerta('Todos los campos son Obligatorios', 'error');

    return;
  }

  if (editando) {
    
    administrarCitas.editarCita({ ...citaObj });

    ui.imprimirAlerta('Guardado Correctamente');

    formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

    editando = false;
  } else {
    
    citaObj.id = Date.now();

  
    administrarCitas.agregarCita({ ...citaObj });

  
    ui.imprimirAlerta('Se agregó correctamente');
  }

  
  ui.imprimirCitas(administrarCitas);

  reiniciarObjeto();

  formulario.reset();
}

export function eliminarCita(id) {
  administrarCitas.eliminarCita(id);

  ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita) {
  const {
    mascota, propietario, telefono, fecha, hora, sintomas, id,
  } = cita;

  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;


  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;
  formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
  editando = true;
}
