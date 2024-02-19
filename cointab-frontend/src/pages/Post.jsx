import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { MdFileDownload } from "react-icons/md";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Card,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

function Post() {
  const [posts, setPosts] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  const [postAdded, setPostAdded] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const MOCK_API_USER = "https://jsonplaceholder.typicode.com/users";

  const MOCK_API_POST = "https://jsonplaceholder.typicode.com/posts";

  const { userId } = useParams();

  const SERVER_URL = "http://localhost:3001";

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${MOCK_API_POST}?userId=${userId}`);

      if (response.ok) {
        let postsData = await response.json();

        // Getting the user details

        let isPostAdded = await fetch(`${SERVER_URL}/posts?userId=${userId}`, {
          mode: "cors",
          method: "GET",
        });

        // Fetch all the existed user in the DB

        isPostAdded = await isPostAdded.json();
        setPostAdded(isPostAdded.added);

        setPosts(postsData); //  setting the users data
      } else {
        console.log("There is some error in fetching the Post");
      }
    } catch (error) {
      console.log(error);
      console.error("Error In fetching Mock User");
    }
  };

  useEffect(() => {
    setUserDetails(user);
    fetchUsers();
  }, []);

  const handlebulkAdd = async (e) => {
    e.preventDefault();

    const postToBeAdded = posts.map((post) => {
      return { id: post.id, title: post.title, body: post.body };
    });

    // console.log(postToBeAdded);

    // assign user id
    const postData = { posts: postToBeAdded, userId: userId };

    try {
      const postAdded = await fetch(`${SERVER_URL}/posts`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (postAdded.ok && postAdded.status !== 409) {
        const post = await postAdded.json();
        console.log(post); // alert
      } else {
        const error = await postAdded.json();
        console.log(error); // alert
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box pb={20}>
      <Heading color={"#ED64A6"} mt={4} mb={4} zIndex={5}>
        All Posts
      </Heading>

      {userDetails && (
        <Box
          display={"flex"}
          width={"90%"}
          m={"auto"}
          justifyContent={"space-between"}
          alignContent={"start"}
          mb={5}
        >
          <Card width="fit-content" p={6} bg={"#ED64A6"}>
            <Text fontSize={"xl"} fontWeight={"500"} color={"white"}>
              Name : {userDetails.name}
            </Text>
            <Text fontSize={"lg"} fontWeight={"500"} color={"white"}>
              Company : {userDetails.company}
            </Text>
            <Text></Text>
          </Card>

          <>
            {postAdded ? (
              <Button
                size={"lg"}
                color={"white"}
                fontWeight={"600"}
                bg={"#ED64A6"}
                _hover={{ bg: "#B83280" }}
                rightIcon={<MdFileDownload />}
              >
                Download in Excel
              </Button>
            ) : (
              <Button
                size={"lg"}
                color={"white"}
                fontWeight={"600"}
                bg={"#ED64A6"}
                _hover={{ bg: "#B83280" }}
                onClick={handlebulkAdd}
              >
                Bulk Add
              </Button>
            )}
          </>
        </Box>
      )}

      <TableContainer
        width={"90%"}
        margin={"auto"}
        shadow={5}
        borderRadius={"5"}
      >
        <Table
          size={"lg"}
          colorScheme="pink"
          fontSize={"16px"}
          variant={"striped"}
          border={"4px solid #ED64A6"}
          whiteSpace="normal"
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
    </Box>
  );
}

export default Post;