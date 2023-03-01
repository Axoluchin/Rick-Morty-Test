import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './styles/App.scss'

const App = () => (
  <div className="App">
    <RouterProvider router={router} />
  </div>
)

export default App
