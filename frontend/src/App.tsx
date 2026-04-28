import { ThreeDot } from 'react-loading-indicators'
import { useTranslation } from 'react-i18next'
import i18n from './i18n'
import { useState } from 'react'
import './App.css'

function App() {
  const [isFindMode, setIsFindMode] = useState(true)
  const [text, setText] = useState('')
  const [data, setData] = useState<string[]>([])
  const [findResultTitle, setFindResultTitle] = useState('Found anagrams:')
  const [importError, setImportError] = useState('')
  const [isWordbaseImporting, setIsWordbaseImporting] = useState(false)

  function Loading() {
    return <ThreeDot color={['#00e5ff', '#00c3ce', '#009fa8']} />
  }

  const { t } = useTranslation()

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
    const exampleUrl = t('example_url')
    setImportError('')
    setText(exampleUrl)
    importRequest(exampleUrl)
  }

  function findRequest(text: string) {
    const trimmedWord = text.trim()
    if (!trimmedWord) {
      setData([])
      setFindResultTitle('Enter a word!')
      return
    }

    setFindResultTitle('Found anagrams:')
    setData([])
    const word = encodeURIComponent(trimmedWord)

    fetch(`${import.meta.env.VITE_API_URL}/wordbase/find/${word}`, { method: 'GET' })
      .then((response) => {
        if (response.status === 404) {
          setData([])
          setFindResultTitle('Word Was not found')
          return null
        }
        if (response.status === 502) {
          setData([])
          setFindResultTitle('Backend does not work')
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
          setFindResultTitle('Found anagrams:')
        } else {
          setData([])
          setFindResultTitle('Word missing from database:')
        }
      })
      .catch((error) => {
        setData([])
        setFindResultTitle('Failed to get, try again')
        console.error(error)
      })
  }

  function importRequest(text: string) {
    if (!text.trim()) {
      setImportError('Enter URL')
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
          throw new Error('Importing failed, check URL')
        }
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then(() => {
        setIsWordbaseImporting(false)
        setImportError('Wordbase imported')
      })
      .catch((error) => {
        setIsWordbaseImporting(false)
        setImportError('Importing failed, check URL')
        console.error(error)
      })
  }

  return (
    <div className="page">
        <div className='language-switch'>
        <button className='language-switch button' onClick={() => i18n.changeLanguage('eng')}>ENG</button>
        <button className='language-switch button' onClick={() => i18n.changeLanguage('est')}>EST</button>
        </div>
      <header className="title">
        <h1>{t('Anagram Solver')}</h1>
      </header>

      <div className="mode-switch">
        <button
          type="button"
          className={isFindMode ? 'mode-switch__button active' : 'mode-switch__button'}
          onClick={() => { setIsFindMode(true); setText("") }}
        >
          {t('Find anagram')}
        </button>
        <button
          type="button"
          className={!isFindMode ? 'mode-switch__button active' : 'mode-switch__button'}
          onClick={() => { setIsFindMode(false); setText("") }}
        >
          {t('Import wordbase (URL)')}
        </button>
      </div>

      {!isWordbaseImporting ? (
        <div className="panel">
          <h2>{isFindMode ? t('Find anagram') : t('Import wordbase (URL)')}</h2>

          <form onSubmit={handleSubmit} className="form">
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={isFindMode ? t('listen') : t('placeholder_url')}
            />

            <button type="submit">
              {isFindMode ? t('Find') : t('Import')}
            </button>

            {!isFindMode && (
              <button type="button" onClick={handleUseDefault}>
                {t('Import example wordbase')}
              </button>
            )}

            {!isFindMode && importError && (
              <p className="import-message">{t(importError)}</p>
            )}
          </form>

          {isFindMode && (
            <div className="panel">
              <h2>{t(findResultTitle)}</h2>
              {findResultTitle === 'Found anagrams:' && data.map((word) => (
                <p key={word}>{word}</p>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="panel">
          <div className="loading">{Loading()}</div>
          <div className="loading-text">{t('Importing')}</div>
        </div>
      )}
    </div>
  )
}

export default App