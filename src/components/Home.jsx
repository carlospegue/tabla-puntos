import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1>Bienvenido a la Tabla de Puntos</h1>
      <div>
        <Link to="/create" className="btn btn-primary">Crear Tabla de Amigos</Link>
        <Link to="/join" className="btn btn-secondary">Unirse a Tabla de Amigos Existente</Link>
      </div>
    </div>
  );
}

export default Home;