import './App.css'
import {
  QueryClientProvider
} from '@tanstack/react-query'
import { Ideas } from './components/Ideas';
import { queryClient } from './lib/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';



function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className='min-h-screen w-screen flex items-start justify-center bg-muted/40 py-5'>
        <Ideas />
      </div>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

export default App
