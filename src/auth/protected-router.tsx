import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function ProtectedRoute({ children }: { children: any }) {
    const user = useAppSelector((s) => s.auth.user);
    if (!user) {
        return <Navigate to={"/login"} />;
    } else {
        return children;
    }
}
