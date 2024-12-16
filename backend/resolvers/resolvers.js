const User = require("../models/User");

const resolvers = {
    Query: {
        users: async () => {
            const users = await User.find();
            return users.map((user) => ({
                ...user.toObject(),
                id: user._id.toString(),
                activities: user.activities.map((activity) => ({
                    ...activity.toObject(),
                    id: activity._id.toString(),
                })),
                goals: user.goals.map((goal) => ({
                    ...goal.toObject(),
                    id: goal._id.toString(),
                })),
            }));
        },
        user: async (_, { id }) => {
            const user = await User.findById(id);
            if (!user) throw new Error("Usuário não encontrado");
    
            return {
                ...user.toObject(),
                id: user._id.toString(), 
                activities: user.activities.map((activity) => ({
                    ...activity.toObject(),
                    id: activity._id.toString()
                })),
                goals: user.goals.map((goal) => ({
                    ...goal.toObject(),
                    id: goal._id.toString(), 
                })),
            };
        },
    },
    Mutation: {
        addUser: async (_, { name, email }) => {
            const user = new User({ name, email, activities: [], goals: [] });
            return await user.save();
        },
        updateUser: async (_, { id, name, email }) => {
            const user = await User.findById(id);
            if (!user) throw new Error("Usuário não encontrado");

            if (name) user.name = name;
            if (email) user.email = email;

            await user.save();
            return user;
        },
        deleteUser: async (_, { id }) => {
            const user = await User.findByIdAndDelete(id);
            if (!user) throw new Erroe("Usuário não encontrado");
            return user;
        },
        addActivity: async (_, { userId, date, type, duration }) => {
            const user = await User.findById(userId);
            user.activities.push({ date, type, duration });
            return await user.save();
        },
        updateActivity: async (
            _,
            { userId, activityId, date, type, duration }
        ) => {
            const user = await User.findById(userId);
            if (!user) throw new Error("Usuário não encontrado");

            const activity = user.activities.id(activityId);
            if (!activity) throw new Error("Atividade não encontrada");

            if (date) activity.date = new Date(date);
            if (type) activity.type = type;
            if (duration) activity.duration = duration;

            await user.save();
            return activity;
        },
        deleteActivity: async (_, { userId, activityId }) => {
            const user = await User.findById(userId);
            if (!user) throw new Error("Usuário não encontrado");
        
            const activity = user.activities.id(activityId);
            if (!activity) throw new Error("Atividade não encontrada");
        
            user.activities.pull(activityId); 
            await user.save();
        
            return activity;
        },        
        addGoal: async (_, { userId, target, progress }) => {
            try {
                const user = await User.findById(userId);
                if (!user) throw new Error("Usuário não encontrado");

                user.goals.push({ target, progress });

                await user.save();
                return user;
            } catch (error) {
                throw new Error("Falha ao adicionar meta.");
            }
        },
        updateGoal: async (_, { userId, goalId, target, progress }) => {
            const user = await User.findById(userId);
            if (!user) throw new Error("Usuário não encontrado");

            const goal = user.goals.id(goalId);
            if (!goal) throw new Error("Meta não encontrada");

            if (target) goal.target = target;
            if (progress !== undefined) goal.progress = progress;

            await user.save();
            return goal;
        },
        deleteGoal: async (_, { userId, goalId }) => {
            const user = await User.findById(userId);
            if (!user) throw new Error("Usuário não encontrado");
        
            const goal = user.goals.id(goalId);
            if (!goal) throw new Error("Meta não encontrada");
        
            user.goals.pull(goalId); 
            await user.save();
        
            return goal;
        },
        
    },
};

module.exports = resolvers;
