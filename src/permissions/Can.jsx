import {useAuth} from "../../context/AuthContext";

export default function Can({roles, children}) {
    const {hasRole} = useAuth();

    if (!hasRole(roles)) {
        return null;
    }

    return children;
}
