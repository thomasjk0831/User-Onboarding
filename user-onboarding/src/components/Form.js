import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email("Must be a valid email address").required("Must include email address"),
    password: yup.string().required("Must include password"),
    position: yup.string(),
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
         
    const changeHandler = event => {
        
        const value = event.target.type === "checkbox"? event.target.checked : event.target.value
       setForm({...form, [event.target.name] : value})
    }

    

    return(
        <div>
          <form>
              <label forhtml='name'>Name
                <input 
                  id='name' 
                  name='name' 
                  type ="text"
                  value={form.name} 
                  placeholder='Enter name'
                  onChange={changeHandler}
                  />
              </label>
              <label forhtml='email'>Email
                <input 
                  id='email' 
                  name='email' 
                  type="email"
                  value={form.email} 
                  placeholder='Enter email'
                  onChange={changeHandler}
                  />
              </label>
              <label forhtml='password'>Password
                <input 
                  id='password' 
                  name='password' 
                  type="password"
                  value={form.password} 
                  placeholder='Enter email'
                  onChange={changeHandler}
                  />
              </label>
              
            <label htmlFor="position">
              What would you like to help with?
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
        
            </label>
            <label htmlfor="terms">
                <input 
                  id="terms" 
                  name="terms" 
                  type="checkbox" 
                  checked={form.terms} 
                  onChange={changeHandler} />
            </label>

                     

          </form>
        </div>
    )
}
    
