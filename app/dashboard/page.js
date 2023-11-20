import { PrismaClient } from "@prisma/client";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";


// import AddProduct from "./addProduct";
// import DeleteProduct from "./deleteProduct";
// import UpdateProduct from "./updateProduct";
const prisma = new PrismaClient();

const getProducts = async () => {
    const res = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            image: true,
        },
    });
    return res;
};

const Product = async () => {
    const user = await getProducts()
    return (
        <div className="px-12 py-8">
            <div className="mb-2">
                <AddUser />
            </div>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((i, index) => (
                        <tr key={i.id}>
                            <td>{index + 1}</td>
                            <td>{i.email}</td>
                            <td>{i.name}</td>
                            <td>
                                <img src={`${i.image}`} className="w-16 h-16 rounded-md" />
                            </td>
                            <td className="flex justify-center space-x-1">
                                <UpdateUser user={i} />
                                <DeleteUser user={i} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Product;