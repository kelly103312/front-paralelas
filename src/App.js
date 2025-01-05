import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from "axios";

function App() {
  const [inputs, setInputs] = useState({
    feature1: "",
    feature2: "",
    feature3: "",
    feature4: "",
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value) || value === "") {
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      features: [
        parseFloat(inputs.feature1),
        parseFloat(inputs.feature2),
        parseFloat(inputs.feature3),
        parseFloat(inputs.feature4),
      ],
    };

    try {
      const res = await axios.post("http://ec2-52-91-222-99.compute-1.amazonaws.com:8080/predict", data);
      console.log("data: " + res.data["prediction"])
      setResponse(res.data["prediction"]);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };


  return (
    <div className="App">
      <div className="container col-3 mt-5">
        <h2 className="text-center mb-4">Formulario de predicción</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3" key="Largo_sepalo">
              <label htmlFor="Largo_sepalo">  Largo del sepalo: </label>
              <input
                type="text"
                id="Largo_sepalo"
                name="Largo_sepalo"
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group mb-3" key="ancho_sepalo">
              <label htmlFor="ancho_sepalo"> Ancho del sepalo:</label>
              <input
                type="text"
                id="ancho_sepalo"
                name="ancho_sepalo"
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group mb-3" key="Largo_petalo">
              <label htmlFor="Largo_petalo"> Largo del petalo:</label>
              <input
                type="text"
                id="Largo_petalo"
                name="Largo_petalo"
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group mb-3" key="Ancho_petalo">
              <label htmlFor="Ancho_petalo">  Ancho del petalo:</label>
              <input
                type="text"
                id="Ancho_petalo"
                name="Ancho_petalo"
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          <button type="submit" className="btn btn-primary w-100">
            Enviar
          </button>
        </form>

        {response && (
          <div className="alert alert-success mt-4">
            <h4>Resultado de la predicción: </h4>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}

        {error && (
          <div className="alert alert-danger mt-4">
            <h4>Error:</h4>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
