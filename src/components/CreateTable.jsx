import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

function CreateTable() {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("")
  const [tableName, setTableName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleGoHome = () => {
    const confirmLeave = window.confirm(
      'Se perderá la tabla actual y volverás a la página principal. ¿Deseas continuar?'
    )
    if (confirmLeave) {
      localStorage.removeItem('lastRoute')
      navigate('/')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const { data: user, error: userError } = await supabase
        .from("users")
        .insert([{ name, surname, phone }])
        .select()

      if (userError) throw userError
      const userId = user[0].id

      const { data: table, error: tableError } = await supabase
        .from("tables")
        .insert([{ creator: userId, name: tableName }])
        .select()

      if (tableError) throw tableError
      const tableId = table[0].id

      const { error: playerError } = await supabase
        .from("table_players")
        .insert([{ table_id: tableId, user_id: userId, points: 0 }])

      if (playerError) throw playerError
      navigate(`/table/${tableId}`)
    } catch (error) {
      console.error("Error creating table:", error)
      setError("Error al crear la tabla. Por favor intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Crear Tabla</h1>
          <p className="text-gray-600">Configura tu tabla de puntuación</p>
          <button
            type="button"
            onClick={handleGoHome}
            className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            Volver a página principal
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre
            </label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Tu nombre"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Apellidos
            </label>
            <input 
              type="text" 
              value={surname} 
              onChange={(e) => setSurname(e.target.value)} 
              placeholder="Tus apellidos"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre de la Tabla
            </label>
            <input 
              type="text" 
              value={tableName} 
              onChange={(e) => setTableName(e.target.value)} 
              placeholder="Ej: Amigos de la Oficina"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Número de Teléfono
            </label>
            <input 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="+53 58204096"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200 mt-6"
          >
            {loading ? "Creando tabla..." : "Crear Tabla"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateTable
