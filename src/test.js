const PrivateRoute = ({ children, ...remainingProps,isAuthenticated }) => {
    return (
      <Route
        {...remainingProps}
        render={({ location }) =>
        isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          )
        }
      />
  );
  };