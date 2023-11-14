import React from "react";
import { Nav, NavLink, NavMenu }
	from "./NavbarElements";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/mainPage" activeStyle>
						MainPage
					</NavLink>
					<NavLink to="/index" activeStyle>
						Index
					</NavLink>
					<NavLink to="/kirjasto" activeStyle>
						Kirjasto
					</NavLink>
					<NavLink to="/blogs" activeStyle>
						Blogs
					</NavLink>
					<NavLink to="/ruokala" activeStyle>
						Ruokala
					</NavLink>
					<NavLink to="/wc" activeStyle>
						WC
					</NavLink>
						
					
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
