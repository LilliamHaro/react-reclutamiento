import React, { Component } from "react";
import "./form.css";
import iconFile from "../../assets/icon-upload.png";
import axios from "axios";
import { FormErrors } from "./formError";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombres: "",
      apellidos: "",
      dni: "",
      nacimiento: "",
      email: "",
      celular: "",
      direccion: "",
      file: "",
      fileName: "Sube tu CV en formato word/pdf",
      linkedin: "",
      otros: "",
      formValid: false,
      nombresValid: false,
      apellidosValid: false,
      dniValid: false,
      nacimientoValid: false,
      emailValid: false,
      celularValid: false,
      direccionValid: false,
      fileValid: false,
      linkedinValid: false,
      formErrors: {
        nombres: "",
        apellidos: "",
        dni: "",
        nacimiento: "",
        email: "",
        celular: "",
        direccion: "",
        file: ""
      },
      opacity: 1,
      formContent: true,
      formLoader: false,
      formRes: false,
      formCodeRes: ""
    };
    this.typing = this.typing.bind(this);
    this.fileSelect = this.fileSelect.bind(this);
  }

  typing(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(
      {
        [name]: value
      },
      () => {
        this.validateField(name, value);
      }
    );
  }
  fileSelect = e => {
    e.preventDefault();
    if (e.target.files.length !== 0) {
      var file = e.target.files[0];
      var fileName = e.target.files[0].name;
      var pattern = new RegExp(/.pdf|.docx/i);

      if (!file.type.match(pattern)) {
        alert("Formato inválido");
        return;
      }
      if (file.size >= 26214400) {
        alert("Tamaño de imagen inválido");
        return;
      }

      this.setState(
        {
          file: file,
          fileName: fileName
        },
        () => {
          this.validateField("file", file);
        }
      );
    }
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nombresValid = this.state.nombresValid;
    let apellidosValid = this.state.apellidosValid;
    let dniValid = this.state.dniValid;
    let nacimientoValid = this.state.nacimientoValid;
    let emailValid = this.state.emailValid;
    let celularValid = this.state.celularValid;
    let direccionValid = this.state.direccionValid;
    let fileValid = this.state.fileValid;
    let linkedinValid = this.state.linkedinValid;

    switch (fieldName) {
      case "nombres":
        nombresValid = value;
        fieldValidationErrors.nombres = nombresValid ? "" : " son requeridos";
        break;
      case "apellidos":
        apellidosValid = value;
        fieldValidationErrors.apellidos = apellidosValid
          ? ""
          : " son requeridos";
        break;
      case "dni":
        dniValid = value.length > 7 && value * 0 === 0;
        fieldValidationErrors.dni = dniValid ? "" : " es inválido";
        break;
      case "nacimiento":
        nacimientoValid = value;
        fieldValidationErrors.nacimiento = nacimientoValid
          ? ""
          : " fecha de nacimiento es requerida";
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ;
        fieldValidationErrors.email = emailValid ? "" : " es inválido";
        break;
      case "celular":
        celularValid = value;
        fieldValidationErrors.celular = celularValid ? "" : " es requerido";
        break;
      case "direccion":
        direccionValid = value;
        fieldValidationErrors.direccion = direccionValid ? "" : " es requerido";
        break;
      case "file":
        fileValid = value;
        fieldValidationErrors.file = fileValid ? "" : " es requerido";
        break;
      case "linkedin":
        linkedinValid = value;
        fieldValidationErrors.linkedin = linkedinValid
          ? ""
          : "El perfil de linkedin es requerido";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        nombresValid: nombresValid,
        apellidosValid: apellidosValid,
        dniValid: dniValid,
        nacimientoValid: nacimientoValid,
        emailValid: emailValid,
        celularValid: celularValid,
        direccionValid: direccionValid,
        fileValid: fileValid,
        linkedinValid: linkedinValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.nombresValid &&
        this.state.apellidosValid &&
        this.state.dniValid &&
        this.state.nacimientoValid &&
        this.state.emailValid &&
        this.state.celularValid &&
        this.state.direccionValid &&
        this.state.fileValid &&
        this.state.linkedinValid
    });
  }

  showFormAgain() {}

  sendForm = e => {
    e.preventDefault();
    console.log(this.state);

    this.setState({
      opacity: "0.5",
      formLoader: true
    });
    var url = "https://www.circuit.com.pe/api/v1/jobs/apply";
    var data = new FormData();
    data.append("codejob", this.props.id);
    data.append("firstname", this.state.nombres);
    data.append("lastname", this.state.apellidos);
    data.append("dni", this.state.dni);
    data.append("birthday", this.state.nacimiento);
    data.append("email", this.state.email);
    data.append("phone", this.state.celular);
    data.append("address", this.state.direccion);
    data.append("file", this.state.file);
    data.append("linkedin", this.state.linkedin);
    data.append("comments", this.state.otros);

    var headers = {
      "content-type":
        "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
    };

    axios
      .post(url, data, { headers: headers })
      .then(res => {
        if (res.data.code === 201) {
          console.log("201");
          this.setState({
            formCodeRes: res.data.message,
            formContent: false,
            formLoader: false,
            formRes: true
          }, function(){
            console.log('yeyeyeyye')
          });
        } else {
          console.log("ok but not 200");
          this.setState({
            formCodeRes: res.data.message,
            formContent: false,
            formLoader: false,
            formRes: true
          });
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  render() {
    return (
      <form id={this.props.puestoId} className="row  form_container_form">
        <div className="col-lg-12">
          <FormErrors formErrors={this.state.formErrors} />
        </div>

        <div className="col-lg-6">
          <div className=" form_container_inputContainer">
            <label>Nombres</label>
            <input
              name="nombres"
              value={this.state.nombres}
              onChange={this.typing}
              type="text"
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className=" form_container_inputContainer">
            <label>Apellidos</label>
            <input
              name="apellidos"
              value={this.state.apellidos}
              onChange={this.typing}
              type="text"
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className=" form_container_inputContainer">
            <label>Dni</label>
            <input
              name="dni"
              value={this.state.dni}
              onChange={this.typing}
              type="number"
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className=" form_container_inputContainer">
            <label>Fecha de nacimiento</label>
            <input
              name="nacimiento"
              value={this.state.nacimiento}
              onChange={this.typing}
              type="date"
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className=" form_container_inputContainer">
            <label>Correo electrónico</label>
            <input
              name="email"
              value={this.state.email}
              onChange={this.typing}
              type="email"
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className=" form_container_inputContainer">
            <label>Teléfono celular</label>
            <input
              name="celular"
              value={this.state.celular}
              onChange={this.typing}
              type="number"
            />
          </div>
        </div>

        <div className="col-lg-12">
          <div className=" form_container_inputContainer">
            <label>Perfil de LinkedIn</label>
            <input
              name="linkedin"
              value={this.state.linkedin}
              onChange={this.typing}
              type="text"
            />
          </div>
        </div>

        <div className="col-lg-12">
          <div className=" form_container_inputContainer">
            <label>Dirección de residencia</label>
            <textarea
              name="direccion"
              value={this.state.direccion}
              onChange={this.typing}
              cols="30"
              rows="3"
            />
          </div>
        </div>

        <div className="col-lg-12">
          <div className=" form_container_inputContainer">
            <label>Otros (Opcional)</label>
            <textarea
              placeholder="Proyectos, etc"
              name="otros"
              value={this.state.otros}
              onChange={this.typing}
              cols="30"
              rows="3"
            />
          </div>
        </div>

        <div className="col-lg-12">
          <div className=" form_container_inputContainer">
            <label>Sube tu CV en formato word/pdf</label>

            <div className=" form_container_inputContainer_maskFile">
              <div className=" form_container_inputContainer_icon">
                <img src={iconFile} alt="" />
              </div>
              <label>Sube tu CV en formato word/pdf</label>
              <input type="file" name="file" onChange={this.fileSelect} />
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <button
           
            onClick={this.sendForm}
            className=" form_container_btn"
          >
            Postular
          </button>
        </div>
      </form>
    );
  }
}

export default Form;
