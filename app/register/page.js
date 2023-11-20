"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const router = useRouter();

    const handleSubmit = async () => {
        const response = await axios.post("/api/register", {
            email: email,
            name: name,
            password: password,
        });

        if (response.status == 201) {
            setEmail("");
            setPassword("");
            setPassword("")
            router.replace('/')
        }
    }

    return (
        <div className="flex flex-row items-center justify-center min-h-screen">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Register</h3>
                <form >
                    <div className="form-control w-full">
                        <label className="label font-bold">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered"
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-bold">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered"
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-control w-full">
                        <label className="label font-bold">Password</label>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex flex-row justify-center items-center mt-4">
                        <div className="btn btn-primary mb-8 mr-6" onClick={() => router.replace("/")}>
                            Login
                        </div>
                        <div className="btn btn-primary mb-8" onClick={handleSubmit}>
                            Register
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register