import defaultGet from "@/services/httpService";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

const useDefault = () => {
  const [msg, setMsg] = useState<String>("");
  const [error, setError] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = defaultGet();

    request
      .then((res) => {
        setMsg(res.data.msg);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { msg, error, isLoading };
};

export default useDefault;
