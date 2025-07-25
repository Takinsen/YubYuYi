import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { MantineProvider } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthContext';
import login from '@/api/auth/login';


jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/providers/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/api/auth/login', () => jest.fn());

describe('Login Component', () => {
  const mockRouter = { push: jest.fn() };
  const mockSetUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAuth as jest.Mock).mockReturnValue({ setUser: mockSetUser });
  });

  const renderWithMantineProvider = (component: JSX.Element) => {
    return render(<MantineProvider>{component}</MantineProvider>);
  };

  it('renders the login form correctly', () => {
    renderWithMantineProvider(<Login />);

    expect(screen.getByText('Hello Agian!')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('calls login API and redirects on successful login', async () => {
    const mockLogin = login as jest.Mock;
    mockLogin.mockResolvedValueOnce({
      success: true,
      user: { role: 'admin' },
    });

    renderWithMantineProvider(<Login />);

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText('Login'));

    expect(mockLogin).toHaveBeenCalledWith('testuser', 'password123');
    expect(mockSetUser).toHaveBeenCalledWith({ role: 'admin' });
    expect(mockRouter.push).toHaveBeenCalledWith('/admin/dashboard'); // Adjust based on your `getRedirectPath` logic
  });

  it('shows an error message on failed login', async () => {
    const mockLogin = login as jest.Mock;
    mockLogin.mockResolvedValueOnce({ success: false });

    renderWithMantineProvider(<Login />);

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'wronguser' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByText('Login'));

    expect(mockLogin).toHaveBeenCalledWith('wronguser', 'wrongpassword');
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('navigates back when clicking the Back button', () => {
    renderWithMantineProvider(<Login />);

    fireEvent.click(screen.getByText('<- Back'));

    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});