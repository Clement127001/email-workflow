import { useEffect, useState } from "react";
import { baseApiUrl } from "@/utils/common";
import { EmailData } from "@/types/email";

export const useEmailData = () => {
  const [emailList, setEmailList] = useState<EmailData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmailData = async () => {
    setIsLoading(true);
    const emailListUrl = `${baseApiUrl}/email/`;
    const response = await fetch(emailListUrl);

    if (response.ok) {
      const data = await response.json();

      const transformedData: EmailData[] = data.map((item: any) => {
        const { name, _id, subject, body, createdAt } = item;
        return { name, id: _id, subject, body, createdAt };
      });

      setEmailList(transformedData);
      setIsLoading(false);
      setError(null);
    } else {
      const data = await response.json();
      setError(data.error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmailData();
  }, []);

  return { isLoading, error, emailList, fetchEmailData };
};
