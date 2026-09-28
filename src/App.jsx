import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Stats from './pages/Stats'
import NotFound from './pages/NotFound'
import { useTasks } from './hooks/useTasks'
import './App.css'

/**
 * Root of the application.
 *
 * App is the only place that owns the task state, so that both pages
 * see exactly the same list. The state and its helper functions are
 * passed down as props - this is "lifting state up" and it is the
 * main data flow pattern used in this project.
 */
export default function App() {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
    reorderTasks,
  } = useTasks()

  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <main className="app__main">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  tasks={tasks}
                  addTask={addTask}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  toggleTask={toggleTask}
                  clearCompleted={clearCompleted}
                  reorderTasks={reorderTasks}
                />
              }
            />
            <Route path="/stats" element={<Stats tasks={tasks} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="app__footer">
          <p>
            TaskFlow &mdash; built with React for the React course project. Your data is
            saved in the browser.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  )
}
