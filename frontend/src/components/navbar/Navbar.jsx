import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/Axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [accessToken, setAccessToken] = React.useState("");

  React.useEffect(() => {
    const data = localStorage.getItem("access_token");
    setAccessToken(data);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logoutHandle = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("logout/");

      console.log(response.data);
      if (response.data.message === "User loggedOut successfully") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("userDetails");
        navigate("../");
      }
    } catch (error) {
      console.error("failed:", error.response.data);
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: { xs: "none", md: "flex" }, marginRight: 1 }}>
                <AdbIcon />
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              ></Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {!accessToken && (
                    <Link to="../">
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">CoverPage</Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {!accessToken && (
                    <Link to="../register">
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">Register</Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {!accessToken && (
                    <Link to="../login">
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">Login</Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {!accessToken && (
                    <Link to="../documents">
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">Documents</Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {accessToken && (
                    <Link to="../home">
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">Home</Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {accessToken && (
                    <Link to="../mydocuments">
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">MyDocuments</Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {accessToken && (
                    <MenuItem onClick={logoutHandle}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  )}
                </Menu>
              </Box>

              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {accessToken && (
                  <Link to="/home">
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Home
                    </Button>
                  </Link>
                )}
                {!accessToken && (
                  <Link to="/register">
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Register
                    </Button>
                  </Link>
                )}
                {!accessToken && (
                  <Link to="/documents">
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      Documents
                    </Button>
                  </Link>
                )}
                {accessToken && (
                  <Link to="/mydocuments">
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      MyDocuments
                    </Button>
                  </Link>
                )}
                {accessToken && (
                  <Button
                    onClick={logoutHandle}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Logout
                  </Button>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
