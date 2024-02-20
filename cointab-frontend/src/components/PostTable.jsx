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

const PostTable = ({ posts }) => {
  return (
    <TableContainer width={"90%"} margin={"auto"} shadow={5} borderRadius={"5"}>
      <Table
        size={"lg"}
        colorScheme="pink"
        fontSize={"16px"}
        variant={"striped"}
        border={"4px solid #ED64A6"}
        whiteSpace="normal"
        id="myTable"
      >
        <Thead>
          <Tr h={16} bg={"#ED64A6"}>
            <Th fontSize={"16px"} color={"white"}>
              Post Id
            </Th>
            <Th fontSize={"16px"} color={"white"}>
              Title
            </Th>
            <Th fontSize={"16px"} color={"white"}>
              Body
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {posts.map((post) => (
            <Tr>
              <Td fontSize={"16px"}>{post.id}</Td>
              <Td fontSize={"16px"}>{post.title}</Td>
              <Td fontSize={"16px"}>{post.body}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr h={16} bg={"#ED64A6"}>
            <Th fontSize={"16px"} color={"white"}>
              Post Id
            </Th>
            <Th fontSize={"16px"} color={"white"}>
              Title
            </Th>
            <Th fontSize={"16px"} color={"white"}>
              body
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default PostTable;
