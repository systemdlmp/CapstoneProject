/**
 * Mock Authentication for Frontend-Only Version
 * Fixed credentials for demo purposes - Multiple user types supported
 */

// Demo users with different roles
const DEMO_USERS = {
  admin: {
    id: 1,
    username: 'admin',
    password: 'admin123',
    email: 'admin@cemetery.com',
    firstname: 'Admin',
    lastname: 'Manager',
    role: 'admin',
    user_type: 'admin'
  },
  staff: {
    id: 2,
    username: 'staff',
    password: 'staff123',
    email: 'staff@cemetery.com',
    firstname: 'Park',
    lastname: 'Staff',
    role: 'cemetery_staff',
    user_type: 'cemetery_staff'
  },
  cashier: {
    id: 3,
    username: 'cashier',
    password: 'cashier123',
    email: 'cashier@cemetery.com',
    firstname: 'Cashier',
    lastname: 'Officer',
    role: 'cashier',
    user_type: 'cashier'
  },
  customer: {
    id: 4,
    username: 'customer',
    password: 'customer123',
    email: 'customer@cemetery.com',
    firstname: 'John',
    lastname: 'Customer',
    role: 'customer',
    user_type: 'customer'
  }
};

/**
 * Mock login - validates against hardcoded demo credentials
 */
export const mockLogin = (username, password) => {
  // Try to find user by username
  for (const [key, user] of Object.entries(DEMO_USERS)) {
    if (user.username === username && user.password === password) {
      return {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          user_type: user.user_type
        }
      };
    }
  }
  
  const userList = Object.values(DEMO_USERS)
    .map(u => `${u.username}/${u.password}`)
    .join(', ');
  
  return {
    success: false,
    message: `Invalid credentials. Try: ${userList}`
  };
};

/**
 * Mock session validation
 */
export const mockValidateSession = (user) => {
  if (!user) return false;
  // Check if user exists in our demo users
  return Object.values(DEMO_USERS).some(u => u.id === user.id);
};

/**
 * Mock logout
 */
export const mockLogout = () => {
  return { success: true };
};

/**
 * Get available demo users for reference
 */
export const getAvailableDemoUsers = () => {
  return Object.values(DEMO_USERS).map(u => ({
    username: u.username,
    password: u.password,
    role: u.role
  }));
};
