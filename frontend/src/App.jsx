import React, { useState } from 'react';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';

function App() {
  const [projectionData, setProjectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (data.success) {
        setProjectionData(data.data);
      } else {
        setError(data.error || 'Failed to generate projection');
      }
    } catch (err) {
      setError('Network error connecting to backend');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => setProjectionData(null);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8 font-sans selection:bg-blue-500/30">
      <header className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            FutureMe AI
          </h1>
          <p className="text-gray-400 mt-1 text-sm md:text-base">Personal Life Projection Simulator</p>
        </div>
        {projectionData && (
          <button 
            onClick={resetForm}
            className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors border border-gray-700"
          >
            Start Over
          </button>
        )}
      </header>

      <main className="w-full flex flex-col items-center">
        {error && (
          <div className="w-full bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}
        
        {!projectionData ? (
          <InputForm onSubmit={handleGenerate} loading={loading} />
        ) : (
          <Dashboard data={projectionData} />
        )}
        <ChatBot userData={projectionData} />
      </main>
    </div>
  );
}

export default App;
