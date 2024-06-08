import { Box, Flex, Image, Button, IconButton, useColorMode, Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const currentRoute = router.pathname;
  const [language, setLanguage] = useState('FR');

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };


  return (
    <Box as="nav" bg="primary.hightest" color="white" padding="4">
    <Flex justifyContent="space-between" alignItems="center">
      <Link href="/" passHref>
        <Image
          src="/Gifty-logo-white.svg"
          alt="Gifty Logo"
          height="40px"
          className="logo"
          css={{
            transition: 'filter 0.2s ease',
            '&:hover': {
              filter: 'invert(56%) sepia(39%) saturate(2143%) hue-rotate(2deg) brightness(93%) contrast(92%)',
            },
          }}
        />
      </Link>
        <Flex alignItems="center">
            <Menu>
                <MenuButton as={Button} variant="outline" colorScheme="white" mr="4"
                    _hover={{
                        textDecoration: 'none',
                        color: 'secondary.medium',
                    }}
                    >
                    {language}
                </MenuButton>
                <MenuList minWidth="50px">
                    <MenuItem  color='primary.hightest' fontWeight='bold' onClick={() => handleLanguageChange('FR')}>FR</MenuItem>
                    <MenuItem  color='primary.hightest' fontWeight='bold' onClick={() => handleLanguageChange('EN')}>EN</MenuItem>
                </MenuList>
            </Menu>

          <IconButton
            aria-label="Toggle Theme"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            mr="4"
          />

          {currentRoute === "/login" || currentRoute === "/signup" || currentRoute === "/" ? (
            <Button colorScheme="white" variant="outline"
              _hover={{
                textDecoration: 'none',
                color: 'secondary.medium',
              }}
              onClick={handleLogin}
            >
              Se connecter
            </Button>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar 
                  name='Dan Abrahmov' 
                  src='https://bit.ly/dan-abramov' 
                  size="md" 
                  _hover={{
                    cursor: 'pointer',
                  }}
                />
              </MenuButton>
              <MenuList >
              <Box textAlign="center" p={4} >
                  <Flex flexDirection='column'>
                    <MenuItem color='primary.hightest' onClick={() => router.push('/profile')}>Mon profil</MenuItem>
                    <MenuItem color='primary.hightest' onClick={() => router.push('/groups')}>Mes groupes</MenuItem>
                    </Flex>
                </Box>                
                <Box textAlign="center" p={4} >
                  <Flex flexDirection='column'>
                    <Button mb={4} variant="goldenButton" onClick={() => router.push('/create-group')}>
                      Créer un groupe
                    </Button>
                    <Button variant="transparentButton" onClick={() => router.push('/login')}>
                    Se déconnecter
                    </Button>
                  </Flex>
                </Box>                
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
