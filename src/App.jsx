import { useState } from 'react'
import "./App.css"
import { Route, Routes } from "react-router-dom";
import Sidebar from './Sidebar/Sidebar.jsx'
import Navbar from './Navbar/Navbar.jsx'
import Main from './Main/Main.jsx'
import Goals from './Goals/Goals.jsx'
import AllExpenses from './AllExpenses/AllExpenses.jsx'
import Login from './Login/Login'
import { MyContext } from "./MyContext"
import { collection, getDocs} from "firebase/firestore"; 
import db from '../firebase';

function App() {
    const [user, setUser] = useState({
        name: "",
        photoUrl: "",
        email: "",
    });

    const [docs, setDocs] = useState([]);
    const [sortedDocs, setSortedDocs] = useState([]);

    const getExpenseDocs = async () => {
        try{
          const querySnapshot = await getDocs(collection(db, "Users", user.email, "expenses"));
          const tempDoc = []
          const sortedTempDocs = []
          querySnapshot.forEach((doc) => {
              tempDoc.push({ id: doc.id, ...doc.data() })
          })
          
          const newData = []
          tempDoc.map(dat => {
              newData.push({
                  ...dat,
                  amount: Number(dat.amount),
              })
              sortedTempDocs.push({
                ...dat,
                amount: Number(dat.amount),
              })
          })
          newData.sort((a, b) => {
            let xa = new Date(a.date)
            let xb = new Date(b.date)
            return xb - xa
          })
          setDocs(newData)
          sortedTempDocs.sort((a, b) => {
            let xa = new Date(a.date)
            let xb = new Date(b.date)
            return xa - xb
          })
          setSortedDocs(sortedTempDocs)
        } catch (er) {
          console.log("Error getting documents", er)
        }
    }

  return (
    <div className='app'>
        <Routes>
          <Route path={"/"} element={
          <main className='app__container'>
            <Sidebar user={user} getExpenseDocs={getExpenseDocs}/>
            <div className='app__main'>
              <Navbar user={user} setUser={setUser}/>
              <Main docs={docs} getExpenseDocs={getExpenseDocs} user={user} sortedDocs={sortedDocs}/>
            </div>
          </main>
          }/>

          <Route path={"/goals"} element={
          <main className='app__container'>
            <Sidebar user={user}/>
            <div className='app__main'>
              <Navbar user={user} setUser={setUser}/>
              <Goals user={user}/>
            </div>
          </main>
          }/>

          <Route path={"/login"} element={
          <main className='app__container'>
            <Login user={user} setUser={setUser}/>
          </main>
          }/>

          <Route path={"/expenses/all"}
            element={
                <main className='app__container'>
                  <Sidebar user={user}/>
                  <div className='app__main'>
                    <Navbar user={user} setUser={setUser}/>
                    <AllExpenses docs={docs} getExpenseDocs={getExpenseDocs} user={user}/>
                  </div>
                </main>
            }
          />


        </Routes>
    </div>
  )
}

export default App