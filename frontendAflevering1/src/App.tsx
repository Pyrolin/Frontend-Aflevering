import "./App.css"
import { products } from "./products.tsx"
import { address } from "./address.tsx"

function App() {
  return (
    <>
      <h1>Leverings information</h1>
      {address()}

      <h1>Faktura information</h1>
      {address()}

      <h1>Indkøbskurv</h1>

      <h3>UDSALG: Køb 5 af samme varer og få 10% rabat på dem alle!</h3>

      {products()}
    </>
  )
}

export default App
