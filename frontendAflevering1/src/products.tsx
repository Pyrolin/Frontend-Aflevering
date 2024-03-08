import { cartItem } from "./types.ts"
import redx from "./assets/redx.png"
import { useState } from "react"
import items from "./assets/items.json"

function deleteItem(
  item: cartItem,
  cartItemsList: cartItem[],
  setcartItemsList: React.Dispatch<React.SetStateAction<cartItem[]>>
) {
  const newCartItemsList = cartItemsList.filter((x) => x.id !== item.id)

  setcartItemsList(newCartItemsList)
}

function handleQuantityChange(
  updatedItem: cartItem,
  newValue: React.ChangeEvent<HTMLInputElement>,
  cartItemsList: cartItem[],
  setcartItemsList: React.Dispatch<React.SetStateAction<cartItem[]>>
) {
  const newTotalPrice =
    Number(newValue.currentTarget.value) >= 5
      ? updatedItem.price * Number(newValue.currentTarget.value) * 0.9
      : updatedItem.price * Number(newValue.currentTarget.value)

  const newCardItems = cartItemsList.map((item) => {
    if (item.id === updatedItem.id) {
      return {
        ...item,
        quantity: Number(newValue.currentTarget.value),
        totalPrice: newTotalPrice,
      }
    } else {
      return item
    }
  })

  setcartItemsList(newCardItems)
  return
}

function product(
  item: cartItem,
  cartItemsList: cartItem[],
  setcartItemsList: React.Dispatch<React.SetStateAction<cartItem[]>>
) {
  let totalPrice = item.price * item.quantity

  let productItem = (
    <div key={item.id} id={item.id} className="product">
      <p>
        {item.name} | Pris {item.price}kr. |{" "}
      </p>
      <input
        type="number"
        id="itemQuantity"
        name="itemQuantity"
        defaultValue={1}
        min={0}
        width={1}
        onInput={(input) =>
          input.currentTarget.validity.valid || (input.currentTarget.value = "")
        }
        onChange={(input) =>
          handleQuantityChange(item, input, cartItemsList, setcartItemsList)
        }
      ></input>
      <p> stk. | Beløb {totalPrice}kr.</p>
      <img
        src={redx}
        alt="Red X"
        onClick={() => deleteItem(item, cartItemsList, setcartItemsList)}
      ></img>
    </div>
  )
  if (item.quantity >= 5) {
    totalPrice = totalPrice * 0.9
    productItem = (
      <div key={item.id} id={item.id} className="product">
        <p>
          {item.name} | Pris {item.price}kr. |{" "}
        </p>
        <input
          type="number"
          id="itemQuantity"
          name="itemQuantity"
          defaultValue={1}
          min={0}
          width={1}
          onInput={(input) =>
            input.currentTarget.validity.valid ||
            (input.currentTarget.value = "")
          }
          onChange={(input) =>
            handleQuantityChange(item, input, cartItemsList, setcartItemsList)
          }
        ></input>
        <p> stk. | Beløb {totalPrice}kr. - 10% Rabat</p>
        <img
          src={redx}
          alt="Red X"
          onClick={() => deleteItem(item, cartItemsList, setcartItemsList)}
        ></img>
      </div>
    )
  }
  return productItem
}

function productList(
  cartItemsList: cartItem[],
  setcartItemsList: React.Dispatch<React.SetStateAction<cartItem[]>>
) {
  const productItemList = cartItemsList.map((item: cartItem) =>
    product(item, cartItemsList, setcartItemsList)
  )

  let total = 0

  for (let i = 0; i < cartItemsList.length; i++) {
    total += cartItemsList[i].totalPrice
  }
  if (cartItemsList.length == 0) {
    return <p>Din kurv er tom</p>
  }
  if (total > 300) {
    const prevTotal = total
    total = total * 0.9
    return (
      <div className="products">
        <ul>{productItemList}</ul>
        <p>Samlet rabat -{prevTotal * 0.1}kr.</p>
        <p>I alt. {total}kr.</p>
      </div>
    )
  } else {
    return (
      <div className="products">
        <ul>{productItemList}</ul>
        <p>I alt. {total}kr.</p>
      </div>
    )
  }
}

export function products() {
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
      quantity: 1,
    }

    cartItems.push(item)
  }

  const [cartItemsList, setcartItemsList] = useState(cartItems)

  return productList(cartItemsList, setcartItemsList)
}
