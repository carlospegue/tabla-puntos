import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block mb-6">
            <div className="bg-linear-to-r from-blue-500 to-purple-600 p-3 rounded-full">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Tabla de Puntos
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            Comparte, Compite y Diviértete
          </p>
          <p className="text-gray-400 text-lg">
            Crea una tabla con tus amigos y registra los puntos de tus competencias
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link 
            to="/create" 
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-linear-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-105"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Crear Tabla
          </Link>

          <Link 
            to="/join" 
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-linear-to-r from-green-600 to-green-700 rounded-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transition duration-300 transform hover:scale-105"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Unirme a Tabla
          </Link>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20 hover:border-opacity-40 transition">
            <div className="bg-blue-500 bg-opacity-30 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a6 6 0 00-9-5.666V12a4 4 0 010-8h.5a3 3 0 011 .82A3 3 0 0113 5h.5a4 4 0 010 8v.666A6.002 6.002 0 006 18v1h10z" />
              </svg>
            </div>
            <h3 className="text-blue-500 font-semibold text-lg mb-2">Fácil de Usar</h3>
            <p className="text-black-300 text-sm">Crea y comparte tablas en segundos</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20 hover:border-opacity-40 transition">
            <div className="bg-green-500 bg-opacity-30 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-2.723 3.066 3.066 0 10-3.58 3.03 3.066 3.066 0 001.835-.307zm12 0a3.066 3.066 0 001.745-2.723 3.066 3.066 0 10-3.58 3.03 3.066 3.066 0 001.835-.307zm-7.586 5.409a6.5 6.5 0 11-9.186 0 6.5 6.5 0 019.186 0zM9 16.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-emerald-700 font-semibold text-lg mb-2">Competición Sana</h3>
            <p className="text-black-300 text-sm">Registra puntos y ve los rankings en tiempo real</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 border border-white border-opacity-20 hover:border-opacity-40 transition">
            <div className="bg-purple-500 bg-opacity-30 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 7H7v6h6V7z" />
                <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2V2a1 1 0 112 0v1a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2v1a1 1 0 11-2 0v-1h-2v1a1 1 0 11-2 0v-1a2 2 0 01-2-2v-2H3a1 1 0 110-2h1V9H3a1 1 0 110-2h1V5a2 2 0 012-2v-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-fuchsia-600 font-semibold text-lg mb-2">Organizado</h3>
            <p className="text-black-300 text-sm">Gestiona múltiples tablas y eventos</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
