//Can user delete employee?

import {useAuth} from "../../context/AuthContext";

export default function Can({roles = [], children}) {
    const {user} = useAuth();

    if (!user) {
        return null;
    }

    const isAllowed = roles.includes(user.role);

    if (!isAllowed) {
        return null;
    }

    return children;
}