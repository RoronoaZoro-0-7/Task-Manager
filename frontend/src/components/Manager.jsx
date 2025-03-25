import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';

const Manager = () => {
    const [form, setForm] = useState({ brief: '', description: '', status: '' });
    const [tasks, setTasks] = useState([]);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get(API_URL);
            const tasksArray = Array.isArray(data) ? data.task : Object.values(data.task);
            setTasks(tasksArray);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const saveTask = async () => {
        if (!form.brief || !form.description || !form.status) {
            alert('Please fill in all fields');
            return;
        }

        let msg = edit ? 'Task updated' : 'Task added';

        try {
            if (edit) {
                await axios.put(`${API_URL}/${form._id}`, form);
            } else {
                await axios.post(API_URL, form);
            }
            fetchTasks();
            setEdit(false);
            setForm({ brief: '', description: '', status: '' });
        } catch (error) {
            console.error("Error saving task:", error);
            msg = 'An error occurred';
        }

        toast(msg, {
            position: "top-right",
            autoClose: 2400,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
        });
    };

    const editTask = (task) => {
        setEdit(true);
        setForm(task);
    };

    const deleteTask = async (id) => {
        if (window.confirm('Do you really want to delete this task?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchTasks();
                toast("Task Deleted Successfully!", {
                    position: "top-right",
                    autoClose: 2400,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }
    };

    return (
        <div>
            <div className="fixed inset-0 z-[-2] h-full w-full rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(120,100%,90%,0)_0,rgba(144,238,144,0.3)_100%)]"></div>
            <p className='text-center text-orange-700 text-lg '>Your Tasks</p>
            <div className='flex flex-col p-4 gap-8 text-black items-center'>
                <input className="rounded-full border-2 border-green-700 w-[60%] p-2 py-1"
                    type="text" name='brief' placeholder='Enter Task Brief' value={form.brief}
                    onChange={handleChange} />
                <textarea className="border-2 border-green-700 w-[60%] p-2 py-1 h-[100px]"
                    type="text" name='description' placeholder='Enter Task Description' value={form.description}
                    onChange={handleChange} />
                <input className="rounded-full border-2 border-green-700 w-[300px] p-2 py-1"
                    type="text" name="status" placeholder="Enter Status" value={form.status}
                    onChange={handleChange} />
            </div>
            <div className='flex justify-center item-center'>
                <button className='flex gap-4 justify-center items-center bg-green-500 text-white rounded-full p-2 py-1 min-w-[200px]
                border-4 border-x-2 border-x-green-900
                transition duration-300 ease-in-out hover:bg-green-700 hover:scale-105 hover:shadow-lg'
                    onClick={saveTask}>
                    <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover">
                    </lord-icon>
                    Save Task
                </button>
            </div>
            <div className='flex justify-center items-center'>
                <div className='allTasks'>
                    {tasks.length === 0 ? (
                        <h2 className='font-bold text-xl py-4'>No Tasks to show</h2>
                    ) : (
                        <h2 className='font-bold text-xl py-4'>Your Tasks</h2>
                    )}
                </div>
            </div>
            {tasks.length !== 0 && (
                <div className='border border-gray-300 rounded-md max-h-[350px] overflow-y-auto'>
                    <table className="table-auto w-full">
                        <thead className="bg-green-700 text-white sticky top-0">
                            <tr>
                                <th className="py-2">Task Brief</th>
                                <th className="py-2">Description</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-center bg-green-100'>
                            {tasks.map((item, index) => (
                                <tr key={item._id || index} className='height-[40px]'>
                                    <td className='p-2 px-4 border-white text-center'>{item.brief}</td>
                                    <td className='p-2 px-4 border-white text-center'>{item.description}</td>
                                    <td className='p-2 px-4 border-white text-center'>{item.status}</td>
                                    <td className="py-3 border border-white">
                                        <div className="flex gap-3 justify-center">
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ height: "25px", width: "25px", cursor: "pointer" }}
                                                onClick={() => editTask(item)}
                                            ></lord-icon>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ height: "25px", width: "25px", cursor: "pointer" }}
                                                onClick={() => deleteTask(item._id)}
                                            ></lord-icon>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Manager;