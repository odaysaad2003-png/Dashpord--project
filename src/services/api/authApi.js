import { fakeRequest } from "./ApiClint";

const USERS_STORAGE_KEY = "oday_dashboard_users";

const defaultUsers = [
  {
    id: 1,
    name: "Admin Manager",
    email: "admin@oday.com",
    password: "123456",
    role: "admin",
  },
  {
    id: 2,
    name: "Omar Manager",
    email: "manager@oday.com",
    password: "123456",
    role: "admin",
  },
  {
    id: 3,
    name: "Sara Employee",
    email: "employee@oday.com",
    password: "123456",
    role: "employee",
  },
];

function getUsers() {
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);

  if (!storedUsers) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }

  return JSON.parse(storedUsers);
}

function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export async function loginUser({ email, password }) {
  const users = getUsers();

  const user = users.find(
    (item) => item.email === email && item.password === password,
  );

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const { password: _, ...safeUser } = user;

  return fakeRequest({
    user: safeUser,
    token: crypto.randomUUID(),
  });
}

export async function registerUser({ name, email, password }) {
  const users = getUsers();

  const normalizedEmail = email.trim().toLowerCase();

  const emailExists = users.some(
    (user) => user.email.toLowerCase() === normalizedEmail,
  );

  if (emailExists) {
    throw new Error("Email already exists.");
  }

  const newUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: "employee",
  };

  saveUsers([...users, newUser]);

  const { password: _, ...safeUser } = newUser;

  return fakeRequest({
    user: safeUser,
    token: crypto.randomUUID(),
  });
}
