import React, { Component } from 'react';
import firebase from '../../firebase/firebaseConfig';
import axios from 'axios';
import https from 'https';


export default class Contact extends Component {

  constructor(props){

    super(props);    
    
    this.state = {
      step: 1,
      swAnonimo: false,
      raPersona: 'Fisica',
      txtRFC: '',
      txtRazonSocial: '',
      selClasPersona: 'Denunciante',
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
      txtNacionalidad: 'Mexicana',
      selEstadoCivil: '',
      selOcupacion: '',
      selNivelEstudios: '',
      selLengua: '',
      selReligion: '',
      swLGBT: false,
      selLGBT: '',
      swDiscapacidad: false,
      selDiscapacidad: '',
      txtDescHechos: '',
      timeHoraSuceso: '',
      dateFSuceso: '',
      txtCalle: '',
      txtNumInt: '',
      txtNumExt: '',
      txtEntCalle1: '',
      txtEntCalle2: '',
      txtReferencias: '',
      selPais: 'MX',
      selEstado: 'Hidalgo',
      selMunicipio: 'Pachuca de Soto',
      selLocalidad: '',
      txtCodPostal: '',
      txtLatitud: '',
      txtLongitud: '',
      selAgenciaAVisitar: '',
      selHorarioCita: '',
      dateFechaCita: '',
      minFechaNac: '',
      selectedDay: '',
      catalogoGenero: [],
      catalogoClasPersona: [],
      catalogoDocIdentificacion: [],
      catalogoNacionalidad: [],
      catalogoOcupacion: [],
      catalogoNivelEstudios: [],
      catalogoLengua: [],
      catalogoReligion: [],
      catalogoDiscapacidad: [],
      catalogoDelitos: [],
      catalogoDistritos: [],
      catalogoAgencias: [],
      catalogoEstado: [],
      catalogoMunicipio: [],
      catalogoLocalidad: [],
      base_ip: '187.237.240.68',
      puerto: 44360,
      file: []
    }
    this.reader = new FileReader();
  }

  // carga los elementos mencionados despues del DOM de react
  componentDidMount() {
    this.listarCatalogos();
    this.cargarHorariosDisponibles();
  }

  // devuelve los catalogos est??ticos desde la API
  listarCatalogos = () => {

    const agent = new https.Agent({  
      rejectUnauthorized: false
    }); 
        
    // catalogoClasPersona
    axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/ClasificacionPersonas/Listar', { httpsAgent: agent }).then(response => {
           
      this.setState({ catalogoClasPersona: response.data});

    }).catch(error => { 

      console.log(error);

    });
    
    // catalogoGenero
    axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/Generoes/Listar', { httpsAgent: agent }).then(response => {
           
      this.setState({ catalogoGenero: response.data});

    }).catch(error => { 

      console.log(error);

    });

    // catalogoDocIdentificacion
    axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/DocIdentificacions/Listar', { httpsAgent: agent }).then(response => {

      this.setState({ catalogoDocIdentificacion: response.data});

    }).catch(error => { 

      console.log(error);

    });

    // catalogoDocIdentificacion
    axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/DocIdentificacions/Listar', { httpsAgent: agent }).then(response => {

      this.setState({ catalogoDocIdentificacion: response.data});

    }).catch(error => { 

      console.log(error);

    });

    // catalogoNacionalidad
    axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/Nacionalidads/Listar', { httpsAgent: agent }).then(response => {

      this.setState({ catalogoNacionalidad: response.data});

    }).catch(error => { 

      console.log(error);

    });

    // catalogoOcupacion
    axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/Ocupacions/Listar', { httpsAgent: agent }).then(response => {

      this.setState({ catalogoOcupacion: response.data});

    }).catch(error => { 

      console.log(error);

    });

    // catalogoNivelEstudios
    axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/NivelEstudios/Listar', { httpsAgent: agent }).then(response => {

      this.setState({ catalogoNivelEstudios: response.data});

    }).catch(error => { 

      console.log(error);

    });

    // catalogoLengua
    axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/Lenguas/Listar', { httpsAgent: agent }).then(response => {

      this.setState({ catalogoLengua: response.data});

    }).catch(error => { 

      console.log(error);

    });

    // catalogoReligion
    axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/Religions/Listar', { httpsAgent: agent }).then(response => {

      this.setState({ catalogoReligion: response.data});

    }).catch(error => { 

      console.log(error);

    });

    // catalogoDiscapacidad
    axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/Discapacidads/Listar', { httpsAgent: agent }).then(response => {

      this.setState({ catalogoDiscapacidad: response.data});

    }).catch(error => { 

      console.log(error);

    });

    // catalogoDelito
    axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/Delitoes/Listar', { httpsAgent: agent }).then(response => {
      
      this.setState({ catalogoDelitos: response.data});



    }).catch(error => { 

      console.log(error);

    });

    // catalogoDistrito
    axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/Distritoes/Listar', { httpsAgent: agent }).then(response => {

      let distritos = [
        { distrito: response.data[12].nombre, id_distrito: response.data[12].idDistrito},
        { distrito: response.data[7].nombre, id_distrito: response.data[7].idDistrito},
        { distrito: response.data[17].nombre, id_distrito: response.data[17].idDistrito},
        { distrito: response.data[18].nombre, id_distrito: response.data[18].idDistrito},
      ];
      console.log(distritos);
      this.setState({ catalogoDistritos: distritos});

    }).catch(error => { 

      console.log(error);

    });

    // catalogoAgencias
    axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/Agencias/Listar', { httpsAgent: agent }).then(response => {
      console.log(response.data)
      let distritos = [
        
      ];
      console.log(distritos);
      this.setState({ catalogoDistritos: distritos});

    }).catch(error => { 

      console.log(error);

    });

    // catalogoEstado
    axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/Estadoes/Listar', { httpsAgent: agent }).then(response => {

      this.setState({ catalogoEstado: response.data});

    }).catch(error => { 

      console.log(error);

    });

    // catalogoMunicipio
    axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/Municipios/ListarPorEstado/' + 13, { httpsAgent: agent }).then(response => {

      let municipiosArray = response.data
      this.setState({ catalogoMunicipio: municipiosArray.sort((a, b) =>{
          return (a.nombre === b.nombre) ? 0 : ((a.nombre > b.nombre) ? 1 : -1 )
        }) 
      });

    }).catch(error => { 

      console.log(error);

    });

    // catalogoLocalidad
    axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/Localidads/MostrarPorMPO/' + 710, { httpsAgent: agent }).then(response => {

      let localidadesArray = response.data
      this.setState({ catalogoLocalidad: localidadesArray.sort((a, b) =>{
          return (a.nombre === b.nombre) ? 0 : ((a.nombre > b.nombre) ? 1 : -1 )
        }) 
      });

    }).catch(error => { 

      console.log(error);

    });

  }

  // lista catalogos de municipios de acuerdo al estado seleccionado
  cargarMunicipios = () => {
    
    if(this.state.selEstado){

      let consulta = (elemento) => elemento.nombre === this.state.selEstado;
      let estado_seleccionado = this.state.catalogoEstado.find(consulta);

      axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/Municipios/ListarPorEstado/' + estado_seleccionado.idEstado).then(response => {
           
        let municipiosArray = response.data
        this.setState({ catalogoMunicipio: municipiosArray.sort((a, b) =>{
            return (a.nombre === b.nombre) ? 0 : ((a.nombre > b.nombre) ? 1 : -1 )
          }) 
        });

      }).catch(error => { 

        console.log(error);

      });
    } 
  }

  // lista catalogos de localidades de acuerdo al municipio seleccionado
  cargarLocalidades = () => {

    const agent = new https.Agent({  
      rejectUnauthorized: false
    }); 
    
    if(this.state.selMunicipio){

      let consulta = (elemento) => elemento.nombre === this.state.selMunicipio;
      let municipio_seleccionado = this.state.catalogoMunicipio.find(consulta);

      axios.get('https://'+ this.state.base_ip + ':' + this.state.puerto + '/api/Localidads/MostrarPorMPO/' + municipio_seleccionado.idMunicipio, { httpsAgent: agent }).then(response => {
           
      let localidadesArray = response.data;  
      this.setState({ catalogoLocalidad: localidadesArray.sort((a, b) =>{
          return (a.nombre === b.nombre) ? 0 : ((a.nombre > b.nombre) ? 1 : -1 )
        }) 
      });

      }).catch(error => { 

        console.log(error);

      });
    } else {
      
      this.setState({ catalogoLocalidad: ''});
    }
  }

  cargarHorariosDisponibles = (fecha) => {

    let ip_address = '187.237.240.68';
    let puerto = 44394;
    let id_distrito = null;

    const agent = new https.Agent({  
      rejectUnauthorized: false
    });
    
    switch (this.state.selAgenciaAVisitar) {
      case 'pachuca':
        id_distrito = catalogoDistritos[0].nombre;
        break;

      case 'tula':
        id_distrito = catalogoDistritos[2].nombre;
        break;

      case 'tulancingo':
        id_distrito = catalogoDistritos[3].nombre;
        break;

      case 'ixmiquilpan':
        id_distrito = catalogoDistritos[1].nombre;
        break;
    
      default:
        id_distrito = '';
        break;
    }

    let datos_requeridos = {
       DistritoId: '',
				IdAgencia: '',
				fecha: new Date(fecha).toISOString()
    };

    // catalogoClasPersona
    // axios.post('https://'+ ip_address + ':' + puerto + '/api/PreHorariosDisponibles/Listarpordia', datos_requeridos, { httpsAgent: agent }).then(response => {
           
    //   this.setState({ catalogoClasPersona: response.data});

    // }).catch(error => { 

    //   console.log(error);

    // });
    
  }

  // funcion para deshabilitar cambios cuando se hace check en anonimo
  checkAnonimo(){
    this.setState({
      swAnonimo: !this.state.swAnonimo
    })

    this.setState({
      raPersona: 'Fisica'
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

    // llama a la funci??n para calcular con el valor guardado en el event
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
  
  // revisa que solamente se seleccione entre semana
  checarDiaSemana = (event) => {
    
    this.setState({ dateFechaCita: event.target.value }, () => {
      var fecha_seleccionada = new Date(this.state.dateFechaCita);
      var dia_fecha = fecha_seleccionada.getUTCDay();
      var mes, dia;

      if([6,0].includes(dia_fecha)){
        this.setState({ dateFechaCita: '' }, () => {
          alert('Citas disponibles solo en dias laborales');
        })
      } else {

        if(fecha_seleccionada.getMonth() < 10 ){
          mes = '0' + fecha_seleccionada.getMonth();
        } else {
          mes = fecha_seleccionada.getMonth()
        }

        if(fecha_seleccionada.getDate() < 10 ){
          dia = '0' + fecha_seleccionada.getDate();
        } else {
          dia = fecha_seleccionada.getDate()
        }
        
          this.setState({ 
            dateFechaCita: 
            fecha_seleccionada.getFullYear() + '-' + mes + '-' + dia }, () => {
          console.log('Fecha guardada: ' + this.state.dateFechaCita);
        })
      }
    });

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
      
      console.log('correo no autorizado: ' + this.state.emailCorreo);
      return false
    }
  }
  
  //Funci??n para enviar el formulario
  enviar(e) {
    e.preventDefault();
    var email_validate_response = this.validateEmail(); 

    if(email_validate_response !== true){
      alert('Por favor, ingrese un correo v??lido');
      
      if(this.state.swAnonimo === true){
        this.setState({
          step: 1,
        });
      } else {
        this.setState({
          step: 2,
        });
      }

    } else {
      
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
          dateFNacimiento : this.state.dateFNacimiento,
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
          txtDescHechos : this.state.txtDescHechos,
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
    
        if(
          parametrosAnonimo.selClasPersona &&
          parametrosAnonimo.txtNumEdad &&
          parametrosAnonimo.dateFNacimiento &&
          parametrosAnonimo.selSexo &&
          parametrosAnonimo.selNotificacion &&
          parametrosAnonimo.emailCorreo &&
          parametrosAnonimo.txtDescHechos &&
          parametrosAnonimo.timeHoraSuceso &&
          parametrosAnonimo.dateFSuceso &&
          parametrosAnonimo.txtCalle &&
          parametrosAnonimo.txtNumExt &&
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

            let datos_pre_denuncia = {
              DistritoId: '',
              PRegistroId: '',
              StatusAnonimo: true,
              TipoPersona: parametrosAnonimo.selClasPersona,
              RFC: parametrosAnonimo.txtRFC,
              RazonSocial: parametrosAnonimo.txtRazonSocial,
              Nombre: parametrosAnonimo.txtNombre,
              ApellidoPaterno: parametrosAnonimo.txtApPaterno,
              ApellidoMaterno: parametrosAnonimo.txtApMaterno,
              StatusAlias: parametrosAnonimo.txtAlias,
              FechaNacimiento: parametrosAnonimo.dateFNacimiento,
              EntidadFederativa: parametrosAnonimo.selEntidadFederativa,
              CURP: parametrosAnonimo.txtCurp,
              Sexo: parametrosAnonimo.selSexo,
              EstadoCivil: parametrosAnonimo.selEstadoCivil,
              Genero: parametrosAnonimo.selLGBT,
              Telefono1: parametrosAnonimo.txtnumTel1,
              Telefono2: parametrosAnonimo.txtnumTel2,
              Correo: parametrosAnonimo.emailCorreo,
              Medionotificacion: parametrosAnonimo.selNotificacion,
              Nacionalidad: parametrosAnonimo.txtNacionalidad,
              Ocupacion: parametrosAnonimo.selOcupacion,
              NivelEstudio: parametrosAnonimo.selNivelEstudios,
              Lengua: parametrosAnonimo.selLengua,
              Religion: parametrosAnonimo.selReligion,
              Discapacidad: parametrosAnonimo.swDiscapacidad,
              TipoDiscapacidad: parametrosAnonimo.selDiscapacidad,
              DatosProtegidos: true,
              Parentesco: '',
              Edad: parametrosAnonimo.txtNumEdad,
              Relacion: ' ',
              EstadoId: parametrosAnonimo.selEstado,
              MunicipioId: parametrosAnonimo.selMunicipio,
              LocalidadId: parametrosAnonimo.selLocalidad
            }




            // firebase.database().ref("pruebaCentAnonimo").push(parametrosAnonimo).then(()=>
            // {
            //   this.setState({
            //     step: 4,
            //   });
            // }).catch((e)=>
            // {
            //   console.log(e);
            //   alert("Faltan campos por llenar")
            // })
          }else{
            alert("Por favor llene su formulario")
            this.setState({
              step: 1,
            });
          }
        
      }

      // si s menor a 18 a??os, se convierten en parametros protegidos
      if(this.state.txtNumEdad < 18 && this.state.raPersona === "Fisica"){
        const parametrosProtegidos = {
          swAnonimo: true,
          raPersona: 'F??sica',
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
          txtDescHechos : this.state.txtDescHechos,
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
          parametrosProtegidos.txtDescHechos &&
          parametrosProtegidos.timeHoraSuceso &&
          parametrosProtegidos.dateFSuceso &&
          parametrosProtegidos.txtCalle &&
          parametrosProtegidos.txtNumExt &&
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
          } else {
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
          txtDescHechos: this.state.txtDescHechos,
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

        if(
          parametrosFisica.raPersona &&
          parametrosFisica.selClasPersona &&
          parametrosFisica.txtNombre &&
          parametrosFisica.txtApPaterno &&
          parametrosFisica.txtNumEdad &&
          parametrosFisica.selSexo &&
          parametrosFisica.selEntidadFederativa &&
          parametrosFisica.txtCurp &&
          parametrosFisica.selNotificacion &&
          parametrosFisica.txtnumTel1 &&
          parametrosFisica.emailCorreo &&
          parametrosFisica.txtNacionalidad &&
          parametrosFisica.selEstadoCivil &&
          parametrosFisica.selOcupacion &&
          parametrosFisica.selNivelEstudios &&
          parametrosFisica.txtDescHechos &&
          parametrosFisica.timeHoraSuceso &&
          parametrosFisica.dateFSuceso &&
          parametrosFisica.txtCalle &&
          parametrosFisica.txtNumExt &&
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
      if (this.state.raPersona === 'Moral' && this.state.swAnonimo === false && this.state.txtNumEdad >= 18){
      
        const parametrosMoral = {
          swAnonimo: false,
          raPersona: this.state.raPersona,
          txtRFC: this.state.txtRFC,
          txtRazonSocial: this.state.txtRazonSocial,
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
          txtDescHechos: this.state.txtDescHechos,
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
          parametrosMoral.txtNacionalidad &&
          parametrosMoral.selOcupacion &&
          parametrosMoral.selNivelEstudios &&
          parametrosMoral.txtDescHechos &&
          parametrosMoral.timeHoraSuceso &&
          parametrosMoral.dateFSuceso &&
          parametrosMoral.txtCalle &&
          parametrosMoral.txtNumExt &&
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

      if(this.state.raPersona === 'Moral' && this.state.swAnonimo === false && this.state.txtNumEdad < 18){
        alert('Solamente pueden registrarse personas mayores de edad bajo el r??gimen fiscal de persona moral');
      }
    }
  }

  handler_estado = (event) => {
    this.setState({ estado: event.target.value }, () => {
      this.setState({ 
        selMunicipio: '', 
        selLocalidad: '',
        catalogoLocalidad: '',
      }, () => {
        console.log("selmiunicipio: " + this.state.selMunicipio + " y selLocalidad: " + this.state.selLocalidad);
      })
    })
  }

  // Informaci??n del archivo subido cuando es cargado
  handlerOnChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state });

    this.cargarMunicipios();
    this.cargarLocalidades();
    this.cargarHorariosDisponibles();

  }

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
                  <small>Los campos marcados con * son obligatorios. Por favor, ll??nelos correctamente.</small>
                  <br/>
                  <small className="text-danger">Servicio disponible ??nicamente para CESIS Pachuca, Tula, Tulancingo e Ixmiquilpan</small>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  {/* Lado izquierdo Azul */}
                  <div className="form-group mb-3">
                    <label>
                      <input onChange={this.checkAnonimo.bind(this)} checked={this.state.swAnonimo === true} type="checkbox" id="swAnonimo" name="swAnonimo" value={this.state.swAnonimo} ref={swAnonimo=>this.inputSwAnonimo = swAnonimo}/>
                      <span>&nbsp;??Su denuncia es an??nima?</span>
                    </label>
                  </div>
                  
                  <div className="form-group mb-3">
                    <label>
                      <input onChange={this.checkF.bind(this)} disabled= {this.state.swAnonimo === true} type="checkbox" id="raPersona" name="raPersona" value={this.state.raPersona} ref={raPersona=>this.inputRaPersona = raPersona} 
                      checked={this.state.raPersona === "Fisica" ? true : false}/>
                      <span>&nbsp;F??sica &nbsp; &nbsp;</span>
                    </label>
                    <label>
                      <input onChange={this.checkM.bind(this)} disabled={this.state.swAnonimo === true} type="checkbox" id="raPersona" name="raPersona" value={this.state.raPersona} ref={raPersona=>this.inputRaPersona = raPersona}
                      checked={this.state.raPersona === "Moral" ? true : false}/>
                      <span>&nbsp;Moral</span>
                    </label>
                  </div>

                  <span>
                    <small className="text-secondary">Clasificacion de persona: *</small> 
                  </span>
                  <div className="form-group mb-3">
                    {/* Select Clasificacion de Persona*/}
                    <select onChange={this.handlerOnChange} className="form-select" id="selClasPersona" name="selClasPersona" value={this.state.selClasPersona} ref={selClasPersona=>this.inputSelClasPersona = selClasPersona}>
                    {
                      this.state.catalogoClasPersona ? 
                        this.state.catalogoClasPersona.map(datos => (
                            <option key={datos.idClasificacionPersona} value={datos.nombre}>{datos.nombre}</option>
                        )) : "Cargando..."
                    }
                    </select>
                  </div>                      

                  {/* RFC */}
                  <span hidden={this.state.raPersona === "Fisica" || this.state.swAnonimo === true}>
                    <small className="text-secondary">RFC: <small className="text-secondary" hidden={ this.state.raPersona === "Fisica" || this.state.swAnonimo === true }>*</small></small> 
                  </span>
                  <div className="form-group mb-3" hidden={this.state.raPersona === "Fisica" || this.state.swAnonimo === true}>
                    <input required={this.state.raPersona === "Moral" || this.state.swAnonimo === false} onChange={this.handlerOnChange} id="txtRFC" type="text" className="form-control w-100" name="txtRFC" value={(this.state.swAnonimo === true || this.state.raPersona === 'Fisica') ? " " : this.state.txtRFC} ref={txtRFC=>this.inputTxtRFC = txtRFC} />
                  </div>

                  {/* Razon social */}
                  <span hidden={this.state.raPersona === "Fisica" || this.state.swAnonimo === true}>
                    <small className="text-secondary">Razon Social: <small className="text-secondary" hidden={ this.state.raPersona === "Fisica" || this.state.swAnonimo === true }>*</small></small> 
                  </span>
                  <div className="form-group mb-3" hidden={this.state.raPersona === "Fisica" || this.state.swAnonimo === true}>
                    <input required={this.state.raPersona === "Moral" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.raPersona === "Fisica" || this.state.swAnonimo === true} id="txtRazonSocial" type="text" className="form-control w-100" name="txtRazonSocial" value={(this.state.swAnonimo === true || this.state.raPersona === 'Fisica') ? " " : this.state.txtRazonSocial} ref={txtRazonSocial=>this.inputTxtRazonSocial = txtRazonSocial} />
                  </div>

                  {/* Nombre */}
                  <span>
                    <small className="text-secondary">Nombre: <small className="text-secondary" hidden={ this.state.swAnonimo === true }>*</small></small> 
                  </span>
                  <div className="form-group mb-3">
                    <input required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.swAnonimo === true} id="txtNombre" type="text" className="form-control w-100" name="txtNombre" value={(this.state.swAnonimo === true) ? " " : this.state.txtNombre} ref={txtNombre=>this.inputTxtNombre = txtNombre} />
                  </div>

                  {/* Apellido parterno */}
                  <span>
                    <small className="text-secondary">Apellido Paterno: <small className="text-secondary" hidden={ this.state.swAnonimo === true }>*</small></small> 
                  </span>
                  <div className="form-group mb-3">
                    <input required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.swAnonimo === true} id="txtApPaterno" type="text" className="form-control w-100" name="txtApPaterno" value={this.state.swAnonimo === true ? " " : this.state.txtApPaterno} ref={txtApPaterno=>this.inputTxtApPaterno = txtApPaterno} />
                  </div>
                
                  {/* Apellido materno */}
                  <span>
                    <small className="text-secondary">Apellido Materno:</small> 
                  </span>
                  <div className="form-group mb-3">
                    <input required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.swAnonimo === true} id="txtApMaterno" type="text" className="form-control w-100" name="txtApMaterno" value={this.state.swAnonimo === true ? " " : this.state.txtApMaterno} ref={txtApMaterno=>this.inputTxtApMaterno = txtApMaterno} />
                  </div>

                  {/* Alias */}
                  <span>
                    <small className="text-secondary">Alias: </small> 
                  </span>
                  <div className="form-group mb-3">
                    <input onChange={this.handlerOnChange} disabled={this.state.swAnonimo === true} id="txtAlias" type="text" className="form-control w-100" name="txtAlias" value={this.state.swAnonimo === true ? " " : this.state.txtAlias} ref={txtAlias=>this.inputTxtAlias = txtAlias}/>
                  </div>

                  {/* Fecha de nacimiento */}
                  <div className="row mb-3 align-items-center">
                    <div className="col-md-6">
                      <span>
                        <small className="text-secondary">Fecha de Nacimiento: *</small> 
                        <br />
                        <small className="text-danger" hidden={this.state.raPersona === "Fisica" }>Solo mayores de edad</small> 
                      </span>
                    </div>
                    <div className="col-md-6">
                      <input onChange={this.handleChange_edad} type="date" id="dateFNacimiento" className="form-control w-100" name="dateFNacimiento" value={this.state.dateFNacimiento} ref={dateFNacimiento=>this.inputDateFNacimiento = dateFNacimiento} />
                    </div>
                  </div>

                  {/* Sexo */}
                  <span>
                    <small className="text-secondary">Sexo: *</small> 
                  </span>
                  <div className="form-group mb-3">
                    {/* Select Sexo*/}
                    <select required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} className="form-select" id="selSexo" name="selSexo" value={this.state.selSexo} ref={selSexo=>this.inputSelSexo = selSexo}>
                      <option value="">Seleccione...</option>
                      {
                        this.state.catalogoGenero ? 
                          this.state.catalogoGenero.map(datos => (
                              <option key={datos.idGenero} value={datos.nombre}>{datos.nombre}</option>
                          )) : "Cargando..."
                      }
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  {/* Lado derecho */}
                  {/* entidad de nacimiento */}
                  <span>
                    <small className="text-secondary">Entidad Federativa de Nacimiento: <small className="text-secondary" hidden={ this.state.swAnonimo === true || this.state.raPersona === "Moral"}>*</small></small> 
                  </span>
                  <div className="form-group mb-3">
                    <select required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.swAnonimo === true} className="form-select" id="selEntidadFederativa" name="selEntidadFederativa" value={this.state.selEntidadFederativa} ref={selEntidadFederativa=>this.inputSelEntidadFederativa = selEntidadFederativa}>
                    <option value="">Seleccione</option>
                    {
                      this.state.catalogoEstado ? 
                        this.state.catalogoEstado.map(datos => (
                            <option key={datos.idEstado} value={datos.nombre}>{datos.nombre}</option>
                        )) : "Cargando..."
                    }
                    </select>
                  </div>
                  
                  {/* select documento de identificaci??n */}
                  <span>
                    <small className="text-secondary">Documento de Identificaci??n: </small> 
                  </span>
                  <div className="form-group mb-3">
                    <select required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.swAnonimo === true} className="form-select" id="selIdentificacion" name="selIdentificacion" value={this.state.selIdentificacion} ref={selIdentificacion=>this.inputSelIdentificacion = selIdentificacion}>
                    <option value="">Seleccione</option>
                    {
                      this.state.catalogoDocIdentificacion ? 
                        this.state.catalogoDocIdentificacion.map(datos => (
                            <option key={datos.idDocIdentificacion} value={datos.nombre}>{datos.nombre}</option>
                        )) : "Cargando..."
                    }
                    </select>
                  </div>
                      
                  {/* documento de identificacion */}
                  <span>
                    <small className="text-secondary">Seleccione Documento de Identificaci??n: </small> 
                  </span>
                  <div className="form-group mb-3">
                    <input required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} type="file" accept="image/*" onChange={this.cargarDocumento.bind(this)} disabled={this.state.swAnonimo === true} className="form-control w-100" id="inputGroupFile02"/>
                  </div>

                  {/* CURP */}
                  <span>
                    <small className="text-secondary">CURP: <small className="text-secondary" hidden={ this.state.swAnonimo === true || this.state.raPersona === "Moral"}>*</small></small> 
                  </span>
                  <div className="form-group mb-3">
                    <input onChange={this.handlerOnChange} onInput={this.maxLengthCheck} maxLength="18" disabled={this.state.swAnonimo === true} id="txtCurp" type="text" className="form-control w-100" name="txtCurp" value={this.state.swAnonimo === true ? " " : this.state.txtCurp} ref={txtCurp=>this.inputTxtCurp = txtCurp} />
                  </div>

                  {/* Correo electronico */}
                  <span hidden={ this.state.swAnonimo === false} >
                    <small className="text-secondary">Correo electr??nico :*</small>
                  </span>
                  <div className="form-group mb-3" hidden={ this.state.swAnonimo === false}>
                    <input onChange={this.handlerOnChange} className="form-control w-100" id="emailCorreo" type="text" placeholder="ejemplo@ejemplo.com" name="emailCorreo" value={this.state.emailCorreo} ref={emailCorreo=>this.inputEmailCorreo = emailCorreo}/>
                  </div>        
                </div>                
              </div>
              
              <div className="row">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                  <button className="btn btn-dark fs-6" onClick={this.siguiente.bind(this)} style={{marginTop: "10px"}}>SIGUIENTE</button>
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
                  <small className="text-danger">Servicio ??nicamente disponible para CESIS Pachuca, Tula, Tulancingo e Ixmiquilpan</small>
              </div>
              <div className="row mb-5">
                {/* Lado izquierdo */}
                <div className="col-md-6">
                  <span>
                    <small className="text-secondary">Medio de notificacion: <small className="text-secondary" hidden={ this.state.swAnonimo === true }>*</small></small> 
                  </span>
                  <div className="form-group mb-3">
                    <select required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.swAnonimo === true} className="form-select" id="selNotificacion" name="selNotificacion" value={this.state.selNotificacion} ref={selNotificacion=>this.inputSelNotificacion = selNotificacion}>
                      <option value="">Seleccione...</option>
                      <option value="Correo Electronico">Correo Electronico</option>
                      <option value="Domicilio" disabled={this.state.swAnonimo === true}>Domicilio</option>
                      <option value="Telefono" disabled={this.state.swAnonimo === true}>Telefono</option>
                    </select>
                  </div>
                  
                  {/* telefono 1 */}
                  <span>
                    <small className="text-secondary">Telefono 1: <small className="text-secondary" hidden={ this.state.swAnonimo === true }>*</small></small> 
                  </span>
                  <div className="form-group mb-3">
                    <input onChange={this.handlerOnChange} onInput={this.maxLengthCheck} disabled={this.state.swAnonimo === true} maxLength="10" className="form-control w-100" id="txtnumTel1" type="number" name="txtnumTel1" value={this.state.swAnonimo === true ? " " : this.state.txtnumTel1} ref={txtnumTel1=>this.inputTxtnumTel1 = txtnumTel1}/>
                  </div>

                  {/* telefono 2 */}
                  <span>
                    <small className="text-secondary">Telefono 2: </small> 
                  </span>
                  <div className="form-group mb-3">
                    <input onChange={this.handlerOnChange} onInput={this.maxLengthCheck} disabled={this.state.swAnonimo === true} maxLength="10" className="form-control w-100" id="txtnumTel2" type="number" name="txtnumTel2" value={this.state.swAnonimo === true ? " " : this.state.txtnumTel2} ref={txtnumTel2=>this.inputTxtnumTel2 = txtnumTel2}/>
                  </div>

                  {/* Correo electronico */}
                  <span>
                    <small className="text-secondary">Correo electronico: <small className="text-secondary" hidden={ this.state.swAnonimo === true }>*</small></small> 
                  </span>
                  <div className="form-group mb-3">
                    <input onChange={this.handlerOnChange} className="form-control w-100" id="emailCorreo" type="text" name="emailCorreo" value={this.state.swAnonimo === true ? " " : this.state.emailCorreo} ref={emailCorreo=>this.inputEmailCorreo = emailCorreo}/>
                  </div>
                  
                  {/* nacionalidad */}                  
                  <span>
                    <small className="text-secondary">Nacionalidad: <small className="text-secondary" hidden={ this.state.swAnonimo === true }>*</small></small> 
                  </span>
                  <div className="form-group mb-3">
                    <select required={this.state.raPersona === "Moral"} onChange={this.handlerOnChange} disabled={this.state.swAnonimo === true} className="form-select" id="txtNacionalidad" type="text" name="txtNacionalidad" value={this.state.swAnonimo === true ? " " : this.state.txtNacionalidad} ref={txtNacionalidad=>this.inputTxtNacionalidad = txtNacionalidad}>
                    <option value="">Seleccione</option>
                    {
                      this.state.catalogoNacionalidad ? 
                        this.state.catalogoNacionalidad.map(datos => (
                            <option key={datos.idNacionalidad} value={datos.nombre}>{datos.nombre}</option>
                        )) : "Cargando..."
                    }
                    </select>
                  </div>
                  
                  {/* Estado civil */}
                  <span hidden={this.state.raPersona === "Moral" || this.state.swAnonimo === true}>
                    <small className="text-secondary">Estado Civil: <small className="text-secondary" hidden={ this.state.swAnonimo === true }>*</small></small> 
                  </span>
                  <div className="form-group mb-3" hidden={this.state.raPersona === "Moral" || this.state.swAnonimo === true}>
                    {/* Select Estado Civil*/}
                    <select required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} className="form-select" id="selEstadoCivil" name="selEstadoCivil" value={this.state.selEstadoCivil} ref={selEstadoCivil=>this.inputSelEstadoCivil = selEstadoCivil}>
                      <option value="" >Seleccione...</option>
                      <option value="Soltero">Soltero(a)</option>
                      <option value="Casado(a)">Casado(a)</option>
                      <option value="Divorciado(a)">Divorciado(a)</option>
                      <option value="Separaci??n en Proceso Judicial"> Separaci??n en Proceso Judicial </option>
                      <option value="Viudo(a)">Viudo(a)</option>
                      <option value="Concubinato">Concubinato</option>
                    </select>
                  </div>
                </div>

                {/* Lado derecho */}
                <div className="col-md-6">
                  {/* Ocupacion*/}
                  <span>
                    <small className="text-secondary">Ocupacion: <small className="text-secondary" hidden={ this.state.swAnonimo === true }>*</small></small>
                  </span>
                  <div className="form-group mb-3">
                    <select onChange={this.handlerOnChange} disabled={this.state.swAnonimo === true} className="form-select" id="selOcupacion" name="selOcupacion" value={this.state.selOcupacion} ref={selOcupacion=>this.inputSelOcupacion = selOcupacion}>
                    <option value="">Seleccione</option>
                    {
                      this.state.catalogoOcupacion ? 
                        this.state.catalogoOcupacion.map(datos => (
                            <option key={datos.idOcupacion} value={datos.nombre}>{datos.nombre}</option>
                        )) : "Cargando..."
                    }
                    </select>
                  </div>

                  {/* Nivel de estudios */}
                  <span>
                    <small className="text-secondary">Nivel de estudios: <small className="text-secondary" hidden={ this.state.swAnonimo === true }>*</small></small> 
                  </span>
                  <div className="form-group mb-3">
                    {/* Select Nivel de Estudios*/}
                    <select required={this.state.raPersona === "Fisica" || this.state.swAnonimo === false} onChange={this.handlerOnChange} disabled={this.state.swAnonimo === true} className="form-select" id="selNivelEstudios" name="selNivelEstudios" value={this.state.selNivelEstudios} ref={selNivelEstudios=>this.inputSelNivelEstudios = selNivelEstudios}>
                    <option value="">Seleccione</option>
                    {
                      this.state.catalogoNivelEstudios ? 
                        this.state.catalogoNivelEstudios.map(datos => (
                            <option key={datos.idNivelestudios} value={datos.nombre}>{datos.nombre}</option>
                        )) : "Cargando..."
                    }
                    </select>
                  </div>

                  {/* Lengua */}
                  <span hidden={this.state.raPersona === "Moral" || this.state.swAnonimo === true}>
                    <small className="text-secondary">Lengua: </small> 
                  </span>
                  <div className="form-group mb-3" hidden={this.state.raPersona === "Moral" || this.state.swAnonimo === true}>
                    <select onChange={this.handlerOnChange} disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} className="form-select" id="selLengua" name="selLengua" value={this.state.selLengua} ref={selLengua=>this.inputSelLengua = selLengua}>
                    <option value="">Seleccione</option>
                    {
                      this.state.catalogoLengua ? 
                        this.state.catalogoLengua.map(datos => (
                            <option key={datos.idLengua} value={datos.nombre}>{datos.nombre}</option>
                        )) : "Cargando..."
                    }
                    </select>
                  </div>

                  {/* Religion */}
                  <span hidden={this.state.raPersona === "Moral" || this.state.swAnonimo === true}>
                    <small className="text-secondary">Religion: </small> 
                  </span>
                  <div className="form-group mb-3" hidden={this.state.raPersona === "Moral" || this.state.swAnonimo === true}>
                    <select onChange={this.handlerOnChange} disabled={this.state.raPersona === "Moral" || this.state.swAnonimo === true} className="form-select" id="selReligion" name="selReligion" value={this.state.selReligion} ref={selReligion=>this.inputSelReligion = selReligion}>
                    <option value="">Seleccione</option>
                    {
                      this.state.catalogoReligion ? 
                        this.state.catalogoReligion.map(datos => (
                            <option key={datos.idReligion}  value={datos.nombre}>{datos.nombre}</option>
                        )) : "Cargando..."
                    }
                    </select>
                  </div>

                  {/* Checkbox LGBT */}
                  <div className="row mb-3 align-items-center" hidden={this.state.raPersona === "Moral" || this.state.swAnonimo === true}>
                    <div className="col-md-6">
                      <input type="checkbox" id="swLGBT" name="swLGBT" value={this.state.swLGBT} onChange={this.checkLGBT.bind(this)} 
                        checked={this.state.swLGBT === true} disabled={this.state.swAnonimo === true} 
                        ref={swLGBT=>this.inputSwLGBT = swLGBT}/>
                      <label className="form-label" onClick={this.checkLGBT.bind(this)} style={{fontSize: "14px"}}>&nbsp;??Pertenece a la comunidad LGBTTTQA?</label>
                    </div>
                    {/* Select LGBT*/}
                    <div className="col-md-6">
                      <select required={this.state.swLGBT === true} onChange={this.handlerOnChange} disabled={this.state.swLGBT === false} className="form-select" id="selLGBT" name="selLGBT" value={this.state.selLGBT} ref={selLGBT=>this.inputSelLGBT =selLGBT}>
                        <option value="" >Seleccione...</option>
                        <option value="Lesbiana">Lesbiana</option>
                        <option value="Gay">Gay</option>
                        <option value="Bisexual">Bisexual</option>
                        <option value="Transg??nero">Transg??nero</option>
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

                  {/* Checkbox Discapacidad*/}
                  <div className="row mb-3 align-items-center" hidden={this.state.raPersona === "Moral" || this.state.swAnonimo === true}>
                    <div className="col-md-6">
                      <input type="checkbox" id="swDiscapacidad" name="swDiscapacidad" onChange={this.checkDisc.bind(this)} checked={this.state.swDiscapacidad === true} value={this.state.swDiscapacidad} 
                        disabled={this.state.swAnonimo === true} ref={swDiscapacidad=>this.inputSwDiscapacidad = swDiscapacidad}/>
                      <label className="form-label" onClick={this.checkDisc.bind(this)} style={{fontSize: "14px"}}>&nbsp;??Tiene alguna discapacidad?</label>
                    </div>
                    {/* Select Discapacidad*/}
                    <div className="col-md-6">
                      <select required={this.state.swDiscapacidad === true} onChange={this.handlerOnChange} disabled={this.state.swDiscapacidad === false} className="form-select" id="selDiscapacidad" name="selDiscapacidad" value={this.state.selDiscapacidad} ref={selDiscapacidad=>this.inputSelDiscapacidad = selDiscapacidad}>
                      <option value="">Seleccione</option>+
                      {
                        this.state.catalogoDiscapacidad ? 
                          this.state.catalogoDiscapacidad.map(datos => (
                              <option key={datos.idDiscapacidad}  value={datos.nombre}>{datos.nombre}</option>
                          )) : "Cargando..."
                      }
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                  <button className="btn btn-outline-dark fs-6" onClick={this.anterior.bind(this)} style={{marginTop: "10px"}}>ANTERIOR</button>
                  <button className="btn btn-dark fs-6" onClick={this.siguiente.bind(this)} style={{marginTop: "10px"}}>SIGUIENTE</button>
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
                  <small className="text-danger">Servicio ??nicamente disponible para CESIS Pachuca, Tula, Tulancingo e Ixmiquilpan</small>
                </div>
              </div>
              <div className="row">
                {/* Lado izquierdo */}
                <div className="col-md-6">
                  
                  {/* Delito */}
                  <label>
                     <small> Descripcion de los hechos: *</small>
                  </label>
                  {/* <div className="form-group mb-3">
                    <textarea onChange={this.handlerOnChange} id="txtDescHechos" rows="3" className="form-control w-100" name="txtDescHechos" value={this.state.txtDescHechos} ref={txtDescHechos=>this.inputTxtDescHechos = txtDescHechos}></textarea>
                  </div> */}
                  {/* Select Discapacidad*/}
                  <div className="col-md-6">
                      <select required={this.state.txtDescHechos === true} onChange={this.handlerOnChange} className="form-select" id="selDiscapacidad" name="selDiscapacidad" value={this.state.txtDescHechos} ref={txtDescHechos=>this.inputTxtDescHechos = txtDescHechos}>
                      <option value="">Seleccione</option>+
                      {
                        this.state.catalogoDelitos ? 
                          this.state.catalogoDelitos.map(datos => (
                              <option key={datos.idDelito}  value={datos.idDelito}>{datos.nombre}</option>
                          )) : "Cargando..."
                      }
                      </select>
                    </div>

                  {/* fecha del suceso */}
                  <span>
                    <small className="text-secondary">Fecha del suceso: *</small> 
                  </span>
                  <div className="row mb-3 align-items-center">
                    <div className="col">
                      <input required onChange={this.handlerOnChange} type="date" id="dateFSuceso" className="form-control w-100" name="dateFSuceso" value={this.state.dateFSuceso} ref={dateFSuceso=>this.inputDateFSuceso = dateFSuceso} />
                    </div>
                  </div>

                  {/* Hora del suceso */}
                  <span>
                    <small className="text-secondary">Hora del suceso: *</small> 
                  </span>
                  <div className="row mb-3 align-items-center">
                    <div className="col">
                      <input required onChange={this.handlerOnChange} type="time" className="form-control w-100" id="timeHoraSuceso" name="timeHoraSuceso" value={this.state.timeHoraSuceso} ref={timeHoraSuceso=>this.inputTimeHoraSuceso = timeHoraSuceso}/>
                    </div>
                  </div>
                  
                  {/* Calle */}
                  <span>
                    <small className="text-secondary">Calle: *</small> 
                  </span>
                  <div className="form-group mb-3">
                    <input required onChange={this.handlerOnChange} id="txtCalle" name="txtCalle" value={this.state.txtCalle} type="text" className="form-control w-100" ref={txtCalle=>this.inputTxtCalle = txtCalle} />
                  </div>

                  {/* numero exterior */}
                  <span>
                    <small className="text-secondary">Numero exterior: *</small> 
                  </span>
                  <div className="form-group mb-3">
                    <input required onChange={this.handlerOnChange} id="txtNumExt" name="txtNumExt" value={this.state.txtNumExt} type="text" className="form-control w-100" ref={txtNumExt=>this.inputTxtNumExt = txtNumExt} />
                  </div>
                  
                  {/* Numero Interior */}
                  <span>
                    <small className="text-secondary">Numero interior: </small> 
                  </span>
                  <div className="form-group mb-3">
                    <input onChange={this.handlerOnChange} id="txtNumInt" name="txtNumInt" value={this.state.txtNumInt} type="text" className="form-control w-100" ref={txtNumInt=>this.inputTxtNumInt = txtNumInt}/>
                  </div>                
                  
                  {/* Entre calle 1 */}
                  <span>
                    <small className="text-secondary">Entre calle 1: </small> 
                  </span>
                  <div className="form-group mb-3">
                    <input required onChange={this.handlerOnChange} id="txtEntCalle1" name="txtEntCalle1" value={this.state.txtEntCalle1} type="text" className="form-control w-100" ref={txtEntCalle1=>this.inputTxtEntCalle1 = txtEntCalle1} />
                  </div>

                  {/* Entre calle 2 */}
                  <span>
                    <small className="text-secondary">Entre calle 2: </small> 
                  </span>
                  <div className="form-group mb-3">
                    <input onChange={this.handlerOnChange} id="txtEntCalle2" name="txtEntCalle2" value={this.state.txtEntCalle2} type="text" className="form-control w-100" ref={(txtEntCalle2) => (this.inputTxtEntCalle2 = txtEntCalle2) }/>
                  </div>

                  {/* Referencias */}
                  <span>
                    <small className="text-secondary">Referencias: </small> 
                  </span>
                  <div className="form-group mb-3">
                    <input required onChange={this.handlerOnChange} id="txtReferencias" name="txtReferencias" value={this.state.txtReferencias} type="text" className="form-control w-100" ref={(txtReferencias) => (this.inputTxtReferencias = txtReferencias)} />
                  </div>
                </div>

                {/* Lado derecho */}
                <div className="col-md-6">
                  {/* Pais */}
                  <span>
                    <small className="text-secondary">Pa??s: *</small> 
                  </span>
                  <div className="form-group mb-3">
                    <select required onChange={this.handlerOnChange} className="form-select" id="selPais" name="selPais" value={this.state.selPais} ref={(selPais) => (this.inputSelPais = selPais)} aria-label="pais" >
                      <option value="">Seleccione...</option>
                      <option value="AF">Afganist??n</option>
                      <option value="AL">Albania</option>
                      <option value="DE">Alemania</option>
                      <option value="AD">Andorra</option>
                      <option value="AO">Angola</option>
                      <option value="AI">Anguilla</option>
                      <option value="AQ">Ant??rtida</option>
                      <option value="AG">Antigua y Barbuda</option>
                      <option value="AN">Antillas Holandesas</option>
                      <option value="SA">Arabia Saud??</option>
                      <option value="DZ">Argelia</option>
                      <option value="AR">Argentina</option>
                      <option value="AM">Armenia</option>
                      <option value="AW">Aruba</option>
                      <option value="AU">Australia</option>
                      <option value="AT">Austria</option>
                      <option value="AZ">Azerbaiy??n</option>
                      <option value="BS">Bahamas</option>
                      <option value="BH">Bahrein</option>
                      <option value="BD">Bangladesh</option>
                      <option value="BB">Barbados</option>
                      <option value="BE">B??lgica</option>
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
                      <option value="BT">But??n</option>
                      <option value="CV">Cabo Verde</option>
                      <option value="KH">Camboya</option>
                      <option value="CM">Camer??n</option>
                      <option value="CA">Canad??</option>
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
                        Congo, Rep??blica Democr??tica del
                      </option>
                      <option value="KR">Corea</option>
                      <option value="KP">Corea del Norte</option>
                      <option value="CI">Costa de Marf??l</option>
                      <option value="CR">Costa Rica</option>
                      <option value="HR">Croacia (Hrvatska)</option>
                      <option value="CU">Cuba</option>
                      <option value="DK">Dinamarca</option>
                      <option value="DJ">Djibouti</option>
                      <option value="DM">Dominica</option>
                      <option value="EC">Ecuador</option>
                      <option value="EG">Egipto</option>
                      <option value="SV">El Salvador</option>
                      <option value="AE">Emiratos ??rabes Unidos</option>
                      <option value="ER">Eritrea</option>
                      <option value="SI">Eslovenia</option>
                      <option value="ES">Espa??a</option>
                      <option value="US">Estados Unidos</option>
                      <option value="EE">Estonia</option>
                      <option value="ET">Etiop??a</option>
                      <option value="FJ">Fiji</option>
                      <option value="PH">Filipinas</option>
                      <option value="FI">Finlandia</option>
                      <option value="FR">Francia</option>
                      <option value="GA">Gab??n</option>
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
                      <option value="HT">Hait??</option>
                      <option value="HN">Honduras</option>
                      <option value="HU">Hungr??a</option>
                      <option value="IN">India</option>
                      <option value="ID">Indonesia</option>
                      <option value="IQ">Irak</option>
                      <option value="IR">Ir??n</option>
                      <option value="IE">Irlanda</option>
                      <option value="BV">Isla Bouvet</option>
                      <option value="CX">Isla de Christmas</option>
                      <option value="IS">Islandia</option>
                      <option value="KY">Islas Caim??n</option>
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
                      <option value="SB">Islas Salom??n</option>
                      <option value="SJ">Islas Svalbard y Jan Mayen</option>
                      <option value="TK">Islas Tokelau</option>
                      <option value="TC">Islas Turks y Caicos</option>
                      <option value="VI">Islas V??rgenes (EEUU)</option>
                      <option value="VG">Islas V??rgenes (Reino Unido)</option>
                      <option value="WF">Islas Wallis y Futuna</option>
                      <option value="IL">Israel</option>
                      <option value="IT">Italia</option>
                      <option value="JM">Jamaica</option>
                      <option value="JP">Jap??n</option>
                      <option value="JO">Jordania</option>
                      <option value="KZ">Kazajist??n</option>
                      <option value="KE">Kenia</option>
                      <option value="KG">Kirguizist??n</option>
                      <option value="KI">Kiribati</option>
                      <option value="KW">Kuwait</option>
                      <option value="LA">Laos</option>
                      <option value="LS">Lesotho</option>
                      <option value="LV">Letonia</option>
                      <option value="LB">L??bano</option>
                      <option value="LR">Liberia</option>
                      <option value="LY">Libia</option>
                      <option value="LI">Liechtenstein</option>
                      <option value="LT">Lituania</option>
                      <option value="LU">Luxemburgo</option>
                      <option value="MK">Macedonia, Ex-Rep??blica Yugoslava de</option>
                      <option value="MG">Madagascar</option>
                      <option value="MY">Malasia</option>
                      <option value="MW">Malawi</option>
                      <option value="MV">Maldivas</option>
                      <option value="ML">Mal??</option>
                      <option value="MT">Malta</option>
                      <option value="MA">Marruecos</option>
                      <option value="MQ">Martinica</option>
                      <option value="MU">Mauricio</option>
                      <option value="MR">Mauritania</option>
                      <option value="YT">Mayotte</option>
                      <option value="MX">M??xico</option>
                      <option value="FM">Micronesia</option>
                      <option value="MD">Moldavia</option>
                      <option value="MC">M??naco</option>
                      <option value="MN">Mongolia</option>
                      <option value="MS">Montserrat</option>
                      <option value="MZ">Mozambique</option>
                      <option value="NA">Namibia</option>
                      <option value="NR">Nauru</option>
                      <option value="NP">Nepal</option>
                      <option value="NI">Nicaragua</option>
                      <option value="NE">N??ger</option>
                      <option value="NG">Nigeria</option>
                      <option value="NU">Niue</option>
                      <option value="NF">Norfolk</option>
                      <option value="NO">Noruega</option>
                      <option value="NC">Nueva Caledonia</option>
                      <option value="NZ">Nueva Zelanda</option>
                      <option value="OM">Om??n</option>
                      <option value="NL">Pa??ses Bajos</option>
                      <option value="PA">Panam??</option>
                      <option value="PG">Pap??a Nueva Guinea</option>
                      <option value="PK">Paquist??n</option>
                      <option value="PY">Paraguay</option>
                      <option value="PE">Per??</option>
                      <option value="PN">Pitcairn</option>
                      <option value="PF">Polinesia Francesa</option>
                      <option value="PL">Polonia</option>
                      <option value="PT">Portugal</option>
                      <option value="PR">Puerto Rico</option>
                      <option value="QA">Qatar</option>
                      <option value="UK">Reino Unido</option>
                      <option value="CF">Rep??blica Centroafricana</option>
                      <option value="CZ">Rep??blica Checa</option>
                      <option value="ZA">Rep??blica de Sud??frica</option>
                      <option value="DO">Rep??blica Dominicana</option>
                      <option value="SK">Rep??blica Eslovaca</option>
                      <option value="RE">Reuni??n</option>
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
                      <option value="LC">Santa Luc??a</option>
                      <option value="ST">Santo Tom?? y Pr??ncipe</option>
                      <option value="SN">Senegal</option>
                      <option value="SC">Seychelles</option>
                      <option value="SL">Sierra Leona</option>
                      <option value="SG">Singapur</option>
                      <option value="SY">Siria</option>
                      <option value="SO">Somalia</option>
                      <option value="LK">Sri Lanka</option>
                      <option value="PM">St Pierre y Miquelon</option>
                      <option value="SZ">Suazilandia</option>
                      <option value="SD">Sud??n</option>
                      <option value="SE">Suecia</option>
                      <option value="CH">Suiza</option>
                      <option value="SR">Surinam</option>
                      <option value="TH">Tailandia</option>
                      <option value="TW">Taiw??n</option>
                      <option value="TZ">Tanzania</option>
                      <option value="TJ">Tayikist??n</option>
                      <option value="TF">Territorios franceses del Sur</option>
                      <option value="TP">Timor Oriental</option>
                      <option value="TG">Togo</option>
                      <option value="TO">Tonga</option>
                      <option value="TT">Trinidad y Tobago</option>
                      <option value="TN">T??nez</option>
                      <option value="TM">Turkmenist??n</option>
                      <option value="TR">Turqu??a</option>
                      <option value="TV">Tuvalu</option>
                      <option value="UA">Ucrania</option>
                      <option value="UG">Uganda</option>
                      <option value="UY">Uruguay</option>
                      <option value="UZ">Uzbekist??n</option>
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
                    <small className="text-secondary">Estado: *</small> 
                  </span>
                  <div className="form-group mb-3">
                    <select required onChange={this.handlerOnChange, this.handler_estado.bind(this)} className="form-select" id="selEstado" name="selEstado" value={this.state.selEstado} ref={(selEstado) => (this.inputSelEstado = selEstado)} aria-label="estado" >
                    <option value="">Seleccione</option>
                    {
                      this.state.catalogoEstado ? 
                        this.state.catalogoEstado.map(datos => (
                            <option key={datos.idEstado} value={datos.nombre}>{datos.nombre}</option>
                        )) : "Cargando..."
                    }
                    </select>
                  </div>

                  {/* Municipio */}
                  <span>
                    <small className="text-secondary">Municipio: *</small> 
                  </span>
                  <div className="form-group mb-3">
                    <select required onChange={this.handlerOnChange} className="form-select" id="selMunicipio" name="selMunicipio" value={this.state.selMunicipio} ref={(selMunicipio) => (this.inputSelMunicipio = selMunicipio) } aria-label="municipio" >
                    <option value="">Seleccione</option>
                    {
                      this.state.catalogoMunicipio ? 
                        this.state.catalogoMunicipio.map(datos => (
                            <option key={datos.idMunicipio} value={datos.idEstado}>{datos.nombre}</option>
                        )) : <option value="">seleccione estado</option>
                    }
                    </select>
                  </div>
                  
                  {/* Localidad */}
                  <span>
                    <small className="text-secondary">Localidad: *</small> 
                  </span>
                  <div className="form-group mb-3">
                    <select required onChange={this.handlerOnChange} className="form-select" id="selLocalidad" name="selLocalidad" ref={(selLocalidad) => (this.inputSelLocalidad = selLocalidad)} aria-label="municipio">
                    <option value="">Seleccione</option>
                    {
                      this.state.catalogoLocalidad ? 
                        this.state.catalogoLocalidad.map(datos => (
                            <option key={datos.idLocalidad} value={datos.nombre}>{datos.nombre}</option>
                        )) : <option value="" disabled>seleccione municipio</option>
                    }
                    </select>
                  </div>

                  {/* Codigo postal */}
                  <span>
                    <small className="text-secondary">Codigo Postal: *</small> 
                  </span>
                  <div className="form-group mb-3">
                    <input required onChange={this.handlerOnChange} id="txtCodPostal" type="text" className="form-control w-100" name="txtCodPostal" value={this.state.txtCodPostal} ref={(txtCodPostal) => (this.inputTxtCodPostal = txtCodPostal)}/>
                  </div>

                  <hr/>

                  <span className="text-center text-md-start">
                    <h5 className="mb-3">Informaci??n para agendar su cita</h5>
                  </span>
                
                  {/* Agencia para cita */}
                  <span>
                    <small className="text-secondary">Agencia: *</small> 
                  </span>
                  <div className="form-group mb-3 align-items-center">
                    <select required onChange={this.handlerOnChange} className="form-select" id="selAgenciaAVisitar" name="selAgenciaAVisitar" value={this.state.selAgenciaAVisitar} ref={(selAgenciaAVisitar) => (this.inputSelAgenciaAVisitar = selAgenciaAVisitar) } aria-label="agencia a visitar" >
                      <option value="">Seleccione</option>
                      <option value="pachuca">CESIS Pachuca</option>
                      <option value="tula">CESIS Tula</option>
                      <option value="tulancingo">CESIS Tulancingo</option>
                      <option value="ixmiquilpan">CESIS Ixmiquilpan</option>
                    </select>
                  </div>

                  {/* fecha de visita */}
                  <div className="row mb-3 align-items-center">
                    <div className="col-md-6">
                      <span>
                        <small className="text-secondary">Fecha: *</small> 
                      </span>
                    </div>
                    <div className="col-md-6">
                      <input required onChange={this.handlerOnChange, this.checarDiaSemana.bind(this)} type="date" id="dateFechaCita" size="60" min='2021-09-17' className="form-control w-100" placeholder="fecha de la cita" name="dateFechaCita" value={this.state.dateFechaCita} ref={dateFechaCita=>this.inputDateFechaCita = dateFechaCita} aria-label="Fecha de cita"/>
                    </div>
                  </div>

                  {/* hora de visita */}
                  <div className="row mb-3 align-items-center">
                    <div className="col-md-6">
                      <span>
                        <small className="text-secondary">Horario: *</small> 
                      </span>
                    </div>
                    <div className="col-md-6">
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
                  <button className="btn btn-outline-dark fs-6" onClick={this.anterior.bind(this)} style={{marginTop: "10px"}}>ANTERIOR</button>
                  <button className="btn btn-dark fs-6" onClick={this.enviar.bind(this)} style={{marginTop: "10px"}}>FINALIZAR</button>
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
                        En la brevedad, recibir?? una notificaci??n por el medio seleccionado con su numero de cita y formato de solicitud de denuncia
                      </p>
                      <button className="btn btn-dark fs-6" onClick={this.recargar.bind(this)}>Registrar nueva denuncia</button>
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