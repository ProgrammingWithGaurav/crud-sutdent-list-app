import React, { useState, useEffect } from 'react';
import db from './firebase';

function App() {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [section, setSection] = useState('');
  const [gender, setGender] = useState('male');
  const [data, setData] = useState([]);
  const reset = () => {
    setName('');
    setRoll('');
    setSection('');
    setGender('male');
  }

  const insert = () => {
    if (name !== '' && roll !== '' && section !== '' && gender !== '') {
      db.collection('students_list').doc(roll).set({
        name, roll, section, gender, id: roll
      })
      reset()
    } else {
      alert('Please enter valid information')
    }
  }
  const select = async () => {
    if (roll !== '') {
      const doc = await db.collection('students_list').doc(roll).get()
      if (doc.exists) {
        setData(doc.data());
        reset()
      }
    } else {
      alert('Please enter valid information')
    }
  }
  const update = () => {
    if (roll !== '') {
      db.collection('students_list').doc(roll).update({
        name: name,
        roll: roll, 
        section: section, 
        gender: gender
      })
      alert('updated successfully');
      reset()

    } else {
      alert('Please enter valid information')
    }
  }
  const remove = () => {
    if (roll !== '') {
      db.collection('students_list').doc(roll).delete()
      reset()
    } else {
      alert('Please enter valid information')
    }

  }

  const getAllData = () => {
    db.collection('students_list')
      .onSnapshot((snapshot) => (
        setData(snapshot.docs.map((doc) => doc.data()))
      ))
  }

  return (
    <div className="container">
      <h1>Student List</h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="name" placeholder="Enter your name" />
      </div >
      <div className="mb-3">
        <label htmlFor="rollno" className="form-label">Roll no</label>
        <input value={roll} onChange={e => setRoll(e.target.value)} type="number" className="form-control" id="rollno" placeholder="Enter your roll no" />
      </div >
      <div className="mb-3">
        <label htmlFor="section" className="form-label">Section</label>
        <input value={section} onChange={e => setSection(e.target.value)} type="text" className="form-control" id="section" placeholder="Enter your section" />
      </div >
      <div className="mb-3">
        <label htmlFor="gender" className="form-label">Gender</label>
        <select className="form-select" id="gender" aria-label="Default select example" onChange={e => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="buttons my-3">
        <button className="btn btn-primary mx-1" onClick={insert}>insert</button>
        <button className="btn btn-warning mx-1" onClick={select}>select</button>
        <button className="btn btn-success mx-1" onClick={update}>update</button>
        <button className="btn btn-danger mx-1" onClick={remove}>delete</button>
        <button className="btn btn-primary mx-1" onClick={getAllData}>Get All Students Data</button>
      </div>

      <div className="data">
        {data ? (
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Roll no</th>
                <th scope="col">Section</th>
                <th scope="col">Gender</th>
              </tr>
            </thead>
            <tbody>
              {data.name ? (
                <tr>
                  <th scope="row">{data?.name}</th>
                  <td>{data?.roll}</td>
                  <td>{data?.section}</td>
                  <td>{data?.gender}</td>
                </tr>
              ) : (
                data.map(student => (
                  <tr>
                    <th scope="row">{student?.name}</th>
                    <td>{student?.roll}</td>
                    <td>{student?.section}</td>
                    <td>{student?.gender}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : ''}
      </div >
    </div >
  )
}

export default App
