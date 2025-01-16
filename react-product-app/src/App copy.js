

import React from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, FormGroup, Container, Modal, ModalBody, ModalFooter, Table, ModalHeader } from 'reactstrap';


const data = [
  {
    "id": 1,
    "nombre": "Termo",
    "descripcion": "Embace que permite conservar la temperatura de los liquidos",
    "precio": 10000,
    "stock": 10,
    "nullDate": null
  },
  {
    "id": 3,
    "nombre": "Cepillos de Dientes",
    "descripcion": "Utencilio para lavarce los dientes",
    "precio": 58000,
    "stock": 3000,
    "nullDate": null
  },
  {
    "id": 5,
    "nombre": "Copitos",
    "descripcion": "Herramienta para limpiar partes dificil de acceder en el cuerpo",
    "precio": 3500,
    "stock": 40000,
    "nullDate": null
  },
  {
    "id": 6,
    "nombre": "Copitos donña tulia",
    "descripcion": "Herramienta para limpiar partes dificil de acceder en el cuerpo",
    "precio": 4000,
    "stock": 50000,
    "nullDate": null
  },
  {
    "id": 10,
    "nombre": "Telefonos Celulares",
    "descripcion": "Disposiotivos de comunicación movil",
    "precio": 4511100,
    "stock": 500,
    "nullDate": null
  },
  {
    "id": 11,
    "nombre": "Mesa",
    "descripcion": "Mesa de sala",
    "precio": 100000,
    "stock": 50,
    "nullDate": null
  },
  {
    "id": 15,
    "nombre": "Telefono",
    "descripcion": "Aparato para comunicacion nacional e internacinal ",
    "precio": 120000,
    "stock": 80,
    "nullDate": null
  },
  {
    "id": 16,
    "nombre": "Rocola",
    "descripcion": "Se usa para escuchar musica",
    "precio": 354000,
    "stock": 200,
    "nullDate": null
  },
  {
    "id": 17,
    "nombre": "Telefono Samsumg",
    "descripcion": "Telefono marca Sansumg",
    "precio": 5000000,
    "stock": 5000,
    "nullDate": null
  }
];

class App extends React.Component {
  state = {
    data: data.sort(),
    form: {
      id: '',
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
    },
    modalInsertar: false,
  };

  handleChange = e => {
    this.setState({
      form:{
         ...this.state.form,
         [e.target.name]: e.target.value,
      }
    })
  }

  mostrarModalInsertar =()=>{
    this.setState({modalInsertar: true});
  }

  ocultarModalInsertar =()=>{
    this.setState({modalInsertar: false});
  }

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  insertar =()=>{
    var nuevoElemento={...this.state.form};
    nuevoElemento.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(nuevoElemento);

    this.setState({data: lista.sort(), modalInsertar: false });
  }

  editar = (elementoEditar) => {
    var lista = this.state.data.filter(p => p.id != elementoEditar.id);
    lista.push(elementoEditar);
    this.setState({data: lista.sort(), modalActualizar: false });
  };

  eliminar =(elemento)=>{
    var opcion = window.confirm("¿Estás Seguro que deseas Eliminar el elemento: " + elemento.nombre + "?.");
    if (opcion === true) {
      var idEliminar =  elemento.id;
      var lista = this.state.data.filter(p => p.id !== idEliminar);

      this.setState({data: lista.sort()});
    }
  }

  render(){
    return (
   <>
     <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.precio}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Crear Nuevo</h3>
            </div>
          </ModalHeader>

          <ModalBody>
              <FormGroup>
                <label>Id: </label>
                <input className='form-control' onChange={this.handleChange} name='id' readOnly type='text'/>
              </FormGroup>
              <FormGroup>
                <label>Nombre: </label>
                <input className='form-control' onChange={this.handleChange} name='nombre' type='text'/>
              </FormGroup>
              <FormGroup>
                <label>Descripcion: </label>
                <input className='form-control' nonChange={this.handleChange} ame='descripcion' type='textArea'/>
              </FormGroup>
              <FormGroup>
                <label>Precio: </label>
                <input className='form-control' onChange={this.handleChange} name='precio' type='text'/>
              </FormGroup>
              <FormGroup>
                <label>stock: </label>
                <input className='form-control' onChange={this.handleChange} name='stock' type='text'/>
              </FormGroup>
          </ModalBody>
          <ModalFooter>
              <Button color="primary"  onClick={()=>this.insertar()}> Insertar</Button>
              <Button color="danger"  onClick={()=>this.ocultarModalInsertar()}> Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
          <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
              <FormGroup>
                <label>Id: </label>
                <input className='form-control' value={this.state.form.id} name='id' readOnly type='text'/>
              </FormGroup>
              <FormGroup>
                <label>Nombre: </label>
                <input className='form-control' onChange={this.handleChange} value={this.state.form.nombre} name='nombre' type='text'/>
              </FormGroup>
              <FormGroup>
                <label>Descripcion: </label>
                <input className='form-control' nonChange={this.handleChange} value={this.state.form.descripcion} name='descripcion' type='textArea'/>
              </FormGroup>
              <FormGroup>
                <label>Precio: </label>
                <input className='form-control' onChange={this.handleChange} value={this.state.form.precio} name='precio' type='text'/>
              </FormGroup>
              <FormGroup>
                <label>stock: </label>
                <input className='form-control' onChange={this.handleChange} value={this.state.form.stock} name='stock' type='text'/>
              </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
   </>
  )
  
}
}

export default App;
