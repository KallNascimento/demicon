import Content from './components/layout/Content'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'

export default function App() {
  return (
    <div className="App">
      <Router>
        <Content/>
      </Router>
    </div>
  )
}

