import './App.css'
import {
  QueryClientProvider
} from '@tanstack/react-query'
import { Ideas } from './components/Ideas';
import { queryClient } from './lib/queryClient';



function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Ideas />
    </QueryClientProvider>
  )
}

export default App
