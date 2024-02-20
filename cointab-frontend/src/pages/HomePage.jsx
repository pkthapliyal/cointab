import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useUserContext } from "./User.context";

const HomePage = () => {
  // const [users, setUsers] = useState([]);
  const { users, setUsers } = useUserContext();

  const MOCK_API = "https://jsonplaceholder.typicode.com/users";

  const SERVER_URL = "http://localhost:3001";

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
        <TableContainer
          width={"90%"}
          margin={"auto"}
          shadow={5}
          borderRadius={"5"}
        >
          <Table
            size="sm"
            colorScheme="pink"
            fontSize={"16px"}
            variant={"striped"}
            border={"4px solid #ED64A6"}
          >
            <Thead>
              <Tr h={16} bg={"#ED64A6"}>
                <Th fontSize={"16px"} color={"white"}>
                  Name
                </Th>
                <Th fontSize={"16px"} color={"white"}>
                  Email
                </Th>
                <Th fontSize={"16px"} color={"white"}>
                  Phone
                </Th>
                <Th fontSize={"16px"} color={"white"}>
                  Website
                </Th>
                <Th fontSize={"16px"} color={"white"}>
                  City
                </Th>
                <Th fontSize={"16px"} color={"white"}>
                  Company
                </Th>
                <Th fontSize={"16px"} color={"white"}>
                  Add or View
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.email}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.phone}</Td>
                  <Td>{user.website}</Td>
                  <Td>{user.address.city}</Td>
                  <Td>{user.company.name}</Td>
                  <Td>
                    {user.added ? (
                      <Button
                        width={20}
                        color={"white"}
                        fontWeight={"600"}
                        bg={"#B83280"}
                        _hover={{ bg: "#ED64A6" }}
                        onClick={() => {
                          localStorage.setItem(
                            "user",
                            JSON.stringify({
                              name: user.name,
                              company: user.company.name,
                            })
                          );
                          navigate(`/posts/${user.id}`);
                        }}
                      >
                        {" "}
                        Open
                      </Button>
                    ) : (
                      <Button
                        width={20}
                        color={"white"}
                        fontWeight={"600"}
                        bg={"#ED64A6"}
                        _hover={{ bg: "#B83280" }}
                        onClick={() => {
                          addUserInDb(user);
                        }}
                      >
                        {" "}
                        Add
                      </Button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr h={16} bg={"#ED64A6"}>
                <Th fontSize={"16px"} color={"white"}>
                  Name
                </Th>
                <Th fontSize={"16px"} color={"white"}>
                  Email
                </Th>
                <Th fontSize={"16px"} color={"white"}>
                  Phone
                </Th>
                <Th fontSize={"16px"} color={"white"}>
                  Website
                </Th>
                <Th fontSize={"16px"} color={"white"}>
                  City
                </Th>
                <Th fontSize={"16px"} color={"white"}>
                  Company
                </Th>
                <Th fontSize={"16px"} color={"white"}>
                  Add or View
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default HomePage;
