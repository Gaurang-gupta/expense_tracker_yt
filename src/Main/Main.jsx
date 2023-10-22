import { useEffect } from 'react'
import { deleteDoc, doc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import db from '../../firebase';
import { RiDeleteBin2Fill } from "react-icons/ri"
import "./Main.css"
import ChartComponent from '../components/ChartComponent';

function Main({docs, getExpenseDocs, user, sortedDocs}) {
    const navigate = useNavigate();

    useEffect(() => {
        if(user.name === null || user.name === "" || user.photoUrl === null || user.photoUrl === "" ||
        user.email === null || user.email === ""){
            navigate("/login")
        }
        if(user.email !== null || user.email !== "" || docs.length === 0){
            getExpenseDocs()
        }
    },[])

    useEffect(() => {}, [docs])

    const deleteExpense = async (id) => {
        try{
            await deleteDoc(doc(db, "Users", user.email, "expenses", id))
            getExpenseDocs()
        } catch (er) {
            console.error("Error deleting document: ", er);
        }
    }
    return (
        <div className='main'>
            <div className='main__graph'>
               <ChartComponent data={sortedDocs}/>
            </div>
            <div className='main__expenses'>
                <h1 className='main__expenseHeading'>Recent expenses</h1>
                <div className='main__expenseTable'>
                    <div className='main__expenseTableHead'>
                        <div className='main__expenseTableHeadCol'>Date</div>
                        <div className='main__expenseTableHeadCol2'>Title</div>
                        <div className='main__expenseTableHeadCol'>Amount</div>
                        <div className='main__expenseTableHeadColOption'></div>
                    </div>

                    {docs?.map((doc, index) => ( index < 7 && 
                        <div key={doc.id} className='main__expenseTableHead main__expenseRow'>
                            <div className='main__expenseTableHeadCol'>{doc.date}</div>
                            <div className='main__expenseTableHeadCol2'>{doc.title}</div>
                            <div className='main__expenseTableHeadCol'>{doc.amount}</div>
                            <div className='main__expenseTableHeadColOption'><RiDeleteBin2Fill className='main__expenseTableOption' onClick={() => deleteExpense(doc.id)}/></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Main