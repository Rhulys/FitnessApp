"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type Goal = {
    target: string;
    progress: number;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function GoalChart({ goals }: { goals: Goal[] }) {
    const data = goals.map((goal, index) => ({
        name: goal.target,
        value: goal.progress,
        color: COLORS[index % COLORS.length],
    }));

    console.log('Dados para o gráfico de metas:', goals);

    if (data.length === 0) {
        return (
            <p className="mt-4 text-gray-500">Nenhuma meta registrada ainda.</p>
        );
    }

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold  uppercase">Progresso das Metas</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={({name, value}) => `${name}: ${value}`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
