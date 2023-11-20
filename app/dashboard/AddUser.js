"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AddUser = ({ brands }) => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await axios.post("/api/user", {
            email: email,
            name: name,
            password: password,
            image: `image/${image}`
        });
        setIsLoading(false);
        setEmail("");
        setName("");
        setPassword("");
        setImage("");
        router.refresh();
        setIsOpen(false);
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleFileChange = (e) => {
        const fullPath = e
        const fileNameWithoutPath = fullPath.split('\\').pop(); // Mendapatkan nama file tanpa jalur lengkap
        setImage(fileNameWithoutPath);
    };


    return (
        <div>
            <button className="btn btn-primary mb-8" onClick={handleModal}>
                Add New
            </button>

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New User</h3>
                    <form onSubmit={handleSubmit}>
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
                                placeholder="Name"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Image</label>
                            <input
                                type="file"
                                // value={image}
                                onChange={(e) => handleFileChange(e.target.value)}
                                className="input input-bordered"
                                placeholder="Image"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">PAssword</label>
                            <input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered"
                                placeholder="Password"
                            />
                        </div>
                        {/* <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="select select-bordered"
                            >
                                <option value="" disabled>
                                    Select a Brand
                                </option>
                                {brands.map((brand) => (
                                    <option value={brand.id} key={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div> */}
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>
                                Close
                            </button>
                            {!isLoading ? (
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                            ) : (
                                <button type="button" className="btn loading">
                                    Saving...
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
