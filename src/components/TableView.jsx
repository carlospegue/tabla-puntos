import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/pocketbase';

function TableView() {
  const { id } = useParams();
  const [table, setTable] = useState(null);
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');

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
      
      setPlayers(playerRecords.map(p => ({
        id: p.users.id,
        name: p.users.name,
        surname: p.users.surname,
        phone: p.users.phone,
        points: p.points,
        playerId: p.id
      })));
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

      setPlayers([...players, {
        id: userId,
        name: newPlayerName,
        surname: '',
        phone: '',
        points: 0,
        playerId: player[0].id
      }]);
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
      setPlayers(players.map(p => p.playerId === playerId ? { ...p, points: newPoints } : p));
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
      setPlayers(players.filter(p => p.playerId !== playerId));
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  if (!table) return <div>Cargando...</div>;

  return (
    <div className="container">
      <h1>Tabla de Puntos</h1>
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
              <td>
                <button onClick={() => updatePoints(player.playerId, 1)}>+</button>
                <button onClick={() => updatePoints(player.playerId, -1)}>-</button>
                <button onClick={() => deletePlayer(player.playerId)} className="btn btn-secondary">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableView;