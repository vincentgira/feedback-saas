import { useState, useEffect } from 'react';

function App() {
  // État local pour stocker la liste des idées
  const [feedbacks, setFeedbacks] = useState([]);
  // État local pour le champ de saisie
  const [title, setTitle] = useState('');

  // Charger les feedbacks depuis l'API au montage du composant
  useEffect(() => {
    fetch('http://localhost:3000/feedbacks')
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Erreur lors de la récupération:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    // Envoyer le nouveau feedback à l'API
    const response = await fetch('http://localhost:3000/feedbacks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    const newFeedback = await response.json();
    setFeedbacks([...feedbacks, newFeedback]);
    setTitle('');
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