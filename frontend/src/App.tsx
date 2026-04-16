import './App.css'

function App() {
  return (
    <>
      <main className="Finder">
        <form action={'search'} method="get">
          <input name="query" />
          <button type="submit">Search</button>
        </form>
      </main>
      <main className="Import">
        <form action={'import'} method="post">
          <input name="query" />
          <button type="submit">Import</button>
        </form>
      </main>
    </>
  )
}

export default App
