import GlobalStyled from "./styles/GlobalStyles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Nhập vào QueryClient và QueryClientProvider từ thư viện react-query
// QueryClient: là một class dùng để tạo ra một instance của query client để sử dụng trong ứng dụng của bạn. Nó quy định cấu hình mặc định cho tất cả các query trong ứng dụng của bạn.
// QueryClientProvider: là một component React dùng để cung cấp một instance của QueryClient cho tất cả các component con của nó. Nó sẽ tự động quản lý vòng đời của query client và tự động xóa nó khi không cần thiết nữa.
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// ReactQueryDevtools: là một component React dùng để hiển thị một bảng điều khiển DevTools để giúp bạn theo dõi và gỡ lỗi các query trong ứng dụng của bạn.
import { Toaster } from "react-hot-toast";
// Toaster: là một component React dùng để hiển thị thông báo toast thông qua thư viện react-hot-toast

import ProtectRoute from "./ui/ProtectRoute";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    // Cấu hình mặc định cho tất cả các query
    queries: {
      // Cấu hình cho các query
      staleTime: 60 * 1000, // Thời gian mà dữ liệu có thể được sử dụng mà không cần phải fetch lại (đơn vị là ms)
    },
  },
}); // Tạo một instance của QueryClient với cấu hình mặc định

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          buttonPosition="bottom-left"
          initialIsOpen={false}
        />{" "}
        {/* DevTools, hiển thị ở góc dưới bên trái, mặc định ẩn */}
        <GlobalStyled /> {/* Global styles */}
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectRoute>
                  {" "}
                  {/* Đưa AppLayout vào ProtectRoute, kiểm tra nếu login thì cho phép, ko thì navigate /login */}
                  <AppLayout />
                </ProtectRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
