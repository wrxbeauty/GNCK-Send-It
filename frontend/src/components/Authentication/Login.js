import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook to navigate to different routes
import axios from 'axios'; // Import axios for making HTTP requests
import { useToast } from '@chakra-ui/react'; // Import useToast hook for displaying notifications
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';

export default function Login() {
  const history = useHistory(); // Access the history object for navigation
  const toast = useToast(); // Access the toast object for displaying notifications

  // State variables
  const [email, setEmail] = useState(''); // Track email input value
  const [password, setPassword] = useState(''); // Track password input value
  const [show, setShow] = useState(false); // Toggle password visibility
  const [loading, setLoading] = useState(false); // Track loading state

  // Toggle password visibility
  const handleClick = () => {
    setShow(!show);
  };

  // Handle form submission logic
  const submitHandler = async () => {
    setLoading(true); // Set loading state to true
    if (!email || !password) {
      // Check if email and password are filled
      toast({
        title: 'Please Fill all the Fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false); // Set loading state back to false
      return;
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Make a POST request to the login endpoint with email and password
      const { data } = await axios.post(
        '/api/user/login',
        { email, password },
        config
      );

      // Display a success toast notification
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      // Store user information in localStorage or user state
      localStorage.setItem('userInfo', JSON.stringify(data));

      setLoading(false); // Set loading state back to false
      history.push('/chats'); // Navigate to the '/chats' route
    } catch (error) {
      // Display an error toast notification
      toast({
        title: 'Error Occurred!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      setLoading(false); // Set loading state back to false
    }
  };

  return (
    <VStack spacing="10px">
      {/* Email field */}
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* Login button */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      {/* Button to get guest user credentials */}
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail('guest@example.com');
          setPassword('123456');
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
}
