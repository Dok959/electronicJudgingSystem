export const AuthProvider = () => {
  const [user, setUser] = useState(null);

  const signin = (newUser, cb) => {
    setUser(newUser);
    cb();
  };
  const signout = (cb) => {
    setUser(null);
    cb();
  };

  const value = { user, signin, signout };

  // return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
