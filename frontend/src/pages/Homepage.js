import React from 'react';
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

export default function Homepage() {
  return (
    <Container maxW="xl" centerContent>
      {/* Outer Box */}
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        {/* Text component for the app name */}
        <Text fontSize="4xl" fontFamily="Work sans">
          Send-It
        </Text>
      </Box>
      {/* Inner Box */}
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        {/* Tabs component */}
        <Tabs isFitted variant="soft-rounded">
          {/* TabList component */}
          <TabList mb="1em">
            {/* Individual Tab components */}
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          {/* TabPanels component */}
          <TabPanels>
            {/* Individual TabPanel components */}
            <TabPanel>
              {/* Render the Login component */}
              <Login />
            </TabPanel>
            <TabPanel>
              {/* Render the Signup component */}
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
