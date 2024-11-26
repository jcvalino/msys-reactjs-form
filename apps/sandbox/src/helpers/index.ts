import { createInstance } from "react-geek-form";

import FormInput from "../components/FormInput";
import FormPassword from "../components/FormPassword";
import FormTextArea from "../components/FormTextArea";

const { createForm } = createInstance({
  FormInput,
  FormPassword,
  FormTextArea,
});

export { createForm };
