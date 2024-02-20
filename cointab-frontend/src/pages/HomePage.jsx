import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { useUserContext } from "./User.context";
import UserTable from "../components/UserTable";

const HomePage = () => {
  // const [users, setUsers] = useState([]);
  const { users, setUsers } = useUserContext();

  const MOCK_API = "https://jsonplaceholder.typicode.com/users";

  const SERVER_URL = "https://coinab-assignment.onrender.com";

  const navigate = useNavigate();
  const toast = useToast();

  const fetchUsers = async () => {
    try {
      const response = await fetch(MOCK_API);
      if (response.ok) {
        let usersData = await response.json();

        // Fetch all the existed user in the DB

        const userFromOurDb = await fetch(`${SERVER_URL}/users`, {
          mode: "cors",
          method: "GET",
        });

        const dbUser = await userFromOurDb.json();
        // console.log(dbUser);

        // Now map all the arrays

        const finalData = usersData.map((user) => {
          const userIsAdded = dbUser.find((dbUser) => dbUser.id === user.id);
          if (userIsAdded) {
            return { ...user, added: true };
          } else {
            return { ...user, added: false };
          }
        });

        console.log(finalData);
        setUsers(finalData); //  setting the users data
      } else {
        toast({
          title: "Error In getting users",
          description: "There is some error in getting users !!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log("There is some error in fetching the Users");
      }
    } catch (error) {
      console.error("Error In fetching Mock User");
    }
  };

  useEffect(() => {
    // fetchUsers();
  }, []);

  const addUserInDb = async (user) => {
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      city: user.address.city,
      company: user.company.name,
    };

    try {
      const userAdded = await fetch(`${SERVER_URL}/users`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (userAdded.ok && userAdded.status !== 409) {
        fetchUsers(); // fetch the user again
        const user = await userAdded.json();
        console.log(user); // alert
        toast({
          title: "Sucess",
          description: "User added successfully !!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const error = await userAdded.json();
        console.log(error); // alert
        toast({
          title: "Warning",
          description: "User is already added !!",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box pb={20}>
      <Heading color={"#D53F8C"} mt={4} mb={4} zIndex={5}>
        Cointab SE-ASSIGNMENT
      </Heading>
      <Button
        size={"lg"}
        mt={5}
        mb={5}
        color={"white"}
        fontWeight={"600"}
        bg={"#ED64A6"}
        _hover={{ bg: "#B83280" }}
        onClick={() => {
          fetchUsers();
        }}
      >
        All Users{" "}
      </Button>

      {users.length !== 0 && (
        <UserTable users={users} addUserInDb={addUserInDb} />
      )}
    </Box>
  );
};

export default HomePage;
