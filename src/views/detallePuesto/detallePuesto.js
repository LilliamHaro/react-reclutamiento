import React, { Component } from "react";
import Header from "../../components/header/header";
import "./detallePuesto.css";
import { Link } from "react-router-dom";
import Form from "../../components/form/form";

class DetallePuesto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detallePuestoData: this.props.dataPuesto
    };
  }
  render() {
    return (
      <main className="container">
        <Header
          bgimage={this.props.dataPuesto.url_cover}
          title={this.props.dataPuesto.name}
          subtitle={this.props.dataPuesto.modality}
        />

        <div className="row"> 
          <div className="col-lg-8">
            <div className="deatllePuesto_content">
              <div className="deatllePuesto_content_cabecera">
                <div className="deatllePuesto_content_cabecera_btnRegresar">
                  <Link to="/">Regresar</Link>
                </div>
                <div className="deatllePuesto_content_cabecera_info">
                  <span className="deatllePuesto_content_cabecera_info_plaza">
                    Plaza abierta
                  </span>
                  <span className="deatllePuesto_content_cabecera_info_fecha">
                    / Publicado: {this.props.dataPuesto.date_publish}
                  </span>
                </div>
              </div>
              <div className="deatllePuesto_content_cuerpo">
                <h1>¿A quién buscamos?</h1>
                <p>{this.props.dataPuesto.description}</p>
                <h3>¿Qué estará en tus manos?</h3>
                <p>{this.props.dataPuesto.responsabilities}</p>
                <h3>Requisitos</h3>
                <ul className="deatllePuesto_content_cuerpo_requisitos">
                  {this.props.dataPuesto.skills.map((skill, i) => (
                    <li key={i}>{skill.name}</li>
                  ))}
                </ul>
                <h3>Horario Laboral</h3>
                <p>{this.props.dataPuesto.journey}</p>
              </div>
            </div>
            <div className="deatllePuesto_form_container">
              <h2 className="deatllePuesto_form_container_title">
                Postula aquí
              </h2>
              <Form
                puestoId={this.props.dataPuesto.id}
                puestoName={this.props.dataPuesto.name}
              />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="detallePuesto_recomendaciones">
              <h3 className="detallePuesto_recomendaciones_title">
                Te puede interesar
              </h3>
              <div className="detallePuesto_recomendaciones_option">
                {this.props.data.map((recomendaciones, i) => {
                  if (recomendaciones.group === this.props.dataPuesto.group) {
                    if (recomendaciones.name !== this.props.dataPuesto.name) {
                      var styleRecomendaciones = {
                        backgroundImage:
                          "url(" + recomendaciones.url_cover + ")"
                      };
                      return (
                        <Link key={i} to={"/" + recomendaciones.slug}>
                          <div
                            style={styleRecomendaciones}
                            
                            className="detallePuesto_filtro_option_link"
                          >
                            {recomendaciones.name}
                          </div>
                        </Link>
                      );
                    }
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default DetallePuesto;
