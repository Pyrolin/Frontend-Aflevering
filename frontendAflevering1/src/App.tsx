import './App.css'
import items from './assets/items.json'
import { useState } from 'react'

interface item {
  id: string,
  name: string,
  price: number,
  currency: string,
  rebateQuantity: number,
  rebatePercent: number,
  upsellProductId: string | null
}

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

  function handleQuantityChange(updatedItem: cartItem) {

    const newCardItems = cartItemsList.map((item) => {
      if (item.id === updatedItem.id) {
        return {...item, quantity: item.quantity + 1}
      } else {
        return item
      }
    })

    setcartItemsList(newCardItems)
    return
  }
  
  function product(item: cartItem) {
    const productItem = <div id={item.id} className="product" onClick={() => handleQuantityChange(item)}>
                          <p>{item.name} | Pris {item.price}kr. | {item.quantity} stk. | Beløb {item.price * item.quantity}kr.</p>
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


        <section> 
          <div>
            <label htmlFor="Navn">Navn:</label>
            <input type="text" id="Navn" name="Navn" placeholder=""/>
          </div>

          <div>
            <label htmlFor="Efternavn">Efternavn:</label>
            <input type="text" id="Efternavn" name="Efternavn" placeholder=""/>
          </div>
        </section>

        
        <section>
          <div>
            <label htmlFor="Adresse">Adresse:</label>
            <input type="text" id="Adresse" name="Adresse" placeholder=""/>
          </div>

          <div>
            <label htmlFor="By">By:</label>
            <input type="text" id="By" name="By" placeholder=""/>
          </div>
        </section>

        
        <section>
          <div>
            <label htmlFor="PostNummer">Post nummer:</label>
            <input type="text" id="PostNummer" name="PostNummer" placeholder=""/>
          </div>

          <div>
            <label htmlFor="Mail">Mail:</label>
            <input type="text" id="Mail" name="Mail" placeholder=""/>
          </div>
        </section>

        
        <input type="checkbox" id="pakke1" name="pakke1" value="Post Nord"/>
        <label htmlFor="pakke1">Post Nord</label>
        <input type="checkbox" id="pakke2" name="pakke2" value="DAO"/>
        <label htmlFor="pakke2">DAO</label>
        <input type="checkbox" id="pakke3" name="pakke3" value="GLS"/>
        <label htmlFor="pakke3">GLS</label>
      

      <h1>Indkøbskurv</h1>

      {productList()}

      </>
  )
}

export default App
