import { useState } from 'react'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/Hompage'

const router =createBrowserRouter([
  {path:"/",element:<HomePage/>}
])









function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <RouterProvider router={router}/>
    </>
  )
}

export default App
