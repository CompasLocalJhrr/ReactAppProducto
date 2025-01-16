import React from "react";
import { Button, FormGroup, Modal, ModalBody, ModalFooter} from 'reactstrap'; 
import axios from "axios";  
 


const baseURL = 'https://localhost:7051/Producto';

class CreateProduct extends React.Component {
  state = {
    data: [],
    form: {
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
    },
    modalMensaje: false, 
    mensaje: '', 
  };



  peticionPost=async()=>{
    await axios.post(baseURL, this.state.form).then(response => { 

      console.log(response);  

      if(!response.data.success){
        var mensajeError = response.data.errorMessage;
        this.setState({mensaje: mensajeError, modalMensaje: true});
        return;
      }

        var mensaje = "Producto guardado con exito";
        this.setState({mensaje: mensaje, modalMensaje: true});
    })
  }

  ocultarModalMensaje =()=>{
    this.setState({modalMensaje: false, mensaje: ''});
  }

  
  handleChange = e => {
    this.setState({
      form:{
         ...this.state.form,
         [e.target.name]: e.target.value,
      }
    })
  }

  render(){
    return (
      <>
    <div>
      <h2>Crear Producto</h2>
      <form >
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
        
      <footer>
          <Button color="primary"  onClick={()=>this.peticionPost()}> Insertar</Button>
      </footer>
      </form>
    </div>

      
    <Modal isOpen={this.state.modalMensaje}>
      <ModalBody>
          <h5>{this.state.mensaje}</h5>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={()=>this.ocultarModalMensaje()}>OK</Button>
      </ModalFooter>
    </Modal>

    </>

  )
}
}

export default CreateProduct;