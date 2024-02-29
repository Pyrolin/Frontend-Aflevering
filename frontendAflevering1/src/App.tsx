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

  return (
    <>

      <h1>Kunde information</h1>

      <form action="/my-handling-form-page" method="post">
  <ul>
    <label htmlFor="country">
      <span>Country:</span>
    </label>
    <select id="country" name="usercountry">
    <option value="danmark">Danmark</option>
    </select>
    <li>
      <label htmlFor="zip">Zip kode:</label>
      <input type="tal" id="zip" name="bruger_zip" />
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
      <input type="bogstaver" id="navn" name="bruger_navn" />
    </li>
    <li>
      <label htmlFor="telefon">Telefon nummer:</label>
      <input type="tal" id="nummer" name="bruger_nummer" />
    </li>
    <li>
      <label htmlFor="mail">Email:</label>
      <input type="bogstaver" id="land" name="bruger_land" />
    </li>
    <li>
      <label htmlFor="firma">(Optionel) Firma navn:</label>
      <input type="bogstaver" id="land" name="bruger_land" />
    </li>
    <li>
      <label htmlFor="vat">(Optionel) Firma VAT:</label>
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
