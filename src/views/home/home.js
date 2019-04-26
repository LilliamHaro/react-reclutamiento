import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tipoPuestos: [
        { name: "Tiempo parcial", value: "Tiempo parcial" },
        { name: "Tiempo completo", value: "Tiempo completo" },
        { name: "Freelance", value: "Freelance" },
        { name: "Remoto", value: "Remoto" }
      ],
      optionsChecked: []
    };
    this.selectFilter = this.selectFilter.bind(this);
  }
  selectFilter(event) {
    let checkedArray = this.state.optionsChecked;
    let selectedValue = event.target.value;

    if (event.target.checked === true) {
      checkedArray.push(selectedValue);
      this.setState(
        {
          optionsChecked: checkedArray
        },
        function() {
          console.log("mas", this.state.optionsChecked);
        }
      );
    } else {
      let valueIndex = checkedArray.indexOf(selectedValue);
      checkedArray.splice(valueIndex, 1);

      this.setState(
        {
          optionsChecked: checkedArray
        },
        function() {
          console.log("res", this.state.optionsChecked);
        }
      );
    }
  }

  render() {
    const { allData } = this.props;
    console.log("ssssssssssssssssssssssssssssss", allData);
    return (
      <main className="container">
        <Header bgimage="https://www.circuit.com.pe/cdn/careers/images/hero-single-laboral.png" title="OPORTUNIDADES LABORALES" subtitle="" />
        <div className="row">
          {/* filtro */}
          <div className="col-lg-4">
            <div className="home_filtro">
              <h3 className="home_filtro_title">Tipo de empleo</h3>
              <div className="home_filtro_option">
                {this.state.tipoPuestos.map((tipoPuesto, i) => {
                  return (
                    <div key={i} className="home_filtro_option_input">
                      <input
                        value={tipoPuesto.value}
                        type="checkbox"
                        onChange={this.selectFilter}
                      />
                      <label className="home_filtro_option_label">
                        {tipoPuesto.name}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* vista */}
          <div className="col-lg-8">
            <ul className="home_list">
              {this.props.allData.map((data, i) => {
                if (
                  this.state.optionsChecked.indexOf(data.modality) !== -1 ||
                  this.state.optionsChecked.length === 0
                ) {
                  return (
                    <li className="home_list_item" key={data.id}>
                      <div className="home_list_item_data">
                        <h3> <span className="home_list_item_data_tipo"> Tiempo completo </span> <span className="home_list_item_data_point">•</span> <span className="home_list_item_data_estado"> URGENTE</span></h3>
                        <h1 className="home_list_item_data_title">{data.name}</h1>
                      </div>
                      <div className="home_list_item_links">
                        <h3 className="home_list_item_links_zone">Lima, Perú</h3>
                        <Link to={data.slug}> 
                        <button className="home_list_item_links_btn">
                            Más info
                        </button>
                      </Link>
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
