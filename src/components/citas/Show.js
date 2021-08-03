import React, { Component } from 'react';
import firebase from '../../firebase/firebaseConfig';
import { Link } from 'react-router-dom';

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fondo: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('fondos').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          fondo: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('fondos').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          </div>
          <div class="panel-body">
            <dl>
              <dt>Fondo:</dt>
              <dd>{this.state.fondo.fondo}</dd>
              <dt>Fecha:</dt>
              <dd>{this.state.fondo.fecha}</dd>
              <dt>Tipo de documento:</dt>
              <dd>{this.state.fondo.tipo_doc}</dd>
              <dt>Oficio de Autorizacion:</dt>
              <dd>{this.state.fondo.oficio_aut}</dd>
              <dt>No. de Oficio:</dt>
              <dd>{this.state.fondo.no_oficio}</dd>
              <dt>No. de Autorizacion:</dt>
              <dd>{this.state.fondo.no_aut}</dd>
              <dt>No. de Licitacion:</dt>
              <dd>{this.state.fondo.no_lici}</dd>
              <dt>Importe:</dt>
              <dd>{this.state.fondo.importe}</dd>
              <dt>Descripcion:</dt>
              <dd>{this.state.fondo.desc}</dd>
              <dt>Importe letra:</dt>
              <dd>{this.state.fondo.importe_l}</dd>
              <dt>Beneficiario:</dt>
              <dd>{this.state.fondo.beneficiario}</dd>
              <dt>Realizo:</dt>
              <dd>{this.state.fondo.realizo}</dd>
              <dt>Numero:</dt>
              <dd>{this.state.fondo.numero}</dd>
              <dt>Converteir:</dt>
              <dd>{this.state.fondo.num_conver}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Editar</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
