import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

 import FirstTask from './functionalcomponents/FirstTask'
import SecondTask from './functionalcomponents/SecondTask'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <FirstTask></FirstTask>
        <SecondTask></SecondTask>
    </div>
);
 
