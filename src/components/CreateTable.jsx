import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/pocketbase';

function CreateTable() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user in database
      const { data: user, error: userError } = await supabase
        .from('users')
        .insert([{ name, surname, phone }])
        .select();

      if (userError) throw userError;
      const userId = user[0].id;

      // Create table
      const { data: table, error: tableError } = await supabase
        .from('tables')
        .insert([{ creator: userId }])
        .select();

      if (tableError) throw tableError;
      const tableId = table[0].id;

      // Add creator as player
      const { error: playerError } = await supabase
        .from('table_players')
        .insert([{ table_id: tableId, user_id: userId, points: 0 }]);

      if (playerError) throw playerError;

      // Navigate to table view
      navigate(`/table/${tableId}`);
    } catch (error) {
      console.error('Error creating table:', error);
      alert('Error al crear la tabla');
    }
  };

  return (
    <div className="container">
      <h1>Crear Tabla de Amigos</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Apellidos:</label>
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Número de Teléfono:</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Crear Tabla</button>
      </form>
    </div>
  );
}

export default CreateTable;