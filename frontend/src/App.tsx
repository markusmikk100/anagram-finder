import { ThreeDot } from 'react-loading-indicators'
import { useState } from 'react'
import './App.css'

function App() {
  const [isFindMode, setIsFindMode] = useState(true)
  const [text, setText] = useState('')
  const [data, setData] = useState<string[]>([])
  const [findResultTitle, setFindResultTitle] = useState('Leitud anagrammid:')
  const [importError, setImportError] = useState('')
  const [isWordbaseImporting, setIsWordbaseImporting] = useState(false)

  const Loading = () => (
    <ThreeDot color={['#00e5ff', '#00c3ce', '#009fa8']} />
  )

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isFindMode) {
      setImportError('')
      findRequest(text)
    } else {
      importRequest(text)
    }
  }

  function handleUseDefault() {
    const defaultUrl = 'https://www.opus.ee/lemmad2013.txt' //https://raw.githubusercontent.com/dwyl/english-words/refs/heads/master/words.txt
    setImportError('')
    setText(defaultUrl)
    importRequest(defaultUrl)
  }

  function findRequest(text: string) {
    const trimmedWord = text.trim()
    if (!trimmedWord) {
      setData([])
      setFindResultTitle('Sisesta sõna!')
      return
    }

    setFindResultTitle('Leitud anagrammid:')
    setData([])
    const word = encodeURIComponent(trimmedWord)

    fetch(`${import.meta.env.VITE_API_URL}/wordbase/find/${word}`, { method: 'GET' })
      .then((response) => {
        if (response.status === 404) {
          setData([])
          setFindResultTitle('Sõna ei leitud!')
          return null
        }
        if (response.status === 502) {
          setData([])
          setFindResultTitle('Tausta süsteem ei tööta!')
          return null
        }
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then((responseData) => {
        if (!responseData) {
          return
        }

        if (Array.isArray(responseData) && responseData.length > 0) {
          setData(responseData)
          setFindResultTitle('Leitud anagrammid:')
        } else {
          setData([])
          setFindResultTitle('Sõna puudub sõnabaasist!')
        }
      })
      .catch((error) => {
        setData([])
        setFindResultTitle('Viga päringul, Proovi uuesti.')
        console.error(error)
      })
  }

  function importRequest(text: string) {
    if (!text.trim()) {
      setImportError('Sisesta URL!')
      return
    }

    setIsWordbaseImporting(true)    
    fetch(`${import.meta.env.VITE_API_URL}/wordbase/import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: text.trim() }),
    })
      .then((response) => {
        if (response.status === 500) {
          throw new Error('Importimine ebaõnnestus. Kontrolli URL.')
        }
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then(() => {
        setIsWordbaseImporting(false)
        setImportError('Sõnabaas imporditud!')
      })
      .catch((error) => {
        setIsWordbaseImporting(false)
        setImportError('Importimine ebaõnnestus. Kontrolli URL.')
        console.error(error)
      })
  }

  return (
    <div className="page">
      <header className="title">
        <h1>Anagrammi lahendaja</h1>
      </header>

      <div className="mode-switch">
        <button
          type="button"
          className={isFindMode ? 'mode-switch__button active' : 'mode-switch__button'}
          onClick={() => {setIsFindMode(true); setText("")}}
        >
          Leia sõna
        </button>
        <button
          type="button"
          className={!isFindMode ? 'mode-switch__button active' : 'mode-switch__button'}
          onClick={() => {setIsFindMode(false); setText("")}}
        >
          Impordi sõnabaas
        </button>
      </div>

      {!isWordbaseImporting ? (
        <div className="panel">
          <h2>{isFindMode ? 'Leia anagramm' : 'Impordi sõnabaas (URL)'}</h2>

          <form onSubmit={handleSubmit} className="form">
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={isFindMode ? 'ilutaim' : 'https://www.opus.ee/lemmad2013.txt'}
            />

            <button type="submit">
              {isFindMode ? 'Otsi' : 'Impordi'}
            </button>

            {!isFindMode && (
              <button type="button" onClick={handleUseDefault}>
                Impordi olemasoleva sõnabaasi
              </button>
            )}

            {!isFindMode && importError && (
              <p className="import-message">{importError}</p>
            )}
          </form>

          {isFindMode && (
            <div className="panel">
              <h2>{findResultTitle}</h2>
              {findResultTitle === 'Leitud anagrammid:' && data.map((word) => (
                <p key={word}>{word}</p>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="panel">
          <div className="loading">{Loading()}</div>
          <div className="loading-text">Importimine</div>
        </div>
      )}
    </div>
  )
}

export default App
