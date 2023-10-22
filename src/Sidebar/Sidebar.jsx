import "./Sidebar.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore"; 
import db from "../../firebase"
import { useNavigate } from 'react-router-dom';

function Sidebar({ user, getExpenseDocs }) {
    const [salaryUpdateInput, setSalaryUpdateInput] = useState(false);
    const [salary, setSalary] = useState(0)
    const navigate = useNavigate();
    useEffect(() => {
        if(user.name === null || user.name === "" || user.photoUrl === null || user.photoUrl === "" ||
        user.email === null || user.email === ""){
            navigate("/login")
        }
        if(user.email !== null || user.email !== ""){
            const getExpenseDocs = async () => {
                const querySnapshot = await getDoc(doc(db, 'Users', user.email))
                const queryData = querySnapshot.data()
                setSalary(queryData.salary)
            }
            getExpenseDocs()
        }
    },[])

    const [data, setData] = useState({
        title: "",
        date: "",
        amount: 0,
    })

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }

    const addData = async (e) => {
        e.preventDefault();
        if(user.email !== null || user.email !== ""){
            if(data.title === "" || data.date === "" || data.amount === 0){
                alert("Please fill all the fields")
            }
            else{
                try {
                    const docRef = await addDoc(collection(db, "Users", user.email, "expenses"), {
                        ...data
                    });
                    console.log("Document written with ID: ", docRef.id);
                    alert("Expense successfully added")
                    setData({
                        title: "",
                        date: "",
                        amount: 0,
                    })
                    getExpenseDocs()
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
        }
    }

    const handleSalaryUpdate = async (e) => {
        e.preventDefault();
        const docRef = doc(db, "Users", user?.email);

        await updateDoc(docRef, {
            salary: Number(salary)
        });

        setSalaryUpdateInput(!salaryUpdateInput)
    }

    const handleSetSalary = (e) => {
        setSalary(e.target.value)
    }

    return (
        <aside className="sidebar">
            <div className='sidebar__monthlyIncome'>
                <div className='sidebar__monthlyIncomeWrapper'>
                    <div className='sidebar__monthly'>
                        Monthly Income
                    </div>
                    {salaryUpdateInput?
                    <form action="#" onSubmit={(e) => handleSalaryUpdate(e)} className="sidebar__salaryUpdate">
                        <input 
                            id="salary"
                            type='number'
                            placeholder="Add salary"
                            name="salary"
                            className="sidebar__salaryUpdateInput"
                            value={salary}
                            onChange={handleSetSalary}
                        />
                    </form>
                    : 
                    <div onClick={() => setSalaryUpdateInput(!salaryUpdateInput)} className='sidebar__income'>
                        {salary}
                    </div>
                    }
                    
                </div>
            </div>
            <div className='sidebar__expenseContainer'>
                <h1 className='sidebar__expenseHeading'>Add Expense</h1>
                <div className='sidebar__addExpense'>
                    <label className='sidebar__labels' htmlFor='title'>Title <span className='sidebar__reqd'>*</span></label>
                    <input
                        id='title'
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleDataChange}
                        className='sidebar__input'
                        placeholder='Add title'
                    />
                    <label className='sidebar__labels' htmlFor='date'>Date <span className='sidebar__reqd'>*</span></label>
                    <input
                        className='sidebar__input'
                        id='date'
                        type="date"
                        name="date"
                        value={data.date}
                        onChange={handleDataChange}
                    />
                    <label className='sidebar__labels' htmlFor='amount'>Amount <span className='sidebar__reqd'>*</span></label>
                    <input
                        className='sidebar__input'
                        id='amount'
                        type="number"
                        placeholder='Amount'
                        name="amount"
                        value={data.amount}
                        onChange={handleDataChange}
                    />
                </div>
                <button onClick={(e) => addData(e)} className='sidebar__addExpenseButton sidebar__extraPadding'>Add</button>
            </div>
            <div className='sidebar__expenseOptions'>
                <button className='sidebar__addExpenseButton sidebar__expenseOption'>
                    <Link to='/' className='sidebar__link'>Home</Link>
                </button>

                <button className='sidebar__addExpenseButton sidebar__expenseOption'>
                    <Link to='/expenses/all' className='sidebar__link'>All Expenses</Link>
                </button>
                <button className='sidebar__addExpenseButton sidebar__expenseOption'>
                    <Link to="/goals" className='sidebar__link'>Goals</Link>
                </button>
            </div>
        </aside>
    )
}

export default Sidebar