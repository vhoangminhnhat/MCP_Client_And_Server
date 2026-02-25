import { ReactNode } from "react";
import { Navigate, useNavigate } from "react-router";
import { DataFormat } from "utils/format/DataFormat";
import Main from "../main/Main";

function PrivateRoute({
  children,
  path,
}: {
  children: ReactNode;
  path: string;
}) {
  const token = DataFormat.getToken();
  const navigate = useNavigate();

  if (!token) return <Navigate to="/login" />;

  return (
    <Main location={window.location} navigate={navigate}>
      {children}
    </Main>
  );
}

export default PrivateRoute;
