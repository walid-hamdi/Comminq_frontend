import userService, { ResponseProfile } from "@/services/userService";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

const useProfile = () => {
  const [profile, setProfile] = useState<ResponseProfile | null>(null);
  const [error, setError] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.profile();

    request
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { profile, error, isLoading };
};

export default useProfile;
