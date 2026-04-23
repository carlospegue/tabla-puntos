import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/pocketbase"

function JoinTable() {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [phone, setPhone] = useState("")
  const [tableName, setTableName] = useState("")
  const [code, setCode] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")
  const [step, setStep] = useState(1)
  const [user, setUser] = useState(null)
  const [table, setTable] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const generateCode = () => {
    return Math.random().toString().slice(2, 8)
  }

  const handleCheckUser = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const { data: tableData, error: tableError } = await supabase
        .from("tables")
        .select("*")
        .eq("name", tableName)
        .single()

      if (tableError || !tableData) {
        setError("Tabla no encontrada. Verifica el nombre e intenta de nuevo.")
        setLoading(false)
        return
      }

      const { data: users, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("name", name)
        .eq("surname", surname)
        .eq("phone", phone)

      if (userError) throw userError

      let currentUser
      if (users.length > 0) {
        currentUser = users[0]
      } else {
        const { data: newUser, error: createError } = await supabase
          .from("users")
          .insert([{ name, surname, phone }])
          .select()

        if (createError) throw createError
        currentUser = newUser[0]
      }

      const newCode = generateCode()
      setGeneratedCode(newCode)
      setUser(currentUser)
      setTable(tableData)
      setStep(2)
    } catch (error) {
      console.error("Error checking user:", error)
      setError("Error al verificar. Por favor intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    if (code === generatedCode) {
      try {
        const { error } = await supabase
          .from("table_players")
          .insert([{ table_id: table.id, user_id: user.id, points: 0 }])

        if (error) {
          console.error("Error:", error)
          setError("Error al unirse a la tabla. Por favor intenta de nuevo.")
          setLoading(false)
          return
        }
        navigate(`/table/${table.id}`)
      } catch (error) {
        console.error("Error:", error)
        setError("Error al unirse a la tabla. Por favor intenta de nuevo.")
        setLoading(false)
      }
    } else {
      setError("Código incorrecto. Por favor intenta de nuevo.")
      setLoading(false)
    }
  }

  const handleGoBack = () => {
    setStep(1)
    setCode("")
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Unirse a Tabla</h1>
          <p className="text-gray-600">
            {step === 1 ? "Ingresa tus datos" : "Verifica tu código"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleCheckUser} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre
              </label>
              <input 
                type="text" 
                placeholder="Tu nombre"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Apellidos
              </label>
              <input 
                type="text" 
                placeholder="Tus apellidos"
                value={surname} 
                onChange={(e) => setSurname(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Número de Teléfono
              </label>
              <input 
                type="tel" 
                placeholder="+34 600 000 000"
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre de la Tabla
              </label>
              <input 
                type="text" 
                placeholder="Nombre de la tabla a unirte"
                value={tableName} 
                onChange={(e) => setTableName(e.target.value)} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200 mt-6"
            >
              {loading ? "Verificando..." : "Verificar"}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-6 text-center">
              <p className="text-gray-600 text-sm mb-3">Código de verificación</p>
              <div className="text-5xl font-bold text-green-600 tracking-widest font-mono mb-3">
                {generatedCode}
              </div>
              <p className="text-gray-500 text-xs">Ingresa este código para confirmar</p>
            </div>

            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ingresa el código
                </label>
                <input 
                  type="text" 
                  placeholder="Ej: 123456"
                  value={code} 
                  onChange={(e) => setCode(e.target.value)} 
                  maxLength="6"
                  className="w-full px-4 py-3 text-center text-2xl font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                {loading ? "Confirmando..." : "Unirse a la Tabla"}
              </button>

              <button 
                type="button" 
                onClick={handleGoBack}
                disabled={loading}
                className="w-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition duration-200"
              >
                Atrás
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default JoinTable
