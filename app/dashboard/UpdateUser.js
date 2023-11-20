"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


const UpdateUser = ({ user }) => {
    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);
    const [image, setImage] = useState(user.image);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await axios.patch(`/api/user/${user.id}`, {
            email: email,
            name: name,
            image: image
        });
        setIsLoading(false);
        router.refresh();
        setIsOpen(false);
    };

    console.log(user)
    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="btn btn-info btn-sm" onClick={handleModal}>
                Edit
            </button>

            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update {user.name}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Email</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered"
                                placeholder="email"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered"
                                placeholder="name"
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Image</label>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="input input-bordered"
                                placeholder="image"
                            />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>
                                Close
                            </button>
                            {!isLoading ? (
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            ) : (
                                <button type="button" className="btn loading">
                                    Updating...
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;