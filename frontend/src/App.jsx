import { useState } from 'react';

function App() {
  // État local pour stocker la liste des idées
  const [feedbacks, setFeedbacks] = useState([]);
  // État local pour le champ de saisie
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    // Ajouter la nouvelle idée à la liste (en mémoire locale uniquement)
    const newFeedback = { id: Date.now(), title: title };
    setFeedbacks([...feedbacks, newFeedback]);
    setTitle(''); // Réinitialiser le champ
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