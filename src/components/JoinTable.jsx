import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/pocketbase';

function JoinTable() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tableId, setTableId] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1); // 1: enter details, 2: enter code
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleCheckUser = async (e) => {
    e.preventDefault();
    try {
      const { data: users, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('name', name)
        .eq('phone', phone);

      if (userError) throw userError;

      if (users.length > 0) {
        setUser(users[0]);
        // Check if table exists
        const { data: table, error: tableError } = await supabase
          .from('tables')
          .select('*')
          .eq('id', tableId)
          .single();

        if (table) {
          // Simulate sending code
          alert(`Código enviado a ${phone}: 1234`);
          setStep(2);
        } else {
          alert('Tabla no encontrada');
        }
      } else {
        alert('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      alert('Error al verificar usuario');
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (code === '1234') {
      // Add user to table
      const { error } = await supabase
        .from('table_players')
        .insert([{ table_id: tableId, user_id: user.id, points: 0 }]);

      if (error) {
        console.error('Error:', error);
      }
      navigate(`/table/${tableId}`);
    } else {
      alert('Código incorrecto');
    }
  };

  return (
    <div className="container">
      <h1>Unirse a Tabla de Amigos</h1>
      {step === 1 ? (
        <form onSubmit={handleCheckUser}>
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Número de Teléfono:</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>ID de la Tabla:</label>
            <input type="text" value={tableId} onChange={(e) => setTableId(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Verificar</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode}>
          <div className="form-group">
            <label>Código:</label>
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Unirse</button>
        </form>
      )}
    </div>
  );
}

export default JoinTable;