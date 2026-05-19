import { useState, useEffect } from 'react';

function App() {
  // État local pour stocker la liste des idées
  const [feedbacks, setFeedbacks] = useState([]);
  // État local pour le champ de saisie
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);
  const [title, setTitle] = useState('');

  // Fonction pour récupérer les feedbacks depuis l'API
  const fetchFeedbacks = () => {
    fetch('http://localhost:3000/feedbacks')
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Erreur lors de la récupération:", err));
  };

  // Charger les feedbacks au chargement initial
  useEffect(() => {
    // Fetch weather data
    const fetchWeather = async () => {
      try {
        const response = await fetch('http://localhost:3000/weather?city=Paris');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setWeatherError(error);
      } finally {
        setWeatherLoading(false);
      }
    };
    fetchFeedbacks();
    fetchWeather();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    // Envoyer le nouveau feedback à l'API
    await fetch('http://localhost:3000/feedbacks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    fetchFeedbacks(); // Rafraîchir la liste depuis le serveur après l'ajout
    setTitle(''); // Réinitialiser le champ de saisie
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Feedback Hub</h1>
      
      <form onSubmit={handleSubmit}>
        <label>
          Idea title:
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <ul>
        {feedbacks.map(f => <li key={f.id}>{f.title}</li>)}
      </ul>
    </div>
  );
}

export default App;