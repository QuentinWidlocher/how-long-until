import { Route, Router, Routes } from 'solid-app-router'
import type { Component } from 'solid-js'
import EditTimer, { loader as editTimerLoader } from './routes/EditTimer'
import Home, { loader as homeLoader } from './routes/Home'

const App: Component = () => {
  return (
    <main class="min-h-screen flex flex-col w-full sm:p-5 md:p-10">
      <div class="card flex-grow md:flex-grow-0 w-full md:w-1/2 lg:w-2/3 xl:w-1/3 md:mx-auto bg-base-200">
        <div class="card-body">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} data={homeLoader} />
              <Route path="/timer/new" element={<EditTimer new />} />
              <Route path="/timer/:id" element={<EditTimer />} data={editTimerLoader} />
            </Routes>
          </Router>
        </div>
      </div>
    </main>
  )
}

export default App
