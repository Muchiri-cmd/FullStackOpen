import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationProvider } from './context/notificationContext'
import { UserProvider } from './context/userContext'
import App from './App'

const queryClient =  new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client = {queryClient}>
    <UserProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </UserProvider>
  </QueryClientProvider>

)