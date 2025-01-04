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
      const res = await axios.post("https://ec2-34-234-83-254.compute-1.amazonaws.com:8080/predict", data);
      setResponse(res.data);
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
            <div className="form-group mb-3" key="Largo_raiz">
              <label htmlFor="Largo_raiz">  Largo de la raíz: </label>
              <input
                type="text"
                id="Largo_raiz"
                name="Largo_raiz"
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group mb-3" key="ancho_raiz">
              <label htmlFor="ancho_raiz"> Ancho de la raíz:</label>
              <input
                type="text"
                id="ancho_raiz"
                name="ancho_raiz"
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
            <h4>Respuesta del Servidor:</h4>
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