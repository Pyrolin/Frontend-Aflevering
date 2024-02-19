import './App.css'

function App() {
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

      <div class="vare">
      <p>ewtwewe</p>
      </div>

      </>
  )
}

export default App
