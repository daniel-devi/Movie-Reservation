import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './css/index.css'
import { loadStripe } from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51P6HRuRqZrICNZbvfCo9VJObtm0NklPqQBMVXcawcyg2QfCv5MEs1i4qq7uYNQJcZ4JyFbGhwSfMbqAS1QdTAAit00D4pUXLAJ')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Elements stripe={stripePromise}> 
    <App />
    </Elements>
  </StrictMode>,
)
