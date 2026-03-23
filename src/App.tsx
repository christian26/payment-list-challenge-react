import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PageLayout } from "./components/templates";
import { PaymentsPage } from "./features/payments";

// This is required for tests to pass if ReactQuery is used
// you don't have to use this library in your solution.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // disable retries is required for tests to pass if ReactQuery is used
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PageLayout>
          <Routes>
            <Route path="/" element={<PaymentsPage />} />
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
