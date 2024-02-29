import './App.css'
import items from './assets/items.json'
import redx from './assets/redx.png'
import { useState } from 'react'

interface cartItem {
  id: string,
  name: string,
  price: number,
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
      quantity: 1
    };

    (cartItems).push(item)
  }

  const [cartItemsList, setcartItemsList] = useState(cartItems)

  function handleQuantityChange(updatedItem: cartItem, newValue: React.ChangeEvent<HTMLInputElement>) {

    const newCardItems = cartItemsList.map((item) => {
      if (item.id === updatedItem.id) {
        return {...item, quantity: Number(newValue.currentTarget.value)}
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
    const productItem = <div key={item.id} id={item.id} className="product">
                          <p>{item.name} | Pris {item.price}kr. | </p>  
                          <input type='number' id='itemQuantity' name='itemQuantity' defaultValue={1} min={0} width={1} onInput={(input) => input.currentTarget.validity.valid||(input.currentTarget.value='')} onChange={(input) => handleQuantityChange(item, input)}></input>
                          <p> stk. | Beløb {item.price * item.quantity}kr.</p>
                          <img src={redx} alt="Red X" onClick={() => deleteItem(item)}></img>
                        </div>
    return productItem
  }

  function productList() {
    const productItemList = cartItemsList.map((item: cartItem) => product(item))

    let total = 0

    for (let i = 0; i < cartItemsList.length; i++) {
      total+=cartItemsList[i].price*cartItemsList[i].quantity
    }

    return <div className='products'>
      <ul>{productItemList}</ul>
      <p>I alt. {total}kr.</p>
    </div>
  
  }

  return (
    <>

      <h1>Kunde information</h1>

      <form action="/my-handling-form-page" method="post">
  <ul>
    <li>
      <label for="country">Land:</label>
      <input type="bogstaver" id="land" name="bruger_land" />
    </li>
    <li>
      <label for="zip">Zip kode:</label>
      <input type="tal" id="zip" name="bruger_zip" />
    </li>
    <li>
      <label for="adresse1">Adresse 1</label>
      <input type="bogstaver" id="adresse1" name="bruger_adresse1" />
    </li>
    <li>
      <label for="adresse2">Adresse 2</label>
      <input type="bogstaver" id="adresse2" name="bruger_adresse2" />
    </li>
    <li>
      <label for="navn">Navn</label>
      <input type="bogstaver" id="adresse1" name="bruger_adresse1" />
    </li>
    <li>
      <label for="telefon">Telefonnummer:</label>
      <input type="tal" id="nummer" name="bruger_nummer" />
    </li>
    <li>
      <label for="mail">Email</label>
      <input type="bogstaver" id="land" name="bruger_land" />
    </li>
    <li>
      <label for="firma">(Optionel) Firma navn:</label>
      <input type="bogstaver" id="land" name="bruger_land" />
    </li>
    <li>
      <label for="vat">(Optionel) Firma VAT:</label>
      <input type="tal" id="land" name="bruger_land" />
    </li>
  </ul>
</form>








      <h1>Indkøbskurv</h1>

      {productList()}

      </>
  )
}

export default App
