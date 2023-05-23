import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Grid } from "@mui/material";

interface Props {
  profile: any;
  setProfile: (data: any) => void;
}

export default function LoginWithGoogle({ profile,setProfile }: Props) {
  const [user, setUser] = useState<any>([]);
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user,setProfile]);

  useEffect(() => {
    if (profile) return router.replace("/");
  }, [profile, router]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Button variant="contained" onClick={() => login()}>
          Sign in with Google 🚀
        </Button>
      </Grid>
    </Grid>
  );
}
