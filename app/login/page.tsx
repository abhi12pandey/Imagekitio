"use client"  // if you used classic react compoment then you know that somme hooks run to the client side that why to mentions about it..
import { signIn } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react'

function loginpage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const result=await signIn("credentials",{
            email,
            password,
            redirect: false,
            
        })
        if (result?.error) {
            console.log("error occur")

        }
        else {
            
            router.push("/")
        }
    }


  return (
      <div>
          <h1>login</h1>
          <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit">Login</button>
          </form>
          <div>
              don't have an account ?
              <button onClick={() => router.push("/register")}>Register</button>
          </div>
    </div>
  )
}

export default loginpage


//similarly as register ,here make the login 