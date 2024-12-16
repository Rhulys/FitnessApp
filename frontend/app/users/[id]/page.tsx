"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import AddActivityForm from "@/components/AddActivityForm";
import ActivityChart from "@/components/ActivityChart";
import AddGoalForm from "@/components/AddGoalForm";
import GoalChart from "@/components/GoalChart";

type Activity = {
    date: string;
    type: string;
    duration: number;
};

type Goal = {
    target: string;
    progress: number;
};

type User = {
    id: string;
    name: string;
    email: string;
    activities: Activity[];
    goals: Goal[];
};

const GET_USER = gql`
    query GetUser($id: ID!) {
        user(id: $id) {
            id
            name
            email
            activities {
                date
                type
                duration
            }
            goals {
                target
                progress
            }
        }
    }
`;

export default function UserDetails() {
    const { id } = useParams();
    const { loading, error, data } = useQuery<{ user: User }>(GET_USER, {
        variables: { id },
    });

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error.message}</p>;

    const user = data.user;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Detalhes do Usuário</h1>
            <p>Nome: {user?.name}</p>
            <p>Email: {user?.name}</p>

            <h2 className="text-xl mt-4">Atividades</h2>
            <ActivityChart activities={user.activities} />
            <AddActivityForm userId={user.id} />

            <h2 className="text-xl mt-4">Metas</h2>
            <GoalChart goals={user.goals} />
            <AddGoalForm userId={user.id} />
        </div>
    );
}
