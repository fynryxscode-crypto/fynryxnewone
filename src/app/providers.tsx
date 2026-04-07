import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,   // 5-minute stale time reduces redundant re-fetches
        gcTime: 10 * 60 * 1000,     // 10-minute garbage collection window
        retry: 1,
        refetchOnWindowFocus: false, // avoid re-fetches when user switches tabs
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { fontFamily: 'var(--font-inter)' },
        }}
      />
    </QueryClientProvider>
  )
}
