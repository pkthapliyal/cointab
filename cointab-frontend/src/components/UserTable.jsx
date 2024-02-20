import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
} from "@chakra-ui/react";

const DataTable = ({ users, addUserInDb }) => {
  const navigate = useNavigate();
  return (
    <TableContainer width={"90%"} margin={"auto"} shadow={5} borderRadius={"5"}>
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
  );
};

export default DataTable;
