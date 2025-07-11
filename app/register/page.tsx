"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
//if you use react in clssic manner then some hooks run in client side then always write use client in the file 

function RegisterPage() {
    const [email, setEmail] = useState("");//use statehook to set email during registraion in forntend
    const [password, setPassword] = useState("");//similarly as line no 7
    const [confirmPassword, setConfirmPassword] = useState("");//similarly
    const router = useRouter(); //router is another hook bascilly used to naviagate always navigate router bascially one page but contian multiple page inside

//handlesumit function 
    const handleSumit =async (e: React.FormEvent<HTMLFormElement>) => {


        e.preventDefault();
        //check the passowrd == confirmpassword if not then return alert
        if (password  !== confirmPassword) {
            alert("password incorrect ")
            return;
        }
        //then used try and catch block
        try
        //optimize this frontend by using react query
        //for lodaing ,duplicate and wrong submission        
        
        {
            //res store fetch from reister in the backend server
            const res = await fetch("/api/auth/register",{
                
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    
                },
                body: JSON.stringify({  //always strinfy the email and password
                    email,
                    password,
                }),
                
            })
            // store res 
            const data = await res.json();
            // if res not ok then throw an error
            if (!res.ok) {
                throw new Error(data.error || "Registration Not Successfully");
            }
            console.log(data);
            router.push("/login");//router push login
            
        } catch (error) {
            console.log("error int frontend during register",error)     //throw an error
        }
        
    }
    
    
    return (


        //basically make the forntend part as register form

        <div>
            <h1>Register</h1>
            <form onSubmit={handleSumit}>
                <input type="email" placeholder="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder='confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
            <div>
                <p>alredy have an account?<a href="/login">login</a></p>
            </div>


        </div>
  )
}

export default RegisterPage;