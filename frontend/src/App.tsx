import { useState } from 'react'
import './App.css'

function App() {
  const [isFindMode, setIsFindMode] = useState(true)
  const [text, setText] = useState('')
  const [data, setData] = useState<string[]>([])

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isFindMode) {
      findRequest(text)
    } else {
      importRequest(text)
    }
  }

  function handleUseDefault() {
    const defaultUrl = 'https://www.opus.ee/lemmad2013.txt'
    setText(defaultUrl)
    importRequest(defaultUrl)
  }

  function findRequest(text: string) {
    const word = encodeURIComponent(text)

    fetch(`/wordbase/find/${word}`, { method: 'GET' })
      .then((response) => {
        if (response.status === 404) {
          return ["Sõna puudu!"]
        }
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then((responseData) => {
        if (Array.isArray(responseData) && responseData.length > 0) {
          setData(responseData)
        } else {
          setData(['Sõna puudub sõnabaasist!'])
        }
      })
      .catch((error) => console.error(error))
  }

  function importRequest(text: string) {
    console.log('import request', text)
  }

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

      <div className="panel">
        <h2>{isFindMode ? 'Leia anagramm' : 'Impordi sõnabaas (URL)'}</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={isFindMode ? 'ilutaim' : 'https://www.opus.ee/lemmad2013.txt'}
          />
          <button type="submit">{isFindMode ? 'Otsi' : 'Impordi'}</button>
          {!isFindMode ? <button type="button" onClick={handleUseDefault}>Impordi olemasoleva sõnabaasi</button> : null}
        </form>
        {isFindMode ?
        <div className="panel">
        <h2>Leitud anagrammid</h2>
          {data.map((word) => (
            <p key={word}>{word}</p>
          ))}
        </div>
        : null}
      </div>
    </div>
  )
}
export default App
