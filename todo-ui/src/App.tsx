import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Col, Row, Skeleton } from "antd";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APIErrorResponse } from "./types/generic";

const Login = React.lazy(() => import("./pages/login"));
const Signup = React.lazy(() => import("./pages/signup"));

const Todo = React.lazy(() => import("./pages/todos"));
const TodoList = React.lazy(() => import("./pages/todos/list"));

const retry = (failureCount: number, error: unknown) => {
  const isAuthorizationError =
    (error as APIErrorResponse)?.response?.status === 401;

  return isAuthorizationError ? false : failureCount < 2;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Row>
        <Col
         
          md={{
            offset: 6,
            span: 12,
          }}
          sm={24}
          xs={24}
        >
          <React.Suspense fallback={<Skeleton />}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/todos" element={<Todo />}>
                  <Route index element={<TodoList />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </React.Suspense>
        </Col>
      </Row>
    </QueryClientProvider>
  );
}

export default App;
