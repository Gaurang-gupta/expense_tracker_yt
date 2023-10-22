import { useEffect } from 'react'
import { deleteDoc, doc } from "firebase/firestore"; 
import db from '../../firebase';
import "./AllExpenses.css"
import { RiDeleteBin2Fill } from "react-icons/ri"
import { useNavigate } from 'react-router-dom';
function AllExpenses({ getExpenseDocs, docs, user }) {
    const navigate = useNavigate();

    useEffect(() => {
        if(user.name === null || user.name === "" || user.photoUrl === null || user.photoUrl === "" ||
        user.email === null || user.email === ""){
            navigate("/login")
        }
        if(user.email !== null || user.email !== ""|| docs.length === 0){
            getExpenseDocs()
        }
    },[])
    useEffect(() => {}, [docs])
    const deleteExpense = async (id) => {
        try{
            await deleteDoc(doc(db, "Users", user?.email, "expenses", id))
            getExpenseDocs()
        } catch (er) {
            console.error("Error deleting document: ", er);
        }
    }
  return (
    <div className='allExpenses'>
        <h1 className='main__expenseHeading'>All expenses</h1>
        <div className='allExpenses__expenseTable'>
            <div className='main__expenseTableHead'>
                <div className='main__expenseTableHeadCol'>Date</div>
                <div className='main__expenseTableHeadCol2'>Title</div>
                <div className='main__expenseTableHeadCol'>Amount</div>
                <div className='main__expenseTableHeadColOption'></div>
            </div>
            {docs?.map(doc => (
                <div key={doc.id} className='main__expenseTableHead main__expenseRow'>
                    <div className='main__expenseTableHeadCol'>{doc.date}</div>
                    <div className='main__expenseTableHeadCol2'>{doc.title}</div>
                    <div className='main__expenseTableHeadCol'>{doc.amount}</div>
                    <div className='main__expenseTableHeadColOption'><RiDeleteBin2Fill className='main__expenseTableOption' onClick={() => deleteExpense(doc.id)}/></div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AllExpenses