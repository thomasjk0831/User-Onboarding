import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email("Must be a valid email address").required("Must include email address"),
    password: yup.string().required("Must include password").min(8, "Must be at least 8 chars"),
    position: yup.string().required("Position is required"),
    terms: yup.boolean().oneOf([true], "Please agree to terms of use")
})

export default function Form(){
    const [users, setUsers] = useState([])
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        position: "",
        terms: false,
    })
    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
        position: "",
        terms: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(true)
         
    const changeHandler = event => {
        event.persist();
        validate(event)
        let value = event.target.type === "checkbox"? event.target.checked : event.target.value
       setForm({...form, [event.target.name] : value})
    }

    const validate = e => {
      let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

      yup
        .reach(formSchema, e.target.name)
        .validate(value)
        .then(valid=> {
          setError({...error, [e.target.name]: ""})
        })
        .catch(err=> {
          setError({...error, [e.target.name]: err.errors[0]})
        })

    }
    
    const submitHandler = (event) => {
        event.preventDefault()
        axios.post('https://reqres.in/api/users', form)
        .then(response => {
          console.log(response.data)
          setUsers(response.data)
          setForm({
          name: "",
          email: "",
          password: "",
          position: "",
          terms: false,})
        })
        .catch(err => console.log(err))
    }

    useEffect(()=> {
      formSchema.isValid(form)
      .then(valid => {
        setButtonDisabled(!valid)
      })
    }, [form])
    


    return(
        
          <form onSubmit={submitHandler}>
              <label htmlFor='name'>Name
                <input 
                  id='name' 
                  name='name' 
                  type ="text"
                  value={form.name} 
                  placeholder='Enter name'
                  onChange={changeHandler}
                  />
                  {error.name.length > 0 ? (
                    <p className="error-msg">{error.name}</p>
                  ): null}
              </label>
              <label htmlFor='email'>Email
                <input 
                  id='email' 
                  name='email' 
                  type="email"
                  value={form.email} 
                  placeholder='Enter email'
                  onChange={changeHandler}
                  />
                  { error.email.length > 0 ? (
                    <p className="error-msg">{error.email}</p>
                  ) : null }
              </label>
              <label htmlFor='password'>Password
                <input 
                  id='password' 
                  name='password' 
                  type="password"
                  value={form.password} 
                  placeholder='Enter password'
                  onChange={changeHandler}
                  />
                  { error.password.length > 0 ? (
                    <p className="error-msg">{error.password}</p>
                  ) : null }
              </label>
              
            <label htmlFor="position" className="position">
              What is the person's position?
               <select
                 value={form.position}
                 name="position"
                 id="position"
                 onChange={changeHandler}
               >
                 <option value=''>Select a position</option>
                 <option value="Instructor">Instructor</option>
                 <option value="Student">Student</option>
                 <option value="TL">TL</option>
                 <option value="Career">Career</option>
               </select>
               { error.position.length > 0 ? (
                    <p className="error-msg">{error.position}</p>
                  ) : null }
            </label>
            <label htmlFor="terms" className="terms"> 
                <input 
                  id="terms" 
                  name="terms" 
                  type="checkbox" 
                  checked={form.terms} 
                  onChange={changeHandler} />
                  &nbsp;I agree to the terms of use
                  
            </label>

            <button disabled={buttonDisabled} 
              style={buttonDisabled===false? {border:"3px solid lightgreen"} : null} 
              type="submit">Add User</button>
            <pre>{JSON.stringify(users, null, 2)}</pre>
          </form>
        
    )
}
    
