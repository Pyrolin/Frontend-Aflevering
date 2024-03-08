import { useState } from "react"

async function getZip(
  input: React.ChangeEvent<HTMLInputElement>,
  setzipRef: React.Dispatch<React.SetStateAction<string>>
) {
  const inputZip = input.currentTarget.value

  if (inputZip.length !== 4) {
    return
  }

  fetch("https://api.dataforsyningen.dk/postnumre")
    .then((response) => response.json())
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
      console.log("Unable to fetch -", err)
    })

  setzipRef("")
}

function verifyNumber(
  input: React.ChangeEvent<HTMLInputElement>,
  country: string
) {
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

function verifyVAT(
  input: React.ChangeEvent<HTMLInputElement>,
  country: string
) {
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

function addressForm(
  city: string,
  setzipRef: React.Dispatch<React.SetStateAction<string>>,
  country: string,
  setCountry: React.Dispatch<React.SetStateAction<string>>
) {
  return (
    <>
      <form action="/my-handling-form-page" method="post">
        <ul>
          <label htmlFor="country">
            <span>Country:</span>
          </label>
          <select
            id="country"
            name="usercountry"
            onChange={(input) => setCountry(input.currentTarget.value)}
          >
            <option></option>
            <option value="danmark">Danmark</option>
          </select>
          <li>
            <label htmlFor="zip">Zip kode:</label>
            <input
              type="number"
              id="zip"
              name="bruger_zip"
              onInput={(input) =>
                input.currentTarget.validity.valid ||
                (input.currentTarget.value = "")
              }
              onChange={(input) => getZip(input, setzipRef)}
            />
          </li>
          <li>
            <label htmlFor="city">By</label>
            <input
              type="bogstaver"
              id="city"
              name="bruger_city"
              value={city}
              onChange={(input) => setzipRef(input.currentTarget.value)}
            />
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
            <input
              type="number"
              id="nummer"
              name="bruger_nummer"
              onInput={(input) =>
                input.currentTarget.validity.valid ||
                (input.currentTarget.value = "")
              }
              onChange={(input) => verifyNumber(input, country)}
            />
          </li>
          <li>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="land"
              name="bruger_land"
              onChange={(input) => verifyEmail(input)}
            />
          </li>
          <li>
            <label htmlFor="firma">(Optionel) Firma navn:</label>
            <input type="bogstaver" id="land" name="bruger_land" />
          </li>
          <li>
            <label htmlFor="vat">(Optionel) Firma VAT:</label>
            <input
              type="number"
              id="land"
              name="bruger_land"
              onInput={(input) =>
                input.currentTarget.validity.valid ||
                (input.currentTarget.value = "")
              }
              onChange={(input) => verifyVAT(input, country)}
            />
          </li>
        </ul>
      </form>
    </>
  )
}

export function address() {
  const [city, setzipRef] = useState(String)

  const [country, setCountry] = useState(String)

  return addressForm(city, setzipRef, country, setCountry)
}
