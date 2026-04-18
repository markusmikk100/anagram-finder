import { useState } from 'react'
import './App.css'

function App() {
  const [isFindMode, setIsFindMode] = useState(true)
  return (
    <div className="page">
      <header className="title">
        <h1>Anagrammi lahendaja</h1>
      </header>

      <div className="mode-switch">
        <button
          type="button"
          className={isFindMode ? 'mode-switch__button active' : 'mode-switch__button'} //if else
          onClick={() => setIsFindMode(true)}
        >
          Leia sõna
        </button>
        <button
          type="button"
          className={!isFindMode ? 'mode-switch__button active' : 'mode-switch__button'}
          onClick={() => setIsFindMode(false)}
        >
          Impordi sõnabaas
        </button>
      </div>

      <article className="panel">
        <h2>{isFindMode ? 'Leia anagramm' : 'Impordi sõnabaas (URL)'}</h2>
        <form action={isFindMode ? 'leia' : 'impordi'} method={isFindMode ? 'get' : 'post'} className="form">
          <input
            placeholder={isFindMode ? 'ilutaim' : 'https://www.opus.ee/lemmad2013.txt'}
          />
          <button type="submit">{isFindMode ? 'Otsi' : 'Impordi'}</button>
          {!isFindMode ? <button type="submit">Impordi olemasoleva sõnabaasi</button> : null}
        </form>
      </article>
    </div>
  )
}

export default App
