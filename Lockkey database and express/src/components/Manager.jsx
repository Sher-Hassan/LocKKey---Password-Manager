import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getpasswords = async () => {
    let req = await fetch('http://localhost:3000/')
    let passwords = await req.json();
    console.log(passwords);
    setpasswordArray(passwords);
  }


  useEffect(() => {
    getpasswords();

  }, [])

  const ref = useRef();

  const showPassword = () => {
    ref.current.type = ref.current.type === 'password' ? 'text' : 'password';
  };

  const savePassword = async () => {
    console.log(form);
    
    if (form.id) {
      await fetch('http://localhost:3000/', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: form.id }) });
    }
    
    const newPassword = { ...form, id: uuidv4() };
    setpasswordArray([...passwordArray, newPassword]);
    
    await fetch('http://localhost:3000/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newPassword) });
    
    console.log([...passwordArray, newPassword]);
    setform({ site: "", username: "", password: "" });
    toast('Password Saved!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const deletePassword = async (id) => {
    console.log("deleting password with id", id);
    setpasswordArray(passwordArray.filter(password => password.id !== id));
    // localStorage.setItem('passwords', JSON.stringify([...passwordArray, form]));
    let res =await fetch('http://localhost:3000/', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({id}) });
    // console.log([...passwordArray, form]);
    toast('Password Deleted!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

      });
  }
  const editPassword = async (id) => {
    await fetch('http://localhost:3000/', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({id}) });
    const passwordToEdit = passwordArray.find(password => password.id === id);
    setform(passwordToEdit);
    setpasswordArray(passwordArray.filter(password => password.id !== id));
    
    await fetch('http://localhost:3000/', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(passwordToEdit) });
    
    toast('Password Updated!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied to Clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

      });
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="flex justify-center">
        <div className="mycontainer pt-1">
          <h1 className='font-bold text-4xl text-center'>
            <span className="text-green-500">&lt;</span>
            LocK
            <span className="text-green-500">Key/ &gt;</span></h1>
          <p className='text-green-900 texl-lg text-center'>Your own password manager</p>
          <div className='text-black flex flex-col p-4 gap-3 items-center'>
            <input name='site' value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-lg border border-green-500 w-full px-4 py-1' type="text" />
            <div className="flex w-full justify-between gap-3">
              <input name='username' value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-lg border border-green-500 w-full px-4 py-1' type="text" />
              <div className="relative w-1/2">
                <input ref={ref} name='password' value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-lg border border-green-500 w-full px-4 py-1' type="password" />
                <span onClick={() => showPassword()} className='absolute right-1 top-0 cursor-pointer'>
                  <lord-icon
                    src="https://cdn.lordicon.com/dicvhxpz.json"
                    trigger="hover"
                    stroke="bold"
                    state="hover-look-around"
                    className='w-2 h-2'>
                  </lord-icon>
                </span>
              </div>
            </div>
            <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 transition-all rounded-full px-6 py-2 w-fit border border-green-900'>
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              >
              </lord-icon>
              <span className='font-bold'>SAVE</span></button>

          </div>
          <div className="passwords">
            <h2 className='font-bold text-2xl pb-4'>Your Passwords</h2>
            {passwordArray.length === 0 && <div className='text-center text-green-900'>No Passwords Saved</div>}
            {passwordArray != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
              <thead>
                <tr className='bg-green-800 text-white'>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {passwordArray.map((password, index) => (
                  <tr key={index}>

                    <td className='text-center py-2 border w-2/4 border-white'>
                      <div className='flex justify-center items-center'>
                        <a href={password.site.startsWith('http') ? password.site : `https://${password.site}`} target='_blank' rel="noopener noreferrer">{password.site}</a>
                        <div className='size-7 cursor-pointer'>
                          <lord-icon className='lordiconcopy cursor-pointer' onClick={() => copyToClipboard(password.site)}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px", paddingLeft: "5px" }}
                          >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='text-center py-2 border border-white'>
                      <div className='flex justify-center items-center'>
                        <span>{password.username}</span>
                        <div className='size-7 cursor-pointer'>
                          <lord-icon className='lordiconcopy cursor-pointer' onClick={() => copyToClipboard(password.username)}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px", paddingLeft: "5px" }}
                          >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=' py-2 border border-white'>
                      <div className='flex justify-center items-center'>
                        <span>{"*".repeat(password.password.length)}</span>
                        <div className='size-7 cursor-pointer'>
                          <lord-icon className='lordiconcopy cursor-pointer' onClick={() => copyToClipboard(password.password)}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px", paddingLeft: "5px" }}
                          >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className=' py-2 border border-white'>
                      <div className='flex justify-center items-center px-1'>
                      <div className='size-7 cursor-pointer'>
                          <lord-icon className='lordiconcopy cursor-pointer' onClick={() => {editPassword(password.id)}}
                            src="https://cdn.lordicon.com/lsrcesku.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px", paddingLeft: "5px" }}
                          >
                          </lord-icon>
                        </div>
                        <div className='size-7 cursor-pointer'>
                          <lord-icon className='lordiconcopy cursor-pointer' onClick={() => {deletePassword(password.id)}}
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px", paddingLeft: "5px" }}
                          >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>}
          </div>
        </div>
      </div>
    </>
  )
}
export default Manager 