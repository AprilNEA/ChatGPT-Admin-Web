import { useState, FormEvent } from "react";

const usePreventFormSubmit = (): [
  boolean,
  (event: FormEvent<Element> | undefined, onSubmit: Function) => Promise<void>,
] => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (
    event: FormEvent | undefined,
    onSubmit: Function,
  ) => {
    event?.preventDefault();

    /* If a commit is in progress, the commit operation is not performed */
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await onSubmit(event); /* Perform the actual form submission operation */
    } catch (error) {
      console.error("Error when submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return [isSubmitting, handleSubmit];
};

export default usePreventFormSubmit;
