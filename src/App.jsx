import React from 'react'
import SortingVisualization from './sortingVisualizer/SortingVisualization'
import Menu from './Menu'
import './App.css'
const App = () => {
  return (
      <div className='App'>
        <Menu/>
        <SortingVisualization/>
      </div>
    
  )
}

export default App