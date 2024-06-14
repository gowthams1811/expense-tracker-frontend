import { useState } from "react";
import ExpenseCard from "./components/ExpenseCard";
import ExpenseForm from "./components/ExpenseForm";


const expenses=[
  {
    id:1,
    title:"Salary",
    amount: 5000
  },
  {
    id:2,
    title:"Snacks",
    amount: -500,
  },
  {
    id:3,
    title:"Movie",
    amount: 500,
  }
]
const App=()=>{
  const [list,setList]=useState(expenses);
  const [editId,setEditId]=useState();
  let income=0;
  let expense=0;

  const itemToEdit= list.find((item)=> item.id===editId);
  console.log(itemToEdit);

  list.forEach((item)=>{
    if(item.amount >0){
      income+=item.amount;
    }else{
      expense+=item.amount;
    }
  })
  const deleteItem = (id) =>{
    console.log("Delete "+ id)
    const res=list.filter((item)=>{
         return item.id!==id;
    })
    setList([...res]);
};
const addItem=(title,amount)=>{
  const newItem={
    id:list[list.length-1].id+1,
    title:title,
    amount:parseInt(amount),
  };
  setList([...list,newItem])
};

const editItem =(title,amount) =>{
  const res = list.map((item)=>{
    if(item.id === editId){
      item.title=title;
      item.amount=parseInt(amount);
    }
    return item;
  });
  setList([...res]);
  setEditId(null)
};
  return(
      <div className="container">
         <h1>Expence Tracker</h1>
      <div className="IncomeEx">
         <div>
          <h4> Income</h4>
          <p>{income}</p>
         </div>
         <div>
          <h4> Expense</h4>
          <p>{expense}</p>
         </div>
      </div>
      <ExpenseForm addItem={addItem} itemToEdit={itemToEdit} editItem={editItem}/>
      <div className="history-container">
        <h3>History</h3>
        {/* <ExpenseCard title="Salary" amount={5000}/>
        <ExpenseCard title="Snacks" amount={-500}/>
        <ExpenseCard title="Movie" amount={500}/> */}
        {list.map((expenses)=>{
         return <ExpenseCard Key= {expenses.id} 
                          title= {expenses.title}
                          amount={expenses.amount}
                          deleteItem={deleteItem}
                          setEditId={setEditId}
                          id={expenses.id}
                          />
      }) }

      </div>
      </div>
  );
};
export default App;


