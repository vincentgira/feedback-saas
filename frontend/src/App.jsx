import { useState } from "react";

export default function App() {
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideas, setIdeas] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = ideaTitle.trim();
    if (!trimmedTitle) {
      return;
    }

    setIdeas((currentIdeas) => [...currentIdeas, trimmedTitle]);
    setIdeaTitle("");
  }

  return (
    <main className="app">
      <section className="panel">
        <h1 className="title">
          <span className="sparkle" aria-hidden="true">
            ✦
          </span>
          <span className="title-picto" aria-hidden="true">
            🐴
          </span>
          <span>FEEDBACK HUB</span>
          <span className="sparkle" aria-hidden="true">
            ✦
          </span>
        </h1>

        <form className="idea-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="idea title"
            value={ideaTitle}
            onChange={(event) => setIdeaTitle(event.target.value)}
          />
          <button type="submit">
            <span className="button-sparkle" aria-hidden="true">
              ✦
            </span>
            <span>va niquer ta mere</span>
            <span className="button-sparkle" aria-hidden="true">
              ✦
            </span>
          </button>
        </form>

        <ul className="idea-list">
          {ideas.map((idea, index) => (
            <li key={`${idea}-${index}`}>{idea}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
