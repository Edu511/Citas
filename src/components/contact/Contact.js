import React, { Component } from 'react'
import firebase from '../../firebase/firebaseConfig'
//import { useForm } from 'react-hook-form'

export default class Contact extends Component {
  
  constructor(props){

    super(props)
    this.state = {
      step: 1,
      swAnonimo: false,
      raPersona: 'Fisica',
      txtRFC: '',
      txtRazonSocial: '',
      selClasPersona: '',
      txtNombre: '',
      txtApPaterno: '',
      txtApMaterno: '',
      txtAlias: '',
      txtNumEdad: '',
      dateFNacimiento: '',
      selSexo: '',
      selEntidadFederativa: '',
      selIdentificacion: '',
      fileDocumento: '',
      txtCurp: '',
      selNotificacion: '',
      txtnumTel1: '',
      txtnumTel2: '',
      emailCorreo: '',
      txtNacionalidad: '',
      selEstadoCivil: '',
      selOcupacion: '',
      selNivelEstudios: '',
      selLengua: '',
      selReligion: '',
      swLGBT: false,
      selLGBT: '',
      swDiscapacidad: false,
      selDiscapacidad: '',
      selTipoDelito: '',
      timeHoraSuceso: '',
      dateFSuceso: '',
      txtCalle: '',
      txtNumInt: '',
      txtNumExt: '',
      txtEntCalle1: '',
      txtEntCalle2: '',
      txtReferencias: '',
      selPais: '',
      selEstado: '',
      selMunicipio: '',
      selLocalidad: '',
      txtCodPostal: '',
      txtLatitud: '',
      txtLongitud: '',
      selAgenciaAVisitar: '',
      selHorarioCita: '',
      dateFechaCita: '',
      file: []
    }
    this.reader = new FileReader();
  }

  // funcion para deshabilitar cambios cuando se hace check en anonimo
  checkAnonimo(){
    this.setState({
      swAnonimo: !this.state.swAnonimo
    })
  }
  
  //  Cambia el valor de persona fisica y moral
  checkF(){
    this.setState({
      raPersona: "Fisica",
    });
  }

  // Cambia el valor de persona moral y desaciva fisica
  checkM() {
    this.setState({
      raPersona: "Moral",
    });
  }

  // habilita las opciones al seleccionar LGTB checked
  checkLGBT = () =>{

    this.setState({
      swLGBT: !this.state.swLGBT
    }, () => {
      console.log('Valor del checkbox en LGTB: ' + this.state.swLGBT);
    })

    if(this.state.swLGBT === false){
     
      this.setState({
        selLGBT: this.state.selLGBT
      })

    } else {
      this.setState({
        selLGBT: ""
      })

    }

  }

  // habilita las opciones al seleccionar discapacidad
  checkDisc(){
    this.setState({
      swDiscapacidad: !this.state.swDiscapacidad
    })

    if(this.state.swDiscapacidad === false){
     
      this.setState({
        selDiscapacidad: this.state.selDiscapacidad
      })

    } else {
      this.setState({
        selDiscapacidad: ""
      })

    }

  }

  //Se ocupa de cambiar de seccion
  siguiente = () => {
    if(this.state.swAnonimo === true){
      this.setState({
        step: 3,
      });
    } else {
      this.setState({
        step: parseInt(this.state.step) + 1,
      });
    }
  };

  // regresa a la seccion anterior
  anterior() {
    if(this.state.swAnonimo === true){
      this.setState({
        step: 1,
      });
    } else {
      this.setState({
        step: parseInt(this.state.step) - 1,
      });
    }
  }

  // estado OnChange para el documento
  onFileChange = (event) => {
    
    // cambia el estado de la variable
    this.setState({ fileDocumento: event.target.files[0] }, () => {
      // manda a consola detalles del archivo
      console.log(this.state.fileDocumento);
    });

  }

  // handle changer para edad
  handleChange_edad = (event) => {
    console.log("fecha de nacimiento recogida: "+ event.target.value);
    this.setState({ dateFNacimiento: event.target.value });

    // llama a la función para calcular con el valor guardado en el event
    var edad_calculada = this.obtenerEdad(event.target.value);

    // Asigna el valor calculado a la variable de edad
    this.setState({ txtNumEdad: edad_calculada }, () => {
      console.log("Edad asignada:", this.state.txtNumEdad);
    })
  }

  // Obtiene la edad a partir de la fecha de nacimiento
  obtenerEdad = (fecha_guardada) => {

    var hoy = new Date();
    var fecha_nacimiento = new Date(fecha_guardada);
    var edad = hoy.getFullYear() - fecha_nacimiento.getFullYear();

    // console.log(fecha_nacimiento);
    var mes_actual = hoy.getMonth() - fecha_nacimiento.getMonth();
    if (mes_actual < 0 || (mes_actual === 0 && hoy.getDate() < fecha_nacimiento.getDate())) 
    {
      edad--;
    }
    return edad;
  }

  // refresca la vista para una nueva solicitud
  recargar = () => {
    this.setState({
      step: 1,
      // step: parseInt(this.state.step) = 1,
    });
    document.location.reload();
  }

  //Limitar la longitud de caracteres
  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
    }

  // sube el documento cargado a firebase
  cargarDocumento = (event) => {
    var archivo = event.target.files[0];
    try{
      var almacenamiento = firebase.storage().ref('documentos_identificacion/' + archivo.name);
      var task = almacenamiento.put(archivo);
      task.on('state_changed', (snapshot) => {
        let carga = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          img: carga
        })
      }, error => {
        console.log(error.message);
      }, () => {
        almacenamiento.getDownloadURL().then(url => {
          this.setState({
            file: [...this.state.file, { url: url, nombre: archivo.name }],
            fileDocumento: url
          }, () => {
            console.log(this.state.fileDocumento);
          });
        });
      });
    } catch(e) {
      alert('Por favor seleccione un archivo');
    }
    
  }

  // funcion para validar correo
  validateEmail = () => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.emailCorreo)) { 
      
      console.log('correo autorizado: ' + this.state.emailCorreo);
      return true;
    } else {
      
      console.log('correo autorizado: ' + this.state.emailCorreo);
      alert('Por favor introduzca un correo válido');
    }
  }

  //Función para enviar el formulario
  enviar(e) {
    e.preventDefault();
    this.validateEmail();    
    // si los datos que se vana enviar son anonimos
    if(this.state.swAnonimo){
      const parametrosAnonimo = {
        swAnonimo: true,
        raPersona: ' ',
        selClasPersona: this.state.selClasPersona,
        txtRFC: ' ',
        txtRazonSocial: ' ',          
        txtNombre : ' ',
        txtApPaterno : ' ',
        txtApMaterno : ' ',
        txtAlias : ' ',
        txtNumEdad : this.state.txtNumEdad,
        selSexo : this.state.selSexo,
        selEntidadFederativa : ' ',
        selIdentificacion: ' ',
        txtCurp: 'XXXX010101XXXXXXX1',
        selNotificacion: 'Correo Electronico',
        txtnumTel1 : ' ',
        txtnumTel2 : ' ',
        emailCorreo: this.state.emailCorreo,
        txtNacionalidad : ' ',
        selEstadoCivil : ' ',
        selOcupacion : ' ',
        selNivelEstudios : ' ',
        selLengua : ' ',
        selReligion : ' ',
        swLGBT : false,
        selLGBT : ' ',
        swDiscapacidad : false,
        selDiscapacidad : ' ',
        selTipoDelito : this.state.selTipoDelito,
        timeHoraSuceso : this.state.timeHoraSuceso,
        dateFSuceso : this.state.dateFSuceso,
        txtCalle : this.state.txtCalle,
        txtNumInt : this.state.txtNumInt,
        txtNumExt : this.state.txtNumExt,
        txtEntCalle1 : this.state.txtEntCalle1,
        txtEntCalle2 : this.state.txtEntCalle2,
        txtReferencias : this.state.txtReferencias,
        selPais : this.state.selPais,
        selEstado : this.state.selEstado,
        selMunicipio : this.state.selMunicipio,
        selLocalidad : this.state.selLocalidad,
        txtCodPostal : this.state.txtCodPostal,
        selAgenciaAVisitar : this.state.selAgenciaAVisitar,
        dateFechaCita : this.state.dateFechaCita,
        selHorarioCita : this.state.selHorarioCita,
        // txtLatitud : this.state.txtLatitud,
        // txtLongitud : this.state.txtLongitud
      }

      console.log(parametrosAnonimo)
  
      if(
        parametrosAnonimo.selClasPersona &&
        parametrosAnonimo.txtNumEdad &&
        parametrosAnonimo.selSexo &&
        parametrosAnonimo.selNotificacion &&
        parametrosAnonimo.emailCorreo &&
        parametrosAnonimo.selTipoDelito &&
        parametrosAnonimo.timeHoraSuceso &&
        parametrosAnonimo.dateFSuceso &&
        parametrosAnonimo.txtCalle &&
        parametrosAnonimo.txtNumExt &&
        parametrosAnonimo.txtEntCalle1 &&
        parametrosAnonimo.txtReferencias &&
        parametrosAnonimo.selPais &&
        parametrosAnonimo.selEstado &&
        parametrosAnonimo.selMunicipio &&
        parametrosAnonimo.selLocalidad &&
        parametrosAnonimo.txtCodPostal &&
        parametrosAnonimo.selAgenciaAVisitar &&
        parametrosAnonimo.dateFechaCita &&
        parametrosAnonimo.selHorarioCita 
        // parametrosAnonimo.txtLatitud &&
        // parametrosAnonimo.txtLongitud
        )
        {
          firebase.database().ref("pruebaCentAnonimo").push(parametrosAnonimo).then(()=>
          {
            // alert("Sus datos han sido enviados correctamente");
            this.setState({
              step: 4,
            });
          }).catch((e)=>
          {
            console.log(e);
            alert("Faltan campos por llenar")
          })
        }else{
          alert("Por favor llene su formulario")
          this.setState({
            step: 1,
          });
        }
      
    }

    // si s menor a 18 años, se convierten en parametros protegidos
    if(this.state.txtNumEdad < 18 && this.state.raPersona === "Fisica"){
      const parametrosProtegidos = {
        swAnonimo: true,
        raPersona: 'Física',
        selClasPersona: this.state.selClasPersona,
        txtRFC: ' ',
        txtRazonSocial: ' ',          
        txtNombre : ' ',
        txtApPaterno : ' ',
        txtApMaterno : ' ',
        txtAlias : ' ',
        txtNumEdad : ' ',
        selSexo : this.state.selSexo,
        selEntidadFederativa : ' ',
        selIdentificacion: ' ',
        txtCurp: 'XXXX010101XXXXXXX1',
        selNotificacion: 'Correo Electronico',
        txtnumTel1 : ' ',
        txtnumTel2 : ' ',
        emailCorreo: this.state.emailCorreo,
        txtNacionalidad : ' ',
        selEstadoCivil : ' ',
        selOcupacion : ' ',
        selNivelEstudios : ' ',
        selLengua : ' ',
        selReligion : ' ',
        swLGBT : false,
        selLGBT : ' ',
        swDiscapacidad : false,
        selDiscapacidad : ' ',
        selTipoDelito : this.state.selTipoDelito,
        timeHoraSuceso : this.state.timeHoraSuceso,
        dateFSuceso : this.state.dateFSuceso,
        txtCalle : this.state.txtCalle,
        txtNumInt : this.state.txtNumInt,
        txtNumExt : this.state.txtNumExt,
        txtEntCalle1 : this.state.txtEntCalle1,
        txtEntCalle2 : this.state.txtEntCalle2,
        txtReferencias : this.state.txtReferencias,
        selPais : this.state.selPais,
        selEstado : this.state.selEstado,
        selMunicipio : this.state.selMunicipio,
        selLocalidad : this.state.selLocalidad,
        txtCodPostal : this.state.txtCodPostal,
        selAgenciaAVisitar : this.state.selAgenciaAVisitar,
        dateFechaCita : this.state.dateFechaCita,
        selHorarioCita : this.state.selHorarioCita,
        // txtLatitud : this.state.txtLatitud,
        // txtLongitud : this.state.txtLongitud
      }

      console.log(parametrosProtegidos)
  
      if(
        parametrosProtegidos.selClasPersona &&
        parametrosProtegidos.txtNumEdad &&
        parametrosProtegidos.selSexo &&
        parametrosProtegidos.selNotificacion &&
        parametrosProtegidos.emailCorreo &&
        parametrosProtegidos.selTipoDelito &&
        parametrosProtegidos.timeHoraSuceso &&
        parametrosProtegidos.dateFSuceso &&
        parametrosProtegidos.txtCalle &&
        parametrosProtegidos.txtNumExt &&
        parametrosProtegidos.txtEntCalle1 &&
        parametrosProtegidos.txtReferencias &&
        parametrosProtegidos.selPais &&
        parametrosProtegidos.selEstado &&
        parametrosProtegidos.selMunicipio &&
        parametrosProtegidos.selLocalidad &&
        parametrosProtegidos.txtCodPostal &&
        parametrosProtegidos.selAgenciaAVisitar &&
        parametrosProtegidos.dateFechaCita &&
        parametrosProtegidos.selHorarioCita
        // parametrosProtegidos.txtLatitud &&
        // parametrosProtegidos.txtLongitud
        )
        {
          firebase.database().ref("pruebaCentAnonimo").push(parametrosProtegidos).then(()=>
          {
            // alert("Sus datos han sido enviados correctamente");
            this.setState({
              step: 4,
            });

          }).catch((e)=>
          {
            console.log(e);
            alert("Faltan campos por llenar")
          })
        }else{
          alert("Por favor llene su formulario")
          this.setState({
            step: 1,
          });
        }
      
    }

    // si son mayores de edad, pero seleccionaron persona fisica.
    if (this.state.raPersona === 'Fisica' && this.state.swAnonimo === false && this.state.txtNumEdad >= 18) {
      
      const parametrosFisica = {
        swAnonimo: false,
        raPersona: this.state.raPersona,
        txtRFC: ' ',
        txtRazonSocial: ' ',
        selClasPersona: this.state.selClasPersona,
        txtNombre: this.state.txtNombre,
        txtApPaterno: this.state.txtApPaterno,
        txtApMaterno: this.state.txtApMaterno,
        txtAlias: this.state.txtAlias,
        txtNumEdad: this.state.txtNumEdad,
        selSexo: this.state.selSexo,
        selEntidadFederativa: this.state.selEntidadFederativa,
        selIdentificacion: this.state.selIdentificacion,
        fileDocumento: this.state.fileDocumento,
        txtCurp: this.state.txtCurp,
        selNotificacion: this.state.selNotificacion,
        txtnumTel1: this.state.txtnumTel1,
        txtnumTel2: this.state.txtnumTel2,
        emailCorreo: this.state.emailCorreo,
        txtNacionalidad: this.state.txtNacionalidad,
        selEstadoCivil: this.state.selEstadoCivil,
        selOcupacion: this.state.selOcupacion,
        selNivelEstudios: this.state.selNivelEstudios,
        selLengua: this.state.selLengua,
        selReligion: this.state.selReligion,
        swLGBT: this.state.swLGBT,
        selLGBT: this.state.selLGBT,
        swDiscapacidad: this.state.swDiscapacidad,
        selDiscapacidad: this.state.selDiscapacidad,
        selTipoDelito: this.state.selTipoDelito,
        timeHoraSuceso : this.state.timeHoraSuceso,
        dateFSuceso: this.state.dateFSuceso,
        txtCalle: this.state.txtCalle,
        txtNumInt: this.state.txtNumInt,
        txtNumExt: this.state.txtNumExt,
        txtEntCalle1: this.state.txtEntCalle1,
        txtEntCalle2: this.state.txtEntCalle2,
        txtReferencias: this.state.txtReferencias,
        selPais: this.state.selPais,
        selEstado: this.state.selEstado,
        selMunicipio: this.state.selMunicipio,
        selLocalidad: this.state.selLocalidad,
        txtCodPostal: this.state.txtCodPostal,
        selAgenciaAVisitar : this.state.selAgenciaAVisitar,
        dateFechaCita : this.state.dateFechaCita,
        selHorarioCita : this.state.selHorarioCita,
        // txtLatitud: this.state.txtLatitud,
        // txtLongitud: this.state.txtLongitud,
      }

      console.log(parametrosFisica)
  
      if(
        parametrosFisica.raPersona &&
        parametrosFisica.selClasPersona &&
        parametrosFisica.txtNombre &&
        parametrosFisica.txtApPaterno &&
        parametrosFisica.txtApMaterno &&
        parametrosFisica.txtNumEdad &&
        parametrosFisica.selSexo &&
        parametrosFisica.selEntidadFederativa &&
        parametrosFisica.selIdentificacion &&
        parametrosFisica.fileDocumento &&
        parametrosFisica.txtCurp &&
        parametrosFisica.selNotificacion &&
        parametrosFisica.txtnumTel1 &&
        parametrosFisica.emailCorreo &&
        parametrosFisica.txtNacionalidad &&
        parametrosFisica.selEstadoCivil &&
        parametrosFisica.selTipoDelito &&
        parametrosFisica.timeHoraSuceso &&
        parametrosFisica.dateFSuceso &&
        parametrosFisica.txtCalle &&
        parametrosFisica.txtNumExt &&
        parametrosFisica.txtEntCalle1 &&
        parametrosFisica.txtReferencias &&
        parametrosFisica.selPais &&
        parametrosFisica.selEstado &&
        parametrosFisica.selMunicipio &&
        parametrosFisica.selLocalidad &&
        parametrosFisica.txtCodPostal &&
        parametrosFisica.selAgenciaAVisitar &&
        parametrosFisica.dateFechaCita &&
        parametrosFisica.selHorarioCita 
        // parametrosFisica.txtLatitud &&
        // parametrosFisica.txtLongitud
        )
        {
          firebase.database().ref("pruebaCentenario").push(parametrosFisica).then(()=>
          {
            // alert("Sus datos han sido enviados correctamente");
            this.setState({
              step: 4,
            });
          }).catch((e)=>
          {
            console.log(e);
            alert("Faltan campos por llenar")
          })
        }else{
          alert("Por favor llene su formulario")
          this.setState({
            step: 1,
          });
        }
    } 
    
    // si son mayores de edad pero seleccionaron persona moral
    if (this.state.raPersona === 'Moral' && this.state.swAnonimo === false){
     
      const parametrosMoral = {
        swAnonimo: false,
        raPersona: this.state.raPersona,
        txtRFC: this.state.txtRFC,
        txtRazonSocial: this.state.txtRazonSocial,
        selClasPersona: this.state.selClasPersona,
        txtNombre: ' ',
        txtApPaterno: ' ',
        txtApMaterno: ' ',
        txtAlias: ' ',
        txtNumEdad: ' ',
        selSexo: ' ',
        selEntidadFederativa: ' ',
        selIdentificacion: ' ',
        fileDocumento: this.state.fileDocumento,
        txtCurp: ' ',
        selNotificacion: this.state.selNotificacion,
        txtnumTel1: this.state.txtnumTel1,
        txtnumTel2: this.state.txtnumTel2,
        emailCorreo: this.state.emailCorreo,
        txtNacionalidad: ' ',
        selEstadoCivil: ' ',
        selOcupacion: ' ',
        selNivelEstudios: ' ',
        selLengua: ' ',
        selReligion: ' ',
        swLGBT: ' ',
        selLGBT: ' ',
        swDiscapacidad: ' ',
        selDiscapacidad: ' ',
        selTipoDelito: this.state.selTipoDelito,
        timeHoraSuceso: this.state.timeHoraSuceso,
        dateFSuceso: this.state.dateFSuceso,
        txtCalle: this.state.txtCalle,
        txtNumInt: this.state.txtNumInt,
        txtNumExt: this.state.txtNumExt,
        txtEntCalle1: this.state.txtEntCalle1,
        txtEntCalle2: this.state.txtEntCalle2,
        txtReferencias: this.state.txtReferencias,
        selPais: this.state.selPais,
        selEstado: this.state.selEstado,
        selMunicipio: this.state.selMunicipio,
        selLocalidad: this.state.selLocalidad,
        txtCodPostal: this.state.txtCodPostal,
        selAgenciaAVisitar : this.state.selAgenciaAVisitar,
        dateFechaCita : this.state.dateFechaCita,
        selHorarioCita : this.state.selHorarioCita,
        // txtLatitud: this.state.txtLatitud,
        // txtLongitud: this.state.txtLongitud,
      }

      if(
        parametrosMoral.raPersona &&
        parametrosMoral.txtRFC &&
        parametrosMoral.txtRazonSocial &&
        parametrosMoral.selClasPersona &&
        parametrosMoral.selNotificacion &&
        parametrosMoral.txtnumTel1 &&
        parametrosMoral.emailCorreo &&
        parametrosMoral.selTipoDelito &&
        parametrosMoral.timeHoraSuceso &&
        parametrosMoral.dateFSuceso &&
        parametrosMoral.txtCalle &&
        parametrosMoral.txtNumExt &&
        parametrosMoral.txtEntCalle1 &&
        parametrosMoral.txtReferencias &&
        parametrosMoral.selPais &&
        parametrosMoral.selEstado &&
        parametrosMoral.selMunicipio &&
        parametrosMoral.selLocalidad &&
        parametrosMoral.txtCodPostal &&
        parametrosMoral.selAgenciaAVisitar &&
        parametrosMoral.dateFechaCita &&
        parametrosMoral.selHorarioCita 
        // parametrosMoral.txtLatitud &&
        // parametrosMoral.txtLongitud
        )
        {
          firebase.database().ref("pruebaCentenario").push(parametrosMoral).then(()=>
          {
            // alert("Sus datos han sido enviados correctamente");
            this.setState({
              step: 4,
            });
          }).catch((e)=>
          {
            console.log(e);
            alert("Faltan campos por llenar")
          })
        }else{
          alert("Por favor llene su formulario")
          this.setState({
            step: 1,
          });
        }
    }
  }

  // Información del archivo subido cuando es cargado
  handlerOnChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state });
  };

  render() {
    return (

      <div className='d-flex justify-content-md-end' style={{backgroundColor: "#f4f4f4", minHeight: "100vh"}}>

        <form style={{display: "flex", flexDirection: "column", width: "100%", height: "100%"}}>
              
          {/* pantalla 1 - datos generales*/}
          {(this.state.step === 1 )  && 
            <div className="container-fluid h-100 pt-5 px-3" style={{backgroundColor: "#f4f4f4"}}>
              <div className="row">
                <div className="col mb-2">
                  <h3>Datos generales</h3>
                  <small>Los campos marcados con * son obligatorios. Por favor, llenelos correctamente.</small>
                  <br/>
                  <small className="text-danger">Servicio únicamente disponible para CESIS Pachuca, Tula, Tulancingo e Ixmiquilpan</small>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  {/* Lado izquierdo Azul */}
                  <div className="form-group mb-3">
                    <label>
                      <input onChange={this.checkAnonimo.bind(this)} checked={this.state.swAnonimo === true} type="checkbox" id="swAnonimo" name="swAnonimo" value={this.state.swAnonimo} ref={swAnonimo=>this.inputSwAnonimo = swAnonimo}/>
                      <span>&nbsp;¿Su denuncia es anonima?</span>
                    </label>
                  </div>
                  
                  <div className="form-group mb-3">
                    <label>
                      <input onChange={this.checkF.bind(this)} disabled= {this.state.swAnonimo === true} type="checkbox" id="raPersona" name="raPersona" value={this.state.raPersona} ref={raPersona=>this.inputRaPersona = raPersona} 
                      checked={this.state.raPersona === "Fisica" ? true : false}/>
                      <span>Fisica &nbsp; &nbsp;</span>
                    </label>
                    <label>
                      <input onChange={this.checkM.bind(this)} disabled={this.state.swAnonimo === true} type="checkbox" id="raPersona" name="raPersona" value={this.state.raPersona} ref={raPersona=>this.inputRaPersona = raPersona}
                      checked={this.state.raPersona === "Moral" ? true : false}/>
                      <span>Moral</span>
                    </label>
                  </div>

                  <span>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    {/* Select Clasificacion de Persona*/}
                    <select onChange={this.handlerOnChange} className="form-select" id="selClasPersona" name="selClasPersona" value={this.state.selClasPersona} ref={selClasPersona=>this.inputSelClasPersona = selClasPersona}>
                      <option value="defaultClasificacionPersona">Clasificacion de Persona</option>
                      <option value="Denunciante">Denunciante</option>
                      <option value="Inputado">Inputado</option>
                      <option value="Testigo">Testigo</option>
                      <option value="Victima Directa">Victima Directa</option>
                      <option value="Victima Indirecta">Victima Indirecta</option>
                    </select>
                  </div>                      

                  {/* RFC */}
                  <span hidden={ this.state.raPersona === "Fisica" || this.state.swAnonimo === true }>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <input required={this.state.raPersona === "Moral" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.raPersona === "Fisica" || this.state.swAnonimo === true} id="txtRFC" type="text" className="form-control" name="txtRFC" placeholder="RFC" value={this.state.txtRFC} ref={txtRFC=>this.inputTxtRFC = txtRFC} />
                  </div>

                  {/* Razon social */}
                  <span hidden={ this.state.swAnonimo === true || this.state.raPersona === "Fisica"}>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <input required={this.state.raPersona === "Moral" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.raPersona === "Fisica" || this.state.swAnonimo === true} id="txtRazonSocial" type="text" className="form-control" name="txtRazonSocial" placeholder="Razon Social" value={this.state.txtRazonSocial} ref={txtRazonSocial=>this.inputTxtRazonSocial = txtRazonSocial} />
                  </div>

                  {/* Nombre */}
                  <span hidden={ this.state.swAnonimo === true || this.state.raPersona === "Moral"}>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <input required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} id="txtNombre" type="text" className="form-control" name="txtNombre" placeholder="Nombre" value={this.state.txtNombre} ref={txtNombre=>this.inputTxtNombre = txtNombre} />
                  </div>

                  {/* Apellido parterno */}
                  <span hidden={ this.state.swAnonimo === true || this.state.raPersona === "Moral"}>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <input required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} id="txtApPaterno" type="text" className="form-control"  placeholder="Apellido Paterno" name="txtApPaterno" value={this.state.txtApPaterno} ref={txtApPaterno=>this.inputTxtApPaterno = txtApPaterno} />
                  </div>
                
                  {/* Apellido materno */}
                  <span hidden={ this.state.swAnonimo === true || this.state.raPersona === "Moral"}>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <input required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} id="txtApMaterno" type="text" className="form-control" placeholder="Apellido Materno" name="txtApMaterno" value={this.state.txtApMaterno} ref={txtApMaterno=>this.inputTxtApMaterno = txtApMaterno} />
                  </div>

                  {/* Alias */}
                  <div className="form-group mb-3">
                    <input onChange={this.handlerOnChange} disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} id="txtAlias" type="text" className="form-control" placeholder="Alias" name="txtAlias" value={this.state.txtAlias} ref={txtAlias=>this.inputTxtAlias = txtAlias}/>
                  </div>

                  {/* Fecha de nacimiento */}
                  <div className="row mb-3 align-items-center">
                    <div className="col-md-6">
                      <small>Fecha de nacimiento:</small>
                    </div>
                    <div className="col-md-6">
                      <input onChange={this.handlerOnChange, this.handleChange_edad} type="date" id="dateFNacimiento" className="form-control" name="dateFNacimiento" value={this.state.dateFNacimiento} ref={dateFNacimiento=>this.inputDateFNacimiento = dateFNacimiento} />
                    </div>
                  </div>

                  {/* Sexo */}
                  <span hidden={ this.state.raPersona === "Moral"}>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <select required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.raPersona === "Moral"} className="form-select" id="selSexo" name="selSexo" value={this.state.selSexo} ref={selSexo=>this.inputSelSexo = selSexo}>
                      <option value="defaultSexo" >Sexo</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                    </select>
                  </div>

                </div>
                <div className="col-md-6">
                  {/* Lado derecho Azull */}
                      {/* entidad de nacimiento */}
                      <span hidden={ this.state.swAnonimo === true || this.state.raPersona === "Moral"}>
                        <small className="text-danger">* Requerido</small>
                      </span>
                      <div className="form-group mb-3">
                        <select required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} className="form-select" id="selEntidadFederativa" name="selEntidadFederativa" value={this.state.selEntidadFederativa} ref={selEntidadFederativa=>this.inputSelEntidadFederativa = selEntidadFederativa}>
                          <option value="defaultEntidadFederativa">Entidad Federativa de Nacimiento</option>
                          <option value="Aguascalientes">Aguascalientes</option>
                          <option value="Baja California">Baja California</option>
                          <option value="Baja California Sur">Baja California Sur</option>
                          <option value="Campeche">Campeche</option>
                          <option value="Chiapas">Chiapas</option>
                          <option value="Chihuahua">Chihuahua</option>
                          <option value="CDMX">Ciudad de México</option>
                          <option value="Coahuila">Coahuila</option>
                          <option value="Colima">Colima</option>
                          <option value="Durango">Durango</option>
                          <option value="Estado de México">Estado de México</option>
                          <option value="Guanajuato">Guanajuato</option>
                          <option value="Guerrero">Guerrero</option>
                          <option value="Hidalgo">Hidalgo</option>
                          <option value="Jalisco">Jalisco</option>
                          <option value="Michoacán">Michoacán</option>
                          <option value="Morelos">Morelos</option>
                          <option value="Nayarit">Nayarit</option>
                          <option value="Nuevo León">Nuevo León</option>
                          <option value="Oaxaca">Oaxaca</option>
                          <option value="Puebla">Puebla</option>
                          <option value="Querétaro">Querétaro</option>
                          <option value="Quintana Roo">Quintana Roo</option>
                          <option value="San Luis Potosí">San Luis Potosí</option>
                          <option value="Sinaloa">Sinaloa</option>
                          <option value="Sonora">Sonora</option>
                          <option value="Tabasco">Tabasco</option>
                          <option value="Tamaulipas">Tamaulipas</option>
                          <option value="Tlaxcala">Tlaxcala</option>
                          <option value="Veracruz">Veracruz</option>
                          <option value="Yucatán">Yucatán</option>
                          <option value="Zacatecas">Zacatecas</option>
                        </select>
                      </div>

                      <span hidden={ this.state.swAnonimo === true || this.state.raPersona === "Moral"}>
                        <small className="text-danger">* Requerido</small>
                      </span>
                      <div className="form-group mb-3">
                        {/* Select Documento de Identificacion*/}
                        <select required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} className="form-select" id="selIdentificacion" name="selIdentificacion" value={this.state.selIdentificacion} ref={selIdentificacion=>this.inputSelIdentificacion = selIdentificacion}>
                          <option value="defaultDocumentoIdentificacion" >Documento de Identificación</option>
                          <option value="INE">INE</option>
                          <option value="Licencia de Conducir">Licencia de Conducir</option>
                          <option value="Pasaporte">Pasaporte</option>
                          <option value="Cedula Profesional">Cédula Profesional</option>
                          <option value="Cartilla Militar">Cartilla del Servicio Militar Nacional</option>
                          <option value="Credencial Laboral">Credencial de Identificacion Laboral</option>
                          <option value="Credencial de Derechohabiente">Credencial de Derechohabiente</option>
                          <option value="Acta de Nacimiento">Acta de Nacimiento</option>
                          <option value="CURP">CURP</option>
                        </select>
                      </div>
                      
                      {/* documento de identificacion */}
                      <span hidden={ this.state.swAnonimo === true || this.state.raPersona === "Moral"}>
                        <small className="text-danger">* Requerido</small>
                      </span>
                      <div className="form-group mb-3">
                        <input required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} type="file" accept="image/*" onChange={this.cargarDocumento.bind(this)} disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} className="form-control" id="inputGroupFile02"/>
                      </div>

                      {/* CURP */}
                      <span hidden={ this.state.swAnonimo === true || this.state.raPersona === "Moral"}>
                        <small className="text-danger">* Requerido</small>
                      </span>
                      <div className="form-group mb-3">
                        <div className="mb-3 w-100">
                          <input onChange={this.handlerOnChange} onInput={this.maxLengthCheck} maxLength="18" disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} id="txtCurp" type="text" className="form-control" placeholder="CURP" name="txtCurp" value={this.state.txtCurp} ref={txtCurp=>this.inputTxtCurp = txtCurp} />
                        </div>
                      </div>

                      {/* Correo electronico */}
                      <span hidden={ this.state.swAnonimo === false} >
                        <small className="text-secondary">Correo electrónico*</small>
                      </span>
                      <div className="form-group mb-3" hidden={ this.state.swAnonimo === false}>
                        <input onChange={this.handlerOnChange} className="form-control" id="emailCorreo" type="text" placeholder="ejemplo@ejemplo.com" name="emailCorreo" value={this.state.emailCorreo} ref={emailCorreo=>this.inputEmailCorreo = emailCorreo}/>
                      </div>        
                  </div>                
              </div>
              
              <div className="row">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                  <button className="btn btn-dark" onClick={this.handlerOnChange, this.siguiente.bind(this)} style={{marginTop: "10px"}}>SIGUIENTE</button>
                </div>
              </div> 
            </div>
          }
          {/* pantalla 2 - datos del denunciante*/}
          {(this.state.step === 2) && 
            <div className="container-fluid h-100 pt-5 px-3" style={{ backgroundColor: "#f4f4f4" }} >
              <div className="col mb-2">
                  <h3>Datos complementarios</h3>
                  <small>Los campos marcados con * son obligatorios. Por favor, llenelos correctamente.</small>
                  <br/>
                  <small className="text-danger">Servicio únicamente disponible para CESIS Pachuca, Tula, Tulancingo e Ixmiquilpan</small>
              </div>
              <div className="row mb-5">
                {/* Lado izquierdo */}
                <div className="col-md-6">
                  <span hidden={ this.state.swAnonimo === true}>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <select required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.swAnonimo === true} className="form-select" id="selNotificacion" name="selNotificacion" value={this.state.selNotificacion} ref={selNotificacion=>this.inputSelNotificacion = selNotificacion}>
                      <option value="defaultMedioNotificacion" >Medio de notificacion</option>
                      <option value="Correo Electronico">Correo Electronico</option>
                      <option value="Domicilio" disabled={this.state.swAnonimo === true}>Domicilio</option>
                      <option value="Telefono" disabled={this.state.swAnonimo === true}>Telefono</option>
                    </select>
                  </div>
                  
                  {/* telefono 1 */}
                  <span hidden={ this.state.swAnonimo === true }>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <input onChange={this.handlerOnChange} onInput={this.maxLengthCheck} disabled={this.state.swAnonimo === true} maxLength="10" className="form-control" id="txtnumTel1" type="number" placeholder="Telefono 1" name="txtnumTel1" value={this.state.txtnumTel1} ref={txtnumTel1=>this.inputTxtnumTel1 = txtnumTel1}/>
                  </div>

                  {/* telefono 2 */}
                  <div className="form-group mb-3">
                    <input onChange={this.handlerOnChange} onInput={this.maxLengthCheck} disabled={this.state.swAnonimo === true} maxLength="10" className="form-control" id="txtnumTel2" type="number" placeholder="Telefono 2" name="txtnumTel2" value={this.state.txtnumTel2} ref={txtnumTel2=>this.inputTxtnumTel2 = txtnumTel2}/>
                  </div>

                  {/* Correo electronico */}
                  <span>
                      <small className="text-danger">* Requerido</small>
                    </span>
                  <div className="form-group mb-3">
                    <input onChange={this.handlerOnChange} className="form-control" id="emailCorreo" type="text" placeholder="Correo electronico" name="emailCorreo" value={this.state.emailCorreo} ref={emailCorreo=>this.inputEmailCorreo = emailCorreo}/>
                  </div>
                  
                  {/* nacionalidad */}
                  <span hidden={ this.state.swAnonimo === true }>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <input required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} className="form-control" id="txtNacionalidad" type="text" placeholder="Nacionalidad" name="txtNacionalidad" value={this.state.txtNacionalidad} ref={txtNacionalidad=>this.inputTxtNacionalidad = txtNacionalidad} />
                  </div>

                  {/* Estado civil */}
                  <span hidden={ this.state.swAnonimo === true }>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    {/* Select Estado Civil*/}
                    <select required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} className="form-select" id="selEstadoCivil" name="selEstadoCivil" value={this.state.selEstadoCivil} ref={selEstadoCivil=>this.inputSelEstadoCivil = selEstadoCivil}>
                      <option value="defaultEstadoCivil" >Estado Civil</option>
                      <option value="Soltero">Soltero(a)</option>
                      <option value="Casado(a)">Casado(a)</option>
                      <option value="Divorciado(a)">Divorciado(a)</option>
                      <option value="Separación en Proceso Judicial">
                        Separación en Proceso Judicial
                      </option>
                      <option value="Viudo(a)">Viudo(a)</option>
                      <option value="Concubinato">Concubinato</option>
                    </select>
                  </div>
                </div>

                {/* Lado derecho */}
                <div className="col-md-6">
                  {/* Ocupacion*/}
                  <span hidden={ this.state.swAnonimo === true || this.state.raPersona === "Moral"}>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">                    
                    <select onChange={this.handlerOnChange} disabled={this.state.swAnonimo === true} className="form-select" id="selOcupacion" name="selOcupacion" value={this.state.selOcupacion} ref={selOcupacion=>this.inputSelOcupacion = selOcupacion}>
                      <option value="defaultOcupacion" >Ocupacion</option>
                      <option value="Abogado">Abogado</option>
                      <option value="Actor, Actriz, Director de Espectáculos">
                        Actor, Actriz, Director de Espectáculos
                      </option>
                      <option value="Actuario">Actuario</option>
                      <option value="Administrador">Administrador</option>
                      <option value="Aduanero/Agente de Aduanas/Inspector de Frontera">
                        Aduanero/Agente de Aduanas/Inspector de Frontera
                      </option>
                      <option value="Aeromozo/Azafata">Aeromozo/Azafata</option>
                      <option value="Agente/Intermediario/Corredor Inmobiliario">
                        Agente/Intermediario/Corredor Inmobiliario
                      </option>
                      <option value="Agente de Bolsa">Agente de Bolsa</option>
                      <option value="Agente de Inmigración/Migración">
                        Agente de Inmigración/Migración
                      </option>
                      <option value="Agente de Turismo/Viajes">
                        Agente de Turismo/Viajes
                      </option>
                      <option value="Agente/Intemediario/Corredor de Seguros">
                        Agente/Intemediario/Corredor de Seguros
                      </option>
                      <option value="Agricultor, Agrónomo, Agrologo, Arboricultor">
                        Agricultor, Agrónomo, Agrologo, Arboricultor
                      </option>
                      <option value="Albañil, Obrero de Construcción">
                        Albañil, Obrero de Construcción
                      </option>
                      <option value="Ama de Casa">Ama de Casa</option>
                      <option value="Analista de Sistemas y Computacion">
                        Analista de Sistemas y Computacion
                      </option>
                      <option value="Antropólogo, Arqueologo, Etnólogo">
                        Antropólogo, Arqueologo, Etnólogo
                      </option>
                      <option value="Archivero">Archivero</option>
                      <option value="Armador de Barco">Armador de Barco</option>
                      <option value="Arquitecto">Arquitecto</option>
                      <option value="Artesano">Artesano</option>
                      <option value="Asistente Social">Asistente Social</option>
                      <option value="Autor Literario, Escritor, Critico">
                        Autor Literario, Escritor, Critico
                      </option>
                      <option value="Avicultor">Avicultor</option>
                      <option value="Bacteriólogo, Farmacólogo, Biólogo, Cientifico">
                        Bacteriólogo, Farmacólogo, Biólogo, Cientifico
                      </option>
                      <option value="Basurero/Barrendero">
                        Basurero/Barrendero
                      </option>
                      <option value="Cajero">Cajero</option>
                      <option value="Camarero/Barman/Mesero/Chef">
                        Camarero/Barman/Mesero/Chef
                      </option>
                      <option value="Cambista, Compra/Venta de Moneda">
                        Cambista, Compra/Venta de Moneda
                      </option>
                      <option value="Campesino">Campesino</option>
                      <option value="Capataz">Capataz</option>
                      <option value="Cargador">Cargador</option>
                      <option value="Carpintero">Carpintero</option>
                      <option value="Cartero">Cartero</option>
                      <option value="Cerrajero">Cerrajero</option>
                      <option value="Cobrador">Cobrador</option>
                      <option value="Comerciante/Vendedor">
                        Comerciante/Vendedor
                      </option>
                      <option value="Conductor, Chofer/Taxista">
                        Conductor, Chofer/Taxista
                      </option>
                      <option value="Conserje/Portero/Guardián/Vigilante">
                        Conserje/Portero/Guardián/Vigilante
                      </option>
                      <option value="Constructor">Constructor</option>
                      <option value="Contador">Contador</option>
                      <option value="Contratista">Contratista</option>
                      <option value="Corte y Confección de Ropa/Fabricante de Prendas">
                        Corte y Confección de Ropa/Fabricante de Prendas
                      </option>
                      <option value="Cosmetólogo, Peluquero y Barbero">
                        Cosmetólogo, Peluquero y Barbero
                      </option>
                      <option value="Decorador, Dibujante, Publicista">
                        Decorador, Dibujante, Publicista
                      </option>
                      <option value="Dentista / Odontólogo">
                        Dentista / Odontólogo
                      </option>
                      <option value="Deportista Profesional, Atleta, Arbitro">
                        Deportista Profesional, Atleta, Arbitro
                      </option>
                      <option value="Distribuidor">Distribuidor</option>
                      <option value="Docente">Docente</option>
                      <option value="Economista">Economista</option>
                      <option value="Electricista">Electricista</option>
                      <option value="Empleado(a)del hogar / Nana">
                        Empleado(a)del hogar / Nana
                      </option>
                      <option value="Empresario Exportador/Empresario Importador">
                        Empresario Exportador/Empresario Importador
                      </option>
                      <option value="Enfermero">Enfermero</option>
                      <option value="Enbalsamador">Enbalsamador</option>
                      <option value="Escultor">Escultor</option>
                      <option value="Estudiante">Estudiante</option>
                      <option value="Fotógrafo/Operadores de cámara, cine y TV, Locutor">
                        Fotógrafo/Operadores de cámara, cine y TV, Locutor
                      </option>
                      <option value="Ganadero">Ganadero</option>
                      <option value="Gasfitero">Gasfitero</option>
                      <option value="Historiador">Historiador</option>
                      <option value="Ingeniero">Ingeniero</option>
                      <option value="Interprete, Traductor">
                        Interprete, Traductor
                      </option>
                      <option value="Jardinero">Jardinero</option>
                      <option value="Jockey">Jockey</option>
                      <option value="Joyero y/o Platero / Orfebre">
                        Joyero y/o Platero / Orfebre
                      </option>
                      <option value="Jubilado / Pensionista">
                        Jubilado / Pensionista
                      </option>
                      <option value="Laboratorista (Técnico)">
                        Laboratorista (Técnico)
                      </option>
                      <option value="Liquidador, Reclamaciones/Seguros">
                        Liquidador, Reclamaciones/Seguros
                      </option>
                      <option value="Maquinista / Operador de maquinaria">
                        Maquinista / Operador de maquinaria
                      </option>
                      <option value="Martillero / Subastador">
                        Martillero / Subastador
                      </option>
                      <option value="Mayorista, comercio al por mayor">
                        Mayorista, comercio al por mayor
                      </option>
                      <option value="Mecánico">Mecánico</option>
                      <option value="Medico / Cirujano">
                        Medico / Cirujano
                      </option>
                      <option value="Metalurgista">Metalurgista</option>
                      <option value="Miembro de las Fuerzas Armadas">
                        Miembro de las Fuerzas Armadas
                      </option>
                      <option value="Nutricionista">Nutricionista</option>
                      <option value="Obrero / Operador">
                        Obrero / Operador
                      </option>
                      <option value="Obstetriz">Obstetriz</option>
                      <option value="Organizador de Eventos">
                        Organizador de Eventos
                      </option>
                      <option value="Panadero / Pastelero">
                        Panadero / Pastelero
                      </option>
                      <option value="Paramédico">Paramédico</option>
                      <option value="Periodista">Periodista</option>
                      <option value="Perito">Perito</option>
                      <option value="Pescador">Pescador</option>
                      <option value="Piloto">Piloto</option>
                      <option value="Pintor">Pintor</option>
                      <option value="Policiá Municipal">
                        Policiá Municipal
                      </option>
                      <option value="Policiá PNP">Policiá PNP</option>
                      <option value="Productor de Cine / Radio / televisión / Teatro">
                        Productor de Cine / Radio / televisión / Teatro
                      </option>
                      <option value="Productor, Cultivos Extensivos">
                        Productor, Cultivos Extensivos
                      </option>
                      <option value="Programador">Programador</option>
                      <option value="Psicólogo / Terapeuta">
                        Psicólogo / Terapeuta
                      </option>
                      <option value="Quiropráctico/Kinesiterapeuta (Kinesiólogos)">
                        Quiropráctico/Kinesiterapeuta (Kinesiólogos)
                      </option>
                      <option value="Relacionista Publico e Industrial">
                        Relacionista Publico e Industrial
                      </option>
                      <option value="Relojero">Relojero</option>
                      <option value="Reparación de Automóviles, Pintor Retocador">
                        Reparación de Automóviles, Pintor Retocador
                      </option>
                      <option value="Reparador de Aparatos Electrodomésticos">
                        Reparador de Aparatos Electrodomésticos
                      </option>
                      <option value="Repartidor">Repartidor</option>
                      <option value="Sacerdote/Monja">Sacerdote/Monja</option>
                      <option value="Secretaria, Recepcionista, Telefonista">
                        Secretaria, Recepcionista, Telefonista
                      </option>
                      <option value="Seguridad / Guardaespaldas / Guardia de Seguridad">
                        Seguridad / Guardaespaldas / Guardia de Seguridad
                      </option>
                      <option value="Servicio de Almacenamiento / Almacenero">
                        Servicio de Almacenamiento / Almacenero
                      </option>
                      <option value="Servicio de Alquiler de Vehículos">
                        Servicio de Alquiler de Vehículos
                      </option>
                      <option value="Servicios de Alquiler de Videos, Equipos de Sonido">
                        Servicios de Alquiler de Videos, Equipos de Sonido
                      </option>
                      <option value="Sociólogo">Sociólogo</option>
                      <option value="Tasador">Tasador</option>
                      <option value="Técnico">Técnico</option>
                      <option value="Torero">Torero</option>
                      <option value="Tramitador">Tramitador</option>
                      <option value="Transporte de Carga y/o Mudanza">
                        Transporte de Carga y/o Mudanza
                      </option>
                      <option value="Transportista">Transportista</option>
                      <option value="Vendedor Ambulante">
                        Vendedor Ambulante
                      </option>
                      <option value="Veterinario, Zoólogo, Zootécnico">
                        Veterinario, Zoólogo, Zootécnico
                      </option>
                      <option value="Visitador Medico">Visitador Medico</option>
                      <option value="Zapatero">Zapatero</option>
                      <option value="Otro">Otro</option>
                      <option value="No Declara">No Declara</option>
                    </select>
                  </div>

                  {/* Nivel de estudios */}
                  <span hidden={ this.state.swAnonimo === true}>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    {/* Select Nivel de Estudios*/}
                    <select required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} className="form-select" id="selNivelEstudios" name="selNivelEstudios" value={this.state.selNivelEstudios} ref={selNivelEstudios=>this.inputSelNivelEstudios = selNivelEstudios}>
                      <option value="defaultNivelEstudios" >Nivel de estudios</option>
                      <option value="Preescolar Incompleta">Preescolar Incompleta</option>
                      <option value="Preescolar">Preescolar</option>
                      <option value="Primaria Incompleta">
                        Primaria Incompleta
                      </option>
                      <option value="Primaria">Primaria</option>
                      <option value="Secundaria Incompleta">
                        Secundaria Incompleta
                      </option>
                      <option value="Secundaria">Secundaria</option>
                      <option value="Bachillerato/Preparatoria Incompleta">
                        Bachillerato/Preparatoria Incompleta
                      </option>
                      <option value="Bachillerato/Preparatoria">
                        Bachillerato/Preparatoria
                      </option>
                      <option value="Técnica Incompleta">
                        Técnica Incompleta
                      </option>
                      <option value="Técnica">Técnica</option>
                      <option value="Técnico Superior Universitario Incompleta">
                        Técnico Superior Universitario Incompleta
                      </option>
                      <option value="Técnico Superior Universitario">
                        Técnico Superior Universitario
                      </option>
                      <option value="Licenciatura Incompleta">
                        Licenciatura Incompleta
                      </option>
                      <option value="Licenciatura">Licenciatura</option>
                      <option value="Especialidad Incompleta">
                        Especialidad Incompleta
                      </option>
                      <option value="Especialidad">Especialidad</option>
                      <option value="Maestría Incompleta">
                        Maestría Incompleta
                      </option>
                      <option value="Maestría">Maestría</option>
                      <option value="Doctorado Incompleto">
                        Doctorado Incompleto
                      </option>
                      <option value="Doctorado">Doctorado</option>
                      <option value="Sin estudios">Sin estudios</option>
                    </select>
                  </div>

                  {/* Lengua */}
                  <div className="form-group mb-3">
                    <select onChange={this.handlerOnChange} disabled={this.state.swAnonimo === true} className="form-select" id="selLengua" name="selLengua" value={this.state.selLengua} ref={selLengua=>this.inputSelLengua = selLengua}>
                      <option value="defaultLengua" >Lengua</option>
                      <option value="Akateko">Akateko</option>
                      <option value="Amuzgo">Amuzgo</option>
                      <option value="Awakateko">Awakateko</option>
                      <option value="Ayapaneco">Ayapaneco</option>
                      <option value="Cora">Cora</option>
                      <option value="Cucapá">Cucapá</option>
                      <option value="Cuicateco">Cuicateco</option>
                      <option value="Chatino">Chatino</option>
                      <option value="Chichimeco">Chichimeco</option>
                      <option value="Chinanteco">Chinanteco</option>
                      <option value="Chocholteco">Chocholteco</option>
                      <option value="Chontal de Oaxaca">
                        Chontal de Oaxaca
                      </option>
                      <option value="Chontal de Tabasco">
                        Chontal de Tabasco
                      </option>
                      <option value="Chuj">Chuj</option>
                      <option value="Ch'ol">Ch'ol</option>
                      <option value="Guarijío">Guarijío</option>
                      <option value="Huasteco">Huasteco</option>
                      <option value="Huave">Huave</option>
                      <option value="Huichol">Huichol</option>
                      <option value="Ixcateco">Ixcateco</option>
                      <option value="Ixil">Ixil</option>
                      <option value="Jakalteko">Jakalteko</option>
                      <option value="Kaqchikel">Kaqchikel</option>
                      <option value="Kickapoo">Kickapoo</option>
                      <option value="Kiliwa">Kiliwa</option>
                      <option value="Kumiai">Kumiai</option>
                      <option value="Ku'ahl III">Ku'ahl III</option>
                      <option value="K'iche'">K'iche'</option>
                      <option value="Lacandón">Lacandón</option>
                      <option value="Mam">Mam</option>
                      <option value="Matlatzinca">Matlatzinca</option>
                      <option value="Maya">Maya</option>
                      <option value="Mayo">Mayo</option>
                      <option value="Mazahua">Mazahua</option>
                      <option value="Mazateco">Mazateco</option>
                      <option value="Mixe">Mixe</option>
                      <option value="Mixteco">Mixteco</option>
                      <option value="Náhuatl">Náhuatl</option>
                      <option value="Oluteco">Oluteco</option>
                      <option value="Otomí">Otomí</option>
                      <option value="Paipai">Paipai</option>
                      <option value="Pame">Pame</option>
                      <option value="Pápago">Pápago</option>
                      <option value="Pima">Pima</option>
                      <option value="Popoloca">Popoloca</option>
                      <option value="Popoluca de la Sierra">
                        Popoluca de la Sierra
                      </option>
                      <option value="Qato'k">Qato'k</option>
                      <option value="Q'anjob'al">Q'anjob'al</option>
                      <option value="Q'eqchí'">Q'eqchí'</option>
                      <option value="Sayulteco">Sayulteco</option>
                      <option value="Seri">Seri</option>
                      <option value="Tarahumara">Tarahumara</option>
                      <option value="Tarasco">Tarasco</option>
                      <option value="Teko">Teko</option>
                      <option value="Tepehua">Tepehua</option>
                      <option value="Tepehuano del norte">
                        Tepehuano del norte
                      </option>
                      <option value="Tepehuano del sur">
                        Tepehuano del sur
                      </option>
                      <option value="Texistepequeño">Texistepequeño</option>
                      <option value="Tojolabal">Tojolabal</option>
                      <option value="Totonaco">Totonaco</option>
                      <option value="Triqui">Triqui</option>
                      <option value="Tlahuica">Tlahuica</option>
                      <option value="Tlapaneco">Tlapaneco</option>
                      <option value="Tseltal">Tseltal</option>
                      <option value="Tsotsil">Tsotsil</option>
                      <option value="Yaqui">Yaqui</option>
                      <option value="Zapoteco">Zapoteco</option>
                      <option value="Zoque IX">Zoque IX</option>
                    </select>
                  </div>

                  {/* Religion */}
                  <div className="form-group mb-3">
                    <select onChange={this.handlerOnChange} disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} className="form-select" id="selReligion" name="selReligion" value={this.state.selReligion} ref={selReligion=>this.inputSelReligion = selReligion}>
                      <option value="defaultReligion" >Religión</option>
                      <option value="Cristianismo">Cristianismo</option>
                      <option value="Catolicismo">Catolicismo</option>
                      <option value="Ortodoxos3">Ortodoxos</option>
                      <option value="Protestantismo histórico o reformado">
                        Protestantismo histórico o reformado
                      </option>
                      <option value="Pentecostalismo">Pentecostalismo</option>
                      <option value="Iglesias evangélicas">
                        Iglesias evangélicas
                      </option>
                      <option value="Iglesias cristianas">
                        Iglesias cristianas
                      </option>
                      <option value="Religiones bíblicas diferentes de evangélicas">
                        Religiones bíblicas diferentes de evangélicas
                      </option>
                      <option value="Religiones de origen oriental">
                        Religiones de origen oriental
                      </option>
                      <option value="Judaísmo">Judaísmo</option>
                      <option value="New age">New age</option>
                      <option value="Escuelas esotéricas">
                        Escuelas esotéricas
                      </option>
                      <option value="Raíces étnicas">Raíces étnicas</option>
                      <option value="Espiritualistas">Espiritualistas</option>
                      <option value="Otros movimientos religiosos">
                        Otros movimientos religiosos
                      </option>
                      <option value="Religión especifica">
                        Religión especifica
                      </option>
                      <option value="Sin religión">Sin religión</option>
                    </select>
                  </div>

                  {/* select LGBT */}
                  <div className=" row mb-3 align-items-center">
                    <div className="col">
                      <input type="checkbox" id="swLGBT" name="swLGBT" value={this.state.swLGBT} onChange={this.checkLGBT.bind(this)} checked={this.state.swLGBT === true} disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} ref={swLGBT=>this.inputSwLGBT = swLGBT}/>
                      <label className="form-label" style={{fontSize: "14px"}}>&nbsp;¿Pertenece a la comunidad LGBTTTQA?</label>
                    </div>
                    {/* Select LGBT*/}
                    <div className="col">
                      <select required={this.state.swLGBT === true} onChange={this.handlerOnChange} disabled={this.state.swLGBT === false} className="form-select" id="selLGBT" name="selLGBT" value={this.state.selLGBT} ref={selLGBT=>this.inputSelLGBT =selLGBT}>
                        <option value="defaultLGBT" >Seleccione...</option>
                        <option value="Lesbiana">Lesbiana</option>
                        <option value="Gay">Gay</option>
                        <option value="Bisexual">Bisexual</option>
                        <option value="Transgénero">Transgénero</option>
                        <option value="Transexual">Transexual</option>
                        <option value="Travesti">Travesti</option>
                        <option value="Queer">Queer</option>
                        <option value="Questioning">Questioning</option>
                        <option value="Intersexual">Intersexual</option>
                        <option value="Asexual">Asexual</option>
                        <option value="Pansexual">Pansexual</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  {/* Select Discapacidad*/}
                  <div className="row mb-3 align-items-center">
                    <div className="col">
                      <input type="checkbox" id="swDiscapacidad" name="swDiscapacidad" onChange={this.checkDisc.bind(this)} checked={this.state.swDiscapacidad === true} value={this.state.swDiscapacidad} disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} ref={swDiscapacidad=>this.inputSwDiscapacidad = swDiscapacidad}/>
                      <label className="form-label" style={{fontSize: "14px"}}>&nbsp;¿Tiene alguna discapacidad?</label>
                    </div>
                    {/* Select Discapacidad*/}
                    <div className="col">
                      <select required={this.state.swDiscapacidad === true} onChange={this.handlerOnChange} disabled={this.state.swDiscapacidad === false} className="form-select" id="selDiscapacidad" name="selDiscapacidad" value={this.state.selDiscapacidad} ref={selDiscapacidad=>this.inputSelDiscapacidad = selDiscapacidad}>
                        <option value="defaultDiscapacidad" >Seleccione...</option>
                        <option value="Autismo">Autismo</option>
                        <option value="Deficiencia Visual">Deficiencia Visual</option>
                        <option value="Discapacidad Fisica">Discapacidad Fisica</option>
                        <option value="Enfermedades Mentales">Enfermedades Mentales</option>
                        <option value="Transtorno del Lenguaje">Transtorno del Lenguaje</option>
                        <option value="Dificutades en el Aprendizaje">Dificutades en el Aprendizaje</option>
                        <option value="Enfermedad Cronica">Enfermedad Cronica</option>
                        <option value="Discapacidad Auditiva">Discapacidad Auditiva</option>
                        <option value="Discapacidad Intelectual">Discapacidad Intelectual</option>
                        <option value="Perdida de Memoria">Perdida de Memoria</option>
                        <option value="Otra">Otra</option>
                        <option value="Ninguna">Ninguna</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                  <button className="btn btn-outline-dark" onClick={this.anterior.bind(this)} style={{marginTop: "10px"}}>ANTERIOR</button>
                  <button className="btn btn-dark" onClick={this.siguiente.bind(this)} style={{marginTop: "10px"}}>SIGUIENTE</button>
                </div>
              </div>
            </div>
          }

          {/* pantalla 3 - datos de la denuncia*/}
          {(this.state.step === 3) && 
            <div className="container-fluid h-100 pt-5 px-3" style={{backgroundColor: "#f4f4f4"}}>
              <div className="row">
                <div className="col mb-2">
                  <h3>Datos de la denuncia</h3>
                  <small>Los campos marcados con * son obligatorios. Por favor, llenelos correctamente.</small>
                  <br/>
                  <small className="text-danger">Servicio únicamente disponible para CESIS Pachuca, Tula, Tulancingo e Ixmiquilpan</small>
                </div>
              </div>
              <div className="row">
                {/* Lado izquierdo */}
                <div className="col-md-6">
                  {/* Delito */}
                  <span>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    {/* Select Delitos*/}
                    <select required onChange={this.handlerOnChange} className="form-select" id="selTipoDelito" name="selTipoDelito" value={this.state.selTipoDelito} ref={selTipoDelito=>this.inputSelTipoDelito = selTipoDelito}  aria-label="Tipo de delito">
                      <option value="defaultTipoDelito" >Tipo de delito</option>
                      <option value="ABORTO">ABORTO</option>
                      <option value="COHECHO DE PARTICULARES">COHECHO DE PARTICULARES</option>
                      <option value="DELITOS COMETIDOS EN EL EJERCICIO DE UNA ACTIVIDAD PROFESIONAL O TÉCNICA">DELITOS COMETIDOS EN EL EJERCICIO DE UNA ACTIVIDAD PROFESIONAL O TÉCNICA</option>
                      <option value="DELITOS CONTRA EL RESPETO A LOS MUERTOS Y CONTRA LAS NORMAS DE INHUMACIÓN Y EXHUMACIÓN">PORTACION, FABRICACIÓN Y ACOPIO DE ARMAS PROHIBIDAS</option>
                      <option value="DELITOS CONTRA EL RESPETO A LOS MUERTOS Y CONTRA LAS NORMAS DE INHUMACIÓN Y EXHUMACIÓN">DELITOS CONTRA EL RESPETO A LOS MUERTOS Y CONTRA LAS NORMAS DE INHUMACIÓN Y EXHUMACIÓN</option>
                      <option value="VIOLENCIA FAMILIAR">VIOLENCIA FAMILIAR</option>
                      <option value="ABANDONO DE ATROPELLADO">ABANDONO DE ATROPELLADO</option>
                      <option value="HOMICIDIO CULPOSO">HOMICIDIO CULPOSO</option>
                      <option value="HOMICIDIO DOLOSO">HOMICIDIO DOLOSO</option>
                      <option value="REVELACIÓN DE SECRETO">REVELACIÓN DE SECRETO</option>
                      <option value="DELITOS EN CONTRA DE LOS ANIMALES">DELITOS EN CONTRA DE LOS ANIMALES </option>
                      <option value="DELITOS CONTRA EL TRABAJO Y LA PREVISIÓN SOCIAL">DELITOS CONTRA EL TRABAJO Y LA PREVISIÓN SOCIAL</option>
                      <option value="ASALTO EN NEGOCIO U OFICINA">ASALTO EN NEGOCIO U OFICINA</option>
                      <option value="ASALTO EN VEHÍCULO PARTICULAR">ASALTO EN VEHÍCULO PARTICULAR</option>
                      <option value="ASALTO EN CASA HABITACIÓN">ASALTO EN CASA HABITACIÓN</option>
                      <option value="ASALTO EN ESPACIO ABIERTO AL PÚBLICO">ASALTO EN ESPACIO ABIERTO AL PÚBLICO</option>
                      <option value="ASALTO EN TRANSPORTE PÚBLICO">ASALTO EN TRANSPORTE PÚBLICO</option>
                      <option value="ROBO A INSTITUCIONES BANCARIAS SIN VIOLENCIA">ROBO A INSTITUCIONES BANCARIAS SIN VIOLENCIA</option>
                      <option value="ROBO A TRANSEÚNTE SIN VIOLENCIA">ROBO A TRANSEÚNTE SIN VIOLENCIA</option>
                      <option value="ROBO A DEPENDENCIAS DE GOBIERNO CON VIOLENCIA">ROBO A DEPENDENCIAS DE GOBIERNO CON VIOLENCIA</option>
                      <option value="ROBO A PERSONA EN LUGAR PRIVADO CON VIOLENCIA">ROBO A PERSONA EN LUGAR PRIVADO CON VIOLENCIA</option>
                      <option value="ROBO A ESCUELAS SIN VIOLENCIA">ROBO A ESCUELAS SIN VIOLENCIA</option>
                      <option value="ROBO DE AUTOPARTES CON VIOLENCIA">ROBO DE AUTOPARTES CON VIOLENCIA</option>
                      <option value="ROBO A CASA HABITACIÓN CON VIOLENCIA">ROBO A CASA HABITACIÓN CON VIOLENCIA</option>
                      <option value="ROBO A IGLESIAS SIN VIOLENCIA">ROBO A IGLESIAS SIN VIOLENCIA</option>
                      <option value="ROBO A DEPENDENCIAS DE GOBIERNO SIN VIOLENCIA">ROBO A DEPENDENCIAS DE GOBIERNO SIN VIOLENCIA</option>
                      <option value="ROBO EN AUTOBUSES SIN VIOLENCIA">ROBO EN AUTOBUSES SIN VIOLENCIA</option>
                      <option value="ROBO A MAQUINARIA SIN VIOLENCIA">ROBO A MAQUINARIA SIN VIOLENCIA</option>
                      <option value="ROBO A ESCUELAS CON VIOLENCIA">ROBO A ESCUELAS CON VIOLENCIA</option>
                      <option value="ROBO A CUENTAHABIENTE SIN VIOLENCIA">ROBO A CUENTAHABIENTE SIN VIOLENCIA</option>
                      <option value="ROBO EN TRANSPORTE DE SERVICIO PUBLICO INDIVIDUAL SIN VIOLENCIA">ROBO EN TRANSPORTE DE SERVICIO PUBLICO INDIVIDUAL SIN VIOLENCIA</option>
                      <option value="ROBO EN TRANSPORTE DE SERVICIO PUBLICO COLECTIVO SIN VIOLENCIA">ROBO EN TRANSPORTE DE SERVICIO PUBLICO COLECTIVO SIN VIOLENCIA</option>
                      <option value="ROBO A MAQUINARIA CON VIOLENCIA">ROBO A MAQUINARIA CON VIOLENCIA</option>
                      <option value="ROBO EN VEHÍCULO DE PARTICULARES SIN VIOLENCIA">ROBO EN VEHÍCULO DE PARTICULARES SIN VIOLENCIA</option>
                      <option value="ROBO DE CAMIONES DE CARGA SIN VIOLENCIA">ROBO DE CAMIONES DE CARGA SIN VIOLENCIA</option>
                      <option value="ROBO OTRO TIPO SIN VIOLENCIA">ROBO OTRO TIPO SIN VIOLENCIA</option>
                      <option value="ROBO DE HIDROCARBURO SIN VIOLENCIA">ROBO DE HIDROCARBURO SIN VIOLENCIA</option>
                      <option value="ROBO A TRANSEÚNTE EN ESPACIO ABIERTO AL PUBLICO CON VIOLENCIA">ROBO A TRANSEÚNTE EN ESPACIO ABIERTO AL PUBLICO CON VIOLENCIA</option>
                      <option value="ROBO A INSTITUCIONES DE SALUD CON VIOLENCIA">ROBO A INSTITUCIONES DE SALUD CON VIOLENCIA</option>
                      <option value="ROBO A NEGOCIO U OFICINA CON VIOLENCIA">ROBO A NEGOCIO U OFICINA CON VIOLENCIA</option>
                      <option value="ROBO A TRANSEÚNTE EN VÍA PUBLICA SIN VIOLENCIA">ROBO A TRANSEÚNTE EN VÍA PUBLICA SIN VIOLENCIA</option>
                      <option value="ROBO A NEGOCIO U OFICINA SIN VIOLENCIA">ROBO A NEGOCIO U OFICINA SIN VIOLENCIA</option>
                      <option value="ROBO A CASA HABITACIÓN SIN VIOLENCIA">ROBO A CASA HABITACIÓN SIN VIOLENCIA</option>
                      <option value="ROBO A TRANSPORTISTAS CON VIOLENCIA">ROBO A TRANSPORTISTAS CON VIOLENCIA</option>
                      <option value="ROBO A VEHÍCULO CON VIOLENCIA">ROBO A VEHÍCULO CON VIOLENCIA</option>
                      <option value="ROBO DE VEHÍCULO SIN VIOLENCIA">ROBO DE VEHÍCULO SIN VIOLENCIA</option>
                      <option value="ROBO EN VEHÍCULO DE PARTICULARES CON VIOLENCIA">ROBO EN VEHÍCULO DE PARTICULARES CON VIOLENCIA</option>
                      <option value="ROBO DE VEHÍCULO CON VIOLENCIA">ROBO DE VEHÍCULO CON VIOLENCIA</option>
                      <option value="ROBO A TRANSEÚNTE CON VIOLENCIA">ROBO A TRANSEÚNTE CON VIOLENCIA</option>
                      <option value="ROBO EN TRANSPORTE DE SERVICIO PÚBLICO COLECTIVO CON VIOLENCIA">ROBO EN TRANSPORTE DE SERVICIO PÚBLICO COLECTIVO CON VIOLENCIA</option>
                      <option value="ROBO DE ENERGÍA ELÉCTRICA SIN VIOLENCIA">ROBO DE ENERGÍA ELÉCTRICA SIN VIOLENCIA</option>
                      <option value="ROBO A PERSONA EN LUGAR PRIVADO SIN VIOLENCIA">ROBO A PERSONA EN LUGAR PRIVADO SIN VIOLENCIA</option>
                      <option value="ROBO EN AUTOBUSES CON VIOLENCIA">ROBO EN AUTOBUSES CON VIOLENCIA</option>
                      <option value="ROBO DE ENERGÍA ELÉCTRICA CON VIOLENCIA">ROBO DE ENERGÍA ELÉCTRICA CON VIOLENCIA</option>
                      <option value="ROBO OTRO TIPO CON VIOLENCIA">ROBO OTRO TIPO CON VIOLENCIA</option>
                      <option value="ROBO A CUENTAHABIENTE CON VIOLENCIA">ROBO A CUENTAHABIENTE CON VIOLENCIA</option>
                      <option value="ROBO A TRANSEUNTE EN ESPACIO ABIERTO AL PUBLICO SIN VIOLENCIA">ROBO A TRANSEUNTE EN ESPACIO ABIERTO AL PUBLICO SIN VIOLENCIA</option>
                      <option value="ROBO DE CAMIONES DE CARGA CON VIOLENCIA">ROBO DE CAMIONES DE CARGA CON VIOLENCIA</option>
                      <option value="ROBO A INSTITUCIONES DE SALUD SIN VIOLENCIA">ROBO A INSTITUCIONES DE SALUD SIN VIOLENCIA</option>
                      <option value="ROBO DE AUTOPARTES SIN VIOLENCIA">ROBO DE AUTOPARTES SIN VIOLENCIA</option>
                      <option value="ROBO DE HIDROCARBURO CON VIOLENCIA">ROBO DE HIDROCARBURO CON VIOLENCIA</option>
                      <option value="ROBO A INSTITUCIONES BANCARIAS CON VIOLENCIA">ROBO A INSTITUCIONES BANCARIAS CON VIOLENCIA</option>
                      <option value="ROBO EN TRANSPORTE DE SERVICIO PÚBLICO INDIVIDUAL CON VIOLENCIA">ROBO EN TRANSPORTE DE SERVICIO PÚBLICO INDIVIDUAL CON VIOLENCIA</option>
                      <option value="ROBO A TRANSPORTISTAS SIN VIOLENCIA">ROBO A TRANSPORTISTAS SIN VIOLENCIA</option>
                      <option value="ROBO A VEHÍCULO SIN VIOLENCIA">ROBO A VEHÍCULO SIN VIOLENCIA</option>
                      <option value="ROBO A IGLESIAS CON VIOLENCIA">ROBO A IGLESIAS CON VIOLENCIA</option>
                      <option value="ROBO A TRANSEÚNTE EN VÍA PUBLICA CON VIOLENCIA">ROBO A TRANSEÚNTE EN VÍA PUBLICA CON VIOLENCIA</option>
                      <option value="DAÑO EN LA PROPIEDAD NO ESPECIFICADO">DAÑO EN LA PROPIEDAD NO ESPECIFICADO</option>
                      <option value="DAÑO EN LA PROPIEDAD CULPOSO">DAÑO EN LA PROPIEDAD CULPOSO</option>
                      <option value="DAÑO EN LA PROPIEDAD OTRO TIPO">DAÑO EN LA PROPIEDAD OTRO TIPO</option>
                      <option value="DAÑO EN LA PROPIEDAD DOLOSO">DAÑO EN LA PROPIEDAD DOLOSO</option>
                      <option value="INCUMPLIMIENTO DE UN DEBER LEGAL">INCUMPLIMIENTO DE UN DEBER LEGAL</option>
                      <option value="VIOLACIÓN A LA INTIMIDAD SEXUAL">VIOLACIÓN A LA INTIMIDAD SEXUAL</option>
                      <option value="PELIGRO DE CONTAGIO DE ENFERMEDADES">PELIGRO DE CONTAGIO DE ENFERMEDADES</option>
                      <option value="INTIMIDACIÓN">INTIMIDACIÓN</option>
                      <option value="EJERCICIO INDEBIDO DEL PROPIO DERECHO">EJERCICIO INDEBIDO DEL PROPIO DERECHO</option>
                      <option value="REBELIÓN">REBELIÓN</option>
                      <option value="SABOTAJE">SABOTAJE</option>
                      <option value="DESAPARICIÓN DE PERSONAS COMETIDAS POR PARTICULARES">DESAPARICIÓN DE PERSONAS COMETIDAS POR PARTICULARES</option>
                      <option value="TRÁFICO DE MENORES">TRÁFICO DE MENORES</option>
                      <option value="RECEPTACIÓN">RECEPTACIÓN</option>
                      <option value="TRATA DE PERSONAS CON FINES DE EXPLOTACIÓN SEXUAL">TRATA DE PERSONAS CON FINES DE EXPLOTACIÓN SEXUAL</option>
                      <option value="TRATA DE PERSONAS CON FINES DE TRABAJO O SERVICIOS FORZADOS">TRATA DE PERSONAS CON FINES DE TRABAJO O SERVICIOS FORZADOS</option>
                      <option value="TRATA DE PERSONAS CON FINES DE TRAFICO DE ORGANOS">TRATA DE PERSONAS CON FINES DE TRAFICO DE ORGANOS</option>
                      <option value="TRATA DE PERSONAS CON OTROS FINES DE EXPLOTACION">TRATA DE PERSONAS CON OTROS FINES DE EXPLOTACION</option>
                      <option value="TRATA DE PERSONAS NO ESPECIFICADO">TRATA DE PERSONAS NO ESPECIFICADO</option>
                      <option value="ABANDONADO DE INCAPAZ">ABANDONADO DE INCAPAZ</option>
                      <option value="DISCRIMINACIÓN">DISCRIMINACIÓN</option>
                      <option value="LESIONES DOLOSAS">LESIONES DOLOSAS</option>
                      <option value="LESIONES CULPOSAS">LESIONES CULPOSAS</option>
                      <option value="DELITOS ELECTORALES COMETIDOS POR PARTICULARES">DELITOS ELECTORALES COMETIDOS POR PARTICULARES</option>
                      <option value="DELITOS ELECTORALES COMETIDOS POR SERVIDORES PÚBLICOS">DELITOS ELECTORALES COMETIDOS POR SERVIDORES PÚBLICOS</option>
                      <option value="DELITOS ELECTORALES COMETIDOS POR FUNCIONARIOS ELECTORALES">DELITOS ELECTORALES COMETIDOS POR FUNCIONARIOS ELECTORALES</option>
                      <option value="DELITOS ELECTORALES COMETIDOS POR FUNCIONARIOS PARTIDISTAS">DELITOS ELECTORALES COMETIDOS POR FUNCIONARIOS PARTIDISTAS</option>
                      <option value="CALUMNIA (DEROGADO)">CALUMNIA (DEROGADO)</option>
                      <option value="BIGAMIA">BIGAMIA</option>
                      <option value="ABIGEATO CON VIOLENCIA">ABIGEATO CON VIOLENCIA</option>
                      <option value="ABIGEATO SIN VIOLENCIA">ABIGEATO SIN VIOLENCIA</option>
                      <option value="EXTORSIÓN COMETIDA POR VÍA TELEFÓNICA O CUALQUIER OTRO MEDIO ELECTRÓNICO O DE COMUNICACIÓN">EXTORSIÓN COMETIDA POR VÍA TELEFÓNICA O CUALQUIER OTRO MEDIO ELECTRÓNICO O DE COMUNICACIÓN</option>
                      <option value="EXTORSIÓN OTRO TIPO">EXTORSIÓN OTRO TIPO</option>
                      <option value="EXTORSIÓN NO ESPECIFICADO">EXTORSIÓN NO ESPECIFICADO</option>
                      <option value="FEMINICIDIO">FEMINICIDIO</option>
                      <option value="DESAPARICIÓN DE PERSONAS">DESAPARICIÓN DE PERSONAS</option>
                      <option value="TORTURA">TORTURA</option>
                      <option value="EJERCICIO INDEBIDO DEL SERVICIO PÚBLICO">EJERCICIO INDEBIDO DEL SERVICIO PÚBLICO</option>
                      <option value="ENCUBRIMIENTO">ENCUBRIMIENTO</option>
                      <option value="INCUMPLIMIENTO DE LAS OBLIGACIONES ALIMENTARIAS">INCUMPLIMIENTO DE LAS OBLIGACIONES ALIMENTARIAS</option>
                      <option value="ALTERACIÓN DE LA IMAGEN URBANA">ALTERACIÓN DE LA IMAGEN URBANA</option>
                      <option value="COALICIÓN DE SERVIDORES PÚBLICOS">COALICIÓN DE SERVIDORES PÚBLICOS</option>
                      <option value="SIMULACIÓN DE SECUESTRO">SIMULACIÓN DE SECUESTRO</option>
                      <option value="USO ILÍCITO DE ATRIBUCIONES Y FACULTADES">USO ILÍCITO DE ATRIBUCIONES Y FACULTADES</option>
                      <option value="NEGOCIACIONES INDEBIDAS">NEGOCIACIONES INDEBIDAS</option>
                      <option value="PUESTA A DISPOSICIÓN DE VEHÍCULO CON ALTERACIÓN EN SUS MEDIOS DE IDENTIFICACIÓN">PUESTA A DISPOSICIÓN DE VEHÍCULO CON ALTERACIÓN EN SUS MEDIOS DE IDENTIFICACIÓN</option>
                      <option value="PUESTA A DISPOSICIÓN DE VEHÍCULO CON HUELLAS DE DESVALIGAMIENTO">PUESTA A DISPOSICIÓN DE VEHÍCULO CON HUELLAS DE DESVALIGAMIENTO</option>
                      <option value="PUESTA A DISPOSICIÓN DE VEHÍCULO CON REPORTE DE ROBO">PUESTA A DISPOSICIÓN DE VEHÍCULO CON REPORTE DE ROBO</option>
                      <option value="PUESTA A DISPOSICIÓN DE VEHÍCULO POR OTROS HECHOS">PUESTA A DISPOSICIÓN DE VEHÍCULO POR OTROS HECHOS</option>
                      <option value="TRÁFICO DE INFLUENCIA">TRÁFICO DE INFLUENCIA</option>
                      <option value="INCUMPLIMIENTO DE PENAS NO PRIVATIVAS DE LIBERTAD Y MEDIDAS DE SEGURIDAD">INCUMPLIMIENTO DE PENAS NO PRIVATIVAS DE LIBERTAD Y MEDIDAS DE SEGURIDAD</option>
                      <option value="PECULADO">PECULADO</option>
                      <option value="DELITOS COMETIDOS POR LOS SERVIDORES PÚBLICOS">DELITOS COMETIDOS POR LOS SERVIDORES PÚBLICOS</option>
                      <option value="ALLANAMIENTO DE MORADA">ALLANAMIENTO DE MORADA</option>
                      <option value="INSTIGACIÓN O AYUDA AL SUICIDIO">INSTIGACIÓN O AYUDA AL SUICIDIO</option>
                      <option value="EVASIÓN DE PRESOS">EVASIÓN DE PRESOS </option>
                      <option value="DELITOS CONTRA LA IDENTIDAD TERRITORIAL DEL ESTADO">DELITOS CONTRA LA IDENTIDAD TERRITORIAL DEL ESTADO</option>
                      <option value="PELIGRO DE DEVASTACIÓN">PELIGRO DE DEVASTACIÓN</option>
                      <option value="USURPACIÓN DE PROFESIONES">USURPACIÓN DE PROFESIONES</option>
                      <option value="ATAQUES A LAS VÍAS DE COMUNICACIÓN Y A LOS MEDIOS DE TRANSPORTE">ATAQUES A LAS VÍAS DE COMUNICACIÓN Y A LOS MEDIOS DE TRANSPORTE</option>
                      <option value="ABUSO DE AUTORIDAD">ABUSO DE AUTORIDAD</option>
                      <option value="PROMOCIÓN DE CONDUCTAS ILÍCITAS">PROMOCIÓN DE CONDUCTAS ILÍCITAS</option>
                      <option value="TERRORISMO">TERRORISMO</option>
                      <option value="DELITOS CONTRA EL AMBIENTE">DELITOS CONTRA EL AMBIENTE</option>
                      <option value="COBRANZA EXTRAJUDICIAL ILEGAL">COBRANZA EXTRAJUDICIAL ILEGAL</option>
                      <option value="FACILITACIÓN DELICTIVA">FACILITACIÓN DELICTIVA</option>
                      <option value="SEDICIÓN Y OTROS DESORDENES PÚBLICOS">SEDICIÓN Y OTROS DESORDENES PÚBLICOS</option>
                      <option value="AMENAZAS">AMENAZAS</option>
                      <option value="MATRIMONIO ILEGAL">MATRIMONIO ILEGAL</option>
                      <option value="DESPOJO">DESPOJO</option>
                      <option value="DELITOS CONTRA LA RIQUEZA FORESTAL">DELITOS CONTRA LA RIQUEZA FORESTAL</option>
                      <option value="RAPTO">RAPTO</option>
                      <option value="USURPACIÓN DE FUNCIONES PÚBLICAS Y EN MATERIA DE SERVICIOS DE SEGURIDAD PRIVADA Y USO INDEBIDO DE UNIFORMES, CONDECORACIONES Y ADITAMENTOS PROPIOS DE FUNCIONES POLICIALES">USURPACIÓN DE FUNCIONES PÚBLICAS Y EN MATERIA DE SERVICIOS DE SEGURIDAD PRIVADA Y USO INDEBIDO DE UNIFORMES, CONDECORACIONES Y ADITAMENTOS PROPIOS DE FUNCIONES POLICIALES</option>
                      <option value="SECUESTRO GENÉRICO">SECUESTRO GENÉRICO</option>
                      <option value="SECUESTRO OTRO TIPO">SECUESTRO OTRO TIPO</option>
                      <option value="SECUESTRO CON CALIDAD DE REHÉN">SECUESTRO CON CALIDAD DE REHÉN</option>
                      <option value="SECUESTRO PARA CAUSAR DAÑO">SECUESTRO PARA CAUSAR DAÑO</option>
                      <option value="SECUESTRO EXPRÉS (POR EXTORSIÓN Y ROBO)">SECUESTRO EXPRÉS (POR EXTORSIÓN Y ROBO)</option>
                      <option value="COHECHO">COHECHO</option>
                      <option value="ABUSO SEXUAL">ABUSO SEXUAL</option>
                      <option value="FALSIFICACIÓN DE DOCUMENTOS Y USO DE DOCUMENTOS FALSOS">FALSIFICACIÓN DE DOCUMENTOS Y USO DE DOCUMENTOS FALSOS</option>
                      <option value="DISTRACCIÓN DE RECURSOS PÚBLICOS">DISTRACCIÓN DE RECURSOS PÚBLICOS</option>
                      <option value="VIOLACIÓN DE CORRESPONDENCIA">VIOLACIÓN DE CORRESPONDENCIA</option>
                      <option value="USO ILÍCITO DE ATRIBUCIONES Y FACULTADES RELACIONADO CON PARTICULARES">USO ILÍCITO DE ATRIBUCIONES Y FACULTADES RELACIONADO CON PARTICULARES</option>
                      <option value="DIFAMACION (DEROGADO)">DIFAMACION (DEROGADO)</option>
                      <option value="INFIDELIDAD DE LA CUSTODIA DE DOCUMENTOS Y VIOLACIÓN DE SECRETOS">INFIDELIDAD DE LA CUSTODIA DE DOCUMENTOS Y VIOLACIÓN DE SECRETOS</option>
                      <option value="EMBARAZO NO DESEADO A TRAVÉS DE MEDIOS CLÍNICOS, ESTERILIDAD PROVOCADA Y DISPOSICIÓN DE ÓVULOS O ESPERMAS SIN CONSENTIMIENTO">EMBARAZO NO DESEADO A TRAVÉS DE MEDIOS CLÍNICOS, ESTERILIDAD PROVOCADA Y DISPOSICIÓN DE ÓVULOS O ESPERMAS SIN CONSENTIMIENTO</option>
                      <option value="USURA">USURA</option>
                      <option value="PANDILLA">PANDILLA</option>
                      <option value="DESOBEDIENCIA Y RESISTENCIA DE PARTICULARES">DESOBEDIENCIA Y RESISTENCIA DE PARTICULARES</option>
                      <option value="INCESTO">INCESTO</option>
                      <option value="CORRUPCIÓN DE MENORES">CORRUPCIÓN DE MENORES</option>
                      <option value="IMPUTACIÓN DE HECHOS FALSOS Y SIMULACIÓN DE PRUEBAS">IMPUTACIÓN DE HECHOS FALSOS Y SIMULACIÓN DE PRUEBAS</option>
                      <option value="USO INDEBIDO DE LOS SISTEMAS DE EMERGENCIA">USO INDEBIDO DE LOS SISTEMAS DE EMERGENCIA</option>
                      <option value="CONCUSIÓN">CONCUSIÓN</option>
                      <option value="FALSEDAD ANTE LA AUTORIDAD">FALSEDAD ANTE LA AUTORIDAD</option>
                      <option value="ENRIQUECIMIENTO ILÍCITO">ENRIQUECIMIENTO ILÍCITO</option>
                      <option value="NARCOMENUDEO POR POSESION SIMPLE">NARCOMENUDEO POR POSESION SIMPLE</option>
                      <option value="NARCOMENUDEO NO ESPECIFICADO">NARCOMENUDEO NO ESPECIFICADO</option>
                      <option value="NARCOMENUDEO POR SUMINISTRO">NARCOMENUDEO POR SUMINISTRO</option>
                      <option value="NARCOMENUDEO OTROS DELITOS CONTRA LA SALUD RELACIONADOS CON NARCOTICOS">NARCOMENUDEO OTROS DELITOS CONTRA LA SALUD RELACIONADOS CON NARCOTICOS</option>
                      <option value="NARCOMENUDEO POR COMERCIO">NARCOMENUDEO POR COMERCIO</option>
                      <option value="APROVECHAMIENTO SEXUAL">APROVECHAMIENTO SEXUAL</option>
                      <option value="ADMINISTRACIÓN FRAUDULENTA">ADMINISTRACIÓN FRAUDULENTA</option>
                      <option value="USURPACIÓN DE IDENTIDAD">USURPACIÓN DE IDENTIDAD</option>
                      <option value="DELITOS CONTRA EL COMERCIO, LA INDUSTRIA, LA AGRICULTURA Y LA ESTABILIDAD ECONÓMICA">DELITOS CONTRA EL COMERCIO, LA INDUSTRIA, LA AGRICULTURA Y LA ESTABILIDAD ECONÓMICA</option>
                      <option value="DELITOS COMETIDOS POR LOS FRACCIONADORES">DELITOS COMETIDOS POR LOS FRACCIONADORES</option>
                      <option value="ESTUPRO">ESTUPRO</option>
                      <option value="CONSPIRACIÓN">CONSPIRACIÓN</option>
                      <option value="PRIVACIÓN ILEGAL DE LA LIBERTAD">PRIVACIÓN ILEGAL DE LA LIBERTAD</option>
                      <option value="QUEBRANTAMIENTOS DE SELLOS">QUEBRANTAMIENTOS DE SELLOS</option>
                      <option value="ABUSO DE CONFIANZA">ABUSO DE CONFIANZA</option>
                      <option value="APROVECHAMIENTO INDEBIDO DE BIENES EJIDALES O COMUNALES">APROVECHAMIENTO INDEBIDO DE BIENES EJIDALES O COMUNALES</option>
                      <option value="ULTRAJES A LA MORAL">ULTRAJES A LA MORAL</option>
                      <option value="LO QUE RESULTE DE LA MUERTE">LO QUE RESULTE DE LA MUERTE</option>
                      <option value="HECHOS POSIBLEMENTE CONSTITUTIVOS DEL DELITO">HECHOS POSIBLEMENTE CONSTITUTIVOS DEL DELITO</option>
                      <option value="ULTRAJES A LA AUTORIDAD">ULTRAJES A LA AUTORIDAD</option>
                      <option value="SUSTRACCIÓN DE MENORES E INCAPACES">SUSTRACCIÓN DE MENORES E INCAPACES</option>
                      <option value="FRAUDE">FRAUDE</option>
                      <option value="FRAUDE PROCESAL">FRAUDE PROCESAL</option>
                      <option value="FALSIFICACIÓN Y USO INDEBIDO DE SELLOS, MARCAS, LLAVES, CONTRASEÑAS Y OTROS OBJETOS">FALSIFICACIÓN Y USO INDEBIDO DE SELLOS, MARCAS, LLAVES, CONTRASEÑAS Y OTROS OBJETOS</option>
                      <option value="OMISIÓN DE AUXILIO">OMISIÓN DE AUXILIO</option>
                      <option value="MOTÍN">MOTÍN</option>
                      <option value="DELITOS DE ABOGADOS, DEFENSORES Y LITIGANTES">DELITOS DE ABOGADOS, DEFENSORES Y LITIGANTES</option>
                      <option value="DELITOS COMETIDOS EN MATERIA DE PROTECCIÓN CIVIL">DELITOS COMETIDOS EN MATERIA DE PROTECCIÓN CIVIL</option>
                      <option value="DELITOS CONTRA LA FILIACIÓN Y EL ESTADO FAMILIAR DE LAS PERSONAS">DELITOS CONTRA LA FILIACIÓN Y EL ESTADO FAMILIAR DE LAS PERSONAS</option>
                      <option value="VIOLACIÓN SIMPLE">VIOLACIÓN SIMPLE</option>
                      <option value="VIOLACIÓN EQUIPARADA">VIOLACIÓN EQUIPARADA</option>
                      <option value="LENOCINIO">LENOCINIO</option>
                      <option value="DESAPARICIÓN FORZADA DE PERSONAS">DESAPARICIÓN FORZADA DE PERSONAS</option>
                    </select>
                  </div>

                  {/* Hora del suceso */}
                  <span>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="row mb-3 align-items-center">
                    <div className="col">
                      <small>Hora del suceso:</small>
                    </div>
                    <div className="col">
                      <input required onChange={this.handlerOnChange} type="time" className="form-control" placeholder="Hora del suceso" id="timeHoraSuceso" name="timeHoraSuceso" value={this.state.timeHoraSuceso} ref={timeHoraSuceso=>this.inputTimeHoraSuceso = timeHoraSuceso}/>
                    </div>
                  </div>

                  {/* fecha del suceso */}
                  <span>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="row mb-3 align-items-center">
                    <div className="col">
                      <small>Fecha del suceso:</small>
                    </div>
                    <div className="col">
                      <input required onChange={this.handlerOnChange} type="date" id="dateFSuceso" className="form-control" placeholder="Fecha del suceso" name="dateFSuceso" value={this.state.dateFSuceso} ref={dateFSuceso=>this.inputDateFSuceso = dateFSuceso} />
                    </div>
                  </div>
                  
                  {/* Calle */}
                  <span>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <input required onChange={this.handlerOnChange} id="txtCalle" name="txtCalle" value={this.state.txtCalle} type="text" className="form-control" placeholder="Calle" ref={txtCalle=>this.inputTxtCalle = txtCalle} />
                  </div>
                  
                  {/* Numero Interior */}
                  <div className="form-group mb-3">
                    <input onChange={this.handlerOnChange} onInput={this.maxLengthCheck} id="txtNumInt" name="txtNumInt" value={this.state.txtNumInt} type="number" maxLength="5" className="form-control" placeholder="Numero interior" ref={txtNumInt=>this.inputTxtNumInt = txtNumInt}/>
                  </div>

                  {/* numero exterior */}
                  <span>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <input required onChange={this.handlerOnChange} onInput={this.maxLengthCheck} id="txtNumExt" name="txtNumExt" value={this.state.txtNumExt} maxLength="5" type="number" className="form-control" placeholder="Numero exterior" ref={txtNumExt=>this.inputTxtNumExt = txtNumExt} />
                  </div>
                  
                  {/* Entre calle 1 */}
                  <span>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <input required onChange={this.handlerOnChange} id="txtEntCalle1" name="txtEntCalle1" value={this.state.txtEntCalle1} type="text" className="form-control" placeholder="Entre calle 1" ref={txtEntCalle1=>this.inputTxtEntCalle1 = txtEntCalle1} />
                  </div>

                  {/* Entre calle 2 */}
                  <div className="form-group mb-3">
                    <input onChange={this.handlerOnChange} id="txtEntCalle2" name="txtEntCalle2" value={this.state.txtEntCalle2} type="text" className="form-control" placeholder="Entre calle 2"  ref={(txtEntCalle2) => (this.inputTxtEntCalle2 = txtEntCalle2) }/>
                  </div>

                  {/* Referencias */}
                  <span>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <input required onChange={this.handlerOnChange} id="txtReferencias" name="txtReferencias" value={this.state.txtReferencias} type="text" className="form-control" placeholder="Referencias" ref={(txtReferencias) => (this.inputTxtReferencias = txtReferencias)} />
                  </div>
                </div>

                {/* Lado derecho */}
                <div className="col-md-6">
                  {/* Pais */}
                  <span>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <select required onChange={this.handlerOnChange} className="form-select" id="selPais"  name="selPais" value={this.state.selPais} ref={(selPais) => (this.inputSelPais = selPais)} aria-label="pais" >
                      <option value="defaultPais">Pais</option>
                      <option value="AF">Afganistán</option>
                      <option value="AL">Albania</option>
                      <option value="DE">Alemania</option>
                      <option value="AD">Andorra</option>
                      <option value="AO">Angola</option>
                      <option value="AI">Anguilla</option>
                      <option value="AQ">Antártida</option>
                      <option value="AG">Antigua y Barbuda</option>
                      <option value="AN">Antillas Holandesas</option>
                      <option value="SA">Arabia Saudí</option>
                      <option value="DZ">Argelia</option>
                      <option value="AR">Argentina</option>
                      <option value="AM">Armenia</option>
                      <option value="AW">Aruba</option>
                      <option value="AU">Australia</option>
                      <option value="AT">Austria</option>
                      <option value="AZ">Azerbaiyán</option>
                      <option value="BS">Bahamas</option>
                      <option value="BH">Bahrein</option>
                      <option value="BD">Bangladesh</option>
                      <option value="BB">Barbados</option>
                      <option value="BE">Bélgica</option>
                      <option value="BZ">Belice</option>
                      <option value="BJ">Benin</option>
                      <option value="BM">Bermudas</option>
                      <option value="BY">Bielorrusia</option>
                      <option value="MM">Birmania</option>
                      <option value="BO">Bolivia</option>
                      <option value="BA">Bosnia y Herzegovina</option>
                      <option value="BW">Botswana</option>
                      <option value="BR">Brasil</option>
                      <option value="BN">Brunei</option>
                      <option value="BG">Bulgaria</option>
                      <option value="BF">Burkina Faso</option>
                      <option value="BI">Burundi</option>
                      <option value="BT">Bután</option>
                      <option value="CV">Cabo Verde</option>
                      <option value="KH">Camboya</option>
                      <option value="CM">Camerún</option>
                      <option value="CA">Canadá</option>
                      <option value="TD">Chad</option>
                      <option value="CL">Chile</option>
                      <option value="CN">China</option>
                      <option value="CY">Chipre</option>
                      <option value="VA">
                        Ciudad del Vaticano (Santa Sede)
                      </option>
                      <option value="CO">Colombia</option>
                      <option value="KM">Comores</option>
                      <option value="CG">Congo</option>
                      <option value="CD">
                        Congo, República Democrática del
                      </option>
                      <option value="KR">Corea</option>
                      <option value="KP">Corea del Norte</option>
                      <option value="CI">Costa de Marfíl</option>
                      <option value="CR">Costa Rica</option>
                      <option value="HR">Croacia (Hrvatska)</option>
                      <option value="CU">Cuba</option>
                      <option value="DK">Dinamarca</option>
                      <option value="DJ">Djibouti</option>
                      <option value="DM">Dominica</option>
                      <option value="EC">Ecuador</option>
                      <option value="EG">Egipto</option>
                      <option value="SV">El Salvador</option>
                      <option value="AE">Emiratos Árabes Unidos</option>
                      <option value="ER">Eritrea</option>
                      <option value="SI">Eslovenia</option>
                      <option value="ES">España</option>
                      <option value="US">Estados Unidos</option>
                      <option value="EE">Estonia</option>
                      <option value="ET">Etiopía</option>
                      <option value="FJ">Fiji</option>
                      <option value="PH">Filipinas</option>
                      <option value="FI">Finlandia</option>
                      <option value="FR">Francia</option>
                      <option value="GA">Gabón</option>
                      <option value="GM">Gambia</option>
                      <option value="GE">Georgia</option>
                      <option value="GH">Ghana</option>
                      <option value="GI">Gibraltar</option>
                      <option value="GD">Granada</option>
                      <option value="GR">Grecia</option>
                      <option value="GL">Groenlandia</option>
                      <option value="GP">Guadalupe</option>
                      <option value="GU">Guam</option>
                      <option value="GT">Guatemala</option>
                      <option value="GY">Guayana</option>
                      <option value="GF">Guayana Francesa</option>
                      <option value="GN">Guinea</option>
                      <option value="GQ">Guinea Ecuatorial</option>
                      <option value="GW">Guinea-Bissau</option>
                      <option value="HT">Haití</option>
                      <option value="HN">Honduras</option>
                      <option value="HU">Hungría</option>
                      <option value="IN">India</option>
                      <option value="ID">Indonesia</option>
                      <option value="IQ">Irak</option>
                      <option value="IR">Irán</option>
                      <option value="IE">Irlanda</option>
                      <option value="BV">Isla Bouvet</option>
                      <option value="CX">Isla de Christmas</option>
                      <option value="IS">Islandia</option>
                      <option value="KY">Islas Caimán</option>
                      <option value="CK">Islas Cook</option>
                      <option value="CC">Islas de Cocos o Keeling</option>
                      <option value="FO">Islas Faroe</option>
                      <option value="HM">Islas Heard y McDonald</option>
                      <option value="FK">Islas Malvinas</option>
                      <option value="MP">Islas Marianas del Norte</option>
                      <option value="MH">Islas Marshall</option>
                      <option value="UM">
                        Islas menores de Estados Unidos
                      </option>
                      <option value="PW">Islas Palau</option>
                      <option value="SB">Islas Salomón</option>
                      <option value="SJ">Islas Svalbard y Jan Mayen</option>
                      <option value="TK">Islas Tokelau</option>
                      <option value="TC">Islas Turks y Caicos</option>
                      <option value="VI">Islas Vírgenes (EEUU)</option>
                      <option value="VG">Islas Vírgenes (Reino Unido)</option>
                      <option value="WF">Islas Wallis y Futuna</option>
                      <option value="IL">Israel</option>
                      <option value="IT">Italia</option>
                      <option value="JM">Jamaica</option>
                      <option value="JP">Japón</option>
                      <option value="JO">Jordania</option>
                      <option value="KZ">Kazajistán</option>
                      <option value="KE">Kenia</option>
                      <option value="KG">Kirguizistán</option>
                      <option value="KI">Kiribati</option>
                      <option value="KW">Kuwait</option>
                      <option value="LA">Laos</option>
                      <option value="LS">Lesotho</option>
                      <option value="LV">Letonia</option>
                      <option value="LB">Líbano</option>
                      <option value="LR">Liberia</option>
                      <option value="LY">Libia</option>
                      <option value="LI">Liechtenstein</option>
                      <option value="LT">Lituania</option>
                      <option value="LU">Luxemburgo</option>
                      <option value="MK">Macedonia, Ex-República Yugoslava de</option>
                      <option value="MG">Madagascar</option>
                      <option value="MY">Malasia</option>
                      <option value="MW">Malawi</option>
                      <option value="MV">Maldivas</option>
                      <option value="ML">Malí</option>
                      <option value="MT">Malta</option>
                      <option value="MA">Marruecos</option>
                      <option value="MQ">Martinica</option>
                      <option value="MU">Mauricio</option>
                      <option value="MR">Mauritania</option>
                      <option value="YT">Mayotte</option>
                      <option value="MX">México</option>
                      <option value="FM">Micronesia</option>
                      <option value="MD">Moldavia</option>
                      <option value="MC">Mónaco</option>
                      <option value="MN">Mongolia</option>
                      <option value="MS">Montserrat</option>
                      <option value="MZ">Mozambique</option>
                      <option value="NA">Namibia</option>
                      <option value="NR">Nauru</option>
                      <option value="NP">Nepal</option>
                      <option value="NI">Nicaragua</option>
                      <option value="NE">Níger</option>
                      <option value="NG">Nigeria</option>
                      <option value="NU">Niue</option>
                      <option value="NF">Norfolk</option>
                      <option value="NO">Noruega</option>
                      <option value="NC">Nueva Caledonia</option>
                      <option value="NZ">Nueva Zelanda</option>
                      <option value="OM">Omán</option>
                      <option value="NL">Países Bajos</option>
                      <option value="PA">Panamá</option>
                      <option value="PG">Papúa Nueva Guinea</option>
                      <option value="PK">Paquistán</option>
                      <option value="PY">Paraguay</option>
                      <option value="PE">Perú</option>
                      <option value="PN">Pitcairn</option>
                      <option value="PF">Polinesia Francesa</option>
                      <option value="PL">Polonia</option>
                      <option value="PT">Portugal</option>
                      <option value="PR">Puerto Rico</option>
                      <option value="QA">Qatar</option>
                      <option value="UK">Reino Unido</option>
                      <option value="CF">República Centroafricana</option>
                      <option value="CZ">República Checa</option>
                      <option value="ZA">República de Sudáfrica</option>
                      <option value="DO">República Dominicana</option>
                      <option value="SK">República Eslovaca</option>
                      <option value="RE">Reunión</option>
                      <option value="RW">Ruanda</option>
                      <option value="RO">Rumania</option>
                      <option value="RU">Rusia</option>
                      <option value="EH">Sahara Occidental</option>
                      <option value="KN">Saint Kitts y Nevis</option>
                      <option value="WS">Samoa</option>
                      <option value="AS">Samoa Americana</option>
                      <option value="SM">San Marino</option>
                      <option value="VC">San Vicente y Granadinas</option>
                      <option value="SH">Santa Helena</option>
                      <option value="LC">Santa Lucía</option>
                      <option value="ST">Santo Tomé y Príncipe</option>
                      <option value="SN">Senegal</option>
                      <option value="SC">Seychelles</option>
                      <option value="SL">Sierra Leona</option>
                      <option value="SG">Singapur</option>
                      <option value="SY">Siria</option>
                      <option value="SO">Somalia</option>
                      <option value="LK">Sri Lanka</option>
                      <option value="PM">St Pierre y Miquelon</option>
                      <option value="SZ">Suazilandia</option>
                      <option value="SD">Sudán</option>
                      <option value="SE">Suecia</option>
                      <option value="CH">Suiza</option>
                      <option value="SR">Surinam</option>
                      <option value="TH">Tailandia</option>
                      <option value="TW">Taiwán</option>
                      <option value="TZ">Tanzania</option>
                      <option value="TJ">Tayikistán</option>
                      <option value="TF">Territorios franceses del Sur</option>
                      <option value="TP">Timor Oriental</option>
                      <option value="TG">Togo</option>
                      <option value="TO">Tonga</option>
                      <option value="TT">Trinidad y Tobago</option>
                      <option value="TN">Túnez</option>
                      <option value="TM">Turkmenistán</option>
                      <option value="TR">Turquía</option>
                      <option value="TV">Tuvalu</option>
                      <option value="UA">Ucrania</option>
                      <option value="UG">Uganda</option>
                      <option value="UY">Uruguay</option>
                      <option value="UZ">Uzbekistán</option>
                      <option value="VU">Vanuatu</option>
                      <option value="VE">Venezuela</option>
                      <option value="VN">Vietnam</option>
                      <option value="YE">Yemen</option>
                      <option value="YU">Yugoslavia</option>
                      <option value="ZM">Zambia</option>
                      <option value="ZW">Zimbabue</option>
                    </select>
                  </div>

                  {/* Estado */}
                  <span>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <select required onChange={this.handlerOnChange} className="form-select" id="selEstado" name="selEstado" value={this.state.selEstado} ref={(selEstado) => (this.inputSelEstado = selEstado)} aria-label="estado" >
                      <option value="defaultEstado">Estado</option>
                      <option value="Aguascalientes">Aguascalientes</option>
                      <option value="Baja California">Baja California</option>
                      <option value="Baja California Sur">Baja California Sur</option>
                      <option value="Campeche">Campeche</option>
                      <option value="Chiapas">Chiapas</option>
                      <option value="Chihuahua">Chihuahua</option>
                      <option value="Ciudad de México">Ciudad de México</option>
                      <option value="Coahuila de Zaragoza">Coahuila de Zaragoza</option>
                      <option value="Colima">Colima</option>
                      <option value="Durango">Durango</option>
                      <option value="Estado de México">Estado de México</option>
                      <option value="Guanajuato">Guanajuato</option>
                      <option value="Guerrero">Guerrero</option>
                      <option value="Hidalgo">Hidalgo</option>
                      <option value="Jalisco">Jalisco</option>
                      <option value="Michoacán">Michoacán</option>
                      <option value="Morelos">Morelos</option>
                      <option value="Nayarit">Nayarit</option>
                      <option value="Nuevo León">Nuevo León</option>
                      <option value="Oaxaca">Oaxaca</option>
                      <option value="Puebla">Puebla</option>
                      <option value="Querétaro">Querétaro</option>
                      <option value="Quintana Roo">Quintana Roo</option>
                      <option value="San Luis Potosí">San Luis Potosí</option>
                      <option value="Sinaloa">Sinaloa</option>
                      <option value="Sonora">Sonora</option>
                      <option value="Tabasco">Tabasco</option>
                      <option value="Tamaulipas">Tamaulipas</option>
                      <option value="Tlaxcala">Tlaxcala</option>
                      <option value="Veracruz">Veracruz</option>
                      <option value="Yucatán">Yucatán</option>
                      <option value="Zacatecas">Zacatecas</option>
                    </select>
                  </div>

                  {/* Municipio */}
                  <span>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <select required onChange={this.handlerOnChange} className="form-select" id="selMunicipio" name="selMunicipio" value={this.state.selMunicipio} ref={(selMunicipio) => (this.inputSelMunicipio = selMunicipio) } aria-label="municipio" >
                      <option value="defaultMunicipio">Municipio</option>
                      <option value="Opcion 1">Opcion 1</option>
                    </select>
                  </div>
                  
                  {/* Numero Localidad */}
                  <span>
                      <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <select required onChange={this.handlerOnChange} className="form-select" id="selLocalidad" name="selLocalidad" ref={(selLocalidad) => (this.inputSelLocalidad = selLocalidad)} aria-label="municipio">
                      <option value="defaultLocalidad">Localidad</option>
                      <option value="Opcion 1">Opcion 1</option>
                    </select>
                  </div>
                  {/* Codigo postal */}
                  <span>
                    <small className="text-danger">* Requerido</small>
                  </span>
                  <div className="form-group mb-3">
                    <input required onChange={this.handlerOnChange} id="txtCodPostal" type="text" className="form-control" placeholder="Codigo Postal" name="txtCodPostal" value={this.state.txtCodPostal} ref={(txtCodPostal) => (this.inputTxtCodPostal = txtCodPostal)}/>
                  </div>
                
                  {/* Agencia para cita */}
                  <small>Agencia a visitar*:</small>
                  <div className="form-group mb-3 align-items-center">
                      <select required onChange={this.handlerOnChange} className="form-select" id="selAgenciaAVisitar" name="selAgenciaAVisitar" value={this.state.selAgenciaAVisitar} ref={(selAgenciaAVisitar) => (this.inputSelAgenciaAVisitar = selAgenciaAVisitar) } aria-label="agencia a visitar" >
                        <option value="">Seleccione</option>
                        <option value="CESIS Pachuca">CESIS Pachuca</option>
                        <option value="CESIS Tula">CESIS Tula</option>
                        <option value="CESIS Tulancingo">CESIS Tulancingo</option>
                        <option value="CESIS Ixmiquilpan">CESIS Ixmiquilpan</option>
                      </select>
                 </div>

                  {/* fecha de visita */}
                  <div className="row mb-3 align-items-center">
                    <div className="col">
                      <small>Fecha para cita*:</small>
                    </div>
                    <div className="col">
                      <input required onChange={this.handlerOnChange} type="date" id="dateFechaCita" className="form-control" placeholder="fecha de la cita" name="dateFechaCita" value={this.state.dateFechaCita} ref={dateFechaCita=>this.inputDateFechaCita = dateFechaCita} aria-label="Fecha de cita"/>
                    </div>
                  </div>

                  {/* hora de visita */}
                  <div className="row mb-3 align-items-center">
                    <div className="col">
                      <small>Horario para cita*:</small>
                    </div>
                    <div className="col">
                      <select required onChange={this.handlerOnChange} className="form-select" id="selHorarioCita" name="selHorarioCita" value={this.state.selHorarioCita} ref={(selHorarioCita) => (this.inputSelHorarioCita = selHorarioCita) } aria-label="Horario de cita" >
                        <option value="">Seleccione</option>
                        <option value="Opcion 1">Opcion 1</option>
                        <option value="Opcion 1">Opcion 1</option>
                        <option value="Opcion 1">Opcion 1</option>
                        <option value="Opcion 1">Opcion 1</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                  <button className="btn btn-outline-dark" onClick={this.anterior.bind(this)} style={{marginTop: "10px"}}>ANTERIOR</button>
                  <button className="btn btn-dark" onClick={this.enviar.bind(this)} style={{marginTop: "10px"}}>FINALIZAR</button>
                </div>
              </div>
            </div>
          }

          {/* pantalla 4 - pantalla de finalizado*/}
          {(this.state.step === 4) && 
            <div className="container-fluid h-100 pt-5 px-3" style={{backgroundColor: "#f4f4f4"}}>
              <div className="row">
                <div className="col-md-12">
                  <div className="card mb-5">
                    <div className="card-body text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="mw-25 text-success" viewBox="0 0 20 20" fill="currentColor" style={{width: '150px'}}>
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <h5 className="card-title">Finalizado</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Registro de denuncia exitoso</h6>
                      <p className="card-text">
                        En la brevedad, recibirá una notificación por el medio seleccionado con su numero de cita y formato de solicitud de denuncia
                      </p>
                      <a className="btn btn-dark" onClick={this.recargar.bind(this)}>Registrar nueva denuncia</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </form>
      </div>
    )
  }
}