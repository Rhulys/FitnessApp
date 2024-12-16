"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import AddUserForm from "../../components/AddUserForm";
import { useState } from "react";

type User = {
    id: string;
    name: string;
    email: string;
};

const GET_USERS = gql`
    query {
        users {
            id
            name
            email
        }
    }
`;

const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $name: String, $email: String) {
        updateUser(id: $id, name: $name, email: $email) {
            id
            name
            email
        }
    }
`;

const DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
`;

export default function UsersPage() {
    const { loading, error, data, refetch } = useQuery<{ users: User[] }>(
        GET_USERS
    );
    const [updateUser] = useMutation(UPDATE_USER);
    const [deleteUser] = useMutation(DELETE_USER);
    const [editUser, setEditUser] = useState<{
        id: string;
        name: string;
        email: string;
    } | null>(null);
    const [errUpdate, setErrUpdate] = useState(false);
    const [sentEdit, setSentEdit] = useState(false);
    const [errDelete, setErrDelete] = useState(false);
    const [sentDelete, setSentDelete] = useState(false);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error.message}</p>;

    const handleEdit = async () => {
        if (!editUser) return;
        try {
            await updateUser({
                variables: {
                    id: editUser.id,
                    name: editUser.name,
                    email: editUser.email,
                },
            });
            setErrUpdate(false);
            setEditUser(null);
            refetch();
        } catch (err) {
            setErrUpdate(true);
        }

        setSentEdit(true);

        setTimeout(() => {
            setSentEdit(false);
        }, 2000);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteUser({
                variables: { id },
            });
            setErrDelete(false);
            refetch();
        } catch (err) {
            setErrDelete(true);
        }

        setSentDelete(true);

        setTimeout(() => {
            setSentDelete(false);
        }, 2000);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Gerenciar Usuários</h1>

            {editUser ? (
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">Editar Usuário</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleEdit();
                        }}
                        className="flex flex-col gap-4"
                    >
                        <input
                            type="text"
                            value={editUser.name}
                            onChange={(e) =>
                                setEditUser({
                                    ...editUser,
                                    name: e.target.value,
                                })
                            }
                            className="border p-2 rounded text-black"
                        />
                        <input
                            type="email"
                            value={editUser.email}
                            onChange={(e) =>
                                setEditUser({
                                    ...editUser,
                                    email: e.target.value,
                                })
                            }
                            className="border p-2 rounde text-black"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            Salvar
                        </button>
                        <button
                            onClick={() => setEditUser(null)}
                            className="bg-gray-500 text-white p-2 rounded"
                        >
                            Cancelar
                        </button>
                        {sentEdit && (
                            <div className="flex flex-col items-center w-full">
                                {errUpdate ? (
                                    <p className="bg-red-500 p-3 rounded-lg font-bold">
                                        Erro ao atualizar usuário
                                    </p>
                                ) : (
                                    <p className="bg-green-500 p-3 rounded-lg font-bold">
                                        Usuário atualizado com sucesso!
                                    </p>
                                )}
                            </div>
                        )}
                    </form>
                </div>
            ) : (
                <AddUserForm />
            )}
            <ul className="mt-4 space-y-2">
                {data?.users.map((user) => (
                    <li
                        key={user.id}
                        className="border p-2 rounded flex justify-between items-center bg-gray-100"
                    >
                        <div className="text-black">
                            <p>
                                <strong>Nome:</strong> {user.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() =>
                                    setEditUser({
                                        id: user.id,
                                        name: user.name,
                                        email: user.email,
                                    })
                                }
                                className="bg-yellow-500 text-white p-2 rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Remover
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {sentDelete && (
                <div className="flex flex-col items-center w-full pt-4">
                    {errDelete ? (
                        <p className="bg-red-500 p-3 rounded-lg font-bold">
                            Erro ao remover usuário!
                        </p>
                    ) : (
                        <p className="bg-green-500 p-3 rounded-lg font-bold">
                            Usuário removido com sucesso!
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
