
import React from 'react';
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, FormGroup, Container, Modal, ModalBody, ModalFooter, Table, ModalHeader } from 'reactstrap';
import axios from "axios";  
import { useNavigate } from "react-router-dom";

 
const baseURL = 'https://localhost:7051/Producto';


class ProductList extends React.Component {
  state = {
    data: [],
    form: {
      id: '',
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
    },
    modalInsertar: false,
    modalActualizar: false,
    modalEliminar: false,
    modalMensaje: false, 
    mensaje: '', 
  };



  peticionGet=()=>{
    axios.get(baseURL).then(response=>{
      this.setState({data: response.data.listData});
      console.log(response);
    }).catch(error=>{
      console.log(error.message);
    })
  }

  peticionPost=async()=>{
    var request =  this.state.form;

    console.log(request);

    await axios.post(baseURL, request).then(response => { 

      console.log(response);
      if(!response.data.success){
        var mensajeError = response.data.errorMessage;
        this.setState({mensaje: mensajeError, modalMensaje: true});
        return;
      }

        var mensaje = "Producto guardado con exito";
        this.setState({mensaje: mensaje, modalMensaje: true, modalInsertar: false});

        this.peticionGet();  
    })
  }

  peticionPut=async()=>{
    
    var request =  this.state.form;
    var idProducto =  request.id;

    await axios.put(baseURL + "/" + idProducto, request).then(response => {  
      console.log(response);
      this.peticionGet();
      this.cerrarModalActualizar();
    })
  }

  peticionDelete=async()=>{ 
    var idProducto =  this.state.form.id;
    await axios.delete(baseURL + "/" + idProducto).then(response => {  
      console.log(response);
      this.peticionGet();
      this.ocultarModalEliminar();
    })
  }

  componentDidMount(){
    this.peticionGet();
  }

  handleChange = e => {
    this.setState({
      form:{
         ...this.state.form,
         [e.target.name]: e.target.value,
      }
    })
  }

  ocultarModalMensaje =()=>{
    this.setState({modalMensaje: false, mensaje: ''});
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

  mostrarModalEliminar = (dato) => {
    console.log(dato);

    this.setState({
      form: dato,
      modalEliminar: true,
    });
  };

  ocultarModalEliminar = () => {
    this.setState({ modalEliminar: false });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  render(){
    return (
   <>
     <Container>
      <h1>Productos</h1>
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
                    <Button color="primary" onClick={() => this.mostrarModalActualizar(dato)} > Editar</Button>{"   "}
                    <Button color="danger" onClick={()=> this.mostrarModalEliminar(dato)}> Eliminar</Button>
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
                <label>Nombre: </label>
                <input className='form-control' onChange={this.handleChange} name='nombre' type='text'/>
              </FormGroup>
              <FormGroup>
                <label>Descripcion: </label>
                <input className='form-control' onChange={this.handleChange} name='descripcion' type='textArea'/>
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
              <Button color="primary"  onClick={()=>this.peticionPost()}> Insertar</Button>
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
                <input className='form-control' disabled value={this.state.form.id} name='id' readOnly type='text'/>
              </FormGroup>
              <FormGroup>
                <label>Nombre: </label>
                <input className='form-control' onChange={this.handleChange} value={this.state.form.nombre} name='nombre' type='text'/>
              </FormGroup>
              <FormGroup>
                <label>Descripcion: </label>
                <input className='form-control' onChange={this.handleChange} value={this.state.form.descripcion} name='descripcion' type='text'/>
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
              onClick={() => this.peticionPut()}
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

        
        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
              ¿Estás Seguro que deseas Eliminar el elemento: {this.state.form && this.state.form.nombre}?.
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
            <button className="btn btn-secundary" onClick={()=>this.ocultarModalEliminar()}>No</button>
          </ModalFooter>
        </Modal>
    
        <Modal isOpen={this.state.modalMensaje}>
          <ModalBody>
              <h5>{this.state.mensaje}</h5>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>this.ocultarModalMensaje()}>OK</Button>
          </ModalFooter>
        </Modal>
   </>
  )}}

 

export default ProductList;