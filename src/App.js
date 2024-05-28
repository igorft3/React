import React from "react";
import "./style.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

// List users: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [invites, setinvites] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении пользователей");
      })
      .finally(() => setLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setinvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setinvites((prev) => [...prev, id]);
    }
  };

  const onCLickSendInvites = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onCLickSendInvites={onCLickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
