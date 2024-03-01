import './App.css'
import items from './assets/items.json'
import redx from './assets/redx.png'
import { useState } from 'react'

interface cartItem {
  id: string,
  name: string,
  price: number,
  totalPrice: number,
  quantity: number
}

function App() {
  let cartItems = [] as cartItem[]

  for (let i = 0; i < items.length; i++) {
    const itemID = items[i].id
    const itemName = items[i].name
    const itemPrice = items[i].price

    const item: cartItem = {
      id: itemID,
      name: itemName,
      price: itemPrice,
      totalPrice: itemPrice,
      quantity: 1
    };

    (cartItems).push(item)
  }
  
  const [cartItemsList, setcartItemsList] = useState(cartItems)

  function handleQuantityChange(updatedItem: cartItem, newValue: React.ChangeEvent<HTMLInputElement>) {

    const newTotalPrice = (Number(newValue.currentTarget.value) >= 5) ? updatedItem.price * Number(newValue.currentTarget.value) * 0.9 : updatedItem.price * Number(newValue.currentTarget.value)

    const newCardItems = cartItemsList.map((item) => {
      if (item.id === updatedItem.id) {
        return {...item, quantity: Number(newValue.currentTarget.value), totalPrice: newTotalPrice}
      } else {
        return item
      }
    })

    setcartItemsList(newCardItems)
    return
  }

  function deleteItem(item: cartItem) {
    const newCartItemsList = cartItemsList.filter(x => x.id !== item.id)

    setcartItemsList(newCartItemsList)  
  }
  
  function product(item: cartItem) {

    let totalPrice = item.price * item.quantity

    let productItem = <div key={item.id} id={item.id} className="product">
                          <p>{item.name} | Pris {item.price}kr. | </p>  
                          <input type='number' id='itemQuantity' name='itemQuantity' defaultValue={1} min={0} width={1} onInput={(input) => input.currentTarget.validity.valid||(input.currentTarget.value='')} onChange={(input) => handleQuantityChange(item, input)}></input>
                          <p> stk. | Beløb {totalPrice}kr.</p>
                          <img src={redx} alt="Red X" onClick={() => deleteItem(item)}></img>
                        </div>
    if(item.quantity>=5){
      totalPrice = totalPrice * 0.9
      productItem = <div key={item.id} id={item.id} className="product">
                          <p>{item.name} | Pris {item.price}kr. | </p>  
                          <input type='number' id='itemQuantity' name='itemQuantity' defaultValue={1} min={0} width={1} onInput={(input) => input.currentTarget.validity.valid||(input.currentTarget.value='')} onChange={(input) => handleQuantityChange(item, input)}></input>
                          <p> stk. | Beløb {totalPrice}kr. - 10% Rabat</p>
                          <img src={redx} alt="Red X" onClick={() => deleteItem(item)}></img>
                        </div>
    }
    return productItem
  }

  function productList() {
    const productItemList = cartItemsList.map((item: cartItem) => product(item))

    let total = 0

    for (let i = 0; i < cartItemsList.length; i++) {
      total+=cartItemsList[i].totalPrice
    }
    if (cartItemsList.length == 0){
      return <p>Din kurv er tom</p>
    }
    if (total > 300) {
      const prevTotal = total
      total = total * 0.9
      return <div className='products'>
      <ul>{productItemList}</ul>
      <p>Samlet rabat -{prevTotal*0.1}kr.</p>
      <p>I alt. {total}kr.</p>
    </div>
    } else {
      return <div className='products'>
      <ul>{productItemList}</ul>
      <p>I alt. {total}kr.</p>
    </div>
    }
  
  }
  
  function addressForm() {

    const [city, setzipRef] = useState(String)


    async function getZip(input: React.ChangeEvent<HTMLInputElement>) {
  
      const inputZip = input.currentTarget.value
  
      if (inputZip.length !== 4) {
        return
      }
  
      fetch("https://api.dataforsyningen.dk/postnumre")
        .then(response => response.json())
        .then((data: any) => {
          for (const zip of data) {
            if (zip.nr === inputZip) {
              const zipCity = zip.navn
      
              setzipRef(zipCity)
  
              return
            }
          }
        })
        .catch(function (err) {
          console.log("Unable to fetch -", err);
        });
  
        setzipRef("")
    }

    const [country, setCountry] = useState(String)

    function verifyNumber(input: React.ChangeEvent<HTMLInputElement>) {
      if (country === "danmark") {
        if (input.currentTarget.value.length !== 8) {
          input.currentTarget.classList.add("number_error")
        } else {
          input.currentTarget.classList.remove("number_error")
        }
      } else {
        input.currentTarget.classList.remove("number_error")
      }
  
  }

  function verifyVAT(input: React.ChangeEvent<HTMLInputElement>) {
    if (country === "danmark") {
      if (input.currentTarget.value.length !== 8) {
        input.currentTarget.classList.add("number_error")
      } else {
        input.currentTarget.classList.remove("number_error")
      }
    } else {
      input.currentTarget.classList.remove("number_error")
    }

}

function verifyEmail(input: React.ChangeEvent<HTMLInputElement>) {
  if (!input.currentTarget.validity.valid) {
    input.currentTarget.classList.add("number_error")
  } else {
    input.currentTarget.classList.remove("number_error")
  }
}

    return <>
    <form action="/my-handling-form-page" method="post">
      <ul>
      <label htmlFor="country">
      <span>Country:</span>
      </label>
      <select id="country" name="usercountry" onChange={(input) => setCountry(input.currentTarget.value)}>
      <option></option>
      <option value="danmark">Danmark</option>
      </select>
      <li>
      <label htmlFor="zip">Zip kode:</label>
      <input type="number" id="zip" name="bruger_zip" onInput={(input) => input.currentTarget.validity.valid||(input.currentTarget.value='')} onChange={(input) => getZip(input)}/>
      </li>
      <li>
      <label htmlFor="city">By</label>
      <input type="bogstaver" id="city" name="bruger_city" value={city} onChange={(input) => setzipRef(input.currentTarget.value)}/>
      </li>
      <li>
      <label htmlFor="adresse1">Adresse 1:</label>
      <input type="bogstaver" id="adresse1" name="bruger_adresse1" />
      </li>
      <li>
      <label htmlFor="adresse2">Adresse 2:</label>
      <input type="bogstaver" id="adresse2" name="bruger_adresse2" />
      </li>
      <li>
      <label htmlFor="navn">Navn:</label>
      <input type="bogstaver" id="adresse1" name="bruger_adresse1" />
      </li>
      <li>
      <label htmlFor="telefon">Telefon nummer:</label>
      <input type="number" id="nummer" name="bruger_nummer" onInput={(input) => input.currentTarget.validity.valid||(input.currentTarget.value='')} onChange={(input) => verifyNumber(input)} />
      </li>
      <li>
      <label htmlFor="email">Email:</label>
      <input type="email" id="land" name="bruger_land" onChange={(input) => verifyEmail(input)}/>
      </li>
      <li>
      <label htmlFor="firma">(Optionel) Firma navn:</label>
      <input type="bogstaver" id="land" name="bruger_land" />
      </li>
      <li>
      <label htmlFor="vat">(Optionel) Firma VAT:</label>
      <input type="number" id="land" name="bruger_land" onInput={(input) => input.currentTarget.validity.valid||(input.currentTarget.value='')} onChange={(input) => verifyVAT(input)}/>
      </li>
      </ul>
    </form>

    </>
  }

  return (
    <>

<h1>Leverings information</h1>
      {addressForm()}

<h1>Faktura information</h1>
      {addressForm()}

      <h1>Indkøbskurv</h1>

      <h3>UDSALG: Køb 5 af samme varer og få 10% rabat på dem alle!</h3>

      {productList()}

      </>
  )
}

export default App
