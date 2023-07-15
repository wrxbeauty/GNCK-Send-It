import React, { useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import { useHistory } from 'react-router';
import axios from 'axios';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';

export default function Signup() {
  const toast = useToast(); // Access the toast object for displaying notifications
  const history = useHistory(); // Access the history object for navigation

  // Define state variables
  const [name, setName] = useState(''); // Track name input value
  const [email, setEmail] = useState(''); // Track email input value
  const [password, setPassword] = useState(''); // Track password input value
  const [confirmPassword, setConfirmPassword] = useState(''); // Track confirm password input value
  const [show, setShow] = useState(false); // Toggle password visibility
  const [picLoading, setPicLoading] = useState(false); // Track picture loading state
  const [pic, setPic] = useState(); // Track selected picture

  // Toggle password visibility
  const handleClick = () => {
    setShow(!show);
  };

  // Handle file upload logic
  const postDetails = (pics) => {
    setPicLoading(true); // Set picture loading state to true
    if (pics === undefined) {
      // Check if picture is selected
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    console.log(pics);
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'a1v5fked');
      data.append('cloud_name', 'dvdlowjhx');
      fetch('https://api.cloudinary.com/v1_1/dvdlowjhx/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false); // Set picture loading state back to false
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false); // Set picture loading state back to false
        });
    } else {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setPicLoading(false); // Set picture loading state back to false
      return;
    }
  };

  // Handle form submission logic
  const submitHandler = async () => {
    setPicLoading(true); // Set picture loading state to true
    if (!name || !email || !password || !confirmPassword) {
      // Check if all required fields are filled
      toast({
        title: 'Please Fill all the Fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setPicLoading(false); // Set picture loading state back to false
      return;
    }
    if (password !== confirmPassword) {
      // Check if passwords match
      toast({
        title: 'Passwords Do Not Match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/user',
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setPicLoading(false); // Set picture loading state back to false
      history.push('/chats'); // Navigate to the '/chats' route
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setPicLoading(false); // Set picture loading state back to false
    }
  };

  return (
    <VStack spacing="5px">
      {/* Name field */}
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      {/* Email field */}
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      {/* Password field */}
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* Confirm password field */}
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* File upload field */}
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      {/* Submit button */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}
