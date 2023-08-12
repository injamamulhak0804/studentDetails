import React, { useEffect, useState } from 'react'
import { db } from './firebase'
import { addDoc, collection, query, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'

const App = () => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [studented, setStudented] = useState([name])


  const handleSubmit = async () => {
    const student = { name, age: parseInt(age) }
    name && age && await addDoc(collection(db, "students"), student)
    setName('')
    setAge('')
    getStudent()
  }

  
  // TO ADD STUDENT
  const getStudent = async () => {
    const q = query(collection(db, "students"))
    console.log(q);
    const querysanpShot = await getDocs(q)
    let students = []
    querysanpShot.forEach(docs => {
      students.push({ ...docs.data(), id: docs.id })
    });
    setStudented(students)
  }
  useEffect(() => {
    getStudent()
  }, [])


  // TO EDIT 
  const editStudent = async (id, name, age) => {
    await updateDoc(doc(db, "students", id), {
      name,
      age: parseInt(age)
    })
    getStudent()
  }



  // TO DELETE 
  const deleteStudent = async (id) => {
    await deleteDoc(doc(db, "students",id))
    getStudent();
  }

  return (
    <>
      <header className='bg-primary'>
        <h2 className='text-center pt-2  text-white w-100 h-50 d-inline-block'>CRUD operation With FireBase and React</h2>
      </header>
      <form className='from-group' onSubmit={(e) => e.preventDefault()}>
        <div className="input-groups w-100 text-center">
          <label htmlFor="name">Name</label> &nbsp;
          <input type='text'
            value={name}
            id='name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-groups w-100 text-center">
          <label htmlFor="age">Age</label>&nbsp;
          <input
            type='number'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={8}
            max={99}
          />
        </div>
        <div className="submit-btn">
          <button type='submit' onClick={handleSubmit} className='btn btn-primary submit'>Submit</button>
        </div>
      </form>
      <div className="students">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col" className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              studented.map((student, index) => {
                return (
                  <tr key={index}>
                    <td scope='row'>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>
                      <button type="button"
                        onClick={() => editStudent(student.id,
                          prompt("Enter new name", student.name),
                          prompt("Please enter age: ", student.age))}
                        className='btn btn-primary'>EDIT</button>
                    </td>
                    <td>
                      <button type="button"
                        onClick={() => deleteStudent(student.id)}
                        className='btn btn-primary'>DELETE</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
