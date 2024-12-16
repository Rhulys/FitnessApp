"use client";

import { use, useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_USER = gql`
    mutation AddUser($name: String!, $email: String!) {
        addUser(name: $name, email: $email) {
            id
            name
            email
        }
    }
`;

export default function AddUserForm() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [addUser] = useMutation(ADD_USER, {
        refetchQueries: ["GET_USERS"],
    });
    const [allFields, setAllFields] = useState(false);
    const [addedUser, setAddedUser] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !email) {
            setAllFields(true);
            return;
        }
        try {
            await addUser({ variables: { name, email } });
            setName("");
            setEmail("");
            setAllFields(false)
            setAddedUser(true)
        } catch (error) {
            console.log("Erro ao adicionar usuário:", error);
        }

        setTimeout(() => {
            setAddedUser(false);
        }, 2000);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded text-black"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded text-black"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Adicionar Usuário
                </button>
            </form>
            {allFields && (
                <div className="flex flex-col w-full items-center pt-4">
                    <p className="bg-red-500 p-3 rounded-lg font-bold">
                        Preencha todos os campos!
                    </p>
                </div>
            )}
            {addedUser && (
                <div className="flex flex-col w-full items-center pt-4">
                <p className="bg-green-500 p-3 rounded-lg font-bold">
                    Usuário adicionado com sucesso
                </p>
            </div>
            )}
        </>
    );
}
