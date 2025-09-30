import './App.css'
import {
  QueryClientProvider
} from '@tanstack/react-query'
import { Ideas } from './components/Ideas';
import { queryClient } from './lib/queryClient';



function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className='min-h-screen w-screen flex items-center justify-center bg-muted/40'>
        <Ideas />
      </div>
      
    </QueryClientProvider>
  )
}

export default App
