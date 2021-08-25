import { Flex, Link, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { BoxResponse } from "~/components/pages/callback/box-response";
import { Header } from "~/components/pages/callback/header";
import Struct from "~/components/pages/struct";
import { axiosClient } from "~/config/axios";
import { DASHBOARD_URL } from "~/environments";
import { setToken } from "~/utils/auth";
import { colors } from "~/utils/constants";

interface Props {
  readonly token?: string;
  readonly redirectUri?: string;
}

export default function Callback({ token, redirectUri, ...props }: Props) {
  const success = token ? true : false;

  return (
    <Struct redirectUri={redirectUri + ""}>
      <Flex
        minHeight="70vh"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        paddingY={30}
      >
        <Header
          title={success ? "Sucesso" : "Ooops!"}
          color={success ? "green.400" : "red.500"}
        />

        <BoxResponse success={success} />

        {redirectUri && success && (
          <Text mt={6}>
            Aguarde ser redirecionado ou{" "}
            <Link
              fontWeight="bold"
              color={colors.primary.light}
              _hover={{ color: colors.primary.light }}
              href={redirectUri + ""}
            >
              clique aqui.
            </Link>
          </Text>
        )}

        {redirectUri && !success && (
          <Link
            mt={6}
            fontWeight="bold"
            color={"red.500"}
            _hover={{ color: "red.500" }}
            href={redirectUri + ""}
          >
            Voltar
          </Link>
        )}
      </Flex>
    </Struct>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.query?.token
    ? (context?.query?.token + "").trim()
    : null;
  const redirectUri = context?.query?.redirectUri
    ? (context?.query?.redirectUri + "").trim()
    : DASHBOARD_URL;

  if (token) {
    setToken(token, context);

    axiosClient.defaults.headers["Authorization"] = `Bearer ${token}`;

    if (redirectUri) {
      return {
        redirect: {
          destination: redirectUri,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      token,
      redirectUri,
    },
  };
};
