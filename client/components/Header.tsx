import { Flex } from "reflexbox/styled-components";
import getConfig from "next/config";
import React, { FC } from "react";
import Router from "next/router";
import useMedia from "use-media";
import Link from "next/link";

import { DISALLOW_REGISTRATION } from "../consts";
import { useStoreState } from "../store";
import styled from "styled-components";
import { RowCenterV } from "./Layout";
import { Button } from "./Button";
import ALink from "./ALink";

const { publicRuntimeConfig } = getConfig();

const Li = styled(Flex).attrs({ ml: [12, 24, 32] })`
  a {
    color: inherit;

    :hover {
      color: #2196f3;
    }
  }
`;

const LogoImage = styled.div`
  & > a {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 8px 0 0;
    font-size: 24px;
    font-weight: normal;
    text-decoration: none;
    color: #ffffff;
    transition: border-color 0.2s ease-out;
  }

  @media only screen and (max-width: 488px) {
    a {
      font-size: 24px;
    }
  }

  img {
    width: 120px;
    margin-right: 11px;
  }
`;

const Header: FC = () => {
  const { isAuthenticated } = useStoreState(s => s.auth);
  const isMobile = useMedia({ maxWidth: 640 });

  const login = !isAuthenticated && (
    <Li>
      <Link href="/login">
        <ALink
          href="/login"
          title={!DISALLOW_REGISTRATION ? "login" : "login"}
          forButton
        >
          <Button height={[32, 40]} fontSize="18px">
            {!DISALLOW_REGISTRATION ? "Log in" : "Log in"}
          </Button>
        </ALink>
      </Link>
    </Li>
  );
  const logout = isAuthenticated && (
    <Li>
      <Link href="/logout">
        <ALink href="/logout" title="logout" fontSize={[14, 16]}>
          Log out
        </ALink>
      </Link>
    </Li>
  );
  const settings = isAuthenticated && (
    <Li>
      <Link href="/settings">
        <ALink href="/settings" title="Settings" forButton>
          <Button height={[32, 40]}>Settings</Button>
        </ALink>
      </Link>
    </Li>
  );

  return (
    <Flex
      width={1232}
      maxWidth="100%"
      p={[16, "0 32px"]}
      mb={[32, 0]}
      height={["auto", "auto", 102]}
      justifyContent="space-between"
      alignItems={["flex-start", "center"]}
      backgroundColor="#000000"
    >
      <Flex
        flexDirection={["column", "row"]}
        alignItems={["flex-start", "stretch"]}
      >
        <LogoImage>
          <a
            href="/"
            title="Homepage"
            onClick={e => {
              e.preventDefault();
              if (window.location.pathname !== "/") Router.push("/");
            }}
          >
            <img src="/images/logo.svg" alt="JOSA - Logo" />
            .link
          </a>
        </LogoImage>
        {!isMobile && (
          <Flex
            style={{ listStyle: "none" }}
            display={["none", "flex"]}
            alignItems="flex-end"
            as="ul"
            mb="3px"
            m={0}
            p={0}
          >
          </Flex>
        )}
      </Flex>
      <RowCenterV
        m={0}
        p={0}
        justifyContent="flex-end"
        as="ul"
        style={{ listStyle: "none" }}
      >
        {logout}
        {settings}
        {login}
      </RowCenterV>
    </Flex>
  );
};

export default Header;
