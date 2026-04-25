import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

function TableView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [table, setTable] = useState(null);
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const sortPlayers = (playersList) =>
    [...playersList].sort((a, b) => b.points - a.points);

  const handleGoHome = () => {
    const confirmLeave = window.confirm(
      'Se perderá la tabla actual y volverás a la página principal. ¿Deseas continuar?'
    )
    if (confirmLeave) {
      localStorage.removeItem('lastRoute')
      navigate('/')
    }
  }

  useEffect(() => {
    loadTable();
  }, [id]);

  const loadTable = async () => {
    try {
      const { data: tableData } = await supabase
        .from('tables')
        .select('*')
        .eq('id', id)
        .single();
      setTable(tableData);

      // Load players with points
      const { data: playerRecords } = await supabase
        .from('table_players')
        .select('id, points, users:user_id(id, name, surname, phone)')
        .eq('table_id', id);
      
      const formattedPlayers = playerRecords.map(p => ({
        id: p.users.id,
        name: p.users.name,
        surname: p.users.surname,
        phone: p.users.phone,
        points: p.points,
        playerId: p.id
      }));

      setPlayers(sortPlayers(formattedPlayers));
    } catch (error) {
      console.error('Error loading table:', error);
    }
  };

  const addPlayer = async () => {
    if (!newPlayerName) return;
    try {
      // First, create or find user
      let userId;
      const { data: existingUsers } = await supabase
        .from('users')
        .select('id')
        .eq('name', newPlayerName);

      if (existingUsers && existingUsers.length > 0) {
        userId = existingUsers[0].id;
      } else {
        const { data: newUser } = await supabase
          .from('users')
          .insert([{ name: newPlayerName, surname: '', phone: '' }])
          .select();
        userId = newUser[0].id;
      }

      const { data: player } = await supabase
        .from('table_players')
        .insert([{ table_id: id, user_id: userId, points: 0 }])
        .select();

      setPlayers(sortPlayers([
        ...players,
        {
          id: userId,
          name: newPlayerName,
          surname: '',
          phone: '',
          points: 0,
          playerId: player[0].id
        }
      ]));
      setNewPlayerName('');
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  const updatePoints = async (playerId, delta) => {
    const player = players.find(p => p.playerId === playerId);
    if (!player) return;
    const newPoints = Math.max(0, player.points + delta);
    try {
      await supabase
        .from('table_players')
        .update({ points: newPoints })
        .eq('id', playerId);
      setPlayers(sortPlayers(players.map(p => p.playerId === playerId ? { ...p, points: newPoints } : p)));
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };

  const deletePlayer = async (playerId) => {
    try {
      await supabase
        .from('table_players')
        .delete()
        .eq('id', playerId);
      setPlayers(sortPlayers(players.filter(p => p.playerId !== playerId)));
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  if (!table) return <div>Cargando...</div>;

  return (
    <div className="container">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-2">Tabla de Puntos</h1>
        <button
          type="button"
          onClick={handleGoHome}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          Volver a página principal
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Nombre del jugador"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
        />
        <button onClick={addPlayer} className="btn btn-primary">Añadir Jugador</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Jugador</th>
            <th>Puntos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.playerId}>
              <td>{player.name}</td>
              <td>{player.points}</td>
              <td className="space-x-2">
                <button
                  onClick={() => updatePoints(player.playerId, 1)}
                  className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-sm hover:bg-green-700 transition-colors duration-200"
                >
                  +
                </button>
                <button
                  onClick={() => updatePoints(player.playerId, -1)}
                  className="inline-flex items-center justify-center px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-sm hover:bg-yellow-600 transition-colors duration-200"
                >
                  -
                </button>
                <button onClick={() => deletePlayer(player.playerId)} className="btn btn-secondary">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableView;