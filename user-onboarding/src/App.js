import React, { useState, useEffect } from 'react'
import * as yup from "yup"
import axios from 'axios'
import Form from './components/Form'
import './App.css';

function App() {
  
  return (
    <div className="app">
      <h1>User Onboarding</h1>
      <Form />
    </div>
  );
}

export default App;
