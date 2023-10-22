import { useEffect, useState } from 'react'
import "./Goals.css"
import { RiDeleteBin2Fill } from "react-icons/ri"
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"; 
import db from '../../firebase';
import { useNavigate } from 'react-router-dom';

function Goals({ user }) {
    const [docs, setDocs] = useState([]);
    const navigate = useNavigate();
    const [data, setData] = useState({
        title: "",
        amount_needed: 0,
        amount_saved: 0,
    })

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    }
    useEffect(() => {
        if(user.name === null || user.name === "" || user.photoUrl === null || user.photoUrl === "" ||
        user.email === null || user.email === ""){
            navigate("/login")
        }
        const getGoalsDoc = async () => {
            const querySnapshot = await getDocs(collection(db, "Users", user?.email, "Goals"));
            const tempDoc = []
            querySnapshot.forEach((doc) => {
                tempDoc.push({ id: doc.id, ...doc.data() })
            })
            setDocs(tempDoc)
        }
        getGoalsDoc()
    },[docs])

    const addData = async (e) => {
        e.preventDefault();
        console.log(data)
        if(Number(data.amount_saved) <= Number(data.amount_needed)){
            try {
                const docRef = await addDoc(collection(db, "Users", user?.email, "Goals"), {
                    ...data
                });
                console.log("Document written with ID: ", docRef.id);
                alert("Goal successfully added")
                setData({
                    title: "",
                    amount_needed: 0,
                    amount_saved: 0,
                })
            } catch (er) {
                console.error("Error adding document: ", er);
            }
        } else {
            alert("Please make sure that amount you need is greater than or equal to amount you saved")
            setData({
                title: "",
                amount_needed: 0,
                amount_saved: 0,
            })
        }
        
    }

    const deleteGoal = async (id) => {
        try{
            await deleteDoc(doc(db, "Users", user?.email, "Goals", id))
        } catch (er) {
            console.error("Error deleting document: ", er);
        }
    }

    return (
        <div className='goals'>
            <h1 className='main__expenseHeading'>Goals</h1>
            <div className='goals__addGoal'>
                <div>
                    <label className='sidebar__labels' htmlFor='title'>Title <span className='sidebar__reqd'>*</span></label>
                    <input
                        id='title'
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleDataChange}
                        className='goals__input'
                        placeholder='Add title'
                    />
                </div>
                <div>
                    <label className='sidebar__labels' htmlFor='amount_needed'>Amount Needed <span className='sidebar__reqd'>*</span></label>
                    <input
                        className='goals__input'
                        id='amount_needed'
                        type="number"
                        name="amount_needed"
                        placeholder='amount_needed'
                        value={data.amount_needed}
                        onChange={handleDataChange}
                    />
                </div>
                
                <div>
                    <label className='sidebar__labels' htmlFor='amount_saved'>Amount Saved<span className='sidebar__reqd'>*</span></label>
                    <input
                        className='goals__input'
                        id='amount_saved'
                        type="number"
                        placeholder='amount_saved'
                        name="amount_saved"
                        value={data.amount_saved}
                        onChange={handleDataChange}
                    />
                </div>
                <div>
                    <button 
                    onClick={addData}
                    className='goals__submitButton'>
                        Add
                    </button>
                </div>
                
            </div>
            <div className='main__expenseTable goals__table'>
                <div className='main__expenseTableHead'>
                    <div className='goals__expenseTableHeadCol'>Title</div>
                    <div className='goals__expenseTableHeadCol'>Amount Needed</div>
                    <div className='goals__expenseTableHeadCol'>Amount Saved</div>
                    <div className='goals__expenseTableHeadCol'>Progress</div>
                    <div className='goals__expenseTableHeadCol goals__options'></div>
                </div>

                {docs.map((doc) => (
                    <div key={doc.id} className='main__expenseTableHead main__expenseRow'>
                        <div className='goals__expenseTableHeadCol'>{doc.title}</div>
                        <div className='goals__expenseTableHeadCol'>{doc.amount_needed}</div>
                        <div className='goals__expenseTableHeadCol'>{doc.amount_saved}</div>
                        <div className='goals__expenseTableHeadCol'>
                            <div className='goals__progressBar'>
                                <div className='goals__complete' style={{width: `${(doc.amount_saved/doc.amount_needed) * 100}%`}}></div>
                                <div></div>
                            </div>
                        </div>
                        <div className='goals__expenseTableHeadCol goals__options'>
                            <RiDeleteBin2Fill 
                            onClick={() => deleteGoal(doc.id)} 
                            className='goals__option goals__deleteOption'/>
                        </div>
                    </div>
                ))}

                    
            </div>
        </div>
    );
}

export default Goals